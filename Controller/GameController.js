const Game = require("../model/Game");

const getAllGames = async (req, res) => {
  const game = await Game.findAll({ raw: true });

  res.status(200).json(game);
};

const getGameById = async (req, res) => {
  const id = req.params.id;

  if (isNaN(id)) {
    res.status(400).json({msg: "ID inválido"});
    return;
  }

  const game = await Game.findOne({ where: { id: id }, raw: true });

  if (!game) {
    res.status(400).json({ msg: "Não encontrado" });
    return;
  }

  res.status(200).json(game);
  console.log(game);
};

const createGame = async (req, res) => {
  const { title, year, url, genre, details } = req.body;

  let image = "";

  if (req.file) {
    image = req.file.filename;
  }

  if (!title) {
    res.status(422).json({msg: "O título é obrigatório"});
    return;
  }

  const checkIfGameExists = await Game.findOne({ where: { title: title } });

  if (checkIfGameExists) {
    res.status(422).json({msg: "O jogo já está cadastrado"});
    return;
  }

  if (!year) {
    res.status(422).json({msg: "O ano é obrigatório"});
    return;
  }

  if (!image) {
    res.status(422).json({msg: "A imagem é obrigatória!"});
    return;
  }

  try {
    new URL(url);
  } catch (error) {
    res.status(422).json({msg: "Você precisa passar uma URL"});
    return;
  }

  if (!url) {
    res.status(422).json({msg: "A url é obrigatória"});
    return;
  }

  if (!genre) {
    res.status(422).json({msg: "O gênero do jogo é obrigatório"});
    return;
  }

  if (!details) {
    res.status(422).json({msg: "Os detalhes sobre o jogo é obrigatório"});
    return;
  }

  const game = {
    title,
    year,
    image,
    url,
    genre,
    details,
  };

  try {
    const createdGame = await Game.create(game);

    res.status(200).json(game);
  } catch (error) {
    console.log(error);
  }
};

const updateGame = async (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    res.status(400).json({msg: "ID inválido"});
    return;
  }

  const { title, year, url, genre, details } = req.body;

  
  const game = await Game.findOne({ where: { id: id } });

  if (!game) {
    res.status(400).json({msg: "Esse jogo não existe"});
    return;
  }

  if (title) {
    game.title = title;
  }

  if (year) {
    game.year = year;
  }


  if (url) {
    try {
      new URL(url);
      game.url = url;
    } catch (error) {
      res.status(422).json({msg: "Você precisa passar uma URL"});
      return;
    }
  }

  if (genre) {
    game.genre = genre;
  }

  if (details) {
    game.details = details;
  }

  const update = {
    title,
    year,
    url,
    genre,
    details,
  };

  await Game.update(update, { where: { id: id } });

  res.status(200).json(game);
};

const removeGame = async (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    res.status(400).json({msg: "ID inválido"});
    return;
  }

  const game = await Game.findOne({ where: { id: id } });

  if (!game) {
    res.status(400).json({msg: "Esse jogo não existe"});
    return;
  }

  await Game.destroy({ where: { id: id } });
  res.status(200).json({msg: "Jogo removido com sucesso."});
};

module.exports = {
  getAllGames,
  getGameById,
  createGame,
  updateGame,
  removeGame,
};
