import express from "express";
const router = express.Router();
import { idCheck, login, signup } from "../service/nonAuth.js";
// localhost:8080/nonAuth;
router.route("/signup/idCheck").get(idCheck);
router.route("/signup/submit").post(signup);
router.route("/login").post(login);
export default router;
