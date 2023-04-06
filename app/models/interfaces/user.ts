import mongoose from "mongoose";

export interface IUser  extends  mongoose.Document{
    name:string,
    lastName:string,
    email:string,
    phone:number,
    password:string,
    token:string
}