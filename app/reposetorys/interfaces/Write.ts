
export interface IWrite<T>{
    create(item:T,password:string):Promise<T>
    update(id:string,update:T):Promise<T>
    delete(id:string):Promise<T>
}