const express=require('express')
const{UserModel}=require('../model/model')

const userAuth=async(req,res,next)=>{
try {
    const email=req.body.email
    const pass=req.body.pass
    let hasNumber=false
    let Upercase=false
    let lengthMoreThan8=false 
    let hasSpecial=false
    let specialCharacters = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
    const userdata=await UserModel.findOne({email})
    if(userdata){
        res.status(200).send({"msg":"This email ID already registered"})
    }
    else{
       for(var i=0;i<pass.length;i++){
        if(pass[i]!==pass[i].toLowerCase()){
            Upercase=true
        } 
        if(!isNaN(parseInt(pass[i]))){
            hasNumber=true
        }
        if(specialCharacters.test(pass[i])){
            hasSpecial=true
        
        }
        if(pass.length>=8){
            lengthMoreThan8=true
        
        }
    }
    !Upercase ? res.status(200).send({msg:"At least one uppercase character"}) :!hasNumber ? res.status(200).send({msg:"At least one number"}):!hasSpecial ? res.status(200).send({msg:"At least a special character"}):!lengthMoreThan8 ? res.status(200).send({msg:"The length of password should be at least 8 characters long "}):next()
}
} catch (error) {
    res.status(400).send({error})
    
}
}

module.exports={userAuth}