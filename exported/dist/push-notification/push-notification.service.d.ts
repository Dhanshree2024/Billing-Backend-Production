import { Repository } from "typeorm";
import { InAppNotifications } from "./entity/in-app-notifications.entity";
import { NotificationRecipient } from "src/notifications-events/render-notification.service";
import { PushNotificationGateway } from "./push-notification.gateway";
import { NotificationLogsService } from "../notification-logs/notification-logs.service";
import { HttpService } from '@nestjs/axios';
export declare class PushNotificationService {
    private readonly inAppRepo;
    private readonly gateway;
    private readonly notificationLogsService;
    private readonly httpService;
    constructor(inAppRepo: Repository<InAppNotifications>, gateway: PushNotificationGateway, notificationLogsService: NotificationLogsService, httpService: HttpService);
    sendInAppNotification(params: {
        recipient: NotificationRecipient;
        templateVersion: any;
        renderedBody: string;
        renderContext: any;
        eventId: number;
    }): Promise<{
        success: boolean;
    }>;
    createNotification(params: {
        recipientType: string;
        recipientId: string;
        eventId: number;
        templateVersionId: number;
        title: string;
        message: string;
        data?: any;
    }): Promise<InAppNotifications>;
    getNotifications(recipientId: string): Promise<{
        success: boolean;
        message: string;
        data: InAppNotifications[];
    }>;
    markAsRead(notificationId: number): Promise<{
        success: boolean;
        message: string;
    }>;
    getUnreadCount(recipientId: string): Promise<{
        success: boolean;
        message: string;
        data: {
            count: number;
        };
    }>;
    processPush(data: any): Promise<void>;
}
