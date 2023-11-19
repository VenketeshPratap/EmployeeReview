const mongoose = require('mongoose');

const uri = 'mongodb+srv://venketeshmall2:6yQ6de5NBvQVeGMg@cluster0.wov7ryi.mongodb.net/';

mongoose.connect(uri).then(()=>{
     console.log('Connected to Database: MongoDB Atlas');
 }).catch((err) => console.log("no connection " + err));

const db = mongoose.connection;
module.exports = db;