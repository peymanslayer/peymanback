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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepo = void 0;
const baseRepository_1 = require("./baseRepository");
const user_1 = __importDefault(require("../models/user"));
class UserRepo extends baseRepository_1.BaseRepo {
    constructor() {
        super(user_1.default);
        this.baseRepo = new baseRepository_1.BaseRepo(user_1.default);
    }
    userFindByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const userFind = yield user_1.default.findOne({ email: email });
            if (userFind) {
                return true;
            }
            else {
                return false;
            }
        });
    }
    createUser(users, hash, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const createUser = yield user_1.default.create({
                email: users.email,
                password: hash,
                token: token,
                phone: users.phone,
                name: users.name,
                lastName: users.lastName
            });
            return createUser;
        });
    }
    findUserByToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const findUserByToken = yield user_1.default.findOne({ token: token });
            console.log(findUserByToken);
            const result = yield this.baseRepo.checkQueryError(findUserByToken);
            return result;
        });
    }
    updateUser(email, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateUser = yield user_1.default.updateOne({ email: email }, { token: token });
            return updateUser;
        });
    }
}
exports.UserRepo = UserRepo;
