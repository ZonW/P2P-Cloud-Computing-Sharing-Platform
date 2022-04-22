const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.users;
const products = mongoCollections.products;
const productsData = require('./products');
const bcryptjs = require('bcryptjs');
const ObjectId = require('mongodb').ObjectId;

const exportedMethods = {

  checkUsername(username){
    if (typeof username !== 'string') throw "username must be string";
    var username = username.trim();
  
    if (!/^[\d\w]+$/.test(username)) throw "username is not a valid string";
    if (username.length < 4) throw "username is not a valid string";
    return username.toLowerCase();
  },

  checkPassword(password){
    if (typeof password !== 'string') throw "password must be string";
    var password = password.trim();

    if (password.indexOf(' ') !== -1) throw "password is not a valid string";
    if (password.length < 6) throw "password is not a valid string";
    return password;
  },

  checkName(name){
    if (typeof name !== 'string') throw '';
    var name = name.trim();
    if (!/(^[A-Za-z]+$)/.test(name)) throw '';
    if (name.length < 2) throw "";
    return name.slice(0,1).toUpperCase() + name.slice(1).toLowerCase();
  },

  checkEmail(email){
    if (typeof email !== 'string') throw '';
    var email = email.trim();

  },

  checkPhone(phone){

  },

  checkZipCode(zipCode){

  },

  async getUserByName(username){
    const userCollection = await users();
    const username_lower = username.toLowerCase();
    const userInfo = await userCollection.findOne({ username: username_lower });
    if (!userInfo) return false;
    return userInfo;
  },

  async getUserById(userId){
    const userCollection = await users();
    const userInfo = await userCollection.findOne({ _id: ObjectId(userId) });
    if (!userInfo) return false;
    return userInfo;
  },

  async createUser(username, password){

    if (!username) throw "username must be provided";
    if (!password) throw "password must be provided";

    try {
      this.checkUsername(username);
    } catch (err) {
      throw err;
    }

    try {
      this.checkPassword(password);
    } catch (err) {
      throw err;
    }

    const saltRounds = 1;

    const _username_ = this.checkUsername(username);
    const _password_ = await bcryptjs.hash(password, saltRounds)

    const userCollection = await users();
    const userInfo = await this.getUserByName(_username_);
    
    if (userInfo) throw "there is already a user with that username";

    let newUser = {
      username: _username_,
      password: _password_
    };

    const newInsertInformation = await userCollection.insertOne(newUser);
    if (newInsertInformation.insertedCount === 0) throw 'Insert failed!';
    return { userInserted: true };

  },

  async checkUser(username, password){
    if (!username) throw "username must be provided";
    if (!password) throw "password must be provided";

    try {
      this.checkUsername(username);
    } catch (err) {
      throw err;
    }

    try {
      this.checkPassword(password);
    } catch (err) {
      throw err;
    }

    const _username_ = this.checkUsername(username);
    const userInfo = await this.getUserByName(_username_);

    if (!userInfo) throw "Either the username or password is invalid";
    const pass = await bcryptjs.compare(password, userInfo.password);
    if (!pass) throw "Either the username or password is invalid";

    return { authenticated: true }; 
  },

  async ModifyUserInformation(UserId, updatedInfo){
    const userCollection = await users();

    if (! this.getUserById(ObjectId(UserId))) throw "No User Found";
    const updatedInfoData = {};

    if (updatedInfo.email) {
      try {
        this.checkEmail(updatedInfo.email);
      } catch(err) {
        throw err;
      }
      updatedInfoData.contacts.email = this.checkEmail(updatedInfo.email);
    }

    if (updatedInfo.phone) {
      try {
        this.checkPhone(updatedInfo.phone);
      } catch(err) {
        throw err;
      }
      updatedInfoData.contacts.phone = this.checkEmail(updatedInfo.phone);
    }

    if (updatedInfo.city) {
      updatedInfoData.address.city = updatedInfo.city;
    }

    if (updatedInfo.status) {
      if (typeof updatedInfo.status !== 'string') throw '';
      if (updatedInfo.status.trim())
      updatedInfoData.address.status = updatedInfo.status;
    }

    if (updatedInfo.country) {
      updatedInfoData.address.country = updatedInfo.country;
    }

    if (updatedInfo.zipCode) {
      try {
        this.checkZipCode(updatedInfo.zipCode);
      } catch(err) {
        throw err;
      }
      updatedInfoData.address.zipCode = this.checkZipCode(updatedInfo.zipCode);
    }

    await userCollection.updateOne({ _id: ObjectId(UserId) }, { $set: updatedInfoData });

    return { userUpdated: true }; 
  },

  AddBuyingHistory(UserId, SessionId){
    return;
  },

  AddComment(UserId, ProductId, content, rating){
    return;
  }
  
}