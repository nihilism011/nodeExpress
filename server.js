import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";
import config from "./dbConfig.js";
import testApp from "./test.js";
import mybatisMapper from "mybatis-mapper";
import color from "ansi-colors";
const app = express();

app.use(cors());
app.use(express.json());

mybatisMapper.createMapper(["./mybatisMapper/test.xml"]);
const mapperFormat = { language: "sql", indent: "  " };

async function connect(spaceName, queryName, param) {
  const conn = await mysql.createConnection(config);
  const query = mybatisMapper.getStatement(
    spaceName,
    queryName,
    param,
    mapperFormat
  );
  console.log(color.blueBright(query));
  try {
    const result = await conn.query(query);
    return result;
  } catch (err) {
    console.error("----------error----------");
    console.log(err);
    console.error("------------------------");
    return null;
  }
}

app.get("/user/:id", (req, res) => {
  const result = "검색된 아이디 : " + req.params.id;
  res.json({ result: result });
});
testApp(app, connect);
app.get("/", function (req, res) {
  res.send("Hello World~");
});
app.listen(3000);
