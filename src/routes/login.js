const express = require("express");
const router = express.Router();
const users = require("../data/users");

//GET 
router.get("/page-user-login", (req, res) => {
  if (req.session.user) {
    console.log(`[${new Date().toUTCString()}]: ${req.method} ${req.originalUrl} Authenticated User`)
    res.redirect("../views/pages/index");
  } else {
    console.log(console.log(`[${new Date().toUTCString()}]: ${req.method} ${req.originalUrl} Non-Authenticated User`))
    res.status(401).render("../views/pages/page-user-login", {});
    return;
  }
});

//GET signup
router.get("/page-user-signup", (req, res) => {
  if (req.session.user) {
    res.redirect("../views/pages/index");
  } else {
    res.status(401).render("../views/pages/page-user-signup", {});
    return;
  }
});

//POST signup    会不会是form里没有定义action="/signup" ?
//               答案是没错！
router.post("/page-user-signup", async (req, res) => {
  let userName = req.body.userName;
  let password = req.body.password;
  let firstName = req.body.name.firstName;
  let lastName = req.body.name.lastName;
  let email = req.body.contacts.email;
  let phone = req.body.contacts.phone;
  let city = req.body.address.city;
  let state = req.body.address.state;
  let country = req.body.address.country;
  let zipCode = req.body.address.zipCode;
  let clientId = req.body.sellerInfo.clientId;
  let clientSecret = req.body.sellerInfo.clientSecret;
  let user;
  try {
    // if (typeof userName !== 'string') throw "username must be string";
    // userName = userName.trim();
    // if (!/^[\d\w]+$/.test(userName)) throw "username is not a valid string";
    // if (userName.length < 4) throw "username is not a valid string";
    // if (typeof password !== 'string') throw "password must be string";
    // if (password.indexOf(' ') !== -1) throw "password is not a valid string";
    // if (password.length < 6) throw "password is not a valid string";

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

//POST login
router.post("/page-user-login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  let user;
  try {
    // users.checkEmail(email);
    // users.checkPassword(password);
    if (!email || !password) throw "Missing email or password";
    if (typeof email !== "string") throw "email should be string";
    if (email.trim().length === 0)
        throw "email cannot be empty spaces";
    for (let i = 0 ; i < email.length; i++) {
        if (email[i] === " ") throw "email cannot contain space"
    }
    if (!email.match("^[a-zA-Z0-9]+$"))
        throw "email can only be alphanumeric characters";
    if (email.length < 4) throw "email should be at least 4 characters";
    

    if (password.trim().length === 0)
        throw "password with only spaces is not allowed";
    for (let i = 0 ; i < password.length; i++) {
        if (password[i] === " ") throw "password cannot contain space"
    }
    if (password.length < 6) throw "password should be at least 6 characters long";
    
    user = await users.checkUserLogin(email, password);
  } catch (e) {
    error = e;
    res.status(400).render("../views/pages/page-user-login", { error});  
    return;
  }

  try {
    if (user.authenticated == true) {
      req.session.user = email;
      console.log(`[${new Date().toUTCString()}]: ${req.method} ${req.originalUrl} Authenticated User`)
      res.redirect("/../views/pages/index");
    } else {
        console.log(console.log(`[${new Date().toUTCString()}]: ${req.method} ${req.originalUrl} Non-Authenticated User`))
        res.status(400).render("../views/pages/page-user-login", { error:"username or password is not valid" });
        return;
    }
  } catch (e) {
        res.status(400).render("../views/pages/page-user-login", { error:"username or password is not valid" });  
        return;
  }
});

//private
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

// GET logout
router.get("/logout", async (req, res) => {
  if (await req.session.user) {
    req.session.destroy();
    res.render("../views/pages/index", {message: "You have logged out!"});
  }
});

module.exports = router;
