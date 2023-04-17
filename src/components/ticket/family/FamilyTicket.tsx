import React, { useState } from "react";
import { ref, get } from "firebase/database";
import './FamilyTicket.css'
import { Pagination } from "antd";
import database from "../../../firebase/firebase";

interface goi_gia_dinh {
  id: number;
  So_ve: string;
  Ngay_su_dung: string;
  Loai_ve: string;
  Cong_check_in: string;
  a: string;
}

const ticket_list = [
  "STT",
  "Số vé",
  "Ngày sử dụng",
  "Loại vé",
  "Cổng Check-in",
  "",
];

const renderHead = (item: any, index: any) => <th key={index}>{item}</th>;

const renderBody = (item: any, index: any) => (
  <tr key={index}>
    <td>{item.id}</td>
    <td>{item.So_ve}</td>
    <td>{item.Ngay_su_dung}</td>
    <td>{item.Loai_ve}</td>
    <td>{item.Cong_check_in}</td>
    <td 
      className={
        item.a === "Đã đối soát" 
        ? "control" 
        : "not-control"
      }
    >
      {item.a}
    </td>
  </tr>
);



const FamilyTicket: React.FC<{danh_sach_ve_show: goi_gia_dinh[];
  loading: boolean;}> = ({ danh_sach_ve_show, loading}) => {
  
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
    <div>
      <div className="bang2-family">
      <table className="table">
        <thead>
          <tr>{ticket_list.map(renderHead)}</tr>
        </thead>
        {/* <tbody>{dataShow.map(renderBody)}</tbody> */}
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
    </div>
  )
}

export default FamilyTicket