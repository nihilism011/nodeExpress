const userApp = (app, connect, router) => {
  router
    .route("/user")
    .get(async (req, res) => {
      const message = `${req.method}방식, url = ${req.url}`;
      const response = await connect("test", "findAll", {});
      console.log(response);
      res.json({ message: message });
    })
    .post((req, res) => {})
    .put((req, res) => {})
    .patch((req, res) => {})
    .delete((req, res) => {});
};
export default userApp;
