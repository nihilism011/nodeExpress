import jwt from "jsonwebtoken";
import connection from "../DbConnecter.js";
import bcrypt from "bcrypt";

export const idCheck = async (req, res) => {
  const { id } = req.query;
  const { data } = await connection("user", "idCheck", { userId: id });
  res.json(data[0].cnt === 0);
};
export const signup = async (req, res) => {
  const userSubmit = req.body;
  console.log(userSubmit);
  userSubmit.password = await bcrypt.hash(
    userSubmit.password,
    parseInt(process.env.saltRounds)
  );
  const { status } = await connection("user", "insertUser", userSubmit);
  res.json(status);
};
export const login = async (req, res) => {
  const { inputId, inputPwd } = req.body;
  const { data } = await connection("user", "login", { userId: inputId });
  console.log(data);
  if (data.length === 0) {
    res.json({ state: false, reason: "id" });
  } else {
    const dbPassword = data[0].password;
    const result = await bcrypt.compare(inputPwd, dbPassword);
    if (!result) {
      res.json({ state: false, reason: "pwd" });
    } else {
      const token = jwt.sign(
        { id: data[0].id, userName: data[0].userName },
        process.env.jwt_key,
        { expiresIn: "10h" }
      );
      res.json({
        state: true,
        id: data[0].id,
        userName: data[0].userName,
        token,
      });
    }
  }
};
