const path=require('path')
const {error}=require('console')
const express=require('express')
const cors=require('cors')
const jwt=require('jsonwebtoken')
const dotenv=require('dotenv').config()
const port=process.env.port
const {connection}=require('./db')
const {Blogging,Blacklist} = require('./model/model')
const { blogsrouts } = require('./controler/blogsRouts')
const { userRouts } = require('./controler/userRouts')


const app=express()
app.use(express.json())
app.use(cors())

app.get('/',(req,res)=>{
    res.status(200).send("Wellcom to Blogs application")
})

app.get('/newtoken',async(req,res)=>{
    try {
        const token=req.headers.authorization?.split(" ")[1]
        const reftoken=req.headers.refreshtoken
        const blockreftoken=await Blacklist.findOne({reftoken})
        if(blockreftoken){
            res.status(400).send({"msg":"plz login first"})
        }
        else{
            jwt.verify(reftoken,"masai",async(err,decoded)=>{
                if(decoded){
                    const oldtoken=new Blacklist({token})
                    await oldtoken.save()
                  const newToken=  jwt.sign({userID:decoded._id,userName:decoded.userName},"masai",{expiresIn:"1h"})
                  res.status(200).send({newToken:newToken,reftoken:reftoken})
                }
                else{
                    res.status(400).send({"msg":"plz login first",err})
                }
            })
        }
    } catch (error) {
        res.status(400).send(error)
    }
})

app.use('/users',userRouts)
app.use('/blogs',blogsrouts)

app.listen(port,async()=>{

    try {
        await connection
        console.log(`server is running on port:-${port} and connected to DB`)
    } catch (error) {
       console.log(error) 
    }

})











