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

const blacklistigSchma=mongoose.Schema({
    token:{type:String},
    reftoken:{type:String}
},{versionKey:false})

const  Blacklist=mongoose.model("blacklistedToken",blacklistigSchma)

const commentSchma=mongoose.Schema({
    content:{type:String,required:true},
    blogID:{type:String},
    blogOwenerID:{type:String},
    comentOwenerID:{type:String},
    Date:{type:Date}
})

const Comment=mongoose.model("comment",commentSchma)

module.exports={UserModel,Blogging,Blacklist,Comment}