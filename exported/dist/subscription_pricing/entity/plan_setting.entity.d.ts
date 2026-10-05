import { Plan } from './plan.entity';
export declare class PlanSetting {
    plan_setting_id: number;
    plan_id: number;
    setting_name: string;
    value: string;
    description: string;
    is_active: boolean;
    is_deleted: boolean;
    created_at: Date;
    updated_at: Date;
    plan: Plan;
}
