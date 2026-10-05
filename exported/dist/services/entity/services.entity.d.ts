import { Plan } from 'src/subscription_pricing/entity/plan.entity';
export declare class Service {
    serviceId: number;
    planId: number;
    name: string;
    description?: string;
    isActive: boolean;
    isDeleted: boolean;
    productId: number;
    plan: Plan;
    product: Plan;
}
