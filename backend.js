const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const indexRouter = require("./routes/index");
const myAuth = require("./auth/MyAuth.js");
const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use(express.static(path.join(__dirname, "front/build")));

app.use("/test", myAuth);
app.use("/", indexRouter);

app.get("*", (request, response) => {
    response.sendFile(path.join(__dirname, "./reactapp/build", "index.html"));
});
module.exports = app;
