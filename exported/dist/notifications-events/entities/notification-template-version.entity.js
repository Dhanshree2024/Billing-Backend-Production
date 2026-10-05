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
exports.NotificationTemplateVersion = exports.TemplateVersionState = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const notification_template_entity_1 = require("./notification-template.entity");
const third_party_vendor_entity_1 = require("./third-party-vendor.entity");
const notification_batches_entity_1 = require("./notification_batches.entity");
const notifications_messages_entity_1 = require("./notifications_messages.entity");
var TemplateVersionState;
(function (TemplateVersionState) {
    TemplateVersionState["DRAFT"] = "draft";
    TemplateVersionState["IN_REVIEW"] = "in_review";
    TemplateVersionState["APPROVED"] = "approved";
    TemplateVersionState["ACTIVE"] = "active";
    TemplateVersionState["ARCHIVED"] = "archived";
})(TemplateVersionState || (exports.TemplateVersionState = TemplateVersionState = {}));
let NotificationTemplateVersion = class NotificationTemplateVersion {
};
exports.NotificationTemplateVersion = NotificationTemplateVersion;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], NotificationTemplateVersion.prototype, "version_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 10 }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], NotificationTemplateVersion.prototype, "template_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => notification_template_entity_1.NotificationTemplate, (template) => template.versions),
    (0, typeorm_1.JoinColumn)({ name: 'template_id' }),
    __metadata("design:type", notification_template_entity_1.NotificationTemplate)
], NotificationTemplateVersion.prototype, "template", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], NotificationTemplateVersion.prototype, "version_no", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'draft',
        enum: TemplateVersionState,
    }),
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 20,
    }),
    __metadata("design:type", String)
], NotificationTemplateVersion.prototype, "state", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], NotificationTemplateVersion.prototype, "valid_from", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], NotificationTemplateVersion.prototype, "valid_to", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Welcome {{name}}' }),
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], NotificationTemplateVersion.prototype, "subject", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Hello {{name}}, your OTP is {{otp}}' }),
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], NotificationTemplateVersion.prototype, "body", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'TEXT' }),
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 20,
        default: 'TEXT',
    }),
    __metadata("design:type", String)
], NotificationTemplateVersion.prototype, "body_format", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'DLT123456' }),
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], NotificationTemplateVersion.prototype, "dlt_template_id", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], NotificationTemplateVersion.prototype, "notes", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 5 }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], NotificationTemplateVersion.prototype, "vendor_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => third_party_vendor_entity_1.ThirdPartyVendor, (vendor) => vendor.templateVersions, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'vendor_id' }),
    __metadata("design:type", third_party_vendor_entity_1.ThirdPartyVendor)
], NotificationTemplateVersion.prototype, "vendor", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: { name: 'string', otp: 'number' },
    }),
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], NotificationTemplateVersion.prototype, "template_variables", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    (0, typeorm_1.Column)({ type: 'smallint', default: 1 }),
    __metadata("design:type", Number)
], NotificationTemplateVersion.prototype, "is_enabled", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 0 }),
    (0, typeorm_1.Column)({ type: 'smallint', default: 0 }),
    __metadata("design:type", Number)
], NotificationTemplateVersion.prototype, "is_deleted", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], NotificationTemplateVersion.prototype, "created_by", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], NotificationTemplateVersion.prototype, "updated_by", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], NotificationTemplateVersion.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], NotificationTemplateVersion.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], NotificationTemplateVersion.prototype, "redirect_key", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Array)
], NotificationTemplateVersion.prototype, "redirect_params", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => notification_batches_entity_1.NotificationBatch, (batch) => batch.template_version),
    __metadata("design:type", Array)
], NotificationTemplateVersion.prototype, "notification_batches", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => notifications_messages_entity_1.NotificationMessage, msg => msg.template_version),
    __metadata("design:type", Array)
], NotificationTemplateVersion.prototype, "notification_messages", void 0);
exports.NotificationTemplateVersion = NotificationTemplateVersion = __decorate([
    (0, typeorm_1.Entity)('notification_template_versions', { schema: 'public' }),
    (0, typeorm_1.Unique)('notification_template_versions_unique', [
        'template_id',
        'version_no',
    ])
], NotificationTemplateVersion);
