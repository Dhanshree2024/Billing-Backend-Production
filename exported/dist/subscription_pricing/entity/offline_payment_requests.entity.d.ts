import { OrgSubscription } from "./org_subscription.entity";
import { BillingInfo } from "./billing_info.entity";
import { Plan } from "./plan.entity";
export declare class OfflinePaymentRequest {
    request_id: number;
    subscription_id: number;
    orgSubscription: OrgSubscription;
    billing_id: number;
    billingInfo: BillingInfo;
    plan_id: number;
    plan: Plan;
    status: "pending" | "approved" | "rejected";
    amount: number;
    currency: string;
    reference_note: string;
    requested_at: Date;
    updated_at: Date;
    processed_at: Date;
    created_by: number;
    approved_by: number;
}
