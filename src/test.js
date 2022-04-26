const data = require('./data');
const usersData = data.users;
const productsData = data.products;
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

  comment_info = {
    content: "so good",
    rating: 7
  }
  //await usersData.createUser('zcc123','zcc123');
  await productsData.createProduct('62688351bc980dd1ab788583', 1,1)
  
  await productsData.addComment('62688351bc980dd1ab788583', '6268838fe0fdd0a69343fe09', comment_info)
  //console.log(ObjectId.isValid('6249e659cc200fe94e8d11c1'))

}

main()