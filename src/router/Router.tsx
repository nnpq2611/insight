import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../Pages/HomePage";
import ManagePage from "../Pages/ManagePage";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/" element={<ManagePage />} />
      
    </Routes>
  );
};

export default Router;
