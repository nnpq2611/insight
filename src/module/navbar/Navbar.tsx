import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./navbar.css"
import Logo from "../../assets/image/logo.png";

const Navbar = () => {
  const location = useLocation();
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
      path: "/ticket",
    },
    {
      name: "Cài đặt",
      icon: "fas fa-gear",
      path: "/setting",
    },
  ];

  return (
    <nav className="nav-bar">
      <img src={Logo} alt="logo" />
      <ul className="nav-bar-list">
        {data.map((item, index) => (
          <li key={index} className="nav-bar-item">
            <Link to={item.path} className={location.pathname === item.path ? "nav-bar-link active" : "nav-bar-link"}>
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
