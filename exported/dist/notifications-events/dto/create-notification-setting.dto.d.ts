export declare class CreateNotificationSettingDto {
    event_id: number;
    channel_id: number;
    is_enabled?: boolean;
    quota_limit?: number;
    quota_interval?: 'DAILY' | 'WEEKLY' | 'MONTHLY';
    send_start_time?: string;
    send_end_time?: string;
}
