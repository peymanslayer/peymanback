"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../http/controllers/userController");
const controller = new userController_1.UserController;
const userRoute = express_1.default.Router();
// userRoute.post('/createUser',controller.);
userRoute.post('/findOneUser', controller.findOneUser);
userRoute.put('/updateUser/:id', controller.updateUser);
userRoute.delete('/deleteUser/:id', controller.deleteUser);
userRoute.get('/findAllUsers', controller.findAllUsers);
exports.default = userRoute;
