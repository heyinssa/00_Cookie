import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import axios from "axios"

const Login = () => {
  const handlerClickButton = async() => {
    try {
      const data = {id : "kim", email:"kim@gmail.com"};
      const URL = "http://localhost:5000/data"
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
    <h1>kim으로 로그인 시도합니다.</h1>
    <button onClick={handlerClickButton} type="button">로그인</button>
    <Link to="/">
    메인페이지로
    </Link>
    </>
  )
}

const Main = () => {
  const [isLogin, setIsLogin] = useState(false);

  
  useEffect(() => {
    checkAccess();
  }, []);
  const checkAccess = async() => {
    const URL = "http://localhost:5000/access";
    const result = await axios.get(URL);
    setIsLogin(Boolean(result.data));
  }
  const handleChangeAccess = () => {
    axios.defaults.headers.common['Authorization'] = `Bearer AAAAAAAAAAAAA`;
    console.log("change access token")
    checkAccess();
    
  }
  return (
    <>
    { (isLogin === true) ? (
      <>
      로그인된 상태입니다!
      <button onClick={handleChangeAccess}>dsafsad</button>
      </>
    ) : (
      <Link to="/login">
      로그인으로.
      </Link>
    )
  }
  </>
  )
}


const App = () => {



  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Main/>} />
          <Route exact path="/login" element={<Login/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
