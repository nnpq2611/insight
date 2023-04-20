import React from "react";
import AreaChart from "../module/home/AreaChart";
import PieChart1 from "../module/home/PieChart1";
import PieChart2 from "../module/home/PieChart2";
import "./HomePage.css";
import DatePickerCustom from "../module/date/DatePicker";
import { get, ref } from "firebase/database";
import database from "../firebase/firebase";

const getDay = (date: any) => {
  return new Date(
    date.split("/")[2],
    date.split("/")[1] - 1,
    date.split("/")[0]
  );
};

const HomePage = () => {
  const starCountRefFamily = ref(database, "danh_sach_ve/goi_gia_dinh");
  const starCountRefEvent = ref(database, "danh_sach_ve/goi_su_kien");
  const [dataFamily, setDataFamily] = React.useState([]);
  const [dataEvent, setDataEvent] = React.useState([]);
  const [dataChart, setDataChart] = React.useState([0, 0, 0, 0, 0, 0, 0]);
  const [dataPie1, setDataPie1] = React.useState<any>([]);
  const [dataPie2, setDataPie2] = React.useState<any>([]);
  const [week, setWeek] = React.useState({
    startDate: "",
    endDate: "",
  });

  React.useEffect(() => {
    get(starCountRefFamily)
      .then((snapshot: any) => {
        if (snapshot.exists()) {
          setDataFamily(snapshot.val());
          let used: any = 0;
          let unused: any = 0;
          snapshot.val().forEach((item: any) => {
            if (item.Tinh_trang_su_dung === "Đã sử dụng") {
              used++;
            }
            if (item.Tinh_trang_su_dung === "Chưa sử dụng") {
              unused++;
            }
          });
          setDataPie1([used, unused]);
        } else {
          console.log("No data available");
        }
      })
      .catch((error: any) => {
        console.error(error);
      });

    get(starCountRefEvent)
      .then((snapshot: any) => {
        if (snapshot.exists()) {
          setDataEvent(snapshot.val());
          let used: any = 0;
          let unused: any = 0;
          snapshot.val().forEach((item: any) => {
            if (item.Tinh_trang_su_dung === "Đã sử dụng") {
              used++;
            }
            if (item.Tinh_trang_su_dung === "Chưa sử dụng") {
              unused++;
            }
          });
          setDataPie2([used, unused]);
        } else {
          console.log("No data available");
        }
      })
      .catch((error: any) => {
        console.error(error);
      });
  }, []);

  React.useEffect(() => {
    const data: any = [];
    dataFamily.forEach((item: any) => {
      if (
        item.Tinh_trang !== "Tắt" &&
        getDay(item.Ngay_xuat_ve).getTime() <=
          new Date(week.endDate).getTime() &&
        getDay(item.Ngay_xuat_ve).getTime() >=
          new Date(week.startDate).getTime()
      ) {
        const date = item.Ngay_xuat_ve.split(" ")[0];
        const index = data.findIndex((item: any) => item.date === date);
        if (index === -1) {
          data.push({
            date: date,
            value: +item.Gia_ve_le.toString()
              .replaceAll(" VNĐ", "")
              .replaceAll(".", ""),
          });
        } else {
          data[index].value += +item.Gia_ve_le.toString()
            .replaceAll(" VNĐ", "")
            .replaceAll(".", "");
        }
        // console.log(data);
      }
    });
    dataEvent.forEach((item: any) => {
      if (
        item.Tinh_trang !== "Tắt" &&
        getDay(item.Ngay_xuat_ve).getTime() <=
          new Date(week.endDate).getTime() &&
        getDay(item.Ngay_xuat_ve).getTime() >=
          new Date(week.startDate).getTime()
      ) {
        const date = item.Ngay_xuat_ve.split(" ")[0];
        const index = data.findIndex((item: any) => item.date === date);
        if (index === -1) {
          data.push({
            date: date,
            value: +item.Gia_ve_le.toString()
              .replaceAll(" VNĐ", "")
              .replaceAll(".", ""),
          });
        } else {
          data[index].value += +item.Gia_ve_le.toString()
            .replaceAll(" VNĐ", "")
            .replaceAll(".", "");
        }
        console.log(data);
      }
    });
    const dataChart: any = [0, 0, 0, 0, 0, 0, 0];
    data.forEach((item: any) => {
      const date = new Date(
        item.date.split("/")[2],
        item.date.split("/")[1],
        item.date.split("/")[0]
      );
      const index = date.getDay();
      dataChart[index] += item.value;
    });
    setDataChart(dataChart);
  }, [dataFamily, dataEvent, week]);

  const getDanhThuOfWeek = () => {
    let sum = 0;
    dataFamily.forEach((item: any) => {
      item.Tinh_trang !== "Tắt" &&
        getDay(item.Ngay_xuat_ve).getTime() <=
          new Date(week.endDate).getTime() &&
        getDay(item.Ngay_xuat_ve).getTime() >=
          new Date(week.startDate).getTime() &&
        (sum += +item.Gia_ve_le.toString()
          .replaceAll(" VNĐ", "")
          .replaceAll(".", ""));
    });
    dataEvent.forEach((item: any) => {
      item.Tinh_trang !== "Tắt" &&
        getDay(item.Ngay_xuat_ve).getTime() <=
          new Date(week.endDate).getTime() &&
        getDay(item.Ngay_xuat_ve).getTime() >=
          new Date(week.startDate).getTime() &&
        (sum += +item.Gia_ve_le.toString()
          .replaceAll(" VNĐ", "")
          .replaceAll(".", ""));
    });
    return sum;
  };

  const getDoanhThu = () => {
    let sum = 0;
    dataFamily.forEach((item: any) => {
      item.Tinh_trang !== "Tắt" &&
        (sum += +item.Gia_ve_le.toString()
          .replaceAll(" VNĐ", "")
          .replaceAll(".", ""));
    });
    dataEvent.forEach((item: any) => {
      item.Tinh_trang !== "Tắt" &&
        (sum += +item.Gia_ve_le.toString()
          .replaceAll(" VNĐ", "")
          .replaceAll(".", ""));
    });
    return sum;
  };

  return (
    <div className="home-page">
      <div className="chart">
        <ul>
          <li>
            <h1>Thống kê</h1>
          </li>
          <li>
            <h5>
              Doanh thu:{" "}
              {getDoanhThu().toLocaleString("it-IT", {
                style: "currency",
                currency: "VND",
              })}
            </h5>
          </li>
          <li>
            <DatePickerCustom setWeek={setWeek} />
          </li>
          <br />
          <br />
          <li>
            <AreaChart data={dataChart} />
          </li>
          <li>
            <p>
              Tổng doanh thu theo tuần:{" "}
              {getDanhThuOfWeek().toLocaleString("it-IT", {
                style: "currency",
                currency: "VND",
              })}
            </p>
          </li>
          <li>
            <PieChart1 data={dataPie1} />
          </li>
          <li>
            <PieChart2 data={dataPie2}/>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HomePage;
