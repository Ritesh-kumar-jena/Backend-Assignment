const express=require('express')
const {UserModel, Blacklist}=require('../model/model')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const { userAuth } = require('../middlewares/userauth')

const userRouts=express.Router()

userRouts.post('/register',userAuth,async(req,res)=>{
    const {userName,email,age,pass}=req.body
    try {
        bcrypt.hash(pass,5,async function(err,hash){
            if(err){
                res.status(400).send({msg:"error while hashing the password"})
            }
            else{
                const user=new UserModel({userName,email,age,pass:hash})
                await user.save()
                res.status(200).send({msg:"user signin sucsessfully",user})
            }
        })
    } catch (error) {
        res.status(400).send(error)
    }
})

userRouts.post('/login',async(req,res)=>{
    try {
        const {email,pass}=req.body
        const user=await UserModel.findOne({email})
        if(user){
           bcrypt.compare(pass,user.pass,function(err,result){
                  if(result){
                     const token=jwt.sign({userID:user._id,userName:user.userName},"masai",{expiresIn:"1h"})
                    const reftoken=jwt.sign({userID:user._id,userName:user.userName},"masai",{expiresIn:"7d"})
                    res.status(200).send({"msg":"login sucsessfull","token":token,"reftoken":reftoken})
                  }
                  else{
                    res.status(200).send({"msg":"incorect password"})
                  }
           })
        }else{
            res.status(200).send({"msg":"incorect email ID"})
        }
    } catch (error) {
        res.status(400).send(error)
    }
})

userRouts.get('/logout',async(req,res)=>{
    try {
        const token=req.headers.authorization?.split(" ")[1]
        const reftoken=req.headers.refreshtoken
        if(token){
         const blocktoken=new Blacklist({token})
         await blocktoken.save()
         if(reftoken){
            const blockrefttoken=new Blacklist({reftoken})
         await blockrefttoken.save()
         }
         res.status(200).send({"msg":"logout sucsessfull"})
        }
        else{
            res.status(200).send({"msg":"plz login first"})
        }
    } catch (error) {
        res.status(400).send(error)
    }
})


module.exports={userRouts}