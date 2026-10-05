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
exports.CreateNotificationTemplateVersionDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const enums_1 = require("./enums");
const class_transformer_1 = require("class-transformer");
const notification_template_version_entity_1 = require("../entities/notification-template-version.entity");
class CreateNotificationTemplateVersionDto {
}
exports.CreateNotificationTemplateVersionDto = CreateNotificationTemplateVersionDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 10 }),
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CreateNotificationTemplateVersionDto.prototype, "template_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CreateNotificationTemplateVersionDto.prototype, "vendor_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CreateNotificationTemplateVersionDto.prototype, "version_no", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: notification_template_version_entity_1.TemplateVersionState }),
    (0, class_validator_1.IsEnum)(notification_template_version_entity_1.TemplateVersionState),
    __metadata("design:type", String)
], CreateNotificationTemplateVersionDto.prototype, "state", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateNotificationTemplateVersionDto.prototype, "valid_from", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateNotificationTemplateVersionDto.prototype, "valid_to", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateNotificationTemplateVersionDto.prototype, "subject", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateNotificationTemplateVersionDto.prototype, "body", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: enums_1.BodyFormat }),
    (0, class_validator_1.IsEnum)(enums_1.BodyFormat),
    __metadata("design:type", String)
], CreateNotificationTemplateVersionDto.prototype, "body_format", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreateNotificationTemplateVersionDto.prototype, "dlt_template_id", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateNotificationTemplateVersionDto.prototype, "notes", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CreateNotificationTemplateVersionDto.prototype, "created_by", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: 'object',
        additionalProperties: {
            type: 'object',
            properties: {
                account_type: { type: 'string' },
                label: { type: 'string' },
            },
        },
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreateNotificationTemplateVersionDto.prototype, "template_variables", void 0);
