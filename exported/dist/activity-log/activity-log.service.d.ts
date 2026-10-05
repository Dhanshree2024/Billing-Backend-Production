import { ActivityLog, ModuleName, OperationStatus, OperationType } from 'src/organizational-profile/public_schema_entity/activity-log.entity';
import { Repository } from 'typeorm';
export declare class ActivityLogService {
    private readonly activityLogRepository;
    constructor(activityLogRepository: Repository<ActivityLog>);
    logActivity(data: Partial<ActivityLog>): Promise<void>;
    logActivityOld({ organizationId, subscriptionId, paymentTransactionId, userId, moduleName, operationType, operationStatus, remarks, oldData, newData, ipAddress, userAgent, createdBy, }: {
        organizationId?: number;
        subscriptionId?: number;
        paymentTransactionId?: number;
        userId?: number;
        moduleName: ModuleName;
        operationType: OperationType;
        operationStatus?: OperationStatus;
        remarks?: string;
        oldData?: any;
        newData?: any;
        ipAddress?: string;
        userAgent?: string;
        createdBy?: number;
    }): Promise<void>;
}
