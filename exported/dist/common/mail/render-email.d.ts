import { MailConfigService } from './mail-config.service';
export interface EmailProps {
    name?: string;
    otp?: string;
    email?: string;
    companyName?: string;
    subject?: string;
    [key: string]: any;
}
export declare enum EmailTemplate {
    LOGIN_VERIFICATION = "login_verification",
    ONBOARDING_CONFIRMATION = "onboarding_confirmation",
    NEW_USER_INVITATION = "new_user_invitation",
    AUTH_LOGIN_VERIFICATION = "auth_login_verification",
    PASSWORD_RESET = "password_reset",
    PASSWORD_RESET_BY_ADMIN = "password_reset_by_admin",
    PASSWORD_UPDATED_SUCCESS = "password-update",
    PASSWORD_GENERATED_SUCCESS = "password-generate",
    ORDER_PLACED = "order-placed",
    ONLINE_REGISTRATION_EMAIL = "online-registration-email",
    PO_CONFIRMATION_EMAIL = "po-confirmation-email",
    OFFLINE_PAYMENT_EMAIL = "offline-payment-email",
    SALES_ENQUIRY = "sales-enquiry"
}
export declare function renderEmail(template: EmailTemplate, props: EmailProps, mailConfigService: MailConfigService): Promise<string>;
