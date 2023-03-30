import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css"
import Logo from "../../assets/image/logo.png";

const Navbar = () => {
  const [data, setData] = React.useState ([
    {
      name: "Trang Chủ",
      icon: "fas fa-home",
      path: "/",
      isActivate: true,
    },
    {
      name: "Quản lý vé",
      icon: "fas fa-ticket-alt",
      path: "/about",
      isActivate: false,
    },
    {
      name: "Đối soát vé",
      icon: "fas fa-file-lines",
      path: "/about",
      isActivate: false,
    },
    {
      name: "Cài đặt",
      icon: "fas fa-gear",
      path: "/about",
      isActivate: false,
    },
  ])

  const handleActive = (index: number) => {
    const newData = data.map((item, i) => {
      if (i === index) {
        return {
          ...item,
          isActivate: true,
        };
      }
      return {
        ...item,
        isActivate: false,
      };
    });
    setData(newData);
  };

  return (
    <nav className="nav-bar">
      <img src={Logo} alt="logo" />
      <ul className="nav-bar-list">
        {data.map((item, index) => (
          <li key={index} className="nav-bar-item" onClick={() => handleActive(index)}>
            <Link to={item.path} className={item.isActivate ? "nav-bar-link active" : "nav-bar-link"}>
              <i className={item.icon}></i>
              <span>{item.name}</span>
            </Link>
          </li>
        ))}
        <li className="nav-bar-item">
          <span className="nav-data">Gói dịch vụ</span>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
