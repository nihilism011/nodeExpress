import express from "express";
const router = express.Router();
import DbConnecter from "../DbConnecter.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// localhost:8080/user/
const saltRounds = 10;
const JWT_KEY = "secret_key";
const conn = DbConnecter;
router.route("/login").post(async (req, res) => {
  const { inputId, inputPwd } = req.body;
  const { data } = await conn("user", "login", {
    userId: inputId,
  });
  if (data.length === 0) {
    return res.json({ state: false, reason: "id" });
  }
  const dbPwd = data[0].password;
  const result = await bcrypt.compare(inputPwd, dbPwd);
  if (!result) {
    res.json({ state: false, reason: "pwd" });
  } else {
    const token = jwt.sign(
      { id: data[0].id, userName: data[0].userName },
      JWT_KEY,
      { expiresIn: "1h" }
    );
    console.log(token);
    res.json({
      state: true,
      id: data[0].id,
      userName: data[0].userName,
      token,
    });
  }
});
router.route("/idCheck").get(async (req, res) => {
  const { id } = req.query;
  const { data } = await conn("user", "idCheck", { userId: id ?? null });
  res.json(data[0].cnt === 0 ? true : false);
});

router.route("/signup/submit").post(async (req, res) => {
  const userSubmit = req.body;
  userSubmit.password = await bcrypt.hash(userSubmit.password, saltRounds);
  const { status } = await conn("user", "insertUser", userSubmit);
  res.json(status);
});

router
  .route("/selectUser/:id")
  .get(async (req, res) => {
    const { data } = await conn("user", "findUser", { id: req.params.id });
    res.json(data);
  })
  .put(async (req, res) => {
    const { status } = await conn("user", "", { id: req.params.id });
  })
  .patch(async (req, res) => {
    const id = req.params.id;
    const { userId, userName, password, email, gender } = req.body;
    const form = {
      id: id,
      userId: userId ?? null,
      userName: userName ?? null,
      password: password ?? null,
      email: email ?? null,
      gender: gender ?? null,
    };
    const { data } = await conn("user", "updateUser", form);
    console.log(data);
    res.json(data);
  })
  .delete(async (req, res) => {});
router
  .route("/users")
  .get(async (req, res) => {
    const { data } = await conn("findAll", {});
    res.json(data);
  })
  .post(async (req, res) => {
    const { userId, userName, password, email, gender } = req.body;
    const form = {
      userId: userId,
      userName: userName,
      password: password,
      email: email,
      gender: gender,
    };
    const { data } = await conn("insertUser", form);
    res.json(data);
  });
export default router;
