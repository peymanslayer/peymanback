import { Request,Response } from "express";
import { NextFunction } from "express-serve-static-core";
import { ErrorService } from "../services/errorSevice";
import {IError} from '../interface/error';
import { mode } from "../../../config/Node_env";
const service=new ErrorService

const sendErrorDev = (err:IError, req:Request, res:Response) => {
    sendErrorDevLogic(err,req,res);
    
  };
  const sendErrorProd = (err:IError, req:Request, res:Response) => {
    sendErrorProdLogic(err,req,res);
 };

const sendErrorDevLogic=(err:IError,req:Request,res:Response)=>{
  if (req.originalUrl.startsWith('/api')) {
    res.status(err.statusCode).json({
      error: err,
      message: err.message,
    });
  }

  console.error('ERROR 💥', err);
  res.status(err.statusCode).json({
    title: 'Something went wrong!',
    msg: err.message
  });
  
}

  
const sendErrorProdLogic=(err:IError,req:Request,res:Response)=>{
  if (req.originalUrl.startsWith('/api')) {
    ErrorProdByIsOperationalInApi(err,req,res)
   }
    ErrorProdByIsOperational(err,req,res)
 };
 

 const ErrorProdByIsOperationalInApi=(err:IError,req:Request,res:Response)=>{
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });
  }
   else{
   res.status(500).json({
    status: 'error',
    message: 'Something went very wrong!'
  });

}}


const ErrorProdByIsOperational=(err:IError,req:Request,res:Response)=>{
  if (err.isOperational) {
    res.status(err.statusCode).json({
      title: 'Something went wrong!',
      msg: err.message
    });
  }
 res.status(err.status).json( {
    title: err.status,
    msg:err.message,
  });
}
 
export function ErrorHandler (err:IError,req:Request,res:Response,next:NextFunction){
      err.statusCode = err.statusCode || 500;
      err.status = err.status || 500;
      err.message=err.message
      if (mode.mode === 'development') {
          sendErrorDev(err, req, res);
          
        } else if (mode.mode === 'production') {
          let error = { ...err };
          error.message = err.message;
          if(error.message.includes('validation')) error=service.handleValidationErrorDB();
          if (error.name === 'CastError') error = service.handleCastErrorDB();
          if (error.name === 'JsonWebTokenError') error = service.handleJWTError();
          if (error.name === 'TokenExpiredError') error = service.handleJWTExpiredError();
          if(error.message.search('E11000 duplicate key error collection: project.users index')!==-1) error=service.handleDuplicateFieldsDB()
        sendErrorProd(error,req,res);
             
        }
  }