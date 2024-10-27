import express from "express";
import { lastFivePostToId, insertPost } from "../service/postService.js";
import { imgUpload } from "../upload.js";
const router = express.Router();
// localhost:8080/api/post/
router.route("/lastFivePostToId").get(lastFivePostToId);
router.route("/").post(imgUpload.array("photos", 12), insertPost);

export default router;
