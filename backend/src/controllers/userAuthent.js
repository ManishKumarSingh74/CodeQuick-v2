const validate = require("../utils/validators")
const bcrypt = require("bcrypt")
const User = require("../models/user")
const jwt = require('jsonwebtoken')
const redisClient = require("../config/redis")


const register =async (req,res)=>{
    try{
        
        validate(req.body)
        const {firstName ,emailId,password} = req.body
        
         if (!firstName || !emailId || !password) {
            return res.status(400).json({ message: "Missing fields" });
  }
        req.body.password = await bcrypt.hash(password,10)
       
        req.body.role = 'user'
        const user = await User.create(req.body)
        
        const token = jwt.sign({_id:user._id,emailId:emailId,role:'user'},process.env.SECRET_KEY,{expiresIn:60*60})
        
        const reply = {
            firstName: user.firstName,
            emailId: user.emailId,
            _id: user._id,
            role: user.role
        }

        res.cookie('token',token,{maxAge:60*60*1000})
        
        res.status(201).json({
            user:reply,
            message:"Loggin Successfully"
        })
    }
    catch(err){
        res.status(400).send("Error : "+err.message)
    }
}

const login = async(req,res)=>{
    
    try{
        const {email:emailId,password} = req.body
        console.log(req.body)
    if(!emailId)
        
        throw new Error("Invalid Credentials")
    if(!password)
        throw new Error("invalid credentials")

    const user = await User.findOne({emailId})
    const match =await bcrypt.compare(password,user.password)
    

    if(!match){
        throw new Error("invalid credentials")
    }

    const token = jwt.sign({_id:user._id,emailId:emailId,role:user.role},process.env.SECRET_KEY,{expiresIn:60*60})
    const reply = {
            firstName: user.firstName,
            emailId: user.emailId,
            _id: user._id,
            role: user.role
        }
    res.cookie("token",token,{maxAge:60*60*1000})
    res.status(201).json({
            user:reply,
            message:"Loggin Successfully"
        })
    }
    catch(err){
        res.status(401).send("Error : "+err)
    }
    
}

const logout = async (req,res)=>{
    try{
        const {token} = req.cookies
        const payload = jwt.decode(token)

        await redisClient.set(`token:${token}`,'Blocked')
        await redisClient.expireAt(`token:${token}`,payload.exp)

        res.cookie("token",null,{expires:new Date(Date.now())})

        // res.clearCookie("token")
        // console.log("here")
        res.send("Logged Out Succesfully");
    }
    catch(err){
        res.status(503).send("Error : "+err)
    }
}


const adminRegister = async (req,res)=>{
    try{
        validate(req.body)
        const {firstName ,emailId,password} = req.body

        req.body.password = await bcrypt.hash(password,10)
        const user = await User.create(req.body)

        const token = jwt.sign({_id:user._id,emailId:emailId,role:user.role},process.env.SECRET_KEY,{expiresIn:60*60})
        res.cookie('token',token,{maxAge:60*60*1000})
        res.status(201).send("User registerd Successfully")
    }
    catch(err){
        res.send("Error : "+err)
    }
}

const deleteProfile = async(req,res)=>{
  
    try{
       const userId = req.result._id;
      
    // userSchema delete
    await User.findByIdAndDelete(userId);
    
    // await Submission.deleteMany({userId});
    
    res.status(200).send("Deleted Successfully");

    }
    catch(err){
        res.status(500).send("Internal Server Error");
    }
}

module.exports = {register,login,logout,adminRegister,deleteProfile}