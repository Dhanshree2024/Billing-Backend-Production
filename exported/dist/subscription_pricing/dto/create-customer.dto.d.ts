export declare class CreateCustomerDto {
    companyName: string;
    firstName: string;
    lastName: string;
    businessEmail: string;
    phoneNumber: string;
    industryName: string;
    industryId: number;
    billingFirstName?: string;
    billingLastName?: string;
    billingEmail?: string;
    billingPhone?: string;
    productId?: number;
    sameAsPrimary?: boolean;
    customerId?: string;
    paymentTerm?: string;
    gstRegistered?: boolean;
    gstNumber?: string;
    streetAddress?: string;
    landmark?: string;
    country?: number;
    state?: number;
    city?: number;
    postalCode?: string;
    billingType?: string;
    resellerId?: number;
}
