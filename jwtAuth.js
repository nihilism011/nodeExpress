import jwt from "jsonwebtoken";

export const jwtAuthentication = (req, res, next) => {
  const token = req.headers.token;
  if (!token) {
    return res.json({ err: "token is null" });
  }
  jwt.verify(token, process.env.jwt_key, (err, user) => {
    if (err) {
      return res.json({ err: "non valid" });
    }
    console.log(user);
    req.loginUserId = user.id;
    next();
  });
};
