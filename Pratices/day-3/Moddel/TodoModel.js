const mongoose=require('mongoose')

const TodoSchema=mongoose.Schema({
    title:{type:String,required:true},
    status:{type:String,required:true}
},{versionKey:false})

const todo=mongoose.model("Todo",TodoSchema)

module.exports={todo}