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
exports.NotificationSettings = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const notification_channel_entity_1 = require("./notification-channel.entity");
const notifications_event_entity_1 = require("./notifications-event.entity");
const notification_trigger_entity_1 = require("./notification-trigger.entity");
let NotificationSettings = class NotificationSettings {
};
exports.NotificationSettings = NotificationSettings;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], NotificationSettings.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2 }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], NotificationSettings.prototype, "event_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], NotificationSettings.prototype, "channel_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], NotificationSettings.prototype, "is_enabled", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2, required: false }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], NotificationSettings.prototype, "quota_limit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'DAILY', required: false }),
    (0, typeorm_1.Column)({ type: 'varchar', length: 20, nullable: true }),
    __metadata("design:type", String)
], NotificationSettings.prototype, "quota_interval", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '09:00', required: false }),
    (0, typeorm_1.Column)({ type: 'time', nullable: true }),
    __metadata("design:type", String)
], NotificationSettings.prototype, "send_start_time", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '18:00', required: false }),
    (0, typeorm_1.Column)({ type: 'time', nullable: true }),
    __metadata("design:type", String)
], NotificationSettings.prototype, "send_end_time", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: { days_before: [15, 7, 3, 1], send_times: ['10:00', '16:00'] },
        required: false,
    }),
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], NotificationSettings.prototype, "config", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], NotificationSettings.prototype, "created_at", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], NotificationSettings.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => notification_channel_entity_1.NotificationChannel),
    (0, typeorm_1.JoinColumn)({ name: 'channel_id', referencedColumnName: 'notification_channel_id' }),
    __metadata("design:type", notification_channel_entity_1.NotificationChannel)
], NotificationSettings.prototype, "channel", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => notifications_event_entity_1.NotificationEvent),
    (0, typeorm_1.JoinColumn)({ name: 'event_id', referencedColumnName: 'event_id' }),
    __metadata("design:type", notifications_event_entity_1.NotificationEvent)
], NotificationSettings.prototype, "event", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => notification_trigger_entity_1.NotificationTriggers, (trigger) => trigger.setting),
    __metadata("design:type", Array)
], NotificationSettings.prototype, "triggers", void 0);
exports.NotificationSettings = NotificationSettings = __decorate([
    (0, typeorm_1.Entity)('notification_settings', { schema: 'public' })
], NotificationSettings);
