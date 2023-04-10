import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import './TicketCheckPage.css'
import Header from "../components/header/Header";
import data from "../assets/data/danhsachve.json";
import { Input, Pagination } from "antd";

const manage_list = [
    "STT",
    "Số vé",
    "Ngày sử dụng",
    "Tên loại vé",
    "Cổng Check-in",
    " "
  ];
  
  const renderHead = (item: any, index: any) => <th key={index}>{item}</th>;
  
  const renderBody = (item: any, index: any) => (
    <tr key={index}>
        <td>{item.id}</td>
        <td>{item.So_ve}</td>
        <td>{item.Ngay_su_dung}</td>
        <td>{item.Ten_loai_ve}</td>
        <td>{item.Cong_check_in}</td>
        <td>{item.a}</td>
    </tr>
  );

const TicketCheckPage = () => {
    
    return (
        <div className="tickercheck-page">
            <div className="header">
                <Header/>
            </div>
            <div className="table-page">
                <h1>Đối soát vé</h1>
                <li className="search">
                    <input className="form-control fst-italic me-2" type="search" placeholder="Tìm bằng số vé" aria-label="Search"/>          
                    
                </li>
                

                
            </div>
                
        </div>
        
  )
}

export default TicketCheckPage