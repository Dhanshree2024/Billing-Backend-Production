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
exports.ContactSalesRequest = void 0;
const typeorm_1 = require("typeorm");
const industry_types_entity_1 = require("../../organizational-profile/public_schema_entity/industry-types.entity");
let ContactSalesRequest = class ContactSalesRequest {
};
exports.ContactSalesRequest = ContactSalesRequest;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'contact_request_id' }),
    __metadata("design:type", Number)
], ContactSalesRequest.prototype, "contactRequestId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], ContactSalesRequest.prototype, "plan_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], ContactSalesRequest.prototype, "org_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ContactSalesRequest.prototype, "first_name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ContactSalesRequest.prototype, "last_name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ContactSalesRequest.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ContactSalesRequest.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ContactSalesRequest.prototype, "company_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ContactSalesRequest.prototype, "job_title", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ContactSalesRequest.prototype, "company_size_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], ContactSalesRequest.prototype, "industry_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], ContactSalesRequest.prototype, "budget_range_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], ContactSalesRequest.prototype, "implementation_timeline_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], ContactSalesRequest.prototype, "requirements", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], ContactSalesRequest.prototype, "message", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'Pending' }),
    __metadata("design:type", String)
], ContactSalesRequest.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], ContactSalesRequest.prototype, "is_active", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], ContactSalesRequest.prototype, "is_deleted", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ContactSalesRequest.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], ContactSalesRequest.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => industry_types_entity_1.IndustryTypes, (industry) => industry.contactSalesRequests, {
        eager: true,
    }),
    (0, typeorm_1.JoinColumn)({ name: 'industry_id', referencedColumnName: 'industryId' }),
    __metadata("design:type", industry_types_entity_1.IndustryTypes)
], ContactSalesRequest.prototype, "industry", void 0);
exports.ContactSalesRequest = ContactSalesRequest = __decorate([
    (0, typeorm_1.Entity)({ schema: 'pricing', name: 'contact_sales_requests' })
], ContactSalesRequest);
