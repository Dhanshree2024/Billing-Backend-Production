import { ExecutionContext } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { Response, Request } from 'express';
import { DataSource } from 'typeorm';
import { VerifyOtpDto } from '../organization_register/verify-otp.dto';
export declare class AuthController {
    private authService;
    private readonly dataSource;
    constructor(authService: AuthService, dataSource: DataSource);
    login(loginDto: LoginDto, response: Response, req: Request): Promise<Response<any, Record<string, any>>>;
    checkSubscription(orgId: number): Promise<{
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
    fetchUserLoginProfile(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    getApiKey(res: any): Promise<any>;
    updatePassword(req: Request, res: Response, updatePasswordDto: UpdatePasswordDto): Promise<void>;
    updateNewPassword(req: Request, res: Response, updatePasswordDto: UpdatePasswordDto): Promise<void>;
    validateResetLink(userId: number): Promise<{
        valid: boolean;
    }>;
    checkSession(req: Request): {
        message: string;
        user_id: any;
    } | {
        message: string;
        user_id?: undefined;
    };
    logout(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    logoutAll(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    verifyLoginOtp(verifyOtpDto: VerifyOtpDto, context: ExecutionContext, req: Request, response: Response): Promise<void>;
    validateToken(): Promise<{
        message: string;
    }>;
    forgotPassword(forgotPasswordDto: ForgotPasswordDto, res: Response, req: Request): Promise<Response<any, Record<string, any>>>;
    verifyForgotPasswordOtp(verifyOtpDto: VerifyOtpDto, res: Response): Promise<void>;
    sendOtpForResetPassword(body: {
        userId: string;
        oldPassword: string;
        newPassword: string;
    }, res: Response): Promise<Response<any, Record<string, any>>>;
    verifyResetPasswordOtp(verifyOtpDto: {
        otp: string;
        user_id: number;
        newPassword: string;
    }, res: Response): Promise<Response>;
    generatePassword(req: Request, res: Response, generatePasswordDto: {
        userId: string;
        newPassword: string;
    }): Promise<void>;
}
