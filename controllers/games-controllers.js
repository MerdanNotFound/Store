const HttpError = require("../models/http-error");
const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");

let DUMMY_GAMES = [
  {
    id: "g1",
    title: "Game 1",
    description: "Game 1 description",
    price: 0,
    creator: "Game 1 developer",
    image: "https://via.placeholder.com/150",
  },
];

const getGamesById = (req, res, next) => {
  const gameID = req.params.gid;
  const games = DUMMY_GAMES.filter((g) => g.id === gameID);

  if (!games || games.length === 0) {
    throw new HttpError("Could not fing Games for the provided id", 404);
  }

  res.json({ games });
};

const postGame = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new HttpError("Invalid inputs passed, please check your data", 422);
  }

  const { id, title, description, price, creator, image } = req.body;
  const createdGame = {
    id: uuidv4(),
    title,
    description,
    price,
    creator,
    image,
  };

  DUMMY_GAMES.push(createdGame);

  res.status(201).json({ game: createdGame });
};

const updateGameById = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new HttpError("Invalid inputs passed, please check your data", 422);
  }

  const { title, description, price, image } = req.body;
  const gameID = req.params.gid;

  const updatedGame = { ...DUMMY_GAMES.find((g) => g.id === gameID) };
  const gameIndex = DUMMY_GAMES.findIndex((g) => g.id === gameID);
  updatedGame.title = title;
  updatedGame.description = description;
  updatedGame.price = price;
  updatedGame.image = image;

  DUMMY_GAMES[gameIndex] = updatedGame;

  res.status(200).json({ game: updatedGame });
};

const deleteGameById = (req, res, next) => {
  const gameID = req.params.gid;
  if (DUMMY_GAMES.find((g) => g.id === gameID)) {
    throw new HttpError("Could not find a game for that id.", 404);
  }
  DUMMY_GAMES = DUMMY_GAMES.filter((g) => g.id !== gameID);
  res.status(200).json({ message: "Deleted game." });
};

exports.getGamesById = getGamesById;
exports.postGame = postGame;
exports.updateGameById = updateGameById;
exports.deleteGameById = deleteGameById;
