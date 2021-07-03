// 라우팅은 어플리케이션 엔드 포인트(URI)의 정의, 그리고 URI가 클라이언트 요청에 응답하는 방식을 말한다.

const express = require("express"); // node_modules 폴더에 있는 미리 구현한 라우팅 모듈을 가져온다.
const app = express(); // 새로운 라우터 객체를 만든다. 이 라우터의 객체 이름을 app으로 설정한다.
const port = 5000;
const cors = require("cors");
const todoRouter = require("./routes/todo_route");
const db = require("./db");

const { User } = require("./models/User");
const bodyParser = require("body-parser");

const config = require("./config/key");
const cookieParser = require("cookie-parser");
const { auth } = require("./middleware/auth");

// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// application/json
app.use(bodyParser.json());
app.use(cookieParser());

// const mongoose = require("mongoose");
// mongoose
//   .connect(config.mongoURI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//   })
//   .then(() => console.log("MongoDB Connected..."))
//   .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello World");
});
// 첫 번째 파라미터인 "/"는 요청이 수행되는 주소이다.
// 두 번째 파라미터인 (req, res) => {}는 콜백함수이다.
// 콜백함수란 다른 함수의 인자로서 활용되는 함수이며, 어떤 이벤트에 의해서 호출된다.
// 여기서 req는 요청객체이고, res는 응답객체이다.
// res.send는 클라이언트에 문자열로 응답하기 위한 함수이다.
// 여기서 res.send("Hello World")라고 했기 때문에 화면에 Hello World가 출력된다.

app.get("/api/hello", (req, res) => {
  res.send("Hello");
});

app.post("/api/users/signup", (req, res) => {
  // 회원가입할 때 필요한 정보들을 client에서 가져오면
  // 그것들을 데이터베이스에 넣어준다.
  const user = new User(req.body);

  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

app.post("/api/users/login", (req, res) => {
  // 요청된 이메일을 데이터베이스에서 있는지 찾는다.
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다.",
      });
    }
    // 요청된 이메일이 데이터베이스에 있다면 비밀번호가 맞는 비밀번호인지 확인한다.
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 틀렸습니다.",
        });
      // 비밀번호까지 맞다면 토큰을 생성한다.
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);

        // 토큰을 저장한다. 어디에? 쿠키, 로컬 스토리지 등
        res
          .cookie("x_auth", user.token)
          .status(200)
          .json({ loginSuccess: true, userId: user._id });
      });
    });
  });
});

app.get("/api/users/auth", auth, (req, res) => {
  // 여기까지 미들웨어를 통과해왔다는 것은 Authentication이 true라는 말이다.
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image,
  });
});

app.get("/api/users/logout", auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({ success: true });
  });
});

db();
app.use(express.json());
app.use(cors());

app.use("/api/todo", todoRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
// app.listen()은 포트에서 연결을 청취하기 위해 필요한 것이다.
// 즉 "5000번 포트에서 연결을 들어라"이다.
