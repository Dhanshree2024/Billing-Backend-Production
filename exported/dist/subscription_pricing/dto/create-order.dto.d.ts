export declare class CreateOrderDto {
    organizationId: number;
    planId: number;
    billingCycle: string;
    startDate: string;
    endDate?: string;
    price: number;
    autoRenewal: boolean;
    isTrialPeriod: boolean;
    paymentMethodId: number;
    paymentTerm: string;
    customerPO: string;
    paymentStatus: 'pending' | 'completed' | 'failed';
    orderPlacedBy?: string;
    productId: number;
    trialPeriodUnit?: 'days' | 'months' | 'years';
    trialPeriodCount?: number;
    trialStartDate?: string;
    trialExpiryDate?: string;
    gracePeriod?: number;
    percentage?: number;
    grandTotal?: number;
    resellerId?: number;
    featureOverrides?: {
        feature_id: number;
        plan_id: number;
        mapping_id?: number;
        override_value: string;
        default_value?: string;
        is_active?: boolean;
        is_deleted?: boolean;
    }[];
}
