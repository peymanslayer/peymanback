import { Inject,Service } from 'typedi';
import { IUser } from '../../models/interfaces/user'
import { UserRepo } from '../../reposetorys/userRepo';

const userRepo=new UserRepo

export class UserService{
 
  async createUser(user:IUser,password:string){
   const createUser=await userRepo.create(user,password);
   return{
      status:201,
      message:createUser
   }
  }


  async findOneUser(user:IUser){
   const findOneUser=await userRepo.userFindByEmail(user.email);
   return{
      status:200,
      message:findOneUser
   }
  }


 async deleteUser(id:string){
   await userRepo.delete(id);
   return{
      status:202,
      message:'کاربر حذف شد'
   }
 }

 async findAllUsers(){
   const findAllUsers=await userRepo.findAll();
   return{
      status:200,
      message:findAllUsers
   }
 }

 async updateUser(id:string,update:IUser){
   const updateUser=await userRepo.update(id,update);
   return{
      status:200,
      message:updateUser
   }
 }

}