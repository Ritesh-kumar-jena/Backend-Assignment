const mongoose=require('mongoose')

const userSchema=mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    pass:{type:String,required:true}
},{versionKey:false})


const users=mongoose.model("TodoUser",userSchema)

module.exports={users}