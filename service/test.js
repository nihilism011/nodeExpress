import connect from "../connecter.js";

const testApp = (app, router) => {
  // app.get("/test", async (req, res) => {
  //   const response = await connect("test", "insertName", { name: "kim" });
  //   console.log(response);
  //   res.json({ name: "getTest" });
  // });
  router.route("/test/sub").post((req, res) => {
    const data = req.body;
    console.error(req.body);
    res.render("submitEnd", data);
  });
  router
    .route("/test/:id")
    .get(async (req, res) => {
      const message = `${req.method}방식, url = ${req.url}`;
      const response = await connect("test", "findAll", {});
      console.log(response);
      res.json({ message: message });
    })
    .post(async (req, res) => {
      const response = await connect("test", "insertName", {
        name: req.params.id,
      });
      res.json(response);
    })
    .put((req, res) => {})
    .patch((req, res) => {})
    .delete((req, res) => {});
};
export default testApp;
