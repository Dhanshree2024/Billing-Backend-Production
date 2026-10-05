"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const bcrypt = __importStar(require("bcrypt"));
const user_repository_1 = require("../user/user.repository");
const config_repository_1 = require("../config/config.repository");
const ua_parser_js_1 = __importDefault(require("ua-parser-js"));
const uuid_1 = require("uuid");
const register_user_login_entity_1 = require("../organization_register/entities/register-user-login.entity");
const cookie_1 = require("cookie");
const date_fns_1 = require("date-fns");
const jose_1 = require("jose");
const nodemailer = __importStar(require("nodemailer"));
const mail_service_1 = require("../common/mail/mail.service");
const render_email_1 = require("../common/mail/render-email");
const public_billing_portal_user_entity_1 = require("../organization_register/entities/public_billing_portal_user.entity");
const organizational_user_entity_1 = require("../organizational-profile/entity/organizational-user.entity");
const sessions_entity_1 = require("../organizational-profile/public_schema_entity/sessions.entity");
const org_subscription_entity_1 = require("../subscription_pricing/entity/org_subscription.entity");
const typeorm_2 = require("typeorm");
const crypto_utils_1 = require("../common/encryption_decryption/crypto-utils");
const mail_config_service_1 = require("../common/mail/mail-config.service");
let AuthService = class AuthService {
    constructor(jwtService, userRepository, configRepository, sessionRepository, registerserRepository, userRepo, billinguserRepo, roleRepository, subscriptionRepository, mailConfigService, mailService) {
        this.jwtService = jwtService;
        this.userRepository = userRepository;
        this.configRepository = configRepository;
        this.sessionRepository = sessionRepository;
        this.registerserRepository = registerserRepository;
        this.userRepo = userRepo;
        this.billinguserRepo = billinguserRepo;
        this.roleRepository = roleRepository;
        this.subscriptionRepository = subscriptionRepository;
        this.mailConfigService = mailConfigService;
        this.mailService = mailService;
    }
    async validateUser(loginDto, response, req) {
        const { email, password } = loginDto;
        console.log("login dto", loginDto);
        try {
            const user = await this.userRepository.findUserWithMobileNumber(email);
            if (!user) {
                throw new common_1.UnauthorizedException({
                    message: 'User not found',
                    statusCode: 401,
                });
            }
            if (user.is_active !== 1) {
                throw new common_1.UnauthorizedException({
                    message: 'User is deactivated. Contact administrator.',
                    statusCode: 401,
                });
            }
            console.log("user", user);
            const isPasswordValid = await this.userRepository.validatePassword(password, user.password);
            console.log("isPasswordValid", password, user.password);
            if (!isPasswordValid) {
                throw new common_1.UnauthorizedException({
                    message: 'Invalid credentials',
                    statusCode: 401,
                });
            }
            if (!user.passwordSet) {
                await this.userRepository.update(user.user_id, {
                    passwordReset: 'Y'
                });
            }
            const subscription = await this.subscriptionRepository.findOne({
                where: { organization_profile_id: user.organization.organization_id },
                relations: ['plan', 'billingInfo'],
                order: { renewal_date: 'DESC' },
            });
            if (!subscription) {
                throw new common_1.UnauthorizedException({
                    message: 'No active subscription found for your organization.',
                    statusCode: 401,
                });
            }
            const today = new Date();
            const renewalDate = new Date(subscription.renewal_date);
            if ((0, date_fns_1.isBefore)(renewalDate, today)) {
                return {
                    success: false,
                    message: 'Your organization subscription has expired.',
                    status: 440,
                    data: {
                        redirect: '/renewal-page',
                        subscription_id: subscription.subscription_id,
                        organization_id: user.organization.organization_id,
                        subscriptionExpired: true,
                        renewal_date: subscription.renewal_date,
                    },
                };
            }
            const billing = subscription.billingInfo?.[0];
            if (billing) {
                if (billing.methodId === 1) {
                }
                else if (billing.methodId === 5) {
                    console.log("billing.methodId:", billing.methodId);
                    if (billing.status !== 'approved') {
                        throw new common_1.UnauthorizedException({
                            message: 'Offline payment not approved yet. Please contact admin.',
                            statusCode: 401,
                        });
                    }
                }
            }
            const organizationSchema = `org_${user.organization.organization_schema_name}`;
            await this.setSchema(organizationSchema);
            const query = `
      SELECT
        r.role_id,
        r.role_name,
        r.is_compulsary,
        u.user_id,
        u.first_name,
        u.last_name,
        u.profile_image,
        u.role_id,
        p.permission_id,
        p.permissions
      FROM ${organizationSchema}.users u
      LEFT JOIN ${organizationSchema}.organization_roles r
        ON u.role_id = r.role_id
      LEFT JOIN ${organizationSchema}.organization_permissions p
        ON r.role_id = p.role_id
      WHERE u.register_user_login_id = $1
        AND u.is_active = 1
        AND u.is_deleted = 0
      LIMIT 1;
    `;
            const result = await this.userRepository.query(query, [user.user_id]);
            if (!result || result.length === 0) {
                throw new common_1.BadRequestException('User is not active or role not found');
            }
            const { role_id, role_name, is_compulsary } = result[0];
            if (is_compulsary === true) {
                const otp = Math.floor(100000 + Math.random() * 900000).toString();
                const otpExpiry = new Date();
                otpExpiry.setMinutes(otpExpiry.getMinutes() + 5);
                await this.userRepository.update(user.user_id, { otp, otp_expiry: otpExpiry });
                const fullname = `${user.first_name} ${user.last_name}`;
                await this.mailService.sendEmail(email, "OTP for Login Verification", await (0, render_email_1.renderEmail)(render_email_1.EmailTemplate.AUTH_LOGIN_VERIFICATION, { name: fullname, otp }, this.mailConfigService));
            }
            const tokens = await this.generateTokens(user);
            const sessionId = (0, uuid_1.v4)();
            const parser = new ua_parser_js_1.default(req.headers['user-agent'] || "");
            const device = parser.getResult();
            console.log("device", device);
            console.log("sessionId", sessionId);
            const deviceName = device.device.vendor && device.device.model
                ? `${device.device.vendor} ${device.device.model}`
                : `${device.browser.name} on ${device.os.name}`;
            const deviceType = device.device.type || 'desktop';
            const browser = device.browser.name || 'Unknown';
            const os = device.os.name || 'Unknown';
            await this.sessionRepository.insert({
                user_id: user.user_id,
                session_id: sessionId,
                device_name: deviceName || `${browser} on ${os}`,
                device_type: deviceType,
                ip_address: req.ip,
                location: null,
                user_agent: req.headers['user-agent'],
                login_at: new Date(),
                last_seen: new Date(),
                is_active: true,
            });
            this.setAuthCookies(response, tokens, (0, crypto_utils_1.encrypt)(user.user_id.toString()), (0, crypto_utils_1.encrypt)(result[0].user_id.toString()), (0, crypto_utils_1.encrypt)(result[0].role_id.toString()), (0, crypto_utils_1.encrypt)(user.organization.organization_schema_name), (0, crypto_utils_1.encrypt)(user.organization.organization_id.toString()), (0, crypto_utils_1.encrypt)(result[0]?.permissions), sessionId);
            return {
                success: true,
                message: 'Login successful',
                status: 200,
                data: {
                    session_id: sessionId,
                    jwt_token: tokens.accessToken,
                    jwt_refresh_token: tokens.refreshToken,
                    user_id: user.user_id,
                    main_user_id: result[0].user_id,
                    organization_id: user.organization.organization_id,
                    role_id,
                    role: role_id ? { role_id, role_name, is_compulsary } : null,
                    passwordSet: user.passwordSet,
                    organization_schema_name: user.organization.organization_schema_name,
                    permissions: result[0].permissions,
                    profile_image: result[0].profile_image,
                },
            };
        }
        catch (error) {
            console.error('Login error:', error);
            throw error instanceof common_1.UnauthorizedException || error instanceof common_1.BadRequestException
                ? error
                : new common_1.InternalServerErrorException('Internal server error');
        }
    }
    async verifyLoginOtp(verifyOtpDto, response, context) {
        try {
            const { otp, user_id } = verifyOtpDto;
            console.log("verifyOtpDto", verifyOtpDto);
            console.log("otp dto", verifyOtpDto);
            const user = await this.userRepository.findOne({
                where: { otp, user_id, verified: true },
                relations: ['organization'],
            });
            if (!user) {
                throw new common_1.BadRequestException({
                    statusCode: 400,
                    message: 'Invalid OTP or user not found.',
                    details: { otp },
                });
            }
            if (new Date() > user.otp_expiry) {
                throw new common_1.HttpException({
                    statusCode: 410,
                    message: 'OTP has expired.',
                    details: { otp, expiryTime: user.otp_expiry },
                }, common_1.HttpStatus.GONE);
            }
            user.otp = null;
            user.otp_expiry = null;
            user.verified = true;
            await this.userRepository.save(user);
            const organizationSchema = `org_${user.organization.organization_schema_name}`;
            await this.setSchema(organizationSchema);
            const query = `
    SELECT
      r.role_id,
      r.role_name,
      u.user_id,
      u.first_name,
      u.last_name,
      u.profile_image,
      u.role_id,
      p.permission_id,
          p.permissions
    FROM ${organizationSchema}.users u
    LEFT JOIN ${organizationSchema}.organization_roles r
          ON u.role_id = r.role_id
        LEFT JOIN ${organizationSchema}.organization_permissions p
          ON r.role_id = p.role_id
    WHERE u.register_user_login_id = $1
      AND u.is_active = 1
      AND u.is_deleted = 0
      LIMIT 1;
  `;
            const result = await this.userRepository.query(query, [user.user_id]);
            console.log("RESULT 2 step", result);
            if (!result || result.length === 0) {
                throw new common_1.BadRequestException('User is not active or role not found');
            }
            const tokens = await this.generateTokens(user);
            const encryptedUserId = user.user_id ? (0, crypto_utils_1.encrypt)(user.user_id.toString()) : null;
            const encryptedSchemaName = user.organization.organization_schema_name ? (0, crypto_utils_1.encrypt)(user.organization.organization_schema_name) : null;
            const encryptedOrganizationId = user.organization.organization_id ? (0, crypto_utils_1.encrypt)(user.organization.organization_id.toString()) : null;
            const profileImage = result[0]?.profile_image || null;
            const encryptedPermissions = result[0]?.permissions ? (0, crypto_utils_1.encrypt)(JSON.stringify(result[0].permissions)) : null;
            const encryptedRoleId = result[0]?.role_id ? (0, crypto_utils_1.encrypt)(JSON.stringify(result[0].role_id)) : null;
            const encryptedProfileImage = profileImage ? (0, crypto_utils_1.encrypt)(profileImage) : null;
            response.clearCookie('jwtToken');
            response.clearCookie('jwt_refresh_token');
            response.clearCookie('x-organization-schema');
            response.clearCookie('system_user_id');
            response.cookie('jwtToken', tokens.accessToken, {
                httpOnly: true,
                secure: false,
                sameSite: 'none',
            });
            response.cookie('jwt_refresh_token', tokens.refreshToken, {
                httpOnly: true,
                secure: false,
                sameSite: 'none',
            });
            response.cookie('x-organization-schema', encryptedSchemaName, {
                httpOnly: true,
                secure: false,
                sameSite: 'none',
            });
            response.cookie('system_user_id', encryptedUserId, {
                httpOnly: true,
                secure: false,
                sameSite: 'none',
            });
            response.cookie('organization_id', encryptedOrganizationId, {
                httpOnly: true,
                secure: false,
                sameSite: 'none',
            });
            response.cookie('profile_image', encryptedProfileImage, {
                httpOnly: false,
            });
            response.cookie('role_id', encryptedRoleId, {
                httpOnly: false,
            });
            response.cookie('permissions', encryptedPermissions, {
                httpOnly: false,
            });
            return {
                status: 200,
                jwt_token: tokens.accessToken,
                jwt_refresh_token: tokens.refreshToken,
                user_id: user.user_id,
                organization_id: user.organization.organization_id,
                passwordSet: user.passwordSet,
                organization_schema_name: user.organization.organization_schema_name,
                permissions: result[0]?.permissions,
                role_id: result[0]?.role_id,
                main_user_id: result[0].user_id,
                profile_image: profileImage,
                message: 'Login successful',
            };
        }
        catch (error) {
            console.error('Login error:', error);
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException({
                statusCode: 500,
                message: 'Internal server error',
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async checkSubscriptionRestrictions(orgId) {
        const subscription = await this.subscriptionRepository.findOne({
            where: { organization_profile_id: orgId },
            relations: ['plan', 'billingInfo'],
            order: { renewal_date: 'DESC' },
        });
        if (!subscription) {
            return {
                valid: false,
                reason: 'no_subscription',
                message: 'No active subscription found',
            };
        }
        const today = new Date();
        const renewalDate = new Date(subscription.renewal_date);
        if (renewalDate < today) {
            return {
                valid: false,
                reason: 'expired',
                message: 'Subscription expired',
                renewal_date: subscription.renewal_date,
                subscription_id: subscription.subscription_id,
            };
        }
        const billing = subscription.billingInfo?.[0];
        if (billing && billing.methodId === 5 && billing.status !== 'approved') {
            return {
                valid: false,
                reason: 'offline_payment_pending',
                message: 'Offline payment not approved',
            };
        }
        if (subscription.restrict_login === true) {
            return {
                valid: false,
                reason: 'login_restricted',
                message: 'Login is restricted for this organization due to plan limitations.',
                subscription_id: subscription.subscription_id,
            };
        }
        return {
            valid: true,
            reason: null,
            message: 'Subscription is valid',
            renewal_date: subscription.renewal_date,
            subscription_id: subscription.subscription_id,
            isTrial: subscription.plan?.set_trial || false,
        };
    }
    async logout(req, res) {
        try {
            const cookies = (0, cookie_1.parse)(req.headers.cookie || '');
            const sessionId = cookies.session_id;
            if (sessionId) {
                await this.sessionRepository.update({ session_id: sessionId }, {
                    is_active: false,
                    logout_at: new Date(),
                });
            }
            const cookiesToClear = [
                "jwtToken",
                "jwt_refresh_token",
                "x-organization-schema",
                "system_user_id",
                "organization_id",
                "main_user_id",
                "role_id",
                "profile_image",
                "permissions",
                "session_id",
            ];
            cookiesToClear.forEach((cookieName) => {
                res.clearCookie(cookieName, { httpOnly: true });
            });
            return { message: 'Logged out successfully' };
        }
        catch (error) {
            console.error('Logout error:', error);
            throw new common_1.HttpException({ message: 'Logout failed', error: error.message }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async logoutAllSessions(userId, res) {
        try {
            await this.sessionRepository.update({ user_id: userId, is_active: true }, { is_active: false, logout_at: new Date() });
            const cookiesToClear = [
                "jwtToken",
                "jwt_refresh_token",
                "x-organization-schema",
                "system_user_id",
                "organization_id",
                "main_user_id",
                "role_id",
                "profile_image",
                "permissions",
                "session_id",
            ];
            cookiesToClear.forEach((cookieName) => {
                res.clearCookie(cookieName, { httpOnly: true });
            });
            return { message: 'Logged out from all sessions successfully' };
        }
        catch (error) {
            console.error('Logout all sessions error:', error);
            throw new common_1.HttpException({ message: 'Logout failed', error: error.message }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async logoutAllSessionsByUserId(localUserId) {
        try {
            return { message: `All sessions logged out for public user ` };
        }
        catch (error) {
            console.error('Logout all sessions error:', error);
            throw new common_1.HttpException({ message: 'Logout all sessions failed', error: error.message }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async fetchUserLoginProfile(login_user_id) {
        const userExists = await this.userRepository.findOne({
            where: { user_id: login_user_id },
        });
        if (!userExists) {
            throw new common_1.HttpException({ status: common_1.HttpStatus.BAD_REQUEST, message: 'Invalid user ID' }, common_1.HttpStatus.BAD_REQUEST);
        }
        const matchedUser = await this.userRepo.findOne({
            where: {
                users_business_email: userExists.business_email,
            },
            relations: [
                'user_role',
                'user_department',
                'user_designation',
            ],
        });
        return {
            userExists,
            matchedUser,
        };
    }
    async getApiKey() {
        return await this.configRepository.getJwtSecret();
    }
    async generateTokens(user) {
        const JWT_ACCESS_EXPIRATION = process.env.JWT_ACCESS_EXPIRATION;
        const JWT_REFRESH_EXPIRATION = process.env.JWT_REFRESH_EXPIRATION;
        const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET_KEY;
        const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET_KEY;
        const accessSecret = new TextEncoder().encode(ACCESS_SECRET.padEnd(32, '0'));
        const refreshSecret = new TextEncoder().encode(REFRESH_SECRET.padEnd(32, '0'));
        const payload = {
            userId: user.user_id,
            organizationSchema: user.organization.organization_schema_name,
        };
        const encryptPayload = async (payload, secret) => {
            const encodedPayload = new TextEncoder().encode(JSON.stringify(payload));
            return await new jose_1.CompactEncrypt(encodedPayload)
                .setProtectedHeader({ alg: 'dir', enc: 'A256GCM' })
                .encrypt(secret);
        };
        const encryptedPayload = await encryptPayload(payload, accessSecret);
        const accessToken = await new jose_1.SignJWT({ data: encryptedPayload })
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime(JWT_ACCESS_EXPIRATION)
            .sign(accessSecret);
        const refreshToken = await new jose_1.SignJWT({ data: encryptedPayload })
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime(JWT_REFRESH_EXPIRATION)
            .sign(refreshSecret);
        const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
        await this.userRepository.update(user.user_id, { refreshToken: hashedRefreshToken });
        return { accessToken, refreshToken };
    }
    async updatePassword(user_id, newPassword, response, currentPassword) {
        if (!user_id) {
            console.error('Invalid user_id:', user_id);
            throw new common_1.BadRequestException('Invalid user ID');
        }
        const user = await this.userRepository.findOne({ where: { user_id } });
        console.log("user from repo 458", user);
        if (!user) {
            throw new common_1.UnauthorizedException('User not found');
        }
        if (currentPassword) {
            const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
            if (!isPasswordValid) {
                throw new common_1.UnauthorizedException('Current password is incorrect');
            }
        }
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        await this.userRepository.update(user_id, {
            password: hashedNewPassword,
            passwordSet: true,
            verified: true,
            passwordReset: 'N'
        });
        const fetchUser = await this.userRepository.findUserWithOrganizationSchema(user.business_email);
        console.log("fetchUser 485", fetchUser);
        const orgSchema = `org_${fetchUser.organization.organization_schema_name}`;
        await this.setSchema(orgSchema);
        await this.userRepository.query(`UPDATE ${orgSchema}.users
   SET password = $1, updated_at = NOW()
   WHERE register_user_login_id = $2`, [hashedNewPassword, user.user_id]);
        const query = `
  SELECT
    u.user_id,
    u.first_name,
    u.last_name,
    u.profile_image,
    r.role_id,
    r.role_name,
    r.is_compulsary,
    p.permission_id,
    p.permissions
  FROM ${orgSchema}.users u
  LEFT JOIN ${orgSchema}.organization_roles r
    ON u.role_id = r.role_id
  LEFT JOIN ${orgSchema}.organization_permissions p
    ON p.role_id = u.role_id
  WHERE u.register_user_login_id = $1
    AND u.is_active = 1
    AND u.is_deleted = 0
  LIMIT 1;
`;
        const result = await this.userRepository.query(query, [user.user_id]);
        if (result[0].is_compulsary === true) {
            const otp = Math.floor(100000 + Math.random() * 900000).toString();
            const otpExpiry = new Date();
            otpExpiry.setMinutes(otpExpiry.getMinutes() + 5);
            await this.userRepository.update(user.user_id, {
                otp,
                otp_expiry: otpExpiry,
            });
            const fullname = user.first_name + " " + user.last_name;
            await this.mailService.sendEmail(user.business_email, "OTP for Login Verification", await (0, render_email_1.renderEmail)(render_email_1.EmailTemplate.AUTH_LOGIN_VERIFICATION, {
                name: fullname,
                otp: otp,
            }, this.mailConfigService));
        }
        if (!result || result.length === 0) {
            throw new common_1.BadRequestException('User is not active or role not found');
        }
        console.log('users details 494', result);
        const tokens = await this.generateTokens(fetchUser);
        const encryptedUserId = user.user_id ? (0, crypto_utils_1.encrypt)(user.user_id.toString()) : null;
        const encryptedSchemaName = fetchUser.organization.organization_schema_name ? (0, crypto_utils_1.encrypt)(fetchUser.organization.organization_schema_name) : null;
        const encryptedOrganizationId = fetchUser.organization.organization_id ? (0, crypto_utils_1.encrypt)(fetchUser.organization.organization_id.toString()) : null;
        const profileImage = result[0]?.profile_image || null;
        const encryptedProfileImage = profileImage ? (0, crypto_utils_1.encrypt)(profileImage) : null;
        const encryptedPermissions = result[0]?.permissions ? (0, crypto_utils_1.encrypt)(JSON.stringify(result[0].permissions)) : null;
        response.clearCookie('jwtToken');
        response.clearCookie('jwt_refresh_token');
        response.clearCookie('x-organization-schema');
        response.clearCookie('system_user_id');
        response.cookie('jwtToken', tokens.accessToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'none',
        });
        response.cookie('jwt_refresh_token', tokens.refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'none',
        });
        response.cookie('x-organization-schema', encryptedSchemaName, {
            httpOnly: true,
        });
        response.cookie('system_user_id', encryptedUserId, {
            httpOnly: true,
            secure: false,
            sameSite: 'none',
        });
        response.cookie('organization_id', encryptedOrganizationId, {
            httpOnly: true,
            secure: false,
            sameSite: 'none',
        });
        response.cookie('profile_image', encryptedProfileImage, {
            httpOnly: false,
        });
        response.cookie('permissions', encryptedPermissions, {
            httpOnly: false,
        });
        const orgSubscription = await this.subscriptionRepository.findOne({
            where: {
                created_by: fetchUser.user_id,
                organization_profile_id: fetchUser.organization.organization_id
            },
        });
        let planId = null;
        if (orgSubscription) {
            planId = orgSubscription.plan_id;
        }
        return {
            status: 200,
            jwt_token: tokens.accessToken,
            jwt_refresh_token: tokens.refreshToken,
            user_id: fetchUser.user_id,
            passwordSet: fetchUser.passwordSet,
            organization_schema_name: fetchUser.organization.organization_schema_name,
            organization_id: fetchUser.organization.organization_id,
            permissions: result[0]?.permissions,
            profile_image: profileImage,
            role_id: result[0]?.role_id,
            is_compulsary: result[0].is_compulsary,
            main_user_id: result[0]?.user_id,
            plan_id: planId,
            newPassword: newPassword,
            message: 'Password reset successful, redirecting to organization profile!! '
        };
    }
    async updateNewPassword(user_id, newPassword, response, currentPassword) {
        if (!user_id) {
            console.error('Invalid user_id:', user_id);
            throw new common_1.BadRequestException('Invalid user ID');
        }
        console.log("My user user_id:", user_id);
        const user = await this.userRepository.findOne({ where: { user_id } });
        console.log("user from repo 458", user);
        if (!user) {
            throw new common_1.UnauthorizedException('User not found');
        }
        if (currentPassword) {
            const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
            if (!isPasswordValid) {
                throw new common_1.UnauthorizedException('Current password is incorrect');
            }
        }
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        await this.userRepository.update(user_id, {
            password: hashedNewPassword,
            passwordSet: true,
            verified: true,
            passwordReset: 'N'
        });
        const fetchUser = await this.userRepository.findUserWithOrganizationSchema(user.business_email);
        console.log("fetchUser 485", fetchUser);
        const orgSchema = `org_${fetchUser.organization.organization_schema_name}`;
        await this.setSchema(orgSchema);
        await this.userRepository.query(`UPDATE ${orgSchema}.users
   SET password = $1, updated_at = NOW()
   WHERE register_user_login_id = $2`, [hashedNewPassword, user.user_id]);
        const query = `
  SELECT
    u.user_id,
    u.first_name,
    u.last_name,
    u.profile_image,
    r.role_id,
    r.role_name,
    r.is_compulsary,
    p.permission_id,
    p.permissions
  FROM ${orgSchema}.users u
  LEFT JOIN ${orgSchema}.organization_roles r
    ON u.role_id = r.role_id
  LEFT JOIN ${orgSchema}.organization_permissions p
    ON p.role_id = u.role_id
  WHERE u.register_user_login_id = $1
    AND u.is_active = 1
    AND u.is_deleted = 0
  LIMIT 1;
`;
        const result = await this.userRepository.query(query, [user.user_id]);
        if (result[0].is_compulsary === true) {
            const otp = Math.floor(100000 + Math.random() * 900000).toString();
            const otpExpiry = new Date();
            otpExpiry.setMinutes(otpExpiry.getMinutes() + 5);
            await this.userRepository.update(user.user_id, {
                otp,
                otp_expiry: otpExpiry,
            });
            const fullname = user.first_name + " " + user.last_name;
            await this.mailService.sendEmail(user.business_email, "OTP for Login Verification", await (0, render_email_1.renderEmail)(render_email_1.EmailTemplate.AUTH_LOGIN_VERIFICATION, {
                name: fullname,
                otp: otp,
            }, this.mailConfigService));
        }
        if (!result || result.length === 0) {
            throw new common_1.BadRequestException('User is not active or role not found');
        }
        console.log('users details 494', result);
        const tokens = await this.generateTokens(fetchUser);
        const encryptedUserId = user.user_id ? (0, crypto_utils_1.encrypt)(user.user_id.toString()) : null;
        const encryptedSchemaName = fetchUser.organization.organization_schema_name ? (0, crypto_utils_1.encrypt)(fetchUser.organization.organization_schema_name) : null;
        const encryptedOrganizationId = fetchUser.organization.organization_id ? (0, crypto_utils_1.encrypt)(fetchUser.organization.organization_id.toString()) : null;
        const profileImage = result[0]?.profile_image || null;
        const encryptedProfileImage = profileImage ? (0, crypto_utils_1.encrypt)(profileImage) : null;
        const encryptedPermissions = result[0]?.permissions ? (0, crypto_utils_1.encrypt)(JSON.stringify(result[0].permissions)) : null;
        response.clearCookie('jwtToken');
        response.clearCookie('jwt_refresh_token');
        response.clearCookie('x-organization-schema');
        response.clearCookie('system_user_id');
        response.cookie('jwtToken', tokens.accessToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'none',
        });
        response.cookie('jwt_refresh_token', tokens.refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'none',
        });
        response.cookie('x-organization-schema', encryptedSchemaName, {
            httpOnly: true,
        });
        response.cookie('system_user_id', encryptedUserId, {
            httpOnly: true,
            secure: false,
            sameSite: 'none',
        });
        response.cookie('organization_id', encryptedOrganizationId, {
            httpOnly: true,
            secure: false,
            sameSite: 'none',
        });
        response.cookie('profile_image', encryptedProfileImage, {
            httpOnly: false,
        });
        response.cookie('permissions', encryptedPermissions, {
            httpOnly: false,
        });
        const orgSubscription = await this.subscriptionRepository.findOne({
            where: {
                created_by: fetchUser.user_id,
                organization_profile_id: fetchUser.organization.organization_id
            },
        });
        let planId = null;
        if (orgSubscription) {
            planId = orgSubscription.plan_id;
        }
        return {
            status: 200,
            jwt_token: tokens.accessToken,
            jwt_refresh_token: tokens.refreshToken,
            user_id: fetchUser.user_id,
            passwordSet: fetchUser.passwordSet,
            organization_schema_name: fetchUser.organization.organization_schema_name,
            organization_id: fetchUser.organization.organization_id,
            permissions: result[0]?.permissions,
            profile_image: profileImage,
            role_id: result[0]?.role_id,
            is_compulsary: result[0].is_compulsary,
            main_user_id: result[0]?.user_id,
            plan_id: planId,
            newPassword: newPassword,
            message: 'Password reset successful, redirecting to organization profile!! '
        };
    }
    async validatePasswordResetLink(userId) {
        const loginUser = await this.userRepository.findOne({
            where: { user_id: userId, passwordReset: 'Y' },
        });
        console.log("loginUser", loginUser);
        return loginUser ? true : false;
    }
    async sendOtpForPasswordReset(email) {
        const user = await this.userRepository.findOne({ where: { business_email: email } });
        if (!user) {
            throw new common_1.HttpException('User not found.', common_1.HttpStatus.NOT_FOUND);
        }
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiry = new Date();
        otpExpiry.setMinutes(otpExpiry.getMinutes() + 5);
        try {
            await this.userRepository.update(user.user_id, {
                otp,
                otp_expiry: otpExpiry,
            });
            await this.mailService.sendEmail(email, "OTP for Reset Password", await (0, render_email_1.renderEmail)(render_email_1.EmailTemplate.PASSWORD_RESET, {
                name: user.first_name + ' ' + user.last_name,
                otp: otp,
            }, this.mailConfigService));
            return {
                status: 200,
                message: 'OTP sent on email.',
                data: user.user_id,
            };
        }
        catch (error) {
            throw new common_1.HttpException('Failed to update OTP or send email.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async verifyForgotPasswordOtp(verifyOtpDto, res) {
        const { otp, user_id } = verifyOtpDto;
        const user = await this.userRepository.findOne({
            where: { otp, user_id },
        });
        if (!user) {
            throw new common_1.BadRequestException({
                statusCode: 400,
                message: 'Invalid OTP or user not found.',
            });
        }
        if (new Date() > user.otp_expiry) {
            throw new common_1.HttpException({
                statusCode: 410,
                message: 'OTP has expired.',
            }, common_1.HttpStatus.GONE);
        }
        await this.userRepository.update(user.user_id, {
            otp: null,
            otp_expiry: null,
        });
        return {
            statusCode: 200,
            message: 'OTP has been verified.',
        };
    }
    async setSchema(schema) {
        const queryRunner = this.userRepository.manager.connection.createQueryRunner();
        await queryRunner.startTransaction();
        try {
            await queryRunner.query(`SET search_path TO ${schema}, public`);
            await queryRunner.commitTransaction();
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw new Error(`Failed to set schema: ${error.message}`);
        }
        finally {
            await queryRunner.release();
        }
    }
    async organization_name(email, otp) {
        const transporter = nodemailer.createTransport({
            host: 'smtp.zeptomail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD_NORBIK,
            },
        });
        const mailOptions = {
            from: process.env.FROM_EMAIL,
            to: email,
            subject: 'OTP for Reset Password on Norbik Asset',
            text: `Hi,
   
          ${otp} is your OTP to reset your credentials for the Norbik Asset.
         
          This OTP is valid for the next 15 minutes only. Do not share it with anyone.
         
          Thanks for trusting brand Norbik Asset!
         
          Norbik Asset Support Team.
         
          ---
         
          This is a system-generated email. Do not reply to this mail. If you have any queries, please write to support@norbik.com`,
        };
        try {
            await transporter.sendMail(mailOptions);
            console.log('OTP email sent successfully.');
        }
        catch (error) {
            console.error('Error sending OTP email:', error);
            throw new Error('Failed to send OTP email.');
        }
    }
    async authloginmail(email, otp, fullname) {
        const transporter = nodemailer.createTransport({
            host: 'smtp.zeptomail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD_NORBIK,
            },
        });
        const mailOptions = {
            from: process.env.FROM_EMAIL,
            to: email,
            subject: 'OTP for Login on Norbik Asset portal',
            text: `
        Hi ${fullname},
   
        ${otp} is your OTP to log in to your Norbik Asset.
   
        This OTP is valid for the next 15 minutes only. Do not share it with anyone.
   
        Thanks for trusting the Norbik Asset!
   
       Norbik Asset Support Team.
   
        This is a system-generated email. Please do not reply to this email. If you have any queries, write to support@norbik.in.
      `,
        };
        await transporter.sendMail(mailOptions);
    }
    async sendOtpForPasswordResetByUserId(userId, oldPassword, newPassword) {
        const user = await this.userRepository.findOne({
            where: { user_id: Number(userId) },
            select: ['user_id', 'business_email', 'password'],
        });
        if (!user) {
            throw new common_1.HttpException('User not found.', common_1.HttpStatus.NOT_FOUND);
        }
        if (!user.business_email) {
            throw new common_1.HttpException('No email associated with this user.', common_1.HttpStatus.BAD_REQUEST);
        }
        console.log("🔹 User found:", user);
        const isOldPasswordCorrect = await bcrypt.compare(oldPassword, user.password);
        if (!isOldPasswordCorrect) {
            throw new common_1.HttpException('Incorrect current password.', common_1.HttpStatus.BAD_REQUEST);
        }
        const isSamePassword = await bcrypt.compare(newPassword, user.password);
        if (isSamePassword) {
            throw new common_1.HttpException('New password cannot be the same as the current password.', common_1.HttpStatus.BAD_REQUEST);
        }
        console.log("Old password verified. Sending OTP to:", user.business_email);
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiry = new Date();
        otpExpiry.setMinutes(otpExpiry.getMinutes() + 15);
        try {
            await this.userRepository.update(user.user_id, { otp, otp_expiry: otpExpiry });
            await this.organization_name(user.business_email, otp);
            return {
                status: 200,
                message: 'OTP sent to registered email.',
                data: user.business_email,
            };
        }
        catch (error) {
            throw new common_1.HttpException('Failed to send OTP.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async verifyResetPasswordOtp(verifyOtpDto, response) {
        const { otp, user_id, newPassword, currentPassword } = verifyOtpDto;
        console.log("Received Data:", { otp, user_id, newPassword, currentPassword });
        const user = await this.userRepository.findOne({ where: { user_id, otp } });
        if (!user) {
            throw new common_1.BadRequestException({
                statusCode: 400,
                message: "Invalid OTP or user not found.",
            });
        }
        if (new Date() > user.otp_expiry) {
            throw new common_1.HttpException({ statusCode: 410, message: "OTP has expired." }, common_1.HttpStatus.GONE);
        }
        console.log("OTP Verified. Validating Old Password...");
        if (currentPassword) {
            const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
            if (!isPasswordValid) {
                throw new common_1.BadRequestException({
                    statusCode: 400,
                    message: "Current password is incorrect.",
                });
            }
        }
        console.log("Old password validated. Updating Password...");
        const passwordUpdateResponse = await this.updatePassword(user_id, newPassword, response);
        await this.userRepository.update(user.user_id, { otp: null, otp_expiry: null });
        const fetchUser = await this.userRepository.findUserWithOrganizationSchema(user.business_email);
        const orgSchema = `org_${fetchUser.organization.organization_schema_name}`;
        await this.setSchema(orgSchema);
        await this.userRepository.query(`UPDATE ${orgSchema}.users
     SET password = $1, updated_at = NOW()
     WHERE register_user_login_id = $2`, [newPassword, user.user_id]);
        console.log("Password updated. Sending confirmation email...");
        await this.sendPasswordUpdateEmail(user.business_email, user.first_name, user.last_name);
        return {
            statusCode: 200,
            message: "Password has been reset successfully. Confirmation email sent.",
            passwordUpdateResponse,
        };
    }
    async sendPasswordUpdateEmail(email, firstName, lastName) {
        try {
            await this.mailService.sendEmail(email, " Password Successfully Updated", await (0, render_email_1.renderEmail)(render_email_1.EmailTemplate.PASSWORD_UPDATED_SUCCESS, {
                name: `${firstName} ${lastName}`,
            }, this.mailConfigService));
            console.log(`Password update confirmation email sent to ${email}`);
            return {
                status: 200,
                message: "Password update confirmation email sent successfully.",
            };
        }
        catch (error) {
            console.error(`Failed to send password update email to ${email}`, error);
            throw new common_1.HttpException("Failed to send password update email.", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async setPassword(userId, newPassword) {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const userUpdateResult = await this.userRepository.update(userId, {
            password: hashedPassword,
        });
        if (!userUpdateResult.affected) {
            throw new common_1.BadRequestException({
                statusCode: 400,
                message: "User not found or password update failed.",
            });
        }
        const user = await this.userRepository.findOne({ where: { user_id: Number(userId) } });
        if (!user) {
            throw new common_1.BadRequestException({
                statusCode: 400,
                message: "User not found after update.",
            });
        }
        try {
            await this.mailService.sendEmail(user.business_email, " Your Password Has Been Set Successfully", await (0, render_email_1.renderEmail)(render_email_1.EmailTemplate.PASSWORD_GENERATED_SUCCESS, {
                name: `${user.first_name} ${user.last_name}`,
                newPassword,
            }, this.mailConfigService));
            console.log(`Password set notification email sent to ${user.business_email}`);
        }
        catch (error) {
            console.error(`Failed to send password set notification email to ${user.business_email}`, error);
            throw new common_1.HttpException("Failed to send password set notification email.", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return { userId, message: "Password has been successfully updated and notification email sent." };
    }
    setAuthCookies(response, tokens, encryptedUserId, encryptedMainUserId, encryptedRoleId, encryptedSchemaName, encryptedOrganizationId, encryptedPermissions, sessionId) {
        const isHttps = process.env.USE_HTTPS === 'true';
        const cookieOptions = {
            httpOnly: true,
            secure: isHttps,
            sameSite: (isHttps ? 'none' : 'lax'),
            maxAge: 24 * 60 * 60 * 1000,
            path: '/',
        };
        response.cookie('jwtToken', tokens.accessToken, cookieOptions);
        response.cookie('jwt_refresh_token', tokens.refreshToken, cookieOptions);
        response.cookie('system_user_id', encryptedUserId, cookieOptions);
        response.cookie('x-organization-schema', encryptedSchemaName, cookieOptions);
        response.cookie('organization_id', encryptedOrganizationId, cookieOptions);
        const nonHttpOnlyOptions = { ...cookieOptions, httpOnly: false };
        response.cookie('session_id', sessionId, nonHttpOnlyOptions);
        response.cookie('role_id', encryptedRoleId, nonHttpOnlyOptions);
        response.cookie('permissions', encryptedPermissions, nonHttpOnlyOptions);
        response.cookie('main_user_id', encryptedMainUserId, nonHttpOnlyOptions);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(user_repository_1.UserRepository)),
    __param(3, (0, typeorm_1.InjectRepository)(sessions_entity_1.Session)),
    __param(4, (0, typeorm_1.InjectRepository)(register_user_login_entity_1.RegisterUserLogin)),
    __param(5, (0, typeorm_1.InjectRepository)(organizational_user_entity_1.User)),
    __param(6, (0, typeorm_1.InjectRepository)(public_billing_portal_user_entity_1.BillingPortalUser)),
    __param(7, (0, typeorm_1.InjectRepository)(organizational_user_entity_1.User)),
    __param(8, (0, typeorm_1.InjectRepository)(org_subscription_entity_1.OrgSubscription)),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        user_repository_1.UserRepository,
        config_repository_1.ConfigRepository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        mail_config_service_1.MailConfigService,
        mail_service_1.MailService])
], AuthService);
