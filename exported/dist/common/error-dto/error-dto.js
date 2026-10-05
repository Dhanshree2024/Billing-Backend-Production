"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getErrorMessage = getErrorMessage;
function getErrorMessage(error) {
    let errorMessage = 'An unexpected error occurred.';
    let errorCode = error.code || 500;
    switch (error.code) {
        case "23502":
            errorMessage = `Database Error: '${error.column}' is required but missing.`;
            break;
        case "23505":
            errorMessage = `Duplicate entry: '${error.detail}' already exists.`;
            errorCode = 23505;
            break;
        case "23503":
            errorMessage = `Foreign Key Violation: '${error.detail}'.`;
            errorCode = 23503;
            break;
        case '22P02':
            errorMessage = 'Database Error: Invalid data type provided.';
            errorCode = '22P02';
            break;
        case "42601":
            errorMessage = 'Database Error: Syntax error in SQL query.';
            errorCode = 42601;
            break;
        case "42703":
            errorMessage = `Database Error: '${error.column}' does not exist.`;
            errorCode = 42703;
            break;
        case "53300":
            errorMessage = 'Database Error: Too many connections. Try again later.';
            errorCode = 53300;
            break;
        case "401":
            errorMessage = 'Unauthorized: Invalid credentials.';
            errorCode = 401;
            break;
        case "403":
            errorMessage = 'Forbidden: You do not have permission to access this resource.';
            errorCode = 403;
            break;
        case "400":
            errorMessage = 'Bad Request: Invalid input parameters.';
            errorCode = 400;
            break;
        case "404":
            errorMessage = 'Not Found: The requested resource was not found.';
            errorCode = 404;
            break;
        case "500":
            errorMessage = 'Internal Server Error: Something went wrong.';
            errorCode = 500;
            break;
        default:
            errorMessage = error.message || 'An unexpected error occurred.';
            break;
    }
    return { code: errorCode, message: errorMessage };
}
