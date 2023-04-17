import React, { useState } from "react";
import { SearchOutlined, FilterOutlined } from "@ant-design/icons";
import "./SettingPage.css";
import { Input, Tabs, Button, Modal, Radio } from "antd";
import type { TabsProps } from "antd";
// import DatePickerCustom from "../module/date/DatePicker";
// import type { SpaceSize } from "antd/es/space";
// import type { CheckboxValueType } from "antd/es/checkbox/Group";

const SettingPage = () => {
    const [packed, setPacked] = useState(true);
    const [searchInput, setSearchInput] = useState("");

    const handleChangePacked = () => {
        setPacked(!packed);
    };

    // const items: TabsProps["items"] = [
    //     {
    //       key: "1",
    //       label: `Gói gia đình`,
    //     },
    //     {
    //       key: "2",
    //       label: `Gói sự kiện`,
    //     },
    // ];

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    // const [status, setStatus] = useState<SpaceSize | [SpaceSize, SpaceSize]>(
    //     "small"
    // );

    // const onChange = (checkedValues: CheckboxValueType[]) => {
    //     console.log("checked = ", checkedValues);
    // };
        
    return (
        <div className="setting-page">
            <div className="table-page">
                <h1>Danh sách gói vé</h1>
                <ul>
                    {/* <div className="tab-list">
                        <Tabs
                        defaultActiveKey="1"
                        onChange={handleChangePacked}
                        items={items}
                        />
                    </div> */}
                    <li className="search">
                        <Input
                        className="form-control"
                        placeholder="Tìm bằng số vé"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        suffix={<SearchOutlined />}
                        />
                        
                    </li>
                    <div className="feature">
                        <li className="btn-feature">
                        <Button onClick={showModal}>
                            <FilterOutlined />
                            Lọc vé
                        </Button>
                        </li>
                        <li className="btn-feature">
                        <Button onClick={showModal}>
                            Xuất file (.csv)
                        </Button>
                        </li>
                    </div>
                </ul>
                {/* {packed ? <Family searchInput={searchInput}/> : <Event searchInput={searchInput}/>} */}
            </div>
        </div>
    )
}

export default SettingPage