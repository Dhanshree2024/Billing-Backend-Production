import { RegisterOrganization } from './register-organization.entity';
export declare class RegisterUserLogin {
    user_id: number;
    first_name: string;
    last_name: string;
    business_email: string;
    phone_number: string;
    password: string;
    otp: string;
    otp_expiry: Date;
    verified: boolean;
    refreshToken: string;
    passwordSet: boolean;
    username: string;
    is_primary_user: string;
    passwordReset: string;
    organization_id: number;
    organization: RegisterOrganization;
    is_active: number;
    is_deleted: number;
    asset_user_id: number;
}
