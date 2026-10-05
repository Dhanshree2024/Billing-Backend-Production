import { JwtService } from '@nestjs/jwt';
import { VerifyOtpDto } from '../organization_register/verify-otp.dto';
import { UserRepository } from '../user/user.repository';
import { LoginDto } from './dto/login.dto';
import { Request, Response } from 'express';
import { ConfigRepository } from 'src/config/config.repository';
import { RegisterUserLogin } from '../organization_register/entities/register-user-login.entity';
import { MailService } from 'src/common/mail/mail.service';
import { BillingPortalUser } from 'src/organization_register/entities/public_billing_portal_user.entity';
import { Roles } from 'src/organization_roles_permission/entity/role.entity';
import { User } from 'src/organizational-profile/entity/organizational-user.entity';
import { Session } from 'src/organizational-profile/public_schema_entity/sessions.entity';
import { OrgSubscription } from 'src/subscription_pricing/entity/org_subscription.entity';
import { Repository } from 'typeorm';
import { MailConfigService } from '../common/mail/mail-config.service';
export declare class AuthService {
    private jwtService;
    private userRepository;
    private readonly configRepository;
    private readonly sessionRepository;
    private readonly registerserRepository;
    private readonly userRepo;
    private readonly billinguserRepo;
    private readonly roleRepository;
    private readonly subscriptionRepository;
    private readonly mailConfigService;
    private readonly mailService;
    constructor(jwtService: JwtService, userRepository: UserRepository, configRepository: ConfigRepository, sessionRepository: Repository<Session>, registerserRepository: Repository<RegisterUserLogin>, userRepo: Repository<User>, billinguserRepo: Repository<BillingPortalUser>, roleRepository: Repository<Roles>, subscriptionRepository: Repository<OrgSubscription>, mailConfigService: MailConfigService, mailService: MailService);
    validateUser(loginDto: LoginDto, response: Response, req: Request): Promise<{
        success: boolean;
        message: string;
        data?: any;
        status: number;
    }>;
    verifyLoginOtp(verifyOtpDto: VerifyOtpDto, response: Response, context: any): Promise<any>;
    checkSubscriptionRestrictions(orgId: number): Promise<{
        valid: boolean;
        reason: string;
        message: string;
        renewal_date?: undefined;
        subscription_id?: undefined;
        isTrial?: undefined;
    } | {
        valid: boolean;
        reason: string;
        message: string;
        renewal_date: Date;
        subscription_id: number;
        isTrial?: undefined;
    } | {
        valid: boolean;
        reason: string;
        message: string;
        subscription_id: number;
        renewal_date?: undefined;
        isTrial?: undefined;
    } | {
        valid: boolean;
        reason: any;
        message: string;
        renewal_date: Date;
        subscription_id: number;
        isTrial: boolean;
    }>;
    logout(req: Request, res: Response): Promise<{
        message: string;
    }>;
    logoutAllSessions(userId: number, res: Response): Promise<{
        message: string;
    }>;
    logoutAllSessionsByUserId(localUserId: number): Promise<{
        message: string;
    }>;
    fetchUserLoginProfile(login_user_id: number): Promise<{
        userExists: BillingPortalUser;
        matchedUser: User;
    }>;
    getApiKey(): Promise<string | null>;
    generateTokens(user: any): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    updatePassword(user_id: number, newPassword: string, response: Response, currentPassword?: string): Promise<{
        jwt_token: string;
        message?: string;
        status?: number;
        user_id?: number;
        passwordSet?: boolean;
        jwt_refresh_token?: string;
        organization_schema_name?: string;
        organization_id?: number;
        permissions: string;
        profile_image: string;
        role_id: number;
        main_user_id: number;
        is_compulsary: boolean;
        plan_id?: number;
        newPassword?: string;
    }>;
    updateNewPassword(user_id: number, newPassword: string, response: Response, currentPassword?: string): Promise<{
        jwt_token: string;
        message?: string;
        status?: number;
        user_id?: number;
        passwordSet?: boolean;
        jwt_refresh_token?: string;
        organization_schema_name?: string;
        organization_id?: number;
        permissions: string;
        profile_image: string;
        role_id: number;
        main_user_id: number;
        is_compulsary: boolean;
        plan_id?: number;
        newPassword?: string;
    }>;
    validatePasswordResetLink(userId: number): Promise<boolean>;
    sendOtpForPasswordReset(email: string): Promise<any>;
    verifyForgotPasswordOtp(verifyOtpDto: VerifyOtpDto, res: Response): Promise<any>;
    private setSchema;
    private organization_name;
    private authloginmail;
    sendOtpForPasswordResetByUserId(userId: string, oldPassword: string, newPassword: string): Promise<any>;
    verifyResetPasswordOtp(verifyOtpDto: {
        otp: string;
        user_id: number;
        newPassword: string;
        currentPassword?: string;
    }, response: Response): Promise<any>;
    sendPasswordUpdateEmail(email: string, firstName: string, lastName: string): Promise<any>;
    setPassword(userId: string, newPassword: string): Promise<any>;
    private setAuthCookies;
}
