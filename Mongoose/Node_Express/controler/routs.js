const express=require("express")
const {BookStore}=require('../model/bookModel')
const bookRouter=express.Router()

const validator=(req,res,next)=>{
    const {title,author,ISBN}=req.body
    if(!title || !author || !ISBN){
      res.status(400).send({msg:"Missing book detalis"})
    }else{
        next()
    }
}


bookRouter.post('/add',validator,async(req,res)=>{
    try {
        const data=req.body
        const book= new BookStore(data)
        await book.save()
        res.send({msg:"The book has been added"})
    } catch (error) {
        res.send(error)
    }
   
})

bookRouter.get('/search',async(req,res)=>{
    const {title,author}=req.query
    try {
        if(title&&!author){
                const data= await BookStore.find({title:{$regex:title,$options:'i'}})
                if(data.length===0){
                    res.status(400).send({msg:"invalid query"})
                }else{
                    res.send(data)
                }    
        }
        else if(author&&!title){
            const data= await BookStore.find({author:{$regex:author,$options:'i'}})
            if(data.length===0){
                res.status(400).send({msg:"invalid query"})
            }else{
                res.send(data)
            }
        }
        else if(title&&author){
            const data= await BookStore.find({$and:[{title:{$regex:title,$options:'i'}},{author:{$regex:author,$options:'i'}}]})
            if(data.length===0){
                res.status(400).send({msg:"invalid query"})
            }else{
                res.send(data)
            }
        }
        
    } catch (error) {
        res.status(400).send({error:error})
    }
})

bookRouter.patch('/update/:id',async(req,res)=>{
    const {id}=req.params
    const data=req.body
    try {
    await BookStore.findByIdAndUpdate({_id:id},data)
    res.send({msg:"The book details have been updated"})
    } catch (error) {
        res.status(400).send({error:error})
    }
})
bookRouter.delete('/delete/:id',async(req,res)=>{
    const {id}=req.params
    try {
       await BookStore.findByIdAndDelete({_id:id}) 
       res.send({msg:"The book has been deleted"})
    } catch (error) {
        res.status(400).send({error:error})
    }
})

module.exports={bookRouter}