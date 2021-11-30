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

const accessToken = {"accessToken" : "14NRUBFUIH2QATI41FA1412"};
const refreshToken = "weiowgioagjoijgadsdiojaegw"
app.post("/data", (req, res) => {
  // 경로의 파일을 전송한다.
  res.cookie('refreshToken', refreshToken);
  res.send(accessToken);
});
app.get("/access", (req, res) => {
  // 경로의 파일을 전송한다.

    if ("Bearer " + accessToken.accessToken === req.headers.authorization)
  {
    console.log("same");
    res.send(true);
  }
    else {
      res.send(false);
    }
});


app.listen(app.get("port"), () => {
  console.log(`${port} 포트에서 동작중!`);
}); 