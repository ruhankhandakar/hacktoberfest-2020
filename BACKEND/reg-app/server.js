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
   
    check('full_name','Name cannot be left blank.')
        .isLength({ min: 5 }).withMessage('Name must be at least 5 chars long')
        .isAlpha().withMessage('Name must be only Alphabets')
        .not().isEmpty(),
    check('userName')
        .isLength({ min: 3}).trim()
        .withMessage('Username cannot be empty.')
        .matches(/^[a-zA-Z0-9_]+$/, 'i').withMessage('Username must be alphanumeric, and can contain underscores'),
    check('email')
       .isEmail().withMessage('Please enter a valid email address')
       .trim()
       .normalizeEmail()
       .custom(value => {
        return User.findByEmail(value).then(user => {
          if (user) {
            return Promise.reject('E-mail already in use. Please enter different Email id');
          }
        })
    }),
       
    check('password')
       .isLength({ min: 6, max:20 }).withMessage('Password must be between 6-20 chars long')
       .not().isIn(['password']).withMessage('Do not use a common word as the password')
       .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )(?=.*[^a-zA-Z0-9]).{8,}$/, 'i')
       .withMessage('Password must include one lowercase character, one uppercase character, a number, and a special character.'),
       
  check('gender','Please select gender')
       .isLength({ min: 1 })
       .not().isEmpty(),
    check('dob','Date of birth cannot be left blank')
       .isLength({ min: 1 })
       .not().isEmpty()
       .isISO8601().toDate(),
    
    check('country','Country cannot be left blank')
       .isLength({ min: 1 })
       .not().isEmpty()
    
   ]

,function(req,res,next){
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        res.json({status:"error",message:errors.array()});
    }
    else{
        var details={
            full_name:   req.body.full_name,
            userName:    req.body.userName,
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
app.put('/updateUser/:id', (req, res) => {
    db.collection('users').updateOne({ObjectId:(req.param.id)},{$set:req.body}, function(error,result){
        if(error)
        throw error;
        res.json(result);
        console.log("User details updated successfully")
    })
});
// delete particular user using id
app.delete('/deleteUser/:id', (req, res) => {
    db.collection('users').deleteOne({ObjectId:(req.param.id)},function(error,result){
        if(error) throw error;
        res.send("User deleted Successfully");
    });
    
});
app.listen(process.env.PORT||3000);

