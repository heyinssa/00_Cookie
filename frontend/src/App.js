import "./App.css";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const MiniMain = () => {
  return <>We Can See MainCookie!</>;
};

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

const Cookie = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["rememberText"]);

  useEffect(() => {
    console.log("try Find CookieKey");
    console.log(cookies);
  }, []);
  return <></>;
};
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/Main" element={<Main />} />
          <Route exact path="/Main/main" element={<MiniMain />} />

          <Route exact path="/Cookie" element={<Cookie />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
