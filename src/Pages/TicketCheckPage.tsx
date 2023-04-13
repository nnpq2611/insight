import React, { useState } from "react";
import './TicketCheckPage.css'
import { SearchOutlined } from '@ant-design/icons';
import { Input, Tabs, Button, Radio, Space} from "antd";
import type { TabsProps } from "antd";
import Family from "../components/ticket/family/FamilyTicket";
import Event from "../components/ticket/event/EventTicket";
import type { RadioChangeEvent } from 'antd';
import DatePickerCustom from "../module/date/DatePicker";

const TicketCheckPage = () => {
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

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };
    
    const [value, setValue] = useState(1);

    const onChange = (e: RadioChangeEvent) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };
    return (
        <div className="tickercheck-page">
            <div className="table-page">
                <h1>Đối soát vé</h1>
                <ul>
                    <div className="tab-list">
                        <Tabs
                            defaultActiveKey="1"
                            onChange={handleChangePacked}
                            items={items}
                        />
                    </div>
                    <li className="search">
                        <Input className="form-control" placeholder="Tìm bằng số vé" suffix={<SearchOutlined />} />
                    </li>
                    <li className="btn-control">
                        <Button onClick={showModal}>
                            Chốt đối soát
                        </Button>
                    </li>

                    {packed ? <Family /> : <Event />}
                </ul>
            </div>
            <div className="body-loc_ve">
                <h1>Lọc vé</h1>
                <ul>
                    <li className="status-loc_ve">
                        <p>Tình trạng đối soát</p>
                        <Radio.Group className="satus-radio" onChange={onChange} value={value}>
                            <Space direction="vertical">
                                <Radio value={1}>Tất cả</Radio>
                                <Radio value={2}>Đã đối soát</Radio>
                                <Radio value={3}>Chưa đối soát</Radio>       
                            </Space>
                        </Radio.Group>
                    </li>
                    <li className="loai-ve-loc_ve">
                        <p>Loại vé</p>
                        {/* <p>Vé cổng</p> */}
                    </li>
                    <li className="since">
                        <p>Từ ngày</p>
                        <DatePickerCustom />
                    </li>
                    <li className="to-date">
                        <p>Đến ngày</p>
                        <DatePickerCustom />
                    </li>
                    <li className="btn-filter">
                        <Button onClick={showModal}>
                            Lọc 
                        </Button>
                    </li>
                </ul>
            </div>

                
        </div>
        
    )
}

export default TicketCheckPage