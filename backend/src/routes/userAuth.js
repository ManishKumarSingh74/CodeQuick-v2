const express = require("express")
const authRouter = express.Router()
const {register,login,logout, adminRegister} = require('../controllers/userAuthent')
const userMiddleware = require("../middlewares/userMiddleware")
const adminMiddleware = require("../middlewares/adminMiddleware")

authRouter.post('/register',register)
authRouter.post('/login',login)
authRouter.post("/logout",userMiddleware,logout)
authRouter.post("/admin/register",adminMiddleware,adminRegister)
authRouter.get('/check',userMiddleware,(req,res)=>{

    const reply = {
        firstName: req.result.firstName,
        emailId: req.result.emailId,
        _id:req.result._id,
        role:req.result.role
    }

    res.status(200).json({
        user:reply,
        message:"Valid User"
    });
})


module.exports = authRouter