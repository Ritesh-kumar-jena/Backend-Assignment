const express=require('express')
const{UserModel,Registraion}=require('../model/user_model')
const userRouts=express.Router()
const{validation,validator,auth}=require('../middlewares/validate')
const jwt=require("jsonwebtoken")

userRouts.post('/signin',validation,async(req,res)=>{
    try {
        const data=req.body
        const userData=new Registraion(data)
        await userData.save()
        res.send("user register successfull")
    } catch (error) {
        res.status(400).send({msg:error})
        
    }
})


userRouts.post('/login',async(req,res)=>{
    const {email,pass}=req.body
    try {
        const user=await Registraion.find({email:email,pass:pass})
          if(user){
            var token = jwt.sign({ cours: 'cap_auth' }, 'masai',{expiresIn:'1h'})
            res.status(200).send({msg:"Login successfull",token:token})
          }else{
            res.status(200).send({msg:"Signin first or wrong credential "})
          }
         
    } catch (error) {
        res.status(400).send(error)
    }
})

userRouts.use(auth)

userRouts.post('/add',validator,async(req,res)=>{
    try {
        const data=req.body
        const user=new UserModel(data)
        await user.save()
        res.send("data added successfull")
    } catch (error) {
        res.status(400).send({msg:"login first",error})
    }
})

userRouts.get('/detalis',async(req,res)=>{
    try {
        const data=await UserModel.find()
        res.status(200).send(data)
    } catch (error) {
        res.status(400).send({msg:"login first",error})
    }
})

userRouts.patch('/update/:userID',async(req,res)=>{
    const {userID}=req.params
    const data=req.body
    try {
        await UserModel.findByIdAndUpdate({_id:userID},data)
        res.status(200).send({msg:"user data has been updated"})
    } catch (error) {
        res.status(400).send({msg:"login first",error})
    }
})

userRouts.delete('/delete/:userID',async(req,res)=>{
    const {userID}=req.params
    try {
        await UserModel.findByIdAndDelete({_id:userID})
        res.status(200).send({msg:"user data has been deleted"})
    } catch (error) {
        res.status(400).send({msg:"login first",error})
    }
})
module.exports={userRouts}