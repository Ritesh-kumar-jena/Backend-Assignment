const mongoose =require('mongoose')

const bookScema=mongoose.Schema({
    title:{type:String,required:true},
    author:{type:String,required:true},
    ISBN:{type:Number,required:true}

},{versionKey:false})

const BookStore=mongoose.model("book",bookScema)
module.exports={BookStore}