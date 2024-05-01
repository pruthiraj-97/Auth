const User=require('./model')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
exports.signUp=async (req,res)=>{
    try {
        const {email,password}=req.body
        console.log(email,password)
        if(!email||!password){
            return res.status(404).send('enter email id and password')
        }
        const userExist=await User.findOne({email})
        if(userExist){
           return res.send('user already exist')
        }
        const hashPassword=bcrypt.hashSync(password,10)
        const user=await User.create({
            email,
            password:hashPassword
        })
        return res.status(200).send(user)
    } catch (error) {
        return res.status(500).send(error)
    }
}
exports.forgotPassword=async (req,res)=>{
    try {
        const {email,password}=req.body
        if(!email||!password){
            return res.status(404).send('enter email id and password')
        }
        const user=await User.findOne({email})
        if(!user){
            return res.status(404).send('enter valid email id')
        }
        const hashPassword=bcrypt.hashSync(password,10)
        await User.updateOne({email:email},{
        $set:{
            password:hashPassword
        }
        })
        return res.status(200).send('password changed successfully')
        
    } catch (error) {
        return res.status(500).send(error)
    }
}
exports.login=async (req,res)=>{
    try {
        const {email,password}=req.body
        if(!email||!password){
            return res.status(404).send('enter email id and password')
        }
        const userExist=await User.findOne({email})
        if(!userExist){
            return res.status(404).send('enter valid email id')
        }
        const hashPassword=userExist.password
        const result=bcrypt.compare(password,hashPassword)
        if(!result){
            return res.status(404).send('enter valid password')
        }
        const payload={
            email:userExist.email,
            password:userExist.password
        }
        const token=jwt.sign(payload,'jwt',{
            expiresIn:'1h'
        })
        return res.status(200).json({
            message:'login successful',
            token
        })
    } catch (error) {
        return res.status(500).send(error)
    }
}