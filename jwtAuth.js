import jwt from "jsonwebtoken";

export const jwtAuthentication = (req, res, next) => {
  const token = req.headers.token;
  if (!token) {
    return res.json(false);
  }
  jwt.verify(token, "secret_key", (err, user) => {
    if (err) {
      return res.json(false);
    }
    console.log(user);
    next();
  });
};
