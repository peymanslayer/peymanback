import mongoose, { FilterQuery } from "mongoose";
import { IWrite } from "./interfaces/Write";
import { IRead } from "./interfaces/Read";
import { IUser } from "../models/interfaces/user";

export class BaseRepo <T extends mongoose.Document> implements IWrite<T>,IRead<T> {

    private _model=mongoose.Model<mongoose.Document>

    constructor(schemaModel:mongoose.Model<mongoose.Document>){
        this._model=schemaModel
    }
 
    checkQueryError(query:any):Promise<T>{
        if(query!==null){
            return query
        }
        else{
     
         throw new Error("نتیجه ای پیدا نشد")
        }
     }
     

   async findOne(item:string):Promise<T>{
     const query= await this._model.findOne({email:item});
     return query
    }

  async findAll(): Promise<T> {
     const query=await this._model.find();
     const result=this.checkQueryError(query);
     return result
  }

 async create( item: T,password:string): Promise<T> {
    const query=await new this._model({...item,password}).save();
    return query
 }

 async update(id: string, update: T): Promise<T> {
     const query=await this._model.findByIdAndUpdate(id,{update});
     const result=this.checkQueryError(query);
     return result
 }

 async delete(id: string): Promise<T> {
     const query=await this._model.findByIdAndDelete(id);
     const result=this.checkQueryError(query);
     return result
 }

 async findOneByEmailAndPassword(email:string,password:string): Promise<T> {
     const query= await this._model.findOne({email,password});
     const result=this.checkQueryError(query);
     return result
 }

}