import express from "express";
const router = express.Router();
import DbConnecter from "../DbConnecter.js";
// localhost:8080/post/
const conn = DbConnecter;
router.route("/addPost").get(async (req, res) => {
  const { lastId = null } = req.query;
  const { data } = await conn("post", "addPost", { lastId: lastId });
  const idList = data.map((item) => item.postId);
  const image = await conn("post", "slideImg", { idList: idList });
  const addList = data.map((item) => {
    const imgNames = image.data
      .filter((d) => d.id === item.id)
      .map((d) => d.imgName);
    return { ...item, imgName: imgNames };
  });
  res.json(addList);
});

export default router;
