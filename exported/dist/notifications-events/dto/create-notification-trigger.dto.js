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
exports.CreateNotificationTriggerDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class CreateNotificationTriggerDto {
}
exports.CreateNotificationTriggerDto = CreateNotificationTriggerDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'before | after | scheduled' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateNotificationTriggerDto.prototype, "trigger_type", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 7 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateNotificationTriggerDto.prototype, "delay_value", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'day | hour | min | month' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateNotificationTriggerDto.prototype, "delay_unit", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateNotificationTriggerDto.prototype, "repeat_enabled", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 3 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateNotificationTriggerDto.prototype, "repeat_times", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateNotificationTriggerDto.prototype, "repeat_count", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 2 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateNotificationTriggerDto.prototype, "repeat_interval", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'hour | min' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateNotificationTriggerDto.prototype, "repeat_unit", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'daily | weekly | monthly' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateNotificationTriggerDto.prototype, "schedule_type", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateNotificationTriggerDto.prototype, "day_of_month", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateNotificationTriggerDto.prototype, "day_of_week", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '11:00' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateNotificationTriggerDto.prototype, "schedule_time", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateNotificationTriggerDto.prototype, "sequence_no", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], CreateNotificationTriggerDto.prototype, "stop_after", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'quota_percentage' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateNotificationTriggerDto.prototype, "condition_type", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '>=' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateNotificationTriggerDto.prototype, "operator", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 80 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateNotificationTriggerDto.prototype, "condition_value", void 0);
