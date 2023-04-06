"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.GenarateToken = void 0;
const Jwt = __importStar(require("jsonwebtoken"));
const userRepo_1 = require("../reposetorys/userRepo");
const jwt_1 = require("../../config/jwt");
class GenarateToken {
    constructor() {
        this.userRepo = new userRepo_1.UserRepo;
    }
    acssesToken(email, password) {
        const result = Jwt.sign({ email, password }, String(jwt_1.jwt.acsses), { expiresIn: "14m" });
        return result;
    }
    refreshToken(email, password) {
        const result = Jwt.sign({ email, password }, String(jwt_1.jwt.refresh), { expiresIn: "30d" });
        return result;
    }
    verifyToken(refreshToken, REFRESH_TOKEN) {
        return __awaiter(this, void 0, void 0, function* () {
            let result;
            const findUser = yield this.userRepo.findOne(refreshToken);
            if (!findUser) {
                return 'llll';
            }
            else {
                result = Jwt.verify(refreshToken, REFRESH_TOKEN, (err, data) => {
                    if (err) {
                        return 'kkkk';
                    }
                    else {
                        return data;
                    }
                });
                return result;
            }
        });
    }
    genarateAcsessTokenByRefreshToken(refresh) {
        return __awaiter(this, void 0, void 0, function* () {
            const acssident = Math.random();
            const result = Jwt.sign({ refresh, acssident }, String(jwt_1.jwt.acsses), { expiresIn: "14m" });
            return result;
        });
    }
}
exports.GenarateToken = GenarateToken;
