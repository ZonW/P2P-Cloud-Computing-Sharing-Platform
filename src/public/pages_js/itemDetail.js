(function ($){

    var timestamp = (new Date()).valueOf();

    let tempData = {};

    let requestConfig = {
        method : "POST"
    };

    let outputData = {
        prodId:"",
        sessionId:[],
    };

    $.ajax(requestConfig).then(function (responseMessage) {

        tempData = responseMessage;
        outputData.prodId = responseMessage._id;
        console.log(outputData);

    });


    function convert(time){
        // let result = "Date" + time.getDate() +
        // "/" + (time.getMonth()+1) + 
        // "/" + time.getFullYear() + 
        // " " + time.getHours() + 
        // ":" + time.getMinutes() +
        // ":" + time.getSeconds();
        let ts = new Date(time);
        let result = ts.toTimeString();

        return result;
        
    }

    

    setTimeout(function(){

        console.log(tempData);
        let requestConfig1 = {

            method: "POST",
            data:JSON.stringify(outputData),
            url:"/buy/"+outputData.prodId

        }

        if(tempData.comments.length > 3) tempData.comments = tempData.comments.slice(0,3);

        outputData.prodId = tempData._id;

        let featuresString = "";
        for(let i in tempData.features){
            if(i >= 1){
                featuresString = featuresString + " <i class='dot'></i> &nbsp";
            }
            featuresString = featuresString  + tempData.features[i];
        }

        let locationTemp = [tempData.location.country,tempData.location.region,tempData.location.city];
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
        ratingStar.attr("style","width: " + (tempData.overall_score/5)*100 + "%;");
        ratingText.html(tempData.overall_score);
        description.html(tempData.description);
        featuresContent.html(featuresString);
        locationContent.html(locationString);

        if(tempData.sessions.length === 0){
            // session1.attr("hidden","hidden");
            // session2.attr("hidden","hidden");
            // session3.attr("hidden","hidden");
            // session4.attr("hidden","hidden");
            // session5.attr("hidden","hidden");
            sessionsDiv.html("No session available!");
            buyButton.attr("hidden","hidden");

        }else if(tempData.sessions.length === 1){

            session2.attr("hidden","hidden");
            session2Label.attr("hidden","hidden");
            session3.attr("hidden","hidden");
            session3Label.attr("hidden","hidden");
            session4.attr("hidden","hidden");
            session4Label.attr("hidden","hidden");
            session5.attr("hidden","hidden");
            session5Label.attr("hidden","hidden");

            // session1.html(tempData.session[0][0] + " TO " + tempData.session[0][1]);
            session1.value = tempData.sessions[0]._id;
            session1Label.html(convert(tempData.sessions[0].startTime) + " TO " + convert(tempData.session[0].endTime));

        }else if(tempData.sessions.length === 2){

            session3.attr("hidden","hidden");
            session3Label.attr("hidden","hidden");
            session4.attr("hidden","hidden");
            session4Label.attr("hidden","hidden");
            session5.attr("hidden","hidden");
            session5Label.attr("hidden","hidden");

            // session1.html(tempData.session[0][0] + " TO " + tempData.session[0][1]);
            // session2.html(tempData.session[1][0] + " TO " + tempData.session[1][1]);
            session1.value = tempData.sessions[0]._id;
            session2.value = tempData.sessions[1]._id;
            session1Label.html(convert(tempData.sessions[0].startTime) + " TO " + convert(tempData.sessions[0].endTime));
            session2Label.html(convert(tempData.sessions[1].startTime) + " TO " + convert(tempData.sessions[1].endTime));

        }else if(tempData.sessions.length === 3){

            session4.attr("hidden","hidden");
            session4Label.attr("hidden","hidden");
            session5.attr("hidden","hidden");
            session5Label.attr("hidden","hidden");

            // session1.html(tempData.session[0][0] + " TO " + tempData.session[0][1]);
            // session2.html(tempData.session[1][0] + " TO " + tempData.session[1][1]);
            // session3.html(tempData.session[2][0] + " TO " + tempData.session[2][1]);
            session1.value = tempData.sessions[0]._id;
            session2.value = tempData.sessions[1]._id;
            session3.value = tempData.sessions[2]._id;
            session1Label.html(convert(tempData.sessions[0].startTime) + " TO " + convert(tempData.sessions[0].endTime));
            session2Label.html(convert(tempData.sessions[1].startTime) + " TO " + convert(tempData.sessions[1].endTime));
            session3Label.html(convert(tempData.sessions[2].startTime) + " TO " + convert(tempData.sessions[2].endTime));

        }else if(tempData.sessions.length === 4){

            session5.attr("hidden","hidden");
            session5Label.attr("hidden","hidden");

            // session1.html(tempData.session[0][0] + " TO " + tempData.session[0][1]);
            // session2.html(tempData.session[1][0] + " TO " + tempData.session[1][1]);
            // session3.html(tempData.session[2][0] + " TO " + tempData.session[2][1]);
            // session4.html(tempData.session[3][0] + " TO " + tempData.session[3][1]);
            session1.value = tempData.sessions[0]._id;
            session2.value = tempData.sessions[1]._id;
            session3.value = tempData.sessions[2]._id;
            session4.value = tempData.sessions[3]._id;
            session1Label.html(convert(tempData.sessions[0].startTime) + " TO " + convert(tempData.sessions[0].endTime));
            session2Label.html(convert(tempData.sessions[1].startTime) + " TO " + convert(tempData.sessions[1].endTime));
            session3Label.html(convert(tempData.sessions[2].startTime) + " TO " + convert(tempData.sessions[2].endTime));
            session4Label.html(convert(tempData.sessions[3].startTime) + " TO " + convert(tempData.sessions[3].endTime));

        }else{
            // session1.html(tempData.session[0][0] + " TO " + tempData.session[0][1]);
            // session2.html(tempData.session[1][0] + " TO " + tempData.session[1][1]);
            // session3.html(tempData.session[2][0] + " TO " + tempData.session[2][1]);
            // session4.html(tempData.session[3][0] + " TO " + tempData.session[3][1]);
            // session5.html(tempData.session[4][0] + " TO " + tempData.session[4][1]);
            session1.value = tempData.sessions[0]._id;
            session2.value = tempData.sessions[1]._id;
            session3.value = tempData.sessions[2]._id;
            session4.value = tempData.sessions[3]._id;
            session5.value = tempData.sessions[4]._id;

            session1Label.html(convert(tempData.sessions[0].startTime) + " TO " + convert(tempData.sessions[0].endTime));
            session2Label.html(convert(tempData.sessions[1].startTime) + " TO " + convert(tempData.sessions[1].endTime));
            session3Label.html(convert(tempData.sessions[2].startTime) + " TO " + convert(tempData.sessions[2].endTime));
            session4Label.html(convert(tempData.sessions[3].startTime) + " TO " + convert(tempData.sessions[3].endTime));
            session5Label.html(convert(tempData.sessions[4].startTime) + " TO " + convert(tempData.sessions[4].endTime));
        }


        if(tempData.comments.length !== 0){
            commentsDiv.html("");
        }
        for(let i of tempData.comments){

            console.log(i);
            commentsDiv.append("<article class='card card-product-list'>" +
                "        <div class='row g-0'>" +
                "            <div class='col-xl-6 col-md-5 col-sm-7'>" +
                "                <div class='card-body'>" +
                "                   <h4>user:"+i.username+"</h4>" +
                "                       <h6>Rating: "+ i.rating+"</h6>" +
                "                    <p> Comment:  "+i.content+"</p>" +
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
                location.reload();
            });
        });
    },1000);








})(window.jQuery);