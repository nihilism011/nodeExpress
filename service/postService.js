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
export const getPostCnt = async (req, res) => {
  const { postId } = req.query;
  const likeCnt = await connection("post", "likeCnt", { postId: postId });
  const commentCnt = await connection("post", "commentCnt", { postId: postId });
  const result = { ...likeCnt.data[0], ...commentCnt.data[0] };
  console.log(result);
  res.json(result);
};
export const getFirstPost = async (req, res) => {
  const { data } = await connection("post", "getFirstPost", {});
  res.json(data[0].postId);
};
export const getPostLike = async (req, res) => {
  const { postId } = req.query;
  const userId = req.loginUserId;
  const { data } = await connection("post", "getPostLike", {
    postId: postId,
    userId: userId,
  });
  res.json(data[0].cnt != 0);
};
export const postLike = async (req, res) => {
  const { isLike, postId } = req.body;
  const userId = req.loginUserId;
  if (isLike) {
    const { status } = await connection("post", "deleteLike", {
      postId: postId,
      userId: userId,
    });
    res.json(status);
  } else {
    const { status } = await connection("post", "insertLike", {
      postId: postId,
      userId: userId,
    });
    res.json(status);
  }
};
export const getComment = async (req, res) => {
  const { postId } = req.query;
  const { data } = await connection("post", "getComment", { postId: postId });
  res.json(data);
};
export const insertComment = async (req, res) => {
  const { postId, content } = req.body;
  const userId = req.loginUserId;
  const params = {
    postId: postId,
    content: content,
    userId: userId,
  };
  const { status } = await connection("post", "insertComment", params);
  console.log(params);
  res.json(status);
};
export const getCommentCnt = async (req, res) => {
  const { postId } = req.query;
  const { data } = await connection("post", "getCommentCnt", {
    postId: postId,
  });
  res.json(data[0].cnt);
};
export const getLikeCnt = async (req, res) => {
  const { postId } = req.query;
  const { data } = await connection("post", "getLikeCnt", {
    postId: postId,
  });
  res.json(data[0].cnt);
};
