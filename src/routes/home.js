const express = require("express");
const router = express.Router();
const products = require("../data/products");
const users = require("../data/users");

router.get("/", async (req, res) => {
    try{
        let prodData = await products.getAllProduct()
        res.render("../views/pages/index", {});
    } catch(e) {
        return res.status(400).json({error: e});
    }
})

router.get("/all", async (req, res) => {
    try{
        const param = req.params;
        let reqDistance = param.distance;
        let reqFeatures = param.features;
        let reqKeyword = param.keyword;
        let reqLat = param.lat;
        let reqLon = param.lon;
        let reqOS = param.operatingSystem;
        let reqPrice = param.price;
        let reqSort = param.sortBy;

        let prodData = await products.getAllProduct()
        if (reqSort === "lowestPrice"){

        }
        if (reqSort === "shortestDistance"){

        }
        if (reqSort === "highestRated"){

        }
        if (reqSort === "newestListed"){

        }
        res.send(prodData)
    } catch (e) {
        return res.status(400).json({error: e});
    }
})

router.get("/:id", async (req, res) => {
    try {
        const prodData = await products.getProductById(req.params.id);
        let comments = prodData.comments;
        if (comments.length > 5){
            comments = comments.reverse().slice(4)
        }
        let response = {
            "name" : prodData.name,
            "time" :prodData.time,
            "os" : prodData.operatingSystem,
            "features" : prodData.features, //["xxx","xxx"]
            "description" : prodData.description,
            "location" : {
                "country" : prodData.country,
                "region" : prodData.region,
                "city" : prodData.city,
                "zip" : prodData.zip
            },
            "rating" : prodData.rating,
            "price" : prodData.price,
            "session" : prodData.sessions,  //[[start,end],[start,end]]
            "comments" : comments //["xxx","xxx"]
        }
        res.send(response)
    } 
    catch (e) {
        return res.status(404).json({error: e});
    }
});


router.get("/page-term-conditions/1", async (req, res) => {
    res.render("../views/pages/page-term-conditions", {});
})

module.exports = router;