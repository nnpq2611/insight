import React, { useEffect, useState } from "react";
import DefaultAvatar from "../../assets/image/Group 3.png";
import { Link } from "react-router-dom";

const TopNav = () => {
    const [user, setUser] = useState({});
    const data = [
        {
          icon: "fa-regular fa-envelope",
          path: "/",
        },
        {
          icon: "fa-regular fa-bell",
          path: "/",
        },
    ];
    return (
        <div className="home-page">
            <ul className="header">
                <li className="search">
                <form className="d-flex" role="search">
                    <input className="form-control fst-italic me-2" type="search" placeholder="Search" aria-label="Search"/>          
                    {/* <i className="fa-solid fa-magnifying-glass"></i> */}
                </form>
                </li>
                <li className="icon-item">
                {data.map((item, index) => (
                    <li key={index} className="nav-bar-item">
                    <Link to={item.path} className="nav-bar-link">
                        <i className={item.icon}></i>
                    </Link>
                    </li>
                ))}
                </li>
                <li>
                    {/* <img src={img2} alt="ảnh đại diện" />  */}
                </li>
            </ul>
        </div>
    )
}

export default TopNav