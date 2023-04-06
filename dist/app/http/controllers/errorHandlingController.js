"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandlingController = void 0;
class ErrorHandlingController {
    sendErrorDev(err, req, res) {
        if (req.originalUrl.startsWith('/api')) {
            res.status(err.statusCode).json({
                error: err,
                message: err.message
            });
        }
        console.error('ERROR 💥', err);
        res.status(err.statusCode).json({
            title: 'Something went wrong!',
            msg: err.message
        });
    }
    ;
    sendErrorProd(err, req, res) {
        if (req.originalUrl.startsWith('/api')) {
            if (err.isOperational) {
                res.status(err.statusCode).json({
                    status: err.status,
                    message: err.message
                });
            }
            else {
                console.error('ERROR 💥', err);
                res.status(500).json({
                    status: 'error',
                    message: 'Something went very wrong!'
                });
            }
        }
        if (err.isOperational) {
            res.status(err.statusCode).render('error', {
                title: 'Something went wrong!',
                msg: err.message
            });
        }
        console.error('ERROR 💥', err);
        res.status(err.statusCode).render('error', {
            title: 'Something went wrong!',
            msg: 'Please try again later.'
        });
    }
    ;
}
exports.ErrorHandlingController = ErrorHandlingController;
