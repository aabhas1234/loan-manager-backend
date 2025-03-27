import express from 'express';
import mongoose from 'mongoose';
import loanmodel from './schemas/loanschema.js';
import bcrypt from 'bcryptjs'
import usermodel from './schemas/user.js';
import gethashed from './hash.js';
import jwt from 'jsonwebtoken';

export const createloanentry = async(req,res)=>{
    console.log("ok");
    const res1= await loanmodel.findOne({LoanNo:req.body.loanno});
    try{
        if(!res1)
        {    
            const result = await loanmodel.create({LoanNo:req.body.loanno,
                Loantype: req.body.loantype,
                Borrower: req.body.borrower,
                BorrowerAddress: req.body.borroweraddress,
                SanctionAmount: req.body.sanctionamount,
                Region: req.body.region,
                CurrentDpd: req.body.currentdpd
            })
            res.status(200).send("Loan Entry Succesfully created")
        }
        else
        {
            res.status(200).send("Loan Entry already present");
        }
    }
    catch(error)
    {
        res.status(400).send(error.message);
    }
}
export const getloanentries=async(req,res)=>{
    let result;
    //console.log("Ok");
        result= await loanmodel.find({});
        if(req.query.loantype!='')
        {
            let arr=[] 
            result.forEach((ele)=>{
                if(ele.Loantype.toLowerCase().includes(req.query.loantype.toLowerCase()))
                arr.push(ele);
            })
            result=JSON.parse(JSON.stringify(arr));
        }
        if(req.query.region!='')
        {
            let arr=[] 
            result.forEach((ele)=>{
                if(ele.Region.toLowerCase().includes(req.query.region.toLowerCase()))
                arr.push(ele);
            })
            result=JSON.parse(JSON.stringify(arr));
        }
        if(req.query.name!='')
            {
                let arr=[] 
                result.forEach((ele)=>{
                    if(ele.Borrower.toLowerCase().includes(req.query.name.toLowerCase()))
                    arr.push(ele);
                })
                result=JSON.parse(JSON.stringify(arr));
            }
        //console.log(result);
        res.json(result);
}

export const signin=async (req, res) => {
    //console.log("heyy");
    try {
      const response = await usermodel.findOne({ email: req.body.email });
  
      if (!response) {
        res.status(404).send({message:"User not Present, Please Signup first"});
        return; 
      }
  
      const isValid = await bcrypt.compare(req.body.password, response.password);
      if (isValid) {
        const token = jwt.sign(
          { email: req.body.email },
          process.env.secret_key,
          { expiresIn: '1h' }
        );
        const message = "User Successfully Logged in!!";
        res.status(200).send({ token, message, redirect: '/home' });
      } else {
        res.status(401).send({message:"Invalid Credentials"});
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({message:"Internal Server Error"});
    }
  }
  export const signup= async (req, res) => {
    console.log("heyaaa");
    try {
      const response = await usermodel.findOne({ email: req.body.email });
      if (!response) {
        const hashedpassword= await gethashed(req.body.password);
        await usermodel.create({
          email: req.body.email,
          password: hashedpassword,
          name: req.body.name,
        });
        res.send("User created");
      } else {
        res.send("User Already Present");
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }