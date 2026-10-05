export declare class CreatePlanSettingDto {
    plan_id: number;
    setting_name: string;
    value: string;
    description?: string;
    is_active?: boolean;
}
export declare class UpdatePlanSettingDto {
    setting_name?: string;
    value?: string;
    description?: string;
    is_active?: boolean;
    is_deleted?: boolean;
}
