import React, { useState } from "react";
import "./TicketCheckPage.css";
import { SearchOutlined } from "@ant-design/icons";
import { Input, Tabs, Button, Radio, Space, Select, DatePicker, DatePickerProps } from "antd";
import type { TabsProps } from "antd";
import Family from "../components/ticket/family/FamilyTicket";
import Event from "../components/ticket/event/EventTicket";
import database from "../firebase/firebase";
import { get, ref, set } from "firebase/database";
import dayjs from 'dayjs';

interface goi_gia_dinh {
  id: number;
  So_ve: string;
  Ngay_su_dung: string;
  Ngay_xuat_ve: string;
  Han_su_dung: string;
  Loai_ve: string;
  Cong_check_in: string;
  a: string;
  Tinh_trang: string;
  Tinh_trang_su_dung: string;
}

interface goi_su_kien {
  id: number;
  So_ve: string;
  Ten_su_kien: string;
  Ngay_su_dung: string;
  Ngay_xuat_ve: string;
  Han_su_dung: string;
  Ten_loai_ve: string;
  Cong_check_in: string;
  a:string;
  Tinh_trang: string;
  Tinh_trang_su_dung: string;
}

const TicketCheckPage = (item:any) => {
  const [packed, setPacked] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [danh_sach_ve, setGoigiadinh] = useState<goi_gia_dinh[]>([]);
  const [danh_sach_ve_show, setGoigiadinhShow] = useState<goi_gia_dinh[]>([]);
  const [danh_sach_ve_su_kien, setGoisuKien] = useState<goi_su_kien[]>([]);
  const [danh_sach_ve_su_kien_show, setGoisuKienShow] = useState<goi_su_kien[]>([]);
  const [status, setStatus] = useState<string>("all");
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const dateFormatList = ['DD/MM/YYYY'];
  const [sukien,setSukien] = useState("Tất cả");
  const starCountRefEvent = ref(database, "danh_sach_ve/goi_su_kien");
  const starCountRefFamily = ref(database, "danh_sach_ve/goi_gia_dinh");
  
  const [loading, setLoading] = useState(false);

  const [idVe, setIdVe] = useState(0);

  const converDate = (dateString: string) => {
    const dateParts = dateString.split("/");
    const year = +dateParts[2];
    const month = +dateParts[1] - 1;
    const day = +dateParts[0];
    return new Date(year, month, day);
  };
  
  React.useEffect(() => {
    // get data goi gia dinh from firebase
    setLoading(true);
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

  const handleUpdate = () => {
    if(packed){
      // const updateData = ref(database, "danh_sach_ve/goi_gia_dinh");
      // set(updateData, danh_sach_ve);
      // console.log(danh_sach_ve.filter((item) => item.id === idVe)[0]);
      setGoigiadinhShow(danh_sach_ve.map((item) => {
        if(item.id === idVe){
          item.a = "Đã đối soát";
          item.Ngay_su_dung = dayjs().format("DD/MM/YYYY").toString();
          item.Tinh_trang_su_dung = "Đã sử dụng";
        }
        return item;
      }));
      setGoigiadinh([...danh_sach_ve_show]);   
      set(starCountRefFamily, danh_sach_ve);
    }
    else{
      setGoisuKienShow(danh_sach_ve_su_kien.map((item) => {
        if(item.id === idVe){
          item.a = "Đã đối soát";
          item.Ngay_su_dung = dayjs().format("DD/MM/YYYY").toString();
          item.Tinh_trang_su_dung = "Đã sử dụng";
        }
        return item;
      }));
      setGoisuKien([...danh_sach_ve_su_kien_show]);
      set(starCountRefEvent, danh_sach_ve_su_kien);
    }
    
  }
  const handleFilter = () => {
    if (packed) {
      let filter = danh_sach_ve;
      if (status !== "all") {
        filter = filter.filter((item) => {
          if (status === "") {
            return item.a === "Chưa đối soát";
          }
          if (status === "Đã đối soát") {
            return item.a !== "Chưa đối soát" ;
          }
        });
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
    }
    if (packed) {
      let filter = danh_sach_ve;
      if (status !== "all") {
        filter = filter.filter((item) => {
          if (status === "Chưa đối soát") {
            return item.a === "Chưa đối soát";
          }
          if (status === "Đã đối soát") {
            return item.a !== "Chưa đối soát" ;
          }
        });
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
    } 
    else {
      let filter = danh_sach_ve_su_kien;
      if (sukien !== "Tất cả") {
        filter = filter.filter((item) => {
          if (sukien === "Sự kiện 1") {
            return item.Ten_su_kien === "Sự kiện 1";
          }
          if (sukien === "Sự kiện 2") {
            return item.Ten_su_kien === "Sự kiện 2";
          }
          if (sukien === "Sự kiện 3") {
            return item.Ten_su_kien === "Sự kiện 3";
          }
      });
      }
      if (status !== "all") {
        filter = filter.filter((item) => {
          if (status === "Chưa đối soát") {
            return item.a === "Chưa đối soát";
          }
          if (status === "Đã đối soát") {
            return item.a !== "Chưa đối soát" ;
          }
        });
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
      setGoisuKienShow(filter);
    }    
  }

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

  const handleChange = (value: string) => {
    setSukien(value);
  };

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
    <div className="tickercheck-page">
      <div className="table-page">
        <h1>Đối soát vé</h1>
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
          <li className="btn-control">
            <Button onClick={handleUpdate}>Chốt đối soát</Button>
          </li>

          {packed ? <Family danh_sach_ve_show={danh_sach_ve_show} loading={loading} setIdVe={setIdVe} /> : <Event danh_sach_ve_su_kien_show={danh_sach_ve_su_kien_show} setIdVe={setIdVe}/>}
        </ul>
      </div>
      <div className="body-loc_ve">
        <h1>Lọc vé</h1>
        {!packed && (
          <Space wrap>
            <Select
              defaultValue="Tất cả"
              style={{ width: 300 }}
              onChange={handleChange}
              value={sukien}
              options={[
                { value: 'Tất cả', label: 'Tất cả' },
                { value: 'Sự kiện 1', label: 'Sự kiện 1' },
                { value: 'Sự kiện 2', label: 'Sự kiện 2' },
                { value: 'Sự kiện 3', label: 'Sự kiện 3' },
              ]}
            />
          </Space>
        )}
        <ul>
          <li className="status-doi_soat">
            <p>Tình trạng đối soát</p>
            <Radio.Group
              value={status} onChange={(e) => setStatus(e.target.value)}
            >
              <Space direction="vertical">
                <Radio value="all">Tất cả</Radio>
                <Radio value="Đã đối soát">Đã đối soát</Radio>
                <Radio value="Chưa đối soát">Chưa đối soát</Radio>
              </Space>
            </Radio.Group>
          </li>
          <li className="loai-ve-loc_ve">
            <p>Loại vé</p>
            <p className="ve_cong">Vé cổng</p>
          </li>
          <li className="since">
            <p>Từ ngày</p>
            <DatePicker  onChange={handleGetStartDate} format={dateFormatList} className="date"/>
          </li>
          <li className="to-date">
            <p>Đến ngày</p>
            <DatePicker  onChange={handleGetEndDate} format={dateFormatList} className="date"/>
          </li>
          <Button className="btn-filter" onClick={() =>handleFilter()}>Lọc</Button>
        </ul>
      </div>
    </div>
  );
};

export default TicketCheckPage;
