require("dotenv").config();
const express=require('express');
const app=express();
const mongoose=require('mongoose');
require("./db/conn")
const CookieParser=require("cookie-parser");

const Products=require("./models/productSchema");
const DefaultData=require("./defaultdata");
const cors=require("cors");
const router=require("./routes/router");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser(""));
app.use(cors());
app.use(router);
const port=8005;
// console.log(process.env.DATABASE);
app.listen(port,()=>{
    console.log(`server is runnning on port ${port}`);
});
DefaultData();
 