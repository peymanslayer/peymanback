
import * as Jwt from "jsonwebtoken";
import { UserRepo } from "../reposetorys/userRepo";
import { jwt } from "../../config/jwt";
import { randomBytes } from "crypto";
export class GenarateToken{
 
  private userRepo= new UserRepo
   
   acssesToken(email:string,password:string){
      const result= Jwt.sign({email,password},String(jwt.acsses),{expiresIn:"14m"});
      return result
   }

   refreshToken(email:string,password:string){
     const result= Jwt.sign({email,password},String(jwt.refresh),{expiresIn:"30d"});
     return result
   }

  async verifyToken(refreshToken:string,REFRESH_TOKEN:string){
    let result;
    const findUser=await this.userRepo.findOne(refreshToken);
    if(!findUser){
        return 'llll'
    }else{
     result= Jwt.verify(refreshToken,REFRESH_TOKEN,(err,data)=>{
        if(err){
           return 'kkkk'
        }else{
          return data
        }
     })
     return result
    }
    
  
   }

   async genarateAcsessTokenByRefreshToken(refresh:string){
    const acssident= Math.random()
    const result= Jwt.sign({refresh,acssident},String(jwt.acsses),{expiresIn:"14m"});
    return result
   }
   
}