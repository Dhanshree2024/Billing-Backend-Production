import { PushNotificationService } from './push-notification.service';
export declare class PushConsumer {
    private readonly pushService;
    constructor(pushService: PushNotificationService);
    handlePush(data: any): Promise<void>;
}
