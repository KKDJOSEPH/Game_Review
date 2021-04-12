const express = require("express");
const router = express.Router();
const path = require("path");
const myDB = require("../db/MyDB.js");
 
/* GET home page. */
// eslint-disable-next-line no-unused-vars
router.get("/game", async (req, res) => {
  const games = await myDB.getGames();
  /*console.log(games);*/
  await res.json(games);
});

router.get("*", (req, res) =>
  res.sendFile(path.resolve("front", "build", "index.html"))
);

// eslint-disable-next-line no-unused-vars
router.post("/new", async (req, res) => {
  const name = req.body.name;
  const imageID = req.body.image;
  const rating = req.body.rating;
  const type = req.body.type;
  const newGame = {
    Name: name,
    _id: imageID,
    Rating: rating,
    Type: type
  };
  console.log(newGame);
  await myDB.insertGame(newGame);
});

// eslint-disable-next-line no-unused-vars
router.post("/comment", async (req, res) => {
  const id = req.body._id;
  const comment = req.body.comment;
  const newGame = {"_id": id, "comment": comment};
  await myDB.addComment(newGame);
});

module.exports = router;
