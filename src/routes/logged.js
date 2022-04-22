const express = require("express");
const router = express.Router();
const users = require("../data/user");
const bcrypt = require("bcrypt");

// GET
router.get("/", (req, res) => {
  if (req.session.user) {
    // user is authenticated
    console.log(
      "[" +
        new Date().toUTCString() +
        "]: " +
        req.method +
        " " +
        req.originalUrl +
        " (Authenticated User)"
    );
    res.redirect("/private");
  } else {
    // user is not authenticated
    console.log(
      "[" +
        new Date().toUTCString() +
        "]: " +
        req.method +
        " " +
        req.originalUrl +
        " (Non-Authenticated User)"
    );
    res.status(401).render("../views/pages/login", {});
    return;
  }
});
// GET /signup
router.get("/signup", (req, res) => {
  if (req.session.user) {
    // user is authenticated
    res.redirect("/private");
  } else {
    // user is not authenticated
    res.status(401).render("../views/pages/signup", {});
    return;
  }
});
// POST /signup
router.post("/signup", async (req, res) => {
  const userName = req.body.username;
  const passWord = req.body.password;
  let create;
  try {
    if (!userName || !passWord) throw "username and password must be supplied";
    if (typeof userName !== "string") throw "username should be string";
    if (userName.match(/^[ ]*$/)) throw "just spaces is not allowed";
    if (userName.indexOf(" ") !== -1) throw "space in username is not allowed";
    if (!userName.match("^[a-zA-Z0-9]*$"))
      throw "only alphanumeric characters allowed";
    if (userName.length < 4) throw " at least 4 characters long";

    if (passWord.match(/^[ ]*$/)) throw "just spaces is not allowed";
    if (passWord.indexOf(" ") !== -1) throw "space in password is not allowed";
    if (passWord.length < 6) throw " at least 6 characters long";
    create = await users.createUser(userName, passWord);
  } catch (e) {
    error = e;
    return res.status(400).render("../views/pages/signup", { error });
  }

  if (!create.userInserted) {
    error = "Internal Server Error";
    res.status(500).render({ error });
    return;
  } else {
    res.redirect("/");
  }
});
// POST /login
router.post("/login", async (req, res) => {
  const userName = req.body.username;
  const passWord = req.body.password;
  let found;
  try {
    if (!userName || !passWord) throw "username and password must be supplied";
    if (typeof userName !== "string") throw "username should be string";
    if (userName.match(/^[ ]*$/)) throw "just spaces is not allowed";
    if (userName.indexOf(" ") !== -1) throw "space in username is not allowed";
    if (!userName.match("^[a-zA-Z0-9]*$"))
      throw "only alphanumeric characters allowed";
    if (userName.length < 4) throw " at least 4 characters long";

    if (passWord.match(/^[ ]*$/)) throw "just spaces is not allowed";
    if (passWord.indexOf(" ") !== -1) throw "space in password is not allowed";
    if (passWord.length < 6) throw " at least 6 characters long";
    found = await users.checkUser(userName, passWord);
  } catch (e) {
    error = e;
    return res.status(400).render("../views/pages/login", { error });
  }

  try {
    if (found.authenticated == true) {
      req.session.user = userName;
      res.redirect("/private");
    } else {
      console.log(
        "[" +
          new Date().toUTCString() +
          "]: " +
          req.method +
          " " +
          req.originalUrl +
          " (Non-Authenticated User)"
      );
      error = "Please log in with valid credentials.";
      res.status(400).render("../views/pages/login", { error });
      return;
    }
  } catch (e) {
    //check but failed
    console.log(
      "[" +
        new Date().toUTCString() +
        "]: " +
        req.method +
        " " +
        req.originalUrl +
        " (Non-Authenticated User)"
    );
    error = "Please log in with valid credentials.";
    res.status(400).render("../views/pages/login", { error });
    return;
  }
});
// GET /private
router.get("/private", (req, res) => {
  const user = req.session.user;

  if (user) {
    console.log(
      "[" +
        new Date().toUTCString() +
        "]: " +
        req.method +
        " " +
        req.originalUrl +
        " (Authenticated User)"
    );
    res.render("../views/pages/auth", { username: user });
  } else {
    console.log(
      "[" +
        new Date().toUTCString() +
        "]: " +
        req.method +
        " " +
        req.originalUrl +
        " (Non-Authenticated User)"
    );
    error = "Please log in with valid credentials.";
    res.status(401).render("../views/pages/login", { error });
  }
});
// GET /logout
router.get("/logout", (req, res) => {
  if (req.session.user) {
    req.session.destroy();
    res.render("../views/pages/logout", {});
  }
});

module.exports = router;
