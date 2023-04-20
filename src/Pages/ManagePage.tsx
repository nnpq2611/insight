import React, { useState } from "react";
import { SearchOutlined, FilterOutlined } from "@ant-design/icons";
import "./ManagePage.css";
import { Input, Tabs, Button, Modal, Radio, DatePicker, DatePickerProps } from "antd";
import type { TabsProps } from "antd";
import Family from "../components/ticket/family/FamilyManage";
import Event from "../components/ticket/event/EventManage";
import { Checkbox, Col, Row } from "antd";
import type { CheckboxValueType } from 'antd/es/checkbox/Group';
import { CSVLink } from "react-csv";
import database from "../firebase/firebase";
import { get, ref, set } from "firebase/database";
// import { CheckboxChangeEvent } from "antd/es/checkbox";

interface goi_gia_dinh {
  id: number;
  Booking_Code: string;
  So_ve: string;
  Tinh_trang_su_dung: string;
  Ngay_su_dung: string;
  Han_su_dung: string;
  Ngay_xuat_ve: string;
  Cong_check_in: string;
}

interface goi_su_kien {
  id: number;
  Booking_Code: string;
  So_ve: string;
  Ten_su_kien: string;
  Tinh_trang_su_dung: string;
  Ngay_su_dung: string;
  Han_su_dung: string;
  Cong_check_in: string;
}

const ManagePage = () => {
  const [packed, setPacked] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [danh_sach_ve, setGoigiadinh] = useState<goi_gia_dinh[]>([]);
  const [danh_sach_ve_show, setGoigiadinhShow] = useState<goi_gia_dinh[]>([]);
  const [danh_sach_ve_su_kien, setGoisuKien] = useState<goi_su_kien[]>([]);
  const [danh_sach_ve_su_kien_show, setGoisuKienShow] = useState<goi_su_kien[]>([]);
  const csvLink = React.useRef<CSVLink & HTMLAnchorElement & { link: HTMLAnchorElement }>(null);
  const [csvData, setCsvData] = useState<goi_gia_dinh[] | goi_su_kien[]>([]);
  const [fileName, setFileName] = useState<string>("");
  const [status, setStatus] = useState<string>("all");
  const [congCheckIn, setCongCheckIn] = useState<CheckboxValueType[]>([]);
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const dateFormatList = ['DD/MM/YYYY'];

  const [loading, setLoading] = useState(false);

  const converDate = (dateString: string) => {
    const dateParts = dateString.split("/");
    const year = +dateParts[2];
    const month = +dateParts[1] - 1;
    const day = +dateParts[0];
    return new Date(year, month, day);
  };
  
  const getCurrentDate = () => {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return new Date(`${month}/${day}/${year}`);
  };

  React.useEffect(() => {
    // get data goi gia dinh from firebase
    setLoading(true);
    const starCountRefFamily = ref(database, "danh_sach_ve/goi_gia_dinh");
    get(starCountRefFamily)
      .then((snapshot: any) => {
        if (snapshot.exists()) {
          setGoigiadinh(snapshot.val());
          setGoigiadinhShow(snapshot.val());
          setLoading(false);
        } else {
          console.log("No data available");
          setLoading(false);
        }
      })
      .catch((error: any) => {
        console.error(error);
        setLoading(false);
      });

    // get data goi su kien from firebase
    const starCountRefEvent = ref(database, "danh_sach_ve/goi_su_kien");
    get(starCountRefEvent)
      .then((snapshot: any) => {
        if (snapshot.exists()) {
          setGoisuKien(snapshot.val());
          setGoisuKienShow(snapshot.val());
        } else {
          console.log("No data available");
        }
      })
      .catch((error: any) => {
        console.error(error);
      });

  }, []);

  // TabsProps
  const handleChangePacked = () => {
    setPacked(!packed);
  };
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: `Gói gia đình`,
    },
    {
      key: "2",
      label: `Gói sự kiện`,
    },
  ];
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  //Search
  const handleSearch = (value: string) => {
    setSearchInput(value);
    if (packed) {
      if (value === "") {
        return setGoigiadinhShow(danh_sach_ve);
      }
      const search = danh_sach_ve.filter((item) => {
        return item.So_ve.includes(searchInput);
      });
      setGoigiadinhShow(search);
    } else {
      if (value === "") {
        return setGoisuKienShow(danh_sach_ve_su_kien);
      }
      const search = danh_sach_ve_su_kien.filter((item) => {
        return item.So_ve.includes(searchInput);
      });
      setGoisuKienShow(search);
    }
  };

  //Xuất file excel
  const handleDowload = () => {
    if (packed) {
      setCsvData(danh_sach_ve);
      setFileName("danh_sach_ve_goi_gia_dinh");
    } else {
      setCsvData(danh_sach_ve_su_kien);
      setFileName("danh_sach_ve_goi_su_kien");
    }
    setTimeout(() => {
      if (csvLink.current) csvLink.current.link.click();
    }, 100);

  }

  //Điều kiện lọc vé
  const handleFilter = () => {
    if (packed) {
      let filter = danh_sach_ve;
      if (status !== "all") {
        filter = filter.filter((item) => {
          if (status === "Chưa sử dụng") {
            return item.Tinh_trang_su_dung === status && converDate(item.Han_su_dung).getTime() > getCurrentDate().getTime();
          }
          if (status === "Đã sử dụng") {
            return item.Tinh_trang_su_dung === status;
          }
          if (status === "Hết hạn") {
            return item.Tinh_trang_su_dung !== "Đã sử dụng" && converDate(item.Han_su_dung).getTime() < getCurrentDate().getTime();
          }
        });
      }
      if (congCheckIn.length !== 0) {
        filter = filter.filter((item) => congCheckIn.indexOf(item.Cong_check_in) !== -1);
      }
      if (startDate) {
        filter = filter.filter((item) => {
          const date = converDate(item.Ngay_xuat_ve).getTime();
          return date >= startDate.getTime()
        });
      }
      if (endDate) {
        filter = filter.filter((item) => {
          const date = converDate(item.Ngay_xuat_ve).getTime();
          return date <= endDate.getTime()
        });
      }
      setGoigiadinhShow(filter);
    } else {
      let filter = danh_sach_ve_su_kien;
      if (status !== "all") {
        filter = filter.filter((item) => {
          if (status === "Chưa sử dụng") {
            return item.Tinh_trang_su_dung === status && converDate(item.Han_su_dung).getTime() >= getCurrentDate().getTime();
          }
          if (status === "Đã sử dụng") {
            return item.Tinh_trang_su_dung === status;
          }
          if (status === "Hết hạn") {
            return item.Tinh_trang_su_dung !== "Đã sử dụng" && converDate(item.Han_su_dung).getTime() < getCurrentDate().getTime();
          }
        });
      }
      if (congCheckIn.length !== 0 && congCheckIn.indexOf("all") === -1) {
        filter = filter.filter((item) => congCheckIn.indexOf(item.Cong_check_in) !== -1);
      }
      if (startDate) {
        filter = filter.filter((item) => {
          const date = converDate(item.Han_su_dung).getTime();
          return date >= startDate.getTime()
        });
      }
      if (endDate) {
        filter = filter.filter((item) => {
          const date = converDate(item.Han_su_dung).getTime();
          return date <= endDate.getTime()
        });
      }
      setGoisuKienShow(filter);
    }
    setIsModalOpen(false);
  }
  
  //Lọc vé theo cổng check in
  const handleCongCheckIn = (value: CheckboxValueType[]) => {
    if (value.indexOf("all") !== -1 && value.length === 5) {
      setCongCheckIn(value.filter((item) => item !== "all"));
    }
    else if (value.indexOf("all") !== -1) {
      setCongCheckIn(["all", "Cổng 1", "Cổng 2", "Cổng 3", "Cổng 4", "Cổng 5"]);
    }
    else setCongCheckIn(value);
  }

  //Lấy ngày bắt đầu
  const handleGetStartDate: DatePickerProps['onChange'] = (date, dateString) => {
    // get full date
    if(date)
    {
      const day = date.date();
      const month = date.month() + 1;
      const year = date.year();
      const newDate = new Date(`${month}/${day}/${year}`);
      setStartDate(newDate);
    }
    else setStartDate(undefined);
  };

  //Lấy ngày kết thúc
  const handleGetEndDate: DatePickerProps['onChange'] = (date, dateString) => {
    // get full date
    if(date)
    {
      const day = date.date();
      const month = date.month() + 1;
      const year = date.year();
      const newDate = new Date(`${month}/${day}/${year}`);
      setEndDate(newDate);
    }
    else setEndDate(undefined);
  };

  return (
    <div className="magage-page">
      <div className="table-page">
        <h1>Danh sách vé</h1>
        <ul>
          <div className="tab-list">
            <Tabs
              defaultActiveKey="1"
              onChange={handleChangePacked}
              items={items}
            />
          </div>
          <li className="search">
            <Input
              className="form-control"
              placeholder="Tìm bằng số vé"
              value={searchInput}
              onChange={(e) => handleSearch(e.target.value)}
              suffix={<SearchOutlined />}
            />

          </li>
          <div className="feature">
            <li className="btn-feature">
              <Button onClick={showModal}>
                <FilterOutlined />
                Lọc vé
              </Button>
            </li>
            <li className="btn-feature">
              <Button onClick={handleDowload}>
                Xuất file (.csv)
              </Button>
            </li>
          </div>
        </ul>
        {packed ? <Family danh_sach_ve_show={danh_sach_ve_show} loading={loading} /> : <Event danh_sach_ve_su_kien_show={danh_sach_ve_su_kien_show} />}
      </div>
      <Modal
        title="Lọc vé"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        className="custom-modal"
        width={480}
      >
        <ul className="date-modal">
          <li>
            <h4>Từ ngày</h4>
            <DatePicker onChange={handleGetStartDate} format={dateFormatList} className="date-picker"/>
          </li>
          <li>
            <h4>Đến ngày</h4>
            <DatePicker onChange={handleGetEndDate} format={dateFormatList} className="date-picker"/>
          </li>
        </ul>
        <h4>Tình trạng sử dụng</h4>
        <Radio.Group value={status} onChange={(e) => setStatus(e.target.value)}>
          <Radio value="all">Tất cả</Radio>
          <Radio value="Đã sử dụng">Đã sử dụng</Radio>
          <Radio value="Chưa sử dụng">Chưa sử dụng</Radio>
          <Radio value="Hết hạn">Hết hạn</Radio>
        </Radio.Group>
        <h4>Cổng Check - in</h4>
        <Checkbox.Group 
          style={{ width: "100%" }}
          value={congCheckIn}
          onChange={handleCongCheckIn}
        >
          <Row>
          <Col span={8}>
            <Checkbox value="all">Tất cả</Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox value="Cổng 1">Cổng 1</Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox value="Cổng 2">Cổng 2</Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox value="Cổng 3">Cổng 3</Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox value="Cổng 4">Cổng 4</Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox value="Cổng 5">Cổng 5</Checkbox>
            </Col>  
          </Row>
        </Checkbox.Group>
        <Button className="btn-filter" onClick={() => handleFilter()}>
          Lọc
        </Button>
      </Modal>
      <CSVLink data={csvData} filename={`${fileName}.csv`} className="hidden" ref={csvLink} target="_blank" />
    </div>
  );
};

export default ManagePage;