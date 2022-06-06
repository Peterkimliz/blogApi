const express=require("express")
const bodyParser=require("body-parser");
const morgan=require("morgan");
require("dotenv").config();
////user defined roots///////////////
const {Connection}=require("./database");
const {MONGO_URL,SECRETKEY}=require("./config");
const {authRoute,userRoute,postRoute}=require("./routes");
const port =process.env.PORT || 9000

const app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(morgan("dev"));

const start=async()=>{
  try{
    await Connection(MONGO_URL);
    app.listen(port,()=>{
        console.log(`Server running on port:http://127.0.0.1:${port}`);
    });
  }catch(e){
      console.log("failed to connect to database");
  }  

}
start();


app.use("/api/auth",authRoute);
app.use("/api/user",userRoute);
app.use("/api/post",postRoute);





