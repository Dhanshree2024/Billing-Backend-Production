import { DataSource } from 'typeorm';
import { CreateOrganizationDto } from './create-organization.dto';
import { VerifyOtpDto } from './verify-otp.dto';
import { ResendOtpDto } from './dto/resend-otp.dto';
export declare class OrganizationService {
    private readonly dataSource;
    constructor(dataSource: DataSource);
    createOrganization(createOrganizationDto: CreateOrganizationDto, context: any): Promise<any>;
    resendOtp(resendOtpDto: ResendOtpDto, context: any): Promise<any>;
    verifyOtp(verifyOtpDto: VerifyOtpDto, context: any): Promise<any>;
    private generateRandomPassword;
    private hashPassword;
    private sendVerificationEmail;
    private sendOnboardingEmail;
}
