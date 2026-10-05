import { OrgSubscription } from './org_subscription.entity';
export declare class SubscriptionLog {
    log_id: number;
    subscription_id: number;
    organization_profile_id: number;
    action: 'create' | 'update' | 'cancel';
    old_data: any;
    new_data: any;
    remarks: string;
    performed_by: number;
    created_at: Date;
    subscription: OrgSubscription;
}
