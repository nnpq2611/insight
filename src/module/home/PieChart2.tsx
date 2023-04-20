import { ApexOptions } from "apexcharts";
import React from "react";
import ReactApexChart from "react-apexcharts";
import "./PieChart.css"

const PieChart2: React.FC<{data: any}> = ({data}) => {
  const series = [...data];
  const options : ApexOptions = {
    chart: {
      width: 380,
      type: "donut",
    },
    labels: ["Vé đã sử dụng", "Vé chưa sử dụng"],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };
  return (
    <div className="pie-chart">
      <h5>Gói sự kiện</h5>
      <ReactApexChart
        options={options}
        series={series}
        type="donut"
      />
    </div>
  );
};

export default PieChart2;
