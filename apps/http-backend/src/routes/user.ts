import { Router ,Request,Response} from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { JWT_SECRET } from "@repo/backend-common/config"
import {signinSchema,signupSchema,CreateRoomSchema} from "@repo/common/types"
import { mid } from "../middleware/middleware.js";
import prisma from "@repo/db/client";

const userRouter = Router();



userRouter.post("/SignUp",async(req :Request ,res:Response )=>{
try{
  const parsed = signupSchema.parse(req.body);
  const { email, password, firstName, lastName } = parsed;

  const normalizedEmail = email.toLowerCase();
  const existingUser = await prisma.user.findUnique({ 
   where:{ email: normalizedEmail }
  });

  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await prisma.user.create({
    data:{
    email: normalizedEmail,
    password: hashedPassword,
    firstName :firstName,
    lastName : lastName
  }
  });

  return res.status(201).json({ message: "Signup successful" });

}
catch(e : any){
  if (e.name === "ZodError") {
    return res.status(400).json({ message: e.errors.map((err:any) => err.message) });
  }
  console.error("Signup error:", e);
  return res.status(500).json({ message: "Signup failed" });
}


})
userRouter.post("/SignIn",async(req :Request,res:Response)=>{
    try{
    const parsed = signinSchema.parse(req.body);
    const { email, password } = parsed;
    const normalizedEmail = email.toLocaleLowerCase();
    const user = await prisma.user.findUnique({
      where:{
        email : normalizedEmail
      }
    })
    if (!user) {
      return res.status(401).json({ message: "Incorrect credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Incorrect credentials" });
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET);

    return res.status(200).json({ token });
  } catch (e :any) {
    if (e.name === "ZodError") {
      return (res as Response).status(400).json({ message: e.errors.map((err :any) => err.message) });
    }
    console.error("Signin error:", e);
    return (res as Response).status(500).json({ message: "Signin failed" });
  }
})
userRouter.post("/Room",mid,async(req,res)=>{
//db
res.json({
    roomID:123
})
    
})