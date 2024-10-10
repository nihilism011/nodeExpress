const testApp = (app, connect) => {
  app.get("/test", async (req, res) => {
    const response = await connect("test", "insertName", { name: "kim" });
    console.log(response);
    res.json({ name: "getTest" });
  });
  app.post("/test", (req, res) => {
    res.json({ name: "postTest" });
  });
  app.delete("/test", (req, res) => {
    res.json({ name: "deleteTest" });
  });
  app.patch("/test", (req, res) => {
    res.json({ name: "patchTest" });
  });
  app.put("/test", (req, res) => {
    res.json({ name: "putTest" });
  });
};
export default testApp;
