"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authControoler_1 = require("../http/controllers/authControoler");
const controller = new authControoler_1.AuthController;
const authRouter = express_1.default.Router();
authRouter.post('/register', controller.register);
authRouter.post('/login', controller.login);
authRouter.post('/logout', controller.logout);
authRouter.post('/acssestoken', controller.acssesToken);
exports.default = authRouter;
