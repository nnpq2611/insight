import { ApexOptions } from "apexcharts";
import React from "react";
import ReactApexChart from "react-apexcharts";
import DatePickerCustom from "../date/DatePicker";

const AreaChart = () => {
  const series = [
    {
      name: "series1",
      data: [160, 240, 200, 260, 300, 280, 300],
    },
  ];
  const options: ApexOptions = {
    chart: {
      height: 350,
      type: "area",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      type: "datetime",
      categories: [
        "2023-09-19T00:00:00.000Z",
        "2023-09-19T01:30:00.000Z",
        "2023-09-19T02:30:00.000Z",
        "2023-09-19T03:30:00.000Z",
        "2023-09-19T04:30:00.000Z",
        "2023-09-19T05:30:00.000Z",
        "2023-09-19T06:30:00.000Z",
      ],
    },
    tooltip: {
      x: {
        format: "dd/MM/yy HH:mm",
      },
    },
  };

  return (
    <div>
      <DatePickerCustom/>
      <ReactApexChart
        options={options}
        series={series}
        type="area"
        height={350}
      />
    </div>
  );
};

export default AreaChart;
