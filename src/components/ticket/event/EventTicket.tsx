import React, {useState} from 'react'
import { ref, get } from "firebase/database";
import { Pagination } from "antd";
import database from "../../../firebase/firebase";
import "./EventTicket.css";

interface goi_su_kien {
  id: number;
  So_ve: string;
  Ten_su_kien: string;
  Ngay_su_dung: string;
  Ten_loai_ve: string;
  Cong_check_in: string;
  a:string;
}

const ticket_list = [
  "STT",
  "Số vé",
  "Tên sự kiện",
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
    <td>{item.Ten_su_kien}</td>
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


const EventTicket = () => {
  const [danh_sach_ve, setSukien] = useState<goi_su_kien[]>([]);
  const [dataShow, setDataShow] = useState<goi_su_kien[]>([]);

  const selectPage = (page: any) => {
    const start = 10 * page;
    const end = start + 10;
    setDataShow(danh_sach_ve.slice(start, end));
  };
  React.useEffect(() => {
    // get data from firebase
    const starCountRef = ref(database, "danh_sach_ve/goi_su_kien");
    get(starCountRef)
      .then((snapshot: any) => {
        if (snapshot.exists()) {
          setSukien(snapshot.val());
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
      <div className='bang2-event'>
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
    )
}

export default EventTicket