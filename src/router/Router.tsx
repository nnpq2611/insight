import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../Pages/HomePage";
import ManagePage from "../Pages/ManagePage";
import TicketCheckPage from "../Pages/TicketCheckPage";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<ManagePage />} />
      <Route path="/ticket" element={<TicketCheckPage/>} />
      
    </Routes>
  );
};

export default Router;
