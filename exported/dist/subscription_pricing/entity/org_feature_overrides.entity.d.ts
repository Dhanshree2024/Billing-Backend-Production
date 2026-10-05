import { Feature } from './feature.entity';
import { PlanFeatureMapping } from './plan-feature-mapping.entity';
export declare class OrgFeatureOverride {
    override_id: number;
    org_id: number;
    plan_id: number;
    feature_id: number;
    mapping_id: number;
    override_value: string;
    is_active: boolean;
    is_deleted: boolean;
    created_at: Date;
    updated_at: Date;
    default_value: string;
    currentUsage: string;
    mapping: PlanFeatureMapping;
    feature: Feature;
}
