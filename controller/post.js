import express from "express";
import {
  lastFivePostToId,
  insertPost,
  getPosts,
  getPostCnt,
  getFirstPost,
  getPostLike,
  postLike,
  getComment,
  insertComment,
} from "../service/postService.js";
import { imgUpload } from "../upload.js";
const router = express.Router();
// localhost:8080/api/post/
router.route("/lastFivePostToId").get(lastFivePostToId);
router.route("/").post(imgUpload.array("photos", 12), insertPost);
router.route("/posts").get(getPosts);
router.route("/cnt").get(getPostCnt);
router.route("/firstPost").get(getFirstPost);
router.route("/postLike").get(getPostLike).post(postLike);
router.route("/comment").get(getComment).post(insertComment);
export default router;
