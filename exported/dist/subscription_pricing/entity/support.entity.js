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
exports.SupportTicket = exports.SupportTicketStatus = void 0;
const typeorm_1 = require("typeorm");
const register_organization_entity_1 = require("../../organization_register/entities/register-organization.entity");
var SupportTicketStatus;
(function (SupportTicketStatus) {
    SupportTicketStatus["OPEN"] = "open";
    SupportTicketStatus["IN_PROGRESS"] = "in_progress";
    SupportTicketStatus["RESOLVED"] = "resolved";
    SupportTicketStatus["CLOSED"] = "closed";
})(SupportTicketStatus || (exports.SupportTicketStatus = SupportTicketStatus = {}));
let SupportTicket = class SupportTicket {
};
exports.SupportTicket = SupportTicket;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: "ticket_id" }),
    __metadata("design:type", Number)
], SupportTicket.prototype, "ticketId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "support_ticket_id", type: "varchar", length: 30, nullable: false }),
    __metadata("design:type", String)
], SupportTicket.prototype, "supportTicketId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], SupportTicket.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], SupportTicket.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], SupportTicket.prototype, "subject", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], SupportTicket.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], SupportTicket.prototype, "priority", void 0);
__decorate([
    (0, typeorm_1.Column)("text"),
    __metadata("design:type", String)
], SupportTicket.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: SupportTicketStatus,
        enumName: "support_ticket_status",
        default: SupportTicketStatus.OPEN,
    }),
    __metadata("design:type", String)
], SupportTicket.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 1 }),
    __metadata("design:type", Number)
], SupportTicket.prototype, "is_active", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], SupportTicket.prototype, "is_deleted", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: "created_at" }),
    __metadata("design:type", Date)
], SupportTicket.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: "updated_at" }),
    __metadata("design:type", Date)
], SupportTicket.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)("simple-json", { nullable: true }),
    __metadata("design:type", Array)
], SupportTicket.prototype, "attachments", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", nullable: true, name: "user_id" }),
    __metadata("design:type", Number)
], SupportTicket.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", name: "org_id" }),
    __metadata("design:type", Number)
], SupportTicket.prototype, "orgId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => register_organization_entity_1.RegisterOrganization),
    (0, typeorm_1.JoinColumn)({ name: 'org_id' }),
    __metadata("design:type", register_organization_entity_1.RegisterOrganization)
], SupportTicket.prototype, "organization", void 0);
exports.SupportTicket = SupportTicket = __decorate([
    (0, typeorm_1.Entity)('support_tickets', { schema: 'pricing' })
], SupportTicket);
