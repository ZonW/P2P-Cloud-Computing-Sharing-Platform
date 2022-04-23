const data = require('./data');
const usersData = data.users;
const ObjectId = require('mongodb').ObjectId;
var PurchaseData = {};
var userInfo = {'orderSessionHistory':[1,2,3]}


function checkCity(city){
  if (typeof city !== 'string') throw '';
  var city = city.trim();
  if (!/(^[A-Za-z\ ]+$)/.test(city)) throw '';
  var newStr = city.split(" ");    
  for(var i = 0; i<newStr.length; i++){
    newStr[i] = newStr[i].slice(0,1).toUpperCase() + newStr[i].slice(1).toLowerCase();
  }    
  return newStr.join(" ");

}
      
async function main(){
  updatedInfo = {
    'email': '490580638@qq.123.com',
    'phone': '139084728',
    'city': 'Los An',
    'status': 'CA',
    'country': 'US',
    'zipCode': '12345'

  }
  console.log(checkCountry('abc'))
  //await usersData.deleteUser('626347aa689003e0050580b4');
  //console.log(ObjectId.isValid('6249e659cc200fe94e8d11c1'))

}

console.log(checkCity('abc a b'))