const express = require("express");
const app = express();

const port = process.env.PORT || 8080;

const path = require("path");

//cors
// const cors = require("cors");

//conexao
const conn = require("./db/conn");

//model
const game = require("./model/Game");

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET");

  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//pasta public
app.use(express.static("public"));

//routes
const router = require("./routes/Router");
app.use(router);

//conexao com banco
conn
  .sync()
  .then(() => {
    app.listen(port);
  })
  .catch((err) => {
    console.log(err);
  });
