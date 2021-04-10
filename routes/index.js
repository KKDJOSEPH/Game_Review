const express = require("express");
const router = express.Router();
const path = require("path");

const games = Array.from({ length: 10 }).map((g, i) => ({
  title: `Game ${i}`,
}));
const nPerPage = 20;

/* GET home page. */
// eslint-disable-next-line no-unused-vars
router.get("/games", function (req, res, next) {
  const query = req.query.query || "";
  const page = +req.query.page || 0;
  console.log("Pagination", page * nPerPage, (page + 1) * nPerPage);

  // Here pagination is implemented in Javascript
  res.send({
    games: games
      .filter((d) => d.title.includes(query))
      .slice(page * nPerPage, (page + 1) * nPerPage),
    total: games.length,
  });

  // You actually want to implement it in Mongo
  // something like
  //
  // games
  //   .find({title: {$regex: query}})
  //   .sort({ _id: 1 })
  //   .skip(pageNumber > 0 ? (pageNumber - 1) * nPerPage : 0)
  //   .limit(nPerPage);
});

router.get("*", (req, res) =>
  res.sendFile(path.resolve("front", "build", "index.html"))
);

module.exports = router;
