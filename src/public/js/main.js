(function ($){
    const database=[
        {
            name:"abc",
            dob:"cde",
            gender:"male"
        },
        {
            name:"def",
            dob:"cde",
            gender:"male"
        },
        {
            name:"ggs",
            dob:"cde",
            gender:"male"
        },
        {
            name:"hhe",
            dob:"cde",
            gender:"male"
        },
        {
            name:"qhv",
            dob:"cde",
            gender:"female"
        },
        {
            name:"adc",
            dob:"cde",
            gender:"female"
        },
        {
            name:"adc",
            dob:"cde",
            gender:"female"
        },
        {
            name:"adc",
            dob:"cde",
            gender:"female"
        },
        {
            name:"adc",
            dob:"cde",
            gender:"female"
        },
        {
            name:"adc",
            dob:"cde",
            gender:"female"
        },
        {
            name:"adc",
            dob:"cde",
            gender:"female"
        },
        {
            name:"adc",
            dob:"cde",
            gender:"female"
        }
    ];

    let searchResult = [];
    const PAGECAPACITY = 5;

    $('#search-buttion').on('click',function (event){

        let result = $("#search-result");
        let search = $("#search");
        let recent = $("#recent-transaction");
        let recent_Button = $('#result-transaction-button');
        let count = 0;

        if(search.val().trim()==""){
            alert("Invalid input!");
        }else{
            result.html("");
            for(let i of database){
                if((i.name.toLowerCase()).includes(search.val().toLowerCase())){
                    recent.attr("hidden","hidden");
                    recent_Button.text("Show Recent Transaction");
                    searchResult.push(i);
                    // $("#search-result").append("<span class='item'>" + i.name + " " + i.dob + " " + i.gender +
                    //     "</span><br>")
                    count += 1;
                }
            }
            if(count==0){

                result.html("<div class='item'>No such result found!</div>")
            }
            if(searchResult.length<=PAGECAPACITY){
                for(let i of searchResult){
                    result.append("<div class='item'>" + i.name + " " + i.dob + " " + i.gender +
                        "</div><br>");
                }
            }else{
                for(let i = 0; i < PAGECAPACITY;i=i+1){
                    result.append("<div class='item'>" + searchResult[i].name + " " + searchResult[i].dob + " " + searchResult[i].gender +
                        "</div><br>");
                }
            }
        }

        search.val("");
    });
    $('#result-transaction-button').on('click',function (event){
        event.preventDefault();
        let recent = $("#recent-transaction");
        let recent_Button = $('#result-transaction-button');

        if(recent.is(":hidden")){
            recent.removeAttr("hidden");
            recent_Button.text("Hide Recent Transaction");
        }else{
            recent.attr("hidden","hidden");
            recent_Button.text("Show Recent Transaction");
        }
    });
    // 定义一个数组，保存当前所有页面的class name
    // var page_index = ["page-1", "page-2", "page-3"];
    //
    // // 输入pagename，打开指定的div，隐藏其他的div
    // function page_option(pagename){
    //     var tar_index = page_index.indexOf(pagename);
    //     page_index.slice(tar_index, 1);
    //     for (var j = 0; j < page_index.length ; j++){
    //         var close_div = $("." + page_index[j]);
    //         for (var i = 0; i<close_div.length;i++) {
    //             close_div[i].style.display="none";
    //         };
    //     }
    //
    //     var opendiv = $("." +pagename);
    //     for (var i = 0; i<opendiv.length;i++) {
    //         opendiv[i].style.display="block";
    //     };
    // }
    // $('#firstPage').on('click',function (event){
    //     event.preventDefault();
    //     page_option(page_index[0]);
    //     $("#currentPage").value=1;
    // });
    // $('#previousPage').on('click',function (event){
    //     event.preventDefault();
    //     var cur_page = $("#currentPage").value;
    //     if (cur_page > 1){
    //         $("#currentPage").value=parseInt(cur_page)-1;
    //         var pagename = page_index[parseInt(cur_page)-2];
    //         page_option(pagename);
    //     }
    // });
    // $('#nextPage').on('click',function (event){
    //     event.preventDefault();
    //     var cur_page = $("#currentPage").value;
    //     var total_page = $("#totalPage").value;
    //     if (cur_page < total_page){
    //         $("#currentPage").value=parseInt(cur_page) + 1;
    //         var pagename = page_index[parseInt(cur_page)];
    //         page_option(pagename);
    //     }
    // });
    // $('#lastPage').on('click',function (event){
    //     event.preventDefault();
    //     page_option(page_index[page_index.length - 1]);
    //     $("#currentPage").value=1;
    // });
    // $("#currentPage").on("change",function(event){
    //     var cur_page = $("#currentPage").value;
    //     var pagename = page_index[parseInt(cur_page)-1];
    //     page_option(pagename);
    // });

})(window.jQuery)