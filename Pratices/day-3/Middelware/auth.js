 const jwt=require('jsonwebtoken')
const { users } = require('../Moddel/userModel')
 
const auth=(req,res,next)=>{
    try {
        if(req.headers.authorization){
            const token=req.headers.authorization?.split(' ')[1]
            if(token){
                jwt.verify(token,"masai",async(err,decoded)=>{
                    if(decoded){
                        const userId=decoded.id
                        const user=await users.findOne({_id:userId})
                        if(user){
                              req.userData=user
                              next()
                        }else{
                            res.status(404).send('user not found in auth middelware')
                        }
                    }
                })
            }else{
                res.status(404).send('Token missing . plz login first.')
            }
        }else{
            res.status(404).send("Token is missing. plz login first.")
        }
    } catch (error) {
        res.status(400).send(error)
    }
        
}

module.exports={auth}