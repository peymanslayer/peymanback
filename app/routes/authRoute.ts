import express from 'express';
import { AuthController } from '../http/controllers/authControoler';

const controller=new AuthController
const authRouter=express.Router();

authRouter.post('/register',controller.register)
authRouter.post('/login',controller.login)
authRouter.post('/logout',controller.logout)
authRouter.post('/acssestoken',controller.acssesToken)

export default authRouter;