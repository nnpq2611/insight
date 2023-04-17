import React from "react";
import AreaChart from "../module/home/AreaChart";
import PieChart1 from "../module/home/PieChart1";
import PieChart2 from "../module/home/PieChart2";
import "./HomePage.css";
import DatePickerCustom from "../module/date/DatePicker";

const HomePage = () => {

  return (
    <div className="home-page">
      <div className="chart">
        <ul>
          <li> <h1>Thống kê</h1> </li>
          <li> <h5>Doanh thu</h5> </li>
          {/* <li> <DatePickerCustom/> </li>           */}
          <li> <AreaChart /> </li>
          <li> <p>Tổng doanh thu theo tuần:</p> </li>
          <li> <DatePickerCustom/> </li> 
          <li> <PieChart1/> </li>   
          <li> <PieChart2/></li>     
        </ul>
        
      </div>
    </div>
  );
};

export default HomePage;
