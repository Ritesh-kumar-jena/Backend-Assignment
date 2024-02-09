const cookieParser = require('cookie-parser')
const jwt=require('jsonwebtoken')

const auth=(req,res,next)=>{

    const token= req.cookies.token

    jwt.verify(token,"masai",(err,decoded)=>{
        if(err){
            res.status(400).send({msg:"Login first",err})
        }else{
            req.body.userID=decoded.userId
            req.body.userName=decoded.userName
            req.body.createdAt=Date.now()
            next()
        }
    })
}

module.exports={auth}