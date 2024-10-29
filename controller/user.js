import express from "express";
import { getUser, getUserName, profileChange } from "../service/userService.js";
import { profileUpload } from "../upload.js";
const router = express.Router();

// localhost:8080/api/user/
router
  .route("/profileChange")
  .post(profileUpload.array("profiles", 2), profileChange);
router.route("/name").get(getUserName);
router.route("/:id").get(getUser);

export default router;
