"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const login_dto_1 = require("./dto/login.dto");
const update_password_dto_1 = require("./dto/update-password.dto");
const forgot_password_dto_1 = require("./dto/forgot-password.dto");
const jwt_auth_guard_1 = require("./jwt-auth.guard");
const api_key_guard_1 = require("./api-key.guard");
const typeorm_1 = require("typeorm");
const verify_otp_dto_1 = require("../organization_register/verify-otp.dto");
const crypto_utils_1 = require("../common/encryption_decryption/crypto-utils");
const cookie_1 = require("cookie");
let AuthController = class AuthController {
    constructor(authService, dataSource) {
        this.authService = authService;
        this.dataSource = dataSource;
    }
    async login(loginDto, response, req) {
        const result = await this.authService.validateUser(loginDto, response, req);
        return response.status(result.status).json(result);
    }
    async checkSubscription(orgId) {
        return this.authService.checkSubscriptionRestrictions(orgId);
    }
    async fetchUserLoginProfile(req, res) {
        console.log('FETCH PROFILE API HIT');
        const createdBy = req.cookies.system_user_id;
        if (!createdBy) {
            throw new common_1.HttpException({ statusCode: common_1.HttpStatus.BAD_REQUEST, message: 'user id and status id is required' }, common_1.HttpStatus.BAD_REQUEST);
        }
        try {
            const result = await this.authService.fetchUserLoginProfile(Number((0, crypto_utils_1.decrypt)(createdBy)));
            return res.status(200).json({
                result
            });
        }
        catch (error) {
            return res.status(error.status || 500).json({
                statusCode: error.status || 500,
                message: error.message || 'Internal server error.',
            });
        }
    }
    async getApiKey(res) {
        try {
            const apiKey = await this.authService.getApiKey();
            console.log(apiKey);
            if (!apiKey) {
                throw new Error('API key not found.');
            }
            return res.status(200).json({ apiKey });
        }
        catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
    async updatePassword(req, res, updatePasswordDto) {
        const { userId, currentPassword, newPassword } = updatePasswordDto;
        try {
            const result = await this.authService.updatePassword(userId, newPassword, res, currentPassword);
            console.log(result);
            res.status(200).json(result);
        }
        catch (error) {
            if (error instanceof common_1.UnauthorizedException) {
                res.status(401).json({ message: error.message });
            }
            else {
                res.status(500).json({ message: error.message });
            }
        }
    }
    async updateNewPassword(req, res, updatePasswordDto) {
        const { userId, currentPassword, newPassword } = updatePasswordDto;
        try {
            const result = await this.authService.updateNewPassword(userId, newPassword, res, currentPassword);
            console.log(result);
            res.status(200).json(result);
        }
        catch (error) {
            if (error instanceof common_1.UnauthorizedException) {
                res.status(401).json({ message: error.message });
            }
            else {
                res.status(500).json({ message: error.message });
            }
        }
    }
    async validateResetLink(userId) {
        console.log("userId received", userId);
        const isValid = await this.authService.validatePasswordResetLink(userId);
        console.log("isValid", isValid);
        return { valid: isValid };
    }
    checkSession(req) {
        const userId = req.session.user_id;
        console.log("check-session", userId);
        console.log(userId);
        if (userId) {
            return { message: 'User is logged in', user_id: userId };
        }
        return { message: 'No active session' };
    }
    async logout(req, res) {
        const result = await this.authService.logout(req, res);
        return res.status(200).json(result);
    }
    async logoutAll(req, res) {
        const cookies = (0, cookie_1.parse)(req.headers.cookie || '');
        const userIdEncrypted = cookies.system_user_id;
        if (!userIdEncrypted) {
            throw new common_1.UnauthorizedException('User ID missing in cookies');
        }
        const userId = Number((0, crypto_utils_1.decrypt)(userIdEncrypted));
        const result = await this.authService.logoutAllSessions(userId, res);
        return res.status(common_1.HttpStatus.OK).json(result);
    }
    async verifyLoginOtp(verifyOtpDto, context, req, response) {
        const result = await this.authService.verifyLoginOtp(verifyOtpDto, response, context);
        if (result.jwt_token) {
        }
        response.status(200).json(result);
    }
    async validateToken() {
        return { message: 'Token is valid' };
    }
    async forgotPassword(forgotPasswordDto, res, req) {
        try {
            const result = await this.authService.sendOtpForPasswordReset(forgotPasswordDto.email);
            return res.status(result.status).json(result);
        }
        catch (error) {
            return res.status(error.status || 500).json({
                statusCode: error.status || 500,
                message: error.message || "Internal Server Error",
            });
        }
    }
    async verifyForgotPasswordOtp(verifyOtpDto, res) {
        try {
            const result = await this.authService.verifyForgotPasswordOtp(verifyOtpDto, res);
            res.status(common_1.HttpStatus.OK).json({ status: 200, message: 'OTP has been verified.' });
        }
        catch (error) {
            res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message || 'Failed to verify OTP.' });
        }
    }
    async sendOtpForResetPassword(body, res) {
        try {
            const result = await this.authService.sendOtpForPasswordResetByUserId(body.userId, body.oldPassword, body.newPassword);
            return res.status(result.status).json(result);
        }
        catch (error) {
            return res.status(error.status || 500).json({
                statusCode: error.status || 500,
                message: error.message || "Internal Server Error",
            });
        }
    }
    async verifyResetPasswordOtp(verifyOtpDto, res) {
        try {
            console.log("Received request to verify OTP:", verifyOtpDto);
            const result = await this.authService.verifyResetPasswordOtp(verifyOtpDto, res);
            console.log("Response from service:", result);
            return res.status(result.status || 200).json(result);
        }
        catch (error) {
            console.error("Error during OTP verification:", error);
            return res.status(error.status || 500).json({
                statusCode: error.status || 500,
                message: error.message || "Internal Server Error",
            });
        }
    }
    async generatePassword(req, res, generatePasswordDto) {
        const { userId, newPassword } = generatePasswordDto;
        try {
            const result = await this.authService.setPassword(userId, newPassword);
            res.status(200).json({ message: 'Password updated successfully', result });
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('login'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto, Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Get)('check-subscription'),
    __param(0, (0, common_1.Query)('orgId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "checkSubscription", null);
__decorate([
    (0, common_1.Get)('fetch-profile'),
    (0, common_1.UseGuards)(api_key_guard_1.ApiKeyGuard, jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "fetchUserLoginProfile", null);
__decorate([
    (0, common_1.Get)('apikey'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getApiKey", null);
__decorate([
    (0, common_1.Post)('reset-password'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, update_password_dto_1.UpdatePasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "updatePassword", null);
__decorate([
    (0, common_1.Post)('reset-password-for-new-user'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, update_password_dto_1.UpdatePasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "updateNewPassword", null);
__decorate([
    (0, common_1.Get)('validate-reset-link'),
    __param(0, (0, common_1.Query)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "validateResetLink", null);
__decorate([
    (0, common_1.Post)('check-session'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "checkSession", null);
__decorate([
    (0, common_1.Post)('logout'),
    (0, common_1.UseGuards)(api_key_guard_1.ApiKeyGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
__decorate([
    (0, common_1.Post)('logout-all'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logoutAll", null);
__decorate([
    (0, common_1.Post)('verify-login-otp'),
    __param(0, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [verify_otp_dto_1.VerifyOtpDto, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verifyLoginOtp", null);
__decorate([
    (0, common_1.Post)('validate-token'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "validateToken", null);
__decorate([
    (0, common_1.Post)('forgot-password'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [forgot_password_dto_1.ForgotPasswordDto, Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "forgotPassword", null);
__decorate([
    (0, common_1.Post)('verify-forgotpassword-otp'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [verify_otp_dto_1.VerifyOtpDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verifyForgotPasswordOtp", null);
__decorate([
    (0, common_1.Post)('send-otp-reset-password'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "sendOtpForResetPassword", null);
__decorate([
    (0, common_1.Post)('verify-reset-password-otp'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verifyResetPasswordOtp", null);
__decorate([
    (0, common_1.Post)('generate-password'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "generatePassword", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        typeorm_1.DataSource])
], AuthController);
