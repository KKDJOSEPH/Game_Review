const express = require("express");
const router = express.Router();
const path = require("path");
const myDB = require("../db/MyDB.js"); //pokedb
/* GET home page. */
// eslint-disable-next-line no-unused-vars
router.get("/game", async (req, res) => {
/*  await myDB.loadGame();*/
  const pokemon = await myDB.getGames();
  console.log(pokemon);
  await res.json(pokemon); // get pokemon db
});

router.get("*", (req, res) =>
  res.sendFile(path.resolve("front", "build", "index.html"))
);

module.exports = router;
