"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityLogService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const activity_log_entity_1 = require("../organizational-profile/public_schema_entity/activity-log.entity");
const typeorm_2 = require("typeorm");
let ActivityLogService = class ActivityLogService {
    constructor(activityLogRepository) {
        this.activityLogRepository = activityLogRepository;
    }
    async logActivity(data) {
        await this.activityLogRepository.save(this.activityLogRepository.create(data));
    }
    async logActivityOld({ organizationId, subscriptionId, paymentTransactionId, userId, moduleName, operationType, operationStatus = activity_log_entity_1.OperationStatus.SUCCESS, remarks, oldData, newData, ipAddress, userAgent, createdBy, }) {
        await this.activityLogRepository.save({
            organization_id: organizationId,
            subscription_id: subscriptionId,
            payment_transaction_id: paymentTransactionId,
            user_id: userId,
            module_name: moduleName,
            operation_type: operationType,
            operation_status: operationStatus,
            remarks,
            old_data: oldData,
            new_data: newData,
            ip_address: ipAddress,
            user_agent: userAgent,
            created_by: createdBy,
        });
    }
};
exports.ActivityLogService = ActivityLogService;
exports.ActivityLogService = ActivityLogService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(activity_log_entity_1.ActivityLog)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ActivityLogService);
