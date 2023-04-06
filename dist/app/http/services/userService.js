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
exports.UserService = void 0;
const userRepo_1 = require("../../reposetorys/userRepo");
const userRepo = new userRepo_1.UserRepo;
class UserService {
    createUser(user, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const createUser = yield userRepo.create(user, password);
            return {
                status: 201,
                message: createUser
            };
        });
    }
    findOneUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const findOneUser = yield userRepo.userFindByEmail(user.email);
            return {
                status: 200,
                message: findOneUser
            };
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield userRepo.delete(id);
            return {
                status: 202,
                message: 'کاربر حذف شد'
            };
        });
    }
    findAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const findAllUsers = yield userRepo.findAll();
            return {
                status: 200,
                message: findAllUsers
            };
        });
    }
    updateUser(id, update) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateUser = yield userRepo.update(id, update);
            return {
                status: 200,
                message: updateUser
            };
        });
    }
}
exports.UserService = UserService;
