import React, { useState, useEffect } from 'react';
import './ManagePage.css'
import { Link } from "react-router-dom";
import Header from "../components/header/Header";
import danhsachve from "../assets/data/danhsachve.json"
import Table_List from '../components/table/Table'
import { Button, Table } from 'antd';


const ticket_list = [
    'STT',
    'Booking code',
    'Số vé',
    'Tình trạng sử dụng',
    'Ngày sử dụng',
    'Ngày xuất vé',
    'Cổng Check-in'
]


// const renderHead = (item, index) => (
//     <th key={index}>{item}</th>
// )

// const renderBody = (item, index) => (
//     <tr key={index}>
//         <td>{item.id}</td>
//         <td>{item.Booking_Code}</td>
//         <td>{item.So_ve}</td>
//         <td>{item.Tinh_trang_su_dung}</td>
//         <td>{item.Ngay_su_dung}</td>
//         <td>{item.Ngay_xuat_ve}</td>
//         <td>{item.Cong_check_in}</td>
//     </tr>
// )

const ManagePage = () => {
    return (
        <div className="magage-page">
            <div className="header">
                <Header/>
            </div>
            <div className="table-page">
                <h1>Danh sách vé</h1>
                <ul>
                    <li className="search">
                        <input className="form-control fst-italic me-2" type="search" placeholder="Tìm bằng số vé" aria-label="Search"/>          
                        
                    </li>
                    <li className="ticket_filter">
                        <i className="fa-solid fa-filter"></i>
                        <span>Lọc vé</span>
                    </li>
                    <li className="export_file">
                        <span>Xuất file (.csv)</span>
                    </li>
                </ul>
                <table className="table">
                    <thead>
                        <tr>
                            <th className="table-col" scope="col">STT</th>
                            <th className="table-col" scope="col">Booking code</th>
                            <th className="table-col" scope="col">Số vé</th>
                            <th className="table-col" scope="col">Tình trạng sử dụng</th>
                            <th className="table-col" scope="col">Ngày sử dụng</th>
                            <th className="table-col" scope="col">Ngày xuất vé</th>
                            <th className="table-col" scope="col">Cổng Check-in</th>
                        </tr>
                        <tr>
                            <td className="table-col" scope="col">1</td>
                            <td className="table-col" scope="col">ALTFGHJU</td>
                            <td className="table-col" scope="col">123456789101</td>
                            <td className="table-col" scope="col">Đã sử dụng</td>
                            <td className="table-col" scope="col">12/12/2021</td>
                            <td className="table-col" scope="col">12/12/2021</td>
                            <td className="table-col" scope="col">Cổng 1</td>
                        </tr>
                        <tr>
                            <td className="table-col" scope="col">2</td>
                            <td className="table-col" scope="col">ALTFGHJL</td>
                            <td className="table-col" scope="col">123456789102</td>
                            <td className="table-col" scope="col">Chưa sử dụng</td>
                            <td className="table-col" scope="col">12/12/2021</td>
                            <td className="table-col" scope="col">12/12/2021</td>
                            <td className="table-col" scope="col">-</td>
                        </tr>
                        <tr>
                            <td className="table-col" scope="col">3</td>
                            <td className="table-col" scope="col">ALTFGHHL</td>
                            <td className="table-col" scope="col">123456789103</td>
                            <td className="table-col" scope="col">Hết hạn</td>
                            <td className="table-col" scope="col">12/12/2021</td>
                            <td className="table-col" scope="col">12/12/2021</td>
                            <td className="table-col" scope="col">-</td>
                        </tr>
                        <tr>
                            <td className="table-col" scope="col">4</td>
                            <td className="table-col" scope="col">ALTFGTJL</td>
                            <td className="table-col" scope="col">123456789104</td>
                            <td className="table-col" scope="col">Hết hạn</td>
                            <td className="table-col" scope="col">12/12/2021</td>
                            <td className="table-col" scope="col">12/12/2021</td>
                            <td className="table-col" scope="col">-</td>
                        </tr>
                        <tr>
                            <td className="table-col" scope="col">5</td>
                            <td className="table-col" scope="col">ALTFGHJL</td>
                            <td className="table-col" scope="col">123456789102</td>
                            <td className="table-col" scope="col">Đã sử dụng</td>
                            <td className="table-col" scope="col">12/12/2021</td>
                            <td className="table-col" scope="col">12/12/2021</td>
                            <td className="table-col" scope="col">Cổng 1</td>
                        </tr>
                        <tr>
                            <td className="table-col" scope="col">6</td>
                            <td className="table-col" scope="col">ALTFGHJL</td>
                            <td className="table-col" scope="col">123456789102</td>
                            <td className="table-col" scope="col">Chưa sử dụng</td>
                            <td className="table-col" scope="col">12/12/2021</td>
                            <td className="table-col" scope="col">12/12/2021</td>
                            <td className="table-col" scope="col">-</td>
                        </tr>
                        <tr>
                            <td className="table-col" scope="col">7</td>
                            <td className="table-col" scope="col">ALTFGHJL</td>
                            <td className="table-col" scope="col">123456789102</td>
                            <td className="table-col" scope="col">Chưa sử dụng</td>
                            <td className="table-col" scope="col">12/12/2021</td>
                            <td className="table-col" scope="col">12/12/2021</td>
                            <td className="table-col" scope="col">-</td>
                        </tr>
                        <tr>
                            <td className="table-col" scope="col">8</td>
                            <td className="table-col" scope="col">ALTFGHJL</td>
                            <td className="table-col" scope="col">123456789102</td>
                            <td className="table-col" scope="col">Chưa sử dụng</td>
                            <td className="table-col" scope="col">12/12/2021</td>
                            <td className="table-col" scope="col">12/12/2021</td>
                            <td className="table-col" scope="col">-</td>
                        </tr>
                        <tr>
                            <td className="table-col" scope="col">9</td>
                            <td className="table-col" scope="col">ALTFGHJL</td>
                            <td className="table-col" scope="col">123456789102</td>
                            <td className="table-col" scope="col">Chưa sử dụng</td>
                            <td className="table-col" scope="col">12/12/2021</td>
                            <td className="table-col" scope="col">12/12/2021</td>
                            <td className="table-col" scope="col">-</td>
                        </tr>
                        <tr>
                            <td className="table-col" scope="col">10</td>
                            <td className="table-col" scope="col">ALTFGHJL</td>
                            <td className="table-col" scope="col">123456789102</td>
                            <td className="table-col" scope="col">Chưa sử dụng</td>
                            <td className="table-col" scope="col">12/12/2021</td>
                            <td className="table-col" scope="col">12/12/2021</td>
                            <td className="table-col" scope="col">-</td>
                        </tr>
                        
                    </thead>
                </table>
                
                {/* <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card__body">
                                <Table
                                    limit='10'
                                    headData={ticket_list}
                                    renderHead={(item, index) => renderHead(item, index)}
                                    bodyData={danhsachve}
                                    renderBody={(item, index) => renderBody(item, index)}
                                />
                            </div>
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    )
}

export default ManagePage