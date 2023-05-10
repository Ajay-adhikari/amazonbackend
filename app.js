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


// const whitelist = ['http://localhost:3000', 'https://ajayproject.netlify.app' , 'http://localhost:8005'];
// const corsOptions = {
//   origin: (origin, callback) => {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true,
// };
// app.use(cors(corsOptions));
app.use(cors())

app.use(router);


const port=process.env.PORT || 8005;






app.listen(port,()=>{
    console.log(`server is runnning on port ${port}`);
});
DefaultData();