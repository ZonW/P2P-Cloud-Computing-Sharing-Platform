
const express = require("express");
const router = express.Router();
const productsData = require("../data/products");
const usersData = require("../data/users.js");
const axios = require('axios')
const url = require('url');
const { getUserByEmail } = require("../data/users");

router.get("/page-order-history", async (req, res) => {
    let user = await req.session.user;
    if (user) {
        try {
            const userInfo = await getUserByEmail(user)
            res.render("../views/pages/page-order-history", userInfo);
        }
        catch (e) {
            return res.status(404).json({error: e});
        }
    }
    else{
        res.redirect("/user/page-user-login");
    }
});

//All set
router.get("/page-sell-history", async (req, res) => {
    let user = await req.session.user;
    if (user) {
        const userInfo = await getUserByEmail(user)
        const active_code = req.query.code;
        if (active_code) {
            const active_code = req.query.code;
            console.log(active_code)      
            const tokenRequestOptions = {
                method: 'post',
                url: 'https://webapi.teamviewer.com/api/v1/oauth2/token',
                data: {
                    "grant_type": "authorization_code",
                    "code": active_code,
                    "redirect_uri": "http://localhost:3000/profile/page-sell-history",
                    "client_id": "528911-XLEsSfsRD5hdKZ5ATT02",
                    "client_secret": "OmXUj5czPeJJi7COXnng"
                },
                headers: {
                    "Accept": '*/*',
                    "User-Agent": "Thunder Client (https://www.thunderclient.com)"
                }
            };
        
            axios(tokenRequestOptions)
            .then(function (response) {
                const token = response.data.access_token;
                console.log(token)
                const sessionRequestOptions = {
                    method: 'post',
                    url: 'https://webapi.teamviewer.com/api/v1/sessions',
                    data: {
                            //"valid_until" : end_time,
                            "groupname" : "website"
                    },
                    headers: { Authorization: `Bearer ${token}` }
                }

                axios(sessionRequestOptions)
                .then(function (response) {
                    console.log(response.data);
                    const responseSession = response.data;
                    try{
                        //res.redirect(url.parse(req.url).pathname);
                        res.render("../views/pages/page-sell-history", responseSession);
                    } catch (e) {
                        return res.status(400).json({error: e});
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
            })
            .catch(function (error) {
                console.log(error);
            });
        }
        else {
            try {
                res.render("../views/pages/page-sell-history", {});
            }
            catch (e) {
                return res.status(404).json({error: e});
            }
        }
    }
    else{
        res.redirect("/user/page-user-login");
    }
});

router.post("/page-###", async (req, res) => {
    let user = await req.session.user;
    if (user) {
        const userInfo = await usersData.getUserByEmail(user);
        const newItem = {
            name: 'Good Computer 11',
            description: 'This is a very good computer.',
            operatingSystem: 'macos',
            features: ["scientificCalculation", "deepLearning"],
            time: 1651572490,
            unitPrice: 10,
            location: {"country": "United States",
             "region": "NJ",
             "city": "Jersey City",
             "lat": 40.7467, 
             "lon": -74.0574 
           }
        }
        try{
            await productsData.createProduct(userInfo._id.toString(), newItem.name, newItem.description, newItem.operatingSystem, 
            newItem.features, newItem.time, newItem.unitPrice, newItem.location);
            //res.render("../views/pages/page-sell-history", {});

        } catch (err) {
            return res.status(404).json({error: e});
        }
    }
    else{
        res.redirect("/user/page-user-login");
    }
})

router.get("/page-new-item", (req, res) => {
    try {
      res.render("../views/pages/page-new-item", {});
    }
    catch (e) {
        return res.status(404).json({error: e});
    }
});

module.exports = router;