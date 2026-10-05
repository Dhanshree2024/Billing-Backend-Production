import { NotificationLogsService } from './notification-logs.service';
export declare class NotificationLogsController {
    private readonly svc;
    constructor(svc: NotificationLogsService);
    createMessage(dto: any): Promise<{
        success: boolean;
        data: any;
    }>;
    updateMessage(id: string, dto: any): Promise<{
        success: boolean;
        data: any;
    }>;
    listMessages(q: any): Promise<{
        success: boolean;
        data: any;
    }>;
    getMessage(id: string): Promise<{
        success: boolean;
        data: any;
    }>;
    createDeliveryReceipt(dto: any): Promise<{
        success: boolean;
        data: any;
    }>;
    resendMessage(id: string): Promise<{
        success: boolean;
        data: any;
    }>;
}
