const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
    res.status(401).render("../views/pages/index", {});
})



module.exports = router;