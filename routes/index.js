const express = require("express");
const router = express.Router();
const path = require("path");
const myDB = require("../db/MyDB.js");

/* GET home page. */
// eslint-disable-next-line no-unused-vars
router.get("/games", async (req, res) => {
  const games = await myDB.getGames();
  /*console.log(games);*/
  await res.json(games);
});

router.post("/games", async (req, res) => {
  try {
    console.log(req.body);
    const nPerPage = 9;
    const page = +req.body.page || 0;
    const dbRes = await myDB.getGames(req.body);
    res.send({
      games: dbRes.slice(page * nPerPage, (page + 1) * nPerPage),
      total: dbRes.length,
    });
  } catch (e) {
    console.log("Error", e);
    res.status(400).send({ err: e });
  }
});

router.get("*", (req, res) =>
  res.sendFile(path.resolve("front", "build", "index.html"))
);

// eslint-disable-next-line no-unused-vars
router.post("/new", async (req, res) => {
  const name = req.body.name;
  const image = req.body.image;
  const rating = req.body.rating;
  const type = req.body.type;
  const newGame = {
    Name: name,
    _id: image,
    Rating: rating,
    Type: type
  };
  console.log(newGame);
  await myDB.insertGame(newGame);
});

// eslint-disable-next-line no-unused-vars
router.post("/comment", async (req) => {
  const id = req.body._id;
  const comment = req.body.comment;
  const newGame = {"_id": id, "Comment": comment};
  await myDB.addComment(newGame);
});

module.exports = router;
