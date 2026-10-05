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
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const user_repository_1 = require("../user/user.repository");
const cookie_1 = require("cookie");
const jose_1 = require("jose");
const bcrypt = __importStar(require("bcrypt"));
const crypto_utils_1 = require("../common/encryption_decryption/crypto-utils");
const sessions_entity_1 = require("../organizational-profile/public_schema_entity/sessions.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const register_user_login_entity_1 = require("../organization_register/entities/register-user-login.entity");
const public_billing_portal_user_entity_1 = require("../organization_register/entities/public_billing_portal_user.entity");
let JwtAuthGuard = class JwtAuthGuard {
    constructor(jwtService, userRepository, sessionRepository, registerUserLogin, billinguserRepo) {
        this.jwtService = jwtService;
        this.userRepository = userRepository;
        this.sessionRepository = sessionRepository;
        this.registerUserLogin = registerUserLogin;
        this.billinguserRepo = billinguserRepo;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const response = context.switchToHttp().getResponse();
        console.log('s');
        const cookies = (0, cookie_1.parse)(request.headers.cookie || '');
        console.log("cookies", cookies);
        const accessToken = cookies.jwtToken;
        const refreshToken = cookies.jwt_refresh_token;
        const accessSecret = Buffer.from(process.env.JWT_ACCESS_SECRET_KEY.padEnd(32, '0'));
        const x_user_id = cookies.system_user_id;
        const sessionId = cookies.session_id;
        console.log("sessionId", sessionId);
        if (!sessionId)
            throw new common_1.UnauthorizedException('Session ID missing');
        if (!x_user_id) {
            throw new common_1.UnauthorizedException('User ID cookie is missing.');
        }
        const decryptedUserId = (0, crypto_utils_1.decrypt)(x_user_id.toString());
        const numericUserId = Number(decryptedUserId);
        console.log("numericUserId", numericUserId);
        if (isNaN(numericUserId)) {
            throw new common_1.UnauthorizedException('Invalid user ID');
        }
        const session = await this.sessionRepository.findOne({ where: { session_id: sessionId, user_id: numericUserId } });
        if (!session || !session.is_active || session.is_blocked) {
            throw new common_1.UnauthorizedException('Session is inactive or blocked.');
        }
        console.log('session', session);
        const user = await this.billinguserRepo.findOne({
            where: { user_id: numericUserId }
        });
        if (!user || !user.is_active) {
            throw new common_1.UnauthorizedException('User is inactive.');
        }
        if (!accessToken) {
            throw new common_1.UnauthorizedException('Access token not found. Please log in.');
        }
        const maxInactiveMinutes = 30;
        if (new Date().getTime() - new Date(session.last_seen).getTime() > maxInactiveMinutes * 60000) {
            console.log(`User ${session.user_id} inactive for > ${maxInactiveMinutes} mins.`);
        }
        await this.sessionRepository.update(sessionId, { last_seen: new Date() });
        try {
            const decoded = await this.jwtService.verify(accessToken, { secret: accessSecret });
            request.user = decoded;
            return true;
        }
        catch (error) {
            if (error.name === 'TokenExpiredError') {
                if (!refreshToken) {
                    throw new common_1.UnauthorizedException('Refresh token is missing. Please log in again.');
                }
                try {
                    const user = await this.userRepository.findOne({
                        where: { user_id: numericUserId, verified: true },
                        relations: ['organization'],
                    });
                    if (!user) {
                        throw new common_1.UnauthorizedException('Invalid refresh token. Please log in again.');
                    }
                    console.log(refreshToken);
                    console.log(user.refreshToken);
                    const isMatch = await bcrypt.compare(refreshToken, user.refreshToken);
                    console.log(isMatch);
                    if (!isMatch) {
                        throw new common_1.UnauthorizedException('Invalid refresh token. Please log in again.');
                    }
                    const tokens = await this.generateTokens(user);
                    response.clearCookie('jwtToken', {
                        httpOnly: true,
                    });
                    response.clearCookie('jwt_refresh_token', {
                        httpOnly: true,
                    });
                    response.cookie('jwtToken', tokens.accessToken, {
                        httpOnly: true,
                    });
                    response.cookie('jwt_refresh_token', tokens.refreshToken, {
                        httpOnly: true,
                    });
                    const newDecoded = this.jwtService.verify(tokens.accessToken, { secret: accessSecret });
                    request.user = newDecoded;
                    await this.sessionRepository.update(sessionId, { last_seen: new Date() });
                    return true;
                }
                catch (refreshError) {
                    console.log(refreshError);
                    throw new common_1.UnauthorizedException('Invalid refresh token. Please log in again.');
                }
            }
            else {
                throw new common_1.UnauthorizedException('Invalid access token. Please log in again.');
            }
        }
    }
    async generateTokens(user) {
        console.log('in the generated token funtion');
        console.log(user);
        const JWT_ACCESS_EXPIRATION = process.env.JWT_ACCESS_EXPIRATION;
        const JWT_REFRESH_EXPIRATION = process.env.JWT_REFRESH_EXPIRATION;
        const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET_KEY;
        const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET_KEY;
        const accessSecret = Buffer.from(ACCESS_SECRET.padEnd(32, '0'));
        const refreshSecret = Buffer.from(REFRESH_SECRET.padEnd(32, '0'));
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
};
exports.JwtAuthGuard = JwtAuthGuard;
exports.JwtAuthGuard = JwtAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(user_repository_1.UserRepository)),
    __param(2, (0, typeorm_1.InjectRepository)(sessions_entity_1.Session)),
    __param(3, (0, typeorm_1.InjectRepository)(register_user_login_entity_1.RegisterUserLogin)),
    __param(4, (0, typeorm_1.InjectRepository)(public_billing_portal_user_entity_1.BillingPortalUser)),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        user_repository_1.UserRepository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], JwtAuthGuard);
