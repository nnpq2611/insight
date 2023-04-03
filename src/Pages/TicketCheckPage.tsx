import React from 'react'
import { Link } from 'react-router-dom'
import './TicketCheckPage.css'
import Header from "../components/header/Header";

const TicketCheckPage = () => {
    return (
        <div className="tickercheck-page">
            <div className="header">
                <Header/>
            </div>
            <div className="table-page">
                <h1>Đối soát vé</h1>
                <li className="search">
                    <input className="form-control fst-italic me-2" type="search" placeholder="Tìm bằng số vé" aria-label="Search"/>          
                    
                </li>
                <table className="table">
                    <thead>
                        <tr>
                            <th className="table-col" scope="col">STT</th>
                            <th className="table-col" scope="col">Số vé</th>
                            <th className="table-col" scope="col">Ngày sử dụng</th>
                            <th className="table-col" scope="col">Tên loại vé</th>
                            <th className="table-col" scope="col">Cổng Check-in</th>
                            <th className="table-col" scope="col"></th>
                        </tr>
                        <tr>
                            <td className="table-col" scope="col">1</td>
                            <td className="table-col" scope="col">123456789101</td>
                            <td className="table-col" scope="col">12/12/2021</td>
                            <td className="table-col" scope="col">Vé cổng</td>
                            <td className="table-col" scope="col">Cổng 1</td>
                            <td className="table-col" scope="col">Chưa đối soát</td>
                        </tr>
                        <tr>
                            <td className="table-col" scope="col">2</td>
                            <td className="table-col" scope="col">123456789102</td>
                            <td className="table-col" scope="col">12/12/2021</td>
                            <td className="table-col" scope="col">Vé cổng</td>
                            <td className="table-col" scope="col">Cổng 1</td>
                            <td className="table-col" scope="col">Chưa đối soát</td>
                        </tr>
                        <tr>
                            <td className="table-col" scope="col">3</td>
                            <td className="table-col" scope="col">123456789103</td>
                            <td className="table-col" scope="col">12/12/2021</td>
                            <td className="table-col" scope="col">Vé cổng</td>
                            <td className="table-col" scope="col">Cổng 1</td>
                            <td className="table-col" scope="col">Chưa đối soát</td>
                        </tr>
                        <tr>
                            <td className="table-col" scope="col">4</td>
                            <td className="table-col" scope="col">123456789104</td>
                            <td className="table-col" scope="col">12/12/2021</td>
                            <td className="table-col" scope="col">Vé cổng</td>
                            <td className="table-col" scope="col">Cổng 1</td>
                            <td className="table-col" scope="col">Chưa đối soát</td>
                        </tr>
                        <tr>
                            <td className="table-col" scope="col">5</td>
                            <td className="table-col" scope="col">123456789105</td>
                            <td className="table-col" scope="col">12/12/2021</td>
                            <td className="table-col" scope="col">Vé cổng</td>
                            <td className="table-col" scope="col">Cổng 1</td>
                            <td className="table-col" scope="col">Chưa đối soát</td>
                        </tr>
                        <tr>
                            <td className="table-col" scope="col">6</td>
                            <td className="table-col" scope="col">123456789106</td>
                            <td className="table-col" scope="col">12/12/2021</td>
                            <td className="table-col" scope="col">Vé cổng</td>
                            <td className="table-col" scope="col">Cổng 1</td>
                            <td className="table-col" scope="col">Chưa đối soát</td>
                        </tr>
                        <tr>
                            <td className="table-col" scope="col">7</td>
                            <td className="table-col" scope="col">123456789107</td>
                            <td className="table-col" scope="col">12/12/2021</td>
                            <td className="table-col" scope="col">Vé cổng</td>
                            <td className="table-col" scope="col">Cổng 1</td>
                            <td className="table-col" scope="col">Chưa đối soát</td>
                        </tr>
                        <tr>
                            <td className="table-col" scope="col">8</td>
                            <td className="table-col" scope="col">123456789108</td>
                            <td className="table-col" scope="col">12/12/2021</td>
                            <td className="table-col" scope="col">Vé cổng</td>
                            <td className="table-col" scope="col">Cổng 1</td>
                            <td className="table-col" scope="col">Chưa đối soát</td>
                        </tr>
                        <tr>
                            <td className="table-col" scope="col">9</td>
                            <td className="table-col" scope="col">123456789109</td>
                            <td className="table-col" scope="col">12/12/2021</td>
                            <td className="table-col" scope="col">Vé cổng</td>
                            <td className="table-col" scope="col">Cổng 1</td>
                            <td className="table-col" scope="col">Chưa đối soát</td>
                        </tr>
                        <tr>
                            <td className="table-col" scope="col">10</td>
                            <td className="table-col" scope="col">123456789110</td>
                            <td className="table-col" scope="col">12/12/2021</td>
                            <td className="table-col" scope="col">Vé cổng</td>
                            <td className="table-col" scope="col">Cổng 1</td>
                            <td className="table-col" scope="col">Chưa đối soát</td>
                        </tr>
                        <tr>
                            <td className="table-col" scope="col">11</td>
                            <td className="table-col" scope="col">123456789111</td>
                            <td className="table-col" scope="col">12/12/2021</td>
                            <td className="table-col" scope="col">Vé cổng</td>
                            <td className="table-col" scope="col">Cổng 1</td>
                            <td className="table-col" scope="col">Chưa đối soát</td>
                        </tr>
                        <tr>
                            <td className="table-col" scope="col">12</td>
                            <td className="table-col" scope="col">123456789112</td>
                            <td className="table-col" scope="col">12/12/2021</td>
                            <td className="table-col" scope="col">Vé cổng</td>
                            <td className="table-col" scope="col">Cổng 1</td>
                            <td className="table-col" scope="col">Chưa đối soát</td>
                        </tr>
                        <tr>
                            <td className="table-col" scope="col">13</td>
                            <td className="table-col" scope="col">123456789113</td>
                            <td className="table-col" scope="col">12/12/2021</td>
                            <td className="table-col" scope="col">Vé cổng</td>
                            <td className="table-col" scope="col">Cổng 1</td>
                            <td className="table-col" scope="col">Chưa đối soát</td>
                        </tr>
                    </thead>
                </table>
            </div>
                
        </div>
        
  )
}

export default TicketCheckPage