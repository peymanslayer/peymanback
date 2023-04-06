import { IUser } from "../models/interfaces/user";
import { BaseRepo } from "./baseRepository";
import user from "../models/user";
import mongoose, { FilterQuery } from "mongoose";
export class UserRepo extends BaseRepo<IUser>{
   private baseRepo=new BaseRepo(user)
   constructor(){
    super(user);
   }
  async userFindByEmail(email:string):Promise<boolean>{
   const userFind=await user.findOne({email:email});
   if(userFind){
      return true
   }
   else{
      return false
   }
  }

  async createUser(users:IUser,hash:string,token:string):Promise<mongoose.Document>{
    const createUser= await user.create({
      email:users.email,
      password:hash,
      token:token,
      phone:users.phone,
      name:users.name,
      lastName:users.lastName
    });

    return createUser
  }

  async findUserByToken(token:string):Promise<mongoose.Document>{
   const findUserByToken=await user.findOne({token:token});
   console.log(findUserByToken);
   
   const result= await this.baseRepo.checkQueryError(findUserByToken);
   return result

  }

  async updateUser(email:string,token:string){
   const updateUser=await user.updateOne({email:email},{token:token});
   return updateUser;
  }

}