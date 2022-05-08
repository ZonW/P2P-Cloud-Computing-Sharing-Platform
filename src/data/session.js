let redirect_uri = "https://github.com/ZonW/P2P-Cloud-Computing-Sharing-Platform";
let testUrl = "login.teamviewer.com/oauth2/authorize?response_type=code&client_id=528911-XLEsSfsRD5hdKZ5ATT02&redirect_uri=https://github.com/ZonW/P2P-Cloud-Computing-Sharing-Platform&display=popup"
let client_id = "528911-XLEsSfsRD5hdKZ5ATT02";
let client_secret = "OmXUj5czPeJJi7COXnng";
let tempCode = "DvOVEpPq"
let accessToken = "16217394-cOqwKkp8MllCvSYnprfj"
let tokenExpireTime = 86400
let refreshToken = "15802318-32ZqRIjXj8Mks4b8q40e"

let authCodeBody = {
    "response_type": "code",
    "client_id": client_id,
    "redirect_uri" : redirect_uri,
    "display": "popup"
};
let authTokenBody = {
    "grant_type": "authorization_code",
    "code": tempCode,
    "redirect_uri": "https://github.com/ZonW/P2P-Cloud-Computing-Sharing-Platform",
    "client_id": client_id,
    "client_secret": client_secret
};

const authPage = $.ajax({ 
    type : "GET", 
    dataType: "html",
    url : "login.teamviewer.com/oauth2/authorize", 
    data: JSON.stringify(authCodeBody),
    success: function(res) {
        console.log(res);
    }
}); 

const tokenFile = $.ajax({ 
    type : "POST", 
    dataType: "JSON",
    url : "https://webapi.teamviewer.com/api/v1/oauth2/token", 
    headers: {"Host": "webapi.teamviewer.com", 
            "ContentType": "application/x www form urlencoded"},
    data: JSON.stringify(authTokenBody),
    success: function(res) {
        console.log(res);
    }
}); 