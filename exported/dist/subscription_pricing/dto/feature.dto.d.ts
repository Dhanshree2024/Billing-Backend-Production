export declare class CreateFeatureDto {
    feature_name: string;
    description?: string;
    default_value?: string;
    product_id?: number;
    set_limit?: boolean;
}
export declare class UpdateFeatureDto {
    feature_id: number;
    name?: string;
    description?: string;
    default_value?: string;
    product_id?: number;
    set_limit?: boolean;
}
