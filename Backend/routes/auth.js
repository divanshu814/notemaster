const express=require('express');
const User = require('../models/User');
const router=express.Router();
const {body, validationResult}= require('express-validator');
const bcrypt =require('bcryptjs');
var jwt =require('jsonwebtoken');
var fetchuser=require('../middleware/fetchuser')

const JWT_SECRET ='hello world'

// post is used instead of get because we need to store the data
// Here in square brackets we are using express validation for checking the inputs meets
// the specific requirements or not

// const errors =validationResult(req) will run the validations for given checks and then return the 
// array containing error messages
router.post('/createuser',[
    body('name', 'Enter a valid name').isLength({min: 3}),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Enter a valid password').isLength({min: 5})
], async (req,res)=>{

    let success=false;

// If  there are errors, return bad request and the errors
    const errors =validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
// #Check wheter the user with this email exits already

try{

    let user = await User.findOne({email: req.body.email});
    if(user){
        return res.status(400).json({success, error: "This email is already registered, try Logging In"})
    }
    // adding the salt to the password and creating a hash from it
    const salt=await bcrypt.genSalt(10);
    const secPass=await bcrypt.hash(req.body.password,salt);
    
    // Creates a new user
     user =await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass
    })
    // .then(user=>res.json(user));
    const data ={
        user:{
            id: user.id
        }
    }
    success=true;
    const authToken= jwt.sign(data,JWT_SECRET);
    res.json({success, authToken});
    
    // res.send(req.body);
}
catch(error){
    console.error(error.message);
    res.status(500).send("Some error occured");
}
})



// Route 2: Authenticate a user using post

router.post('/login',[
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
    
], async (req,res)=>{
// If  there are errors, return bad request and the errors
    const errors =validationResult(req);
    if(!errors.isEmpty()){
        return res.status(500).json({errors: errors.array()});
    }
    const {email,password}=req.body;
    try{
        
        
        // #Check whether the email id is registered
    let user =await User.findOne({email});
    let success=false;
    if(!user){
        success=false
        return res.status(400).json({success, error: "Please try to login with correct credentials"});
        
    }
    // Check if the password is correct
    const passwordCompare=await bcrypt.compare(password,user.password);
    if(!passwordCompare){
        success=false;
        return res.status(400).json({success,error: "please try to login with corect credentials"});
    }

    const data ={
        user:{
            id:user.id
        }
    }

    const authToken =jwt.sign(data,JWT_SECRET);
    success=true;
    res.json({success, authToken});

    
    // res.send(req.body);
}
catch(error){
    console.error(error.message);
    res.status(500).send("Some error occured");
}
})



router.post('/getuser', fetchuser, async (req,res)=>{
    try{
        let userId =req.user.id;
        const user =await User.findById(userId).select("-password");
        res.send(user);

    }catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");

    }
})


module.exports=router

