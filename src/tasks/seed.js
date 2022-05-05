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

  
}


main();