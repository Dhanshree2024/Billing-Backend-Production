import { Plan } from './plan.entity';
import { SubscriptionType } from './subscription-type.entity';
export declare class PlanBilling {
    billing_id: number;
    billing_cycle: string;
    price: number;
    discounted_percentage: number;
    created_at: Date;
    updated_at: Date;
    plan: Plan;
    subscription_type_id: number;
    subscriptionType: SubscriptionType;
}
