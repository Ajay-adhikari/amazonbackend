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


const port=process.env.PORT || 8005;
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://gleeful-toffee-40719d.netlify.app');
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  next();
});



app.listen(port,()=>{
    console.log(`server is runnning on port ${port}`);
});
DefaultData();
 