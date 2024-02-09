const express=require('express')
const userRouts=express.Router()
const{UserModel,Blogging}=require('../model/model')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const {auth}=require("../middlewares/auth")
const cookieParser=require('cookie-parser')
userRouts.post('/signin',async(req,res)=>{
     try {
        const {userName,email,age,pass}=req.body
        bcrypt.hash(pass, 5,async function (err, hash) {
            if(err){
                res.send({msg:"error whill hashing the password"})
            }else{
                const user= new UserModel({userName,email,age,pass:hash})
                await user.save()
                res.status(200).send({msg:"resister successfull => Go to login"})
            }
        });
     } catch (error) {
        res.send(error)
     }
})

userRouts.post('/login',async(req,res)=>{
    const {email,pass}=req.body
    try {
        const user=await UserModel.findOne({email})
        if(user){
            bcrypt.compare(pass, user.pass, function(err, result) {
                if(result){
                    const token=jwt.sign({userId:user._id,userName:user.userName},"masai",{expiresIn:"1h"})
                    const reftoken=jwt.sign({userId:user._id,userName:user.userName},"school",{expiresIn:"7d"})
                    res.cookie('token',token,{httpOnly:true,maxAge:60*60*1000})
                    res.cookie('reftoken',reftoken,{httpOnly:true,maxAge:7*24*60*60*1000})
                    res.status(200).send({msg:"Loging successfull"})
                }
                else{
                    res.send({msg:"wrong password"})
                }
            });
        }else{
            res.send({msg:"wrong credential Resister first"})
        }
    } catch (error) {
        res.status(400).send(error)
    }
})

userRouts.get('/newtoken',(req,res)=>{
    const refstoken=req.cookies.reftoken
    jwt.verify(refstoken,"school",(err,decoded)=>{
        if(decoded){
            res.clearCookie('token')
           const token=jwt.sign({userName:decoded.userName,userId:decoded.userId},"masai",{expiresIn:"1h"})
           res.cookie('token',token,{httpOnly:true,maxAge:60*60*1000})
           res.status(200).send({token:token})
        }
        else{
            res.status(400).send({msg:"Login first",err})
        }
    })
})

userRouts.post('/add',auth,async(req,res)=>{
    try {
        const data=req.body
        const blog= new Blogging(data)
        await blog.save()
        res.status(200).send({msg:"blog posted successfull"})
    } catch (error) {
        res.status(400).send(error)
    }
})

userRouts.get('/blogs',auth,async(req,res)=>{
    try {
        const data=await Blogging.find()
        res.status(200).send(data)
    } catch (error) {
        res.status(400).send(error)
    }
})

userRouts.get('/myblogs',auth,async(req,res)=>{
    try {
        const data=await Blogging.find({userID:req.body.userID})
        res.status(200).send(data)
    } catch (error) {
        res.status(400).send(error)
    }
})

userRouts.patch('/update/:ID',auth,async(req,res)=>{
    const {ID}=req.params
    const updatedData=req.body
    try {
        const data=await Blogging.findOne({_id:ID})
        if(data.userID===req.body.userID){
             await Blogging.findByIdAndUpdate({_id:ID},updatedData)
            res.status(200).send({msg:"Your bloge has been updated"})
        }
       else{
           res.send({msg:"Your not authorize to update this blog"})
       }
       
    } catch (error) {
        res.status(400).send(error)
    }
})

userRouts.delete('/delete/:ID',auth,async(req,res)=>{
    const {ID}=req.params
        try {
            const data=await Blogging.findOne({_id:ID})
            if(data.userID===req.body.userID){
                await Blogging.findByIdAndDelete({_id:ID})
                res.status(200).send({msg:"Your bloge has been deleted"})
            }
           else{
               res.send({msg:"Your not authorize to delete this blog"})
           }
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports={userRouts}