import { IUser } from "../../models/interfaces/user";
import { UserService } from "../services/userService";
import { UserRepo } from "../../reposetorys/userRepo";
import { signupValidation,loginValidation } from "../validations/userValidation";
import * as bcrypt from 'bcrypt';
import { jwt } from "../../../config/jwt";
import { GenarateToken } from "../../helper/token";
export class AuthService{
  private userRepo=new UserRepo
  private generateToken=new GenarateToken

  async register(user:IUser){
   const {error} = signupValidation(user);
   if(error){
    return{
        status:403,
        message:error
    }
   }
      const result=await this.registerLogic(user)
      return result

  }

  async login(user:IUser){
    const {error}=loginValidation(user);
    if(error){
        return {
            status:403,
            message:error
        }
    }else{
       const result=await this.loginLogic(user);
       return result
    }
  }

  async registerLogic(user:IUser){
    const query= await this.userRepo.userFindByEmail(user.email);
    if(query){
        return {
            status:203,
            message:'کاربر وجود دارد'
        }
    }else{
       const hash=await this.hashingPasswordProcess(user);
       const result=await this.userRepo.create(user,hash)
       return{
        status:201,
        message:result
       }
    }
    }

   async loginLogic(user:IUser){
    const findUser=await this.userRepo.findOne(user.email);
    if(!findUser){
        return{
          status:403,
          message:'چنین کاربری وجود ندارد'
        }
    }else{
       const comparePassword=await this.comparePassword(user.password,findUser.password);
       
       if(!comparePassword){
          return{
            status:403,
            message:"پسورد اشتباه است"
        }
       }
       const acssesToken=this.generateToken.acssesToken(user.email,user.password);
       const refreshToken=this.generateToken.refreshToken(user.email,user.password);
       await this.userRepo.updateUser(findUser.email,refreshToken);
       return{
        status:200,
        message:{
            refreshToken,
            acssesToken,
            message:"شما وارد شدید"
        }
       }
    }
   }

   async hashingPasswordProcess(user:IUser){
     const salt= await bcrypt.genSalt(Number(jwt.salt));
     const hashPassword = await bcrypt.hash(user.password, salt);

     return hashPassword
    }

   async verifiedPassword(user:IUser,body:IUser){
      const verifyPassword= await bcrypt.compare(user.password,body.password);
      if(!verifyPassword){
        return {
            status:403,
            message:"password not match" 
         }
      }
   }

   async comparePassword(userPassword:string,hashPassword:string){
      const compare=await bcrypt.compare(userPassword,hashPassword);
      if(compare){
      return true
   }
      return false
  }

  async logout(user:IUser){
    const logoutLogic=await this.logoutLogic(user.token);
    return logoutLogic
  }

  async logoutLogic(token:string){
   const userToken=await this.userRepo.findUserByToken(token);
   if(userToken){
    userToken.deleteOne();
   return{
    status:200,
    message:"شما خارج شدید"
   }
}
   return{
    status:403,
    message:"چنین کاربری وجود ندارد"
 }
   }


   async GenarateAcssesToken(refreshToken:string,user:IUser){
     const genarateToken= await this.generateToken.verifyToken(refreshToken,String(jwt.acsses));
     if( genarateToken){
         const genarateAcessToken=await this.generateToken.genarateAcsessTokenByRefreshToken(genarateToken);
         return  {
            status:200,
            message:genarateAcessToken
         }
     }else{
        return{
            status:403,
            message:"خحخحح"
        }
     }
   }
}