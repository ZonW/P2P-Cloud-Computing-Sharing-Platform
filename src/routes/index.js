
const loggedRoutes = require('./logged');

const constructorMethod = (app) => {
  app.use('/', loggedRoutes);
  app.use('*', (req, res) => {
    res.sendStatus(404);
  });
};

module.exports = constructorMethod;