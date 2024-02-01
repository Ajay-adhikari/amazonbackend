
const Products=require("./models/productSchema");
const productsdata=require("./constant/productcsdata");

const DefaultData= async()=>{
    try{
        await Products.deleteMany({});
        const storeData= await Products.insertMany(productsdata);
        
    }
    catch(e)
    {
// console.log("error"+e.message);
    }
}

module.exports=DefaultData;
