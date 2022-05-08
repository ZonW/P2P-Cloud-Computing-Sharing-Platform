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

    });




    try{
        if(newName.value.length > 50) throw "Product name should be less than 50 letters!";

        if(newPrice.value > 10000 || newPrice.value < 0) throw "Product price should be between 0 and 10000!";

        if(newRegion.value.trim() === "") throw "Region information is invalid!";

        if(newCity.value.trim() === "") throw "City information is invalid!";

        if(newDescription.length > 300) throw "Description should be no more than 300 letters!";

        if(session1StartTime){
            if(!session1EndTime) throw "Invalid time!";
        }
        if(session1EndTime){
            if(!session1StartTime) throw "Invalid time!";
        }
        if(session2StartTime){
            if(!session2EndTime) throw "Invalid time!";
        }if(session2EndTime){
            if(!session2StartTime) throw "Invalid time!";
        }
        if(session3StartTime){
            if(!session3EndTime) throw "Invalid time!";
        }
        if(session3EndTime){
            if(!session3StartTime) throw "Invalid time!";
        }

        if(session1StartTime > session1EndTime || session2StartTime > session2EndTime || session3StartTime > session3EndTime) throw "Invalid time!";

    }catch(e){
        alert.removeAttr("hidden");
        alert.append(e);
    }



})(window.jQuery);