(function ($) {
    let requestConfig = {
      method : "GET",
      url:"order-details",
    };

    $.ajax(requestConfig).then(function (response) {
        console.log(response)
        let responseMessage = {
          userName:response.userName,
          email:response.email,
          orderSessions:response.orderSessions
        }
        
    //let responseMessage = {
    let testData={
        userName:"shiwodadiao",
        email:"shiwodadiao@wohaoniu.com",
   //     phone:"1145142333",
        orderSessions:[
        {
        productName: "qunimade",
        sessions:[
          {
            startTime:1607110465663,
            endTime:1607116465663,
            active:false},
          {
            startTime:new Date().getTime()-1000,
            endTime:new Date().getTime()+3600000,
            end_customer_link: "https://get.teamviewer.com/s06432945",
            supporter_link: "https://get.teamviewer.com/s06432945-t4HO88yy20JF",
            active:false},
          {
            startTime:new Date().getTime()+86400000,
            endTime:new Date().getTime()+86400000+3600000,
            active:false},
          {
            startTime:new Date().getTime()+86400000,
            endTime:new Date().getTime()+86400000+3600000,
            active:true}
        ]
      }
    ]
  }  
    

    $.each(responseMessage.orderSessions,function(index,element){
        $('#content-body').append(
            `<article class="card border-primary mb-4">
            <div class="card-body">
              <header class="d-lg-flex">
                <div class="flex-grow-1">
                  <h6 class="mb-0">${responseMessage.orderSessions[index].productName} <i class="dot"></i> 
                  </h6>
                </div>
              </header>
              <hr>
              <div class="row">



              <!-- =================== COMPONENT REVIEW ====================== -->
<div class="card">
  <div class="card-body">
    <h5 class="card-title">Message to seller </h5>

<form>
	
	<div class="mb-3">
		<textarea class="form-control" placeholder="Type here" id="comment-text"></textarea>
	</div>

	<div class="row mb-3 gy-2 gx-3 align-items-center">
	  <div class="col-lg-3">
	    <select class="form-select" id="comment-rate">
	      <option selected> Rating </option>
	      <option value="1">1</option>
	      <option value="2">2</option>
	      <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
	    </select>
	  </div>
	</div>
	<button type="submit" class="btn btn-primary" id="submit-comment-button">Submit comment</button>
</form>

  </div>
</div>
<!-- =================== COMPONENT REVIEW .// ================== -->   





              </div> <!-- row.// -->
              <hr>
              <ul class="row" id="row${index}">
                <!-- Sessions goes here -->
       
              </ul>
            </div> <!-- card-body .// -->
            </article>`
        );

        $("#submit-comment-button").click(function(){
          console.log($('#comment-text').val());
          console.log($('#comment-rate').val())
          $.post("add_comment",{
            sessionId:element.sessions[0]._id,
            comment_info:{
              content:$('#comment-text').val(),
              rating:$('#comment-rate').val()
            }
          })
        })

        $.each(responseMessage.orderSessions[index].sessions,function(indexSes,elementSes){
//        for(let indexSes=0; indexSes<responseMessage.orderSessions[index].sessions.length;indexSes++){
          let getStart=responseMessage.orderSessions[index].sessions[indexSes].startTime;
          let getEnd=responseMessage.orderSessions[index].sessions[indexSes].endTime;
          let startTime = new Date(getStart);
          let endTime = new Date(getEnd);
          let start=(startTime.getMonth()+1)+"/"+startTime.getDate()+"/"+startTime.getFullYear()+
          " "+startTime.getHours()+":"+startTime.getMinutes()+":"+startTime.getSeconds();
          let end=(endTime.getMonth()+1)+"/"+endTime.getDate()+"/"+endTime.getFullYear()+
          " "+endTime.getHours()+":"+endTime.getMinutes()+":"+endTime.getSeconds();

          if(!responseMessage.orderSessions[index].sessions[indexSes].active){
            if(responseMessage.orderSessions[index].sessions[indexSes].endTime<new Date().getTime()){
              $(`#row${index}`).append(`
            <li class="col-xl-4  col-lg-6">
            <figure class="itemside mb-3">
              <figcaption class="info">
                <p class="title">Session ${indexSes+1}</p>
                <p>From ${start}</p>
                <p>To ${end}</p>
                <strong> Complete </strong>
              </figcaption>
            </figure> 
          </li> 
            `)
            } else if(responseMessage.orderSessions[index].sessions[indexSes].startTime>new Date().getTime()){
              $(`#row${index}`).append(`
              <li class="col-xl-4  col-lg-6">
              <figure class="itemside mb-3">
                <figcaption class="info">
                  <p class="title">Session ${indexSes+1}</p>
                  <p>From ${start}</p>
                  <p>To ${end}</p>
                  <strong> Not started </strong>
                </figcaption>
              </figure> 
            </li> 
              `)
            } else{
              $(`#row${index}`).append(`
              <li class="col-xl-4  col-lg-6">
              <figure class="itemside mb-3">
                <figcaption class="info">
                  <p class="title">Session ${indexSes+1}</p>
                  <p>From ${start}</p>
                  <p>To ${end}</p>

                  <strong hidden> ${responseMessage.orderSessions[index].sessions[indexSes].active} </strong>

                  <div id="buyerNotStart_${index}_${indexSes}">
                  <strong> On going </strong>
                  <p>Please wait</p>
                  </div>
                  <a href="${elementSes.supporter_link}" class="btn btn-primary" id="buyerLaunchButton_${index}_${indexSes}">Launch</a>

                  <p id="demo"></p>
                </figcaption>
              </figure> 
            </li> 

            <script>
            // Set the date we're counting down to
            var countDownDate = ${responseMessage.orderSessions[index].sessions[indexSes].endTime};

            // Update the count down every 1 second
            var x = setInterval(function() {

              // Get today's date and time
              var now = new Date().getTime();
    
              // Find the distance between now and the count down date
              var distance = countDownDate - now;
                
              // Time calculations for days, hours, minutes and seconds
              var days = Math.floor(distance / (1000 * 60 * 60 * 24));
              var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
              var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
              var seconds = Math.floor((distance % (1000 * 60)) / 1000);
                
              // Output the result in an element with id="demo"
              document.getElementById("demo").innerHTML = days + "d " + hours + "h "
              + minutes + "m " + seconds + "s ";
    
              // If the count down is over, write some text 
              if (distance < 0) {
                clearInterval(x);
                document.getElementById("demo").innerHTML = "EXPIRED";
              }
            }, 1000);
            </script>
              `)
              if(!elementSes.supporter_link){
                $(`#buyerNotStart_${index}_${indexSes}`).show();
                $(`#buyerLaunchButton_${index}_${indexSes}`).hide();
                $(`#demo_${index}_${indexSes}`).hide();
              } else {
                $(`#buyerNotStart_${index}_${indexSes}`).hide();
                $(`#buyerLaunchButton_${index}_${indexSes}`).show();
                $(`#demo_${index}_${indexSes}`).show();
              }
            }
          }
//        }
        })
      })
    });
})(window.jQuery);

/*     axios({method: 'GET',
          url: "/order-details"})
    .then(function (response) {
        console.log(response);
        uuu = response.userName;
    })
    .catch(function (error) {
        console.log(error);
    }); */