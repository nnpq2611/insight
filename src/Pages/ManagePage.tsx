import React from 'react'
import './ManagePage.css'

const ManagePage = () => {
  return (
    <div className="magage-page">
        <ul className="header">
            <li className='search'>
                <form className="d-flex" role="search">
                    <input className="form-control fst-italic me-2" type="search" placeholder="Search" aria-label="Search"/>          
                    {/* <i className="fa-solid fa-magnifying-glass"></i> */}
                </form>
            </li>
            {/* <li>
                {data.map((item, index) => (
                <li key={index} className="nav-bar-item">
                    <Link to={item.path} className="nav-bar-link">
                    <i className={item.icon}></i>
                    </Link>
                </li>
                ))}
            </li>
            <li>
                <img src={img2} alt="ảnh đại diện" /> 
            </li> */}
        </ul>
        <div className="chart">
            <h1>Thống kê</h1>
            <h5>Doanh thu</h5>
            
        </div>

    </div>
  )
}

export default ManagePage