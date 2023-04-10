import React, { useState } from "react";
import {  ref, get } from "firebase/database";

import { Pagination } from "antd";
import database from "../../../firebase/firebase";

interface goi_gia_dinh{
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

const renderBody = (item: any, index: any) => (
  <tr key={index}>
    <td>{item.id}</td>
    <td>{item.Booking_Code}</td>
    <td>{item.So_ve}</td>
    <td>{item.Tinh_trang_su_dung}</td>
    <td>{item.Ngay_su_dung}</td>
    <td>{item.Ngay_xuat_ve}</td>
    <td>{item.Cong_check_in}</td>
  </tr>
);

const Family = (item: any, index: any) => {
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
        get(starCountRef).then((snapshot: any) => {
        if (snapshot.exists()) {
            setGoigiadinh(snapshot.val());
            setDataShow(snapshot.val().slice(0, 10));
            console.log('Products:', snapshot.val());
        } else {
            console.log("No data available");
        }
        }).catch((error: any) => {
        console.error(error);
        });
        
    }, []);
    

    return (
        <div className="bang">
            <table className="table">
                <thead>
                    {ticket_list.map(renderHead)}
                    {dataShow.map(renderBody)}
                </thead>
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

export default Family