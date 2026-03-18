const jwt = require("jsonwebtoken")
const User = require("../models/user")
const redisClient = require("../config/redis")

const userMiddleware = async (req,res,next)=>{
    try{
        const {token} = req.cookies
        if(!token){
            throw new Error("token is not present")
        }

        const payload = jwt.verify(token,process.env.SECRET_KEY)
        const {_id} = payload

        if(!_id){
            throw new Error("Invalid token")
        }

        const result = await User.findById(_id)

        if(!result){
            throw new Error("User doest not exist")
        }

        const isBlocked = await redisClient.exists(`token:${token}`)
        if(isBlocked){
            throw new Error("Invalid token")
        }

        req.result = result

        next()

    }
    catch(err){
        res.status(401).send("Error : "+ err.message)
    }
}

module.exports = userMiddleware