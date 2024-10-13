import connect from "../connecter.js";

const userApp = (app, router) => {
  router
    .route("/user/:id")
    .get(async (req, res) => {
      const id = req.params.id;
      const { data } = await connect("user", "findUser", { id: id });
      res.json(data);
    })
    .patch(async (req, res) => {
      const id = req.params.id;
      const { userId, userName, password, email, gender } = req.body;
      const form = {
        id: id,
        userId: userId ?? null,
        userName: userName ?? null,
        password: password ?? null,
        email: email ?? null,
        gender: gender ?? null,
      };
      const { data } = await connect("user", "updateUser", form);
      console.log(data);
      res.json(data);
    })
    .delete(async (req, res) => {});
  router
    .route("/users")
    .get(async (req, res) => {
      const { data } = await connect("user", "findAll", {});
      res.json(data);
    })
    .post(async (req, res) => {
      const { userId, userName, password, email, gender } = req.body;
      const form = {
        userId: userId,
        userName: userName,
        password: password,
        email: email,
        gender: gender,
      };
      const { data } = await connect("user", "insertUser", form);
      res.json(data);
    });
};
export default userApp;
