import connection from "../DbConnecter.js";

export const getUser = async (req, res) => {
  const id = req.params.id;
  const { data } = await connection("user", "getUser", { id, id });
  console.log(data);
  res.json(data[0]);
};
