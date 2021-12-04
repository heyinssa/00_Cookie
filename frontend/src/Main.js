import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import axios from "axios"

const Main = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [profile, setProfile] = useState("");

  useEffect(() => {
    checkAccess();
  }, []);

  const checkAccess = async() => {
    const URL = "https://skyrich3.synology.me:9904/api/user/profile";
    await axios.get(URL)
		.then((response) => {
			setIsLogin(true);
			setProfile(response.data)
		})
		.catch((error) => {
			setIsLogin(false);
		});
  }
  
  const logout = () => {
    axios.defaults.headers.common['Authorization'] = ``;
    console.log("change access token")
    checkAccess();
    
  }
  return (
    <>
    { (isLogin === true) ? (
      <>
      로그인된 상태입니다!
	  <pre>{JSON.stringify(profile, null, 4)}</pre>
      <button onClick={logout}>로그아웃</button>
      </>
    ) : (
      <Link to="/login">
      로그인 해주세요!
      </Link>
    )
  }
  </>
  )
}


export default Main;
