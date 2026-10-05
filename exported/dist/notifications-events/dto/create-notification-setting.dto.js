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
exports.CreateNotificationSettingDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class NotificationConfigDto {
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: [15, 7, 3, 1] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], NotificationConfigDto.prototype, "days_before", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: [1, 3, 5] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], NotificationConfigDto.prototype, "days_after", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: [80, 90, 100] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], NotificationConfigDto.prototype, "thresholds", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: ['10:00', '16:00'] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], NotificationConfigDto.prototype, "send_times", void 0);
class CreateNotificationSettingDto {
}
exports.CreateNotificationSettingDto = CreateNotificationSettingDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2 }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateNotificationSettingDto.prototype, "event_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateNotificationSettingDto.prototype, "channel_id", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateNotificationSettingDto.prototype, "is_enabled", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 2 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateNotificationSettingDto.prototype, "quota_limit", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'DAILY' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateNotificationSettingDto.prototype, "quota_interval", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '09:00' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateNotificationSettingDto.prototype, "send_start_time", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '18:00' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateNotificationSettingDto.prototype, "send_end_time", void 0);
