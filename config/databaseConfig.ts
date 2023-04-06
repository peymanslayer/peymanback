import * as dotenv from 'dotenv'
dotenv.config()

export const database ={
    url:process.env.MONGO_URL
}