
const express = require("express");
const router = express.Router();
const productsData = require("../data/products");
const usersData = require("../data/users.js");
const axios = require('axios')
const url = require('url');
const ObjectId = require('mongodb').ObjectId;
const { getUserByEmail } = require("../data/users");

router.get("/page-order-history", async (req, res) => {
    let user = await req.session.user;
    if (user) {
        try {
            const userInfo = await getUserByEmail(user);
            res.render("../views/pages/page-order-history", userInfo);
        }
        catch (e) {
            return res.status(400).json({error: e});
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

router.post("/createProduct", async (req, res) => {
    let user = await req.session.user;
    if (user) {
        const userInfo = await usersData.getUserByEmail(user);
        //undefined parameters:
        const time = Date.parse(new Date());
        const lat = 1;
        const lon = 1;
        var sessions = [];
        //

        const location =  {
            country: req.body.country,
            region: req.body.region,
            city: req.body.city,
            lat: lat, 
            lon: lon 
        }

        if (req.body.session1[0]){
            sessions.push({
                _id: ObjectId(),
                startTime: Date.parse(req.body.session1[0]),
                endTime: Date.parse(req.body.session1[1]),
                buyerLink: '',
                sellerLink: '',
                active: true
              });
        }
        if (req.body.session2[0]){
            sessions.push({
                _id: ObjectId(),
                startTime: Date.parse(req.body.session2[0]),
                endTime: Date.parse(req.body.session2[1]),
                buyerLink: '',
                sellerLink: '',
                active: true
              });
        }
        if (req.body.session3[0]){
            sessions.push({
                _id: ObjectId(),
                startTime: Date.parse(req.body.session3[0]),
                endTime: Date.parse(req.body.session3[1]),
                buyerLink: '',
                sellerLink: '',
                active: true
              });
        }
        
        try{
            await productsData.createProduct(userInfo._id.toString(), req.body.new_name, req.body.description, req.body.operating_system, 
            req.body.features, time, Number(req.body.new_price), location, sessions);
            //res.render("../views/pages/page-sell-history", {});
            return res.json({1:"true"})

        } catch (err) {
            return res.status(404).json({error: err});
        }
    }
    else{
        res.redirect("/user/page-user-login");
    }
});

router.get("/page-new-item", (req, res) => {
    try {
      res.render("../views/pages/page-new-item", {});
    }
    catch (e) {
        return res.status(400).json({error: e});
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