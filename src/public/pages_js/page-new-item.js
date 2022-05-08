(function ($){

    let newName = $("#new_name");
    let newPrice = $("#new_price");
    let newDescription = $("#new_description");
    let newRegion = $("#new_region");
    let newCity = $("#new_city");


    let session1StartTime = $("#session1_start_time");
    let session2StartTime = $("#session2_start_time");
    let session3StartTime = $("#session3_start_time");

    let session1EndTime = $("#session1_end_time");
    let session2EndTime = $("#session2_end_time");
    let session3EndTime = $("#session3_end_time");

    let alert = $("#alert");
    let bt = $("#bt");

    bt.on('click',function(event){
        alert.html("");
        alert.attr("hidden","hidden");

        console.log(session1StartTime.val());
        console.log(Date.parse(session1StartTime.val()));
        console.log(new Date);
        console.log(newName.val());

        // console.log(session1StartTime);
        // console.log(session1EndTime);


    });


    setInterval(function (){
        try{
            if(newName.val().trim().length > 50||newName.val().trim()==="") throw "Product name should be less than 50 letters!";

            if(newPrice.val() > 10000 || newPrice.val() < 0) throw "Product price should be between 0 and 10000!";

            if(newRegion.val().trim()=== "") throw "Region information is invalid!";

            if(newCity.val().trim() === "") throw "City information is invalid!";

            if(newDescription.val().trim().length > 300 || newDescription.val().trim() === "") throw "Description should be no more than 300 letters!";

            if(session1StartTime.val()===""){
                if(session1EndTime.val()!=="") throw "Invalid time!";
            }
            if(session1EndTime.val()===""){
                if(session1StartTime.val()!=="") throw "Invalid time!";
            }
            if(session2StartTime.val()===""){
                if(session2EndTime.val()!=="") throw "Invalid time!";
            }
            if(session2EndTime.val()===""){
                if(session2StartTime.val()!=="") throw "Invalid time!";
            }
            if(session3StartTime.val()===""){
                if(session3EndTime.val()!=="") throw "Invalid time!";
            }
            if(session3EndTime.val()===""){
                if(session3StartTime.val()!=="") throw "Invalid time!";
            }

            if((Number(session1StartTime.valueOf()) > Number(session1EndTime.valueOf()) )|| (Number(session2StartTime.valueOf()) > Number(session2EndTime.valueOf()))|| (Number(session3StartTime.valueOf()) > Number(session3EndTime.valueOf()))) throw "Invalid time!";

            alert.html("");
            bt.removeAttr("hidden");
            //
            // console.log("start " + Date.parse(session1StartTime.val()));
            // console.log("end " + Date.parse(session1EndTime.val()));

            session1StartTime.value = Date.parse(session1StartTime.val());
            session1EndTime.value = Date.parse(session1EndTime.val());
            session2StartTime.value = Date.parse(session2StartTime.val());
            session2EndTime.value = Date.parse(session2EndTime.val());
            session3StartTime.value = Date.parse(session3StartTime.val());
            session3EndTime.value = Date.parse(session3EndTime.val());

        }catch(e){
            alert.removeAttr("hidden");
            alert.html("<h4>"+e+"</h4>");
            bt.attr("hidden","hidden");
        }
                          },200);






})(window.jQuery);