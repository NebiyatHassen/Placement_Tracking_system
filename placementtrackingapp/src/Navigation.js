import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../src/Components/Login/Login";
import Dashboard from "../src/Components/Dashboard/Dashboard";
import App from "../src/Pages/App";

const Navigation = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/candidate" element={<App />} />
      <Route path="/admin" element={<Dashboard />} />
    </Routes>
  );
};

export default Navigation;
