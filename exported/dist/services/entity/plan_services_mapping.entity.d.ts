import { Plan } from '../../subscription_pricing/entity/plan.entity';
import { Service } from './services.entity';
import { Product } from 'src/subscription_pricing/entity/product.entity';
export declare class PlanServiceMapping {
    mappingId: number;
    productId: number;
    planId: number;
    serviceId: number;
    status: boolean;
    isActive: boolean;
    isDeleted: boolean;
    plan: Plan;
    service: Service;
    product: Product;
}
