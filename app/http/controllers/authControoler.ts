import { AuthService } from "../services/authService";
import { catchAsync } from "../../utils/catchAsync";
import { Request,Response,NextFunction } from "express";

export class AuthController{
 private authService=new AuthService

 register=catchAsync(async (req:Request,res:Response,next:NextFunction)=>{
    const register=await this.authService.register(req.body);
    res.status(register.status).json(register)
 })

 login=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
    const login=await this.authService.login(req.body);
    res.status(login.status).json(login.message)
 })

 logout=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
    const logout=await this.authService.logout(req.body);
    res.status(logout.status).json(logout.message);
 })

 acssesToken=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
    const {token}=req.body;
    const acssesToken=await this.authService.GenarateAcssesToken(token,req.body);
    res.status(acssesToken.status).json(acssesToken.message)
 })

}