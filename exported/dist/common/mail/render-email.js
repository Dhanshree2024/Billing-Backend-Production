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
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailTemplate = void 0;
exports.renderEmail = renderEmail;
const React = __importStar(require("react"));
const render_1 = require("@react-email/render");
const login_verification_email_1 = require("./mail_templates/login-verification-email");
const onboarding_confirmation_email_1 = require("./mail_templates/onboarding-confirmation-email");
const new_user_invitation_email_1 = require("./mail_templates/new-user-invitation-email");
const auth_otp_email_1 = require("./mail_templates/auth-otp-email");
const password_reset_mail_1 = require("./mail_templates/password-reset-mail");
const password_updated_mail_1 = require("./mail_templates/password-updated-mail");
const generate_password_1 = require("./mail_templates/generate-password");
const user_password_reset_by_admin_1 = require("./mail_templates/user-password-reset-by-admin");
const subscription_order_places_1 = require("./mail_templates/subscription-order-places");
const subscription_registration_email_1 = require("./mail_templates/subscription-registration-email");
const PO_confirmation_email_1 = require("./mail_templates/PO-confirmation-email");
const Offline_payment_email_1 = require("./mail_templates/Offline-payment-email");
const sale_enquiry_email_1 = require("./mail_templates/sale-enquiry-email");
var EmailTemplate;
(function (EmailTemplate) {
    EmailTemplate["LOGIN_VERIFICATION"] = "login_verification";
    EmailTemplate["ONBOARDING_CONFIRMATION"] = "onboarding_confirmation";
    EmailTemplate["NEW_USER_INVITATION"] = "new_user_invitation";
    EmailTemplate["AUTH_LOGIN_VERIFICATION"] = "auth_login_verification";
    EmailTemplate["PASSWORD_RESET"] = "password_reset";
    EmailTemplate["PASSWORD_RESET_BY_ADMIN"] = "password_reset_by_admin";
    EmailTemplate["PASSWORD_UPDATED_SUCCESS"] = "password-update";
    EmailTemplate["PASSWORD_GENERATED_SUCCESS"] = "password-generate";
    EmailTemplate["ORDER_PLACED"] = "order-placed";
    EmailTemplate["ONLINE_REGISTRATION_EMAIL"] = "online-registration-email";
    EmailTemplate["PO_CONFIRMATION_EMAIL"] = "po-confirmation-email";
    EmailTemplate["OFFLINE_PAYMENT_EMAIL"] = "offline-payment-email";
    EmailTemplate["SALES_ENQUIRY"] = "sales-enquiry";
})(EmailTemplate || (exports.EmailTemplate = EmailTemplate = {}));
async function renderEmail(template, props, mailConfigService) {
    const mailConfig = await mailConfigService.getMailConfig();
    const defaultMailReply = mailConfig?.smtpReplyMail || "support@yourcompany.com";
    let EmailComponent;
    switch (template) {
        case EmailTemplate.LOGIN_VERIFICATION:
            EmailComponent = login_verification_email_1.LoginVerificationEmail;
            break;
        case EmailTemplate.ONBOARDING_CONFIRMATION:
            EmailComponent = onboarding_confirmation_email_1.OnboardingConfirmationEmail;
            break;
        case EmailTemplate.NEW_USER_INVITATION:
            EmailComponent = new_user_invitation_email_1.NewUserInvitationEmail;
            break;
        case EmailTemplate.AUTH_LOGIN_VERIFICATION:
            EmailComponent = auth_otp_email_1.AuthLoginVerificationEmail;
            break;
        case EmailTemplate.PASSWORD_RESET:
            EmailComponent = password_reset_mail_1.PasswordResetEmail;
            break;
        case EmailTemplate.PASSWORD_RESET_BY_ADMIN:
            EmailComponent = user_password_reset_by_admin_1.UserPasswordResetAdminEmail;
            break;
        case EmailTemplate.PASSWORD_UPDATED_SUCCESS:
            EmailComponent = password_updated_mail_1.PasswordUpdatedEmail;
            break;
        case EmailTemplate.PASSWORD_GENERATED_SUCCESS:
            EmailComponent = generate_password_1.PasswordSetNotificationEmail;
            break;
        case EmailTemplate.ORDER_PLACED:
            EmailComponent = subscription_order_places_1.OrderPlacedEmail;
            break;
        case EmailTemplate.ONLINE_REGISTRATION_EMAIL:
            EmailComponent = subscription_registration_email_1.OpenRegistrationEmail;
            break;
        case EmailTemplate.PO_CONFIRMATION_EMAIL:
            EmailComponent = PO_confirmation_email_1.POConfirmationEmail;
            break;
        case EmailTemplate.OFFLINE_PAYMENT_EMAIL:
            EmailComponent = Offline_payment_email_1.OfflinePaymentEmail;
            break;
        case EmailTemplate.SALES_ENQUIRY:
            EmailComponent = sale_enquiry_email_1.SalesEnquiryEmail;
            break;
        default:
            throw new Error("Invalid email template");
    }
    const emailProps = {
        ...props,
        mailReply: props.mailReply || defaultMailReply,
        companyName: props.companyName || mailConfig.smtpFromName,
    };
    return (0, render_1.render)(React.createElement(EmailComponent, emailProps));
}
