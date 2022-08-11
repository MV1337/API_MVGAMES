const express = require("express");
const router = express.Router();

const {imageUpload} = require("../middlewares/imageUpload")

const {
  getAllGames,
  createGame,
  updateGame,
  removeGame,
  getGameById,
} = require("../Controller/GameController");

router.get("/", getAllGames);
router.get("/:id", getGameById);
router.post("/create", imageUpload.single("image"), createGame);
router.put("/update/:id", imageUpload.single("image"), updateGame);
router.delete("/delete/:id", removeGame);

module.exports = router;
