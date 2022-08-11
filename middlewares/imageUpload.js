const multer = require("multer");
const path = require("path");

const imageStore = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = "games";

    cb(null, `public/imagens/${folder}/`);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const imageUpload = multer({
  storage: imageStore,
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg)$/)) {
      //upload only png and jpg formats
      return cb(new Error("Por favor, envie apenas png ou jpg!"));
    }
    cb(undefined, true);
  },
});

module.exports = { imageUpload };
