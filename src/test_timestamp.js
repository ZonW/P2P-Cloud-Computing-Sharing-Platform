let timestamp = 1607110465663
let date = new Date(timestamp);

console.log("Date: "+date.getDate()+
          "/"+(date.getMonth()+1)+
          "/"+date.getFullYear()+
          " "+date.getHours()+
          ":"+date.getMinutes()+
          ":"+date.getSeconds());


let timestamp_now = new Date().getTime();
let timestamp_1d = new Date().getTime()+86400000;
let timestamp_2h = new Date().getTime()+3600000;

console.log(timestamp_now)
console.log(new Date(timestamp_now))
console.log(new Date(timestamp_1d))

/*
console.log("Date: "+timestamp_now.getDate()+
          "/"+(timestamp_now.getMonth()+1)+
          "/"+timestamp_now.getFullYear()+
          " "+timestamp_now.getHours()+
          ":"+timestamp_now.getMinutes()+
          ":"+timestamp_now.getSeconds());


console.log("Date: "+timestamp_future.getDate()+
          "/"+(timestamp_future.getMonth()+1)+
          "/"+timestamp_future.getFullYear()+
          " "+timestamp_future.getHours()+
          ":"+timestamp_future.getMinutes()+
          ":"+timestamp_future.getSeconds());
*/