import "./App.css";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


const Main = () => {
  const [text, setText] = useState("");
  const [isRemember, setIsRemember] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["rememberText"]);

  let now = new Date();
  let after1m = new Date();

  useEffect(() => {
    console.log(cookies);
    if (cookies.rememberText !== undefined) {
      setText(cookies.rememberText);
      setIsRemember(true);
    }
  }, []);

  function onChange(e) {
    setText(e.target.value);
  }

  const handleOnChange = (e) => {
    after1m.setSeconds(now.getSeconds() + 5);
    setIsRemember(e.target.checked);
    if (e.target.checked) {
      console.log('safas');
      setCookie("rememberText", text, { path: "/", expires: after1m });
    } else {
      removeCookie("rememberText");
    }
  };
  return (
    <>
  <input value={text} onChange={onChange}/>
  <input type="checkBox" onChange={handleOnChange} checked={isRemember}/>
    <h1>{text}</h1>
    </>
  )
}
function App() {
  
  return (
    <>
      <Router>
      <Switch>
        <Route exact path="/" component={Main} />
     
      </Switch>
    </Router>

    </>
  );
}

export default App;
