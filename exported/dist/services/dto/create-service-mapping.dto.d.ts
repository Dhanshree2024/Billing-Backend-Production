declare class ServiceItemDto {
    service_id: number;
    is_active?: boolean;
}
export declare class CreateServiceMappingDto {
    plan_id: number;
    product_id?: number;
    services: ServiceItemDto[];
}
export {};
