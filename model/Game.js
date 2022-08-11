const { DataTypes } = require("sequelize");
const db = require("../db/conn");

const Game = db.define("game", {
  title: {
    type: DataTypes.STRING,
    require: true,
  },
  year: {
    type: DataTypes.STRING,
    require: true,
  },
  image: {
    type: DataTypes.STRING,
    require: true
  },
  url: {
    type: DataTypes.STRING,
    require: true,
  },
  genre: {
    type: DataTypes.STRING,
    require: true,
  },
  details: DataTypes.TEXT,
});



Game.sync({ force: false })
  .then(() => {
    console.log("Rodando");
  })
  .catch((err) => {
    console.log("Algo deu errado", +err);
  });

module.exports = Game;
