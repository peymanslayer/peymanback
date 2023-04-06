"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorService = void 0;
class ErrorService {
    constructor() {
        this.handlerRequired = () => {
            const message = "اطلاعات وارد شده درست نیست";
            return {
                status: 400,
                message: message
            };
        };
        this.handleCastErrorDB = () => {
            const message = "مشکلی در سایت بوجود امده است";
            return {
                status: 400,
                message: message
            };
        };
        this.handleValidationErrorDB = () => {
            const message = "خطای اعتبار سنجی";
            return {
                status: 400,
                message: message
            };
        };
        this.handleJWTError = () => {
            return {
                status: 401,
                message: 'خطایی بوجود امده است'
            };
        };
        this.handleJWTExpiredError = () => {
            return {
                status: 401,
                message: 'مدت زمان وارد شدن شما به پایان رسیده .دوباره وارد شوید'
            };
        };
        this.handleDuplicateFieldsDB = () => {
            const message = "اطلاعات وارد شده تکراریست";
            return {
                status: 400,
                message: message
            };
        };
    }
}
exports.ErrorService = ErrorService;
