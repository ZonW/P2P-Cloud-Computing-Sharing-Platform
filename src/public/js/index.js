(function ($) {

    let searchInfo = {
        keyword:"",
        operatingSystem:"windows",
        features:[],
        price:[0,10000],
        distance:[0,10000],
        sortBy:"lowest_price"
    };

    let searchButton = $("#search_button");

    let applyButton = $("#apply_botton");
    let operatingSystem = $("#operating_system_div");
    let features = $("#features_div");
    let price = $("#price_div");
    let distance = $("#distance_div");
    let sortBy = $("#sort_by_div");

    price.on('change',function(event){

        let priceMin = Number($("#price_min").val());
        let priceMax = Number($("#price_max").val());
        let priceAlert = $("#price_alert");

        if((priceMin < 0) || (priceMax > 10000)||( priceMin > priceMax )||(priceMax <= 0)){
            priceAlert.html("<p id='alert'>Invalid input</p>");
            priceAlert.removeAttr("hidden");
            $("#alert").css("color","red");
        }else{
            priceAlert.html("");
            priceAlert.attr("hidden","hidden");
            searchInfo.price[0] = priceMin;
            searchInfo.price[1] = priceMax;

        }
    });

    distance.on('change',function(event){

        let distanceMin = Number($("#distance_min").val());
        let distanceMax = Number($("#distance_max").val());
        let distanceAlert = $("#distance_alert");

        if((distanceMin < 0) || (distanceMax > 10000)||( distanceMin > distanceMax )||(distanceMax <= 0)){
            distanceAlert.html("<p id='alert'>Invalid input</p>");
            distanceAlert.removeAttr("hidden");
            $("#alert").css("color","red");
        }else{
            distanceAlert.html("");
            distanceAlert.attr("hidden","hidden");
            searchInfo.distance[0] = distanceMin;
            searchInfo.distance[1] = distanceMax;

        }
    });


    sortBy.on('change',function(event){

        let lowestPrice = $("#lowest_price");
        let shortestDistance = $("#shortest_distance");
        let highestRated = $("#highest_rated");
        let newestListed = $("#newest_listed");

        if(lowestPrice.prop("selected")){
            searchInfo.sortBy="lowestPrice";
        }else if(shortestDistance.prop("selected")){
            searchInfo.sortBy="shortestDistance";
        }else if(highestRated.prop("selected")){
            searchInfo.sortBy="highestRated";
        }else if(newestListed.prop("selected")){
            searchInfo.sortBy="newestListed";
        }

    });

    operatingSystem.on('change',function(event){

        let windows = $("#windows");
        let macos = $("#macos");
        let linux = $("#linux");
        let unix = $("#unix");
        let other = $("#other");

        if(windows.prop("checked")){
            searchInfo.operatingSystem="windows";
        }else if(macos.prop("checked")){
            searchInfo.operatingSystem="macos";
        }else if(linux.prop("checked")){
            searchInfo.operatingSystem="linux";
        }else if(unix.prop("checked")){
            searchInfo.operatingSystem="unix";
        }else if(other.prop("checked")){
            searchInfo.operatingSystem="other";
        }
    });

    features.on('change',function(event){
        let webServer = $("#web_server");
        let deepLearning = $("#deep_learning");
        let videoAnd3d = $("#video_and_3d");
        let gaming = $("#gaming");
        let modelingAndSimulation = $("#modeling_and_simulation");
        let scientificCalculation = $("#scientific_calculation");

        if(webServer.prop("checked")){
            if(searchInfo.features.indexOf("webServer") === -1){
                searchInfo.features.push("webServer");
            }
        }else{
            if(searchInfo.features.indexOf("webServer") !== -1){
                for(let i in searchInfo.features){
                    if(searchInfo.features[i]==="webServer"){
                        searchInfo.features.splice(i,1);
                    }
                }
            }
        }

        if(deepLearning.prop("checked")){
            if(searchInfo.features.indexOf("deepLearning") === -1){
                searchInfo.features.push("deepLearning");
            }
        }else{
            if(searchInfo.features.indexOf("deepLearning") !== -1){
                for(let i in searchInfo.features){
                    if(searchInfo.features[i]==="deepLearning"){
                        searchInfo.features.splice(i,1);
                    }
                }
            }
        }

        if(videoAnd3d.prop("checked")){
            if(searchInfo.features.indexOf("videoAnd3d") === -1){
                searchInfo.features.push("videoAnd3d");
            }
        }else{
            if(searchInfo.features.indexOf("videoAnd3d") !== -1){
                for(let i in searchInfo.features){
                    if(searchInfo.features[i]==="videoAnd3d"){
                        searchInfo.features.splice(i,1);
                    }
                }
            }
        }

        if(gaming.prop("checked")){
            if(searchInfo.features.indexOf("gaming") === -1){
                searchInfo.features.push("gaming");
            }
        }else{
            if(searchInfo.features.indexOf("gaming") !== -1){
                for(let i in searchInfo.features){
                    if(searchInfo.features[i]==="gaming"){
                        searchInfo.features.splice(i,1);
                    }
                }
            }
        }

        if(modelingAndSimulation.prop("checked")){
            if(searchInfo.features.indexOf("modelingAndSimulation") === -1){
                searchInfo.features.push("modelingAndSimulation");
            }
        }else{
            if(searchInfo.features.indexOf("modelingAndSimulation") !== -1){
                for(let i in searchInfo.features){
                    if(searchInfo.features[i]==="modelingAndSimulation"){
                        searchInfo.features.splice(i,1);
                    }
                }
            }
        }

        if(scientificCalculation.prop("checked")){
            if(searchInfo.features.indexOf("scientificCalculation") === -1){
                searchInfo.features.push("scientificCalculation");
            }
        }else{
            if(searchInfo.features.indexOf("scientificCalculation") !== -1){
                for(let i in searchInfo.features){
                    if(searchInfo.features[i]==="scientificCalculation"){
                        searchInfo.features.splice(i,1);
                    }
                }
            }
        }

    });

    searchButton.on('click',function (event){

        let inputKeyword = $("#search_content");
        inputKeyword = inputKeyword.val().trim();
        let searchAlert = $("#search_alert");

       if(inputKeyword==="") {
           searchAlert.html("<p id='alert'>&nbsp&nbsp&nbsp&nbspInvalid input</p>");
           searchAlert.removeAttr("hidden");
           $("#alert").css("color","red");
       }
       else{
           searchAlert.html("");
           searchAlert.attr("hidden","hidden");
       }

       searchInfo.keyword=inputKeyword;
       console.log(searchInfo);
    });

    applyButton.on('click',function(event){

        let priceMin = Number($("#price_min").val());
        let priceMax = Number($("#price_max").val());
        let distanceMin = Number($("#distance_min").val());
        let distanceMax = Number($("#distance_max").val());


        if(priceMin < 0 || priceMax > 10000||priceMin > priceMax ||priceMax <= 0||
            distanceMin < 0 || distanceMax > 10000|| distanceMin > distanceMax ||distanceMax <= 0){

            alert("Invalid input");


        }else{
            console.log(searchInfo);
        }

    });
})(window.jQuery);