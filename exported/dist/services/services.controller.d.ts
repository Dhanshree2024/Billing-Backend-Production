import { Response } from 'express';
import { ServicesService } from './services.service';
export declare class ServicesController {
    private readonly servicesService;
    constructor(servicesService: ServicesService);
    getAllServices(res: Response): Promise<Response<any, Record<string, any>>>;
    getServicesByProduct(productId: number, res: Response): Promise<Response<any, Record<string, any>>>;
    getAllServicesList(page: number, limit: number, search: string, status: 'All' | 'Active' | 'Inactive', res: Response): Promise<Response<any, Record<string, any>>>;
    createServiceMapping(body: any): Promise<{
        success: boolean;
        message: string;
    }>;
    updateServiceMapping(body: any): Promise<{
        success: boolean;
        message: string;
    }>;
    fetchMappings(page?: number, limit?: number, search?: string, status?: 'All' | 'Active' | 'Inactive', productId?: number, planId?: number): Promise<{
        data: {
            planId: any;
            planName: any;
            productId: any;
            productName: any;
            totalServices: number;
            enabledServices: number;
        }[];
        total: number;
        success: boolean;
        message: string;
    }>;
    getServiceMappingsByPlan(planId: number): Promise<{
        success: boolean;
        message: string;
        data: {
            mappingId: number;
            productId: number;
            planId: number;
            serviceId: number;
            serviceName: string;
            planName: string;
            status: string;
        }[];
    }>;
}
