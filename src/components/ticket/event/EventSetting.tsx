import React, { useState } from "react";
import "./Event.css";
import { Pagination } from "antd";
import { EditOutlined } from "@ant-design/icons";
import Update from '../../../module/update/Update';

interface goi_su_kien {
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

const ticket_list = [
  "STT",
  "Mã vé",
  "Tên gói vé",
  "Ngày áp dụng",
  "Ngày hết hạn",
  "Giá vé (VNĐ/Vé)",
  "Giá Combo (VNĐ/Combo)",
  "Tình trạng",
  " ",
];

const renderHead = (item: any, index: any) => <th key={index}>{item}</th>;

const renderBody = (item: any, index: any) => (
  <tr key={index}>
    <td>{item.id}</td>
    <td>{item.Ma_goi}</td>
    <td>{item.Ten_goi_ve}</td>
    <td>
      {item.Ngay_xuat_ve} <br /> {item.Thoi_gian_ap_dung}
    </td>
    <td>
      {item.Han_su_dung} <br /> {item.Thoi_gian_het_han}
    </td>
    <td>{item.Gia_ve_le}</td>
    <td>{item.Gia_ve_combo}</td>
    <td className={item.Tinh_trang === "Đang áp dụng" ? "apply" : "not-apply"}>
      {item.Tinh_trang}
    </td>
    <td>
      <Update />
    </td>
  </tr>
);

const EventSetting: React.FC<{ danh_sach_ve_su_kien_show: goi_su_kien[] }> = ({
  danh_sach_ve_su_kien_show,
}) => {
  const [dataShow, setDataShow] = useState<goi_su_kien[]>([]);

  React.useEffect(() => {
    setDataShow(danh_sach_ve_su_kien_show.slice(0, 10));
  }, [danh_sach_ve_su_kien_show]);

  const selectPage = (page: any) => {
    const start = 10 * page;
    const end = start + 10;
    setDataShow(danh_sach_ve_su_kien_show.slice(start, end));
  };
  return (
    <div className="bang1-event">
      <table className="table">
        <thead>
          <tr>{ticket_list.map(renderHead)}</tr>
        </thead>
        <tbody>{dataShow.map(renderBody)}</tbody>
      </table>

      <Pagination
        defaultCurrent={1}
        total={danh_sach_ve_su_kien_show.length}
        onChange={(page) => selectPage(page - 1)}
        className="pagination"
      />
    </div>
  );
};

export default EventSetting;
