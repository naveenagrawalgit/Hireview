import dns from 'node:dns';
import { ENV } from './lib/env.js';
// Force Node to use Google DNS for all resolutions
if ( ENV.NODE_ENV === 'development') {
    console.log("🛠️ Local environment detected: Applying DNS SRV workaround.");
    dns.setServers(['8.8.8.8', '8.8.4.4']);
}


import express from 'express';

import path from 'path';
import { connectDB } from './lib/DB.js';
import cors from "cors";
import {serve} from "inngest/express";
import { inngest, functions } from "./lib/inngest.js";
import {clerkMiddleware} from "@clerk/express";
import { protectRoute } from './middleware/protectRoute.js';

let __dirname = path.resolve();

const app = express();

const Port = 5000;


app.use(express.json())
app.use(cors({
    
    credentials: true

}))
app.use(clerkMiddleware()); //this adds auth field to request object: req.auth()






app.use("/api/inngest",serve({client: inngest, functions})); 



app.get("/health",(req,res)=>{
    res.status(200).json({msg: "server is running"});
})


app.get("/video-calls",protectRoute,(req,res)=> {
    res.status(200).json({msg: "this is video-calls endpoint"});
})




// for serving frontend on backend machine.
if(ENV.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

      app.get("/{*any}", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });

}


const startServer = async () => {
    try {
        await connectDB()
        app.listen(ENV.PORT,()=> console.log(`Server is running on port ${ENV.PORT}`))
        
    } catch (error) {
        console.log("Error starting the server", error)
        
    }
}

startServer() 

