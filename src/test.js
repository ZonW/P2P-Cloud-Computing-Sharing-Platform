const data = require('./data');
const usersData = data.users;
const ObjectId = require('mongodb').ObjectId;
var PurchaseData = {};
var userInfo = {'orderSessionHistory':[1,2,3]}
      
async function main(){
  updatedInfo = {
    'email': '490580638@qq.123.com',
    'phone': '139084728',
    'city': 'Los An',
    'status': 'CA',
    'country': 'US',
    'zipCode': '12345'

  }
  await usersData.deleteUser('626347aa689003e0050580b4');
  //console.log(ObjectId.isValid('6249e659cc200fe94e8d11c1'))

}

main()