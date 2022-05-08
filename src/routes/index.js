const homeRoutes = require('./home');
const loginRoutes = require('./login');
const profileRoutes = require('./profile');

const constructorMethod = (app) => {
  app.use('/', homeRoutes);
  app.use('/user', loginRoutes);
  app.use('/profile', profileRoutes);

  app.use('*', (req, res) => {
    res.sendStatus(404);
  });
};

module.exports = constructorMethod;
