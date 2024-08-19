import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()
const app = express()
app.use(express.json())
app.get('/',(req,res)=>{
 res.send("Hello World");});

//middleware
app.use((req,res,next)=>{
    console.log('path'+ req.path + "method" + req.method);
    next();
})




//db connection
const  Connection = async() => {
    try{
        mongoose.connect(process.env.MONGO_URL)
        app.listen(process.env.PORT,()=>{
            console.log("DB Connected to Port Successfully and listening to " + process.env.PORT);
        });
        
 
    }
    catch(err)
    {
        console.log("Error: " +err)
    }  

}
Connection()


