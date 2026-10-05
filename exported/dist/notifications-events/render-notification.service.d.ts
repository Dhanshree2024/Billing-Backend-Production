import { Repository } from 'typeorm';
import { NotificationTemplateVersion } from './entities/notification-template-version.entity';
import { NotificationTemplate } from './entities/notification-template.entity';
import { HttpService } from '@nestjs/axios';
import { MailConfigService } from 'src/common/mail/mail-config.service';
import { MailService } from 'src/common/mail/mail.service';
import { SmsService } from 'src/common/sms/sms.service';
import { PushNotificationService } from 'src/push-notification/push-notification.service';
import { NotificationEventsService } from './notification-events.service';
export interface NotificationTriggerEvent {
    event_id: number;
    payload: NotificationPayload;
    recipients?: NotificationRecipient[];
    meta?: {
        trace_id?: string;
        source?: string;
        organization_id?: string | number;
    };
}
export type NotificationPayload = Record<string, any> | Array<Record<string, any>>;
export interface NotificationRecipient {
    recipient_type: 'user' | 'staff';
    recipient_id?: string;
    recipient_contact?: string;
    recipient_whatsapp_number?: string;
    recipient_email?: string;
    language_code?: string;
}
export interface EventNotificationResponse {
    success: boolean;
    message: string;
    data: {
        event: any;
        notifications: Record<string, any[]>;
    };
}
export declare class NotificationsOrchestratorService {
    private readonly eventRepo;
    private readonly templateVersionRepo;
    private readonly notificationsService;
    private readonly PushnotificationsService;
    private readonly mailService;
    private readonly mailConfigService;
    private readonly smsService;
    private readonly httpService;
    private readonly logger;
    constructor(eventRepo: Repository<NotificationTemplate>, templateVersionRepo: Repository<NotificationTemplateVersion>, notificationsService: NotificationEventsService, PushnotificationsService: PushNotificationService, mailService: MailService, mailConfigService: MailConfigService, smsService: SmsService, httpService: HttpService);
    orchestrate(event: NotificationTriggerEvent): Promise<void>;
    private dispatchChannel;
    notifyAssetUsers(eventId: number): Promise<{
        success: boolean;
        message: any;
    }>;
    private sanitizeImageUrls;
    private renderTemplateVersion;
    private buildRenderContext;
    private render;
    private wrapEmailLayout;
}
