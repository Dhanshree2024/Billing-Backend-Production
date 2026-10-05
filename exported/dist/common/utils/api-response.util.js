"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiResponse = void 0;
const common_1 = require("@nestjs/common");
class ApiResponse {
    static success(message, data = null, statusCode = common_1.HttpStatus.OK, extra = {}) {
        return {
            success: true,
            statusCode,
            message,
            data,
            ...extra,
        };
    }
    static error(message, statusCode = common_1.HttpStatus.INTERNAL_SERVER_ERROR, errors = null) {
        return {
            success: false,
            statusCode,
            message,
            errors,
        };
    }
}
exports.ApiResponse = ApiResponse;
