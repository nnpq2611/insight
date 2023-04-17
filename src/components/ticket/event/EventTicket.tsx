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


const EventTicket: React.FC<{danh_sach_ve_su_kien_show: goi_su_kien[]}> = ({danh_sach_ve_su_kien_show})=> {
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
    <div className='bang2-event'>
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
  )
}

export default EventTicket