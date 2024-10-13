import express from "express";
import cors from "cors";
import service from "./service/index.js";
const router = express.Router();
const app = express();

app.set("view engine", "ejs");
app.set("views", "./templates");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

service.testApp(app, router);
service.userApp(app, router);

app.listen(3000);
