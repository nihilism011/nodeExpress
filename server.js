import express from "express";
import cors from "cors";
import controller from "./controller/controllerIndex.js";
const router = express.Router();
const app = express();
import dotenv from "dotenv";
import { jwtAuthentication } from "./jwtAuth.js";
dotenv.config();

console.log(process.env.jwt_key);
//ejs 연습했던 흔적 지우지는 않겠음.
app.set("view engine", "ejs");
app.set("views", "./templates");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

router.use("/api", jwtAuthentication);

app.use(router);
app.use("/nonAuth", controller.nonAuthRouter);
app.use("/api/user", controller.userRouter);
app.use("/api/post", controller.postRouter);

app.use("/static", express.static("uploads"));
app.use("/profile", express.static("profileImg"));
app.listen(8080);
