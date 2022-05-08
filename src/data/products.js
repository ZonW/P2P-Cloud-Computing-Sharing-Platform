const mongoCollections = require('../config/mongoCollections');
const products = mongoCollections.products;
const usersData = require('./users');
const bcryptjs = require('bcryptjs');
const ObjectId = require('mongodb').ObjectId;

const exportedMethods = {

  //all set
  async getProductById(productId){
    const productsCollection = await products();
    if (!ObjectId.isValid(productId)) throw "id is not a valid ObjectId";
    const productInfo = await productsCollection.findOne({ _id: ObjectId(productId) });
    if (!productInfo) return false;
    return productInfo;
  },

  async getAllProduct(...args){
    if (args.length != 0) throw('No argument is allowed')

    const prodCollection = await products();
    const prodList = await prodCollection.find({}).toArray();
    if (!prodList) throw 'Could not get all products';
    return prodList;
  },
  
  async sortProduct(arr, key, way,...args){
    if (args.length != 0) throw('3 arguments allowed')
    if (!arr) throw "Input array"
    if (!key) throw "Input key"
    if (!way) throw "Input way"

    return arr.sort(function(a, b) {
      var x = a[key]; var y = b[key];
      if (way === 'fwd') { return ((x < y) ? -1 : ((x > y) ? 1 : 0)); }
      if (way === 'bwd') { return ((x > y) ? -1 : ((x < y) ? 1 : 0)); }
    });
  },

  async filterProduct(key){
    if(!key) throw("Input key as obj")
    if(typeof key !== 'object') throw "Key must be obj"

    const productsCollection = await products();
    var productList = [];
    var shortestDistance = false;
    if (key.sortBy === "lowestPrice"){
      productList = await productsCollection
      .find( { operatingSystem : key.operatingSystem, 
        $and:[ {unitPrice: { $gt: key.price[0] }},
               {unitPrice: { $lt: key.price[1] }}
        ]})
      .sort({unitPrice: 1})
      .toArray();
    }
    if (key.sortBy === "shortestDistance"){
      productList = await productsCollection
      .find( { operatingSystem : key.operatingSystem, 
            $and:[ {unitPrice: { $gt: key.price[0] }},
                   {unitPrice: { $lt: key.price[1] }}
            ]})
      .toArray();
      shortestDistance = true;
    }
    if (key.sortBy === "highestRated"){
      productList = await productsCollection
      .find( { operatingSystem : key.operatingSystem, 
        $and:[ {unitPrice: { $gt: key.price[0] }},
               {unitPrice: { $lt: key.price[1] }}
        ]})
      .sort({overall_score: -1})
      .toArray();
    }
    if (key.sortBy === "newestListed"){
      productList = await productsCollection
      .find( { operatingSystem : key.operatingSystem, 
        $and:[ {unitPrice: { $gt: key.price[0] }},
               {unitPrice: { $lt: key.price[1] }}
        ]})
      .toArray();
    }
    var dislist = [];
    var respondproductList = [];
    for (var i = 0; i<productList.length; i++){
      const dis = this.getDistance(key.lat, key.lon, productList[i].location.lat,productList[i].location.lon);
      var filterFeature = false;

      let len = key.features.length;
      let tempArr = key.features.filter(item => {
        return productList[i].features.includes(item);
      })
      if(tempArr.length === len) {
        filterFeature = true; }

      var filterKeywords = false;
      if (productList[i].name.toLowerCase().indexOf(key.keywords.toLowerCase())!==-1 || 
      productList[i].description.toLowerCase().indexOf(key.keywords.toLowerCase())!==-1){
        filterKeywords = true;
      }
      
      if (this.checkDistance(dis, key.distance) && filterKeywords && filterFeature){
        if (shortestDistance){

          if (dislist.length === 0){
            respondproductList.push(productList[i]);
            dislist.push(dis);
          } else if (dislist.length === 1){
            if (dis<=dislist[0]){
              respondproductList.splice(0,0,productList[i]);
              dislist.splice(0,0,dis);
            } else {
              respondproductList.push(productList[i]);
              dislist.push(dis);
            }
          } else {
            for (var x = 0; x<dislist.length - 1; x++){
              if (dis<=dislist[x]){
                respondproductList.splice(0,0,productList[i]);
                dislist.splice(0,0,dis);
                break;
              } else if (dis>dislist[x] && dis<=dislist[x+1]){
                respondproductList.splice(x+1,0,productList[i]);
                dislist.splice(x+1,0,dis);
                break;
              } else if (x===dislist.length - 2){
                respondproductList.push(productList[i]);
                dislist.push(dis);
                break;
              }
            }
          }
        } else {
          respondproductList.push(productList[i]);
        }
      }
    }
    return respondproductList;
    
  },

  checkDistance(dis, distance){
    return (dis >=distance[0] && dis <= distance[1]);
  },

  getDistance(lat1, lng1, lat2, lng2) {
    lat1 = lat1 || 0;
    lng1 = lng1 || 0;
    lat2 = lat2 || 0;
    lng2 = lng2 || 0;

    var rad1 = lat1 * Math.PI / 180.0;
    var rad2 = lat2 * Math.PI / 180.0;
    var a = rad1 - rad2;
    var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
    var r = 6378137;
    var distance = r * 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(rad1) * Math.cos(rad2) * Math.pow(Math.sin(b / 2), 2)))/1000;

    return distance.toFixed(3);
},


  //all set
  async createProduct(userId, name, description, operatingSystem, features, time, unitPrice, location, sessions){
    if (!userId) throw "userId must be provided";
    if (!name) throw "Name must be provided"
    if (!description) throw "Description must be provided"
    if (!operatingSystem) throw "OS must be provided"
    if (!time) throw "time must be provided";
    if (!features) throw "features must be provided";
    if (!unitPrice) throw "unitPrice must be provided";
    if (!location) throw "location must be provided";
    if (!sessions) throw "sessions must be provided";
    
    if (!await usersData.getUserById(ObjectId(userId))) throw 'No user Found';

    const productsCollection = await products();

    var newProduct = {
      name: name,
      description: description,
      operatingSystem: operatingSystem,
      features: features,
      status: true,
      time: time,
      unitPrice: unitPrice,
      location: location,
      sessions: sessions,
      comments: [],
      overall_score: null
    }

    const newInsertInformation = await productsCollection.insertOne(newProduct);
    if (newInsertInformation.insertedCount === 0) throw 'Insert failed!';
    await usersData.addProductsInUsers(userId, newInsertInformation.insertedId.toString());
    return { productInserted: true };
  },  
  
  /* async deleteProduct(userId, productId){
    if (!userId) throw "userId must be provided";
    if (!productId) throw "productId must be provided";

    const productsCollection = await products();
    if (!ObjectId.isValid(userId)) throw "id is not a valid ObjectId";
    if (!ObjectId.isValid(productId)) throw "id is not a valid ObjectId";
    if (!await usersData.getUserById(ObjectId(userId))) throw 'No user Found';
    if (!await this.getProductById(ObjectId(productId))) throw "No Product Found";

    const deletionInfo = await productsCollection.deleteOne({ _id: ObjectId(productId) });
    if (deletionInfo.deletedCount === 0) {throw '';}
    await usersData.removeProductsInUsers(userId, productId);
    return { productDeleted: true };
  }, */

  //all set
  async createSession(productId, start, end, buyerLink, sellerLink){
    if (!productId) throw "productId must be provided";
    if (!ObjectId.isValid(productId)) throw "id is not a valid ObjectId";
    if (!start) throw "start time must be provided";
    if (!end) throw "end time must be provided";
    if (!buyerLink) throw "BuyerLink must be provided";
    if (!sellerLink) throw "SellerLink must be provided";



    var sessionAddInfo = {
      _id: ObjectId(),
      startTime: start,
      endTime: end,
      buyerLink: buyerLink,
      sellerLink: sellerLink,
      active: false
    }

    const productsCollection = await products();
    var productInfo = await this.getProductById(ObjectId(productId));
    productInfo.sessions.push(sessionAddInfo);

    var updateInfo = {
      sessions: productInfo.sessions
    }
    await productsCollection.updateOne({ _id: ObjectId(productId) }, { $set: updateInfo });


    return { sessionCreated: true }
  },

  async modifySession(sessionId){
    return;
  },
  
  /* async searchProduct(search_features){
    const productsCollection = await products();
    const productList = await productsCollection
    .find( { 'features.RAM' : '1023 MB' } )
    .toArray();
    return productList;
  }, */

  async addComment(userId, productId, comment_info){
    if (!userId) throw "userId must be provided";
    if (!productId) throw "productId must be provided";
    if (!comment_info.content) throw "comment content must be provided";
    if (!comment_info.rating) throw "comment rating must be provided";

    if (typeof comment_info.rating !== 'number') throw "comment rating must be number";
    if (comment_info.rating < 1 || comment_info.rating > 5) throw "rating is out of range (1-5)";

    const productsCollection = await products();
    if (!ObjectId.isValid(userId)) throw "id is not a valid ObjectId";
    if (!ObjectId.isValid(productId)) throw "id is not a valid ObjectId";
    if (!await usersData.getUserById(ObjectId(userId))) throw 'No user Found';
    if (!await this.getProductById(ObjectId(productId))) throw "No Product Found";

    const userInfo = await usersData.getUserById(ObjectId(userId));
    var productInfo = await this.getProductById(ObjectId(productId));

    var commentAddInfo = {};
    commentAddInfo._id = userInfo._id.toString();
    commentAddInfo.username = userInfo.username;
    commentAddInfo.content = comment_info.content;
    commentAddInfo.rating = comment_info.rating;

    new_overall_score = (productInfo.overall_score * productInfo.comments.length + comment_info.rating)/(productInfo.comments.length + 1);
    productInfo.comments.push(commentAddInfo);

    var updateInfo = {
      comments: productInfo.comments,
      overall_score: new_overall_score
    }
    await productsCollection.updateOne({ _id: ObjectId(productId) }, { $set: updateInfo });
    return { commentAdded: true };
  },

  async getProductBySession(sessionId){
    const productsCollection = await products();
    try{
      productInfo = await productsCollection.find(
        {'sessions._id': { $eq: ObjectId(sessionId) }},
        { projection: { _id: 1, sessions: 1} 
      }).toArray();
      if (productInfo.length === 0) throw `session not found with id of ${sessionId}`;
      return productInfo[0]._id.toString();
    } catch (err) {
      throw err;
    }
  },
}

module.exports = exportedMethods;