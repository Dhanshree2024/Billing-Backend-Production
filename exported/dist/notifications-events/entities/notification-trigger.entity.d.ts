import { NotificationSettings } from './notification-setting.entity';
export declare class NotificationTriggers {
    notification_trigger_id: number;
    setting_id: number;
    setting: NotificationSettings;
    trigger_type: string;
    delay_value: number;
    delay_unit: string;
    repeat_enabled: boolean;
    repeat_times: number;
    repeat_count: number;
    repeat_interval: number;
    repeat_unit: string;
    stop_after: Date;
    sequence_no: number;
    schedule_type: string;
    day_of_month: number;
    day_of_week: number;
    schedule_time: string;
    created_at: Date;
    condition_type?: string;
    operator?: string;
    condition_value?: number;
}
