const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
    let title = "Search an item!"
    res.render("pages/home", { title } )
})


module.exports = router;