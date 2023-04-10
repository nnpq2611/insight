import React, { useState } from "react";
import { SearchOutlined } from '@ant-design/icons';
import {  ref, get } from "firebase/database";
import "./ManagePage.css";
import Navbar from "react-bootstrap/Nav";
import Header from "../components/header/Header";
import { Input } from "antd";
import Family from "../components/ticket/family/Family";
import Event from "../components/ticket/event/Event";

const ManagePage = (item: any, index: any) => {
  const [packed, setPacked] = useState(true);
  const handleChangePacked = () => {
    setPacked(!packed);
  };
  return (
    <div className="magage-page">
      <div className="header">
        <Header />
      </div>
      <div className="table-page">
        <h1>Danh sách vé</h1>
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
          <li className="ticket_filter">
            <i className="fa-solid fa-filter"></i>
            <span>Lọc vé</span>
          </li>
          <li className="export_file">
            <span>Xuất file (.csv)</span>
          </li>
        </ul>
        
      {packed ? <Family /> : <Event />}
      
        
        
      </div>
    </div>
  );
};

export default ManagePage;
function setPacked(arg0: boolean) {
  throw new Error("Function not implemented.");
}

