"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiPagination = void 0;
const common_1 = require("@nestjs/common");
class ApiPagination {
    static response(message, data, total, page, limit, statusCode = common_1.HttpStatus.OK) {
        return {
            statusCode,
            message,
            data,
            total,
            page,
            limit,
        };
    }
}
exports.ApiPagination = ApiPagination;
