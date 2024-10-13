import mybatisMapper from "mybatis-mapper";
import mysql from "mysql2/promise";
import config from "./dbConfig.js";
import color from "ansi-colors";
mybatisMapper.createMapper(["./mapper.xml"]);
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

export default connect;
