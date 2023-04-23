import React, {useState} from 'react'
import './Family.css'
import { Pagination } from "antd";
import {EditOutlined} from '@ant-design/icons';
import { Button, Modal } from "antd";

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
      <td><Button className='btn-EditOutlined'><EditOutlined/>{item.b}</Button></td>
  </tr>
  
);




const FamilySetting: React.FC<{danh_sach_ve_show: goi_gia_dinh[];
  loading: boolean;}> = ({ danh_sach_ve_show, loading}, item:any) => {
    
  const [dataShow, setDataShow] = useState<goi_gia_dinh[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

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
              {/* <td colSpan={7} className="loading">
                Loading...
              </td> */}
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
              <td onClick={showModal}><Button ><EditOutlined/>{item.b}</Button></td>
            </tr>
          </tbody>
        ) : (
          <tbody>{dataShow.map(renderBody)}</tbody>
        )}
      </table>

      <Modal
        title="Cập nhật thông tin gói vé"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        className="custom-modal1"
        width={550}
      >
        <h4>Mã sự kiện</h4>
        {/* {!packed &&
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
        </div> */}
      </Modal>
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