import { Repository } from 'typeorm';
import { Service } from './entity/services.entity';
import { PlanServiceMapping } from './entity/plan_services_mapping.entity';
export declare class ServicesService {
    private readonly serviceRepo;
    private readonly mappingserviceRepo;
    constructor(serviceRepo: Repository<Service>, mappingserviceRepo: Repository<PlanServiceMapping>);
    getAllServices(): Promise<Service[]>;
    getServicesByProduct(productId: number): Promise<Service[]>;
    getAllServicesList(page: number, limit: number, search: string, status: 'All' | 'Active' | 'Inactive'): Promise<{
        data: Service[];
        total: number;
    }>;
    saveServiceMapping({ productId, planId, serviceId, status, }: {
        productId: number;
        planId: number;
        serviceId: number;
        status: boolean;
    }): Promise<PlanServiceMapping>;
    updateServiceMapping({ productId, planId, serviceId, status, }: {
        productId: number;
        planId: number;
        serviceId: number;
        status: boolean;
    }): Promise<PlanServiceMapping>;
    getAllMappings(page: number, limit: number, search: string, status: 'All' | 'Active' | 'Inactive', productId?: number, planId?: number): Promise<{
        data: {
            planId: any;
            planName: any;
            productId: any;
            productName: any;
            totalServices: number;
            enabledServices: number;
        }[];
        total: number;
    }>;
    getServiceMappingsByPlan(planId: number): Promise<{
        mappingId: number;
        productId: number;
        planId: number;
        serviceId: number;
        serviceName: string;
        planName: string;
        status: string;
    }[]>;
}
