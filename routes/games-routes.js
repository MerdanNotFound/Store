const express = require("express");
const { check } = require("express-validator");
const router = express.Router();

const gamesController = require("../controllers/games-controllers");

router.get("/:gid", gamesController.getGamesById);

router.post(
  "/",
  [
    check("title").not().isEmpty(),
    check("description").isLength({ min: 5 }),
    check("price").not().isEmpty(),
    check("creator").isLength({ min: 2 }, check("image").isLength({ min: 9 })),
  ],
  gamesController.postGame
);

router.patch(
  "/:gid",
  [
    check("title").not().isEmpty(),
    check("description").isLength({ min: 5 }),
    check("price").not().isEmpty(),
    check("image").isLength({ min: 9 }),
  ],
  gamesController.updateGameById
);

router.delete("/:gid", gamesController.deleteGameById);

module.exports = router;
