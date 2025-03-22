const mongoose=require('mongoose')
const express=require('express')
const { todo } = require('../Moddel/TodoModel')
const { auth } = require('../Middelware/auth')

const TodoRoutes=express.Router()

TodoRoutes.use(auth)

TodoRoutes.get('/getTodo',async(req,res)=>{
      try {
        const todos=await todo.find()
        res.status(200).send(todos)
      } catch (error) {
        res.status(400).send(error)
      }
})

TodoRoutes.post('/addTodo',async(req,res)=>{
    try {
        const data=req.body
        const newTodo=new todo(data)
        await newTodo.save()
        res.status(200).send({msg:"Todo add successfully",todo:newTodo})
    } catch (error) {
        res.status(400).send(error)
    }
})

TodoRoutes.patch("/updateTodo/:id",async(req,res)=>{
    try {
        const data=req.body
        const {id}=req.params
        const oldTodo=await todo.findOne({_id:id})
        if(oldTodo){
            await todo.findByIdAndUpdate({_id:id},data)
            res.status(200).send({msg:"Todo updated successfully"})
        }else{
            res.status(404).send("Todo not found.")
        }
    } catch (error) {
        res.status(400).send(error)
    }
})

TodoRoutes.delete("/deleteTodo/:id",async(req,res)=>{
    const {id}=req.params
    const oldTodo=await todo.findOne({_id:id})
    if(oldTodo){
      await todo.findByIdAndDelete({_id:id})
      res.status(200).send("Todo Deleted successfully")
    }else{
        res.status(404).send("Todo not found.")
    }

})

module.exports={TodoRoutes}