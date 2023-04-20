import React, {useState} from 'react'
import './Family.css'
import { Pagination } from "antd";
import {EditOutlined} from '@ant-design/icons';
import { Button, Modal } from "antd";

interface goi_gia_dinh {
  id: number;
  Ma_goi: string;
  Ten_goi_ve: string;
  Ngay_xuat_ve: string;
  Thoi_gian_ap_dung: string;
  Han_su_dung: string;
  Thoi_gian_het_han: string;
  Gia_ve_le: string;
  Gia_ve_combo: string;
  Tinh_trang: string;
  b: string;
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

// const [isModalOpen, setIsModalOpen] = useState(false);

// const showModal = () => {
//   setIsModalOpen(true);
// };

const renderHead = (item: any, index: any) => <th key={index}>{item}</th>;

const renderBody = (item: any, index: any) => (
  <tr key={index}>
      <td>{item.id}</td>
      <td>{item.Ma_goi}</td>
      <td>{item.Ten_goi_ve}</td>
      <td>{item.Ngay_xuat_ve} <br /> {item.Thoi_gian_ap_dung}</td>
      <td>{item.Han_su_dung} <br/> {item.Thoi_gian_het_han}</td>
      <td>{item.Gia_ve_le}</td>
      <td>{item.Gia_ve_combo}</td>
      <td 
          className={
          item.Tinh_trang === "Đang áp dụng" 
          ? "apply" 
          : "not-apply"
      }
      >
      {item.Tinh_trang}</td>
      <td><Button className='EditOutlined'><EditOutlined/>{item.b}</Button></td>
  </tr>
);


const FamilySetting: React.FC<{danh_sach_ve_show: goi_gia_dinh[];
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
    <div className='bang1-family'>
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
  )
}

export default FamilySetting