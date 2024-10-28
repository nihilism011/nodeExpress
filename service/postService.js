import connection from "../DbConnecter.js";

export const lastFivePostToId = async (req, res) => {
  const { lastId = null } = req.query;
  const { data } = await connection("post", "lastFivePostToId", {
    lastId: lastId,
  });
  const idList = data.map((item) => item.postId);
  const image = await connection("post", "postImgToList", { idList: idList });
  const addList = data.map((item) => {
    const imgNames = image.data
      .filter((d) => d.postId === item.postId)
      .map((d) => d.imageName);
    return { ...item, imgName: imgNames };
  });
  res.json(addList);
};
export const insertPost = async (req, res) => {
  // req.username;
  const fileNames = req.files.map((file) => file.filename);
  const postRes = await connection("post", "insertPost", {
    userId: req.body.userId,
    content: req.body.content,
  });
  if (postRes.status) {
    const insertId = postRes.data.insertId;
    try {
      fileNames.forEach(async (element) => {
        await connection("post", "imgUpload", {
          imageName: element,
          postId: insertId,
        });
      });
      res.json(true);
    } catch (err) {
      console.log(err);
      res.json(false);
    }
  } else {
    res.json(false);
  }
};
export const getPosts = async (req, res) => {
  const { userId } = req.query;
  const { data } = await connection("post", "getPosts", {
    userId: userId,
  });
  res.json(data);
};
