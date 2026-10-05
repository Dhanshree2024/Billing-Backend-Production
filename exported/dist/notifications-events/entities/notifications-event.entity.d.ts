import { NotificationBatch } from "./notification_batches.entity";
import { NotificationMessage } from "./notifications_messages.entity";
import { NotificationSettings } from './notification-setting.entity';
export declare class NotificationEvent {
    event_id: number;
    event_name: string;
    event_description?: string;
    is_bulk: number;
    is_enabled: number;
    is_deleted: number;
    created_by?: number;
    updated_by?: number;
    created_at: Date;
    updated_at?: Date;
    notification_batches: NotificationBatch[];
    notification_messages: NotificationMessage[];
    notification_settings: NotificationSettings[];
}
