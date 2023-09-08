const exp = require("express");
const AdminApp = exp.Router();
require("dotenv").config()
const expressAsyncHandler=require('express-async-handler')
const multerObj=require("./middlewares/cloudinaryConfig")
const bcryptjs=require("bcryptjs")
const jwt=require("jsonwebtoken")
const verifyToken=require("./middlewares/verifyToken")
AdminApp.use(exp.json())
AdminApp.post("/register-event",multerObj.single('photo'),expressAsyncHandler(async(request,response)=>{
  const AddEventObj=request.app.get("AddEvent")
  const newEvent=JSON.parse(request.body.Event);
 const EventOfDB= await AddEventObj.findOne({Name1:newEvent.Name1})
  if(EventOfDB!==null){
    response.status(200).send({message:"Event already existed"})
  }
  else{
    newEvent.image=request.file.path;
    await AddEventObj.insertOne(newEvent)
    response.status(201).send({message:"Event created"})
  }
}))
AdminApp.get("/get-event",expressAsyncHandler(async(request,response)=>{
    const AddEventObj=request.app.get("AddEvent")
    let Event=await AddEventObj.find().toArray();
    response.status(200).send({payload:Event})

}))
AdminApp.put("/edit-event/:id",expressAsyncHandler(async(request,response)=>{
  const AddEventObj1=request.app.get("AddEvent")
 const id=+request.params.id;
 let modifiedEvent=request.body;
 let dbRes=await AddEventObj1.updateOne({image:modifiedEvent.image},{$set:{...modifiedEvent}}).then(dbRes=>{
   response.status(201).send({message:"Event updated"})
   console.log(dbRes);
 })
}))
AdminApp.delete("/remove/:name",expressAsyncHandler(async(request,response)=>{
  const AddEventObj1=request.app.get("AddEvent")
 const name=request.params.name;
 let dbRes=await AddEventObj1.deleteOne({Name1:name}).then(dbRes=>{
   response.status(201).send({message:"Event Deleted"})
 })
}))
module.exports = AdminApp;


