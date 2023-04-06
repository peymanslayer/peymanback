"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandler = void 0;
const errorSevice_1 = require("../services/errorSevice");
const Node_env_1 = require("../../../config/Node_env");
const service = new errorSevice_1.ErrorService;
const sendErrorDev = (err, req, res) => {
    sendErrorDevLogic(err, req, res);
};
const sendErrorProd = (err, req, res) => {
    sendErrorProdLogic(err, req, res);
};
const sendErrorDevLogic = (err, req, res) => {
    if (req.originalUrl.startsWith('/api')) {
        res.status(err.statusCode).json({
            error: err,
            message: err.message,
        });
    }
    console.error('ERROR 💥', err);
    res.status(err.statusCode).json({
        title: 'Something went wrong!',
        msg: err.message
    });
};
const sendErrorProdLogic = (err, req, res) => {
    if (req.originalUrl.startsWith('/api')) {
        ErrorProdByIsOperationalInApi(err, req, res);
    }
    ErrorProdByIsOperational(err, req, res);
};
const ErrorProdByIsOperationalInApi = (err, req, res) => {
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        });
    }
    else {
        res.status(500).json({
            status: 'error',
            message: 'Something went very wrong!'
        });
    }
};
const ErrorProdByIsOperational = (err, req, res) => {
    if (err.isOperational) {
        res.status(err.statusCode).json({
            title: 'Something went wrong!',
            msg: err.message
        });
    }
    res.status(err.status).json({
        title: err.status,
        msg: err.message,
    });
};
function ErrorHandler(err, req, res, next) {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 500;
    err.message = err.message;
    if (Node_env_1.mode.mode === 'development') {
        sendErrorDev(err, req, res);
    }
    else if (Node_env_1.mode.mode === 'production') {
        let error = Object.assign({}, err);
        error.message = err.message;
        if (error.message.includes('validation'))
            error = service.handleValidationErrorDB();
        if (error.name === 'CastError')
            error = service.handleCastErrorDB();
        if (error.name === 'JsonWebTokenError')
            error = service.handleJWTError();
        if (error.name === 'TokenExpiredError')
            error = service.handleJWTExpiredError();
        if (error.message.search('E11000 duplicate key error collection: project.users index') !== -1)
            error = service.handleDuplicateFieldsDB();
        sendErrorProd(error, req, res);
    }
}
exports.ErrorHandler = ErrorHandler;
