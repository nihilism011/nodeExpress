import mybatisMapper from "mybatis-mapper";
import mysql from "mysql2/promise";
import config from "./dbConfig.js";
import color from "ansi-colors";
import path from "path";
import fs from "fs/promises";

const projectPath = process.cwd();
const mybatisPath = path.resolve(projectPath, "mybatisMapper");
async function loadMappers() {
  try {
    const files = await fs.readdir(mybatisPath); // 비동기적으로 파일 목록을 읽어옴
    const mapperArray = files.map(
      (file) => path.resolve(mybatisPath, file) // 절대 경로 생성
    );

    mybatisMapper.createMapper(mapperArray);
  } catch (err) {
    console.error("Error reading directory:", err);
  }
}

loadMappers();

async function connection(nameSpace, queryName, param) {
  const connect = await mysql.createConnection(config);
  const mapperFormat = { language: "sql", indent: "  " };
  let query;
  try {
    //로그
    console.log(
      color.greenBright("mapperName : "),
      nameSpace,
      color.greenBright("/ queryName : "),
      queryName,
      color.greenBright("/ param : "),
      param
    );
    query = mybatisMapper.getStatement(
      nameSpace,
      queryName,
      param,
      mapperFormat
    );
    console.log(color.blueBright(query));
  } catch (err) {
    console.error("--error--error--mybatis--error--error--error--");
    console.log(err);
    console.error("--error--error--mybatis--error--error--error--");
    return { status: false, data: err };
  }
  let result;
  try {
    const [data, fields] = await connect.query(query);
    result = { status: true, data: data };
  } catch (err) {
    console.error("--error--error--error--db--error--error--error--");
    console.log(err);
    console.error("--error--error--error--db--error--error--error--");
    result = { status: false, data: err };
  }
  connect.end();
  return result;
}
export default connection;
