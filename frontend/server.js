const express = require("express");
const app = express();
const path = require("path");
const cors = require('cors');
const cookieParser = require('cookie-parser');

const port = process.env.PORT || 5000;

app.use(cors({
    origin: "http://localhost:3000",
    credentials :true
}));
app.use(cookieParser());

app.set("port", port); // 서버의 포트에 인자(port)를 설정. 일종의 전역변수.

const accessToken = "14NRUBFUIH2QATI41FA1412";
app.post("/data", (req, res) => {
  // 경로의 파일을 전송한다.
  res.cookie('accessToken', accessToken);
  res.send("cookie send!");

});

// app.get("/data/special", (req, res) => {
//   res.send(`특별한 데이터`);
// });
// app.get("/data/:input", (req, res) => {
//   // 와일드 카드는 맨 아래에!
//   res.send(`입력한 파라미터 값은 ${req.params.input}입니다.`);
// });

// app.get("/mypage", (req, res) => {
//   res.send("success!");
//   console.log("main 페이지");
// });
// app.get("/api/piscine", (req, res) => {
//   res.send(["qwe", "zcxv", "asdg", "sa", "saf", "asf", "qwerwqrtwq"]);
//   console.log("api 전송");
// });
app.listen(app.get("port"), () => {
  console.log(`${port} 포트에서 동작중!`);
}); 