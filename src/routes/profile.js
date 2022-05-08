
const express = require("express");
const router = express.Router();
const products = require("../data/products");
const axios = require('axios')
const url = require('url');
const { getUserByEmail } = require("../data/users");
const { modifySession } = require("../data/products");

router.get("/page-order-history", async (req, res) => {
    let user = await req.session.user;
    if (user) {
        try {
            const userInfo = await getUserByEmail(user);
            let responseData = {
                "userId" : userInfo._id.toString(),
                "userName" : userInfo.name,
                "userEmail" : user,
                "purchaseHistory" : []
            };
    
            const sessionInfo = userInfo.orderSessionHistory;
            for (let i;i=0;i++){
                let sessionId = sessionInfo[i];
                let prodInfo = await products.getProductBySession(sessionId);
                let prodName = prodInfo.name;
                let prodSession = prodInfo.sessions;
                let prodId = prodInfo._id.toString();
                let tempData = {
                    "productId" : prodId,
                    "productName" : prodName,
                    "sessions" : prodSession
                }
                responseData.purchaseHistory.push(tempData);
            }
            res.render("../views/pages/page-order-history", responseData);
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
        const userInfo = await getUserByEmail(user);
        let sellData = userInfo.sellingServers;
        let responseData = {
            "userId" : userInfo._id.toString(),
            "userName" : userInfo.name,
            "userEmail" : user,
            "sellHistory" : []
        };

        for (let i;i=0;i++){
            let prodId = sellData[i];
            let prodInfo = await products.getProductById(prodId);
            responseData.sellHistory.push(prodInfo);
        }

        try {
            res.render("../views/pages/page-sell-history", responseData);
        }
        catch (e) {
            return res.status(404).json({error: e});
        }
    }
    else{
        res.redirect("/user/page-user-login");
    }
});

router.post("/page-sell-history", async (req, res) => {
    const postData = req.body;
    const active_code = postData.code;
    const sessionId = postData.session;
    if (active_code){
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
            if(!response.data.access_token){
                throw "No token get"
            }
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
                    modifySession(sessionId,responseSession.supporter_link, responseSession.end_customer_link, true)
                    res.send(responseSession);
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