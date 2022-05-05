const homeRoutes = require('./home');
const loginRoutes = require('./login');
const profileRoutes = require('./profile');
const productRoutes = require('./product');

const constructorMethod = (app) => {
  app.use('/', homeRoutes);
  app.use('/user', loginRoutes);
  app.use('/profile', profileRoutes);
  app.use('/product', productRoutes);


  app.use('*', (req, res) => {
    res.sendStatus(404);
  });
};

module.exports = constructorMethod;
