const mongoose=require('mongoose')

const userSchema=mongoose.Schema({
    username:{type:String,required:true},
    email:{type:String,required:true},
    age:{type:Number,required:true},
    pass:{type:String,required:true}
},{versionKey:false})
const UserModel=mongoose.model('user',userSchema)

const bookSchema=mongoose.Schema({
    title:{type:String,required:true},
    author:{type:String,required:true},
    price:{type:Number,required:true},
    buyer:{type:String},
    buyerID:{type:String},
    buyingDate:{type:Date}

},{versionKey:false})
const Library=mongoose.model("library",bookSchema)

const blacklisting=mongoose.Schema({
   token:{type:String},
   reftoken:{type:String}
},{versionKey:false})

const Blacklisting=mongoose.model("BlacklistedToken",blacklisting)

module.exports={UserModel,Library,Blacklisting}