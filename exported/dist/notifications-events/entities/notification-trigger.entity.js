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
exports.NotificationTriggers = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const notification_setting_entity_1 = require("./notification-setting.entity");
let NotificationTriggers = class NotificationTriggers {
};
exports.NotificationTriggers = NotificationTriggers;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], NotificationTriggers.prototype, "notification_trigger_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 10 }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], NotificationTriggers.prototype, "setting_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => notification_setting_entity_1.NotificationSettings, (setting) => setting.triggers, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'setting_id' }),
    __metadata("design:type", notification_setting_entity_1.NotificationSettings)
], NotificationTriggers.prototype, "setting", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'before | after | scheduled' }),
    (0, typeorm_1.Column)({ type: 'varchar', length: 20 }),
    __metadata("design:type", String)
], NotificationTriggers.prototype, "trigger_type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 7, required: false }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], NotificationTriggers.prototype, "delay_value", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'day | hour | min | month', required: false }),
    (0, typeorm_1.Column)({ type: 'varchar', length: 10, nullable: true }),
    __metadata("design:type", String)
], NotificationTriggers.prototype, "delay_unit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true, required: false }),
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], NotificationTriggers.prototype, "repeat_enabled", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 3, required: false }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], NotificationTriggers.prototype, "repeat_times", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, required: false }),
    (0, typeorm_1.Column)({ default: 1 }),
    __metadata("design:type", Number)
], NotificationTriggers.prototype, "repeat_count", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2, required: false }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], NotificationTriggers.prototype, "repeat_interval", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'hour | min', required: false }),
    (0, typeorm_1.Column)({ type: 'varchar', length: 10, nullable: true }),
    __metadata("design:type", String)
], NotificationTriggers.prototype, "repeat_unit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], NotificationTriggers.prototype, "stop_after", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    (0, typeorm_1.Column)({ default: 1 }),
    __metadata("design:type", Number)
], NotificationTriggers.prototype, "sequence_no", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'daily | weekly | monthly', required: false }),
    (0, typeorm_1.Column)({ type: 'varchar', length: 20, nullable: true }),
    __metadata("design:type", String)
], NotificationTriggers.prototype, "schedule_type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, required: false }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], NotificationTriggers.prototype, "day_of_month", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, required: false }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], NotificationTriggers.prototype, "day_of_week", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '11:00:00', required: false }),
    (0, typeorm_1.Column)({ type: 'time', nullable: true }),
    __metadata("design:type", String)
], NotificationTriggers.prototype, "schedule_time", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], NotificationTriggers.prototype, "created_at", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], NotificationTriggers.prototype, "condition_type", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], NotificationTriggers.prototype, "operator", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, typeorm_1.Column)({ nullable: true, type: 'int' }),
    __metadata("design:type", Number)
], NotificationTriggers.prototype, "condition_value", void 0);
exports.NotificationTriggers = NotificationTriggers = __decorate([
    (0, typeorm_1.Entity)('notification_triggers', { schema: 'public' })
], NotificationTriggers);
