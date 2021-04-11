const express = require("express");
const router = express.Router();
const myDB = require("../db/MyDB.js");
const secret = require("./crypt.js");

router.post("/signin", async function (req, res) {
  if(req.body.userName === ""){
    res.redirect("/signin?error=Username is empty");
    return;
  }else if(req.body.passWord === ""){
    res.redirect("/signin?error=Password is empty");
    return;
  }else{
    const pw = secret.encrypt(req.body.passWord);
    const body = {
      "userName": req.body.userName,
      "passWord": pw
    };
    let signinflag = await myDB.signin(body);
    console.log("flag is here: ", signinflag);
    //let textcon;
    if(signinflag) {
      console.log(req.body, "Sign in successful");
      res.redirect("/Game_in");

    } else {
      console.log(req.body, "Wrong username or password");
      res.redirect("/signin?error=Wrong username or password");
    }
  }
});

router.post("/signup", async function (req, res) {
  if(req.body.userName === ""){
    res.redirect("/signup?error=Username is empty");
    return;
  }else if(req.body.passWord === ""){
    res.redirect("/signup?error=Password is empty");
    return;
  }else if(req.body.passWord != req.body.passWord2){
    res.redirect("/signup?error=Passwords are not the same");
    return;
  }else{
    const pw = secret.encrypt(req.body.passWord);
    const body = {
      "userName": req.body.userName,
      "passWord": pw
    };
    let signupflag = await myDB.signup(body);
    console.log("what is this flag here???", signupflag);
    if(signupflag){
      console.log(req.body, "Sign up successful");
      res.redirect("/signin");
    }else{
      console.log(req.body, "User name is already taken");
      res.redirect("/signup?error=User name is already taken");
    }
  }
});

router.get("/posts", async (req, res) => {
  let posts = await myDB.getPosts();
  console.log("done");
  res.send(JSON.stringify(posts));
});

router.post("/deletePost", async (req, res) => {
	console.log("Delete Post", req.body);
	try {
		const post = req.body;
		const dbRes = await myDB.deletePost(post);
		res.send({ done: dbRes });
	} catch (e) {
		console.log("Error", e);
		res.status(400).send({ err: e });
	}
});

router.post("/createPost", async (req, res) => {
	console.log("Create Post", req.body);
	try {
		const posts = req.body;
		await myDB.createPost(posts);
		res.redirect("/post.html");
	} catch (e) {
		console.log("Error", e);
		res.status(400).send({ err: e });
	}
});


module.exports = router;