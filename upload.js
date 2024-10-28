import multer from "multer";
const generateRandomString = (length) =>
  [...Array(length)]
    .map(
      () =>
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"[
          Math.floor(Math.random() * 62)
        ]
    )
    .join("");
const getExt = (fileName) => {
  const stn = fileName.split(".");
  const ext = stn[stn.length - 1];
  return ext;
};
const imgStorage = multer.diskStorage({
  destination: "uploads/",
  filename: function (req, file, cb) {
    const ext = getExt(file.originalname);
    cb(null, `${generateRandomString(12)}.${ext}`);
  },
});
const videoStorage = multer.diskStorage({
  destination: "videos/",
  filename: function (req, file, cb) {
    const ext = getExt(file.originalname);
    cb(null, `${generateRandomString(12)}.${ext}`);
  },
});
const profileStorage = multer.diskStorage({
  destination: "profileImg/",
  filename: function (req, file, cb) {
    const ext = getExt(file.originalname);
    cb(null, `${generateRandomString(12)}.${ext}`);
  },
});

export const imgUpload = multer({ storage: imgStorage });
export const videoUpload = multer({ storage: videoStorage });
export const profileUpload = multer({ storage: profileStorage });
