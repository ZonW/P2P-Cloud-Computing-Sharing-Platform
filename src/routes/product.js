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

router.post("/add_comment", async (req, res) => {
    let user = req.session.user;
    if (user) {
        try {
            const userInfo = await getUserByEmail(user);
            const addComment = await productsData.addComment(userInfo._id.toString(),req.body.productId, req.body.comment_info);
            if (!addComment.commentAdded){
                return res.status(500).json({error: 'Internal Server Error'});
            }

            res.redirect('/');
            return;
        }
        catch (e) {
            return res.status(400).json({error: e});
        }
    } else {
        return res.status(400).json({error: 'Non-Authenticated User'});
    }
});
module.exports = router;