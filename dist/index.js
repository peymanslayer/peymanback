"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Application = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const database_1 = require("./connection/database");
const app = (0, express_1.default)();
class Application {
    constructor() {
        this.setupApp();
        this.expressSetup();
        this.mongoSetup();
    }
    setupApp() {
        app.use(body_parser_1.default.json());
    }
    mongoSetup() {
        (0, database_1.run)();
    }
    expressSetup() {
        app.listen(4000, () => {
            console.log('app is running');
        });
    }
}
exports.Application = Application;
