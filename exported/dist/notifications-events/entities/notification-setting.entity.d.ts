import { NotificationChannel } from './notification-channel.entity';
import { NotificationEvent } from './notifications-event.entity';
import { NotificationTriggers } from './notification-trigger.entity';
export declare class NotificationSettings {
    id: number;
    event_id: number;
    channel_id: number;
    is_enabled: boolean;
    quota_limit: number;
    quota_interval: string;
    send_start_time: string;
    send_end_time: string;
    config: any;
    created_at: Date;
    updated_at: Date;
    channel: NotificationChannel;
    event: NotificationEvent;
    triggers: NotificationTriggers[];
}
