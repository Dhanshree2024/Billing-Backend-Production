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
exports.NotificationMessage = void 0;
const typeorm_1 = require("typeorm");
const notification_batches_entity_1 = require("./notification_batches.entity");
const notifications_event_entity_1 = require("./notifications-event.entity");
const notification_template_entity_1 = require("./notification-template.entity");
const notification_template_version_entity_1 = require("./notification-template-version.entity");
const notification_delivery_receipts_entity_1 = require("./notification_delivery_receipts.entity");
let NotificationMessage = class NotificationMessage {
};
exports.NotificationMessage = NotificationMessage;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'message_id' }),
    __metadata("design:type", Number)
], NotificationMessage.prototype, "message_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'batch_id', nullable: true }),
    __metadata("design:type", Number)
], NotificationMessage.prototype, "batch_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'event_id' }),
    __metadata("design:type", Number)
], NotificationMessage.prototype, "event_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'channel_id' }),
    __metadata("design:type", Number)
], NotificationMessage.prototype, "channel_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'template_id', nullable: true }),
    __metadata("design:type", Number)
], NotificationMessage.prototype, "template_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'template_version_id', nullable: true }),
    __metadata("design:type", Number)
], NotificationMessage.prototype, "template_version_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'tenant_schema', type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], NotificationMessage.prototype, "tenant_schema", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'work_module', type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], NotificationMessage.prototype, "work_module", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'recipient_type', type: 'varchar', length: 20, default: 'member' }),
    __metadata("design:type", String)
], NotificationMessage.prototype, "recipient_type", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'recipient_id', type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], NotificationMessage.prototype, "recipient_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'recipient_contact', type: 'varchar', length: 200, nullable: true }),
    __metadata("design:type", String)
], NotificationMessage.prototype, "recipient_contact", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'language_code', type: 'varchar', length: 10, default: 'en' }),
    __metadata("design:type", String)
], NotificationMessage.prototype, "language_code", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'subject_rendered', type: 'text', nullable: true }),
    __metadata("design:type", String)
], NotificationMessage.prototype, "subject_rendered", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'body_rendered', type: 'text' }),
    __metadata("design:type", String)
], NotificationMessage.prototype, "body_rendered", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'vendor_id', type: 'int', nullable: true }),
    __metadata("design:type", Number)
], NotificationMessage.prototype, "vendor_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'provider_message_id', type: 'varchar', length: 200, nullable: true }),
    __metadata("design:type", String)
], NotificationMessage.prototype, "provider_message_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'status', type: 'varchar', length: 20, default: 'queued' }),
    __metadata("design:type", String)
], NotificationMessage.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'error_code', type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], NotificationMessage.prototype, "error_code", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'error_message', type: 'text', nullable: true }),
    __metadata("design:type", String)
], NotificationMessage.prototype, "error_message", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'cost_amount', type: 'numeric', precision: 12, scale: 4, nullable: true }),
    __metadata("design:type", Number)
], NotificationMessage.prototype, "cost_amount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'currency_code', type: 'varchar', length: 10, default: 'INR' }),
    __metadata("design:type", String)
], NotificationMessage.prototype, "currency_code", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'attempt_count', type: 'int', default: 0 }),
    __metadata("design:type", Number)
], NotificationMessage.prototype, "attempt_count", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'correlation_id', type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], NotificationMessage.prototype, "correlation_id", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], NotificationMessage.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], NotificationMessage.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'sent_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], NotificationMessage.prototype, "sent_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'delivered_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], NotificationMessage.prototype, "delivered_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'failed_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], NotificationMessage.prototype, "failed_at", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => notification_batches_entity_1.NotificationBatch, (b) => b.notification_messages, { onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'batch_id' }),
    __metadata("design:type", notification_batches_entity_1.NotificationBatch)
], NotificationMessage.prototype, "batch", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => notifications_event_entity_1.NotificationEvent, (e) => e.notification_messages, { onDelete: 'RESTRICT' }),
    (0, typeorm_1.JoinColumn)({ name: 'event_id' }),
    __metadata("design:type", notifications_event_entity_1.NotificationEvent)
], NotificationMessage.prototype, "event", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => notification_template_entity_1.NotificationTemplate, (t) => t.notification_messages, { onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'template_id' }),
    __metadata("design:type", notification_template_entity_1.NotificationTemplate)
], NotificationMessage.prototype, "template", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => notification_template_version_entity_1.NotificationTemplateVersion, (v) => v.notification_messages, { onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'template_version_id' }),
    __metadata("design:type", notification_template_version_entity_1.NotificationTemplateVersion)
], NotificationMessage.prototype, "template_version", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => notification_delivery_receipts_entity_1.NotificationDeliveryReceipt, (r) => r.message),
    __metadata("design:type", Array)
], NotificationMessage.prototype, "delivery_receipts", void 0);
exports.NotificationMessage = NotificationMessage = __decorate([
    (0, typeorm_1.Entity)('notification_messages', { schema: 'public' })
], NotificationMessage);
