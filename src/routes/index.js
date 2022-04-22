const constructorMethod = (app) => {
  app.get("/", (req, res) => {
    res.render('layouts/main', {});
  });

  app.use("*", (req, res) => {
    res.json({"error": " Page Not Found "});
  });
};

module.exports = constructorMethod;
