export interface  IRead<T>{
    findOne(item:string):Promise<T>
    findAll():Promise<T>
    findOneByEmailAndPassword(email:string,password:string):Promise<T>
 }