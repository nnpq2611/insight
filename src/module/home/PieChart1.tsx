import { ApexOptions } from "apexcharts";
import React from "react";
import ReactApexChart from "react-apexcharts";
import "./PieChart.css"

const PieChart1: React.FC<{data: any}> = ({data}) => {
  const series = [...data];
  const options : ApexOptions = {
    chart: {
      width: 380,
      type: "donut",
    },
    labels: ["Vé đã sử dụng", "Vé chưa sử dụng"],
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
  };
  return (
    <div className="pie-chart">
      <h5>Gói gia đình</h5>
      <ReactApexChart
        options={options}
        series={series}
        type="donut"
      />
    </div>
  );
};

export default PieChart1;
