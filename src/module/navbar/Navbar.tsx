import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css"
import Logo from "../../assets/image/logo.png";

const Navbar = () => {
  const data = [
    {
      name: "Trang Chủ",
      icon: "fas fa-home",
      path: "/",
    },
    {
      name: "Quản lý vé",
      icon: "fas fa-ticket-alt",
      path: "/about",
    },
    {
      name: "Đối soát vé",
      icon: "fas fa-file-lines",
      path: "/about",
    },
    {
      name: "Danh sách sự kiện",
      icon: "fas fa-list-ul",
      path: "/about",
    },
    {
      name: "Quản lý thiết bị",
      icon: "fas fa-display",
      path: "/about",
    },
    {
      name: "Cài đặt",
      icon: "fas fa-gear",
      path: "/about",
    },
  ];

  return (
    <nav className="nav-bar">
      <img src={Logo} alt="logo" />
      <ul className="nav-bar-list">
        {data.map((item, index) => (
          <li key={index} className="nav-bar-item">
            <Link to={item.path} className="nav-bar-link">
              <i className={item.icon}></i>
              <span>{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
