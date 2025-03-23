const mongoose =require("mongoose")
const dotenv=require('dotenv').config()

const connect=mongoose.connect(process.env.MongoUrl)

module.exports={connect}