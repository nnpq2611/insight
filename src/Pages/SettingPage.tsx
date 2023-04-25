import React, { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import "./SettingPage.css";
import { Input, Tabs, Button, Modal, DatePicker, TimePicker, Checkbox, Space, Select } from "antd";
// import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import type { TabsProps } from "antd";
// import type { SpaceSize } from "antd/es/space";
// import type { CheckboxValueType } from "antd/es/checkbox/Group";
// import { Checkbox, Col, Row } from "antd";
import { CSVLink } from "react-csv";
import Family from "../components/ticket/family/FamilySetting";
import Event from "../components/ticket/event/EventSetting";
import database from "../firebase/firebase";
import { get, ref, set } from "firebase/database";
import { v4 as uuidv4 } from 'uuid';
// import dayjs from 'dayjs';
// import axios from 'axios';

interface goi_gia_dinh {
  id: string;
  Ma_goi: string;
  Ten_goi_ve: string;
  Booking_Code: string;
  So_ve: string;
  Tinh_trang_su_dung: string;
  Ngay_su_dung: string;
  Ngay_xuat_ve: string;
  Thoi_gian_ap_dung: string;
  Han_su_dung: string;
  Thoi_gian_het_han: string;
  Loai_ve: string;
  a: string;
  Gia_ve_le: string;
  Gia_ve_combo: string;
  Tinh_trang: string;
}

interface goi_su_kien {
  id: string;
  Ma_goi: string;
  Ten_goi_ve: string;
  Ten_su_kien: string;
  Booking_Code: string;
  So_ve: string;
  Tinh_trang_su_dung: string;
  Ngay_su_dung: string;
  Ngay_xuat_ve: string;
  Thoi_gian_ap_dung: string;
  Han_su_dung: string;
  Thoi_gian_het_han: string;
  Loai_ve: string;
  a: string;
  Gia_ve_le: string;
  Gia_ve_combo: string;
  Tinh_trang: string;
}

const SettingPage = () => {
  const [packed, setPacked] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [danh_sach_ve, setGoigiadinh] = useState<goi_gia_dinh[]>([]);
  const [danh_sach_ve_show, setGoigiadinhShow] = useState<goi_gia_dinh[]>([]);
  const [danh_sach_ve_su_kien, setGoisuKien] = useState<goi_su_kien[]>([]);
  const [danh_sach_ve_su_kien_show, setGoisuKienShow] = useState<goi_su_kien[]>([]);
  const [gia_ve_le, setGiaVeLe] = useState("");
  const [gia_ve_combo, setGiaVeCombo] = useState("");
  const [so_luong_ve, setSoLuongVe] = useState("");
  const csvLink = React.useRef<CSVLink & HTMLAnchorElement & { link: HTMLAnchorElement }>(null);
  const [csvData, setCsvData] = useState<goi_gia_dinh[] | goi_su_kien[]>([]);
  const [fileName, setFileName] = useState<string>("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [timeStart, setTimeStart] = useState("");
  const [timeEnd, setTimeEnd] = useState("");
  const [tinh_trang, setTinhTrang] = useState("Đang áp dụng");
  const [ten_su_kien, setTenSuKien] = useState("");
  const starCountRefEvent = ref(database, "danh_sach_ve/goi_su_kien");
  const starCountRefFamily = ref(database, "danh_sach_ve/goi_gia_dinh");
  const dateFormatList = ['DD/MM/YYYY'];

  const [loading, setLoading] = useState(false);

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

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSave = () => {
    let Booking_Code = uuidv4().toUpperCase().replaceAll("-", "").slice(0, 11);

    let ve = {
      "id": `${danh_sach_ve.length + 1}`,
      "Ma_goi": `${Booking_Code}`,
      "Ten_goi_ve": packed ? "Gói gia đình" : "Gói sự kiện",
      "Booking_Code": `${uuidv4().toUpperCase().replaceAll("-", "").slice(0, 11)}`,
      "So_ve": `${Booking_Code}`,
      "Tinh_trang_su_dung": `${tinh_trang}`,
      "Ngay_su_dung": "",
      "Ngay_xuat_ve": `${startDate}`,
      "Thoi_gian_ap_dung": `${timeStart}`,
      "Han_su_dung" : `${endDate}`,
      "Thoi_gian_het_han": `${timeEnd}`,
      "Loai_ve": "Vé cổng",
      "Cong_check_in": `Cổng ${Math.floor(Math.random() * (9 - 1) ) + 1}`,
      "a": "Chưa đối soát",
      "Gia_ve_le": `${gia_ve_le} VNĐ`,
      "Gia_ve_combo": `${gia_ve_combo} VNĐ/${so_luong_ve} vé`,
      "Tinh_trang": `${tinh_trang}`
    };

    if (packed) {
      setGoigiadinh([...danh_sach_ve, ve]);
      setGoigiadinhShow([...danh_sach_ve, ve]);
      set(starCountRefFamily, [...danh_sach_ve, ve])
    } else {
      let veSuKien = {...ve, "Ten_su_kien": `${ten_su_kien}`};
      setGoisuKien([...danh_sach_ve_su_kien, veSuKien]);
      setGoisuKienShow([...danh_sach_ve_su_kien, veSuKien]);
      set(starCountRefEvent, [...danh_sach_ve_su_kien, veSuKien])
    }
    setIsModalOpen(false);
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


  //Search
  const handleSearch = (value: string) => {
    setSearchInput(value);
    if (packed) {
      if (value === "") {
        return setGoigiadinhShow(danh_sach_ve);
      }
      const search = danh_sach_ve.filter((item) => {
        return item.Ma_goi.includes(searchInput);
      });
      setGoigiadinhShow(search);
    } else {
      if (value === "") {
        return setGoisuKienShow(danh_sach_ve_su_kien);
      }
      const search = danh_sach_ve_su_kien.filter((item) => {
        return item.Ma_goi.includes(searchInput);
      });
      setGoisuKienShow(search);
    }
  };

  //Tình trạng
  const handleChange = (value: string) => {
    setTinhTrang(value);
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

  //Lấy ngày bắt đầu
  const onChangeStartDate = (date: any, dateString: string) => {
    setStartDate(dateString);
  };

  //Lấy ngày kết thúc
  const onChangeEndDate = (date: any, dateString: string) => {
    setEndDate(dateString);
  };

  return (
    <div className="setting-page">
      <div className="table-page">
        <h1>Danh sách gói vé</h1>
        <div className="tab-list">
          <Tabs
            defaultActiveKey="1"
            onChange={handleChangePacked}
            items={items}
          />
        </div>
        <ul>
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
            <li className="btn-file_export">
              <Button onClick={handleDowload}>
                Xuất file (.csv)
              </Button>
            </li>
            <li className="btn-ticket_package">
              <Button onClick={showModal}>
                Thêm gói vé
              </Button>
            </li>

          </div>
        </ul>
        {packed ? <Family danh_sach_ve_show={danh_sach_ve_show} loading={loading} /> : <Event danh_sach_ve_su_kien_show={danh_sach_ve_su_kien_show} />}
      </div>
      <Modal
        title="Thêm gói vé"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        className="custom-modal"
        width={550}
      >
        {!packed &&
          (<Space wrap>
            <h4>Tên sự kiện</h4>
            <Input className="form-event" placeholder="Nhập tên sự kiện" value={ten_su_kien} onChange={(e) => setTenSuKien(e.target.value)}/>
          </Space>)
        }
        <ul className="date-modal1">
          <li className="since">
            <h4>Ngày áp dụng</h4>
            <DatePicker onChange={onChangeStartDate} format={dateFormatList} className="Date" />
            <TimePicker className="Time" onChange={(date, dateString) => {
              setTimeStart(dateString);
            }}/>
          </li>
          <li className="to-date">
            <h4>Đến hết hạn</h4>
            <DatePicker onChange={onChangeEndDate} format={dateFormatList} className="Date" />
            <TimePicker className="Time" onChange={(date, dateString) => {
              setTimeEnd(dateString);
            }} />
          </li>
        </ul>
        <h4>Giá vé áp dụng</h4>
        <ul className="Gia-ve_ap-dung">
          <li className="Ve-le">
            <Checkbox value="Vé lẻ" className="fare">Vé lẻ (vnđ/vé) với giá</Checkbox>
            <Input className="form_fare" placeholder="Giá vé" onChange={(e) => setGiaVeLe(e.target.value)}/>
            <p>/ vé</p>
          </li>
          <li className="Combo">
            <Checkbox value="Vé lẻ" className="fare">Combo vé với giá</Checkbox>
            <Input className="form_fare" placeholder="Giá vé" onChange={(e) => setGiaVeCombo(e.target.value)} />
            <p>/</p>
            <Input className="form_ticket" placeholder="Vé" onChange={(e) => setSoLuongVe(e.target.value)} />
            <p>vé</p>
          </li>
        </ul>
        <h4>Tình trạng</h4>
        <Space wrap>
          <Select
            defaultValue="Đang áp dụng"
            style={{ width: 140 }}
            onChange={handleChange}
            className="select-status1"
            options={[
              { value: 'Đang áp dụng', label: 'Đang áp dụng' },
              { value: 'Tắt', label: 'Tắt' },
            ]}
          />
        </Space>
        <div className="button-container">
          <Button className="cancel-btn" onClick={handleCancel}>
            Hủy
          </Button>
          <Button
            onClick={handleSave}
            className="save-btn">
            Lưu
          </Button>
        </div>
      </Modal>
      <CSVLink data={csvData} filename={`${fileName}.csv`} className="hidden" ref={csvLink} target="_blank" />
    </div>
  )
}

export default SettingPage