export declare class OrgFeatureOverrideLog {
    log_id: number;
    override_id: number;
    org_id: number;
    plan_id: number;
    feature_id: number;
    mapping_id: number;
    old_value: string;
    new_value: string;
    changed_by: number;
    changed_at: Date;
    action: 'INSERT' | 'UPDATE' | 'DELETE';
}
