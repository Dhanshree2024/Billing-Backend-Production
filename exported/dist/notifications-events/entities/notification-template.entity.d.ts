import { NotificationEvent } from './notifications-event.entity';
import { NotificationChannel } from './notification-channel.entity';
import { NotificationTemplateVersion } from './notification-template-version.entity';
import { NotificationBatch } from "./notification_batches.entity";
import { NotificationMessage } from "./notifications_messages.entity";
export declare class NotificationTemplate {
    template_id: number;
    event_id: number;
    event: NotificationEvent;
    channel_id: number;
    channel: NotificationChannel;
    language_code: string;
    template_name: string;
    is_enabled: number;
    is_deleted: number;
    created_by: number;
    updated_by: number;
    created_at: Date;
    updated_at: Date;
    versions: NotificationTemplateVersion[];
    notification_batches: NotificationBatch[];
    notification_messages: NotificationMessage[];
}
