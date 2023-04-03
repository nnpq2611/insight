import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css'
import img2 from "../../assets/image/Frame.png"

const Header = () => {
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
        <ul className="header">
            <li className="search">
                <input className="form-control fst-italic me-2" type="search" placeholder="Search" aria-label="Search" />
            </li>
            {data.map((item, index) => (
                <li key={index} className="nav-bar-item">
                    <Link to={item.path} className="nav-bar-link">
                        <i className={item.icon}></i>
                    </Link>
                </li>
            ))}
            <li>
                <img src={img2} alt="ảnh đại diện" />
            </li>
        </ul>
    )
}

export default Header