var express=require('express');
var bodyParser=require('body-parser');
var app=express();
const { check, validationResult } = require('express-validator');
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
// app.use(bodyParser.urlencoded(extended:true));
app.use(bodyParser.json());

app.post('/newUser',[ 
   
    check('full_name','Name cannot be left blank enter minimum 5 characters')
        .isLength({ min: 5 }),
   
    check('email')
       .isEmail().withMessage('Please enter a valid email address')
       .trim()
       .normalizeEmail(),
       
    check('password')
       .isLength({ min: 6 }).withMessage('Password must be at least 6 chars long')
       .matches(/\d/).withMessage('Password must contain one number'),
       
  check('gender','Please select gender')
       .isLength({ min: 1 }),
    check('dob','Date of birth cannot be left blank')
       .isLength({ min: 1 }),
    
    check('country','Country cannot be left blank')
       .isLength({ min: 1 })
    
   ]

,function(req,res,next){
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        res.json({status:"error",message:errors.array()});
    }
    else{
        var details={
            full_name:   req.body.full_name,
            email:       req.body.email,
            password:    req.body.password, 
            dob:         req.body.dob, 
            country:     req.body.country, 
            gender:      req.body.gender, 

        };
    db.collection('users').insertOne(details, function(error,result){
        if(error)
        throw error;
        res.json(result);
        console.log({message:"user registered successfully"});
    });

    }
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

