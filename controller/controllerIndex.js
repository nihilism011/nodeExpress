import nonAuthRouter from "./nonAuth.js";
import userRouter from "./user.js";
import postRouter from "./post.js";

const controller = {
  nonAuthRouter,
  userRouter,
  postRouter,
};

export default controller;
