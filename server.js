import express from "express";
import cors from "cors";
import service from "./service/index.js";
const router = express.Router();
const app = express();

//ejs 연습했던 흔적 지우지는 않겠음.
app.set("view engine", "ejs");
app.set("views", "./templates");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.use("/test", service.testRouter);
app.use("/user", service.userRouter);
app.use("/post", service.postRouter);
app.use("/static", express.static("upload"));
app.use("/profile", express.static("profileImg"));
app.listen(8080);
