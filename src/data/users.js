const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.users;
const products = mongoCollections.products;
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

  checkCity(city){
    if (typeof city !== 'string') throw '';
    var city = city.trim();
    if (!/(^[A-Za-z\ ]+$)/.test(city)) throw '';
    var cityStr = city.split(" ");    
    for(var i = 0; i<cityStr.length; i++){
      cityStr[i] = cityStr[i].slice(0,1).toUpperCase() + cityStr[i].slice(1).toLowerCase();
    }    
    return cityStr.join(" ");
  },

  checkState(state){
    if (typeof state !== 'string') throw '';
    var state = state.trim();
    if (!/(^[A-Za-z]+$)/.test(state)) throw '';

    return state.toUpperCase();
  },

  checkCountry(country){
    if (typeof country !== 'string') throw '';
    var country = country.trim();
    if (!/(^[A-Za-z]+$)/.test(country)) throw '';

    return country;
  },

  checkZipCode(zipCode){
    if (typeof zipCode !== 'string') throw '';
    var zipCode = zipCode.trim();
    if (zipCode.length !== 5) throw '';
    if (!/(^[0-9]+$)/.test(zipCode)) throw '';
    return zipCode;
  },

  async getUserByName(username){
    const usersCollection = await users();
    const username_lower = username.toLowerCase();
    const userInfo = await usersCollection.findOne({ username: username_lower });
    if (!userInfo) return false;
    return userInfo;
  },

  async getUserById(userId){
    const usersCollection = await users();
    if (!ObjectId.isValid(userId)) throw "id is not a valid ObjectId";
    const userInfo = await usersCollection.findOne({ _id: ObjectId(userId) });
    if (!userInfo) return false;
    return userInfo;
  },

  async createUser(username, password, first_name, last_name){

    if (!username) throw "username must be provided";
    if (!password) throw "password must be provided";
    if (!first_name) throw "firstname must be provided";
    if (!last_name) throw "lastname must be provided";


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

    try {
      this.checkName(first_name);
    } catch (err) {
      throw err;
    }

    try {
      this.checkName(last_name);
    } catch (err) {
      throw err;
    }

    const saltRounds = 10;

    const _username_ = this.checkUsername(username);
    const _password_ = await bcryptjs.hash(password, saltRounds)

    const usersCollection = await users();
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
        first_name: this.checkName(first_name),
        last_name: this.checkName(last_name)
      },
      contacts: {
        email: "",
        phone: ""
      },
      address: {
        city: "",
        state: "",
        country: "",
        zipCode: ""
      },
      orderSessionHistory: [],
      sellingServers: []
    };

    const newInsertInformation = await usersCollection.insertOne(newUser);
    if (newInsertInformation.insertedCount === 0) throw 'Insert failed!';
    return { userInserted: true };

  },

  async checkUserLogin(username, password){
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
    const usersCollection = await users();
    if (!ObjectId.isValid(userId)) throw "id is not a valid ObjectId";
    if (!await this.getUserById(ObjectId(userId))) throw "No User Found";

    const deletionInfo = await usersCollection.deleteOne({ _id: ObjectId(userId) });
    if (deletionInfo.deletedCount === 0) {throw '';}
    return { userDeleted: true };

  },

  async modifyUserInformation(userId, updatedInfo){
    const usersCollection = await users();
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
      try {
        this.checkCity(updatedInfo.city);
      } catch(err) {
        throw err;
      }
      if (!updatedInfoData.address) { updatedInfoData.address = {} };
      updatedInfoData.address.city = updatedInfo.city;
    }

    if (updatedInfo.state) {
      try {
        this.checkState(updatedInfo.state);
      } catch(err) {
        throw err;
      }
      if (!updatedInfoData.address) { updatedInfoData.address = {} };
      updatedInfoData.address.state = updatedInfo.state;
    }

    if (updatedInfo.country) {
      try {
        this.checkCountry(updatedInfo.country);
      } catch(err) {
        throw err;
      }
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

    await usersCollection.updateOne({ _id: ObjectId(userId) }, { $set: updatedInfoData });

    return { infoUpdated: true }; 
  },

  async addProductsInUsers(userId, productId){
    // won't be directly called. it will be called in productsData.createProduct()
    const usersCollection = await users();
    if (!ObjectId.isValid(userId)) throw "id is not a valid ObjectId";
    if (!ObjectId.isValid(productId)) throw "id is not a valid ObjectId";

    if (!await this.getUserById(ObjectId(userId))) throw "No User Found";

    updateProductData = {};
    var userInfo = await this.getUserById(ObjectId(userId));

    if (userInfo.sellingServers.indexOf(productId) == -1){
      userInfo.sellingServers.push(productId);
      updateProductData.sellingServers = userInfo.sellingServers;
    } else {
      throw 'exists';
    }

    await usersCollection.updateOne({ _id: ObjectId(userId) }, { $set: updateProductData });
    return { productInserted: true }; 
  },

  async removeProductsInUsers(userId, productId){
    // won't be directly called. it will be called in productsData.deleteProduct()
    const usersCollection = await users();
    if (!ObjectId.isValid(userId)) throw "id is not a valid ObjectId";
    if (!ObjectId.isValid(productId)) throw "id is not a valid ObjectId";

    if (!await this.getUserById(ObjectId(userId))) throw "No User Found";

    updateProductData = {};
    var userInfo = await this.getUserById(ObjectId(userId));

    const index = userInfo.sellingServers.indexOf(productId);
    if (index !== -1){
      userInfo.sellingServers.splice(index, 1);
      updateProductData.sellingServers = userInfo.sellingServers;
    } else {
      throw 'No product exists with id';
    }

    await usersCollection.updateOne({ _id: ObjectId(userId) }, { $set: updateProductData });
    return { productDeleted: true }; 
  },

  async addBuyingHistory(userId, sessionId){
    const usersCollection = await users();
    if (!ObjectId.isValid(userId)) throw "id is not a valid ObjectId";

    if (!await this.getUserById(ObjectId(userId))) throw "No User Found";
    purchaseData = {};

    if (!sessionId){
      throw '';
    } else {
      var userInfo = await this.getUserById(ObjectId(userId));
      if (!ObjectId.isValid(sessionId)) throw "id is not a valid ObjectId";
      if (userInfo.orderSessionHistory.indexOf(sessionId) == -1){
        userInfo.orderSessionHistory.push(sessionId);
        purchaseData.orderSessionHistory = userInfo.orderSessionHistory;
      } else {
        throw 'exists';
      }
    }
    await usersCollection.updateOne({ _id: ObjectId(userId) }, { $set: purchaseData });
    return { purchaseUpdated: true }; 
  }
}

module.exports = exportedMethods;