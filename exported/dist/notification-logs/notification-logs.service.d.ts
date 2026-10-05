import { Repository } from 'typeorm';
import { NotificationMessage } from 'src/notifications-events/entities/notifications_messages.entity';
import { NotificationDeliveryReceipt } from 'src/notifications-events/entities/notification_delivery_receipts.entity';
export declare class NotificationLogsService {
    private readonly messageRepo;
    private readonly receiptRepo;
    constructor(messageRepo: Repository<NotificationMessage>, receiptRepo: Repository<NotificationDeliveryReceipt>);
    createMessage(dto: any): Promise<any>;
    updateMessage(id: number, dto: any): Promise<any>;
    listMessages(q: any): Promise<any>;
    getMessageById(id: number): Promise<any>;
    createDeliveryReceipt(dto: any): Promise<any>;
    resendMessage(messageId: number): Promise<any>;
    updateStatusByTemplateVersion(templateVersionId: number, recipientId: string, status: string): Promise<{
        success: boolean;
    }>;
}
