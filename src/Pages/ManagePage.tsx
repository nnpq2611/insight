import React, { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import "./ManagePage.css";
import { Input, Tabs } from "antd";
import type { TabsProps } from "antd";
import Family from "../components/ticket/family/Family";
import Event from "../components/ticket/event/Event";

const ManagePage = (item: any, index: any) => {
  const [packed, setPacked] = useState(true);
  const handleChangePacked = () => {
    setPacked(!packed);
  };
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: `Gói gia đình`,
    },
    {
      key: "2",
      label: `Gói sự kiện`,
    },
  ];
  return (
    <div className="magage-page">
      <div className="table-page">
        <h1>Danh sách vé</h1>
        <ul>
          <div className="tab-list">
            {/* <Tabs defaultActiveKey="1" onChange={handleChangePacked} className="tab-custom">
              <Tabs.TabPane tab="Gói gia đình" key="1" />
              <Tabs.TabPane tab="Gói sự kiện" key="2" />
            </Tabs> */}
            <Tabs
              defaultActiveKey="1"
              onChange={handleChangePacked}
              items={items}
            />
          </div>

          <li className="search">
            <Input
              className="form-control"
              placeholder="Tìm bằng số vé"
              suffix={<SearchOutlined />}
            />
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
