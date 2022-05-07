(function ($){

    var timestamp = (new Date()).valueOf();


    let tempData = {
        id:"1",
        name:"testPC",
        features:["Deep learning","Gaming","ABC"],
        description:"this is a test pc",
        country:"dddd",
        zipcode:"3333",
        city:"d",
        region:"abc",
        rating:"1",
        price:"100",
        session:[[timestamp,timestamp,3]],
        comments:["123123","123123"]
    };

    let outputData = {
        prodId:"1",
        sessionId:[],
        userId:"1"
    };

    if(tempData.comments.length > 3) tempData.comments = tempData.comments.slice(0,3);

    outputData.prodId = tempData.id;

    let featuresString = "";
    for(let i in tempData.features){
        if(i >= 1){
            featuresString = featuresString + " <i class='dot'></i> &nbsp";
        }
        featuresString = featuresString  + tempData.features[i];
    }

    let locationTemp = [tempData.country,tempData.region,tempData.city,tempData.zipcode];
    let locationArray = [];
    let locationString = "";

    for(let i of locationTemp){
        if(i !== ""){
            locationArray.push(i);
        }
    }
    for(let i in locationArray){
        if(i >= 1){
            locationString = locationString + " <i class='dot'></i> &nbsp";
        }
        locationString = locationString  + locationArray[i];
    }




    let name = $("#name");
    let ratingStar = $("#rating_star");
    let ratingText = $("#rating_text");
    let description = $("#description");
    let featuresContent = $("#features_content");
    let locationContent = $("#location_content");
    let session1 = $("#session1");
    let session1Label = $("#session1_label");
    let session2 = $("#session2");
    let session2Label = $("#session2_label");
    let session3 = $("#session3");
    let session3Label = $("#session3_label");
    let session4 = $("#session4");
    let session4Label = $("#session4_label");
    let session5 = $("#session5");
    let session5Label = $("#session5_label");
    let buyButton = $("#buy_button");
    let commentsDiv = $("#comments_div");
    let sessionsDiv = $("#sessions_div");

    name.html(tempData.name);
    ratingStar.attr("style","width: " + (tempData.rating/5)*100 + "%;");
    ratingText.html(tempData.rating);
    description.html(tempData.description);
    featuresContent.html(featuresString);
    locationContent.html(locationString);

    if(tempData.session.length === 0){
        // session1.attr("hidden","hidden");
        // session2.attr("hidden","hidden");
        // session3.attr("hidden","hidden");
        // session4.attr("hidden","hidden");
        // session5.attr("hidden","hidden");
        sessionsDiv.html("No session available!");
        buyButton.attr("hidden","hidden");

    }else if(tempData.session.length === 1){

        session2.attr("hidden","hidden");
        session2Label.attr("hidden","hidden");
        session3.attr("hidden","hidden");
        session3Label.attr("hidden","hidden");
        session4.attr("hidden","hidden");
        session4Label.attr("hidden","hidden");
        session5.attr("hidden","hidden");
        session5Label.attr("hidden","hidden");

        // session1.html(tempData.session[0][0] + " TO " + tempData.session[0][1]);
        session1.value = tempData.session[0][2];
        session1Label.html(tempData.session[0][0] + " TO " + tempData.session[0][1]);

    }else if(tempData.session.length === 2){

        session3.attr("hidden","hidden");
        session3Label.attr("hidden","hidden");
        session4.attr("hidden","hidden");
        session4Label.attr("hidden","hidden");
        session5.attr("hidden","hidden");
        session5Label.attr("hidden","hidden");

        // session1.html(tempData.session[0][0] + " TO " + tempData.session[0][1]);
        // session2.html(tempData.session[1][0] + " TO " + tempData.session[1][1]);
        session1.value = tempData.session[0][2];
        session2.value = tempData.session[1][2];
        session1Label.html(tempData.session[0][0] + " TO " + tempData.session[0][1]);
        session2Label.html(tempData.session[1][0] + " TO " + tempData.session[1][1]);

    }else if(tempData.session.length === 3){

        session4.attr("hidden","hidden");
        session4Label.attr("hidden","hidden");
        session5.attr("hidden","hidden");
        session5Label.attr("hidden","hidden");

        // session1.html(tempData.session[0][0] + " TO " + tempData.session[0][1]);
        // session2.html(tempData.session[1][0] + " TO " + tempData.session[1][1]);
        // session3.html(tempData.session[2][0] + " TO " + tempData.session[2][1]);
        session1.value = tempData.session[0][2];
        session2.value = tempData.session[1][2];
        session3.value = tempData.session[2][2];
        session1Label.html(tempData.session[0][0] + " TO " + tempData.session[0][1]);
        session2Label.html(tempData.session[1][0] + " TO " + tempData.session[1][1]);
        session3Label.html(tempData.session[2][0] + " TO " + tempData.session[2][1]);

    }else if(tempData.session.length === 4){

        session5.attr("hidden","hidden");
        session5Label.attr("hidden","hidden");

        // session1.html(tempData.session[0][0] + " TO " + tempData.session[0][1]);
        // session2.html(tempData.session[1][0] + " TO " + tempData.session[1][1]);
        // session3.html(tempData.session[2][0] + " TO " + tempData.session[2][1]);
        // session4.html(tempData.session[3][0] + " TO " + tempData.session[3][1]);
        session1.value = tempData.session[0][2];
        session2.value = tempData.session[1][2];
        session3.value = tempData.session[2][2];
        session4.value = tempData.session[3][2];
        session1Label.html(tempData.session[0][0] + " TO " + tempData.session[0][1]);
        session2Label.html(tempData.session[1][0] + " TO " + tempData.session[1][1]);
        session3Label.html(tempData.session[2][0] + " TO " + tempData.session[2][1]);
        session4Label.html(tempData.session[3][0] + " TO " + tempData.session[3][1]);

    }else{
        // session1.html(tempData.session[0][0] + " TO " + tempData.session[0][1]);
        // session2.html(tempData.session[1][0] + " TO " + tempData.session[1][1]);
        // session3.html(tempData.session[2][0] + " TO " + tempData.session[2][1]);
        // session4.html(tempData.session[3][0] + " TO " + tempData.session[3][1]);
        // session5.html(tempData.session[4][0] + " TO " + tempData.session[4][1]);
        session1.value = tempData.session[0][2];
        session2.value = tempData.session[1][2];
        session3.value = tempData.session[2][2];
        session4.value = tempData.session[3][2];
        session5.value = tempData.session[4][2];

        session1Label.html(tempData.session[0][0] + " TO " + tempData.session[0][1]);
        session2Label.html(tempData.session[1][0] + " TO " + tempData.session[1][1]);
        session3Label.html(tempData.session[2][0] + " TO " + tempData.session[2][1]);
        session4Label.html(tempData.session[3][0] + " TO " + tempData.session[3][1]);
        session5Label.html(tempData.session[4][0] + " TO " + tempData.session[4][1]);
    }


    if(tempData.comments.length !== 0){
        commentsDiv.html("");
    }
    for(let i of tempData.comments){
        commentsDiv.append("<article class='card card-product-list'>" +
            "        <div class='row g-0'>" +
            "            <div class='col-xl-6 col-md-5 col-sm-7'>" +
            "                <div class='card-body'>" +
            "                    <p> "+i+"</p>" +
            "                </div>" +
            "            </div>" +
            "        </div>" +
            "    </article>");

    }




    buyButton.on('click',function (event){
        if(session1.prop("checked")){
            if(outputData.sessionId.indexOf(session1.value) === -1){
                outputData.sessionId.push(session1.value);
            }
        }else{
            if(outputData.sessionId.indexOf(session1.value) !== -1){
                for(let i in outputData.sessionId){
                    if(outputData.sessionId[i]===session1.value){
                        outputData.sessionId.splice(i,1);
                    }
                }
            }
        }
        if(session2.prop("checked")){
            if(outputData.sessionId.indexOf(session2.value) === -1){
                outputData.sessionId.push(session2.value);
            }
        }else{
            if(outputData.sessionId.indexOf(session2.value) !== -1){
                for(let i in outputData.sessionId){
                    if(outputData.sessionId[i]===session2.value){
                        outputData.sessionId.splice(i,1);
                    }
                }
            }
        }
        if(session3.prop("checked")){
            if(outputData.sessionId.indexOf(session3.value) === -1){
                outputData.sessionId.push(session3.value);
            }
        }else{
            if(outputData.sessionId.indexOf(session3.value) !== -1){
                for(let i in outputData.sessionId){
                    if(outputData.sessionId[i]===session3.value){
                        outputData.sessionId.splice(i,1);
                    }
                }
            }
        }
        if(session4.prop("checked")){
            if(outputData.sessionId.indexOf(session4.value) === -1){
                outputData.sessionId.push(session4.value);
            }
        }else{
            if(outputData.sessionId.indexOf(session4.value) !== -1){
                for(let i in outputData.sessionId){
                    if(outputData.sessionId[i]===session4.value){
                        outputData.sessionId.splice(i,1);
                    }
                }
            }
        }
        if(session5.prop("checked")){
            if(outputData.sessionId.indexOf(session5.value) === -1){
                outputData.sessionId.push(session5.value);
            }
        }else{
            if(outputData.sessionId.indexOf(session5.value) !== -1){
                for(let i in outputData.sessionId){
                    if(outputData.sessionId[i]===session5.value){
                        outputData.sessionId.splice(i,1);
                    }
                }
            }
        }
       console.log(outputData);
        $.ajax(requestConfig1).then(function (responseMessage) {
            alert("Success!");
            console.log(responseMessage);

        });
    });

    let requestConfig = {

        method: "GET",

    };

    let requestConfig1 = {

        method: "POST",
        data:JSON.stringify(outputData)
    }

    $.ajax(requestConfig).then(function (responseMessage) {



    });
})(window.jQuery);