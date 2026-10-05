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
exports.NotificationEvent = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const notification_batches_entity_1 = require("./notification_batches.entity");
const notifications_messages_entity_1 = require("./notifications_messages.entity");
const notification_setting_entity_1 = require("./notification-setting.entity");
let NotificationEvent = class NotificationEvent {
};
exports.NotificationEvent = NotificationEvent;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], NotificationEvent.prototype, "event_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ length: 200 }),
    __metadata("design:type", String)
], NotificationEvent.prototype, "event_name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], NotificationEvent.prototype, "event_description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ default: 0 }),
    (0, typeorm_1.Column)({ type: 'smallint', default: 0 }),
    __metadata("design:type", Number)
], NotificationEvent.prototype, "is_bulk", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ default: 1 }),
    (0, typeorm_1.Column)({ type: 'smallint', default: 1 }),
    __metadata("design:type", Number)
], NotificationEvent.prototype, "is_enabled", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ default: 0 }),
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], NotificationEvent.prototype, "is_deleted", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], NotificationEvent.prototype, "created_by", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], NotificationEvent.prototype, "updated_by", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], NotificationEvent.prototype, "created_at", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, typeorm_1.UpdateDateColumn)({ nullable: true }),
    __metadata("design:type", Date)
], NotificationEvent.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => notification_batches_entity_1.NotificationBatch, batch => batch.event),
    __metadata("design:type", Array)
], NotificationEvent.prototype, "notification_batches", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => notifications_messages_entity_1.NotificationMessage, msg => msg.event),
    __metadata("design:type", Array)
], NotificationEvent.prototype, "notification_messages", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => notification_setting_entity_1.NotificationSettings, (setting) => setting.event),
    __metadata("design:type", Array)
], NotificationEvent.prototype, "notification_settings", void 0);
exports.NotificationEvent = NotificationEvent = __decorate([
    (0, typeorm_1.Entity)('notification_events', { schema: 'public' })
], NotificationEvent);
