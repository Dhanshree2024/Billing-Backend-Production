declare class FeatureDto {
    feature_id: number;
    limit: string;
    type?: 'Numeric' | 'Boolean';
}
declare class UpdateFeatureDto {
    feature_id: number;
    limit?: string;
    type?: 'Numeric' | 'Boolean';
}
export declare class CreateMappingDto {
    product_id: number;
    plan_id: number;
    status?: string;
    features: FeatureDto[];
    trial_features?: FeatureDto[];
}
export declare class UpdateMappingDto {
    plan_id: number;
    product_id?: number;
    status?: string;
    features: UpdateFeatureDto[];
    trial_features?: UpdateFeatureDto[];
}
export {};
