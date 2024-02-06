const mongoose=require('mongoose')

const userSchema=mongoose.Schema({
    first_name:{type:String,required:true},
    last_name:{type:String,required:true},
    occupation:{type:String,required:true},
    gender:{type:String,required:true}
       
},{versionKey:false})
const UserModel=mongoose.model("data",userSchema)


const registraionSchma=mongoose.Schema({
    userName:{type:String,required:true},
    email:{type:String,required:true},
    pass:{type:String,required:true}
},{versionKey:false})
const Registraion=mongoose.model("user",registraionSchma)
module.exports={UserModel,Registraion}