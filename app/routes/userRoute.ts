import express from 'express';
import { UserController } from '../http/controllers/userController';

const controller= new UserController
const userRoute=express.Router();

// userRoute.post('/createUser',controller.);
userRoute.post('/findOneUser',controller.findOneUser);
userRoute.put('/updateUser/:id',controller.updateUser);
userRoute.delete('/deleteUser/:id',controller.deleteUser);
userRoute.get('/findAllUsers',controller.findAllUsers);

export default userRoute;