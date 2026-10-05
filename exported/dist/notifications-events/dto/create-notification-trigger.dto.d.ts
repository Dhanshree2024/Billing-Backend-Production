export declare class CreateNotificationTriggerDto {
    trigger_type: string;
    delay_value?: number;
    delay_unit?: string;
    repeat_enabled?: boolean;
    repeat_times?: number;
    repeat_count?: number;
    repeat_interval?: number;
    repeat_unit?: string;
    schedule_type?: string;
    day_of_month?: number;
    day_of_week?: number;
    schedule_time?: string;
    sequence_no?: number;
    stop_after?: Date;
    condition_type?: string;
    operator?: string;
    condition_value?: number;
}
