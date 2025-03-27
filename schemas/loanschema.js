import mongoose from "mongoose";
import express from "express";
import { Schema } from "mongoose";

const loanschema= new Schema({
    LoanNo:{
            type:String,
            required:true
    },
    Loantype:{
        type:String,
        required:true,
    },
    Borrower:{
        type:String,
        required:true,
    },
    BorrowerAddress:{
        type:String,
        required:true,
    },
    SanctionAmount:{
        type:Number,
        required:true,
    },
    Region:{
        type:String,
        required:true,
    },
    CurrentDpd:{
        type:Number,
        required:true,
    }
});

const Loanmodel= mongoose.model('loan',loanschema);
export default Loanmodel;