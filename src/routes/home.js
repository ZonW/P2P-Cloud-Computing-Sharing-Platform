const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
    res.status(401).render("../views/pages/index", {});
})

router.get("/page-term-conditions", async (req, res) => {
    res.status(401).render("../views/pages/page-term-conditions", {});
})

module.exports = router;