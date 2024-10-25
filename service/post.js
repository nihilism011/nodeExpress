import express from "express";
const router = express.Router();
import DbConnecter from "../DbConnecter.js";
import multer from "multer";
const upload = multer({ dest: "uploads/" });
// localhost:8080/post/
const conn = DbConnecter;
router
  .route("/addPost")
  .get(async (req, res) => {
    const { lastId = null } = req.query;
    const { data } = await conn("post", "addPost", { lastId: lastId });
    const idList = data.map((item) => item.postId);
    const image = await conn("post", "slideImg", { idList: idList });
    const addList = data.map((item) => {
      const imgNames = image.data
        .filter((d) => d.postId === item.postId)
        .map((d) => d.imageName);
      return { ...item, imgName: imgNames };
    });
    res.json(addList);
  })
  .post(upload.array("photos", 12), async (req, res) => {
    const fileNames = req.files.map((file) => file.filename);
    console.log(fileNames);
    console.log(req.body.userId, req.body.content);
    const postRes = await conn("post", "insertPost", {
      userId: req.body.userId,
      content: req.body.content,
    });
    if (postRes.status) {
      const insertId = postRes.data.insertId;
      try {
        fileNames.forEach(async (element) => {
          await conn("post", "imgUpload", {
            imageName: element,
            postId: insertId,
          });
        });
        res.json(true);
      } catch (err) {
        console.log(err);
        res.json(false);
      }
    } else {
      res.json(false);
    }
  });

export default router;
