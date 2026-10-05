import { Feature } from './feature.entity';
import { Plan } from './plan.entity';
import { BillingInfo } from './billing_info.entity';
import { Service } from 'src/services/entity/services.entity';
export declare class Product {
    productId: number;
    name: string;
    description?: string;
    isActive: boolean;
    isDeleted: boolean;
    schemaInitial: string;
    features: Feature[];
    plans: Plan[];
    billingInfos: BillingInfo[];
    services: Service[];
}
