const express = require("express");
const router = express.Router();
const products = require("../data/products");


router.get("/page-item-list", (req, res) => {
    try {
      res.render("../views/pages/page-item-list", {});
    }
    catch (e) {
        return res.status(404).json({error: e});
    }
  });


router.get("/page-item-list/:id", (req, res) => {
try {
    res.render("../views/pages/page-item-detail", {});
}
catch (e) {
    return res.status(404).json({error: e});
}
});

module.exports = router;