import React, { useState } from "react";
import "./FamilyManage.css";
import { Pagination } from "antd";
import database from "../../../firebase/firebase";

interface goi_gia_dinh {
  id: number;
  Booking_Code: string;
  So_ve: string;
  Tinh_trang_su_dung: string;
  Ngay_su_dung: string;
  Ngay_xuat_ve: string;
  Cong_check_in: string;
}

const ticket_list = [
  "STT",
  "Booking code",
  "Số vé",
  "Tình trạng sử dụng",
  "Ngày sử dụng",
  "Ngày xuất vé",
  "Cổng Check-in",
];

const renderHead = (item: any, index: any) => <th key={index}>{item}</th>;

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

const renderBody = (item: any, index: any) => (
  <tr key={index}>
    <td>{item.id}</td>
    <td>{item.Booking_Code}</td>
    <td>{item.So_ve}</td>
    <td
      className={
        item.Tinh_trang_su_dung === "Đã sử dụng"
          ? "used"
          : converDate(item.Han_su_dung).getTime() < getCurrentDate().getTime()
          ? "expired"
          : "notUse"
      }
    >
      {item.Tinh_trang_su_dung === "Đã sử dụng"
        ? "Đã sử dụng"
        : converDate(item.Han_su_dung).getTime() < getCurrentDate().getTime()
        ? "Hết hạn"
        : "Chưa sử dụng"}
    </td>
    <td>{item.Ngay_su_dung}</td>
    <td>{item.Ngay_xuat_ve}</td>
    <td>{item.Cong_check_in}</td>
  </tr>
);

const Family: React.FC<{
  danh_sach_ve_show: goi_gia_dinh[];
  loading: boolean;
}> = ({ danh_sach_ve_show, loading }) => {
  const [dataShow, setDataShow] = useState<goi_gia_dinh[]>([]);

  React.useEffect(() => {
    setDataShow(danh_sach_ve_show.slice(0, 10));
  }, [danh_sach_ve_show]);

  const selectPage = (page: any) => {
    const start = 10 * page;
    const end = start + 10;
    setDataShow(danh_sach_ve_show.slice(start, end));
  };

  return (
    <div className="bang1-family">
      <table className="table">
        <thead>
          <tr>{ticket_list.map(renderHead)}</tr>
        </thead>
        {loading ?(
          <tbody>
            <tr>
              <td colSpan={7} className="loading">
                Loading...
              </td>
            </tr>
          </tbody>
        ) : (
          <tbody>{dataShow.map(renderBody)}</tbody>
        )}
      </table>

      <Pagination
        defaultCurrent={1}
        total={danh_sach_ve_show.length}
        onChange={(page) => selectPage(page - 1)}
        className="pagination"
      />
    </div>
  );
};

export default Family;
