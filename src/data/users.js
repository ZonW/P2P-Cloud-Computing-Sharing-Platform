const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.users;
const bcryptjs = require('bcryptjs');

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

  async getUserById(username){
    const userCollection = await users();
    const username_lower = username.toLowerCase();
    const userInfo = await userCollection.findOne({ username: username_lower });
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
    const userInfo = await this.getUserById(_username_);
    
    if (userInfo) throw "there is already a user with that username";

    let newUser = {
      username: _username_,
      password: _password_
    };

    const newInsertInformation = await userCollection.insertOne(newUser);
    if (newInsertInformation.insertedCount === 0) throw 'Insert failed!';
    return {userInserted: true};

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
    const userInfo = await this.getUserById(_username_);

    if (!userInfo) throw "Either the username or password is invalid";
    const pass = await bcryptjs.compare(password, userInfo.password);
    if (!pass) throw "Either the username or password is invalid";

    return { authenticated: true }; 
  },

  ModifyUserInformation(){
    return;
  },

  AddSellingHistory(UserId, SessionId){
    return;
  },

  AddBuyingHistory(UserId, SessionId){
    return;
  },

  AddComment(UserId, ProductId, content, rating){
    return;
  }
  
}