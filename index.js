import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
//import db from "./config/Database.js";
import router from "./routes/index.js";
import mongoose from 'mongoose';
import path from "path";
dotenv.config();
const app = express();
mongoose.connect('mongodb+srv://bazaarlytics:tv!xyB9DM8NyAzx@cluster0.e5ayr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {useNewUrLParser:true, useUnifiedTopology: true})
.then(function(){
    //connected successfully
    console.log("connected")
}, function(err) {
    //err handle
    console.log(err);
});
 
app.use(cors({ credentials:true, origin:'http://localhost:3000' }));
app.use(cookieParser());
app.use(express.json());
app.use(router);

if(process.env.NODE_ENV=="production"){
    app.use(express.static("frontend/build"));
    app.get("*", (req, res)=>{
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    })
}

const PORT= process.env.PORT || 5000;
 
app.listen(PORT, ()=> console.log('Server running at port' +  PORT));