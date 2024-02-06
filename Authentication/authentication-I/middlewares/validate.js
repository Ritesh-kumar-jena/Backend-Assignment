const jwt=require('jsonwebtoken')
const validator=(req,res,next)=>{
    const {first_name,last_name,occupation,gender}=req.body
    if(!first_name || !last_name || !occupation || !gender){
       res.status(400).send({msg:"Missing user detalis"})
    }
    else{
      next()
    }
}
const validation=(req,res,next)=>{
   const {userName,email,pass}=req.body
   if(!userName||!email||!pass){
      res.status(400).send({msg:"Missing user detalis"})
   }
   else{
     next()
   }
}

const auth=(req,res,next)=>{
    const token=req.headers.authorization?.split(" ")[1]
   jwt.verify(token,'masai',(err,decoded)=>{
      if(err){
         res.status(400).send({"error":"login first",err})
      }
      else{
        next()
      }
   })
}
module.exports={validation,validator,auth}