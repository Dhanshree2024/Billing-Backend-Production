"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandler = void 0;
const common_1 = require("@nestjs/common");
class ErrorHandler {
    static getMessage(error) {
        if (error instanceof Error) {
            return error.message;
        }
        if (typeof error === 'string') {
            return error;
        }
        return 'Internal Server Error';
    }
    static isHttpException(error) {
        return error instanceof common_1.HttpException;
    }
    static throwInternalServerError(error, defaultMessage = 'Internal Server Error') {
        throw new common_1.HttpException({
            success: false,
            message: defaultMessage,
            details: this.getMessage(error),
        }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
    }
    static throwBadRequest(error, defaultMessage = 'Bad Request') {
        throw new common_1.HttpException({
            success: false,
            message: defaultMessage,
            details: this.getMessage(error),
        }, common_1.HttpStatus.BAD_REQUEST);
    }
    static throwNotFound(error, defaultMessage = 'Resource Not Found') {
        throw new common_1.HttpException({
            success: false,
            message: defaultMessage,
            details: this.getMessage(error),
        }, common_1.HttpStatus.NOT_FOUND);
    }
    static log(context, error) {
        console.error(`[${context}]`, this.getMessage(error));
    }
}
exports.ErrorHandler = ErrorHandler;
