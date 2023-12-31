const exp = require("express");
const app = exp();

require('dotenv').config()
const port=process.env.PORT||4000;
app.listen(port, () => console.log("server listening on port 4000..."));
const path=require("path")
app.use(exp.static(path.join(__dirname,'./build')))


const mclient=require("mongodb").MongoClient;

mclient.connect('mongodb://0.0.0.0:27017')
.then(dbRef=>{
  let dbObj=dbRef.db('assigndb')

  let AddEvent=dbObj.collection("AddEvent")
  let userCollection=dbObj.collection("usercollection")
  let registeredusers=dbObj.collection("registeredusers")
  app.set("userCollection",userCollection)
  app.set("AddEvent",AddEvent)
  app.set("registeredusers",registeredusers)
 

  console.log("Connected to DB successfully")
})
.catch(err=>console.log("database connection err is ",err))
const userApp = require("./APIS/ConsumerHome");
const AdminApp = require("./APIS/AdminHome");


app.use("/ConsumerHome-api", userApp);
app.use("/AdminHome-api",AdminApp);




const pageRefresh=(request,response,next)=>{
  response.sendFile(path.join(__dirname,'./build/index.html'))
}
app.use("*",pageRefresh)




const invalidPathHandlingMiddleware = (request, response, next) => {
  response.send({ message: "Invalid path" });
};

app.use(invalidPathHandlingMiddleware);

const errHandler = (error, request, response, next) => {
  response.send({ "error-message": error.message });
};
app.use(errHandler);
