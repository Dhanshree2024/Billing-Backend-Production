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
exports.NotificationTemplate = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const notifications_event_entity_1 = require("./notifications-event.entity");
const notification_channel_entity_1 = require("./notification-channel.entity");
const notification_template_version_entity_1 = require("./notification-template-version.entity");
const notification_batches_entity_1 = require("./notification_batches.entity");
const notifications_messages_entity_1 = require("./notifications_messages.entity");
let NotificationTemplate = class NotificationTemplate {
};
exports.NotificationTemplate = NotificationTemplate;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], NotificationTemplate.prototype, "template_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], NotificationTemplate.prototype, "event_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => notifications_event_entity_1.NotificationEvent),
    (0, typeorm_1.JoinColumn)({ name: 'event_id' }),
    __metadata("design:type", notifications_event_entity_1.NotificationEvent)
], NotificationTemplate.prototype, "event", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1 }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], NotificationTemplate.prototype, "channel_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => notification_channel_entity_1.NotificationChannel),
    (0, typeorm_1.JoinColumn)({ name: 'channel_id' }),
    __metadata("design:type", notification_channel_entity_1.NotificationChannel)
], NotificationTemplate.prototype, "channel", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'en' }),
    (0, typeorm_1.Column)({ type: 'varchar', length: 10, default: 'en' }),
    __metadata("design:type", String)
], NotificationTemplate.prototype, "language_code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Welcome Template' }),
    (0, typeorm_1.Column)({ type: 'varchar', length: 150 }),
    __metadata("design:type", String)
], NotificationTemplate.prototype, "template_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    (0, typeorm_1.Column)({ type: 'smallint', default: 1 }),
    __metadata("design:type", Number)
], NotificationTemplate.prototype, "is_enabled", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 0 }),
    (0, typeorm_1.Column)({ type: 'smallint', default: 0 }),
    __metadata("design:type", Number)
], NotificationTemplate.prototype, "is_deleted", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], NotificationTemplate.prototype, "created_by", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], NotificationTemplate.prototype, "updated_by", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], NotificationTemplate.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], NotificationTemplate.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => notification_template_version_entity_1.NotificationTemplateVersion, (version) => version.template),
    __metadata("design:type", Array)
], NotificationTemplate.prototype, "versions", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => notification_batches_entity_1.NotificationBatch, batch => batch.template),
    __metadata("design:type", Array)
], NotificationTemplate.prototype, "notification_batches", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => notifications_messages_entity_1.NotificationMessage, msg => msg.template),
    __metadata("design:type", Array)
], NotificationTemplate.prototype, "notification_messages", void 0);
exports.NotificationTemplate = NotificationTemplate = __decorate([
    (0, typeorm_1.Entity)('notification_templates', { schema: 'public' })
], NotificationTemplate);
