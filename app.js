import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors'
import { createloanentry, getloanentries, signin, signup } from './handlers.js';
const app= express();
app.use(express.json());
app.use(cors())
dotenv.config();

try{
    await mongoose.connect(process.env.mongo_uri,{
        dbName:process.env.db,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    console.log("connected to mongodb atlas");

}
catch(error)
{
    console.log("oops, error in the connection");
}

app.post("/api/createloanentry",createloanentry);

app.get('/api/getloanentries',getloanentries);

app.post('/api/signin',signin );

app.post('/api/signup',signup);

app.listen(process.env.port,()=>{
    console.log("app is successfully running ");
})
