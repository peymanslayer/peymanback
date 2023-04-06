import userRoute from "./userRoute";
import authRouter from "./authRoute";
import express from 'express';

const router=express.Router();
router.use(userRoute,authRouter)

export default router