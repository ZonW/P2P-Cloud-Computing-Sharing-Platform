(async function ($) {

    let recent = [];

    let searchInfo = {
        keywords:"",
        operatingSystem:"windows",
        features:[],
        price:[0,10000],
        distance:[0,10000],
        sortBy:"lowestPrice",
        lat:40.7182,
        lon:-74.0476
    };


    let requestConfig = {
        method : "POST",
        contentType: 'application/json',
        data : JSON.stringify(searchInfo),
        url:"/search"
    };

    let requestConfig1 = {
        method: "GET",
        url: "http://ip-api.com/json/"
    };

    let requestConfig2 = {
        method: "GET",
        url:"/first"
    };

    $.ajax(requestConfig1).then(function (responseMessage) {
        searchInfo.lat = responseMessage.lat;
        searchInfo.lon = responseMessage.lon;

    });



    $.ajax(requestConfig2).then(function (responseMessage) {

        for(let j in responseMessage.message){
            recent.push(responseMessage.message[j]);
        }
        if(recent.length === 0){
            mainDiv.append("<h3>No recent products found!</h3>");
        } else {
            for(let i of recent) {
                    console.log(i._id)

                    if (i.description.length>300){
                        i.description = i.description.slice(0,297) + "...";
                    }
                
                    mainDiv.append("<article class='card card-product-list'>" +
                        "        <div class='row g-0'>" +
                        "            <div class='col-xl-6 col-md-5 col-sm-7'>" +
                        "                <div class='card-body'>" +
                        "                    <a href='/"+i._id+"' class='title h5'>"+i.name+"</a>" +
                        "                    <p> "+i.description+"</p>" +
                        "                </div>" +
                        "            </div>" +
                        "            <aside class='col-xl-3 col-md-3 col-sm-5'>" +
                        "                <div class='info-aside'>" +
                        "                    <div class='price-wrap'>" +
                        "                        <span class='price h5'> $"+i.unitPrice+"</span>" +
                        "                    </div>" +
                        "                    <br>" +
                        "                        <div class='mb-3'>" +
                        "                            <a href='/"+i._id+"' class='btn btn-primary'> Buy this </a>" +
                        "                        </div>" +
                        "                </div>" +
                        "            </aside>" +
                        "        </div>" +
                        "    </article>");
                }
        
            }

    });

    if(recent.length > 5) recent = recent.slice(0,5);


    let ajaxTestLength = 0;

    let ajaxTestConvert = [];

    // for(let i in ajaxTest){
    //     ajaxTestLength += 1;
    //     ajaxTestConvert.push(ajaxTest[i]);
    // }



    // console.log(test_listing);

    // if(test_listing.length > 5) test_listing = test_listing.slice(0,5);




    let searchButton = $("#search_button");
    let applyButton = $("#apply_botton");
    let operatingSystem = $("#operating_system_div");
    let features = $("#features_div");
    let price = $("#price_div");
    let distance = $("#distance_div");
    let sortBy = $("#sort_by_div");
    let recentResult = $("#recent_result");
    let searchResult = $("#search_result");
    let mainDiv = $("#main_div");
    let resultNav = $("#result_nav");
    let prePage = $("#pre_page");
    let nextPage = $("#next_page");
    let currentPage = $("#current_page");
    let firstPage = $("#first_page");
    let lastPage = $("#last_page");
    let resultDiv = $("#result_div");
    let showDiv = $("#show_div");

    let flag = 1;

    let higherShowDiv = $("#higher_show_div");


    prePage.on('click',function(event){
        if(currentPageNumber>1){
            currentPageNumber = currentPageNumber - 1;
        }
        showDiv.html(drawDiv());
    });

    nextPage.on('click',function(event){
        if(currentPageNumber<totalPageNumber){
            currentPageNumber = currentPageNumber + 1;
        }
        showDiv.html(drawDiv());
    });

    firstPage.on('click',function (event){
        currentPageNumber = 1;
        showDiv.html(drawDiv());
    });

    lastPage.on('click',function (event){
        currentPageNumber = totalPageNumber;
        showDiv.html(drawDiv());
    });


    let currentPageNumber = 1;
    let totalPageNumber = Math.ceil(ajaxTestConvert.length/5);


//to do

    console.log(recent);

    




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

        // console.log(searchInfo);
        //
        // currentPageNumber = 1;
        // showDiv.html(drawDiv());
        // $.ajax(requestConfig).then(function (responseMessage){
        //      for(let i in responseMessage.message){
        //
        //         ajaxTestConvert.push(responseMessage.message[i]);
        //     }
        //      currentPageNumber = 1;
        //      showDiv.html(drawDiv());
        //
        // });
        requestConfig.data = JSON.stringify(searchInfo);
        console.log(requestConfig.data);

        ajaxTestConvert = [];
        showDiv.html("");
        console.log(requestConfig)
        $.ajax(requestConfig).then(function (responseMessage){
            for(let i in responseMessage.message){
                ajaxTestConvert.push(responseMessage.message[i]);
                console.log(responseMessage.message[i]);
            }

            currentPageNumber = 1;

        });
        setTimeout(function(){
            if(ajaxTestConvert.length === 0){
                resultNav.attr("hidden","hidden");
                showDiv.append("<h3>No product found!</h3>");
                flag = 2;
            }
            else{
                currentPageNumber = 1;
                showDiv.append(drawDiv());
                flag = 2;
            }
        },1000);

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

    function drawDiv(){
        let tempPage = ajaxTestConvert.slice((currentPageNumber-1)*5,currentPageNumber*5);
        let tempContainer = "";

        for(let i of tempPage) {

            if(i.description.length>300){
                i.description = i.description.slice(0,297) + "...";
            }

            tempContainer = tempContainer+"<article class='card card-product-list'>" +
                "        <div class='row g-0'>" +
                "            <div class='col-xl-6 col-md-5 col-sm-7'>" +
                "                <div class='card-body'>" +
                "                    <a href='/"+i._id+"' class='title h5'>"+i.name+"</a>" +
                "                    <div class='rating-wrap mb-2'>" +
                "                        <ul class='rating-stars'>" +
                "                           <li class='stars-active' style='width: "+(i.rating/5)*100+"%;'>" +
                "                              <img src='./public/images/misc/stars-active.svg' alt=''>" +
                "                           </li>" +
                "                           <li> <img src='./public/images/misc/starts-disable.svg' alt=''> </li>" +
                "                        </ul>" +
                "                    </div>"+
                "                    <p> "+i.description+"</p>" +
                "                </div>" +
                "            </div>" +
                "            <aside class='col-xl-3 col-md-3 col-sm-5'>" +
                "                <div class='info-aside'>" +
                "                    <div class='price-wrap'>" +
                "                        <span class='price h5'> $"+i.price+"</span>" +
                "                    </div>" +
                "                    <br>" +
                "                        <div class='mb-3'>" +
                "                            <a href='/"+i._id+"' class='btn btn-primary'> Buy this </a>" +
                "                        </div>" +
                "                </div>" +
                "            </aside>" +
                "        </div>" +
                "    </article>";
        }

        resultNav.removeAttr("hidden");
        currentPage.html("Currently in page No." + currentPageNumber);
        lastPage.html(totalPageNumber);

        return tempContainer;
    }
    searchButton.on('click',function (event){


        let inputKeyword = $("#search_content");
        inputKeyword = inputKeyword.val().trim();
        console.log(inputKeyword);
        let searchAlert = $("#search_alert");
        if(flag != 1){
            location.reload();
        }


       if(inputKeyword === "") {
           searchAlert.html("<p id='alert'>&nbsp&nbsp&nbsp&nbspInvalid input</p>");
           searchAlert.removeAttr("hidden");
           $("#alert").css("color","red");
       }
       else{

           searchAlert.html("");
           searchAlert.attr("hidden","hidden");

           searchInfo.keywords = inputKeyword;
           requestConfig.data = JSON.stringify(searchInfo);


           recentResult.attr("hidden","hidden");
           searchResult.removeAttr("hidden");
           $.ajax(requestConfig).then(function (responseMessage){
               for(let i in responseMessage.message){
                   ajaxTestConvert.push(responseMessage.message[i]);
               }

               currentPageNumber = 1;

           });
           setTimeout(function(){
               if(ajaxTestConvert.length === 0){
                   resultNav.attr("hidden","hidden");
                   showDiv.append("<h3>No product found!</h3>");
                   flag = 2;
               }
               else{
                   currentPageNumber = 1;
                   showDiv.append(drawDiv());
                   flag = 2;
               }
           },1000);



       }


    });

    applyButton.on('click',function(event){

        let priceMin = Number($("#price_min").val());
        let priceMax = Number($("#price_max").val());
        let distanceMin = Number($("#distance_min").val());
        let distanceMax = Number($("#distance_max").val());

        console.log(searchInfo);

        if(priceMin < 0 || priceMax > 10000||priceMin > priceMax ||priceMax <= 0||
            distanceMin < 0 || distanceMax > 10000|| distanceMin > distanceMax ||distanceMax <= 0){

            alert("Invalid input");


        }else{
            requestConfig.data = JSON.stringify(searchInfo);

            ajaxTestConvert = [];
            showDiv.html("");
            console.log(requestConfig)
            $.ajax(requestConfig).then(function (responseMessage){
                for(let i in responseMessage.message){
                    ajaxTestConvert.push(responseMessage.message[i]);
                    console.log(responseMessage.message[i]);
                }

                currentPageNumber = 1;

            });
            setTimeout(function(){
                if(ajaxTestConvert.length === 0){
                    resultNav.attr("hidden","hidden");
                    showDiv.append("<h3>No product found!</h3>");
                    flag = 2;
                }
                else{
                    currentPageNumber = 1;
                    showDiv.append(drawDiv());
                    flag = 2;
                }
            },1000);
        }

    });
})(window.jQuery);