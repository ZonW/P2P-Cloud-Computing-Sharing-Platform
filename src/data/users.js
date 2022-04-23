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
    if (password.indexOf(' ') !== -1) throw "password is not a valid string";
    if (password.length < 6) throw "password is not a valid string";
    return password;
  },

  checkName(name){
    if (typeof name !== 'string') throw '';
    var name = name.trim();
    if (!/(^[A-Za-z]+$)/.test(name)) throw '';
    if (name.length < 2) throw '';
    return name.slice(0,1).toUpperCase() + name.slice(1).toLowerCase();
  },

  checkEmail(email){
    if (typeof email !== 'string') throw '';
    var email = email.trim();
    if(email.match(/^\w+@\w+\.\w+$/i)){
      return email;
    } else {
      if (email.match(/^\w+@\w+\.\w+\.\w+$/i)){
        return email;
      }
      throw '';
    }
  },

  checkPhone(phone){
    if (typeof phone !== 'string') throw '';
    var phone = phone.trim();
    if (phone.length < 8) throw '';
    if (phone[0] !== '+' ) {
      if (!/(^[0-9]+$)/.test(phone)) throw '';
    } else {
      if (!/(^[0-9]+$)/.test(phone.slice(1))) throw '';
    }
    return phone;
  },

  checkZipCode(zipCode){
    if (typeof zipCode !== 'string') throw '';
    var zipCode = zipCode.trim();
    if (zipCode.length !== 5) throw '';
    if (!/(^[0-9]+$)/.test(zipCode)) throw '';
    return zipCode;
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
    if (!ObjectId.isValid(userId)) throw "id is not a valid ObjectId";
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
      password: _password_,
      TeamViewer_info: {
        client_id: "",
        client_secret: ""
      },
      name: {
        first_name: "",
        last_name: ""
      },
      contacts: {
        email: "",
        phone: ""
      },
      address: {
        city: "",
        status: "",
        country: "",
        zipCode: ""
      },
      orderSessionHistory: [],
      sellingServers: []
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

  async deleteUser(userId){
    const userCollection = await users();
    if (!ObjectId.isValid(userId)) throw "id is not a valid ObjectId";
    if (!await this.getUserById(ObjectId(userId))) throw "No User Found";

    const deletionInfo = await userCollection.deleteOne({ _id: ObjectId(userId) });
    if (deletionInfo.deletedCount === 0) {throw '';}
    return { userDeleted: true };

  },

  async modifyUserInformation(userId, updatedInfo){
    const userCollection = await users();
    if (!ObjectId.isValid(userId)) throw "id is not a valid ObjectId";
    if (!await this.getUserById(ObjectId(userId))) throw "No User Found";
    const updatedInfoData = {};

    if (updatedInfo.email) {
      try {
        this.checkEmail(updatedInfo.email);
      } catch(err) {
        throw err;
      }
      if (!updatedInfoData.contacts) { updatedInfoData.contacts = {} };
      updatedInfoData.contacts.email = this.checkEmail(updatedInfo.email);
    }

    if (updatedInfo.phone) {
      try {
        this.checkPhone(updatedInfo.phone);
      } catch(err) {
        throw err;
      }
      if (!updatedInfoData.contacts) { updatedInfoData.contacts = {} };
      updatedInfoData.contacts.phone = this.checkPhone(updatedInfo.phone);
    }

    if (updatedInfo.city) {
      if (!updatedInfoData.address) { updatedInfoData.address = {} };
      updatedInfoData.address.city = updatedInfo.city;
    }

    if (updatedInfo.status) {
      if (typeof updatedInfo.status !== 'string') throw '';
      if (updatedInfo.status.trim())
      if (!updatedInfoData.address) { updatedInfoData.address = {} };
      updatedInfoData.address.status = updatedInfo.status;
    }

    if (updatedInfo.country) {
      if (!updatedInfoData.address) { updatedInfoData.address = {} };
      updatedInfoData.address.country = updatedInfo.country;
    }

    if (updatedInfo.zipCode) {
      try {
        this.checkZipCode(updatedInfo.zipCode);
      } catch(err) {
        throw err;
      }
      if (!updatedInfoData.address) { updatedInfoData.address = {} };
      updatedInfoData.address.zipCode = this.checkZipCode(updatedInfo.zipCode);
    }

    await userCollection.updateOne({ _id: ObjectId(userId) }, { $set: updatedInfoData });

    return { infoUpdated: true }; 
  },

  async addBuyingHistory(userId, sessionId){
    const userCollection = await users();
    if (!ObjectId.isValid(userId)) throw "id is not a valid ObjectId";

    if (!await this.getUserById(ObjectId(userId))) throw "No User Found";
    PurchaseData = {};

    if (!sessionId){
      throw '';
    } else {
      var userInfo = await this.getUserById(ObjectId(userId));
      if (!ObjectId.isValid(sessionId)) throw "id is not a valid ObjectId";
      if (userInfo.orderSessionHistory.indexOf(sessionId) == -1){
        userInfo.orderSessionHistory.push(sessionId);
        PurchaseData.orderSessionHistory = userInfo.orderSessionHistory;
      } else {
        throw 'exists';
      }
    }
    await userCollection.updateOne({ _id: ObjectId(userId) }, { $set: PurchaseData });
    return { purchaseUpdated: true }; 
  },

  async addComment(userId, ProductId, content, rating){
    return;
  }
  
}

module.exports = exportedMethods;