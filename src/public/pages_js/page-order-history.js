(function ($) {
    $('#content-body').append(
        `    <!--  ======== item order ======== -->
        <article class="card border-primary mb-4">
          <div class="card-body">
            <header class="d-lg-flex">
              <div class="flex-grow-1">
                <h6 class="mb-0">Product1 <i class="dot"></i>  
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
            <ul class="row">
              <!-- Sessions goes here -->
              <li class="col-xl-4  col-lg-6">
                <figure class="itemside mb-3">
                  <figcaption class="info">
                    <p class="title">Session1</p>
                    <strong> Complete </strong>
                  </figcaption>
                </figure> 
              </li>
              <li class="col-xl-4  col-lg-6">
                <figure class="itemside mb-3">
                  <figcaption class="info">
                    <p class="title">Session2</p>
                    <strong> On going </strong>
                  </figcaption>
                </figure>
              </li>
              <li class="col-xl-4  col-lg-6"> 
                <figure class="itemside mb-3">
                  <figcaption class="info">
                    <p class="title">Session3</p>
                    <strong> Not started </strong>
                  </figcaption>
                </figure>
              </li>
            </ul>
          </div> <!-- card-body .// -->
          </article> <!-- card .// --> 
          <!--  ======== item order .// ======== -->`
    );

    /*
    $.each(responseMessage,function(index,element){
        $('#content-body').append(
            `<article class="card border-primary mb-4">
            <div class="card-body">
              <header class="d-lg-flex">
                <div class="flex-grow-1">
                  <h6 class="mb-0">Product ${index}<i class="dot"></i> 
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
              <ul class="row${index}" id="row${index}">
                <!-- Sessions goes here -->
       
              </ul>
            </div> <!-- card-body .// -->
            </article>`
        );

        $.each(responseMessage.sessions,function(indexSes,elementSes){
            $(`#row${index}`).append(`
            <li class="col-xl-4  col-lg-6">
            <figure class="itemside mb-3">
              <figcaption class="info">
                <p class="title">Session ${indexSes}</p>
                <strong> ${responseMessage.sessions.indexSes.active} </strong>
              </figcaption>
            </figure> 
          </li> 
            `)

        })
    });

    */




})(window.jQuery);