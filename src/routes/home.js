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

router.post('/search', async (req, res) => {
    try{
        const userInfo = req.body;
        console.log(1)
        console.log(userInfo);
        const mes = await products.filterProduct(userInfo);
        console.log(mes)
        var resMess = {};
        for (var i = 0; i<Object.keys(mes).length; i++){
            if (!mes[i].overall_score) {rating = ""}
            else {rating = mes[i].overall_score}
            var tmp = {
                _id: mes[i]._id.toString(),
                name: mes[i].name,
                description: mes[i].description,
                price: mes[i].unitPrice,
                rating: rating
            };
            resMess[i+1] = tmp;
        }
        console.log(resMess);
        res.json({ success: true, message: resMess });
    } catch (e) {
        return res.status(400).json({error: e});
    }
})

router.get('/first', async (req, res) => {
    try{
        const productList = await products.getAllProduct();
        if (productList.length<5){
            res.json({ success: true, message: productList });
        } else {
            var resList = [];
            for (var i = 0; i<5; i++){
                resList.push(productList[i]);
            }
            res.json({ success: true, message: resList });
        }
    } catch (e) {
        return res.status(400).json({error: e});
    }

})

router.get("/all", async (req, res) => {
    try{
        const querys = req.query;
        let reqDistance = querys.distance;
        let reqFeatures = querys.features;
        let reqKeyword = querys.keywords;
        let reqLat = querys.lat;
        let reqLon = querys.lon;
        let reqOS = querys.operatingSystem;
        let reqPrice = querys.price;
        let reqSort = querys.sortBy;
        console.log(reqKeyword)
        console.log(typeof reqKeyword)
        filter_info = {
            distance: querys.distance,
            features: [querys.features],
            keywords: querys.keywords,
            lat:Number(querys.lat),
            lon:Number(querys.lon),
            operatingSystem:querys.operatingSystem,
            price: Number(querys.price),
            sortBy: querys.sortBy
          }

        let prodData = await products.filterProduct(filter_info);
        let indexlist = [];
        let resData = [];

        if (reqSort === "lowestPrice"){
            if (prodData.length <= 1){
                resData =prodData;
            } else {
                for (var i = 0; i<prodData.length; i++){
                    if (indexlist.length === 0){
                        indexlist.push(prodData[i].unitPrice);
                        resData.push(prodData[i]);
                    } else if (indexlist.length === 1){
                        if (prodData[i].unitPrice>indexlist[0]){
                            indexlist.push(prodData[i].unitPrice);
                            resData.push(prodData[i]);
                        } else {
                            resData.splice(0,0,prodData[i]);
                            indexlist.splice(0,0,prodData[i].unitPrice);
                        }
                    } else {
                        for (var j = 0; j<indexlist.length - 1; j++){                     
                            if (prodData[i].unitPrice<=indexlist[j]){
                                resData.splice(0,0,prodData[i]);
                                indexlist.splice(0,0,prodData[i].unitPrice);
                                break;
                              } else if (prodData[i].unitPrice>indexlist[j] && prodData[i].unitPrice<=indexlist[j+1]){
                                resData.splice(j+1,0,prodData[i]);
                                indexlist.splice(j+1,0,prodData[i].unitPrice);
                                break;
                              } else if (j===indexlist.length - 2){
                                resData.push(prodData[i]);
                                indexlist.push(prodData[i].unitPrice);
                                break;
                              }
                        }
                    }
                }
            }
        }
        if (reqSort === "shortestDistance"){
            if (prodData.length <= 1){
                resData =prodData;
            } else {
                for (var i = 0; i<prodData.length; i++){
                    var dis = products.getDistance(reqLat, reqLon, prodData[i].location.lat, prodData[i].location.long)
                    if (indexlist.length === 0){
                        indexlist.push(dis);
                        resData.push(prodData[i]);
                    } else if (indexlist.length === 1){
                        if (dis>indexlist[0]){
                            indexlist.push(dis);
                            resData.push(prodData[i]);
                        } else {
                            resData.splice(0,0,prodData[i]);
                            indexlist.splice(0,0,dis);
                        }
                    } else {
                        for (var j = 0; j<indexlist.length - 1; j++){                     
                            if (dis<=indexlist[j]){
                                resData.splice(0,0,prodData[i]);
                                indexlist.splice(0,0,dis);
                                break;
                              } else if (dis>indexlist[j] && dis<=indexlist[j+1]){
                                resData.splice(j+1,0,prodData[i]);
                                indexlist.splice(j+1,0,dis);
                                break;
                              } else if (j===indexlist.length - 2){
                                resData.push(prodData[i]);
                                indexlist.push(dis);
                                break;
                              }
                        }
                    }
                }
            }
        }
        if (reqSort === "highestRated"){
            if (prodData.length <= 1){
                resData =prodData;
            } else {
                for (var i = 0; i<prodData.length; i++){
                    if (indexlist.length === 0){
                        indexlist.push(prodData[i].overall_score);
                        resData.push(prodData[i]);
                    } else if (indexlist.length === 1){
                        if (prodData[i].overall_score<indexlist[0]){
                            indexlist.push(prodData[i].overall_score);
                            resData.push(prodData[i]);
                        } else {
                            resData.splice(0,0,prodData[i]);
                            indexlist.splice(0,0,prodData[i].overall_score);
                        }
                    } else {
                        for (var j = 0; j<indexlist.length - 1; j++){                     
                            if (prodData[i].overall_score>=indexlist[j]){
                                resData.splice(0,0,prodData[i]);
                                indexlist.splice(0,0,prodData[i].overall_score);
                                break;
                              } else if (prodData[i].overall_score<indexlist[j] && prodData[i].overall_score>=indexlist[j+1]){
                                resData.splice(j+1,0,prodData[i]);
                                indexlist.splice(j+1,0,prodData[i].overall_score);
                                break;
                              } else if (j===indexlist.length - 2){
                                resData.push(prodData[i]);
                                indexlist.push(prodData[i].overall_score);
                                break;
                              }
                        }
                    }
                }
            }

        }
        if (reqSort === "newestListed"){
            resData = prodData;
        }
        res.send(resData);
    } catch (e) {
        return res.status(400).json({error: e});
    }
})

router.get("/:id", async (req, res) => {
    let user = req.session.user;
    if (user){
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
            res.render('pages/page-item-detail',{});
        }
        catch (e) {
            return res.status(404).json({error: e});
        }
    } else {
        res.render('pages/page-user-login',{});
    }

});

router.post("/:id", async (req, res) => {
    try {
        const itemInfo = await products.getProductById(req.params.id);
        res.send(itemInfo);
    }
    catch (e) {
        return res.status(404).json({error: e});
    }
});


router.get("/page-term-conditions/1", async (req, res) => {
    res.render("../views/pages/page-term-conditions", {});
})

module.exports = router;