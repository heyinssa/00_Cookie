import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import axios from "axios"

const Login = () => {
  const handlerClickButton = async() => {
    try {
      const data = {id : "ycha", password : 'ycha'};
      const URL = "https://skyrich3.synology.me:9904/api/auth/login"
      console.log(JSON.stringify(data));
      const result = await axios.post(URL, JSON.stringify(data), {
        headers: {
          "Content-Type": `application/json`,
        }, withCredentials : true
      })
      
      
      console.log(result);
      const { accessToken } = result.data;
      console.log("액세스 토큰 : " + accessToken);
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
  }
    catch (e) {
      alert(e);
    }
  }
  return (
    <>
    	<h1>ycha로 로그인 시도합니다.</h1>
    	<button onClick={handlerClickButton} type="button">로그인</button> <br/>
    	<Link to="/">
    		메인페이지로
    	</Link>
    </>
  )
}

export default Login;
