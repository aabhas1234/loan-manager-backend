import bcrypt from 'bcryptjs';
import express from 'express';

const gethashed=async (password)=>{
 const hashedpassword= await bcrypt.hash(password,10);
 return hashedpassword ;
}
export default gethashed ;