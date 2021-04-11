const express = require("express");
const router = express.Router();
const path = require("path");
const myDB = require("../db/MyDB.js");
 
/* GET home page. */
// eslint-disable-next-line no-unused-vars
router.get("/game", async (req, res) => {
  const games = await myDB.getGames();
  console.log(games);
  await res.json(games);
});

router.get("*", (req, res) =>
  res.sendFile(path.resolve("front", "build", "index.html"))
);

// eslint-disable-next-line no-unused-vars
router.post("/new", async (req, res) => {
  var name = req.body.name;
  var imageID = req.body.image;
  var rating = req.body.rating;
  var type = req.body.type;
  var newGame = {
    Name: name,
    _id: imageID,
    Rating: rating,
    Type: type
  };
  console.log(newGame);
  await myDB.insertName(newGame);
});

module.exports = router;
