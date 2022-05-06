const express = require("express");
const router = express.Router();
const products = require("../data/products");

router.get("/page-order-history", (req, res) => {
    try {
      res.render("../views/pages/page-order-history", {});
    }
    catch (e) {
        return res.status(404).json({error: e});
    }
});

router.get("/page-sell-history", (req, res) => {
    try {
        const active_code = req.query.code;
        console.log(active_code)
    }
    finally {
        try {
            res.render("../views/pages/page-sell-history", {});
          }
          catch (e) {
              return res.status(404).json({error: e});
          }
    }
});

router.get("/page-new-item", (req, res) => {
    try {
      res.render("../views/pages/page-new-item", {});
    }
    catch (e) {
        return res.status(404).json({error: e});
    }
});



module.exports = router;