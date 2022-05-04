const data = require('../data');
const usersData = data.users;
const productsData = data.products;
const ObjectId = require('mongodb').ObjectId;


async function main(){
  try{
    await usersData.createUser("will123","will123123","will","smith","will123@gmail.com","2012048888","hoboken","NJ","US","07030");
  } catch (e){
    console.log(e);
  }
  try{
    await usersData.createUser("yyfyyf123","GG12321#","YVFAN","yang","yyf@gmail.com","2012041234","NYC","NY","US","07111");
  } catch (e){
    console.log(e);
  }
  try{
    await usersData.createUser("czhao123","zcc123321#","chengchen","zhao","zhaocc@gmail.com","2012048568","hoboken","NJ","US","07030");
  } catch (e){
    console.log(e);
  }
  try{
    await usersData.createUser("DTrump","DT123123","Donald","trump","DTrump@gmail.com","2012148888","NYC","NY","US","07111");
  } catch (e){
    console.log(e);
  }
  
  try{
    const userInfo1 = await usersData.getUserByName("will123");
    await productsData.createProduct(userInfo1._id.toString(), 1,1 )
  } catch (e){
    console.log(e);
  }
  /*
  const product1={
    "features": {
        "SSD": "20 GB RAID-10",
        "RAM": "1024 MB",
        "CPU": "2x Intel Xeon",
        "Transfer": "1 TB/mo",
        "Link speed": "1 Gigabit",
        "locations": "Multiple"
    },
    "status": true,
    "unitPrice": 1000,
    "sessions:": [{
        "_id": "6249e720cc211fe94e8d11cf",
        "startTime": "2022/04/01 19:30:00",
        "endTime": "2022/04/02 20:30:00",
        "link": "https://start.teamviewer.com/device/123456789/authorization/password/mode/control",
        "password": 123456,
        "active": true
    },{
        "_id": "6249e720cc211fe94e8d11cf",
        "startTime": "2022/04/01 19:30:00",
        "endTime": "2022/04/02 20:30:00",
        "link": "https://start.teamviewer.com/device/123456789/authorization/password/mode/control",
        "password": 123456,
        "active": true
    }],
    "comments": [{
        "_id": "6249e659cc200fe94e8d11cb",
        "User_Name": "Will123",
        "content": "It is very powerful",
        "rating": 4
    }, {
        "_id": "6249e659cc200fe94e8d11cc",
        "User_Name": "Kaven99",
        "content": "Very affordable price but very good performance",
        "rating": 5
    }],
    "Overall_score": 4.5
    } 

  try{
    const userInfo1 = await usersData.getUserByName("will123");
    await productsData.createProduct(userInfo1._id.toString(), product1.features,product1.status,product1.unitPrice,product1.sessions,product1.comments,product1.Overall_score)
  } catch (e){
    console.log(e);
  }*/

  

}


main();
