const express = require("express");
const router = express.Router();
const users = require("../data/users");

router.get("/page-user-login", (req, res) => {
  if (req.session.user) {
    console.log(`[${new Date().toUTCString()}]: ${req.method} ${req.originalUrl} Authenticated User`)
    res.redirect("/private");
  } else {
    console.log(console.log(`[${new Date().toUTCString()}]: ${req.method} ${req.originalUrl} Non-Authenticated User`))
    res.status(401).render("../views/pages/page-user-login", {});
    return;
  }
});

router.get("/page-user-signup", (req, res) => {
  if (req.session.user) {
    res.redirect("/private");
  } else {
    res.status(401).render("../views/pages/page-user-signup", {});
    return;
  }
});

router.post("/signup", async (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  let user;
  try {
    if (!username || !password) throw "Missing username or password";
    if (typeof username !== "string") throw "username should be string";
    if (username.trim().length === 0)
        throw "username cannot be empty spaces";
    for (let i = 0 ; i < username.length; i++) {
        if (username[i] === " ") throw "username cannot contain space"
    }
    if (!username.match("^[a-zA-Z0-9]+$"))
        throw "username can only be alphanumeric characters";
    if (username.length < 4) throw "username should be at least 4 characters";
    

    if (password.trim().length === 0)
        throw "password with only spaces is not allowed";
    for (let i = 0 ; i < password.length; i++) {
        if (password[i] === " ") throw "password cannot contain space"
    }
    if (password.length < 6) throw "password should be at least 6 characters long";
    user = await users.createUser(username, password);
  } catch (e) {
    return res.status(400).render("../views/pages/signup", { error:e });
  }

  if (!user.userInserted) {
    res.status(500).render({ error:"Internal Server Error" });
    return;
  } else {
    res.redirect("/");
  }
});

router.post("/login", async (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  let user;
  try {
    if (!username || !password) throw "Missing username or password";
    if (typeof username !== "string") throw "username should be string";
    if (username.trim().length === 0)
        throw "username cannot be empty spaces";
    for (let i = 0 ; i < username.length; i++) {
        if (username[i] === " ") throw "username cannot contain space"
    }
    if (!username.match("^[a-zA-Z0-9]+$"))
        throw "username can only be alphanumeric characters";
    if (username.length < 4) throw "username should be at least 4 characters";
    

    if (password.trim().length === 0)
        throw "password with only spaces is not allowed";
    for (let i = 0 ; i < password.length; i++) {
        if (password[i] === " ") throw "password cannot contain space"
    }
    if (password.length < 6) throw "password should be at least 6 characters long";
    
    user = await users.checkUser(username, password);
  } catch (e) {
        res.status(400).render("../views/pages/login", { error:"username or password not valid" });  
        return;
  }

  try {
    if (user.authenticated == true) {
      req.session.user = username;
      console.log(`[${new Date().toUTCString()}]: ${req.method} ${req.originalUrl} Authenticated User`)
      res.redirect("/private");
    } else {
        console.log(console.log(`[${new Date().toUTCString()}]: ${req.method} ${req.originalUrl} Non-Authenticated User`))
        res.status(400).render("../views/pages/login", { error:"username or password not valid" });
        return;
    }
  } catch (e) {
        res.status(400).render("../views/pages/login", { error:"username or password not valid" });  
        return;
  }
});

router.get("/private", async (req, res) => {
  let user = await req.session.user;

  if (user) {
    console.log(console.log(`[${new Date().toUTCString()}]: ${req.method} ${req.originalUrl} Authenticated User`))
    res.render("../views/pages/auth", { username: user });
  } else {
    console.log(console.log(`[${new Date().toUTCString()}]: ${req.method} ${req.originalUrl} Non-Authenticated User`))
    res.status(400).render("../views/pages/login", { error: "username or password not valid" });
  }
});

router.get("/logout", async (req, res) => {
  if (await req.session.user) {
    req.session.destroy();
    res.render("../views/pages/logout", {});
  }
});

module.exports = router;
