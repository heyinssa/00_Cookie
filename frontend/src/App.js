import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import axios from "axios"

const Login = ({handlerClick}) => {
  const handlerClickButton = async() => {
    try {
      const data = {id : "kim", email:"kim@gmail.com"};
      const URL = "http://localhost:5000/data"
      console.log(data);
      console.log(JSON.stringify(data));
      const result = await axios.post(URL, JSON.stringify(data), {
        headers: {
          "Content-Type": `application/json`,
        }, withCredentials : true
      })
      console.log("액세스 토큰 : " + result.data);
      handlerClick();
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

const Main = ({isLogin}) => {

  console.log(isLogin);
  return (
    <>
    {isLogin ?  (
      <>
      로그인된 상태입니다!
      </>
    ) : (
      <Navigate to="/login"/>
    )
  }
  </>
  )
}


function App() {
  const [isLogin, setIsLogin] = useState(false);

  const setLogin = () => {
    setIsLogin(true);
    console.log("login : ", isLogin);
  }
  return (
    <>
      <Router>
        <Routes>
  <Route exact path="/main" element={<Main isLogin={isLogin}/>} />
          <Route exact path="/login" element={<Login handlerClick={setLogin}/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
