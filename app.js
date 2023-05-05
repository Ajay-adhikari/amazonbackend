require("dotenv").config();
const express=require('express');
const app=express();
const mongoose=require('mongoose');
require("./db/conn")


const Products=require("./models/productSchema");
const DefaultData=require("./defaultdata");
const cors=require("cors");
const router=require("./routes/router");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser(""));

app.use(router);
app.use(cors({
  origin:"https://gleeful-toffee-40719d.netlify.app",
  credentials:true

}));
app.use(router);
const port=process.env.PORT || 8005;
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Credentials", true);
//     res.header("Access-Control-Allow-Headers", "origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });



app.listen(port,()=>{
    console.log(`server is runnning on port ${port}`);
});
DefaultData();
 