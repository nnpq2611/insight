import React from 'react'
import { Link } from 'react-router-dom'
import './TicketCheckPage.css'

const TicketCheckPage = () => {
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
        <div>
            <div className="tickercheck-page">
                <ul className="header">
                    <li className="search">
                        <form className="d-flex" role="search">
                            <input className="form-control fst-italic me-2" type="search" placeholder="Search" aria-label="Search"/>          
                            <i className="fa-solid fa-magnifying-glass"></i>
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
                        <img src="" alt="ảnh đại diện" />  
                    </li>
                </ul>
            </div>
        </div>
  )
}

export default TicketCheckPage