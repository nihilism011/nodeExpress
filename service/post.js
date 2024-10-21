import express from "express";
const router = express.Router();
import DbConnecter from "../DbConnecter.js";
// localhost:8080/post/
const conn = DbConnecter;
router.route("/:key").get(async (req, res) => {
  if (req.params.key == "all") {
    const { lastId = null } = req.query;
    const { data } = await conn("post", "findAll", { lastId: lastId });
    console.log(data);
    res.json(data);
    console.log("모두");
  } else {
    console.log(req.params.key);
    res.json(req.params.key);
  }
});

export default router;
