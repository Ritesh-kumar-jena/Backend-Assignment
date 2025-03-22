const mongoose=require('mongoose')
const express=require("express")
const { connect } = require('./db')
const { TodoRoutes } = require('./Controller/TodoRoutes')
const { userRoutes } = require('./Controller/userRoutes')



const port=3000

const app=express()

app.use(express.json())


app.get("/",(req,res)=>{
    try {
        res.status(200).send("wellcome to backend CURD")
    } catch (error) {
        res.status(400).json(error)
    }
})

app.use("/todo",TodoRoutes)
app.use('/users',userRoutes)


app.listen(port,async()=>{
    try {
        await connect
        console.log(`server is running on port:-${port} and connected to database`)
    } catch (error) {
        console.log(error)
    }
})