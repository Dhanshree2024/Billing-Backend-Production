import { Feature } from './feature.entity';
import { OrgFeatureOverride } from './org_feature_overrides.entity';
import { Plan } from './plan.entity';
import { Product } from './product.entity';
export declare class PlanFeatureMapping {
    mapping_id: number;
    plan_id: number;
    feature_id: number;
    feature_value: any;
    created_at: Date;
    updated_at: Date;
    status: string;
    product_id: number;
    is_trial: boolean;
    type: string;
    plan: Plan;
    feature: Feature;
    overrides: OrgFeatureOverride[];
    product: Product;
    feature_display_name: string;
}
