const mongoose=require('mongoose')

const userSchema=mongoose.Schema({
    userName:{type:String,required:true},
    email:{type:String,required:true},
    age:{type:Number,required:true},
    pass:{type:String,required:true}
},{versionKey:false})

const UserModel=mongoose.model("user",userSchema)

const blogeSchema=mongoose.Schema({
    title:{type:String,required:true},
    content:{type:String,required:true},
    userID:{type:String},
    userName:{type:String},
    createdAt: {type: Date}
},{versionKey:false})

const  Blogging=mongoose.model("blog",blogeSchema)
module.exports={UserModel,Blogging}
