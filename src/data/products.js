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

    if (!usersData.getUserById(ObjectId(userId))) throw '';


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

    return { productInserted: true };
  },  
  
  async deleteProduct(userId, ProductId){
    return;
  },

  async createSession(productId, start, end){
    return;
  },

  async modifySession(sessionId){
    return;
  },
  
  async searchProduct(features){
    return;
  }
  
}

module.exports = exportedMethods;