import { Schema } from "mongoose";
import mongoose from "mongoose";
const userschema= new Schema({
    name:{
            type:String,
            required:true
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
   
});

const usermodel= mongoose.model('user',userschema);
export default usermodel;