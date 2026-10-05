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
exports.OrganizationalProfile = void 0;
const typeorm_1 = require("typeorm");
const organizational_user_entity_1 = require("./organizational-user.entity");
const industry_types_entity_1 = require("../public_schema_entity/industry-types.entity");
let OrganizationalProfile = class OrganizationalProfile {
};
exports.OrganizationalProfile = OrganizationalProfile;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], OrganizationalProfile.prototype, "organization_profile_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], OrganizationalProfile.prototype, "org_name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], OrganizationalProfile.prototype, "industry_type_id", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => industry_types_entity_1.IndustryTypes),
    (0, typeorm_1.JoinColumn)({ name: 'industry_type_id' }),
    __metadata("design:type", industry_types_entity_1.IndustryTypes)
], OrganizationalProfile.prototype, "industry_type", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], OrganizationalProfile.prototype, "organization_location_name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], OrganizationalProfile.prototype, "organization_address", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], OrganizationalProfile.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], OrganizationalProfile.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], OrganizationalProfile.prototype, "pincode", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], OrganizationalProfile.prototype, "state", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], OrganizationalProfile.prototype, "country", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], OrganizationalProfile.prototype, "mobile_number", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], OrganizationalProfile.prototype, "org_alt_contact_number", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], OrganizationalProfile.prototype, "base_currency", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], OrganizationalProfile.prototype, "financial_year", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], OrganizationalProfile.prototype, "dateformat", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], OrganizationalProfile.prototype, "time_zone", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], OrganizationalProfile.prototype, "website_url", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], OrganizationalProfile.prototype, "street", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], OrganizationalProfile.prototype, "landmark", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], OrganizationalProfile.prototype, "gst_no", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], OrganizationalProfile.prototype, "esi_number", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], OrganizationalProfile.prototype, "lin_number", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], OrganizationalProfile.prototype, "pan_number", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], OrganizationalProfile.prototype, "tan_number", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], OrganizationalProfile.prototype, "pf_number", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], OrganizationalProfile.prototype, "report_basis", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], OrganizationalProfile.prototype, "established_date", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], OrganizationalProfile.prototype, "tenant_org_id", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => organizational_user_entity_1.User, (user) => user.organization),
    __metadata("design:type", Array)
], OrganizationalProfile.prototype, "users", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], OrganizationalProfile.prototype, "org_profile_image_address", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], OrganizationalProfile.prototype, "billingContactName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], OrganizationalProfile.prototype, "billingContactEmail", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], OrganizationalProfile.prototype, "billingContactPhone", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], OrganizationalProfile.prototype, "themeMode", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], OrganizationalProfile.prototype, "customThemeColor", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], OrganizationalProfile.prototype, "logo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], OrganizationalProfile.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], OrganizationalProfile.prototype, "updated_at", void 0);
exports.OrganizationalProfile = OrganizationalProfile = __decorate([
    (0, typeorm_1.Entity)('organizational_profile')
], OrganizationalProfile);
