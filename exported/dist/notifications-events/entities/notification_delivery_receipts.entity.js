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
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationDeliveryReceipt = void 0;
const typeorm_1 = require("typeorm");
const notifications_messages_entity_1 = require("./notifications_messages.entity");
let NotificationDeliveryReceipt = class NotificationDeliveryReceipt {
};
exports.NotificationDeliveryReceipt = NotificationDeliveryReceipt;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'receipt_id' }),
    __metadata("design:type", Number)
], NotificationDeliveryReceipt.prototype, "receipt_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'message_id' }),
    __metadata("design:type", Number)
], NotificationDeliveryReceipt.prototype, "message_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'vendor_id', type: 'int', nullable: true }),
    __metadata("design:type", Number)
], NotificationDeliveryReceipt.prototype, "vendor_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'provider_message_id', type: 'varchar', length: 200, nullable: true }),
    __metadata("design:type", String)
], NotificationDeliveryReceipt.prototype, "provider_message_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'provider_status', type: 'varchar', length: 50, nullable: true }),
    __metadata("design:type", String)
], NotificationDeliveryReceipt.prototype, "provider_status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'payload', type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], NotificationDeliveryReceipt.prototype, "payload", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'received_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], NotificationDeliveryReceipt.prototype, "received_at", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => notifications_messages_entity_1.NotificationMessage, (m) => m.delivery_receipts, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'message_id' }),
    __metadata("design:type", notifications_messages_entity_1.NotificationMessage)
], NotificationDeliveryReceipt.prototype, "message", void 0);
exports.NotificationDeliveryReceipt = NotificationDeliveryReceipt = __decorate([
    (0, typeorm_1.Entity)('notification_delivery_receipts', { schema: 'public' })
], NotificationDeliveryReceipt);
