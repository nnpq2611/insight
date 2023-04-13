import React, { useState } from "react";
import { SearchOutlined, FilterOutlined } from "@ant-design/icons";
import "./ManagePage.css";
import { Input, Tabs, Button, Modal, Radio, Space } from "antd";
import type { TabsProps } from "antd";
import Family from "../components/ticket/family/FamilyManage";
import Event from "../components/ticket/event/EventManage";
import DatePickerCustom from "../module/date/DatePicker";
import type { SpaceSize } from "antd/es/space";
import { Checkbox, Col, Row } from "antd";
import type { CheckboxValueType } from "antd/es/checkbox/Group";
import database from "../firebase/firebase";
// import { ref, get } from "firebase/database";

interface goi_su_kien {
  id: number;
  Booking_Code: string;
  So_ve: string;
  Ten_su_kien: string;
  Tinh_trang_su_dung: string;
  Ngay_su_dung: string;
  Han_su_dung: string;
  Cong_check_in: string;
}

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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const [status, setStatus] = useState<SpaceSize | [SpaceSize, SpaceSize]>(
    "small"
  );
  const onChange = (checkedValues: CheckboxValueType[]) => {
    console.log("checked = ", checkedValues);
  };

  // const [danh_sach_ve, setSukien] = useState<goi_su_kien[]>([]);;
  
  // React.useEffect(() => {
  //   // get data from firebase
  //   const starCountRef = ref(database, "danh_sach_ve/goi_su_kien");
  // }, []);
  return (
    <div className="magage-page">
      <div className="table-page">
        <h1>Danh sách vé</h1>
        <ul>
          <div className="tab-list">
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
        {packed ? <Family /> : <Event />}
      </div>
      <Modal
        title="Lọc vé"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        className="custom-modal"
        width={480}
      >
        <ul className="date-modal">
          <li>
            <p>Từ ngày</p>
            <DatePickerCustom />
          </li>
          <li>
            <p>Đến ngày</p>
            <DatePickerCustom />
          </li>
        </ul>
        <p>Tình trạng sử dụng</p>
        <Radio.Group value={status} onChange={(e) => setStatus(e.target.value)}>
          <Radio value="all">Tất cả</Radio>
          <Radio value="used">Đã sử dụng</Radio>
          <Radio value="not-use">Chưa sử dụng</Radio>
          <Radio value="expired">Hết hạn</Radio>
        </Radio.Group>
        <p>Cổng Check - in</p>
        <Checkbox.Group style={{ width: "100%" }} onChange={onChange}>
          <Row>
            <Col span={8}>
              <Checkbox value="A">Cổng 1</Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox value="B">Cổng 2</Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox value="C">Cổng 3</Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox value="D">Cổng 4</Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox value="E">Cổng 5</Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox value="F">Cổng 6</Checkbox>
            </Col>
          </Row>
        </Checkbox.Group>
        <Button className="btn-filter" onClick={showModal}>
          Lọc
        </Button>
      </Modal>
    </div>
  );
};

export default ManagePage;
function setPacked(arg0: boolean) {
  throw new Error("Function not implemented.");
}
