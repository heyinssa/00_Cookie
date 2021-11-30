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

const Main = () => {
  const [text, setText] = useState("");
  const [isRemember, setIsRemember] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["rememberText"]);

  let now = new Date();
  let after1m = new Date();

  useEffect(() => {
    console.log(cookies);
    if (cookies.CookieKey !== undefined) {
      setText(cookies.CookieKey);
      setIsRemember(true);
    }
  }, []);

  function onChange(e) {
    setText(e.target.value);
  }

  const handleOnChange = (e) => {
    after1m.setSeconds(now.getSeconds() + 10);
    setIsRemember(e.target.checked);
    if (e.target.checked) {
      console.log('we save cookies on path "Main".');
      setCookie("CookieKey", text, { path: "/Main", expires: after1m });
    } else {
      removeCookie("CookieKey");
    }
  };
  return (
    <>
      <input value={text} onChange={onChange} />
      <input type="checkBox" onChange={handleOnChange} checked={isRemember} />
      <h1>{text}</h1>
    </>
  );
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
