const jwt=require('jsonwebtoken')
const {Blacklist}=require('../model/model')

const auth=async(req,res,next)=>{
    try {
        const token=req.headers.authorization?.split(" ")[1]
        const blacklisted=await Blacklist.findOne({token})
        if(blacklisted){
            res.status(200).send({"msg":"plz login first"})
        }
        else{
            jwt.verify(token,"masai",(err,decoded)=>{
                if(decoded){
                    req.body.userID=decoded.userID
                    req.body.userName=decoded.userName
                    req.body.createdAt=Date.now()
                    next()
                }
                else{
                    res.status(200).send({"msg":"plz login first"}) 
                }
            })
        }
    } catch (error) {
        res.status(400).send(error)
    }
}
module.exports={auth}