var express=require('express');
var bodyParser=require('body-parser');
var app=express();
const dotenv=require("dotenv");
dotenv.config();
//  mongodb atlas
var MongoClient = require("mongodb").MongoClient;
var url;
if(process.env.DB_URL) url=process.env.DB_URL;
else url = "mongodb://localhost:27017";
var db;
var ObjectId = require("mongodb").ObjectID;
MongoClient.connect(
  url,
  { useNewUrlParser: true, useUnifiedTopology: true },
  function(error, client) {
    if (error) throw error;
    db = client.db("userDb");
  }
);
// get details of of registered users
app.get('/', (req, res) => {
    db.collection('users').find({}).toArray(function(error,result){
        if(error)
        throw error;
        res.json(result);
    });
        
    });
// create new user
app.use(bodyParser.json());

app.post('/newUser',function(req,res){
    db.collection('users').insertOne(req.body, function(error,result){
        if(error)
        throw error;
        res.json(result);
    });
 });
//  update user details using id
app.put('/updateUser', (req, res) => {
    db.collection('users').updateOne({ObjectId:(req.query.id)},{$set:req.body}, function(error,result){
        if(error)
        throw error;
        res.json(result);
        console.log("User details updated successfully")
    })
});
// delete particular user using id
app.delete('/deleteUser', (req, res) => {
    db.collection('users').deleteOne({ObjectId:(req.query.id)},function(error,result){
        if(error) throw error;
        res.send("User deleted Successfully");
    });
    
});
app.listen(process.env.PORT||3000);

