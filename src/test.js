const data = require('./data');
const usersData = data.users;
const productsData = data.products;
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
    'city': 'SF',
    'status': 'CA',
    'country': 'US',
    'zipCode': '123435'
  }

  comment_info = {
    content: "so good",
    rating: 1
  }

  filter_info = {
    distance: [0,100000],
    features: [],
    keywords: "good",
    lat:40.7467,
    lon:-74.0574,
    operatingSystem:"macos",
    price: 12,
    sortBy: 'highestRated'
  }
  //await usersData.createUser('zcc1234','zcc123','will', 'smith');
  //await usersData.modifyUserInformation('62688608c6990edc2c626646', updatedInfo)
  const a= await productsData.modifySession('6276e8974ec27ddf8eaa40f0','123','321',false)
  console.log(a)
  //const a = await productsData.filterProduct(filter_info);
 
  //console.log(ObjectId.isValid('6249e659cc200fe94e8d11c1'))
}
main()

