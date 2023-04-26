import { ApexOptions } from "apexcharts";
import React from "react";
import ReactApexChart from "react-apexcharts";
import "./PieChart.css"

const PieChart1: React.FC<{data: any}> = ({data}) => {
  const series = [...data];
  const options : ApexOptions = {
    chart: {
      width: 400,
      type: "donut",
    },
    labels: ["Vé đã sử dụng", "Vé chưa sử dụng"],
    colors: ["#FF8A48", "#4F75FF"],
    legend: {
      show: false,
    },
    responsive: [
      {
        breakpoint: 500,
        options: {
          chart: {
            width: 500,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
    fill: {
      colors: ["#FF8A48", "#4F75FF"],
    },
  };
  
  return (
    <div className="pie-chart">
      <ul className="chart1">
        <li>
          <h5>Gói gia đình</h5>
        </li>
        <li>
          <ReactApexChart
            options={options}
            series={series}
            type="donut"
          />
        </li>
      </ul>
    </div>
  );
};

export default PieChart1;
