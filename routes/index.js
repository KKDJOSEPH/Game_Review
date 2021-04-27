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

router.post("/getComments", async (req, res) => {
  const id = req.query.id;
  try {
    console.log(req.query);
    const nPerPage = 5;
    const page = +req.query.page || 0;
    const dbRes = await myDB.getComments(id);
    res.send({
      comments: dbRes.slice(page * nPerPage, (page + 1) * nPerPage),
      total: dbRes.length,
    });
  } catch (e) {
    console.log("Error", e);
    res.status(400).send({ err: e });
  }
});

router.post("/createComment", async (req, res) => {
  const gameId = req.body.game_Id;
  const newComment = req.body.new_Comment;
  // console.log("****************************" + newComment);
  // console.log(newComment);
  // console.log(gameId);
  try {
    await myDB.createComment(newComment, gameId);
    res.json({ message: "Add new comment successfully!" });
  } catch {
    // eslint-disable-next-line no-undef
    res.status(400).json({ error: err });
  }
});

module.exports = router;
