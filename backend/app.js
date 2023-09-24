import express from "express";
import mongoose from "mongoose";
import router from "./routes/user-routes.js";
import blogRouter from "./routes/blog-routes.js";
import cors from "cors";
const app=express();
app.use(cors())
app.use(express.json())
app.use("/api/user",router)
app.use("/api/blog",blogRouter)
mongoose.connect(
    "mongodb+srv://admin:NuQ4q3ihCK9vHMiN@cluster0.ivlgt0i.mongodb.net/Blog?retryWrites=true&w=majority&appName=AtlasApp"
    ).then(()=>{
        app.listen(5000);
    }).then(()=>{
        console.log("Connected to mongo and app is running on port 5000 ")
    }).catch((err)=>console.log(err))



// NuQ4q3ihCK9vHMiN