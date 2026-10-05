import { RegisterOrganization } from 'src/organization_register/entities/register-organization.entity';
import { RegisterUserLogin } from 'src/organization_register/entities/register-user-login.entity';
import { OrgSubscription } from 'src/subscription_pricing/entity/org_subscription.entity';
export declare enum ModuleName {
    CUSTOMER = "CUSTOMER",
    ORGANIZATION = "ORGANIZATION",
    SUBSCRIPTION = "SUBSCRIPTION",
    PLAN = "PLAN",
    PAYMENT = "PAYMENT",
    INVOICE = "INVOICE",
    BILLING_INFORMATION = "BILLING_INFORMATION",
    PRODUCT = "PRODUCT",
    USER = "USER",
    AUTHENTICATION = "AUTHENTICATION"
}
export declare enum OperationType {
    CREATE = "CREATE",
    UPDATE = "UPDATE",
    DELETE = "DELETE",
    VERIFY = "VERIFY",
    LOGIN = "LOGIN",
    LOGOUT = "LOGOUT",
    ASSIGN = "ASSIGN",
    CHANGE = "CHANGE",
    UPGRADE = "UPGRADE",
    DOWNGRADE = "DOWNGRADE",
    RENEW = "RENEW",
    CANCEL = "CANCEL",
    INITIATE_PAYMENT = "INITIATE_PAYMENT",
    PAYMENT_SUCCESS = "PAYMENT_SUCCESS",
    PAYMENT_FAILED = "PAYMENT_FAILED",
    REFUND = "REFUND",
    GENERATE = "GENERATE",
    SEND = "SEND"
}
export declare enum OperationStatus {
    SUCCESS = "SUCCESS",
    FAILED = "FAILED",
    PENDING = "PENDING"
}
export declare class ActivityLog {
    activity_log_id: number;
    organization_id: number;
    organization: RegisterOrganization;
    subscription_id: number;
    subscription: OrgSubscription;
    payment_transaction_id: number;
    user_id: number;
    user: RegisterUserLogin;
    module_name: ModuleName;
    operation_type: OperationType;
    operation_status: OperationStatus;
    remarks: string;
    old_data: Record<string, any>;
    new_data: Record<string, any>;
    ip_address: string;
    user_agent: string;
    created_by: number;
    createdBy: RegisterUserLogin;
    created_at: Date;
}
