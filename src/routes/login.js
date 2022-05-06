const express = require("express");
const router = express.Router();
const users = require("../data/users");

router.get("/page-user-login", (req, res) => {
  if (req.session.user) {
    console.log(`[${new Date().toUTCString()}]: ${req.method} ${req.originalUrl} Authenticated User`)
    res.redirect("/index");
  } else {
    console.log(console.log(`[${new Date().toUTCString()}]: ${req.method} ${req.originalUrl} Non-Authenticated User`))
    res.status(401).render("../views/pages/page-user-login", {});
    return;
  }
});

//GET signup
router.get("/page-user-signup", (req, res) => {
  if (req.session.user) {
    res.redirect("/index");
  } else {
    res.status(401).render("../views/pages/page-user-signup", {});
    return;
  }
});

//POST signup
router.post("/page-user-signup", async (req, res) => {
  let userName = req.body.userName;
  let password = req.body.password;
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let email = req.body.email;
  let phone = req.body.phone;
  let city = req.body.city;
  let state = req.body.state;
  let country = req.body.country;
  let zipCode = req.body.zipCode;
  let clientId = req.body.clientId;
  let clientSecret = req.body.clientSecret;
  let user;
  try {
    // if (!username || !password) throw "Missing username or password";
    // if (typeof username !== "string") throw "username should be string";
    // if (username.trim().length === 0)
    //     throw "username cannot be empty spaces";
    // for (let i = 0 ; i < username.length; i++) {
    //     if (username[i] === " ") throw "username cannot contain space"
    // }
    // if (!username.match("^[a-zA-Z0-9]+$"))
    //     throw "username can only be alphanumeric characters";
    // if (username.length < 4) throw "username should be at least 4 characters";
    

    // if (password.trim().length === 0)
    //     throw "password with only spaces is not allowed";
    // for (let i = 0 ; i < password.length; i++) {
    //     if (password[i] === " ") throw "password cannot contain space"
    // }
    // if (password.length < 6) throw "password should be at least 6 characters long";
    users.checkUsername(userName);
    users.checkName(firstName);
    users.checkName(lastName);
    users.checkEmail(email);
    users.checkPhone(phone);
    users.checkCity(city);
    users.checkState(state);
    users.checkCountry(country);
    users.checkZipCode(zipCode);
    users.checkClient(clientId);
    users.checkClient(clientSecret);
    user = await users.createUser(firstName, lastName, email, userName, phone,  password, city, state, country, zipCode, clientId, clientSecret);
  } catch (e) {
    return res.status(400).render("../views/pages/page-user-signup", { error:e });
  }

  if (!user.userInserted) {
    res.status(500).render({ error:"Internal Server Error" });
    return;
  } else {
    res.redirect("/");
  }
});

router.post("/page-user-login", async (req, res) => {
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
        res.status(400).render("../views/pages/page-user-login", { error:"username or password not valid" });  
        return;
  }

  try {
    if (user.authenticated == true) {
      req.session.user = username;
      console.log(`[${new Date().toUTCString()}]: ${req.method} ${req.originalUrl} Authenticated User`)
      res.redirect("/index");
    } else {
        console.log(console.log(`[${new Date().toUTCString()}]: ${req.method} ${req.originalUrl} Non-Authenticated User`))
        res.status(400).render("../views/pages/index", { error:"username or password not valid" });
        return;
    }
  } catch (e) {
        res.status(400).render("../views/pages/index", { error:"username or password not valid" });  
        return;
  }
});

router.get("/private", async (req, res) => {
  let user = await req.session.user;

  if (user) {
    console.log(console.log(`[${new Date().toUTCString()}]: ${req.method} ${req.originalUrl} Authenticated User`))
    res.render("../views/pages/index", { username: user });
  } else {
    console.log(console.log(`[${new Date().toUTCString()}]: ${req.method} ${req.originalUrl} Non-Authenticated User`))
    res.status(400).render("../views/pages/page-user-login", { error: "username or password not valid" });
  }
});

router.get("/logout", async (req, res) => {
  if (await req.session.user) {
    req.session.destroy();
    res.render("/", {message: "You have logged out!"});
  }
});

module.exports = router;
