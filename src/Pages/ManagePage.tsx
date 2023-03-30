import React from 'react'
import './ManagePage.css'
import { Link } from "react-router-dom";


const ManagePage = () => {
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
        <div className="magage-page">
            <div>
                <ul className="header">
                    <li className="search">
                        <form className="d-flex" role="search">
                            <input className="form-control fst-italic me-2" type="search" placeholder="Search" aria-label="Search"/>          
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
            <div className="chart">
                <h1>Danh sách vé</h1>
                <li className="search">
                    <form className="d-flex" role="search">
                        <input className="form-control fst-italic me-2" type="search" placeholder="Tìm bằng số vé" aria-label="Search"/>          
                    </form>
                </li>
                <table className="table">
                    <thead>
                        <tr>
                            <th className="table-col" scope="col">STT</th>
                            <th className="table-col" scope="col">Booking code</th>
                            <th className="table-col" scope="col">Số vé</th>
                            <th className="table-col" scope="col">Tình trạng sử dụng</th>
                            <th className="table-col" scope="col">Ngày sử dụng</th>
                            <th className="table-col" scope="col">Ngày xuất vé</th>
                            <th className="table-col" scope="col">Cổng Check-in</th>
                        </tr>
                        <tr>
                            <td className="table-col" scope="col">1</td>
                            <td className="table-col" scope="col">ALTFGHJU</td>
                            <td className="table-col" scope="col">123456789101</td>
                            <td className="table-col" scope="col">Đã sử dụng</td>
                            <td className="table-col" scope="col">12/12/2021</td>
                            <td className="table-col" scope="col">12/12/2021</td>
                            <td className="table-col" scope="col">Cổng 1</td>
                        </tr>
                        <tr>
                            <td className="table-col" scope="col">2</td>
                            <td className="table-col" scope="col">ALTFGHJL</td>
                            <td className="table-col" scope="col">123456789102</td>
                            <td className="table-col" scope="col">Chưa sử dụng</td>
                            <td className="table-col" scope="col">12/12/2021</td>
                            <td className="table-col" scope="col">12/12/2021</td>
                            <td className="table-col" scope="col">-</td>
                        </tr>
                        <tr>
                            <td className="table-col" scope="col">3</td>
                            <td className="table-col" scope="col">ALTFGHHL</td>
                            <td className="table-col" scope="col">123456789103</td>
                            <td className="table-col" scope="col">Hết hạn</td>
                            <td className="table-col" scope="col">12/12/2021</td>
                            <td className="table-col" scope="col">12/12/2021</td>
                            <td className="table-col" scope="col">-</td>
                        </tr>
                        <tr>
                            <td className="table-col" scope="col">4</td>
                            <td className="table-col" scope="col">ALTFGTJL</td>
                            <td className="table-col" scope="col">123456789104</td>
                            <td className="table-col" scope="col">Hết hạn</td>
                            <td className="table-col" scope="col">12/12/2021</td>
                            <td className="table-col" scope="col">12/12/2021</td>
                            <td className="table-col" scope="col">-</td>
                        </tr>
                        <tr>
                            <td className="table-col" scope="col">5</td>
                            <td className="table-col" scope="col">ALTFGHJL</td>
                            <td className="table-col" scope="col">123456789102</td>
                            <td className="table-col" scope="col">Đã sử dụng</td>
                            <td className="table-col" scope="col">12/12/2021</td>
                            <td className="table-col" scope="col">12/12/2021</td>
                            <td className="table-col" scope="col">Cổng 1</td>
                        </tr>
                        <tr>
                            <td className="table-col" scope="col">6</td>
                            <td className="table-col" scope="col">ALTFGHJL</td>
                            <td className="table-col" scope="col">123456789102</td>
                            <td className="table-col" scope="col">Chưa sử dụng</td>
                            <td className="table-col" scope="col">12/12/2021</td>
                            <td className="table-col" scope="col">12/12/2021</td>
                            <td className="table-col" scope="col">-</td>
                        </tr>
                        <tr>
                            <td className="table-col" scope="col">7</td>
                            <td className="table-col" scope="col">ALTFGHJL</td>
                            <td className="table-col" scope="col">123456789102</td>
                            <td className="table-col" scope="col">Chưa sử dụng</td>
                            <td className="table-col" scope="col">12/12/2021</td>
                            <td className="table-col" scope="col">12/12/2021</td>
                            <td className="table-col" scope="col">-</td>
                        </tr>
                        <tr>
                            <td className="table-col" scope="col">8</td>
                            <td className="table-col" scope="col">ALTFGHJL</td>
                            <td className="table-col" scope="col">123456789102</td>
                            <td className="table-col" scope="col">Chưa sử dụng</td>
                            <td className="table-col" scope="col">12/12/2021</td>
                            <td className="table-col" scope="col">12/12/2021</td>
                            <td className="table-col" scope="col">-</td>
                        </tr>
                        <tr>
                            <td className="table-col" scope="col">9</td>
                            <td className="table-col" scope="col">ALTFGHJL</td>
                            <td className="table-col" scope="col">123456789102</td>
                            <td className="table-col" scope="col">Chưa sử dụng</td>
                            <td className="table-col" scope="col">12/12/2021</td>
                            <td className="table-col" scope="col">12/12/2021</td>
                            <td className="table-col" scope="col">-</td>
                        </tr>
                        <tr>
                            <td className="table-col" scope="col">10</td>
                            <td className="table-col" scope="col">ALTFGHJL</td>
                            <td className="table-col" scope="col">123456789102</td>
                            <td className="table-col" scope="col">Chưa sử dụng</td>
                            <td className="table-col" scope="col">12/12/2021</td>
                            <td className="table-col" scope="col">12/12/2021</td>
                            <td className="table-col" scope="col">-</td>
                        </tr>
                        <tr>
                            <td className="table-col" scope="col">11</td>
                            <td className="table-col" scope="col">ALTFGHJL</td>
                            <td className="table-col" scope="col">123456789102</td>
                            <td className="table-col" scope="col">Chưa sử dụng</td>
                            <td className="table-col" scope="col">12/12/2021</td>
                            <td className="table-col" scope="col">12/12/2021</td>
                            <td className="table-col" scope="col">-</td>
                        </tr>
                        <tr>
                            <td className="table-col" scope="col">12</td>
                            <td className="table-col" scope="col">ALTFGHJL</td>
                            <td className="table-col" scope="col">123456789102</td>
                            <td className="table-col" scope="col">Chưa sử dụng</td>
                            <td className="table-col" scope="col">12/12/2021</td>
                            <td className="table-col" scope="col">12/12/2021</td>
                            <td className="table-col" scope="col">-</td>
                        </tr>
                        <tr>
                            <td className="table-col" scope="col">13</td>
                            <td className="table-col" scope="col">ALTFGHJL</td>
                            <td className="table-col" scope="col">123456789102</td>
                            <td className="table-col" scope="col">Chưa sử dụng</td>
                            <td className="table-col" scope="col">12/12/2021</td>
                            <td className="table-col" scope="col">12/12/2021</td>
                            <td className="table-col" scope="col">-</td>
                        </tr>
                    </thead>
                </table>
                
            </div>

        </div>
    )
}

export default ManagePage