import { PlanFeatureMapping } from './plan-feature-mapping.entity';
import { Product } from './product.entity';
export declare class Feature {
    feature_id: number;
    feature_name: string;
    description: string;
    set_limit: boolean;
    created_at: Date;
    updated_at: Date;
    featureMappings: PlanFeatureMapping[];
    is_active: boolean;
    is_deleted: boolean;
    default_value: string;
    product: Product;
    product_id: number;
    is_upcoming: boolean;
}
