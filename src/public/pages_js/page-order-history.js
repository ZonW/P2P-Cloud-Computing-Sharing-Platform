(function ($) {
    let responseMessage=[
      {
        productName: "qunimade",
        sessions:[
          {
              startTime:"1607110465663",
              endTime:"1607116465663",
              active:false},
          {
            startTime:new Date().getTime(),
            endTime:new Date().getTime()+3600000,
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

    $.each(responseMessage,function(index,element){
        $('#content-body').append(
            `<article class="card border-primary mb-4">
            <div class="card-body">
              <header class="d-lg-flex">
                <div class="flex-grow-1">
                  <h6 class="mb-0">${responseMessage[index].productName}<i class="dot"></i> 
                  </h6>
                </div>
              </header>
              <hr>
              <div class="row">
                <div class="col-lg-4">
                </div> <!-- col.// -->
                <div class="col-lg-4 border-start">
                </div> <!-- col.// -->
                <div class="col-lg-4 border-start">
                </div> <!-- col.// -->
              </div> <!-- row.// -->
              <hr>
              <ul class="row" id="row${index}">
                <!-- Sessions goes here -->
       
              </ul>
            </div> <!-- card-body .// -->
            </article>`
        );

        $.each(responseMessage[index].sessions,function(indexSes,elementSes){
          if(!responseMessage[index].sessions[indexSes].active){
            if(responseMessage[index].sessions[indexSes].endTime<new Date().getTime()){
              $(`#row${index}`).append(`
            <li class="col-xl-4  col-lg-6">
            <figure class="itemside mb-3">
              <figcaption class="info">
                <p class="title">Session ${indexSes+1}</p>
                <strong> Complete </strong>
              </figcaption>
            </figure> 
          </li> 
            `)
            } else if(responseMessage[index].sessions[indexSes].startTime>new Date().getTime()){
              $(`#row${index}`).append(`
              <li class="col-xl-4  col-lg-6">
              <figure class="itemside mb-3">
                <figcaption class="info">
                  <p class="title">Session ${indexSes+1}</p>
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
                  <strong hidden> ${responseMessage[index].sessions[indexSes].active} </strong>
                  <strong hidden> On going </strong>
                  <a href="#" class="btn btn-primary">Launch</a>
                  <p id="demo"></p>
                </figcaption>
              </figure> 
            </li> 

            <script>
            // Set the date we're counting down to
            var countDownDate = ${responseMessage[index].sessions[indexSes].endTime};

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
            }
          }
        })

      })


})(window.jQuery);