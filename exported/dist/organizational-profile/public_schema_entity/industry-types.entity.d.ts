import { ContactSalesRequest } from 'src/subscription_pricing/entity/contact_sales_requests.entity';
export declare class IndustryTypes {
    industryId: number;
    industryName: string;
    createdAt: Date;
    updatedAt: Date;
    isActive: boolean;
    isDeleted: boolean;
    contactSalesRequests: ContactSalesRequest[];
}
