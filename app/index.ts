import express,{Express} from "express";
import bodyParser from "body-parser";
import { run } from "./connection/database";
import * as dotenv from 'dotenv';
import router from "./routes";
import { ErrorHandler } from "./http/middlewares/errorHandler";
dotenv.config();

const app: Express = express();

export class Application{
    constructor(){
        this.setupApp();
        this.expressSetup();
        this.mongoSetup();
        this.setupRoutes();
        this.setupError();
    }

  setupApp(){
    app.use(bodyParser.json());
  }
  
  mongoSetup(){
    run();
  }

  expressSetup(){
    app.listen(process.env.PORT,()=>{
        console.log(`app is running on port${process.env.PORT}`);
        
    })
  }

  setupRoutes(){
    app.use(router)
  }
  setupError(){
    app.use(ErrorHandler)
  }
}