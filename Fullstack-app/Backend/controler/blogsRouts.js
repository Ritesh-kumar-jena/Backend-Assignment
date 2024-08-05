const express=require('express')
const{Blogging}=require('../model/model')
const { auth } = require('../middlewares/auth')
const blogsrouts=express.Router()

blogsrouts.use(auth)

blogsrouts.get('/',async(req,res)=>{
    try {
        const data=await Blogging.find()
        res.status(200).send(data)
    } catch (error) {
        res.status(400).send(error)
    }
})

blogsrouts.get('/myblogs',async(req,res)=>{
    try {
        const userID=req.body.userID
        const data=await Blogging.find({userID})
        res.status(200).send(data)
    } catch (error) {
        res.status(400).send(error) 
    }
})

blogsrouts.post('/add',async(req,res)=>{
    try {
        const data=req.body
        const blog=new Blogging(data)
        await blog.save()
        res.status(200).send({"msg":"your blogs added sucessfully",blog})
    } catch (error) {
        res.status(400).send(error)
    }
})

blogsrouts.patch('/update/:id',async(req,res)=>{
    const {id}=req.params
        const updateddata=req.body
    try {
        const  data=await Blogging.findOne({_id:id})
        if(data.userID===req.body.userID){
            await Blogging.findByIdAndUpdate({_id:id},updateddata)
            res.status(200).send({"msg":"your blogs has been updated sucessfully "})
        }
        else{
            res.status(200).send({"msg":"your not authorize to updated this blog "})
        }
    } catch (error) {
        res.status(400).send(error)
    }
})


blogsrouts.delete('/delete/:id',async(req,res)=>{
    const {id}=req.params
    try {
        const  data=await Blogging.findOne({_id:id})
        if(data.userID===req.body.userID){
            await Blogging.findByIdAndDelete({_id:id})
            res.status(200).send({msg:"your blogs has been delete successfull"})
    }
    else{
        res.status(200).send({"msg":"your not authorize to delete this blog "})
    }
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports={blogsrouts}