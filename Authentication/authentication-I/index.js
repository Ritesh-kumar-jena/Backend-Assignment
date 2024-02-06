const {error}=require('console')
const path=require('path')
const cors=require('cors')
const express=require('express')
const dotenv=require("dotenv").config()
const port=process.env.port
const{connection}=require("./db")
const {userRouts}=require('./controler/routs')

const app =express()

app.use(express.json())
app.use(cors())

app.get('/',(req,res)=>{
    res.status(200).send("Wellcome to home page")
})
app.use("/users",userRouts)



app.listen(port,async()=>{
    try {
        await connection
        console.log("connected to DataBase")
        console.log(`server running on port ${port}`)
    } catch (error) {
        console.log(error)
    }
})