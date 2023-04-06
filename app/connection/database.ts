import { connect } from "mongoose";
import { database } from "../../config/databaseConfig";

export async function run() {
  const connection= await connect(`${database.url}`);
    
  if (connection){
    console.log('database connected');
    
  }else{
    console.log('something wrong');
    
  }
    
}