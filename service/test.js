import express from "express";
const router = express.Router();
import DbConnecter from "../DbConnecter.js";
// localhost:3001/test/
DbConnecter.init("testMapper.xml", "test");
const conn = DbConnecter.connection;
router
  .route("/:id")
  .get(async (req, res) => {
    const { data } = await conn("getItem", { id: req.params.id });
    res.json(data);
  })
  .patch(async (req, res) => {
    const { id, name } = req.body;
    const params = {
      id: id,
      name: name,
    };
    const { status } = await conn("updateTestUser", params);
    res.json(status);
  });

export default router;
