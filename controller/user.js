import express from "express";
import { getUser } from "../service/userService.js";
const router = express.Router();

// localhost:8080/api/user/
router.route("/:id").get(getUser);
export default router;
