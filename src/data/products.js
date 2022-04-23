const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.users;
const bcryptjs = require('bcryptjs');


const exportedMethods = {

  CreateProduct(UserId, features){
    return;
  },  
  
  DeleteProduct(UserId, ProductId){
    return;
  },

  CreateSession(ProductId, start, end){
    return;
  },

  ModifySession(SessionId){
    return;
  },
  
  SearchProduct(features){
    return;
  }
  
}

module.exports = exportedMethods;