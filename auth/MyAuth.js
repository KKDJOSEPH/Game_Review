const express = require("express");
const router = express.Router();
const myDB = require("../db/MyDB.js");
const secret = require("./crypt.js");
/*const alert = require("alert");

let signinflag = false;
let signupflag = false;*/
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
      //textcon = "Sign in successful";
      // 进入到登录成功的页面
      res.redirect("/");

    } else {
      console.log(req.body, "Wrong username or password");
      // 进入到登录失败的页面
      //textcon = "Wrong username or password";
      //alert("Wrong user name or password");
      res.redirect("/signin?error=Wrong username or password");
    }
    //res.send({flag: signinflag, text: textcon});
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
    //console.log("what is the body here??   ", req.body);
    //let textcon;
    const pw = secret.encrypt(req.body.passWord);
    const body = {
      "userName": req.body.userName,
      "passWord": pw
    };
    let signupflag = await myDB.signup(body);
    console.log("what is this flag here???", signupflag);
    if(signupflag){
      console.log(req.body, "Sign up successful");
      //textcon = "Sign up successful";
      //res.send({flag: true, text: "Wtf"});
      res.redirect("/signin");
    }else{
      console.log(req.body, "User name is already taken");
      //textcon = "User name is already taken";
      //alert("User name is already taken");
      //res.send({flag: false, text: "User name is already taken"});
      res.redirect("/signup?error=User name is already taken");
    }
    //res.send({flag: signupflag, text: textcon});
  }
});


module.exports = router;