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
exports.Branch = void 0;
const typeorm_1 = require("typeorm");
const organizational_user_entity_1 = require("./organizational-user.entity");
const locations_entity_1 = require("./locations.entity");
let Branch = class Branch {
};
exports.Branch = Branch;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'branch_id' }),
    __metadata("design:type", Number)
], Branch.prototype, "branch_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'branch_name' }),
    __metadata("design:type", String)
], Branch.prototype, "branch_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'gst_no' }),
    __metadata("design:type", String)
], Branch.prototype, "gstNo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'city_id' }),
    __metadata("design:type", Number)
], Branch.prototype, "city_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'country_id' }),
    __metadata("design:type", Number)
], Branch.prototype, "country_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'location_id' }),
    __metadata("design:type", Number)
], Branch.prototype, "location_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'branch_street' }),
    __metadata("design:type", String)
], Branch.prototype, "branch_street", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'branch_landmark' }),
    __metadata("design:type", String)
], Branch.prototype, "branch_landmark", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'city' }),
    __metadata("design:type", String)
], Branch.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'state' }),
    __metadata("design:type", String)
], Branch.prototype, "state", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'country' }),
    __metadata("design:type", String)
], Branch.prototype, "country", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'pincode' }),
    __metadata("design:type", Number)
], Branch.prototype, "pincode", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Branch.prototype, "established_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'contact_number' }),
    __metadata("design:type", String)
], Branch.prototype, "contact_number", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'branch_email' }),
    __metadata("design:type", String)
], Branch.prototype, "branch_email", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'alternative_contact_number' }),
    __metadata("design:type", String)
], Branch.prototype, "alternative_contact_number", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'primary_user_id' }),
    __metadata("design:type", Number)
], Branch.prototype, "primary_user_id", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => organizational_user_entity_1.User, (user) => user.branchAsPrimary),
    (0, typeorm_1.JoinColumn)({ name: 'primary_user_id' }),
    __metadata("design:type", organizational_user_entity_1.User)
], Branch.prototype, "primaryUser", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'created_at',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], Branch.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'updated_at',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], Branch.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], Branch.prototype, "is_active", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], Branch.prototype, "is_deleted", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'created_by' }),
    __metadata("design:type", Number)
], Branch.prototype, "created_by", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => organizational_user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'created_by' }),
    __metadata("design:type", organizational_user_entity_1.User)
], Branch.prototype, "created_user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => locations_entity_1.Locations, (location) => location.branch),
    __metadata("design:type", Array)
], Branch.prototype, "locations", void 0);
exports.Branch = Branch = __decorate([
    (0, typeorm_1.Entity)('branches')
], Branch);
