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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationalProfileCommonData = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const crypto_utils_1 = require("../encryption_decryption/crypto-utils");
const public_subscription_entity_1 = require("../../organization_register/entities/public_subscription.entity");
const branches_entity_1 = require("../../organizational-profile/entity/branches.entity");
let OrganizationalProfileCommonData = class OrganizationalProfileCommonData {
    constructor(dataSource, subscriptionRepository, branchRepository) {
        this.dataSource = dataSource;
        this.subscriptionRepository = subscriptionRepository;
        this.branchRepository = branchRepository;
    }
    async getOrganizationDetails(req) {
        try {
            const schemaName = req.cookies["x-organization-schema"];
            const organizationName = schemaName ? await (0, crypto_utils_1.decrypt)(schemaName) : null;
            const createdBy = req.cookies.system_user_id;
            const loginUserId = createdBy ? Number(await (0, crypto_utils_1.decrypt)(createdBy)) : null;
            const orgID = req.cookies.organization_id;
            const organizationId = orgID ? Number(await (0, crypto_utils_1.decrypt)(orgID)) : null;
            if (!organizationId) {
                throw new common_1.BadRequestException("Organization ID is missing or invalid.");
            }
            return {
                organizationName,
                loginUserId,
                organizationId,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(`Error extracting organization details: ${error.message}`);
        }
    }
};
exports.OrganizationalProfileCommonData = OrganizationalProfileCommonData;
exports.OrganizationalProfileCommonData = OrganizationalProfileCommonData = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_2.InjectRepository)(public_subscription_entity_1.Subscription)),
    __param(2, (0, typeorm_2.InjectRepository)(branches_entity_1.Branch)),
    __metadata("design:paramtypes", [typeorm_1.DataSource,
        typeorm_1.Repository,
        typeorm_1.Repository])
], OrganizationalProfileCommonData);
