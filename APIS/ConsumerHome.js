const exp = require("express");
const userApp = exp.Router();
require("dotenv").config()
const expressAsyncHandler=require('express-async-handler')
const multerObj=require("./middlewares/cloudinaryConfig")
const bcryptjs=require("bcryptjs")
const jwt=require("jsonwebtoken")
const verifyToken=require("./middlewares/verifyToken")
userApp.use(exp.json())
userApp.post('/login-user',expressAsyncHandler(async(request,response)=>{
  const userCollectionObj=request.app.get("userCollection")
  const userCredentialsObj=request.body;
  let userOfDB=await userCollectionObj.findOne({username:userCredentialsObj.username})
  if(userOfDB===null){
    response.status(200).send({message:"Invalid username"})
  }
  else{
    let isEqual=await bcryptjs.compare(userCredentialsObj.password,userOfDB.password)
    if(isEqual===false){
      response.status(200).send({message:"Invalid password"})
    }
    else{
      let signedJWTToken=jwt.sign({username:userOfDB.username},process.env.SECRET_KEY,{expiresIn:"1d"})
      response.status(200).send({message:"success",token:signedJWTToken,user:userOfDB})
    }
  }
}))
userApp.post("/register-user",expressAsyncHandler(async(request,response)=>{
   console.log("caught")
    const userCollectionObj=request.app.get("userCollection")
   console.log(request.body)
    const newUser=(request.body);
   const userOfDB= await userCollectionObj.findOne({username:newUser.username})
    if(userOfDB!==null){
      response.status(200).send({message:"User already existed"})
    }
    else{
      let hashedPassword=await bcryptjs.hash(newUser.password,6)
      newUser.password=hashedPassword;
      await userCollectionObj.insertOne(newUser)
      response.status(201).send({message:"User created"})
    }
  }))
  userApp.post("/register-byuser",expressAsyncHandler(async(request,response)=>{
     const registeredusersObj=request.app.get("registeredusers")
    console.log(request.body)
     const newUser=(request.body);
       await registeredusersObj.insertOne(newUser)
       response.status(201).send({message:"Successfully done!"})
   }))
userApp.get("/get-user",expressAsyncHandler(async(request,response)=>{
 const userObj=request.app.get("userCollection")
 let User=await userObj.find({typeofuser:"User"}).toArray();
 response.status(200).send({payload:User})
}))
userApp.delete("/remove/:name",expressAsyncHandler(async(request,response)=>{
  const userObj1=request.app.get("userCollection")
 const name=request.params.name;
 let dbRes=await userObj1.deleteOne({clubname:name}).then(dbRes=>{
   response.status(201).send({message:"User removed"})
 })
}))
  module.exports = userApp;