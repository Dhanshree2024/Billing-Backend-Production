import { NotificationMessage } from './notifications_messages.entity';
export declare class NotificationDeliveryReceipt {
    receipt_id: number;
    message_id: number;
    vendor_id: number | null;
    provider_message_id: string | null;
    provider_status: string | null;
    payload: Record<string, any> | null;
    received_at: Date;
    message: NotificationMessage;
}
