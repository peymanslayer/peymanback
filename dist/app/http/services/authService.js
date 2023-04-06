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
exports.AuthService = void 0;
const userRepo_1 = require("../../reposetorys/userRepo");
const userValidation_1 = require("../validations/userValidation");
const bcrypt = __importStar(require("bcrypt"));
const jwt_1 = require("../../../config/jwt");
const token_1 = require("../../helper/token");
class AuthService {
    constructor() {
        this.userRepo = new userRepo_1.UserRepo;
        this.generateToken = new token_1.GenarateToken;
    }
    register(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const { error } = (0, userValidation_1.signupValidation)(user);
            if (error) {
                return {
                    status: 403,
                    message: error
                };
            }
            const result = yield this.registerLogic(user);
            return result;
        });
    }
    login(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const { error } = (0, userValidation_1.loginValidation)(user);
            if (error) {
                return {
                    status: 403,
                    message: error
                };
            }
            else {
                const result = yield this.loginLogic(user);
                return result;
            }
        });
    }
    registerLogic(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = yield this.userRepo.userFindByEmail(user.email);
            if (query) {
                return {
                    status: 203,
                    message: 'کاربر وجود دارد'
                };
            }
            else {
                const hash = yield this.hashingPasswordProcess(user);
                const result = yield this.userRepo.create(user, hash);
                return {
                    status: 201,
                    message: result
                };
            }
        });
    }
    loginLogic(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const findUser = yield this.userRepo.findOne(user.email);
            if (!findUser) {
                return {
                    status: 403,
                    message: 'چنین کاربری وجود ندارد'
                };
            }
            else {
                const comparePassword = yield this.comparePassword(user.password, findUser.password);
                if (!comparePassword) {
                    return {
                        status: 403,
                        message: "پسورد اشتباه است"
                    };
                }
                const acssesToken = this.generateToken.acssesToken(user.email, user.password);
                const refreshToken = this.generateToken.refreshToken(user.email, user.password);
                yield this.userRepo.updateUser(findUser.email, refreshToken);
                return {
                    status: 200,
                    message: {
                        refreshToken,
                        acssesToken,
                        message: "شما وارد شدید"
                    }
                };
            }
        });
    }
    hashingPasswordProcess(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const salt = yield bcrypt.genSalt(Number(jwt_1.jwt.salt));
            const hashPassword = yield bcrypt.hash(user.password, salt);
            return hashPassword;
        });
    }
    verifiedPassword(user, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const verifyPassword = yield bcrypt.compare(user.password, body.password);
            if (!verifyPassword) {
                return {
                    status: 403,
                    message: "password not match"
                };
            }
        });
    }
    comparePassword(userPassword, hashPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            const compare = yield bcrypt.compare(userPassword, hashPassword);
            if (compare) {
                return true;
            }
            return false;
        });
    }
    logout(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const logoutLogic = yield this.logoutLogic(user.token);
            return logoutLogic;
        });
    }
    logoutLogic(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const userToken = yield this.userRepo.findUserByToken(token);
            if (userToken) {
                userToken.deleteOne();
                return {
                    status: 200,
                    message: "شما خارج شدید"
                };
            }
            return {
                status: 403,
                message: "چنین کاربری وجود ندارد"
            };
        });
    }
    GenarateAcssesToken(refreshToken, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const genarateToken = yield this.generateToken.verifyToken(refreshToken, String(jwt_1.jwt.acsses));
            if (genarateToken) {
                const genarateAcessToken = yield this.generateToken.genarateAcsessTokenByRefreshToken(genarateToken);
                return {
                    status: 200,
                    message: genarateAcessToken
                };
            }
            else {
                return {
                    status: 403,
                    message: "خحخحح"
                };
            }
        });
    }
}
exports.AuthService = AuthService;
