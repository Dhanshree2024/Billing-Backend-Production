import { ClientProxy } from '@nestjs/microservices';
export declare class PushProducer {
    private readonly client;
    constructor(client: ClientProxy);
    publishPushJob(data: any): Promise<import("rxjs").Observable<any>>;
}
