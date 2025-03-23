const mongoose =require('mongoose')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')
const express=require('express')
const { users } = require('../Moddel/userModel')

const userRoutes=express.Router()

userRoutes.post('/signIn',async(req,res)=>{
    try {
        const {name,email,pass}=req.body
        const oldUser=await users.findOne({email})
        if(oldUser){
            res.status(200).send("This email Id is allreday register.")
        }
        else{
            bcrypt.hash(pass,5,async(err,hash)=>{
                if(err){
                    res.status(400).send("something went wrong while hashing.")
                }
                else{
                    const newUser=new users({name,email,pass:hash})
                    await newUser.save()
                    res.status(200).send({msg:"user data register successfully",user:newUser})
                }
            })
        }
    } catch (error) {
        res.status(400).send(error)
    }
})


userRoutes.post("/login",async(req,res)=>{
    try {
        const {email,pass}=req.body
        const user=await users.findOne({email})
        if(user){
              bcrypt.compare(pass,user.pass,function(err,result){
                if(result){
                  const token=jwt.sign({id:user._id},"masai",{expiresIn:"1h"})
                  res.status(200).send({msg:"user login successfull",token:token})
                }else{
                    res.status(400).send("Wrong cradential")
                }
              })
        }else{
            res.status(404).send("user not found . plz signIn first.")
        }
        
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports={userRoutes}