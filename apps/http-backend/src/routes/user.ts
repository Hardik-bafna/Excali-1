import { Router ,Request,Response} from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { JWT_SECRET } from "@repo/backend-common/config"
import {signinSchema,signupSchema} from "@repo/common/types"
import { mid } from "../middleware/middleware.js";
;


const userRouter = Router();



userRouter.post("/SignUp",async(req :Request ,res:Response )=>{
//db call
res.json({
    userId :123
})

})
userRouter.post("/SignIn",async(req :Request,res:Response)=>{
    try{
    const parsed = signinSchema.parse(req.body);
    const { email, password } = parsed;

 

    const user  = 1;
    const userid =1;
    const user_password = password;//get it for db

    if (!user) {
      return res.status(401).json({ message: "Incorrect credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, user_password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Incorrect credentials" });
    }

    const token = jwt.sign({ userid }, JWT_SECRET);

    return res.status(200).json({ token });
  } catch (e :any) {
    if (e.name === "ZodError") {
      return (res as any).status(400).json({ message: e.errors.map((err :any) => err.message) });
    }
    console.error("Signin error:", e);
    return (res as any).status(500).json({ message: "Signin failed" });
  }
})
userRouter.post("/Room",mid,async(req,res)=>{
//db
res.json({
    roomID:123
})
    
})