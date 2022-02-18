const MongoClient = require("mongodb").MongoClient;
require('dotenv').config();
const bcrypt = require("bcrypt");
let db = null;
const saltRounds = 10;

//connect to mongo
MongoClient.connect(process.env.DATABASE_URL, { useUnifiedTopology: true }, function (err, client) {
  if(err) throw err;
  console.log("Connected successfully to db server!");

  //connect to myproject database
  db = client.db("myproject");
});

//create user account
function create(name, email, password) {
  return new Promise((resolve, reject) => {
    const collection = db.collection("users");
    const doc = { name, email, password, balance: 0 };
    bcrypt.hash(password, saltRounds, function (err, hash) {
      doc.password = hash;
      collection.insertOne(doc, { w: 1 }, function (err, result) {
        err ? reject(err) : resolve(doc);
      });
    });
  });
}

//login user account
async function login(email, password) {
  try {
    const user = await db.collection("users").findOne({ email });
    const result = await bcrypt.compare(password, user.password);
    return result ? user : { error: "invalid credentials" };
  } catch (err) {
    console.log("an errr==>>", err);
    return err;
  }
}

//deposit function
async function deposit(email, amount) {
 try {
   const user = await db.collection("users").findOneAndUpdate({email}, {$inc: {balance: amount}}, {new: true});
   console.log(user);
   return user;
 } catch (err) {
   console.log("an errr==>>", err);
   return err;
 }
}

//withdrawal function
async function withdraw(email, amount) {
  try {
    const user = await db.collection("users").findOneAndUpdate({email}, {$inc: {balance: -amount}}, {new: true})
    console.log(user);
    return user;
  } catch (err) {
    console.log("an errr==>>", err);
    return err;
  }
}

//balance
async function balance(email) {
  try {
    const user = await db.collection("users").findOne({email});
    const result = user.balance;
    console.log(result, "result")
    return result ? user : { error: "invalid email" };
  } catch (err) {
    console.log("an errr==>>", err);
    return err;
  }
}

//all users
function all() {
  return new Promise((resolve, reject) => {
    var customers = db
      .collection("users")
      .find()
      .toArray(function (err, docs) {
        err ? reject(err) : resolve(docs);
      });
  });
}

module.exports = { create, all, login, deposit, withdraw, balance };
