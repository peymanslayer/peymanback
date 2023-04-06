import { IUser } from "./interfaces/user";
import mongoose from "mongoose";

 const userSchema= new mongoose.Schema<IUser>({
  name:{
    type:String,
    required:true,
    max:20
  },

  lastName:{
    type:String,
    required:true,
    max:20
  },

  email:{
    unique:false,
    type:String,
    required:true,
    min:10
  },

  password:{
    type:String,
    required:true,
    min:8,
    max:15
  },

  phone:{
    unique:true,
    type:Number,
    required:true,
    maxlength:11
  },
  
  token:{
    type:String
  }
});

export default mongoose.model<mongoose.Document | IUser>('user',userSchema);