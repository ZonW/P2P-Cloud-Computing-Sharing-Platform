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
  
  //all set
  async createProduct(userId, name, description, operatingSystem, features, unitPrice, location){
    if (!userId) throw "userId must be provided";
    if (!name) throw "Name must be provided"
    if (!description) throw "Description must be provided"
    if (!operatingSystem) throw "OS must be provided"
    if (!features) throw "features must be provided";
    if (!unitPrice) throw "unitPrice must be provided";
    if (!location) throw "location must be provided";
    
    if (!await usersData.getUserById(ObjectId(userId))) throw 'No user Found';

    const productsCollection = await products();

    var newProduct = {
      name: name,
      description: description,
      operatingSystem: operatingSystem,
      features: {},
      status: true,
      time: time,
      unitPrice: unitPrice,
      location: location,
      sessions: [],
      comments: [],
      buyerNumber: 0,
      rating: 0
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
      active: true
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
  
  async searchProduct(search_features){
    const productsCollection = await products();
    const productList = await productsCollection
    .find( { 'features.RAM' : '1023 MB' } )
    .toArray();
    return productList;
  },

  async addComment(userId, productId, comment_info){
    if (!userId) throw "userId must be provided";
    if (!productId) throw "productId must be provided";
    if (!comment_info) throw "comment must be provided";
    if (!comment_info.content) throw "comment content must be provided";
    if (!comment_info.rating) throw "comment rating must be provided";

    if (typeof comment_info.content !== 'string') throw "comment content must be string";
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
  }
}

module.exports = exportedMethods;