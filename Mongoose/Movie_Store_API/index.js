const {error}=require("console")
const path=require('path')
const express=require('express')
const port=8080;
const {connection,MovieModel}=require('./db')
const cors=require('cors')

const app= express()
app.use(express.json())
app.use(cors())

app.post('/addMovie',async(req,res)=>{
    const data=req.body
    const movie= new MovieModel(data)
    await movie.save()
    res.send({msg:"Movie added successfully"})
})
app.get('/IMDB',async(req,res)=>{
    const q=req.query
    try {
        const movies= await MovieModel.find(q)
    res.send(movies)
    } catch (error) {
        res.send({"msg":error})
    }
    
})

app.get('/movies',async(req,res)=>{
try {
    const {q}=req.query
    const data=await MovieModel.find({title: { $regex: q, $options: 'i' }})
    res.send(data)
} catch (error) {
    res.send({"msg":error})
}
})
app.get('/moviesRating',async(req,res)=>{
    try {
        const{q}=req.query
        const data=await MovieModel.find({rating:q})
        res.send(data)
    } catch (error) {
        res.send({"msg":error})

    }
})
app.get('/moviesGenre',async(req,res)=>{
    try {
        const {q}=req.query
      const data=await MovieModel.find({genre:{ $regex: q, $options: 'i' }})
      res.send(data)
    } catch (error) {
        res.send({"msg":error})
    }

})

app.get('/moviePage',async(req,res)=>{
    const {pageNumber}=req.query
     const pageLimit=5
     const Limit=pageLimit
   const  Skip=(pageNumber-1)*Limit
    try {
        const movies= await MovieModel.find().skip(Skip).limit(Limit)
        res.send(movies)
    } catch (error) {
        res.send({"msg":error})
    }
})
app.patch('/updateMovie/:movieId',async(req,res)=>{
    const{movieId}=req.params
    const data=req.body
    try {
    await MovieModel.findByIdAndUpdate({_id:movieId},data)
    res.send({"msg":"Data has been updated"})
    } catch (error) {
        res.send({"msg":error})
    }
    
})
app.delete("/deletMovie/:movieId",async(req,res)=>{
    try {
        const{movieId}=req.params
        await MovieModel.findByIdAndDelete({_id:movieId})
        res.send({"msg":"Data has been Deleted"})
    } catch (error) {
        res.send({"msg":error})
    }
})
app.listen(port, async()=>{
    try {
        await connection
        console.log("connected to DataBase")
        console.log(`server running on port${port}`)
    } catch (error) {
        console.log(error)
    }
})