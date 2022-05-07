
const express = require("express");
const router = express.Router();
const products = require("../data/products");
const axios = require('axios')
const url = require('url');

router.get("/page-order-history", (req, res) => {
    try {
      res.render("../views/pages/page-order-history", {});
    }
    catch (e) {
        return res.status(404).json({error: e});
    }
});

//All set
router.get("/page-sell-history", (req, res) => {
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