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
exports.BaseRepo = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
class BaseRepo {
    constructor(schemaModel) {
        this._model = (mongoose_1.default.Model);
        this._model = schemaModel;
    }
    checkQueryError(query) {
        if (query !== null) {
            return query;
        }
        else {
            throw new Error("نتیجه ای پیدا نشد");
        }
    }
    findOne(item) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = yield this._model.findOne({ email: item });
            return query;
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = yield this._model.find();
            const result = this.checkQueryError(query);
            return result;
        });
    }
    create(item, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = yield new this._model(Object.assign(Object.assign({}, item), { password })).save();
            return query;
        });
    }
    update(id, update) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = yield this._model.findByIdAndUpdate(id, { update });
            const result = this.checkQueryError(query);
            return result;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = yield this._model.findByIdAndDelete(id);
            const result = this.checkQueryError(query);
            return result;
        });
    }
    findOneByEmailAndPassword(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = yield this._model.findOne({ email, password });
            const result = this.checkQueryError(query);
            return result;
        });
    }
}
exports.BaseRepo = BaseRepo;
