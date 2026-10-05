import { NotificationEvent } from './notifications-event.entity';
import { NotificationTemplate } from './notification-template.entity';
import { NotificationTemplateVersion } from './notification-template-version.entity';
import { NotificationMessage } from './notifications_messages.entity';
export declare class NotificationBatch {
    batch_id: number;
    event_id: number;
    channel_id: number;
    template_id: number | null;
    template_version_id: number | null;
    tenant_schema: string | null;
    title: string | null;
    payload_common: Record<string, any> | null;
    scheduled_at: Date | null;
    started_at: Date | null;
    finished_at: Date | null;
    status: string;
    requested_by: number | null;
    created_at: Date;
    updated_at: Date | null;
    event: NotificationEvent;
    template: NotificationTemplate;
    template_version: NotificationTemplateVersion;
    notification_messages: NotificationMessage[];
}
