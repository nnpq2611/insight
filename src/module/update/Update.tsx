import React, {useState} from 'react'
import { Input, Button, Modal, DatePicker, TimePicker, Checkbox, Space, Select } from "antd";
import { EditOutlined } from '@ant-design/icons';
import { get, ref, set } from "firebase/database";
import database from "../../firebase/firebase";
import { v4 as uuidv4 } from 'uuid';
import "./Update.css";

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

const Update = () => {
    
    const [packed, setPacked] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tinh_trang, setTinhTrang] = useState("Đang áp dụng");
    const [gia_ve_le, setGiaVeLe] = useState("");
    const [gia_ve_combo, setGiaVeCombo] = useState("");
    const [so_luong_ve, setSoLuongVe] = useState("");
    const [timeStart, setTimeStart] = useState("");
    const [timeEnd, setTimeEnd] = useState("");
    const [ten_su_kien, setTenSuKien] = useState("")
    const [ma_su_kien, setMaSuKien] = useState("")
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const dateFormatList = ['DD/MM/YYYY'];
    const [loading, setLoading] = useState(false);
    const starCountRefEvent = ref(database, "danh_sach_ve/goi_su_kien");
    const starCountRefFamily = ref(database, "danh_sach_ve/goi_gia_dinh");
    const [danh_sach_ve, setGoigiadinh] = useState<goi_gia_dinh[]>([]);
    const [danh_sach_ve_show, setGoigiadinhShow] = useState<goi_gia_dinh[]>([]);
    const [danh_sach_ve_su_kien, setGoisuKien] = useState<goi_su_kien[]>([]);
    const [danh_sach_ve_su_kien_show, setGoisuKienShow] = useState<goi_su_kien[]>([]);

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
        <Button className='btn-EditOutlined' onClick={showModal}><EditOutlined/>Cập nhật</Button>
        <Modal
        title="Cập nhật thông tin gói vé"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        className="custom-modal"
        width={550}
        >
          
          {!packed &&
            (<Space wrap>
              <ul>
                <li>
                  <h4>Mã sự kiện</h4>
                  {/* <Input className="form-event" placeholder="Nhập mã sự kiện" value={ma_su_kien} onChange={(e) => setMaSuKien(e.target.value)}/> */}
                </li>
                <li>
                  <h4>Tên sự kiện</h4>
                  <Input className="form-event" placeholder="Nhập tên sự kiện" value={ten_su_kien} onChange={(e) => setTenSuKien(e.target.value)}/>
                </li>
              </ul>
              
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
      </div> 
    )
}

export default Update