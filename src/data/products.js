const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.users;
const products = mongoCollections.products;
const usersData = require('./users');
const bcryptjs = require('bcryptjs');
const ObjectId = require('mongodb').ObjectId;

const exportedMethods = {

  async getProductById(productId){
    const productsCollection = await products();
    if (!ObjectId.isValid(productId)) throw "id is not a valid ObjectId";
    const productInfo = await productsCollection.findOne({ _id: ObjectId(productId) });
    if (!productInfo) return false;
    return productInfo;
  },

  async createProduct(userId, features, unitPrice){

    if (!userId) throw "userId must be provided";
    if (!features) throw "features must be provided";
    if (!unitPrice) throw "unitPrice must be provided";
    
    if (!await usersData.getUserById(ObjectId(userId))) throw 'No user Found';

    const productsCollection = await products();

    var newProduct = {
      features: {
        "SSD": "20 GB RAID-10",
        "RAM": "1024 MB",
        "CPU": "2x Intel Xeon",
        "Transfer": "1 TB/mo",
        "Link speed": "1 Gigabit",
        "locations": "Multiple"
      },
      status: true,
      unitPrice: unitPrice,
      sessions: [],
      comments: [],
      overall_score: 0
    }

    const newInsertInformation = await productsCollection.insertOne(newProduct);
    if (newInsertInformation.insertedCount === 0) throw 'Insert failed!';
    await usersData.addProductsInUsers(userId, newInsertInformation.insertedId.toString());
    return { productInserted: true };
  },  
  
  async deleteProduct(userId, productId){

    if (!userId) throw "userId must be provided";
    if (!productId) throw "productId must be provided";

    const productsCollection = await products();
    if (!ObjectId.isValid(userId)) throw "id is not a valid ObjectId";
    if (!ObjectId.isValid(productId)) throw "id is not a valid ObjectId";
    if (!await this.getProductById(ObjectId(productId))) throw "No Product Found";

    const deletionInfo = await productsCollection.deleteOne({ _id: ObjectId(productId) });
    if (deletionInfo.deletedCount === 0) {throw '';}
    await usersData.removeProductsInUsers(userId, productId);
    return { productDeleted: true };
  },

  async createSession(productId, start, end){
    return;
  },

  async modifySession(sessionId){
    return;
  },
  
  async searchProduct(features){
    return;
  },

  async addComment(userId, producctId, comment){
    return;
  }
  
}

module.exports = exportedMethods;