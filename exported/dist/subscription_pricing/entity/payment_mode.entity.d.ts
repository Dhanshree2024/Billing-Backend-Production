import { OrgSubscription } from './org_subscription.entity';
export declare class PaymentMode {
    payment_mode_id: number;
    mode_name: string;
    description?: string;
    is_active: boolean;
    is_deleted: boolean;
    created_at: Date;
    updated_at: Date;
    subscriptions: OrgSubscription[];
}
