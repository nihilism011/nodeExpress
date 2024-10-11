import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";
import config from "./dbConfig.js";
import service from "./service/index.js";
import mybatisMapper from "mybatis-mapper";
import color from "ansi-colors";
const router = express.Router();
const app = express();

app.set("view engine", "ejs");
app.set("views", "./templates");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);
mybatisMapper.createMapper(["./mybatisMapper.xml"]);

async function connect(nameSpace, queryName, param) {
  const conn = await mysql.createConnection(config);
  const mapperFormat = { language: "sql", indent: "  " };
  const query = mybatisMapper.getStatement(
    nameSpace,
    queryName,
    param,
    mapperFormat
  );
  console.log(color.blueBright(query));
  let result;
  try {
    const response = await conn.query(query);
    const data = response[0];
    result = { status: true, data: data };
  } catch (err) {
    console.error("--error--error--error--error--error--error--");
    result = { status: false, data: err };
  }
  conn.end();
  return result;
}
// ejs test
router.route("/").get((req, res) => {
  const list = [
    { id: 1, name: "rits", age: 20 },
    { id: 2, name: "mis", age: 25 },
    { id: 3, name: "ju", age: 23 },
  ];
  const message = "Hi";
  const data = { message: message, list: list };
  res.render("board", data);
});

service.testApp(app, connect, router);
service.userApp(app, connect, router);

app.listen(3000);
