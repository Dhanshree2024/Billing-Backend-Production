import { OrgSubscription } from 'src/subscription_pricing/entity/org_subscription.entity';
import { RegisterUserLogin } from './register-user-login.entity';
export declare class RegisterOrganization {
    organization_id: number;
    organization_name: string;
    organization_schema_name: string;
    industry_type_id: number;
    customer_id?: string;
    payment_term?: string;
    gst_registered: boolean;
    gst_number?: string;
    status: boolean;
    organization_code?: string;
    street: string;
    landmark: string;
    city: string;
    postal_code: string;
    state: string;
    country: string;
    users: RegisterUserLogin[];
    subscriptions: OrgSubscription[];
}
