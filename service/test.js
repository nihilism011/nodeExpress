import express from "express";
const router = express.Router();
import DbConnecter from "../DbConnecter.js";
import { jwtAuthentication } from "../jwtAuth.js";
// localhost:8080/test/
const conn = DbConnecter;
router.route("/tokenTest").get(jwtAuthentication, async (req, res) => {
  // console.log(req.query);
  // console.log(req.body);
  res.json(true);
});
router
  .route("/:id")
  .get(async (req, res) => {
    const { data } = await conn("test", "getItem", { id: req.params.id });
    res.json(data);
  })
  .patch(async (req, res) => {
    const { id, name } = req.body;
    const params = {
      id: id,
      name: name,
    };
    const { status } = await conn("test", "updateTestUser", params);
    res.json(status);
  })
  .post(async (req, res) => {
    const id = req.params.id;
    const asdf = { name: id };
    const response = await conn("test", "aiTest", asdf);
    res.json({ data: response, asdf: asdf });
  });

export default router;
