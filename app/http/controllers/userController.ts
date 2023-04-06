import { UserService } from "../services/userService";
import { Request,Response,NextFunction } from "express";
import { catchAsync } from "../../utils/catchAsync";
const userService=new UserService
export class UserController{
    [x: string]: any;

//     createUser=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
//     const createUser=await userService.createUser(req.body);
//     res.status(201).json(createUser)
   
//    })

    findOneUser=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
    const findOneUser=await userService.findOneUser(req.body);
    res.status(200).json(findOneUser)

   })

    findAllUsers=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
    const findAllUsers=await userService.findAllUsers();
    res.status(200).json(findAllUsers)

   })

    updateUser=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
    const id=req.params.id
    const updateUser=await userService.updateUser(id,req.body)
    res.status(200).json(updateUser)
   })
   
    deleteUser=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
    const id=req.params.id
    const deleteUser=await userService.deleteUser(id)
    res.status(200).json(deleteUser)
   })
   
}