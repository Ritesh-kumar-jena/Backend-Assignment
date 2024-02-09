const path=require('path')
const {error}=require('console')
const express=require('express')
const cors=require('cors')
const dotenv=require('dotenv').config()
const port=process.env.port
const {connection}=require('./db')
const {userRouts}=require('./controler/routs')
const cookieParser=require('cookie-parser')
const app=express()

app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.get('/',(req,res)=>{
    res.status(200).send({msg: "Wellcom to my Blogging application"})
})

app.use("/users",userRouts)

app.listen(port,async()=>{

    try {
        await connection
        console.log(`server is running on port:${port} and connected to DataBase`)
    } catch (error) {
        console.log(error)
    }
})