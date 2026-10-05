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
exports.NotificationBatch = void 0;
const typeorm_1 = require("typeorm");
const notifications_event_entity_1 = require("./notifications-event.entity");
const notification_template_entity_1 = require("./notification-template.entity");
const notification_template_version_entity_1 = require("./notification-template-version.entity");
const notifications_messages_entity_1 = require("./notifications_messages.entity");
let NotificationBatch = class NotificationBatch {
};
exports.NotificationBatch = NotificationBatch;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'batch_id' }),
    __metadata("design:type", Number)
], NotificationBatch.prototype, "batch_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'event_id' }),
    __metadata("design:type", Number)
], NotificationBatch.prototype, "event_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'channel_id' }),
    __metadata("design:type", Number)
], NotificationBatch.prototype, "channel_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'template_id', nullable: true }),
    __metadata("design:type", Number)
], NotificationBatch.prototype, "template_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'template_version_id', nullable: true }),
    __metadata("design:type", Number)
], NotificationBatch.prototype, "template_version_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'tenant_schema', type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], NotificationBatch.prototype, "tenant_schema", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'title', type: 'varchar', length: 200, nullable: true }),
    __metadata("design:type", String)
], NotificationBatch.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'payload_common', type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], NotificationBatch.prototype, "payload_common", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'scheduled_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], NotificationBatch.prototype, "scheduled_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'started_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], NotificationBatch.prototype, "started_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'finished_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], NotificationBatch.prototype, "finished_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'status', type: 'varchar', length: 20, default: 'created' }),
    __metadata("design:type", String)
], NotificationBatch.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'requested_by', type: 'int', nullable: true }),
    __metadata("design:type", Number)
], NotificationBatch.prototype, "requested_by", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], NotificationBatch.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], NotificationBatch.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => notifications_event_entity_1.NotificationEvent, (e) => e.notification_batches, { onDelete: 'RESTRICT' }),
    (0, typeorm_1.JoinColumn)({ name: 'event_id' }),
    __metadata("design:type", notifications_event_entity_1.NotificationEvent)
], NotificationBatch.prototype, "event", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => notification_template_entity_1.NotificationTemplate, (t) => t.notification_batches, { onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'template_id' }),
    __metadata("design:type", notification_template_entity_1.NotificationTemplate)
], NotificationBatch.prototype, "template", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => notification_template_version_entity_1.NotificationTemplateVersion, (version) => version.notification_batches, { onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'template_version_id' }),
    __metadata("design:type", notification_template_version_entity_1.NotificationTemplateVersion)
], NotificationBatch.prototype, "template_version", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => notifications_messages_entity_1.NotificationMessage, (m) => m.batch),
    __metadata("design:type", Array)
], NotificationBatch.prototype, "notification_messages", void 0);
exports.NotificationBatch = NotificationBatch = __decorate([
    (0, typeorm_1.Entity)('notification_batches', { schema: 'public' })
], NotificationBatch);
