import './App.css';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const MiniMain = () => {
  const handleCookie = () => {
    axios
      .get('http://betti.kr:9003/api/cookie', {
        withCredentials: true,
      })
      .then((response) => {
        console.log('성공!');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCookie2 = () => {
    axios
      .get('https://betti.kr:9000/api/cookie', {
        withCredentials: true,
      })
      .then((response) => {
        console.log('성공!');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <button type="button" onClick={handleCookie} className="loginbutton">
        cookie
      </button>
      <button type="button" onClick={handleCookie2} className="loginbutton">
        cookie2
      </button>
    </>
  );
};

const Main = () => {
  const [text, setText] = useState('');
  const [isRemember, setIsRemember] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(['rememberText']);

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
      console.log('we save cookies on path "Main"');
      setCookie('CookieKey', text, { path: '/Main', expires: after1m });
    } else {
      removeCookie('CookieKey');
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
  const [cookies, setCookie, removeCookie] = useCookies(['rememberText']);

  useEffect(() => {
    console.log('try Find CookieKey');
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
