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



const FamilyTicket = () => {
  const [danh_sach_ve, setGoigiadinh] = useState<goi_gia_dinh[]>([]);
  const [dataShow, setDataShow] = useState<goi_gia_dinh[]>([]);

  const selectPage = (page: any) => {
    const start = 10 * page;
    const end = start + 10;
    setDataShow(danh_sach_ve.slice(start, end));
  };

  React.useEffect(() => {
    // get data from firebase
    const starCountRef = ref(database, "danh_sach_ve/goi_gia_dinh");
    get(starCountRef)
      .then((snapshot: any) => {
        if (snapshot.exists()) {
          setGoigiadinh(snapshot.val());
          setDataShow(snapshot.val().slice(0, 10));
        } else {
          console.log("No data available");
        }
      })
      .catch((error: any) => {
        console.error(error);
      });
  }, []);
  return (
    <div>
      <div className="bang2-family">
      <table className="table">
        <thead>
          <tr>{ticket_list.map(renderHead)}</tr>
        </thead>
        <tbody>{dataShow.map(renderBody)}</tbody>
      </table>

      <Pagination
        defaultCurrent={1}
        total={danh_sach_ve.length}
        onChange={(page) => selectPage(page - 1)}
        className="pagination"
      />
    </div>
    </div>
  )
}

export default FamilyTicket