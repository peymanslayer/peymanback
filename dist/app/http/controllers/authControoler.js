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
exports.AuthController = void 0;
const authService_1 = require("../services/authService");
const catchAsync_1 = require("../../utils/catchAsync");
class AuthController {
    constructor() {
        this.authService = new authService_1.AuthService;
        this.register = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const register = yield this.authService.register(req.body);
            res.status(register.status).json(register);
        }));
        this.login = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const login = yield this.authService.login(req.body);
            res.status(login.status).json(login.message);
        }));
        this.logout = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const logout = yield this.authService.logout(req.body);
            res.status(logout.status).json(logout.message);
        }));
        this.acssesToken = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { token } = req.body;
            const acssesToken = yield this.authService.GenarateAcssesToken(token, req.body);
            res.status(acssesToken.status).json(acssesToken.message);
        }));
    }
}
exports.AuthController = AuthController;
