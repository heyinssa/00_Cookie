import "./App.css";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
const axios = require("axios");

const LoginPage = () => {
  return <></>;
};

const RegisterPage = () => {
  return <></>;
};

const MainPage = () => {
  return <></>;
};

const LogoutPage = () => {
  return <></>;
};

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/Login" element={<LoginPage />} />
          <Route exact path="/Register" element={<RegisterPage />} />
          <Route exact path="/Main" element={<MainPage />} />
          <Route exact path="/Logout" element={<LogoutPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
