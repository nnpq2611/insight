import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import './TicketCheckPage.css'
import { SearchOutlined } from '@ant-design/icons';
import Navbar from "react-bootstrap/Nav";

import { Input } from "antd";

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
    const [packed, setPacked] = useState(true);
    const handleChangePacked = () => {
        setPacked(!packed);
    };
    return (
        <div className="tickercheck-page">
            <div className="table-page">
                <h1>Đối soát vé</h1>
                <ul>
                    <div className="tab-list">
                        <Navbar  defaultActiveKey="/">
                        <Navbar.Link onClick={handleChangePacked} active={packed}>
                        Gói gia đình
                        </Navbar.Link>
                        <Navbar.Link onClick={handleChangePacked} active={!packed}>
                            Gói sự kiện
                        </Navbar.Link>
                        </Navbar>
                    </div>
                    
                    <li className="search">
                        <Input className="form-control" placeholder="Tìm bằng số vé" suffix={<SearchOutlined />} />
                    </li>
                    {/* <li className="ticket_filter">
                        <i className="fa-solid fa-filter"></i>
                        <span>Lọc vé</span>
                    </li>
                    <li className="export_file">
                        <span>Xuất file (.csv)</span>
                    </li> */}
                </ul>
            </div>
                
        </div>
        
  )
}

export default TicketCheckPage