const express=require('express')
const cookieParser=require('cookie-parser')
const bcrypt=require('bcrypt')
const {UserModel,Library,Blacklisting}=require('../model/bookModel')
const userRouts=express.Router()
const mangoose=require('mongoose')
const jwt=require('jsonwebtoken')
const { model } = require('mongoose')
const {auth}=require('../middleware/auth')

userRouts.post('/signin',async(req,res)=>{

    try {
        const {username,email,age,pass}=req.body
        bcrypt.hash(pass,5,async function(err,hash){
           if(err){
            res.send({msg:"error whill hashing the password"})
           }
           else{
            const user=new UserModel({username,email,age,pass:hash})
            await user.save()
            res.status(200).send({msg:"Your registration successfull=>go to login page"})
           }
        })
    } catch (error) {
        res.status(400).send({error:error})
    }
})

userRouts.post('/login',async(req,res)=>{
    const {email,pass}=req.body
    try {
        const user= await UserModel.findOne({email})
    if(user){
        bcrypt.compare(pass,user.pass,function(err,result){
          if(result){
            const token=jwt.sign({userID:user._id,username:user.username},"masai",{expiresIn:"1h"})
            res.cookie('token',token,{httpOnly:true,maxAge:60*60*1000})
            const reftoken=jwt.sign({userID:user._id,username:user.username},"school",{expiresIn:"1h"})
            res.cookie('reftoken',reftoken,{httpOnly:true,maxAge:7*24*60*60*1000})
            res.send({msg:"login successfull"})
          }else{
            res.send({msg:"wrong password"})
          }
        })
    }else{
        res.send({msg:"plz sigin first wrong email"})
    }
    } catch (error) {
       res.status(400).send(error)
    }   
})
userRouts.get('/logout',async(req,res)=>{
     try {
        const token=req.cookies.token
        const reftoken=req.cookies.reftoken
        const BlacklistedToken=new Blacklisting({token,reftoken})
        await BlacklistedToken.save()
        res.status(200).send({msg:"logout successfull"})
     } catch (error) {
       res.status(400).send(error)
     }
})
userRouts.get('/newtoken',async(req,res)=>{
    try {
        const reftoken=req.cookies.reftoken
        const block=await Blacklisting.findOne({reftoken})
        if(block){
            res.send({msg:"plz login first"})
        }else{
            if(reftoken){
                jwt.verify(reftoken,'school',async(err,decoded)=>{
                    if(decoded){
                       const token=req.cookies.token
                     const oldtoken=new Blacklisting({token})
                     await oldtoken.save()
                     res.clearCookie("token")
                     const newtoken=jwt.sign({username:decoded.username,userID:decoded.userID},"masai",{expiresIn:"1h"})
                     res.cookie('token',newtoken,{httpOnly:true,maxAge:60*60*1000})
                     res.send({masg:token})
                    }
                    else{
                        res.send({err:err})
                    }
                })
            }
        }           

    } catch (error) {
        res.send({error:error})
    }
})
userRouts.post('/add',auth,async(req,res)=>{
    try {
        const data=req.body
        const book=new Library(data)
        await book.save()
        res.status(200).send({msg:"your book has been add"})
    } catch (error) {
        res.status(400).send(error)
    }
})

userRouts.get("/mybooks",auth,async(req,res)=>{
    try {
        const data=await Library.find({buyerID:req.body.buyerID})
        res.status(200).send(data)
    } catch (error) {
        res.status(400).send(error)
    }
})

userRouts.patch('/update/:ID',auth,async(req,res)=>{
    const {ID}=req.params
    const update=req.body
    try {
        const data=await Library.findOne({_id:ID})
        if(req.body.buyerID===data.buyerID){
           await Library.findByIdAndUpdate({_id:ID},update)
           res.status(200).send({msg:"your book has been updated"})
        }else{
            res.send({msg:"you are not authorize to update this data"})
        }
    } catch (error) {
        res.status(400).send(error)
    }
})

userRouts.delete('/delete/:ID',auth,async(req,res)=>{
    const {ID}=req.params
    try {
        const data=await Library.findOne({_id:ID})
        if(req.body.buyerID===data.buyerID){
           await Library.findByIdAndDelete({_id:ID})
           res.status(200).send({msg:"your book has been deleted"})
        }else{
            res.send({msg:"you are not authorize to delete this data"})
        }
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports={userRouts}