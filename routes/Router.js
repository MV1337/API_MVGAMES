const express = require("express");
const router = express.Router();

router.use("/api/games", require("./gamesRoutes"));

router.get("/", (req, res) => {
  res.send("API WORKING");
});

module.exports = router;
