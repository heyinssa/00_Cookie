import "./App.css";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios"

const Login = () => {
  const handlerClickButton = async() => {
    try {
      const data = {id : "kim", email:"kim@gmail.com"};
      const URL = "http://localhost:5000/data"
      console.log(data);
      console.log(JSON.stringify(data));
      const result = await axios.post(URL, JSON.stringify(data), {
        headers: {
          "Content-Type": `application/json`,
        }
      })
      console.log(result.data);
    }
    catch (e) {
      alert(e);
    }
  }
  return (
    <>
    <h1>kim으로 로그인 시도합니다.</h1>
    <button onClick={handlerClickButton} type="button">로그인</button>
    </>
  )
}

const RegisterPage = () => {
  return <></>;
};

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/main" element={<Main />} />

          <Route exact path="/login" element={<Login />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
