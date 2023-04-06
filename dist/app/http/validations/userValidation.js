"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidation = exports.signupValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const signupValidation = (user) => {
    const schemaValidation = joi_1.default.object({
        name: joi_1.default.string().required().messages({ "message": "خطایی در فیلد نام هست" }),
        lastName: joi_1.default.string().required().messages({ "message": "خطایی در فیلد نام خانوادگی هست" }),
        email: joi_1.default.string().email().required().messages({ "message": "ایمیل نامعتبر است" }),
        password: joi_1.default.string().required().messages({ "message": "رمز عبور نامعتبر است" }),
        phone: joi_1.default.number().required().messages({ "message": "شماره نامعتبر است" }),
    });
    return schemaValidation.validate(user);
};
exports.signupValidation = signupValidation;
const loginValidation = (user) => {
    const schemaValidation = joi_1.default.object({
        email: joi_1.default.string().messages({ "message": "اطلاعات وارد شده نادرست است" }).email().
            messages({ "message": "ایمیل نادرست است" }).required().
            messages({ "message": "ایمیل نباید خالی باشد" }),
        password: joi_1.default.string().messages({ "message": "پسورد باید حرف باشد" }).required().
            messages({ "message": "پسورد نباید خالی باشد" })
    });
    return schemaValidation.validate(user);
};
exports.loginValidation = loginValidation;
