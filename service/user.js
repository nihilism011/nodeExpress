import express from "express";
const router = express.Router();
import DbConnecter from "../DbConnecter.js";
// localhost:3001/user/
const conn = DbConnecter;
router.route("/idCheck").get(async (req, res) => {
  const { id } = req.query;
  const { data } = await conn("user", "idCheck", { userId: id ?? null });
  res.json(data[0].cnt === 0 ? true : false);
});
router.route("/signup/submit").post(async (req, res) => {
  const { status } = await conn("user", "insertUser", req.body);
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
