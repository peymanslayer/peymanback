"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userRoute_1 = __importDefault(require("./userRoute"));
const authRoute_1 = __importDefault(require("./authRoute"));
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.use(userRoute_1.default, authRoute_1.default);
exports.default = router;
