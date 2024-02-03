const {error}=require('console')
const path=require('path')
const cors=require('cors')
const express=require('express')
const port=3000
const {connection}=require('./db')
const {BookStore}=require('./model/bookModel')
const {bookRouter}=require('./controler/routs')

const app=express()
app.use(express.json())
app.use(cors())



app.get('/',(req,res)=>{
    res.send("WELCOME TO BOOKSTORE MANAGEMENT SYSTEM")
})

app.get('/books',async(req,res)=>{
    try {
        const data= await BookStore.find()
         res.send(data)
    } catch (error) {
        res.send({msg:"invalid endpoints"})
    }
})
app.use("/books",bookRouter)
app.use((req,res)=>{
    res.status(400).send({msg:"invalid endpoints"})
})
app.listen(port,async()=>{
    try {
        await connection
        console.log("connected to DataBase")
        console.log(`server running on port ${port}`)
    } catch (error) {
        console.log(error)
    }
})