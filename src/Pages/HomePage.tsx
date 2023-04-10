import React from "react";
import AreaChart from "../module/home/AreaChart";
import PieChart from "../module/home/PieChart";
import "./HomePage.css";
import DatePickerCustom from "../module/date/DatePicker";

const HomePage = () => {

  return (
    <div className="home-page">
      <div className="chart">
        <ul>
          <li> <h1>Thống kê</h1> </li>
          <li> <h5>Doanh thu</h5> </li>
          <li> <DatePickerCustom/> </li>
          <li> <AreaChart /> </li>
          <li> <PieChart /> </li>        
        </ul>
        
      </div>
    </div>
  );
};

export default HomePage;
