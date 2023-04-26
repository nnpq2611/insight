import React, { useState } from "react";
import {
  Input,
  Button,
  Modal,
  DatePicker,
  TimePicker,
  Checkbox,
  Space,
  Select,
} from "antd";
import { EditOutlined } from "@ant-design/icons";
import dayjs from 'dayjs';

import "./Update.css";
// import update from "../../Pages/SettingPage";

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
  Ten_su_kien: string;
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

const Update: React.FC<{
  packed: boolean;
  item: goi_gia_dinh | goi_su_kien;
  updateVe: any;
}> = ({ packed, item, updateVe }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tinh_trang, setTinhTrang] = useState(item.Tinh_trang);
  const [gia_ve_le, setGiaVeLe] = useState(item.Gia_ve_le);
  const [gia_ve_combo, setGiaVeCombo] = useState(
    item.Gia_ve_combo.split("/")[0]
  );
  const [so_luong_ve, setSoLuongVe] = useState(
    item.Gia_ve_combo.split("/")[1]
      .trim()
      .split(" ")[0]
  );
  const [timeStart, setTimeStart] = useState(item.Thoi_gian_ap_dung);
  const [timeEnd, setTimeEnd] = useState(item.Thoi_gian_het_han);
  const [ten_su_kien, setTenSuKien] = useState(item.Ten_su_kien);
  const [ma_su_kien, setMaSuKien] = useState(item.Ma_goi);
  const [startDate, setStartDate] = useState(item.Ngay_xuat_ve);
  const [endDate, setEndDate] = useState(item.Han_su_dung);
  const [maGoive, setMaGoive] = useState(item.Ma_goi);
  const dateFormatList = ["DD/MM/YYYY"];

  //Tình trạng
  const handleChange = (value: string) => {
    setTinhTrang(value);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleUpdate = () => {
    let newItem = {...item};
    if (packed) {
      newItem.Ma_goi = maGoive;
      newItem.Tinh_trang = tinh_trang;
      newItem.Gia_ve_le = gia_ve_le;
      newItem.Gia_ve_combo = `${gia_ve_combo}/${so_luong_ve} vé`;
      newItem.Thoi_gian_ap_dung = timeStart;
      newItem.Thoi_gian_het_han = timeEnd;
      newItem.Ngay_xuat_ve = startDate;
      newItem.Han_su_dung = endDate;

    } else {
      newItem.Ma_goi = ma_su_kien;
      newItem.Ten_su_kien = ten_su_kien;
      newItem.Tinh_trang = tinh_trang;
      newItem.Gia_ve_le = gia_ve_le;
      newItem.Gia_ve_combo = `${gia_ve_combo}/${so_luong_ve} vé`;
      newItem.Thoi_gian_ap_dung = timeStart;
      newItem.Thoi_gian_het_han = timeEnd;
      newItem.Ngay_xuat_ve = startDate;
      newItem.Han_su_dung = endDate;
      
    }
    updateVe(item.id, newItem)
    setIsModalOpen(false);
  };

  //Lấy ngày bắt đầu
  const onChangeStartDate = (date: any, dateString: string) => {
    setStartDate(dateString);
  };

  //Lấy ngày kết thúc
  const onChangeEndDate = (date: any, dateString: string) => {
    setEndDate(dateString);
  };
  return (
    <div className="Update-btn">
      <Button className="btn-EditOutlined" onClick={showModal}>
        <EditOutlined />
        Cập nhật
      </Button>
      <Modal
        title="Cập nhật thông tin gói vé"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        className="custom-modal"
        width={550}
      >
        {packed ? (
          <Space wrap>
            <h4>Mã gói vé</h4>
            <Input
              className="family-update"
              placeholder="Nhập mã gói vé"
              value={maGoive}
              onChange={(e) => setMaGoive(e.target.value)}
            />
          </Space>
        ) : (
          <Space wrap>
            <ul className="goisukien">
              <li className="masukien">
                <h4>Mã sự kiện</h4>
                <Input
                  className="event-update1"
                  placeholder="Nhập mã sự kiện"
                  value={ma_su_kien}
                  onChange={(e) => setMaSuKien(e.target.value)}
                />
              </li>
              <li className="tensukien">
                <h4>Tên sự kiện</h4>
                <Input
                  className="event-update2"
                  placeholder="Nhập tên sự kiện"
                  value={ten_su_kien}
                  onChange={(e) => setTenSuKien(e.target.value)}
                />
              </li>
            </ul>
          </Space>
        )}
        <ul className="date-modal1">
          <li className="since">
            <h4>Ngày áp dụng</h4>
            <DatePicker
              defaultValue={dayjs(startDate, dateFormatList[0])}
              onChange={onChangeStartDate}
              format={dateFormatList}
              className="Date"
            />
            <TimePicker
              className="Time"
              defaultValue={dayjs(timeStart, "HH:mm:ss")}
              onChange={(date, dateString) => {
                setTimeStart(dateString);
              }}
            />
          </li>
          <li className="to-date">
            <h4>Đến hết hạn</h4>
            <DatePicker
              defaultValue={dayjs(endDate, dateFormatList[0])}
              onChange={onChangeEndDate}
              format={dateFormatList}
              className="Date"
            />
            <TimePicker
              className="Time"
              defaultValue={dayjs(timeEnd, "HH:mm:ss")}
              onChange={(date, dateString) => {
                setTimeEnd(dateString);
              }}
            />
          </li>
        </ul>
        <h4>Giá vé áp dụng</h4>
        <ul className="Gia-ve_ap-dung">
          <li className="Ve-le">
            <Checkbox value="Vé lẻ" className="fare">
              Vé lẻ (vnđ/vé) với giá
            </Checkbox>
            <Input
              className="form_fare"
              placeholder="Giá vé"
              value={gia_ve_le}
              onChange={(e) => setGiaVeLe(e.target.value)}
            />
            <p>/ vé</p>
          </li>
          <li className="Combo">
            <Checkbox value="Vé lẻ" className="fare">
              Combo vé với giá
            </Checkbox>
            <Input
              className="form_fare"
              placeholder="Giá vé"
              value={gia_ve_combo}
              onChange={(e) => setGiaVeCombo(e.target.value)}
            />
            <p>/</p>
            <Input
              className="form_ticket"
              placeholder="Vé"
              value={so_luong_ve}
              onChange={(e) => setSoLuongVe(e.target.value)}
            />
            <p>vé</p>
          </li>
        </ul>
        <h4>Tình trạng</h4>
        <Space wrap>
          <Select
            defaultValue={tinh_trang}
            style={{ width: 140 }}
            onChange={handleChange}
            className="select-status1"
            options={[
              { value: "Đang áp dụng", label: "Đang áp dụng" },
              { value: "Tắt", label: "Tắt" },
            ]}
          />
        </Space>
        <div className="button-container">
          <Button className="cancel-btn" onClick={handleCancel}>
            Hủy
          </Button>
          <Button onClick={handleUpdate} className="save-btn">
            Lưu
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default Update;
