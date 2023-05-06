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
// app.use(cors());
const cors = require('cors');
const whitelist = ['https://stellar-treacle-3bd297.netlify.app'];
const corsOptions = {
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    },
    credentials: true
  };
  
  app.use(cors(corsOptions));

app.use(router);


const port= 8005;




app.listen(port,()=>{
    console.log(`server is runnning on port ${port}`);
});
DefaultData();
 