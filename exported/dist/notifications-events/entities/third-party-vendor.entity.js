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
exports.ThirdPartyVendor = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const notification_template_version_entity_1 = require("./notification-template-version.entity");
let ThirdPartyVendor = class ThirdPartyVendor {
};
exports.ThirdPartyVendor = ThirdPartyVendor;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: "vendor_id" }),
    __metadata("design:type", Number)
], ThirdPartyVendor.prototype, "vendorId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "ABC Technologies" }),
    (0, typeorm_1.Column)({
        name: "vendor_name",
        type: "varchar",
        length: 200,
        nullable: true,
    }),
    __metadata("design:type", String)
], ThirdPartyVendor.prototype, "vendorName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "IT Infrastructure Provider" }),
    (0, typeorm_1.Column)({
        name: "vendor_description",
        type: "varchar",
        length: 200,
        nullable: true,
    }),
    __metadata("design:type", String)
], ThirdPartyVendor.prototype, "vendorDescription", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "John Doe" }),
    (0, typeorm_1.Column)({
        name: "vendor_contact_person_name",
        type: "varchar",
        length: 200,
        nullable: true,
    }),
    __metadata("design:type", String)
], ThirdPartyVendor.prototype, "vendorContactPersonName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "9876543210" }),
    (0, typeorm_1.Column)({
        name: "vendor_contact_number",
        type: "varchar",
        length: 20,
        nullable: true,
    }),
    __metadata("design:type", String)
], ThirdPartyVendor.prototype, "vendorContactNumber", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "contact@abc.com" }),
    (0, typeorm_1.Column)({
        name: "vendor_email_address",
        type: "varchar",
        length: 50,
        nullable: true,
    }),
    __metadata("design:type", String)
], ThirdPartyVendor.prototype, "vendorEmailAddress", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "https://abc.com" }),
    (0, typeorm_1.Column)({
        name: "vendor_website",
        type: "varchar",
        length: 200,
        nullable: true,
    }),
    __metadata("design:type", String)
], ThirdPartyVendor.prototype, "vendorWebsite", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 0 }),
    (0, typeorm_1.Column)({
        name: "is_deleted",
        type: "smallint",
        default: 0,
    }),
    __metadata("design:type", Number)
], ThirdPartyVendor.prototype, "isDeleted", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    (0, typeorm_1.Column)({
        name: "is_enabled",
        type: "smallint",
        default: 1,
    }),
    __metadata("design:type", Number)
], ThirdPartyVendor.prototype, "isEnabled", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1 }),
    (0, typeorm_1.Column)({
        name: "created_by",
        type: "integer",
        nullable: true,
    }),
    __metadata("design:type", Number)
], ThirdPartyVendor.prototype, "createdBy", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1 }),
    (0, typeorm_1.Column)({
        name: "updated_by",
        type: "integer",
        nullable: true,
    }),
    __metadata("design:type", Number)
], ThirdPartyVendor.prototype, "updatedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "2026-02-12T10:00:00.000Z" }),
    (0, typeorm_1.CreateDateColumn)({
        name: "created_at",
        type: "timestamptz",
        default: () => "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date)
], ThirdPartyVendor.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "2026-02-12T12:00:00.000Z" }),
    (0, typeorm_1.UpdateDateColumn)({
        name: "updated_at",
        type: "timestamptz",
        nullable: true,
    }),
    __metadata("design:type", Date)
], ThirdPartyVendor.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: { apiKey: "12345", region: "India" },
    }),
    (0, typeorm_1.Column)({
        name: "additional_parameters",
        type: "jsonb",
        nullable: true,
    }),
    __metadata("design:type", Object)
], ThirdPartyVendor.prototype, "additionalParameters", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => notification_template_version_entity_1.NotificationTemplateVersion, (version) => version.vendor),
    __metadata("design:type", Array)
], ThirdPartyVendor.prototype, "templateVersions", void 0);
exports.ThirdPartyVendor = ThirdPartyVendor = __decorate([
    (0, typeorm_1.Entity)("third_party_vendors", { schema: 'public' })
], ThirdPartyVendor);
