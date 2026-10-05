import { NotificationTemplate } from './notification-template.entity';
import { NotificationSettings } from './notification-setting.entity';
export declare class NotificationChannel {
    notification_channel_id: number;
    notification_channel_name: string;
    templates: NotificationTemplate[];
    notification_settings: NotificationSettings[];
}
