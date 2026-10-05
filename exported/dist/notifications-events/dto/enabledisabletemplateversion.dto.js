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
exports.EnableDisableTemplateVersionDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class EnableDisableTemplateVersionDto {
}
exports.EnableDisableTemplateVersionDto = EnableDisableTemplateVersionDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: 'Template ID (Primary Key)',
    }),
    (0, class_validator_1.IsInt)({ message: 'version_id must be an integer' }),
    (0, class_validator_1.Min)(1, { message: 'version_id must be at least 1' }),
    __metadata("design:type", Number)
], EnableDisableTemplateVersionDto.prototype, "version_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: 'Enable or Disable status (1 = Enabled, 0 = Disabled)',
    }),
    (0, class_validator_1.IsNumber)({}, { message: 'is_enabled must be a number (0 or 1)' }),
    (0, class_validator_1.Min)(0, { message: 'is_enabled must be either 0 or 1' }),
    (0, class_validator_1.Max)(1, { message: 'is_enabled must be either 0 or 1' }),
    __metadata("design:type", Number)
], EnableDisableTemplateVersionDto.prototype, "is_enabled", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 2,
        description: 'User ID who updated the record',
    }),
    (0, class_validator_1.IsInt)({ message: 'updated_by must be an integer' }),
    (0, class_validator_1.Min)(1, { message: 'updated_by must be at least 1' }),
    __metadata("design:type", Number)
], EnableDisableTemplateVersionDto.prototype, "updated_by", void 0);
