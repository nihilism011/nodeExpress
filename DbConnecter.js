import mybatisMapper from "mybatis-mapper";
import mysql from "mysql2/promise";
import config from "./dbConfig.js";
import color from "ansi-colors";
import path from "path";

let nameSpace;

/**
 * connection의 설정을 초기화
 *
 * @param {String} mybatisPath mapper의 경로
 * @param {String} ns mapper의 nameSpace
 */
function init(mybatisPath, ns) {
  const projectPath = process.cwd();
  const absolutePath = path.resolve(projectPath, "mybatisMapper", mybatisPath);
  // console.log(absolutePath);
  mybatisMapper.createMapper([absolutePath]);
  nameSpace = ns;
}
async function connection(queryName, param) {
  const connect = await mysql.createConnection(config);
  const mapperFormat = { language: "sql", indent: "  " };
  let query;
  try {
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
  }
  let result;
  try {
    const response = await connect.query(query);
    const data = response[0];
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
export default { init, connection };
