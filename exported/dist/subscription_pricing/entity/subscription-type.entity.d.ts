import { OrgSubscription } from './org_subscription.entity';
export declare class SubscriptionType {
    type_id: number;
    type_name: string;
    description: string;
    created_by: number;
    subscriptions: OrgSubscription[];
}
