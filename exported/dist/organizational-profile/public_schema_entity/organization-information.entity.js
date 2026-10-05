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
exports.OrganizationInformation = void 0;
const typeorm_1 = require("typeorm");
let OrganizationInformation = class OrganizationInformation {
};
exports.OrganizationInformation = OrganizationInformation;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], OrganizationInformation.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'organization_name', length: 255 }),
    __metadata("design:type", String)
], OrganizationInformation.prototype, "organizationName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'support_email', length: 255, nullable: true }),
    __metadata("design:type", String)
], OrganizationInformation.prototype, "supportEmail", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'support_phone', length: 50, nullable: true }),
    __metadata("design:type", String)
], OrganizationInformation.prototype, "supportPhone", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'website_url', type: 'text', nullable: true }),
    __metadata("design:type", String)
], OrganizationInformation.prototype, "websiteUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'logo_url', type: 'text', nullable: true }),
    __metadata("design:type", String)
], OrganizationInformation.prototype, "logoUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'address_line_1', length: 255, nullable: true }),
    __metadata("design:type", String)
], OrganizationInformation.prototype, "addressLine1", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'address_line_2', length: 255, nullable: true }),
    __metadata("design:type", String)
], OrganizationInformation.prototype, "addressLine2", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100, nullable: true }),
    __metadata("design:type", String)
], OrganizationInformation.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100, nullable: true }),
    __metadata("design:type", String)
], OrganizationInformation.prototype, "state", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100, nullable: true }),
    __metadata("design:type", String)
], OrganizationInformation.prototype, "country", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'postal_code', length: 20, nullable: true }),
    __metadata("design:type", String)
], OrganizationInformation.prototype, "postalCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'working_hours', length: 255, nullable: true }),
    __metadata("design:type", String)
], OrganizationInformation.prototype, "workingHours", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'footer_text', type: 'text', nullable: true }),
    __metadata("design:type", String)
], OrganizationInformation.prototype, "footerText", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'facebook_url', type: 'text', nullable: true }),
    __metadata("design:type", String)
], OrganizationInformation.prototype, "facebookUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'linkedin_url', type: 'text', nullable: true }),
    __metadata("design:type", String)
], OrganizationInformation.prototype, "linkedinUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'twitter_url', type: 'text', nullable: true }),
    __metadata("design:type", String)
], OrganizationInformation.prototype, "twitterUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'instagram_url', type: 'text', nullable: true }),
    __metadata("design:type", String)
], OrganizationInformation.prototype, "instagramUrl", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], OrganizationInformation.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], OrganizationInformation.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_active', default: true }),
    __metadata("design:type", Boolean)
], OrganizationInformation.prototype, "isActive", void 0);
exports.OrganizationInformation = OrganizationInformation = __decorate([
    (0, typeorm_1.Entity)('organization_information', { schema: 'public' })
], OrganizationInformation);
