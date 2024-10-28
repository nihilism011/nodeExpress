import connection from "../DbConnecter.js";

export const getUser = async (req, res) => {
  const id = req.params.id;
  const { data } = await connection("user", "getUser", { id, id });
  console.log(data);
  res.json(data[0]);
};
export const profileChange = async (req, res) => {
  const fileNames = req.files.map((file) => file.filename);
  const { userId } = req.body;
  const params = { profileImg: fileNames[0], id: userId };
  const { status } = await connection("user", "ProfileChange", params);
  res.json(status);
};
