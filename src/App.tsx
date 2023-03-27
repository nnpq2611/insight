import React from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Navbar from "./module/navbar/Navbar";
import Router from "./router/Router";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Router />
      </BrowserRouter>
    </div>
  );
}

export default App;
