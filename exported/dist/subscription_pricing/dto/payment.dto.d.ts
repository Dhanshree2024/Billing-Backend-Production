export declare class BillingInfoDto {
    first_name: string;
    last_name?: string;
    email: string;
    phone_number?: string;
    company_name?: string;
    address_line1: string;
    address_line2?: string;
}
export declare class PaymentTransactionDto {
    amount: number;
    currency?: string;
    payment_method?: string;
    card_last4?: string;
    card_expiry?: string;
    card_holder_name?: string;
    transaction_reference?: string;
}
export declare class CreatePaymentDto {
    subscriptionId: number;
    billingData: BillingInfoDto;
    transactionData: PaymentTransactionDto;
}
