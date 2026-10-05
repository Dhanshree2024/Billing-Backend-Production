import { OrgSubscription } from '../entity/org_subscription.entity';
import { PaymentMethod } from '../entity/payment_methods.entity';
export declare class PaymentTransaction {
    transaction_id: number;
    org_subscription_id: number;
    orgSubscription: OrgSubscription;
    amount: number;
    currency: string;
    payment_method: number;
    card_last4: string;
    card_expiry: string;
    card_holder_name: string;
    transaction_status: string;
    transaction_reference: string;
    methodId: number;
    method: PaymentMethod;
    paid_at: Date;
    created_at: Date;
    updated_at: Date;
}
