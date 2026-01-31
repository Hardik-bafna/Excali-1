import { NextFunction, Request,Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config"
export function mid(req:Request,res : Response,next:NextFunction){
    const token = req.headers["authorization"]??"";
    const decode = jwt.verify(token,JWT_SECRET) as JwtPayload;
    if(decode){
  (req as Request&{userId:string}).userId = decode.id;
      next();
    }else{
  
    res.status(403).json({
   message: "You are not signed in"
  
    })
    }
}