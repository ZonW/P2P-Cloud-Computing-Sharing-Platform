const express = require('express');
const app = express();
const static = express.static(__dirname + '/public');
const session = require('express-session');
const exphbs = require('express-handlebars');

const configRoutes = require('./routes');

app.use('/public', static);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');


app.use(
  session({
    name: 'AuthCookie',
    secret: "some secret string!",
    saveUninitialized: true,
    resave: false,
  })
);

app.use('/private', (req, res, next) => {
  console.log(req.session.id);
  if (!req.session.user) {
    return res.redirect('/');
  } else {
    next();
  }
});

app.use('/login', (req, res, next) => {
  if (req.session.user) {
    return res.redirect('/private');
  } else {
    next();
  }
});

/*
const logging = function (req, res, next) {
   console.log(`[${new Date().toUTCString()}]: ${req.method} ${req.originalUrl} ${req.session.user ? '(Authenticated User)' : '(Non-Authenticated User)'}`);
   next()
 };
 
app.use(logging);
*/

configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});