"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const userService_1 = require("../services/userService");
const catchAsync_1 = require("../../utils/catchAsync");
const userService = new userService_1.UserService;
class UserController {
    constructor() {
        //     createUser=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
        //     const createUser=await userService.createUser(req.body);
        //     res.status(201).json(createUser)
        //    })
        this.findOneUser = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const findOneUser = yield userService.findOneUser(req.body);
            res.status(200).json(findOneUser);
        }));
        this.findAllUsers = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const findAllUsers = yield userService.findAllUsers();
            res.status(200).json(findAllUsers);
        }));
        this.updateUser = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const updateUser = yield userService.updateUser(id, req.body);
            res.status(200).json(updateUser);
        }));
        this.deleteUser = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const deleteUser = yield userService.deleteUser(id);
            res.status(200).json(deleteUser);
        }));
    }
}
exports.UserController = UserController;
