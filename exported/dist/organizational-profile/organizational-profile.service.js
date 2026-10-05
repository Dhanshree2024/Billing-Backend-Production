"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const fs_1 = require("fs");
const nodemailer = __importStar(require("nodemailer"));
const path_1 = require("path");
const auth_service_1 = require("../auth/auth.service");
const mail_config_service_1 = require("../common/mail/mail-config.service");
const mail_service_1 = require("../common/mail/mail.service");
const render_email_1 = require("../common/mail/render-email");
const register_organization_entity_1 = require("../organization_register/entities/register-organization.entity");
const register_user_login_entity_1 = require("../organization_register/entities/register-user-login.entity");
const roles_permission_entity_1 = require("../roles_permissions/entities/roles_permission.entity");
const typeorm_2 = require("typeorm");
const XlsxPopulate = __importStar(require("xlsx-populate"));
const database_service_1 = require("../dynamic-schema/database.service");
const branches_entity_1 = require("./entity/branches.entity");
const department_entity_1 = require("./entity/department.entity");
const designations_entity_1 = require("./entity/designations.entity");
const locations_entity_1 = require("./entity/locations.entity");
const organizational_profile_entity_1 = require("./entity/organizational-profile.entity");
const organizational_user_entity_1 = require("./entity/organizational-user.entity");
const organizational_vendors_entity_1 = require("./entity/organizational-vendors.entity");
const roles_entity_1 = require("./entity/roles.entity");
const department_config_entity_1 = require("./public_schema_entity/department-config.entity");
const designations_config_entity_1 = require("./public_schema_entity/designations-config.entity");
const industry_types_entity_1 = require("./public_schema_entity/industry-types.entity");
const pincode_entity_1 = require("./public_schema_entity/pincode.entity");
const setup_task_entity_1 = require("../onboarding-engine/entities/setup-task.entity");
const public_billing_portal_user_entity_1 = require("../organization_register/entities/public_billing_portal_user.entity");
const plan_services_mapping_entity_1 = require("../services/entity/plan_services_mapping.entity");
const billing_info_entity_1 = require("../subscription_pricing/entity/billing_info.entity");
const contact_sales_requests_entity_1 = require("../subscription_pricing/entity/contact_sales_requests.entity");
const offline_payment_requests_entity_1 = require("../subscription_pricing/entity/offline_payment_requests.entity");
const org_feature_overrides_entity_1 = require("../subscription_pricing/entity/org_feature_overrides.entity");
const org_subscription_entity_1 = require("../subscription_pricing/entity/org_subscription.entity");
const payment_mode_entity_1 = require("../subscription_pricing/entity/payment_mode.entity");
const payment_transaction_entity_1 = require("../subscription_pricing/entity/payment_transaction.entity");
const plan_feature_mapping_entity_1 = require("../subscription_pricing/entity/plan-feature-mapping.entity");
const plan_entity_1 = require("../subscription_pricing/entity/plan.entity");
const support_entity_1 = require("../subscription_pricing/entity/support.entity");
const organization_information_entity_1 = require("./public_schema_entity/organization-information.entity");
let OrganizationService = class OrganizationService {
    constructor(dataSource, databaseService, mailService, mailConfigService, authService, userRepository, registerUser, registerOrganization, billinguserRepo, vendorRepository, branchRepository, departmentRepository, roleRepository, rolesPermissionRepository, designationsRepository, locationRepository, pincodesRepository, planRepository, subscriptionRepository, planFeatureMappingRepository, paymentModeRepository, billingInfoRepository, offlinePaymentRepo, paymentTransactionRepository, orgFeatureOverrideRepository, contactSalesRepo, serviceMappingRepo, supportTicketRepo, setupTaskRepository, organizationRepository) {
        this.dataSource = dataSource;
        this.databaseService = databaseService;
        this.mailService = mailService;
        this.mailConfigService = mailConfigService;
        this.authService = authService;
        this.userRepository = userRepository;
        this.registerUser = registerUser;
        this.registerOrganization = registerOrganization;
        this.billinguserRepo = billinguserRepo;
        this.vendorRepository = vendorRepository;
        this.branchRepository = branchRepository;
        this.departmentRepository = departmentRepository;
        this.roleRepository = roleRepository;
        this.rolesPermissionRepository = rolesPermissionRepository;
        this.designationsRepository = designationsRepository;
        this.locationRepository = locationRepository;
        this.pincodesRepository = pincodesRepository;
        this.planRepository = planRepository;
        this.subscriptionRepository = subscriptionRepository;
        this.planFeatureMappingRepository = planFeatureMappingRepository;
        this.paymentModeRepository = paymentModeRepository;
        this.billingInfoRepository = billingInfoRepository;
        this.offlinePaymentRepo = offlinePaymentRepo;
        this.paymentTransactionRepository = paymentTransactionRepository;
        this.orgFeatureOverrideRepository = orgFeatureOverrideRepository;
        this.contactSalesRepo = contactSalesRepo;
        this.serviceMappingRepo = serviceMappingRepo;
        this.supportTicketRepo = supportTicketRepo;
        this.setupTaskRepository = setupTaskRepository;
        this.organizationRepository = organizationRepository;
    }
    async getUserDropdown() {
        const users = await this.userRepository.find({
            where: { is_active: 1, is_deleted: 0 },
        });
        return users.map((user) => ({
            label: `${user.first_name} ${user.last_name}`,
            value: user.user_id,
        }));
    }
    async getCounts() {
        const counts = {
            users: 0,
            assets: 0,
            departments: 0,
            branches: 0,
        };
        try {
            const userCount = await this.dataSource
                .getRepository('users')
                .createQueryBuilder('user')
                .where('user.is_active = :isActive', { isActive: 1 })
                .getCount();
            counts.users = userCount;
        }
        catch (error) {
            console.error('Error fetching user count:', error.message);
        }
        try {
            const departmentCount = await this.dataSource
                .getRepository('departments')
                .createQueryBuilder('department')
                .where('department.is_active = :isActive', { isActive: true })
                .getCount();
            counts.departments = departmentCount;
        }
        catch (error) {
            console.error('Error fetching department count:', error.message);
        }
        try {
            const assetCount = await this.dataSource
                .getRepository('assets')
                .createQueryBuilder('asset')
                .where('asset.asset_is_active = :isActive', { isActive: 1 })
                .where('asset.asset_is_deleted = :isDeleted', { isDeleted: 0 })
                .getCount();
            counts.assets = assetCount;
        }
        catch (error) {
            console.error('Error fetching designation count:', error.message);
        }
        try {
            const branchCount = await this.dataSource
                .getRepository('branches')
                .createQueryBuilder('branch')
                .where('branch.is_active = :isActive', { isActive: true })
                .getCount();
            counts.branches = branchCount;
        }
        catch (error) {
            console.error('Error fetching branch count:', error.message);
        }
        return {
            status: 'success',
            message: 'Counts retrieved successfully.',
            data: counts,
        };
    }
    async updateOrgainzationProfileValues(dto, organization_Id) {
        const { alternative_contact, mobile_number, established_date, organization_profile_id, user_id, ...updates } = dto;
        console.log('dto', dto);
        const organization = await this.dataSource
            .getRepository(organizational_profile_entity_1.OrganizationalProfile)
            .findOne({
            where: { tenant_org_id: organization_Id },
        });
        if (!organization) {
            throw new Error('Organization profile not found.');
        }
        organization.mobile_number = mobile_number;
        if (established_date) {
            organization.established_date = new Date(established_date);
        }
        const updatedUser = await this.dataSource
            .getRepository(organizational_profile_entity_1.OrganizationalProfile)
            .save(organization);
        const orgUpdates = [
            'organization_name',
            'industry_type_name',
            'gst_no',
            'pan_number',
            'mobile_number',
            'org_alt_contact_number',
            'email',
            'website_url',
            'financial_year',
            'esi_number',
            'pf_number',
            'lin_number',
            'tan_number',
            'base_currency',
            'time_zone',
            'city',
            'pincode',
            'state',
            'dateformat',
            'alternative_contact',
            'established_date',
            'street',
            'landmark',
            'billingContactName',
            'billingContactEmail',
            'billingContactPhone',
            'customThemeColor',
            'themeMode',
            'logo',
        ];
        for (const key of orgUpdates) {
            if (updates[key] !== undefined && updates[key] !== '') {
                organization[key] = updates[key];
            }
        }
        await this.dataSource
            .getRepository(organizational_profile_entity_1.OrganizationalProfile)
            .save(organization);
        return {
            message: 'Organization profile and user data updated successfully.',
            organization,
        };
    }
    async fetchIndustryTypes() {
        try {
            const result = await this.dataSource
                .getRepository(industry_types_entity_1.IndustryTypes)
                .createQueryBuilder('industry')
                .where('industry.is_active = :isActive', { isActive: true })
                .andWhere('industry.is_deleted = :isDeleted', { isDeleted: false })
                .getMany();
            if (!result || result.length === 0) {
                throw new common_1.BadRequestException('No organizational profiles found with the specified criteria.');
            }
            return {
                status: 'success',
                message: 'Industry types retrieved successfully.',
                data: result,
            };
        }
        catch (error) {
            console.log(error);
            throw new common_1.BadRequestException(`Error fetching industry types: ${error.message}`);
        }
    }
    async getPlanWithFeaturesById(planId) {
        try {
            const plan = await this.planRepository
                .createQueryBuilder('plan')
                .leftJoinAndSelect('plan.featureMappings', 'mapping')
                .leftJoinAndSelect('mapping.feature', 'feature')
                .leftJoinAndSelect('plan.billings', 'billing')
                .where('plan.plan_id = :planId', { planId })
                .andWhere('plan.is_active = :active', { active: true })
                .orderBy('feature.feature_name', 'ASC')
                .getOne();
            if (!plan)
                return null;
            return {
                plan_id: plan.plan_id,
                plan_name: plan.plan_name,
                description: plan.description,
                created_at: plan.created_at,
                updated_at: plan.updated_at,
                is_active: plan.is_active,
                is_deleted: plan.is_deleted,
                billing: plan.billings?.[0] ?? null,
                featureMappings: plan.featureMappings.map((mapping) => ({
                    mapping_id: mapping.mapping_id,
                    plan_id: mapping.plan_id,
                    feature_id: mapping.feature_id,
                    feature_value: mapping.feature_value,
                    status: mapping.status,
                    created_at: mapping.created_at,
                    updated_at: mapping.updated_at,
                    feature: {
                        feature_id: mapping.feature.feature_id,
                        feature_name: mapping.feature.feature_name,
                        feature_display_name: mapping.feature_display_name,
                        description: mapping.feature.description,
                        created_at: mapping.feature.created_at,
                        updated_at: mapping.feature.updated_at,
                        is_active: mapping.feature.is_active,
                        is_deleted: mapping.feature.is_deleted,
                        default_value: mapping.feature.default_value,
                        is_upcoming: mapping.feature.is_upcoming,
                    },
                })),
            };
        }
        catch (error) {
            console.error('Error fetching plan with features:', error);
            throw new Error('Failed to fetch plan with features');
        }
    }
    async getPlansWithFeaturesByProducts(productId) {
        try {
            const plans = await this.planRepository
                .createQueryBuilder('plan')
                .leftJoinAndSelect('plan.featureMappings', 'mapping')
                .leftJoinAndSelect('mapping.feature', 'feature')
                .leftJoinAndSelect('plan.billings', 'billing')
                .where('plan.is_active = :active', { active: true })
                .andWhere('plan.product_id = :productId', { productId })
                .orderBy('plan.plan_id', 'ASC')
                .addOrderBy('feature.feature_name', 'ASC')
                .getMany();
            return plans.map((plan) => ({
                plan_id: plan.plan_id,
                plan_name: plan.plan_name,
                description: plan.description,
                created_at: plan.created_at,
                updated_at: plan.updated_at,
                is_active: plan.is_active,
                is_deleted: plan.is_deleted,
                set_trial: plan.set_trial,
                billing: plan.billings?.[0] ?? null,
                featureMappings: plan.featureMappings.map((mapping) => ({
                    mapping_id: mapping.mapping_id,
                    plan_id: mapping.plan_id,
                    feature_id: mapping.feature_id,
                    feature_value: mapping.feature_value,
                    status: mapping.status,
                    created_at: mapping.created_at,
                    updated_at: mapping.updated_at,
                    feature: {
                        feature_id: mapping.feature.feature_id,
                        feature_name: mapping.feature.feature_name,
                        feature_display_name: mapping.feature_display_name,
                        description: mapping.feature.description,
                        created_at: mapping.feature.created_at,
                        updated_at: mapping.feature.updated_at,
                        is_active: mapping.feature.is_active,
                        is_deleted: mapping.feature.is_deleted,
                        default_value: mapping.feature.default_value,
                        is_upcoming: mapping.feature.is_upcoming,
                    },
                })),
            }));
        }
        catch (error) {
            console.error('Error fetching plans with features by product:', error);
            throw new Error('Failed to fetch plans with features by product');
        }
    }
    async getAllPlansWithFeatures() {
        try {
            const plans = await this.planRepository
                .createQueryBuilder('plan')
                .leftJoinAndSelect('plan.featureMappings', 'mapping')
                .leftJoinAndSelect('mapping.feature', 'feature')
                .leftJoinAndSelect('plan.billings', 'billing')
                .where('plan.is_active = :active', { active: true })
                .orderBy('plan.plan_name', 'ASC')
                .addOrderBy('feature.feature_name', 'ASC')
                .getMany();
            const transformed = plans.map((plan) => ({
                plan_id: plan.plan_id,
                plan_name: plan.plan_name,
                description: plan.description,
                created_at: plan.created_at,
                updated_at: plan.updated_at,
                is_active: plan.is_active,
                is_deleted: plan.is_deleted,
                set_trial: plan.set_trial,
                billing: plan.billings?.[0] ?? null,
                featureMappings: plan.featureMappings.map((mapping) => ({
                    mapping_id: mapping.mapping_id,
                    plan_id: mapping.plan_id,
                    feature_id: mapping.feature_id,
                    feature_value: mapping.feature_value,
                    status: mapping.status,
                    created_at: mapping.created_at,
                    updated_at: mapping.updated_at,
                    feature: {
                        feature_id: mapping.feature.feature_id,
                        feature_name: mapping.feature.feature_name,
                        description: mapping.feature.description,
                        created_at: mapping.feature.created_at,
                        updated_at: mapping.feature.updated_at,
                        is_active: mapping.feature.is_active,
                        is_deleted: mapping.feature.is_deleted,
                        default_value: mapping.feature.default_value,
                    },
                })),
            }));
            return transformed;
        }
        catch (error) {
            console.error('Error fetching all plans with features:', error);
            throw new Error('Failed to fetch all plans with features');
        }
    }
    async getPlansWithFeaturesByProduct(productId) {
        try {
            const plans = await this.planRepository
                .createQueryBuilder('plan')
                .leftJoinAndSelect('plan.featureMappings', 'mapping')
                .leftJoinAndSelect('mapping.feature', 'feature')
                .leftJoinAndSelect('plan.billings', 'billing')
                .leftJoinAndSelect('plan.product', 'product')
                .where('plan.is_active = :active', { active: true })
                .andWhere('plan.productId = :productId', { productId })
                .orderBy('plan.plan_name', 'ASC')
                .addOrderBy('feature.feature_name', 'ASC')
                .getMany();
            const transformed = plans.map((plan) => ({
                plan_id: plan.plan_id,
                plan_name: plan.plan_name,
                description: plan.description,
                created_at: plan.created_at,
                updated_at: plan.updated_at,
                is_active: plan.is_active,
                is_deleted: plan.is_deleted,
                set_trial: plan.set_trial,
                product: plan.product
                    ? {
                        product_id: plan.product.productId,
                        product_name: plan.product.name,
                    }
                    : null,
                billing: plan.billings?.[0] ?? null,
                featureMappings: plan.featureMappings.map((mapping) => ({
                    mapping_id: mapping.mapping_id,
                    plan_id: mapping.plan_id,
                    feature_id: mapping.feature_id,
                    feature_value: mapping.feature_value,
                    status: mapping.status,
                    created_at: mapping.created_at,
                    updated_at: mapping.updated_at,
                    feature: {
                        feature_id: mapping.feature.feature_id,
                        feature_name: mapping.feature.feature_name,
                        description: mapping.feature.description,
                        created_at: mapping.feature.created_at,
                        updated_at: mapping.feature.updated_at,
                        is_active: mapping.feature.is_active,
                        is_deleted: mapping.feature.is_deleted,
                        default_value: mapping.feature.default_value,
                    },
                })),
            }));
            return transformed;
        }
        catch (error) {
            console.error('Error fetching plans with features by product:', error);
            throw new Error('Failed to fetch plans with features by product');
        }
    }
    async fetchDesignationsconfig() {
        try {
            const result = await this.dataSource
                .getRepository(designations_config_entity_1.DesignationsConfig)
                .createQueryBuilder('designationsconfig')
                .where('designationsconfig.is_active = :isActive', { isActive: true })
                .andWhere('designationsconfig.is_deleted = :isDeleted', {
                isDeleted: false,
            })
                .getMany();
            if (!result || result.length === 0) {
                throw new common_1.BadRequestException('No organizational profiles found with the specified criteria.');
            }
            return {
                status: 'success',
                message: 'Industry types retrieved successfully.',
                data: result,
            };
        }
        catch (error) {
            console.log(error);
            throw new common_1.BadRequestException(`Error fetching industry types: ${error.message}`);
        }
    }
    async createDesignations(CreateDesignationDto) {
        const { newDesignationNames = [], existingDesignationNames = [], departmentId, desg_description, } = CreateDesignationDto;
        const trimmedNewNames = newDesignationNames.map((name) => name.trim());
        const trimmedExistingNames = existingDesignationNames.map((name) => name.trim());
        const designationNamesToProcess = [
            ...trimmedExistingNames,
            ...trimmedNewNames,
        ];
        if (designationNamesToProcess.length === 0) {
            return { success: false, message: 'No designations provided' };
        }
        try {
            const designationsRepository = this.dataSource.getRepository(designations_entity_1.Designations);
            const departmentRepository = this.dataSource.getRepository(department_entity_1.Department);
            const allDesignations = await designationsRepository.find();
            const existingNamesInDb = allDesignations.map((des) => des.designation_name.trim().toLowerCase());
            const seen = new Set();
            const newDesignationsToSave = designationNamesToProcess
                .filter((name) => {
                const lowerTrimmed = name.toLowerCase();
                const isDuplicate = existingNamesInDb.includes(lowerTrimmed) || seen.has(lowerTrimmed);
                if (!isDuplicate)
                    seen.add(lowerTrimmed);
                return !isDuplicate;
            })
                .map((name) => ({
                designation_name: name.trim(),
                parent_department: departmentId || null,
                desg_description: desg_description?.trim() || '',
            }));
            let savedDesignations = [];
            if (newDesignationsToSave.length > 0) {
                savedDesignations = await designationsRepository.save(newDesignationsToSave);
                if (departmentId) {
                    const department = await departmentRepository.findOne({
                        where: { departmentId },
                    });
                    if (department) {
                        const currentLinked = Array.isArray(department.linked_designations)
                            ? department.linked_designations
                            : [];
                        const newIds = savedDesignations.map((des) => des.designation_id);
                        const updatedIds = Array.from(new Set([...currentLinked, ...newIds]));
                        department.linked_designations = updatedIds;
                        await departmentRepository.save(department);
                    }
                }
            }
            if (savedDesignations.length > 0) {
                return {
                    success: true,
                    message: 'New designations added',
                    data: savedDesignations,
                };
            }
            else {
                return { success: false, message: 'All designations already exist' };
            }
        }
        catch (error) {
            console.error('Error saving designations:', error);
            throw new common_1.BadRequestException('Error saving designations.');
        }
    }
    async editDesignation(designationId, newName, newDescription, departmentId) {
        if (!designationId || !newName?.trim()) {
            throw new common_1.BadRequestException('Invalid designation ID or name');
        }
        const designationRepo = this.dataSource.getRepository(designations_entity_1.Designations);
        const departmentRepo = this.dataSource.getRepository(department_entity_1.Department);
        console.log('📥 Incoming:', { designationId, newName, departmentId });
        const existing = await designationRepo.findOneBy({
            designation_id: designationId,
        });
        if (!existing)
            throw new common_1.BadRequestException('Designation not found');
        const nameExists = await designationRepo
            .createQueryBuilder('d')
            .where('LOWER(d.designation_name) = LOWER(:name)', {
            name: newName.trim(),
        })
            .andWhere('d.designation_id != :id', { id: designationId })
            .getOne();
        if (nameExists)
            throw new common_1.BadRequestException('Designation name already in use');
        if (existing.parent_department &&
            existing.parent_department !== departmentId) {
            console.log('🔁 Removing from previous dept:', existing.parent_department);
            await departmentRepo
                .createQueryBuilder()
                .update()
                .set({
                linked_designations: () => `(SELECT jsonb_agg(e) FROM jsonb_array_elements(linked_designations) e WHERE e::text != '${designationId}')`,
            })
                .where('department_id = :prevDeptId', {
                prevDeptId: existing.parent_department,
            })
                .execute();
        }
        if (departmentId) {
            const targetDept = await departmentRepo.findOneBy({ departmentId });
            if (!targetDept)
                throw new common_1.BadRequestException('Target department not found');
            const existingLinks = Array.isArray(targetDept.linked_designations)
                ? targetDept.linked_designations
                : [];
            const currentLinks = existingLinks
                .filter((id) => typeof id === 'number' && !isNaN(id))
                .map((id) => Number(id));
            console.log('🏢 Dept before:', targetDept.departmentId, currentLinks);
            if (!currentLinks.includes(designationId)) {
                targetDept.linked_designations = Array.from(new Set([...currentLinks, Number(designationId)]));
                await departmentRepo.save(targetDept);
                console.log('✅ Saved new department with:', targetDept.linked_designations);
            }
            else {
                console.log('⚠️ Designation already in department, skipping add.');
            }
            existing.parent_department = departmentId;
        }
        existing.designation_name = newName.trim();
        existing.desg_description = newDescription?.trim() || null;
        const updated = await designationRepo.save(existing);
        console.log('✅ Final update:', updated);
        return {
            success: true,
            message: 'Designation updated successfully',
            data: updated,
        };
    }
    async deleteDepartments(deleteDepartmentsDto) {
        const { departmentIds } = deleteDepartmentsDto;
        if (!departmentIds.length) {
            throw new common_1.BadRequestException('No department IDs provided');
        }
        const departmentRepository = this.dataSource.getRepository(department_entity_1.Department);
        const departments = await departmentRepository.findBy({
            departmentId: (0, typeorm_2.In)(departmentIds),
        });
        if (!departments.length) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.NOT_FOUND,
                message: 'No matching departments found',
            }, common_1.HttpStatus.NOT_FOUND);
        }
        departments.forEach((dept) => {
            dept.active = false;
            dept.deleted = true;
        });
        await departmentRepository.save(departments);
        return {
            status: common_1.HttpStatus.OK,
            message: `${departments.length} department(s) have been deactivated and marked as deleted`,
        };
    }
    async deleteDesignation(deleteDesignationDto) {
        const { designationIds } = deleteDesignationDto;
        if (!designationIds || !designationIds.length) {
            throw new common_1.BadRequestException('No designation IDs provided');
        }
        const designations = await this.designationsRepository.findBy({
            designation_id: (0, typeorm_2.In)(designationIds),
        });
        if (!designations.length) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.NOT_FOUND,
                message: 'No matching designations found',
            }, common_1.HttpStatus.NOT_FOUND);
        }
        designations.forEach((designation) => {
            designation.is_active = false;
            designation.is_deleted = true;
        });
        await this.designationsRepository.save(designations);
        return {
            status: common_1.HttpStatus.OK,
            message: `${designations.length} designation(s) have been deactivated and marked as deleted`,
        };
    }
    async fetchOrganizationDeparments(searchQuery = '') {
        try {
            const rawResult = await this.dataSource
                .createQueryBuilder()
                .select('d.*')
                .addSelect('u.first_name', 'departmentHead_first_name')
                .addSelect('u.last_name', 'departmentHead_last_name')
                .addSelect((subQuery) => {
                return subQuery
                    .select('COUNT(*)')
                    .from(organizational_user_entity_1.User, 'user')
                    .where('user.department_id = d.department_id')
                    .andWhere('user.is_active = 1')
                    .andWhere('user.is_deleted = 0');
            }, 'employeeCount')
                .addSelect((subQuery) => {
                return subQuery
                    .select(`
            json_agg(
              json_build_object(
                'designation_id', des.designation_id,
                'designation_name', des.designation_name,
                'desg_description', des.desg_description,
                'parent_department', des.parent_department,
                'created_at', des.created_at,
                'updated_at', des.updated_at,
                'employee_count', (
                  SELECT COUNT(*)
                  FROM users usr
                  WHERE usr.designation_id = des.designation_id
                  AND usr.is_active = 1
                  AND usr.is_deleted = 0
                )
              )
            )
          `)
                    .from(designations_entity_1.Designations, 'des')
                    .where('des.parent_department = d.department_id')
                    .andWhere('des.is_deleted = false')
                    .andWhere('des.is_active = true');
            }, 'designations')
                .from(department_entity_1.Department, 'd')
                .leftJoin('users', 'u', 'u.user_id = d.department_head_id')
                .where('d.is_active = true')
                .andWhere('d.is_deleted = false')
                .andWhere(searchQuery ? 'd.department_name ILIKE :search' : 'TRUE', {
                search: `%${searchQuery}%`,
            })
                .orderBy('d.department_name', 'ASC')
                .getRawMany();
            if (!rawResult || rawResult.length === 0) {
                throw new common_1.BadRequestException('No departments found.');
            }
            const result = rawResult.map((r) => ({
                departmentId: r.department_id,
                departmentName: r.department_name,
                dept_description: r.dept_description,
                departmentHeadId: r.department_head_id,
                departmentHeadName: [
                    r.departmentHead_first_name,
                    r.departmentHead_last_name,
                ]
                    .filter(Boolean)
                    .join(' '),
                createdAt: r.created_at,
                updatedAt: r.updated_at,
                deleted: r.is_deleted,
                active: r.is_active,
                employeeCount: Number(r.employeeCount) || 0,
                designationCount: Array.isArray(r.designations)
                    ? r.designations.length
                    : 0,
                designations: r.designations || [],
            }));
            return {
                status: 'success',
                message: 'Departments retrieved successfully.',
                data: result,
                pagination: {
                    totalItems: result.length,
                },
            };
        }
        catch (error) {
            console.log(error);
            throw new common_1.BadRequestException(`Error fetching departments: ${error.message}`);
        }
    }
    async fetchOrganizationBranches1() {
        try {
            const result = await this.dataSource
                .getRepository(branches_entity_1.Branch)
                .createQueryBuilder('branches')
                .leftJoinAndSelect('branches.primaryUser', 'primaryUser')
                .orderBy('branches.branch_name', 'ASC')
                .getMany();
            console.log('BRANCHES ', result);
            return {
                status: 'success',
                message: 'Branches retrieved successfully.',
                data: result,
            };
        }
        catch (error) {
            console.log(error);
            throw new common_1.BadRequestException(`Error fetching Branches: ${error.message}`);
        }
    }
    async fetchOrganizationBranches() {
        try {
            const result = await this.dataSource
                .getRepository(branches_entity_1.Branch)
                .createQueryBuilder('branches')
                .where('branches.is_active = :active AND branches.is_deleted = :deleted', {
                active: true,
                deleted: false,
            })
                .orderBy('branches.branch_name', 'ASC')
                .getMany();
            return {
                status: 'success',
                message: 'Branches retrieved successfully.',
                data: result,
            };
        }
        catch (error) {
            console.error('Error in fetchOrganizationBranches', error);
            throw new common_1.BadRequestException(`Error fetching Branches: ${error.message}`);
        }
    }
    async fetchOrganizationUsers1(page, limit, searchQuery) {
        try {
            const queryBuilder = this.dataSource
                .getRepository(organizational_user_entity_1.User)
                .createQueryBuilder('users')
                .leftJoinAndSelect('users.user_role', 'user_role')
                .leftJoinAndSelect('users.user_designation', 'user_designation')
                .leftJoinAndSelect('users.user_department', 'user_department')
                .where('users.is_active = :isActive', { isActive: true })
                .andWhere('users.is_deleted = :isDeleted', { isDeleted: false });
            if (searchQuery && searchQuery.trim() !== '') {
                queryBuilder.andWhere(`(users.first_name ILIKE :search OR users.middle_name ILIKE :search OR users.last_name ILIKE :search)`, { search: `%${searchQuery}%` });
            }
            const [results, total] = await queryBuilder
                .orderBy('users.created_at', 'DESC')
                .skip((page - 1) * limit)
                .take(limit)
                .getManyAndCount();
            return {
                data: results,
                total,
                currentPage: page,
                totalPages: Math.ceil(total / limit),
            };
        }
        catch (error) {
            console.log(error);
            throw new common_1.BadRequestException(`Error fetching Users: ${error.message}`);
        }
    }
    getFilterableUserColumns() {
        return [
            {
                key: 'branch_id',
                label: 'Branch',
                type: 'select',
                mandatory: false,
            },
            {
                key: 'department_id',
                label: 'Department',
                type: 'select',
                mandatory: false,
            },
            {
                key: 'created_at',
                label: 'Created At',
                type: 'date-range',
                mandatory: false,
            },
        ];
    }
    async getDepartmentDropdown() {
        const departments = await this.departmentRepository.find({
            where: { active: true, deleted: false },
        });
        return departments.map((dept) => ({
            label: dept.departmentName,
            value: dept.departmentId,
        }));
    }
    async getBranchDropdown() {
        const branches = await this.branchRepository.find({
            where: { is_active: true, is_deleted: false },
        });
        return branches.map((branch) => ({
            label: branch.branch_name,
            value: branch.branch_id,
        }));
    }
    async exportUserCSV() {
        try {
            const whereCondition = { is_active: 1, is_deleted: 0 };
            const [results, total] = await this.userRepository
                .createQueryBuilder('user')
                .leftJoinAndSelect('user.user_branch', 'branch')
                .leftJoinAndSelect('user.user_department', 'department')
                .leftJoinAndSelect('user.user_designation', 'designation')
                .leftJoinAndSelect('user.added_by_user', 'added_by_user')
                .leftJoinAndSelect('user.user_role', 'role')
                .where(whereCondition)
                .orderBy('user.user_id', 'DESC')
                .getManyAndCount();
            const decodedResults = results.map((user) => ({
                ...user,
                department_name: user.user_department?.departmentName || 'N/A',
                designation_name: user.user_designation?.designation_name || 'N/A',
                role_name: user.user_role?.role_name || 'N/A',
            }));
            return {
                decodedResults: decodedResults,
            };
        }
        catch (error) {
            console.error('Error in exportUserCSV:', error);
            throw new Error('An error occurred while fetching users.');
        }
    }
    async fetchOrganizationDesignation(searchQuery = '') {
        try {
            const queryBuilder = this.dataSource
                .getRepository(designations_entity_1.Designations)
                .createQueryBuilder('designation')
                .leftJoin('users', 'user', 'user.designation_id = designation.designation_id AND user.is_deleted = false')
                .leftJoin('designation.parentDepartment', 'parentDepartment')
                .select([
                'designation.designation_id',
                'designation.designation_name',
                'designation.desg_description',
                'designation.is_active',
                'designation.is_deleted',
                'designation.created_at',
                'designation.updated_at',
                'designation.parent_department',
                'parentDepartment.department_name',
                'COUNT(user.user_id) AS user_count',
            ])
                .where('designation.is_active = :isActive', { isActive: true })
                .andWhere('designation.is_deleted = :isDeleted', { isDeleted: false })
                .groupBy('designation.designation_id, parentDepartment.department_name');
            if (searchQuery?.trim()) {
                queryBuilder.andWhere('designation.designation_name ILIKE :search', {
                    search: `%${searchQuery}%`,
                });
            }
            const { raw, entities } = await queryBuilder
                .orderBy('designation.designation_name', 'ASC')
                .getRawAndEntities();
            console.log('queryBuilder raw', raw);
            console.log('queryBuilder entities', entities);
            const response = entities.map((designation, index) => ({
                ...designation,
                user_count: Number(raw[index]?.user_count || 0),
                parent_department_name: raw[index]?.department_name || null,
                created_at: raw[index]?.created_at || null,
                updated_at: raw[index]?.updated_at || null,
            }));
            console.log('RES DESIGNATION', response);
            return {
                status: 'success',
                message: response.length > 0
                    ? 'Designation retrieved successfully.'
                    : 'No designations found.',
                data: response,
                total: response.length,
            };
        }
        catch (error) {
            console.log(error);
            throw new common_1.BadRequestException(`Error fetching designations: ${error.message}`);
        }
    }
    async generateUserTemplate1() {
        try {
            const branches = await this.fetchOrganizationBranches();
            const departments = await this.fetchOrganizationDeparments();
            console.log('branches', branches);
            const designations = await this.fetchOrganizationDesignation();
            const roles = await this.fetchOrganizationDesignation();
            const workbook = await XlsxPopulate.fromBlankAsync();
            const mainSheet = workbook.sheet(0);
            mainSheet.name('user_template');
            const dataSheet = workbook.addSheet('Data');
            const headers = [
                'First Name',
                'Middle Name',
                'Last Name',
                'Phone Number',
                'Street',
                'Landmark',
                'City',
                'State',
                'Postal/Zip Code',
                'Country',
                'Email Address',
                'Branch',
                'Department',
                'Designation',
                'Role',
            ];
            headers.forEach((header, index) => {
                mainSheet
                    .cell(1, index + 1)
                    .value(header)
                    .style({ bold: true });
            });
            const startRow = 2;
            const endRow = 100;
            const states = ['Maharashtra', 'Goa', 'Karnataka', 'Gujarat'];
            const countries = ['India'];
            states.forEach((state, i) => dataSheet.cell(i + 1, 1).value(state));
            countries.forEach((country, i) => dataSheet.cell(i + 1, 2).value(country));
            mainSheet.range(`H${startRow}:H${endRow}`).dataValidation({
                type: 'list',
                formula1: `=Data!$A$1:$A$${states.length}`,
                showInputMessage: true,
            });
            mainSheet.range(`J${startRow}:J${endRow}`).dataValidation({
                type: 'list',
                formula1: `=Data!$B$1:$B$${countries.length}`,
                showInputMessage: true,
            });
            mainSheet.range(`L${startRow}:L${endRow}`).dataValidation({
                type: 'list',
                formula1: `=Data!$C$1:$C$${branches.length}`,
                showInputMessage: true,
            });
            mainSheet.range(`M${startRow}:M${endRow}`).dataValidation({
                type: 'list',
                formula1: `=Data!$D$1:$D$${departments.length}`,
                showInputMessage: true,
            });
            mainSheet.range(`O${startRow}:O${endRow}`).dataValidation({
                type: 'list',
                formula1: `=Data!$E$1:$E$${roles.length}`,
                showInputMessage: true,
            });
            const buffer = await workbook.outputAsync();
            return buffer;
        }
        catch (error) {
            console.error('Error generating user template:', error);
            throw new Error('Failed to generate Excel user template');
        }
    }
    async createNewPrimaryBranchUser(dto, organization_Id) {
        const existingUser = await this.userRepository.findOne({
            where: { phone_number: dto.phone_number },
        });
        if (existingUser) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.CONFLICT,
                message: `Phone number '${dto.phone_number}' already exists in organization`,
            }, common_1.HttpStatus.CONFLICT);
        }
        const existingUserPublic = await this.billinguserRepo.findOne({
            where: { phone_number: dto.phone_number },
        });
        const OrganizationDataFetch = await this.registerOrganization.findOne({
            where: { organization_id: organization_Id },
        });
        console.log(OrganizationDataFetch.organization_name);
        if (existingUserPublic) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.CONFLICT,
                message: `Phone number '${dto.phone_number}' already exists in public schema`,
            }, common_1.HttpStatus.CONFLICT);
        }
        const newUserLogin = this.billinguserRepo.create({
            first_name: dto.first_name,
            last_name: dto.last_name,
            business_email: dto.users_business_email,
            phone_number: dto.phone_number,
            organization_id: organization_Id,
            password: null,
            is_primary_user: 'N',
            verified: false,
            organization: { organization_id: organization_Id },
        });
        const savedUserLogin = await this.billinguserRepo.save(newUserLogin);
        const newUser = this.userRepository.create({
            first_name: dto.first_name,
            middle_name: dto.middle_name || '',
            last_name: dto.last_name,
            users_business_email: dto.users_business_email,
            phone_number: dto.phone_number,
            role_id: dto.role_id,
            designation_id: dto.designation_id,
            department_id: dto.department_id,
            street: dto.street,
            landmark: dto.landmark,
            country: dto.country,
            city: dto.city,
            state: dto.state,
            zip: dto.zip,
            organization_id: organization_Id,
            register_user_login_id: savedUserLogin.user_id,
        });
        const savedUser = await this.userRepository.save(newUser);
        const invitationUrl = `${process.env.CLIENT_ORIGIN_URL}/authentication/passwordset/accept-invite?userId=${savedUserLogin.user_id}`;
        const fullname = dto.first_name + ' ' + dto.middle_name + ' ' + dto.last_name;
        const OrgName = OrganizationDataFetch.organization_name;
        await this.mailService.sendEmail(dto.users_business_email, "You're Invited to Join " + OrgName, await (0, render_email_1.renderEmail)(render_email_1.EmailTemplate.NEW_USER_INVITATION, {
            name: fullname,
            inviter: dto.first_name + ' ' + dto.last_name,
            companyName: OrgName,
            companyLogo: null,
            mailReply: 'support@norbik.in',
            inviteUrl: invitationUrl,
        }, this.mailConfigService));
        return savedUser.user_id;
    }
    async exportVendorCSV() {
        try {
            const vendors = await this.vendorRepository.find({
                where: { is_active: 1, is_deleted: 0 },
                relations: ['added_by_user'],
            });
            return vendors.map((vendor) => {
                const fullName = vendor.added_by_user?.first_name && vendor.added_by_user?.last_name
                    ? `${vendor.added_by_user.first_name} ${vendor.added_by_user.last_name}`
                    : 'N/A';
                console.log('fullName', fullName);
                return {
                    'Vendor Name': vendor.vendor_name,
                    'GST No.': vendor.vendor_gst_no,
                    Street: vendor.vendor_street,
                    Landmark: vendor.vendor_landmark,
                    City: vendor.vendor_city,
                    State: vendor.vendor_state,
                    Country: vendor.vendor_country,
                    Pincode: vendor.vendor_pincode,
                    'Contact Number': vendor.vendor_contact_number,
                    Email: vendor.vendor_email,
                    'Primary Contact Person': vendor.vendor_primary_contact,
                    'Alternative Contact': vendor.vendor_alternative_contact_number || '',
                    'Created By': fullName,
                    'Created At': vendor.created_at
                        ? new Date(vendor.created_at).toLocaleDateString()
                        : '',
                    'Updated At': vendor.updated_at
                        ? new Date(vendor.updated_at).toLocaleDateString()
                        : '',
                };
            });
        }
        catch (error) {
            console.error('Error exporting vendor CSV data:', error);
            throw new Error('An error occurred while exporting vendor data.');
        }
    }
    async sendUserInvitationMail(email, organization_name, fullname, invitationUrl) {
        const transporter = nodemailer.createTransport({
            host: 'smtp.office365.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
        });
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Your Organization's Invitation to Join the SP-IT Assets",
            html: `
        <p>Dear ${fullname},</p>
        <p>${organization_name} has given you access to the SP IT Solutions LLP account with XXXX.</p>
        <p>To accept the invite, please click on the link below:</p>
        <a href="${invitationUrl}" style="color: white; background-color: #007BFF; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Accept Invitation</a>
        <p>Thanks for trusting brand XXXX!</p>
        <p>SP-IT HRMS Support Team</p>
        <p><i>This is a system generated mail, do not reply to this mail. If you have any query, please write to support@spitsolutions.com</i></p>
  `,
        };
        await transporter.sendMail(mailOptions);
    }
    async fetchAllBranchusers(branch_id, department_id) {
        try {
            let query = this.dataSource
                .getRepository(organizational_user_entity_1.User)
                .createQueryBuilder('users')
                .where('users.is_active = true')
                .andWhere('users.is_deleted = false');
            if (branch_id) {
                query = query.andWhere('users.branch_id = :branch_id', { branch_id });
            }
            if (department_id) {
                query = query.andWhere('users.department_id = :department_id', {
                    department_id,
                });
            }
            const result = await query.orderBy('users.first_name', 'ASC').getMany();
            if (!result || result.length === 0) {
                return { message: 'No users found.', data: [] };
            }
            return { message: 'Users fetched successfully', data: result };
        }
        catch (error) {
            console.error('Error fetching users:', error);
            throw new common_1.BadRequestException(`Error fetching Users: ${error.message}`);
        }
    }
    async fetchAllUsers(branch_id, department_id) {
        try {
            let query = this.dataSource
                .getRepository(organizational_user_entity_1.User)
                .createQueryBuilder('users')
                .leftJoinAndSelect('users.user_role', 'user_role')
                .leftJoinAndSelect('users.user_designation', 'user_designation')
                .leftJoinAndSelect('users.user_department', 'user_department')
                .where('users.is_active = true')
                .andWhere('users.is_deleted = false');
            if (branch_id) {
                query = query.andWhere('users.branch_id = :branch_id', { branch_id });
            }
            if (department_id) {
                query = query.andWhere('users.department_id = :department_id', {
                    department_id,
                });
            }
            const result = await query.orderBy('users.first_name', 'ASC').getMany();
            if (!result || result.length === 0) {
                return { message: 'No users found.', data: [] };
            }
            const cleanedData = result.map((user) => ({
                ...user,
                user_role: user.user_role
                    ? {
                        role_id: user.user_role.role_id,
                        role_name: user.user_role.role_name,
                    }
                    : null,
                user_designation: user.user_designation
                    ? {
                        designation_id: user.user_designation.designation_id,
                        designation_name: user.user_designation.designation_name,
                    }
                    : null,
                user_department: user.user_department
                    ? {
                        departmentId: user.user_department.departmentId,
                        departmentName: user.user_department.departmentName,
                    }
                    : null,
            }));
            return {
                message: 'Users fetched successfully',
                data: cleanedData,
            };
        }
        catch (error) {
            console.error('Error fetching users:', error);
            throw new common_1.BadRequestException(`Error fetching Users: ${error.message}`);
        }
    }
    getFilterableVendorColumns() {
        return [
            {
                key: 'vendor_type',
                label: 'Vendor Type',
                type: 'select',
                mandatory: false,
            },
            {
                key: 'vendor_category',
                label: 'Category',
                type: 'select',
                mandatory: false,
            },
            {
                key: 'country',
                label: 'Country',
                type: 'select',
                mandatory: false,
            },
            {
                key: 'created_at',
                label: 'Created At',
                type: 'date-range',
                mandatory: false,
            },
            {
                key: 'is_active',
                label: 'Active Status',
                type: 'boolean',
                mandatory: false,
            },
            {
                key: 'payment_terms',
                label: 'Payment Terms',
                type: 'select',
                mandatory: false,
            },
        ];
    }
    async getAllorganizationVenders() {
        try {
            let whereCondition = { is_active: 1, is_deleted: 0 };
            const [results, total] = await this.vendorRepository
                .createQueryBuilder('vendors')
                .where(whereCondition)
                .orderBy('vendors.vendor_name', 'ASC')
                .getManyAndCount();
            return {
                data: results,
                total,
            };
        }
        catch (error) {
            console.log(error);
            throw new common_1.BadRequestException(`Error fetching vendors: ${error.message}`);
        }
    }
    async fetchSingleVendorsData(vendor_id) {
        if (!vendor_id) {
            throw new common_1.BadRequestException('Vendor ID is required');
        }
        try {
            const vendorsData = await this.vendorRepository
                .createQueryBuilder('vendors')
                .select('vendors')
                .where('vendors.vendor_id = :vendor_id', { vendor_id })
                .andWhere('vendors.is_active = :is_active', { is_active: 1 })
                .andWhere('vendors.is_deleted = :is_deleted', { is_deleted: 0 })
                .getOne();
            console.log('vendorsData', vendorsData);
            if (!vendorsData) {
                return {
                    status: 404,
                    message: `Vendor with ID ${vendor_id} not found or inactive`,
                    data: null,
                };
            }
            return {
                status: 200,
                message: 'Vendor fetched successfully',
                data: vendorsData,
            };
        }
        catch (error) {
            return {
                status: 500,
                message: 'An error occurred while fetching the Vendor',
                error: error.message,
            };
        }
    }
    async deleteUserManagementData(userIds) {
        if (!Array.isArray(userIds) || userIds.length === 0) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.BAD_REQUEST,
                message: 'No user IDs provided',
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        const deletedUsers = [];
        const failedUsers = [];
        for (const user_id of userIds) {
            try {
                const existingUser = await this.userRepository.findOne({
                    where: { user_id },
                });
                if (!existingUser) {
                    failedUsers.push({
                        user_id,
                        message: `User with ID ${user_id} not found`,
                    });
                    continue;
                }
                existingUser.is_active = 0;
                existingUser.is_deleted = 1;
                await this.userRepository.save(existingUser);
                const existingUserLogin = await this.dataSource
                    .getRepository(register_user_login_entity_1.RegisterUserLogin)
                    .findOne({
                    where: { user_id: existingUser.register_user_login_id },
                });
                if (existingUserLogin) {
                    existingUserLogin.is_active = 0;
                    existingUserLogin.is_deleted = 1;
                    await this.dataSource
                        .getRepository(register_user_login_entity_1.RegisterUserLogin)
                        .save(existingUserLogin);
                }
                deletedUsers.push({
                    user_id,
                    message: `User with ID ${user_id} has been deactivated and deleted`,
                });
            }
            catch (error) {
                failedUsers.push({
                    user_id,
                    message: `Error deleting user ID ${user_id}`,
                });
            }
        }
        return {
            status: common_1.HttpStatus.OK,
            message: 'Bulk user delete operation completed.',
            data: {
                deleted: deletedUsers,
                failed: failedUsers,
            },
        };
    }
    async deleteVendorData(deleteVendorDto) {
        console.log('deleteVendorDto', deleteVendorDto);
        const { vendor_ids } = deleteVendorDto;
        console.log('vendor_ids', vendor_ids);
        if (!Array.isArray(vendor_ids) || vendor_ids.length === 0) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.BAD_REQUEST,
                message: 'No vendor IDs provided',
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        const deletedVendors = [];
        const failedVendors = [];
        for (const id of vendor_ids) {
            try {
                const existingVendor = await this.vendorRepository.findOne({
                    where: { vendor_id: id },
                });
                if (!existingVendor) {
                    failedVendors.push({
                        vendor_ids: id,
                        message: `Vendor with ID ${id} not found`,
                    });
                    continue;
                }
                existingVendor.is_active = 0;
                existingVendor.is_deleted = 1;
                await this.vendorRepository.save(existingVendor);
                deletedVendors.push({
                    vendor_id: id,
                    message: `Vendor with ID ${id} has been deactivated and deleted`,
                });
            }
            catch (error) {
                failedVendors.push({
                    vendor_id: id,
                    message: `Error deleting vendor ID ${id}`,
                });
            }
        }
        console.log('deletedVendors', deletedVendors);
        console.log('failedVendors', failedVendors);
        return {
            status: common_1.HttpStatus.OK,
            message: 'Bulk vendor delete operation completed.',
            data: {
                deleted: deletedVendors,
                failed: failedVendors,
            },
        };
    }
    async getUserByPublicID(public_user_id) {
        const userExists = await this.dataSource
            .getRepository(organizational_user_entity_1.User)
            .findOne({ where: { register_user_login_id: public_user_id } });
        console.log('public user id in asset', public_user_id);
        if (!userExists) {
            throw new common_1.HttpException({ status: common_1.HttpStatus.BAD_REQUEST, message: 'Invalid user ID' }, common_1.HttpStatus.BAD_REQUEST);
        }
        else {
            return userExists.user_id;
        }
    }
    async fetchDepartments1(page, limit, searchQuery) {
        try {
            const queryBuilder = this.dataSource
                .getRepository(department_entity_1.Department)
                .createQueryBuilder('department')
                .where('department.active = :isActive', { isActive: true })
                .andWhere('department.deleted = :isDeleted', { isDeleted: false });
            if (searchQuery && searchQuery.trim() !== '') {
                queryBuilder.andWhere('department.department_name ILIKE :search', {
                    search: `%${searchQuery}%`,
                });
            }
            const [result, total] = await queryBuilder
                .orderBy('department.department_name', 'ASC')
                .skip((page - 1) * limit)
                .take(limit)
                .getManyAndCount();
            if (!result || result.length === 0) {
                throw new common_1.BadRequestException('No departments found with the specified criteria.');
            }
            return {
                status: 'success',
                message: 'Departments retrieved successfully.',
                data: result,
                total,
                currentPage: Number(page),
                totalPages: Math.ceil(total / limit),
            };
        }
        catch (error) {
            console.log(error);
            throw new common_1.BadRequestException(`Error fetching departments: ${error.message}`);
        }
    }
    async fetchOrganizationRoles() {
        const roles = await this.roleRepository.find({
            where: {
                is_active: true,
                is_deleted: false,
            },
            select: ['role_id', 'role_name'],
            order: { role_name: 'ASC' },
        });
        return {
            status: 'success',
            message: 'Roles retrieved successfully.',
            data: roles,
        };
    }
    async createDepartments(createDepartmentsDto) {
        const { departmentIds, newDepartmentNames = [], existingDepartmentNames = [], } = createDepartmentsDto;
        const trimmedNewNames = newDepartmentNames.map((name) => name.trim());
        const trimmedExistingNames = existingDepartmentNames.map((name) => name.trim());
        const departmentNamesToProcess = [
            ...trimmedExistingNames,
            ...trimmedNewNames,
        ];
        if (departmentNamesToProcess.length === 0) {
            return { success: false, message: 'No departments provided' };
        }
        try {
            const departmentRepository = this.dataSource.getRepository(department_entity_1.Department);
            const allDepartments = await departmentRepository.find();
            const existingNamesInDb = allDepartments.map((dept) => dept.departmentName.trim().toLowerCase());
            const seen = new Set();
            const newDepartmentsToSave = departmentNamesToProcess
                .filter((name) => {
                const lowerTrimmed = name.trim().toLowerCase();
                const isDuplicate = existingNamesInDb.includes(lowerTrimmed) || seen.has(lowerTrimmed);
                if (!isDuplicate)
                    seen.add(lowerTrimmed);
                return !isDuplicate;
            })
                .map((name) => ({ departmentName: name.trim() }));
            if (newDepartmentsToSave.length > 0) {
                const savedDepartments = await departmentRepository.save(newDepartmentsToSave);
                return {
                    success: true,
                    message: 'New departments added',
                    data: savedDepartments,
                };
            }
            else {
                return { success: false, message: 'All departments already exist' };
            }
        }
        catch (error) {
            console.error('Error saving departments:', error);
            throw new common_1.BadRequestException('Error saving departments.');
        }
    }
    async editDepartment(id, dto) {
        const repo = this.dataSource.getRepository(department_entity_1.Department);
        const existing = await repo.findOne({
            where: { departmentId: id, deleted: false },
            relations: ['departmentHead'],
        });
        if (!existing) {
            throw new common_1.NotFoundException(`Department with ID ${id} not found`);
        }
        if (dto.departmentName)
            existing.departmentName = dto.departmentName.trim();
        if (dto.dept_description)
            existing.dept_description = dto.dept_description.trim();
        if (dto.departmentHeadId) {
            const userRepo = this.dataSource.getRepository(organizational_user_entity_1.User);
            const head = await userRepo.findOne({
                where: { user_id: dto.departmentHeadId },
            });
            if (!head)
                throw new common_1.BadRequestException('Invalid department head ID');
            existing.departmentHead = head;
        }
        if (dto.active !== undefined)
            existing.active = dto.active;
        if (dto.deleted !== undefined)
            existing.deleted = dto.deleted;
        existing.updatedAt = new Date();
        const saved = await repo.save(existing);
        return {
            success: true,
            message: 'Department updated successfully',
            data: saved,
        };
    }
    async fetchDepartmentconfig(page, limit, searchQuery) {
        try {
            const queryBuilder = this.dataSource
                .getRepository(department_config_entity_1.DepartmentConifg)
                .createQueryBuilder('departmentconfig')
                .where('departmentconfig.is_active = :isActive', { isActive: true })
                .andWhere('departmentconfig.is_deleted = :isDeleted', {
                isDeleted: false,
            });
            if (searchQuery && searchQuery.trim() !== '') {
                queryBuilder.andWhere('departmentconfig.department_name ILIKE :search', { search: `%${searchQuery}%` });
            }
            const [result, total] = await queryBuilder
                .orderBy('departmentconfig.department_name', 'ASC')
                .skip((page - 1) * limit)
                .take(limit)
                .getManyAndCount();
            if (!result || result.length === 0) {
                throw new common_1.BadRequestException('No departments found with the specified criteria.');
            }
            return {
                status: 'success',
                message: 'Departments retrieved successfully.',
                data: result,
                total,
                currentPage: Number(page),
                totalPages: Math.ceil(total / limit),
            };
        }
        catch (error) {
            console.log(error);
            throw new common_1.BadRequestException(`Error fetching departments: ${error.message}`);
        }
    }
    async fetchDepartments(page, limit, searchQuery) {
        try {
            const queryBuilder = this.dataSource
                .getRepository(department_entity_1.Department)
                .createQueryBuilder('department')
                .where('department.active = :isActive', { isActive: true })
                .andWhere('department.deleted = :isDeleted', { isDeleted: false });
            if (searchQuery && searchQuery.trim() !== '') {
                queryBuilder.andWhere('department.department_name ILIKE :search', {
                    search: `%${searchQuery}%`,
                });
            }
            const [result, total] = await queryBuilder
                .orderBy('department.created_at', 'DESC')
                .skip((page - 1) * limit)
                .take(limit)
                .getManyAndCount();
            return {
                status: 'success',
                message: result.length
                    ? 'Departments retrieved successfully.'
                    : 'No departments found.',
                data: result,
                total,
                currentPage: Number(page),
                totalPages: Math.ceil(total / limit),
            };
        }
        catch (error) {
            console.log(error);
            throw new common_1.BadRequestException(`Error fetching departments: ${error.message}`);
        }
    }
    async generateUserTemplate() {
        try {
            const branchResponse = await this.fetchOrganizationBranches();
            const branches = branchResponse.data;
            console.log('branches', branches);
            const departmentResponse = await this.fetchOrganizationDeparments();
            const departments = departmentResponse.data;
            console.log('departments', departments);
            const designationResponse = await this.fetchOrganizationDesignation();
            const designations = designationResponse.data;
            console.log('designations', designations);
            const rolesResponse = await this.fetchOrganizationRoles();
            const roles = rolesResponse.data;
            console.log('roles', roles);
            const workbook = await XlsxPopulate.fromBlankAsync();
            const mainSheet = workbook.sheet(0);
            mainSheet.name('user_template');
            const dataSheet = workbook.addSheet('Data');
            const instructions = [
                'Instructions:',
                '1. Fill in the required field (First Name) starting from row 7.',
                '2. Dropdown fields: State, Country, Branch, Department, Designation, Role.',
                '3. Do not edit the header row (Row 6).',
                '4. Phone Number, if provided, must be 10 digits starting with 9.',
                '5. Postal/Zip Code, if provided, must be a 6-digit number.',
            ];
            instructions.forEach((text, index) => {
                mainSheet
                    .cell(index + 1, 1)
                    .value(text)
                    .style({
                    bold: true,
                    fontColor: '0000FF',
                });
            });
            const columnWidths = [
                20,
                20,
                20,
                20,
                20,
                20,
                20,
                20,
                20,
                20,
                30,
                20,
                20,
                20,
                20,
            ];
            columnWidths.forEach((width, index) => {
                mainSheet.column(index + 1).width(width);
            });
            const headers = [
                { label: 'First Name', required: true },
                { label: 'Middle Name', required: false },
                { label: 'Last Name', required: false },
                { label: 'Phone Number', required: false },
                { label: 'Street', required: false },
                { label: 'Landmark', required: false },
                { label: 'City', required: false },
                { label: 'State', required: false },
                { label: 'Postal/Zip Code', required: false },
                { label: 'Country', required: false },
                { label: 'Email Address', required: false },
                { label: 'Branch', required: false },
                { label: 'Department', required: false },
                { label: 'Designation', required: false },
                { label: 'Role', required: false },
            ];
            headers.forEach((item, index) => {
                const cell = mainSheet.cell(6, index + 1);
                const label = item.required ? `${item.label} *` : item.label;
                cell.value(label).style({
                    bold: true,
                    fontColor: item.required ? 'FF0000' : '000000',
                });
            });
            branches.forEach((branch, i) => {
                dataSheet.cell(i + 1, 3).value(branch.branch_name?.trim());
            });
            departments.forEach((department, i) => {
                dataSheet.cell(i + 1, 4).value(department.departmentName?.trim());
            });
            designations.forEach((designation, i) => {
                dataSheet.cell(i + 1, 5).value(designation.designation_name?.trim());
            });
            roles.forEach((role, i) => {
                dataSheet.cell(i + 1, 6).value(role.role_name?.trim());
            });
            const startRow = 7;
            const maxExcelRows = 1048576;
            const stateList = ['Maharashtra', 'Goa', 'Karnataka', 'Gujarat'];
            const countryList = ['India'];
            const quotedStateList = `"${stateList.join(',')}"`;
            const quotedCountryList = `"${countryList.join(',')}"`;
            mainSheet.range(`H${startRow}:H${maxExcelRows}`).dataValidation({
                type: 'list',
                formula1: quotedStateList,
                allowBlank: true,
                showInputMessage: true,
                promptTitle: 'Select State',
                prompt: 'Choose one from the dropdown',
                errorTitle: 'Invalid State',
                error: 'Please select a valid state from the list.',
            });
            mainSheet.range(`J${startRow}:J${maxExcelRows}`).dataValidation({
                type: 'list',
                formula1: quotedCountryList,
                allowBlank: true,
                showInputMessage: true,
                promptTitle: 'Select Country',
                prompt: 'Choose one from the dropdown',
                errorTitle: 'Invalid Country',
                error: 'Please select a valid country from the list.',
            });
            mainSheet.range(`L${startRow}:L${maxExcelRows}`).dataValidation({
                type: 'list',
                formula1: `=Data!$C$1:$C$${branches.length}`,
                showInputMessage: true,
                allowBlank: true,
            });
            mainSheet.range(`M${startRow}:M${maxExcelRows}`).dataValidation({
                type: 'list',
                formula1: `=Data!$D$1:$D$${departments.length}`,
                showInputMessage: true,
                allowBlank: true,
            });
            mainSheet.range(`N${startRow}:N${maxExcelRows}`).dataValidation({
                type: 'list',
                formula1: `=Data!$E$1:$E$${designations.length}`,
                showInputMessage: true,
                allowBlank: true,
            });
            mainSheet.range(`O${startRow}:O${maxExcelRows}`).dataValidation({
                type: 'list',
                formula1: `=Data!$F$1:$F$${roles.length}`,
                showInputMessage: true,
                allowBlank: true,
            });
            mainSheet.range(`A${startRow}:A${maxExcelRows}`).dataValidation({
                type: 'textLength',
                operator: 'greaterThan',
                formula1: '0',
                allowBlank: false,
                showInputMessage: true,
                promptTitle: 'First Name',
                prompt: 'Required. Only letters allowed.',
                errorTitle: 'Invalid Input',
                error: 'First name is required and must be text.',
            });
            mainSheet.range(`B${startRow}:B${maxExcelRows}`).dataValidation({
                type: 'custom',
                formula1: `=OR(ISBLANK(B7),ISTEXT(B7))`,
                showInputMessage: true,
                promptTitle: 'Middle Name',
                prompt: 'Optional. Only letters allowed.',
                errorTitle: 'Invalid Input',
                error: 'Middle name must be text.',
            });
            mainSheet.range(`C${startRow}:C${maxExcelRows}`).dataValidation({
                type: 'custom',
                formula1: `=OR(ISBLANK(C7),ISTEXT(C7))`,
                showInputMessage: true,
                promptTitle: 'Last Name',
                prompt: 'Optional. Only letters allowed.',
                errorTitle: 'Invalid Input',
                error: 'Last name must be text.',
            });
            mainSheet.range(`D${startRow}:D${maxExcelRows}`).dataValidation({
                type: 'custom',
                formula1: `=OR(ISBLANK(D7),AND(ISNUMBER(D7),LEN(D7)=10,LEFT(D7,1)="9"))`,
                allowBlank: true,
                showInputMessage: true,
                promptTitle: 'Phone Number',
                prompt: 'Optional. Must be 10 digits and start with 9 if provided.',
                errorTitle: 'Invalid Phone Number',
                error: 'Phone number must be 10 digits and start with 9.',
            });
            mainSheet.range(`I${startRow}:I${maxExcelRows}`).dataValidation({
                type: 'whole',
                operator: 'between',
                formula1: '100000',
                formula2: '999999',
                allowBlank: true,
                showInputMessage: true,
                promptTitle: 'Zip Code',
                prompt: 'Optional. Must be a 6-digit number if provided.',
                errorTitle: 'Invalid Zip Code',
                error: 'Zip code must be a 6-digit number.',
            });
            mainSheet.range(`K${startRow}:K${maxExcelRows}`).dataValidation({
                type: 'custom',
                formula1: `=OR(ISBLANK(K7),AND(LEN(K7)>5,ISNUMBER(FIND("@",K7)),ISNUMBER(FIND(".",K7))))`,
                allowBlank: true,
                showInputMessage: true,
                promptTitle: 'Email Address',
                prompt: 'Optional. Must be a valid email (e.g., user@example.com) if provided.',
                errorTitle: 'Invalid Email',
                error: 'Email must be valid and include @ and .',
            });
            dataSheet.hidden(true);
            const buffer = await workbook.outputAsync();
            return buffer;
        }
        catch (error) {
            console.error('Error generating user template:', error);
            throw new Error('Failed to generate Excel user template');
        }
    }
    async findByPincode(pincode) {
        const record = await this.pincodesRepository.findOne({
            where: { pincode },
        });
        if (!record) {
            return { success: false, message: 'Pincode not found' };
        }
        return {
            success: true,
            city: record.city,
            state: record.state,
            latitude: record.latitude,
            longitude: record.longitude,
        };
    }
    async createBranch1(createBranchInfo) {
        console.log('createBranchInfo', createBranchInfo);
        const existingBranch = await this.branchRepository.findOne({
            where: {
                branch_name: createBranchInfo.branch_name?.trim(),
            },
        });
        if (existingBranch) {
            throw new common_1.ConflictException(`Branch name '${createBranchInfo.branch_name}' already exists.`);
        }
        const createBranchInfo2 = {
            branch_name: createBranchInfo.branch_name,
            gstNo: createBranchInfo.gstNo,
            city: createBranchInfo.city,
            country: createBranchInfo.country,
            state: createBranchInfo.state,
            pincode: createBranchInfo.pincode
                ? Number(createBranchInfo.pincode)
                : null,
            branch_street: createBranchInfo.branch_street,
            branch_landmark: createBranchInfo.branch_landmark,
            established_date: createBranchInfo.established_date,
            contact_number: createBranchInfo.contact_number,
            alternative_contact_number: createBranchInfo.alternative_contact_number,
            branch_email: createBranchInfo.branch_email,
            city_id: createBranchInfo.city_id || null,
            country_id: createBranchInfo.country_id || null,
            location_id: createBranchInfo.location_id || null,
            is_active: createBranchInfo.is_active ?? true,
            is_deleted: createBranchInfo.is_deleted ?? false,
        };
        if (createBranchInfo.primary_user_id !== undefined &&
            createBranchInfo.primary_user_id !== null) {
            createBranchInfo2.primary_user_id = createBranchInfo.primary_user_id;
        }
        const branchSave = this.branchRepository.create(createBranchInfo2);
        const savedBranch = await this.branchRepository.save(branchSave);
        return savedBranch;
    }
    getLogoAsBase64(logoPath) {
        try {
            const relativePath = logoPath.replace('/uploads', 'uploads');
            const filePath = (0, path_1.join)(process.cwd(), relativePath);
            if (!(0, fs_1.existsSync)(filePath))
                return null;
            const fileBuffer = (0, fs_1.readFileSync)(filePath);
            const ext = filePath.split('.').pop()?.toLowerCase();
            const mime = ext === 'jpg' ? 'jpeg' : ext;
            return `data:image/${mime};base64,${fileBuffer.toString('base64')}`;
        }
        catch (err) {
            console.error('Failed to convert logo to base64:', err);
            return null;
        }
    }
    async fetchOrganizationalProfile() {
        console.log('abc');
        try {
            const result = await this.dataSource
                .getRepository(organizational_profile_entity_1.OrganizationalProfile)
                .createQueryBuilder('organization')
                .leftJoin('organization.users', 'user')
                .leftJoin('user.user_designation', 'designation')
                .leftJoin('organization.industry_type', 'industry_type')
                .where('user.organization_id = organization.tenant_org_id')
                .andWhere('user.is_primary_user = :isPrimary', { isPrimary: 'Y' })
                .getRawOne();
            console.log('RAW result', result);
            if (!result) {
                throw new common_1.BadRequestException('No organizational profiles found with the specified criteria.');
            }
            const logoPath = result.logo ?? result.org_profile_image_address ?? null;
            console.log('logoPath', logoPath);
            const logoPreviewBase64 = logoPath
                ? this.getLogoAsBase64(logoPath)
                : null;
            const primaryUser = result.users?.[0];
            const data = {
                organization_profile_id: result.organization_profile_id,
                user_id: primaryUser?.user_id ?? null,
                industry_type_id: result.industry_type_id ?? null,
                department_id: primaryUser?.department_id ?? null,
                designation_id: primaryUser?.designation_id ?? null,
                role_id: primaryUser?.role_id ?? null,
                organization_id: primaryUser?.organization_id ?? null,
                organizationName: result.org_name ?? null,
                contactNumber: result.mobile_number ?? primaryUser?.phone_number ?? null,
                email: result.email ?? primaryUser?.users_business_email ?? null,
                hqAddress: result.organization_address ?? null,
                hqAddressFields: {
                    street: result.street ?? null,
                    city: result.city ?? null,
                    state: result.state ?? null,
                    postalCode: result.pincode ?? null,
                    landmark: result.landmark ?? null,
                    country: result.country ?? null,
                },
                industryType: result.industry_type?.industryName ?? null,
                establishedDate: result.established_date
                    ? new Date(result.established_date).toISOString().split('T')[0]
                    : null,
                website: result.website_url ?? null,
                financialYear: result.financial_year ?? null,
                baseCurrency: result.base_currency ?? null,
                dateFormat: result.dateformat ?? null,
                timeZone: result.time_zone ?? null,
                gstNumber: result.gst_no ?? null,
                primaryContactName: `${primaryUser?.first_name ?? ''} ${primaryUser?.last_name ?? ''}`.trim() ||
                    null,
                primaryContactEmail: primaryUser?.users_business_email ?? null,
                primaryContactPhone: primaryUser?.phone_number ?? null,
                primaryContactRole: primaryUser?.user_designation?.designation_name ?? null,
                billingContactName: result.billingContactName ?? null,
                billingContactEmail: result.billingContactEmail ?? null,
                billingContactPhone: result.billingContactPhone ?? null,
                themeMode: result.themeMode ?? null,
                customThemeColor: result.customThemeColor ?? null,
                logo: result.logo ?? result.org_profile_image_address ?? null,
                logoPreviewBase64: logoPreviewBase64,
            };
            return {
                status: 'success',
                message: 'Organizational profiles retrieved successfully.',
                data: data,
            };
        }
        catch (error) {
            if (error instanceof common_1.BadRequestException) {
                throw error;
            }
            console.error('Error fetching organizational profiles:', error?.message, error?.stack);
            throw new common_1.InternalServerErrorException('An error occurred while fetching organizational profiles.');
        }
    }
    async getBranchById(branch_id) {
        if (!branch_id) {
            throw new Error('Branch ID is required');
        }
        const branch = await this.branchRepository.findOne({
            where: { branch_id },
        });
        if (!branch) {
            throw new Error(`Branch with ID ${branch_id} not found`);
        }
        return {
            branch_id: branch.branch_id,
            branch_name: branch.branch_name,
            contact_number: branch.contact_number,
            alternative_contact_number: branch.alternative_contact_number,
            gstNo: branch.gstNo,
            established_date: branch.established_date,
            branch_email: branch.branch_email,
            address: {
                branch_street: branch.branch_street,
                branch_landmark: branch.branch_landmark,
                city: branch.city,
                state: branch.state,
                pincode: branch.pincode,
                country: branch.country,
            },
            primary_user_id: branch.primary_user_id ?? null,
            createdAt: branch.createdAt,
            updatedAt: branch.updatedAt,
        };
    }
    async updateBranch(updateBranchInfo) {
        const branch_id = updateBranchInfo.branch_id;
        if (!branch_id) {
            throw new Error('Branch ID is required for update');
        }
        const updateBranchInfo2 = {
            branch_name: updateBranchInfo.branch_name,
            city: updateBranchInfo.city,
            pincode: updateBranchInfo.pincode
                ? Number(updateBranchInfo.pincode)
                : undefined,
            branch_street: updateBranchInfo.branch_street,
            country: updateBranchInfo.country,
            gstNo: updateBranchInfo.gstNo,
            established_date: updateBranchInfo.established_date,
            branch_landmark: updateBranchInfo.branch_landmark,
            contact_number: updateBranchInfo.contact_number,
            branch_email: updateBranchInfo.branch_email,
            state: updateBranchInfo.state,
            alternative_contact_number: updateBranchInfo.alternative_contact_number,
            city_id: updateBranchInfo.city_id,
            country_id: updateBranchInfo.country_id,
            location_id: updateBranchInfo.location_id,
            is_active: updateBranchInfo.is_active,
            is_deleted: updateBranchInfo.is_deleted,
            created_by: updateBranchInfo.created_by,
        };
        if (updateBranchInfo.primary_user_id !== undefined &&
            updateBranchInfo.primary_user_id !== null) {
            updateBranchInfo2.primary_user_id = updateBranchInfo.primary_user_id;
        }
        const cleanedUpdateData = Object.fromEntries(Object.entries(updateBranchInfo2).filter(([_, v]) => v !== undefined));
        await this.branchRepository.update({ branch_id }, cleanedUpdateData);
        const updatedBranch = await this.branchRepository.findOne({
            where: { branch_id },
        });
        return updatedBranch;
    }
    async deleteBranchById(payload) {
        const branch_id = payload.branch_id;
        if (!branch_id) {
            return {
                success: false,
                message: 'Branch ID is missing in payload.',
            };
        }
        const branchRepo = this.dataSource.getRepository(branches_entity_1.Branch);
        const branch = await branchRepo.findOneBy({ branch_id });
        if (!branch) {
            return {
                success: false,
                message: `Branch with ID ${branch_id} not found.`,
            };
        }
        branch.is_deleted = true;
        branch.is_active = false;
        branch.updatedAt = new Date();
        await branchRepo.save(branch);
        return {
            success: true,
            message: `Branch with ID ${branch_id} deleted (soft delete).`,
        };
    }
    async fetchOrganizationVendors() {
        try {
            const result = await this.vendorRepository
                .createQueryBuilder('vendors')
                .select([
                'vendors.vendor_id',
                'vendors.vendor_name',
                'vendors.vendor_primary_contact',
                'vendors.vendor_email',
                'vendors.vendor_contact_number',
                'vendors.vendor_gst_no',
                'vendors.is_deleted',
                'vendors.is_active',
            ])
                .where('vendors.is_active = :active', { active: 1 })
                .andWhere('vendors.is_deleted = :deleted', { deleted: 0 })
                .orderBy('vendors.vendor_name', 'ASC')
                .getRawMany();
            return {
                status: 'success',
                message: result.length > 0
                    ? 'Vendors retrieved successfully.'
                    : 'No organizational vendors found.',
                data: result,
            };
        }
        catch (error) {
            console.log(error);
            throw new common_1.BadRequestException(`Error fetching vendors: ${error.message}`);
        }
    }
    async fetchOrganizationVendors1(payload) {
        try {
            const { gststatus, status, page = 1, limit = 10, search, sortField = 'vendor_name', sortOrder = 'ASC', } = payload;
            const query = this.vendorRepository
                .createQueryBuilder('vendors')
                .select([
                'vendors.vendor_id',
                'vendors.vendor_name',
                'vendors.vendor_primary_contact',
                'vendors.vendor_email',
                'vendors.vendor_contact_number',
                'vendors.vendor_gst_no',
                'vendors.is_deleted',
                'vendors.is_active',
                'vendors.vendor_gst_status',
            ])
                .where('vendors.is_deleted = :deleted', { deleted: 0 });
            if (status && status !== 'All') {
                const isActive = status === 'Active' ? 1 : 0;
                query.andWhere('vendors.is_active = :isActive', { isActive });
            }
            if (gststatus && gststatus !== 'All') {
                query.andWhere('vendors.vendor_gst_status = :gststatus', { gststatus });
            }
            if (search && search.trim() !== '') {
                query.andWhere(`(
            vendors.vendor_name LIKE :search OR 
            vendors.vendor_email LIKE :search OR 
            vendors.vendor_contact_number LIKE :search OR 
            vendors.vendor_gst_no LIKE :search OR
            vendors.vendor_gst_status LIKE :search OR
            vendors.vendor_primary_contact LIKE :search
          )`, { search: `%${search}%` });
            }
            query.orderBy(`vendors.${sortField}`, sortOrder.toUpperCase() === 'DESC' ? 'DESC' : 'ASC');
            const [data, total] = await query
                .skip((page - 1) * limit)
                .take(limit)
                .getManyAndCount();
            return {
                status: 'success',
                message: data.length > 0
                    ? 'Vendors retrieved successfully.'
                    : 'No vendors found.',
                data,
                meta: {
                    total,
                    page,
                    limit,
                    hasNextPage: total > page * limit,
                    totalPages: Math.ceil(total / limit),
                },
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(`Error fetching vendors: ${error.message}`);
        }
    }
    async createNewVendor(payload, userId) {
        const existingVendor = await this.vendorRepository.findOne({
            where: { vendor_name: payload.vendor_name, is_deleted: 0 },
        });
        if (existingVendor) {
            throw new common_1.HttpException('Vendor name already exists', common_1.HttpStatus.CONFLICT);
        }
        if (payload.vendor_email) {
            const existingEmail = await this.vendorRepository.findOne({
                where: { vendor_email: payload.vendor_email },
            });
            if (existingEmail) {
                throw new common_1.HttpException(`Vendor email '${payload.vendor_email}' already exists`, common_1.HttpStatus.CONFLICT);
            }
        }
        if (payload.vendor_contact_number) {
            const existingMobileNumber = await this.vendorRepository.findOne({
                where: { vendor_contact_number: payload.vendor_contact_number },
            });
            if (existingMobileNumber) {
                throw new common_1.HttpException(`Vendor contact number '${payload.vendor_contact_number}' already exists`, common_1.HttpStatus.CONFLICT);
            }
        }
        const newVendor = this.vendorRepository.create({
            vendor_name: payload.vendor_name,
            vendor_gst_no: payload.vendor_gst_no,
            vendor_contact_number: payload.vendor_contact_number,
            vendor_alternative_contact_number: payload.vendor_alternative_contact_number,
            vendor_email: payload.vendor_email,
            vendor_primary_contact: payload.vendor_primary_contact,
            vendor_street: payload.vendor_street,
            vendor_landmark: payload.vendor_landmark,
            vendor_country: payload.vendor_country,
            vendor_city: payload.vendor_city,
            vendor_state: payload.vendor_state,
            vendor_pincode: payload.vendor_pincode,
            vendor_first_name: payload.vendor_first_name,
            vendor_middle_name: payload.vendor_middle_name,
            vendor_last_name: payload.vendor_last_name,
            vendor_gst_status: payload.vendor_gst_status,
            vendor_department: payload.vendor_department,
            vendor_degination: payload.vendor_degination,
        });
        const savedVendor = await this.vendorRepository.save(newVendor);
        return {
            status: common_1.HttpStatus.CREATED,
            message: 'Vendor created successfully',
            data: savedVendor,
        };
    }
    async updateVendorData(updatePayload) {
        const { vendor_id, vendor_name, vendor_gst_no, vendor_alternative_contact_number, vendor_contact_number, vendor_email, vendor_primary_contact, vendor_street, vendor_landmark, vendor_city, vendor_state, vendor_country, vendor_pincode, vendor_first_name, vendor_middle_name, vendor_last_name, vendor_gst_status, vendor_department, vendor_degination, vendor_display_name, } = updatePayload;
        const existingVendor = await this.vendorRepository.findOne({
            where: { vendor_id },
        });
        if (!existingVendor) {
            throw new common_1.HttpException(`Vendor with ID ${vendor_id} not found`, common_1.HttpStatus.NOT_FOUND);
        }
        const duplicateVendorName = await this.vendorRepository.findOne({
            where: { vendor_name },
        });
        if (duplicateVendorName && duplicateVendorName.vendor_id !== vendor_id) {
            throw new common_1.HttpException(`Vendor name '${vendor_name}' already exists`, common_1.HttpStatus.CONFLICT);
        }
        if (vendor_email) {
            const duplicateEmail = await this.vendorRepository.findOne({
                where: { vendor_email },
            });
            if (duplicateEmail && duplicateEmail.vendor_id !== vendor_id) {
                throw new common_1.HttpException(`Vendor email '${vendor_email}' already exists`, common_1.HttpStatus.CONFLICT);
            }
        }
        if (vendor_contact_number) {
            const duplicateContact = await this.vendorRepository.findOne({
                where: { vendor_contact_number },
            });
            if (duplicateContact && duplicateContact.vendor_id !== vendor_id) {
                throw new common_1.HttpException(`Vendor contact number '${vendor_contact_number}' already exists`, common_1.HttpStatus.CONFLICT);
            }
        }
        existingVendor.vendor_name = vendor_name;
        existingVendor.vendor_gst_no = vendor_gst_no || '';
        existingVendor.vendor_alternative_contact_number =
            vendor_alternative_contact_number;
        existingVendor.vendor_email = vendor_email;
        existingVendor.vendor_primary_contact = vendor_primary_contact;
        existingVendor.vendor_contact_number = vendor_contact_number;
        existingVendor.vendor_street = vendor_street;
        existingVendor.vendor_landmark = vendor_landmark;
        existingVendor.vendor_city = vendor_city;
        existingVendor.vendor_country = vendor_country;
        existingVendor.vendor_state = vendor_state;
        existingVendor.vendor_pincode = vendor_pincode;
        existingVendor.vendor_first_name = vendor_first_name;
        existingVendor.vendor_middle_name = vendor_middle_name;
        existingVendor.vendor_last_name = vendor_last_name;
        existingVendor.vendor_gst_status = vendor_gst_status;
        existingVendor.vendor_department = vendor_department;
        existingVendor.vendor_degination = vendor_degination;
        existingVendor.vendor_display_name = vendor_display_name;
        const updatedVendor = await this.vendorRepository.save(existingVendor);
        return {
            status: common_1.HttpStatus.OK,
            message: 'Vendor updated successfully',
            data: updatedVendor,
        };
    }
    async activateVendors(dto) {
        console.log('dto2', dto);
        const { vendor_ids } = dto;
        const updated = [];
        const failed = [];
        for (const id of vendor_ids) {
            try {
                const vendor = await this.vendorRepository.findOne({
                    where: { vendor_id: id, is_deleted: 0 },
                });
                if (!vendor) {
                    failed.push({
                        vendor_id: id,
                        message: 'Vendor not found or deleted',
                    });
                    continue;
                }
                vendor.is_active = 1;
                await this.vendorRepository.save(vendor);
                updated.push({ vendor_id: id, status: 'activated' });
            }
            catch (error) {
                failed.push({ vendor_id: id, message: error.message });
            }
        }
        return {
            status: 'success',
            message: 'Activation process completed',
            data: { updated, failed },
        };
    }
    async deactivateVendors(dto) {
        console.log('dto2', dto);
        const { vendor_ids } = dto;
        const updated = [];
        const failed = [];
        for (const id of vendor_ids) {
            try {
                const vendor = await this.vendorRepository.findOne({
                    where: { vendor_id: id, is_deleted: 0 },
                });
                if (!vendor) {
                    failed.push({
                        vendor_id: id,
                        message: 'Vendor not found or deleted',
                    });
                    continue;
                }
                vendor.is_active = 0;
                await this.vendorRepository.save(vendor);
                updated.push({ vendor_id: id, status: 'deactivated' });
            }
            catch (error) {
                failed.push({ vendor_id: id, message: error.message });
            }
        }
        return {
            status: 'success',
            message: 'Deactivation process completed',
            data: { updated, failed },
        };
    }
    async generateVendorTemplate() {
        try {
            const workbook = await XlsxPopulate.fromBlankAsync();
            const mainSheet = workbook.sheet(0);
            mainSheet.name('Vendor_Template');
            const dataSheet = workbook.addSheet('Data');
            const instructions = [
                'Instructions:',
                '1. Fill in the fields starting from row 7.',
                '2. Dropdown fields: State, Country.',
                '3. Do not edit the header row (Row 6).',
                '4. Phone Number and Alternative Contact Number, if provided, must be 10 digits starting with 9.',
                '5. Postal/Zip Code, if provided, must be a 6-digit number.',
                '6. GST No., if provided, must be a 15-character alphanumeric string.',
                '7. Email Address, if provided, must be a valid email (e.g., user@example.com).',
            ];
            instructions.forEach((text, index) => {
                mainSheet
                    .cell(index + 1, 1)
                    .value(text)
                    .style({ bold: true, fontColor: '0000FF' });
            });
            const headers = [
                { label: 'First Name', required: false },
                { label: 'Middle Name', required: false },
                { label: 'Last Name', required: false },
                { label: 'Vendor Email', required: false },
                { label: 'Phone Number', required: false },
                { label: 'Department', required: false },
                { label: 'Organization Name', required: true },
                { label: 'Display Name', required: true },
                { label: 'GST Number', required: true },
                { label: 'Street Address', required: true },
                { label: 'City', required: true },
                { label: 'State', required: true },
                { label: 'PinCode', required: true },
                { label: 'Landmark', required: true },
                { label: 'Country', required: true },
            ];
            const columnWidths = [
                20,
                20,
                20,
                30,
                20,
                25,
                30,
                30,
                20,
                25,
                20,
                20,
                15,
                20,
                20,
            ];
            columnWidths.forEach((width, index) => {
                mainSheet.column(index + 1).width(width);
            });
            headers.forEach((item, index) => {
                mainSheet
                    .cell(8, index + 1)
                    .value(item.label)
                    .style({
                    bold: true,
                    fontColor: '000000',
                });
            });
            const states = ['Maharashtra', 'Goa', 'Karnataka', 'Gujarat'];
            const countries = ['India'];
            const departments = [
                'Sales',
                'Procurement',
                'Marketing',
                'Information-Technology',
                'Human-Resources',
                'Customer-Service',
                'Finance',
                'Operations',
            ];
            states.forEach((state, index) => dataSheet.cell(index + 1, 1).value(state));
            countries.forEach((country, index) => dataSheet.cell(index + 1, 2).value(country));
            departments.forEach((departments, index) => dataSheet.cell(index + 1, 3).value(departments));
            const startRow = 9;
            const maxExcelRows = 1048576;
            const quotedStateList = `"${states.join(',')}"`;
            const quotedCountryList = `"${countries.join(',')}"`;
            const quotedDepartmentList = `"${departments.join(',')}"`;
            mainSheet.range(`L${startRow}:L${maxExcelRows}`).dataValidation({
                type: 'list',
                formula1: quotedStateList,
                allowBlank: true,
                showInputMessage: true,
                promptTitle: 'Select State',
                prompt: 'Choose one from the dropdown',
                errorTitle: 'Invalid State',
                error: 'Please select a valid state from the list.',
            });
            mainSheet.range(`O${startRow}:O${maxExcelRows}`).dataValidation({
                type: 'list',
                formula1: quotedCountryList,
                allowBlank: true,
                showInputMessage: true,
                promptTitle: 'Select Country',
                prompt: 'Choose one from the dropdown',
                errorTitle: 'Invalid Country',
                error: 'Please select a valid country from the list.',
            });
            mainSheet.range(`F${startRow}:F${maxExcelRows}`).dataValidation({
                type: 'list',
                formula1: quotedDepartmentList,
                allowBlank: true,
                showInputMessage: true,
                promptTitle: 'Select Department',
                prompt: 'Choose one from the dropdown',
                errorTitle: 'Invalid Department',
                error: 'Please select a valid department from the list.',
            });
            mainSheet.range(`E${startRow}:E${maxExcelRows}`).dataValidation({
                type: 'custom',
                formula1: `=OR(ISBLANK(E7),AND(LEN(E7)=10,LEFT(E7,1)="9"))`,
                allowBlank: true,
                promptTitle: 'Phone Number',
                errorTitle: 'Invalid Phone Number',
                error: 'Phone number must be 10 digits and start with 9.',
            });
            mainSheet.range(`D${startRow}:D${maxExcelRows}`).dataValidation({
                type: 'custom',
                formula1: `=OR(ISBLANK(D7),AND(LEN(D7)>5,ISNUMBER(FIND("@",D7)),ISNUMBER(FIND(".",D7))))`,
                allowBlank: true,
                promptTitle: 'Email Address',
                errorTitle: 'Invalid Email',
                error: 'Email must be valid and include @ and .',
            });
            mainSheet.range(`I${startRow}:I${maxExcelRows}`).dataValidation({
                type: 'custom',
                formula1: `=OR(ISBLANK(I7),AND(LEN(I7)=15,ISNUMBER(SUBSTITUTE(UPPER(I7)," ","")+0)=FALSE))`,
                allowBlank: true,
                promptTitle: 'GST Number',
                errorTitle: 'Invalid GST No.',
                error: 'GST No. must be a 15-character alphanumeric string.',
            });
            mainSheet.range(`M${startRow}:M${maxExcelRows}`).dataValidation({
                type: 'whole',
                operator: 'between',
                formula1: '100000',
                formula2: '999999',
                allowBlank: true,
                promptTitle: 'PinCode',
                errorTitle: 'Invalid Pin Code',
                error: 'Pin code must be a 6-digit number.',
            });
            dataSheet.hidden(true);
            const buffer = await workbook.outputAsync();
            return buffer;
        }
        catch (error) {
            console.error('Error generating vendor template:', error);
            throw new Error('Failed to generate Excel vendor template');
        }
    }
    async bulkCreateVendors(dtos, user_id) {
        const successVendors = [];
        const errorVendors = [];
        const newVendors = [];
        const existingVendors = await this.vendorRepository.find({
            where: { is_active: 1, is_deleted: 0 },
        });
        for (const dto of dtos) {
            if (dto.vendor_name && typeof dto.vendor_name !== 'string') {
                errorVendors.push({
                    ...dto,
                    reason: 'Vendor organization name must be text.',
                });
                continue;
            }
            if (dto.vendor_contact_number) {
                const phoneRegex = /^9\d{9}$/;
                if (!phoneRegex.test(dto.vendor_contact_number)) {
                    errorVendors.push({
                        ...dto,
                        reason: 'Phone number must be 10 digits and start with 9.',
                    });
                    continue;
                }
            }
            if (dto.vendor_street && typeof dto.vendor_street !== 'string') {
                errorVendors.push({ ...dto, reason: 'Street must be text.' });
                continue;
            }
            if (dto.vendor_landmark && typeof dto.vendor_landmark !== 'string') {
                errorVendors.push({ ...dto, reason: 'Landmark must be text.' });
                continue;
            }
            if (dto.vendor_city && typeof dto.vendor_city !== 'string') {
                errorVendors.push({ ...dto, reason: 'City must be text.' });
                continue;
            }
            if (dto.vendor_state) {
                const validStates = ['Maharashtra', 'Goa', 'Karnataka', 'Gujarat'];
                if (!validStates.includes(dto.vendor_state)) {
                    errorVendors.push({
                        ...dto,
                        reason: 'Invalid state. Must be one of: Maharashtra, Goa, Karnataka, Gujarat.',
                    });
                    continue;
                }
            }
            if (dto.vendor_pincode) {
                const pincodeRegex = /^\d{6}$/;
                if (!pincodeRegex.test(dto.vendor_pincode)) {
                    errorVendors.push({
                        ...dto,
                        reason: 'Zip code must be a 6-digit number.',
                    });
                    continue;
                }
            }
            if (dto.vendor_country) {
                const validCountries = ['India'];
                if (!validCountries.includes(dto.vendor_country)) {
                    errorVendors.push({
                        ...dto,
                        reason: 'Invalid country. Must be India.',
                    });
                    continue;
                }
            }
            if (dto.vendor_alternative_contact_number) {
                const phoneRegex = /^9\d{9}$/;
                if (!phoneRegex.test(dto.vendor_alternative_contact_number)) {
                    errorVendors.push({
                        ...dto,
                        reason: 'Alternative contact number must be 10 digits and start with 9.',
                    });
                    continue;
                }
            }
            if (dto.vendor_email) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(dto.vendor_email) ||
                    dto.vendor_email.length <= 5) {
                    errorVendors.push({
                        ...dto,
                        reason: 'Email must be valid and include @ and .',
                    });
                    continue;
                }
            }
            if (dto.vendor_gst_no) {
                const gstRegex = /^[A-Za-z0-9]{15}$/;
                if (!gstRegex.test(dto.vendor_gst_no)) {
                    errorVendors.push({
                        ...dto,
                        reason: 'GST No. must be a 15-character alphanumeric string.',
                    });
                    continue;
                }
            }
            if (dto.vendor_primary_contact &&
                typeof dto.vendor_primary_contact !== 'string') {
                errorVendors.push({
                    ...dto,
                    reason: 'Primary contact details must be text.',
                });
                continue;
            }
            if (dto.vendor_first_name && typeof dto.vendor_first_name !== 'string') {
                errorVendors.push({ ...dto, reason: 'First Name must be text.' });
                continue;
            }
            if (dto.vendor_middle_name &&
                typeof dto.vendor_middle_name !== 'string') {
                errorVendors.push({ ...dto, reason: 'Middle Name must be text.' });
                continue;
            }
            if (dto.vendor_last_name && typeof dto.vendor_last_name !== 'string') {
                errorVendors.push({ ...dto, reason: 'Last Name must be text.' });
                continue;
            }
            if (dto.vendor_department && typeof dto.vendor_department !== 'string') {
                errorVendors.push({ ...dto, reason: 'Department must be text.' });
                continue;
            }
            if (dto.vendor_display_name &&
                typeof dto.vendor_display_name !== 'string') {
                errorVendors.push({ ...dto, reason: 'Display Name must be text.' });
                continue;
            }
            if (dto.vendor_degination && typeof dto.vendor_degination !== 'string') {
                errorVendors.push({ ...dto, reason: 'Designation must be text.' });
                continue;
            }
            const vendorExists = existingVendors.some((vendor) => vendor.vendor_name?.trim().toLowerCase() ===
                dto.vendor_name?.trim().toLowerCase());
            if (vendorExists) {
                errorVendors.push({ ...dto, reason: 'Vendor already exists' });
                continue;
            }
            dto.vendor_gst_status = dto.vendor_gst_no ? 'Register' : 'Unregister';
            const newVendor = this.vendorRepository.create({
                vendor_name: dto.vendor_name,
                vendor_gst_no: dto.vendor_gst_no,
                vendor_contact_number: dto.vendor_contact_number,
                vendor_alternative_contact_number: dto.vendor_alternative_contact_number,
                vendor_email: dto.vendor_email,
                vendor_street: dto.vendor_street,
                vendor_landmark: dto.vendor_landmark,
                vendor_country: dto.vendor_country,
                vendor_city: dto.vendor_city,
                vendor_state: dto.vendor_state,
                vendor_pincode: dto.vendor_pincode,
                vendor_primary_contact: dto.vendor_primary_contact,
                vendor_first_name: dto.vendor_first_name,
                vendor_middle_name: dto.vendor_middle_name,
                vendor_last_name: dto.vendor_last_name,
                vendor_department: dto.vendor_department,
                vendor_display_name: dto.vendor_display_name,
                vendor_degination: dto.vendor_degination,
                vendor_gst_status: dto.vendor_gst_status,
                is_active: 1,
                is_deleted: 0,
                created_at: dto.created_at,
                updated_at: dto.updated_at,
            });
            newVendors.push({ dto, newVendor });
        }
        try {
            const toSave = newVendors.map((entry) => entry.newVendor);
            const savedVendors = await this.vendorRepository.save(toSave);
            savedVendors.forEach((saved, index) => {
                successVendors.push(newVendors[index].dto);
            });
        }
        catch (error) {
            console.error('Error during bulk save:', error);
            newVendors.forEach((entry) => errorVendors.push({ ...entry.dto, reason: 'Batch save error' }));
        }
        return {
            status: successVendors.length ? common_1.HttpStatus.CREATED : common_1.HttpStatus.CONFLICT,
            message: successVendors.length && errorVendors.length
                ? 'Bulk vendors created with some conflicts.'
                : successVendors.length
                    ? 'All vendors created successfully.'
                    : 'No vendors created. All entries had conflicts or invalid data.',
            data: {
                created_count: successVendors.length,
                created_vendors: successVendors,
                error_vendors: errorVendors,
            },
        };
    }
    async exportOrganizationVendorsExcel(payload) {
        const { gststatus, status, search, sortField = 'vendor_name', sortOrder = 'ASC', selectedIds, } = payload;
        const query = this.vendorRepository
            .createQueryBuilder('vendors')
            .select([
            'vendors.vendor_id',
            'vendors.vendor_name',
            'vendors.vendor_primary_contact',
            'vendors.vendor_email',
            'vendors.vendor_contact_number',
            'vendors.vendor_gst_no',
            'vendors.is_deleted',
            'vendors.is_active',
            'vendors.vendor_gst_status',
            'vendors.created_at',
        ])
            .where('vendors.is_deleted = :deleted', { deleted: 0 });
        if (status && status !== 'All') {
            const isActive = status === 'Active' ? 1 : 0;
            query.andWhere('vendors.is_active = :isActive', { isActive });
        }
        if (gststatus && gststatus !== 'All') {
            query.andWhere('vendors.vendor_gst_status = :gststatus', { gststatus });
        }
        if (search && search.trim() !== '') {
            query.andWhere(`(
        vendors.vendor_name LIKE :search OR 
        vendors.vendor_email LIKE :search OR 
        vendors.vendor_contact_number LIKE :search OR 
        vendors.vendor_gst_no LIKE :search OR
        vendors.vendor_gst_status LIKE :search OR
        vendors.vendor_primary_contact LIKE :search
      )`, { search: `%${search}%` });
        }
        if (selectedIds && Array.isArray(selectedIds) && selectedIds.length > 0) {
            query.andWhere('vendors.vendor_id IN (:...selectedIds)', { selectedIds });
        }
        query.orderBy(`vendors.${sortField}`, sortOrder.toUpperCase() === 'DESC' ? 'DESC' : 'ASC');
        const results = await query.getMany();
        const workbook = await XlsxPopulate.fromBlankAsync();
        const sheet = workbook.sheet(0);
        sheet.name('Vendors');
        const headers = [
            'Sr. No.',
            'Vendor Name',
            'Contact Person',
            'Email',
            'Mobile',
            'GST No',
            'GST Status',
            'Status',
            'Created At',
        ];
        headers.forEach((header, i) => {
            sheet
                .cell(1, i + 1)
                .value(header)
                .style({ bold: true });
        });
        results.forEach((vendor, index) => {
            const row = index + 2;
            sheet.cell(row, 1).value(index + 1);
            sheet.cell(row, 2).value(vendor.vendor_name || '');
            sheet.cell(row, 3).value(vendor.vendor_primary_contact || '');
            sheet.cell(row, 4).value(vendor.vendor_email || '');
            sheet.cell(row, 5).value(vendor.vendor_contact_number || '');
            sheet.cell(row, 6).value(vendor.vendor_gst_no || '');
            sheet.cell(row, 7).value(vendor.vendor_gst_status || '');
            sheet.cell(row, 8).value(vendor.is_active ? 'Active' : 'Inactive');
            sheet
                .cell(row, 9)
                .value(vendor.created_at
                ? new Date(vendor.created_at).toLocaleDateString()
                : '');
        });
        headers.forEach((_, i) => {
            sheet.column(i + 1).width(headers[i].length + 10);
        });
        return await workbook.outputAsync();
    }
    async getAllAssetsLocations(payload) {
        try {
            const { status, page = 1, limit = 10, search, sortField = 'location_name', sortOrder = 'ASC', } = payload;
            const query = this.locationRepository
                .createQueryBuilder('location')
                .leftJoinAndSelect('location.branch', 'branch')
                .select([
                'location.location_id',
                'location.location_name',
                'location.branch_id',
                'location.location_floor_room',
                'location.location_city',
                'location.location_state',
                'location.location_total_asset',
                'location.created_at',
                'location.is_active',
                'location.is_deleted',
                'branch.branch_id',
                'branch.branch_name',
                'branch.city',
                'branch.state',
            ])
                .where('location.is_deleted = :deleted', { deleted: 0 });
            if (status && status !== 'All') {
                const isActive = status === 'Active' ? 1 : 0;
                query.andWhere('location.is_active = :isActive', { isActive });
            }
            if (search && search.trim() !== '') {
                query.andWhere(`(
          location.location_name ILIKE :search OR
          location.location_floor_room ILIKE :search OR
          location.location_city ILIKE :search OR
          location.location_state ILIKE :search OR
          CAST(location.location_total_asset AS TEXT) ILIKE :search OR
          CAST(location.is_active AS TEXT) ILIKE :search OR
          branch.branch_name ILIKE :search OR
          branch.city ILIKE :search OR
          branch.state ILIKE :search
        )`, { search: `%${search}%` });
            }
            query.orderBy(`location.${sortField}`, sortOrder.toUpperCase() === 'DESC' ? 'DESC' : 'ASC');
            const [data, total] = await query
                .skip((page - 1) * limit)
                .take(limit)
                .getManyAndCount();
            return {
                status: 'success',
                message: data.length > 0
                    ? 'Locations retrieved successfully.'
                    : 'No locations found.',
                data,
                meta: {
                    total,
                    page,
                    limit,
                    hasNextPage: total > page * limit,
                    totalPages: Math.ceil(total / limit),
                },
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(`Error fetching locations: ${error.message}`);
        }
    }
    async exportLocationsExcel(payload) {
        const { status, search, sortField = 'location_name', sortOrder = 'ASC', selectedIds, } = payload;
        try {
            const query = this.locationRepository
                .createQueryBuilder('location')
                .leftJoinAndSelect('location.branch', 'branch')
                .select([
                'location.location_id',
                'location.location_name',
                'location.branch_id',
                'location.location_floor_room',
                'location.location_city',
                'location.location_state',
                'location.location_total_asset',
                'location.created_at',
                'location.is_active',
                'location.is_deleted',
                'branch.branch_id',
                'branch.branch_name',
                'branch.city',
                'branch.state',
            ])
                .where('location.is_deleted = :deleted', { deleted: 0 });
            if (status && status !== 'All') {
                const isActive = status === 'Active' ? 1 : 0;
                query.andWhere('location.is_active = :isActive', { isActive });
            }
            if (search && search.trim() !== '') {
                query.andWhere(`(
          location.location_name ILIKE :search OR
          location.location_floor_room ILIKE :search OR
          location.location_city ILIKE :search OR
          location.location_state ILIKE :search OR
          CAST(location.location_total_asset AS TEXT) ILIKE :search OR
          CAST(location.is_active AS TEXT) ILIKE :search OR
          branch.branch_name ILIKE :search OR
          branch.city ILIKE :search OR
          branch.state ILIKE :search
        )`, { search: `%${search}%` });
            }
            if (selectedIds && Array.isArray(selectedIds) && selectedIds.length > 0) {
                query.andWhere('location.location_id IN (:...selectedIds)', {
                    selectedIds,
                });
            }
            query.orderBy(sortField.startsWith('branch.') ? sortField : `location.${sortField}`, sortOrder.toUpperCase() === 'DESC' ? 'DESC' : 'ASC');
            const results = await query.getMany();
            const workbook = await XlsxPopulate.fromBlankAsync();
            const sheet = workbook.sheet(0);
            sheet.name('Locations');
            const headers = [
                'Sr. No.',
                'Location Name',
                'Branch Name',
                'Floor/Room',
                'City',
                'State',
                'Total Assets',
                'Status',
                'Created At',
            ];
            headers.forEach((header, i) => {
                sheet
                    .cell(1, i + 1)
                    .value(header)
                    .style({ bold: true });
            });
            results.forEach((loc, index) => {
                const row = index + 2;
                sheet.cell(row, 1).value(index + 1);
                sheet.cell(row, 2).value(loc.location_name || '');
                sheet.cell(row, 3).value(loc.branch?.branch_name || '');
                sheet.cell(row, 4).value(loc.location_floor_room || '');
                sheet.cell(row, 5).value(loc.location_city || '');
                sheet.cell(row, 6).value(loc.location_state || '');
                sheet.cell(row, 7).value(loc.location_total_asset || 0);
                sheet.cell(row, 8).value(loc.is_active ? 'Active' : 'Inactive');
                sheet
                    .cell(row, 9)
                    .value(loc.created_at ? new Date(loc.created_at).toLocaleDateString() : '');
            });
            headers.forEach((_, i) => {
                sheet.column(i + 1).width(headers[i].length + 10);
            });
            return await workbook.outputAsync();
        }
        catch (error) {
            throw new common_1.BadRequestException(`Error exporting locations: ${error.message}`);
        }
    }
    async addNewLocation(payload, userId) {
        console.log('payload', payload);
        console.log('userId', userId);
        const existingLocation = await this.locationRepository.findOne({
            where: { location_name: payload.location_name },
        });
        if (existingLocation) {
            throw new common_1.HttpException('Location name already exists', common_1.HttpStatus.CONFLICT);
        }
        const newLocation = this.locationRepository.create({
            location_name: payload.location_name,
            branch_id: parseInt(payload.branch_id),
            department_id: parseInt(payload.department_id),
            location_floor_room: payload.location_floor_room,
            location_total_asset: payload.location_total_asset ?? 0,
            location_street_address: payload.location_street_address,
            location_description: payload.location_description,
            is_active: payload.is_active === true || payload.is_active === 'true' ? 1 : 0,
            created_at: new Date(),
            updated_at: new Date(),
            created_by: userId,
            updated_by: null,
        });
        const savedLocation = await this.locationRepository.save(newLocation);
        return {
            status: common_1.HttpStatus.CREATED,
            message: 'Location created successfully',
            data: savedLocation,
        };
    }
    async getLocationById(location_id) {
        const location = await this.locationRepository
            .createQueryBuilder('location')
            .leftJoinAndSelect('location.branch', 'branch')
            .select([
            'location.location_id',
            'location.location_name',
            'location.branch_id',
            'location.location_floor_room',
            'location.location_city',
            'location.location_state',
            'location.location_total_asset',
            'location.created_at',
            'location.is_active',
            'location.is_deleted',
            'branch.branch_id',
            'branch.branch_name',
            'branch.city',
            'branch.state',
            'location.location_street_address',
            'location.location_description',
        ])
            .where('location.location_id = :id', { id: location_id })
            .getOne();
        if (!location) {
            throw new common_1.HttpException('Location not found', common_1.HttpStatus.NOT_FOUND);
        }
        return {
            status: common_1.HttpStatus.OK,
            message: 'Location fetched successfully',
            data: location,
        };
    }
    async deleteLocationsById(ids, userId) {
        const locationIds = Array.isArray(ids) ? ids : [ids];
        if (!locationIds.length) {
            throw new common_1.BadRequestException('No location IDs provided');
        }
        const locations = await this.locationRepository.find({
            where: { location_id: (0, typeorm_2.In)(locationIds), is_deleted: 0 },
        });
        if (!locations.length) {
            throw new common_1.NotFoundException('No matching active locations found');
        }
        for (const location of locations) {
            location.is_deleted = 1;
            location.is_active = 0;
            location.updated_by = userId;
            location.updated_at = new Date();
        }
        await this.locationRepository.save(locations);
        return {
            message: `Soft deleted ${locations.length} location(s) successfully`,
            deletedIds: locations.map((loc) => loc.location_id),
        };
    }
    async updateLocation(payloadWithId, userId) {
        const { location_id, ...payload } = payloadWithId;
        const location = await this.locationRepository.findOne({
            where: { location_id: location_id },
        });
        if (!location) {
            throw new common_1.HttpException('Location not found', common_1.HttpStatus.NOT_FOUND);
        }
        const updatedLocation = this.locationRepository.merge(location, {
            location_name: payload.location_name,
            branch_id: payload.branch_id,
            department_id: payload.department_id,
            location_floor_room: payload.location_floor_room,
            location_street_address: payload.location_street_address,
            location_description: payload.location_description,
            updated_at: new Date(),
            updated_by: userId,
        });
        const savedLocation = await this.locationRepository.save(updatedLocation);
        return {
            status: common_1.HttpStatus.OK,
            message: 'Location updated successfully',
            data: savedLocation,
        };
    }
    async activateLocations(dto) {
        const { location_ids } = dto;
        const updated = [];
        const failed = [];
        for (const id of location_ids) {
            try {
                const location = await this.locationRepository.findOne({
                    where: { location_id: id, is_deleted: 0 },
                });
                if (!location) {
                    failed.push({
                        location_id: id,
                        message: 'Location not found or deleted',
                    });
                    continue;
                }
                location.is_active = 1;
                await this.locationRepository.save(location);
                updated.push({ location_id: id, status: 'activated' });
            }
            catch (error) {
                failed.push({ location_id: id, message: error.message });
            }
        }
        return {
            status: 'success',
            message: 'Activation process completed',
            data: { updated, failed },
        };
    }
    async deactivateLocations(dto) {
        const { location_ids } = dto;
        const updated = [];
        const failed = [];
        for (const id of location_ids) {
            try {
                const location = await this.locationRepository.findOne({
                    where: { location_id: id, is_deleted: 0 },
                });
                if (!location) {
                    failed.push({
                        location_id: id,
                        message: 'Location not found or deleted',
                    });
                    continue;
                }
                location.is_active = 0;
                await this.locationRepository.save(location);
                updated.push({ location_id: id, status: 'deactivated' });
            }
            catch (error) {
                failed.push({ location_id: id, message: error.message });
            }
        }
        return {
            status: 'success',
            message: 'Deactivation process completed',
            data: { updated, failed },
        };
    }
    async fetchOrganizationUsers(payload) {
        try {
            const { page = 1, limit = 10, search, sortField = 'first_name', sortOrder = 'ASC', customFilters = {}, } = payload;
            const query = this.userRepository
                .createQueryBuilder('user')
                .leftJoinAndSelect('user.user_role', 'role')
                .leftJoinAndSelect('user.user_department', 'department')
                .leftJoinAndSelect('user.user_designation', 'designation')
                .leftJoinAndSelect(branches_entity_1.Branch, 'branch', 'branch.branch_id = ANY(user.branches)')
                .select([
                'user.user_id',
                'user.first_name',
                'user.middle_name',
                'user.last_name',
                'user.users_business_email',
                'user.phone_number',
                'user.is_active',
                'user.is_deleted',
                'user.last_login',
                'user.branches',
                'role.role_id',
                'role.role_name',
                'department.department_id',
                'department.department_name',
                'designation.designation_id',
                'designation.designation_name',
                'branch.branch_id',
                'branch.branch_name',
            ])
                .where('user.is_deleted = :deleted', { deleted: 0 });
            for (const [filterKey, filterValues] of Object.entries(customFilters)) {
                if (!filterValues || filterValues.length === 0)
                    continue;
                if (filterKey === 'status') {
                    const filteredStatuses = filterValues.filter((v) => v !== 'All');
                    if (filteredStatuses.length > 0) {
                        const isActiveValues = filteredStatuses
                            .map((status) => {
                            if (status.toLowerCase() === 'active')
                                return 1;
                            if (status.toLowerCase() === 'inactive')
                                return 0;
                            return null;
                        })
                            .filter((v) => v !== null);
                        if (isActiveValues.length > 0) {
                            query.andWhere('user.is_active IN (:...isActiveValues)', {
                                isActiveValues,
                            });
                        }
                    }
                }
                else if (filterKey === 'branch_id') {
                    query.andWhere(`user.branches && :branchFilter`, {
                        branchFilter: filterValues.map(Number),
                    });
                }
                else {
                    const allowedFilters = [
                        'role_id',
                        'department_id',
                        'designation_id',
                        'city',
                        'state',
                    ];
                    if (allowedFilters.includes(filterKey)) {
                        query.andWhere(`user.${filterKey} IN (:...values)`, {
                            values: filterValues,
                        });
                    }
                }
            }
            if (search && search.trim() !== '') {
                query.andWhere(`(
          CONCAT(user.first_name, ' ', user.last_name) LIKE :search OR
          user.users_business_email ILIKE :search OR
          user.phone_number ILIKE :search OR
          CAST(user.user_id AS TEXT) ILIKE :search OR
          branch.branch_name ILIKE :search OR
          role.role_name ILIKE :search
        )`, { search: `%${search}%` });
            }
            const safeSortField = [
                'first_name',
                'last_name',
                'user_id',
                'is_active',
            ].includes(sortField)
                ? sortField
                : 'first_name';
            query.orderBy(`user.${safeSortField}`, sortOrder.toUpperCase() === 'DESC' ? 'DESC' : 'ASC');
            const [data, total] = await query
                .skip((page - 1) * limit)
                .take(limit)
                .getManyAndCount();
            return {
                status: 'success',
                message: data.length > 0 ? 'Users retrieved successfully.' : 'No users found.',
                data,
                meta: {
                    total,
                    page,
                    limit,
                    hasNextPage: total > page * limit,
                    totalPages: Math.ceil(total / limit),
                },
            };
        }
        catch (error) {
            console.error('Error fetching users:', error);
            throw new common_1.BadRequestException(`Error fetching users: ${error.message}`);
        }
    }
    async fetchSingleUsersData(user_id) {
        if (!user_id)
            throw new common_1.BadRequestException('User ID is required');
        try {
            const user = await this.userRepository.findOne({
                where: { user_id, is_active: 1, is_deleted: 0 },
                relations: [
                    'user_role',
                    'user_designation',
                    'user_department',
                    'assets_mapped',
                    'assets_mapped',
                    'assets_mapped.asset',
                    'assets_mapped.asset.main_category',
                    'assets_mapped.asset.sub_category',
                    'assets_mapped.asset.asset_item',
                    'assets_mapped.managed_user',
                    'assets_mapped.status',
                    'assets_mapped.added_by_user',
                    'assets_mapped.user',
                ],
            });
            if (!user) {
                return {
                    status: 404,
                    message: `User with ID ${user_id} not found or inactive`,
                    data: null,
                };
            }
            const branches = await this.branchRepository
                .createQueryBuilder('branch')
                .where('branch.branch_id = ANY(:branchIds)', {
                branchIds: user.branches,
            })
                .select(['branch.branch_id', 'branch.branch_name'])
                .getMany();
            const roleWithPermissions = await this.rolesPermissionRepository.findOne({
                where: { role_id: user.role_id, is_active: true, is_deleted: false },
                relations: ['permissions'],
            });
            let permissions = [];
            if (roleWithPermissions?.permissions?.length) {
                roleWithPermissions.permissions.forEach((permEntity) => {
                    if (Array.isArray(permEntity.permissions)) {
                        permEntity.permissions.forEach((module) => {
                            if (Array.isArray(module.children)) {
                                module.children.forEach((child) => {
                                    const hasPermission = Object.entries(child).some(([key, value]) => [
                                        'edit',
                                        'view',
                                        'create',
                                        'delete',
                                        'export',
                                        'import',
                                        'fullaccess',
                                    ].includes(key) && value === true);
                                    if (hasPermission)
                                        permissions.push(module.moduleName);
                                });
                            }
                            else {
                                const hasPermission = Object.entries(module).some(([key, value]) => [
                                    'edit',
                                    'view',
                                    'create',
                                    'delete',
                                    'export',
                                    'import',
                                    'fullaccess',
                                ].includes(key) && value === true);
                                if (hasPermission)
                                    permissions.push(module.moduleName);
                            }
                        });
                    }
                });
                permissions = [...new Set(permissions)];
            }
            const formattedUser = {
                ...user,
                branches: branches.map((b) => ({
                    branch_id: b.branch_id,
                    branch_name: b.branch_name,
                })),
                permissions,
            };
            return {
                status: 200,
                message: 'User fetched successfully',
                data: formattedUser,
            };
        }
        catch (error) {
            return {
                status: 500,
                message: 'An error occurred while fetching the user',
                error: error.message,
            };
        }
    }
    async fetchSingleUsersDataOLD(fetchSingleUserDto) {
        const { user_id } = fetchSingleUserDto;
        console.log('User ID payload:', user_id);
        if (!user_id) {
            throw new common_1.BadRequestException('User ID is required');
        }
        try {
            const usersData = await this.userRepository
                .createQueryBuilder('users')
                .leftJoinAndSelect('users.user_role', 'user_role')
                .leftJoinAndSelect('users.user_department', 'user_department')
                .leftJoinAndSelect('users.user_designation', 'user_designation')
                .leftJoinAndSelect('users.user_branch', 'user_branch')
                .leftJoinAndSelect('users.assets_mapped', 'assets_mapped')
                .leftJoinAndSelect('assets_mapped.asset', 'asset')
                .leftJoinAndSelect('assets_mapped.managed_user', 'managed_user')
                .leftJoinAndSelect('assets_mapped.status', 'status')
                .leftJoinAndSelect('assets_mapped.added_by_user', 'added_by_user')
                .leftJoinAndSelect('assets_mapped.user', 'user')
                .leftJoinAndSelect('asset.main_category', 'asset_main_category')
                .leftJoinAndSelect('asset.sub_category', 'asset_sub_category')
                .leftJoinAndSelect('asset.asset_item', 'asset_item')
                .where('users.user_id = :user_id', { user_id })
                .andWhere('users.is_active = :is_active', { is_active: true })
                .andWhere('users.is_deleted = :is_deleted', { is_deleted: false })
                .getOne();
            if (!usersData) {
                return {
                    status: 404,
                    message: `User with ID ${user_id} not found or inactive`,
                    data: null,
                };
            }
            return {
                status: 200,
                message: 'User fetched successfully',
                data: { usersData },
            };
        }
        catch (error) {
            return {
                status: 500,
                message: 'An error occurred while fetching the user',
                error: error.message,
            };
        }
    }
    async createNewUser(payload, organization_Id, decrypted_system_user_id) {
        const existingUser = await this.userRepository.findOne({
            where: { phone_number: payload.phone_number },
        });
        if (existingUser) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.CONFLICT,
                message: `Phone number already exists`,
            }, common_1.HttpStatus.CONFLICT);
        }
        const existingBillingUser = await this.billinguserRepo.findOne({
            where: [
                { phone_number: payload.phone_number },
                { business_email: payload.users_business_email },
            ],
        });
        let billingUser;
        if (!existingBillingUser) {
            const newBillingUser = this.billinguserRepo.create({
                first_name: payload.first_name,
                last_name: payload.last_name || '',
                business_email: payload.users_business_email,
                phone_number: payload.phone_number,
                organization_id: organization_Id,
                password: null,
                username: payload.users_business_email,
                is_primary_user: 'N',
                verified: false,
                is_active: 1,
                is_deleted: 0,
            });
            billingUser = await this.billinguserRepo.save(newBillingUser);
        }
        else {
            billingUser = existingBillingUser;
        }
        if (!billingUser?.user_id) {
            throw new common_1.HttpException({ message: 'Billing user creation failed' }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        const newUser = this.userRepository.create({
            first_name: payload.first_name,
            last_name: payload.last_name || '',
            users_business_email: payload.users_business_email,
            phone_number: payload.phone_number,
            organization_id: organization_Id,
            created_by: decrypted_system_user_id,
            register_user_login_id: billingUser.user_id,
            middle_name: payload.middle_name || '',
            street: payload.street || null,
            landmark: payload.landmark || null,
            city: payload.city || null,
            state: payload.state || null,
            zip: payload.zip || null,
            country: payload.country || null,
            branches: payload.branch || [],
            role_id: payload.role_id ? Number(payload.role_id) : null,
            department_id: payload.department_id
                ? Number(payload.department_id)
                : null,
            designation_id: payload.designation_id
                ? Number(payload.designation_id)
                : null,
            is_department_head: !!payload.is_department_head,
            is_active: 1,
            is_deleted: 0,
        });
        const savedUser = await this.userRepository.save(newUser);
        return {
            status: common_1.HttpStatus.CREATED,
            message: 'User created successfully',
            data: {
                billingUser,
                user: savedUser,
            },
        };
    }
    async updateUserManagementData(payload) {
        console.log('payload1', JSON.stringify(payload, null, 2));
        const { userId: user_id, first_name, middle_name, last_name, phone_number, users_business_email, role_id, department_id, designation_id, branch, street, landmark, city, state, country, zip, is_active, is_department_head, } = payload;
        console.log('user_id and first_name', user_id, first_name);
        if (!user_id || !first_name) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.BAD_REQUEST,
                message: 'User ID and first name are required',
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        const existingUser = await this.userRepository.findOne({
            where: { user_id },
            relations: ['billingUser'],
        });
        if (!existingUser) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.NOT_FOUND,
                message: `User with ID ${user_id} not found`,
            }, common_1.HttpStatus.NOT_FOUND);
        }
        const existingUserLogin = existingUser.billingUser;
        if (!existingUserLogin) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.NOT_FOUND,
                message: `User login details not found for user ID ${user_id}`,
            }, common_1.HttpStatus.NOT_FOUND);
        }
        if (users_business_email &&
            users_business_email !== existingUser.users_business_email) {
            const emailInUsePrivate = await this.userRepository.findOne({
                where: { users_business_email, user_id: (0, typeorm_2.Not)(user_id) },
            });
            if (emailInUsePrivate) {
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.CONFLICT,
                    message: `Email '${users_business_email}' is already in use`,
                }, common_1.HttpStatus.CONFLICT);
            }
        }
        if (phone_number && phone_number !== existingUser.phone_number) {
            const phoneInUsePrivate = await this.userRepository.findOne({
                where: { phone_number, user_id: (0, typeorm_2.Not)(user_id) },
            });
            if (phoneInUsePrivate) {
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.CONFLICT,
                    message: `Phone number '${phone_number}' is already in use`,
                }, common_1.HttpStatus.CONFLICT);
            }
        }
        Object.assign(existingUser, {
            first_name,
            middle_name: middle_name || existingUser.middle_name || '',
            last_name: last_name || existingUser.last_name,
            users_business_email: users_business_email || existingUser.users_business_email,
            phone_number: phone_number || existingUser.phone_number,
            role_id: role_id || existingUser.role_id,
            department_id: department_id || existingUser.department_id,
            designation_id: designation_id || existingUser.designation_id,
            branches: branch?.map(Number) || existingUser.branches,
            street: street || existingUser.street,
            landmark: landmark || existingUser.landmark,
            city: city || existingUser.city,
            state: state || existingUser.state,
            country: country || existingUser.country,
            zip: zip || existingUser.zip,
            is_active: is_active !== undefined ? is_active : existingUser.is_active,
            is_department_head: is_department_head !== undefined
                ? is_department_head
                : existingUser.is_department_head,
            updated_at: new Date(),
        });
        const updatedUser = await this.userRepository.save(existingUser);
        Object.assign(existingUserLogin, {
            first_name: first_name !== undefined ? first_name : existingUserLogin.first_name,
            last_name: last_name !== undefined ? last_name : existingUserLogin.last_name,
            users_business_email: users_business_email !== undefined
                ? users_business_email
                : existingUserLogin.business_email,
            phone_number: phone_number !== undefined
                ? phone_number
                : existingUserLogin.phone_number,
        });
        const updatedUserLogin = await this.billinguserRepo.save(existingUserLogin);
        return {
            status: common_1.HttpStatus.OK,
            message: 'User updated successfully',
            data: { user: updatedUser, userLogin: updatedUserLogin },
        };
    }
    async activateUsers(userIds, systemUserId) {
        const updated = [];
        const failed = [];
        for (const id of userIds) {
            try {
                const user = await this.userRepository.findOne({
                    where: { user_id: id, is_deleted: 0 },
                });
                if (!user) {
                    failed.push({ user_id: id, message: 'User not found or deleted' });
                    continue;
                }
                user.is_active = 1;
                await this.userRepository.save(user);
                if (user.register_user_login_id) {
                    await this.billinguserRepo.update({ user_id: user.register_user_login_id }, { is_active: 1 });
                }
                updated.push({ user_id: id, status: 'activated' });
            }
            catch (error) {
                failed.push({ user_id: id, message: error.message });
            }
        }
        return {
            status: 'success',
            message: 'Activation process completed',
            data: { updated, failed },
        };
    }
    async deactivateUsers(userIds, systemUserId) {
        const updated = [];
        const failed = [];
        for (const id of userIds) {
            try {
                const user = await this.userRepository.findOne({
                    where: { user_id: id, is_deleted: 0 },
                });
                if (!user) {
                    failed.push({ user_id: id, message: 'User not found or deleted' });
                    continue;
                }
                user.is_active = 0;
                await this.userRepository.save(user);
                if (user.register_user_login_id) {
                    await this.billinguserRepo.update({ user_id: user.register_user_login_id }, { is_active: 0 });
                }
                updated.push({ user_id: id, status: 'deactivated' });
            }
            catch (error) {
                failed.push({ user_id: id, message: error.message });
            }
        }
        return {
            status: 'success',
            message: 'Activation process completed',
            data: { updated, failed },
        };
    }
    async exportFilteredExcelForUsers(payload) {
        try {
            const { search, sortField = 'first_name', sortOrder = 'ASC', customFilters = {}, selectedIds, } = payload;
            const query = this.userRepository
                .createQueryBuilder('user')
                .leftJoinAndSelect('user.user_role', 'role')
                .leftJoinAndSelect('user.user_department', 'department')
                .leftJoinAndSelect('user.user_designation', 'designation')
                .leftJoinAndSelect(branches_entity_1.Branch, 'branch', 'branch.branch_id = ANY(user.branches)')
                .select([
                'user.user_id',
                'user.first_name',
                'user.middle_name',
                'user.last_name',
                'user.users_business_email',
                'user.phone_number',
                'user.is_active',
                'user.is_deleted',
                'user.last_login',
                'user.created_at',
                'role.role_id',
                'role.role_name',
                'department.department_id',
                'department.department_name',
                'designation.designation_id',
                'designation.designation_name',
                'branch.branch_id',
                'branch.branch_name',
            ])
                .where('user.is_deleted = :deleted', { deleted: 0 });
            if (selectedIds && selectedIds.length > 0) {
                query.andWhere('user.user_id IN (:...ids)', { ids: selectedIds });
            }
            for (const [filterKey, filterValues] of Object.entries(customFilters)) {
                if (!filterValues || filterValues.length === 0)
                    continue;
                if (filterKey === 'status') {
                    const filteredStatuses = filterValues.filter((v) => v !== 'All');
                    if (filteredStatuses.length > 0) {
                        const isActiveValues = filteredStatuses
                            .map((status) => {
                            if (status.toLowerCase() === 'active')
                                return 1;
                            if (status.toLowerCase() === 'inactive')
                                return 0;
                            return null;
                        })
                            .filter((v) => v !== null);
                        if (isActiveValues.length > 0) {
                            query.andWhere('user.is_active IN (:...isActiveValues)', {
                                isActiveValues,
                            });
                        }
                    }
                }
                else if (filterKey === 'branch_id') {
                    query.andWhere(`user.branches && :branchFilter`, {
                        branchFilter: filterValues.map(Number),
                    });
                }
                else {
                    const allowedFilters = [
                        'role_id',
                        'department_id',
                        'designation_id',
                        'city',
                        'state',
                    ];
                    if (allowedFilters.includes(filterKey)) {
                        query.andWhere(`user.${filterKey} IN (:...values)`, {
                            values: filterValues,
                        });
                    }
                }
            }
            if (search && search.trim() !== '') {
                query.andWhere(`(
          CONCAT(user.first_name, ' ', user.last_name) ILIKE :search OR
          user.users_business_email ILIKE :search OR
          user.phone_number ILIKE :search OR
          CAST(user.user_id AS TEXT) ILIKE :search OR
          branch.branch_name ILIKE :search OR
          role.role_name ILIKE :search
        )`, { search: `%${search}%` });
            }
            const safeSortField = [
                'first_name',
                'last_name',
                'user_id',
                'is_active',
            ].includes(sortField)
                ? sortField
                : 'first_name';
            query.orderBy(`user.${safeSortField}`, sortOrder.toUpperCase() === 'DESC' ? 'DESC' : 'ASC');
            const users = await query.getMany();
            const workbook = await XlsxPopulate.fromBlankAsync();
            const sheet = workbook.sheet(0);
            sheet.name('Users');
            const headers = [
                'Sr. No.',
                'First Name',
                'Middle Name',
                'Last Name',
                'Email',
                'Phone',
                'Branch',
                'Department',
                'Designation',
                'Role',
                'Status',
                'Created At',
                'Last Login',
            ];
            headers.forEach((header, index) => {
                sheet
                    .cell(1, index + 1)
                    .value(header)
                    .style({ bold: true });
            });
            users.forEach((user, index) => {
                sheet.cell(index + 2, 1).value(index + 1);
                sheet.cell(index + 2, 2).value(user.first_name || '');
                sheet.cell(index + 2, 3).value(user.middle_name || '');
                sheet.cell(index + 2, 4).value(user.last_name || '');
                sheet.cell(index + 2, 5).value(user.users_business_email || '');
                sheet.cell(index + 2, 6).value(user.phone_number || '');
                sheet.cell(index + 2, 7).value(user['branch']?.branch_name || '');
                sheet
                    .cell(index + 2, 8)
                    .value(user.user_department?.departmentName || '');
                sheet
                    .cell(index + 2, 9)
                    .value(user.user_designation?.designation_name || '');
                sheet.cell(index + 2, 10).value(user.user_role?.role_name || '');
                sheet.cell(index + 2, 11).value(user.is_active ? 'Active' : 'Inactive');
                sheet
                    .cell(index + 2, 12)
                    .value(user.created_at ? new Date(user.created_at).toLocaleString() : '');
                sheet
                    .cell(index + 2, 13)
                    .value(user.last_login ? new Date(user.last_login).toLocaleString() : '');
            });
            headers.forEach((_, i) => {
                sheet.column(i + 1).width(headers[i].length + 10);
            });
            return await workbook.outputAsync();
        }
        catch (error) {
            console.error('Error exporting users:', error);
            throw new common_1.BadRequestException(`Error exporting users: ${error.message}`);
        }
    }
    async sendResetPasswordEmailByAdmin(userId, decrypted_system_user_id) {
        const user = await this.userRepository.findOne({
            where: { user_id: userId },
        });
        console.log('USER FOR RESET', user);
        if (!user || !user.register_user_login_id) {
            throw new common_1.NotFoundException('User not found');
        }
        const loginUser = await this.billinguserRepo.findOne({
            where: { user_id: user.register_user_login_id },
        });
        if (!loginUser) {
            throw new common_1.NotFoundException('Login user record not found');
        }
        const org = await this.registerOrganization.findOne({
            where: { organization_id: loginUser.organization_id },
        });
        const result = await this.authService.fetchUserLoginProfile(Number(decrypted_system_user_id));
        const resetUrl = `${process.env.CLIENT_ORIGIN_URL}/authentication/passwordset/accept-invite?userId=${loginUser.user_id}`;
        await this.billinguserRepo.update({ user_id: loginUser.user_id }, { passwordReset: 'Y' });
        await this.mailService.sendEmail(loginUser.business_email, `Password Reset for your ${org.organization_name} Account`, await (0, render_email_1.renderEmail)(render_email_1.EmailTemplate.PASSWORD_RESET_BY_ADMIN, {
            name: `${loginUser.first_name} ${loginUser.last_name}`,
            inviter: `${result.userExists.first_name} ${result.userExists.last_name}`,
            companyName: org.organization_name,
            companyLogo: null,
            mailReply: 'support@norbik.in',
            resetPasswordUrl: resetUrl,
        }, this.mailConfigService));
        return {
            status: common_1.HttpStatus.OK,
            message: `Reset password email sent to ${loginUser.business_email}`,
        };
    }
    async getSubscriptionDetailsByOrganizationAsset(organization_profile_id) {
        try {
            const subscription = await this.subscriptionRepository
                .createQueryBuilder('sub')
                .leftJoinAndSelect('sub.plan', 'plan')
                .leftJoinAndSelect('sub.subscriptionType', 'subscriptionType')
                .leftJoinAndSelect('sub.billingInfo', 'billingInfo')
                .leftJoinAndSelect('sub.paymentTransactions', 'paymentTransactions')
                .leftJoinAndSelect('sub.paymentMode', 'paymentMode')
                .where('sub.organization_profile_id = :organization_profile_id', {
                organization_profile_id,
            })
                .andWhere('sub.is_active = :isActive', { isActive: true })
                .orderBy('sub.created_at', 'DESC')
                .getOne();
            if (!subscription) {
                throw new Error('Subscription not found');
            }
            const featureMappings = await this.planFeatureMappingRepository
                .createQueryBuilder('mapping')
                .leftJoinAndSelect('mapping.feature', 'feature')
                .where('mapping.plan = :plan_id', { plan_id: subscription.plan_id })
                .orderBy('feature.feature_name', 'ASC')
                .getMany();
            const features = featureMappings.map((mapping) => ({
                feature_id: mapping.feature?.feature_id,
                feature_name: mapping.feature?.feature_name,
                description: mapping.feature?.description,
                feature_value: mapping.feature_value,
                status: mapping.status,
            }));
            const serviceMappings = await this.serviceMappingRepo
                .createQueryBuilder('mapping')
                .leftJoinAndSelect('mapping.service', 'service')
                .where('mapping.planId = :plan_id', { plan_id: subscription.plan_id })
                .andWhere('mapping.isActive = :isActive', { isActive: true })
                .andWhere('mapping.isDeleted = :isDeleted', { isDeleted: false })
                .orderBy('service.name', 'ASC')
                .getMany();
            const services = serviceMappings.map((mapping) => ({
                mappingId: mapping.mappingId,
                serviceId: mapping.service?.serviceId,
                name: mapping.service?.name,
                description: mapping.service?.description,
                status: mapping.status,
            }));
            return {
                subscription_id: subscription.subscription_id,
                organization_profile_id: subscription.organization_profile_id,
                plan: {
                    plan_id: subscription.plan.plan_id,
                    plan_name: subscription.plan.plan_name,
                    set_trial: subscription.plan.set_trial,
                },
                billingInfo: subscription.billingInfo?.map((b) => ({
                    billing_id: b.billing_id,
                    first_name: b.first_name,
                    last_name: b.last_name,
                    email: b.email,
                    phone_number: b.phone_number,
                    company_name: b.company_name,
                    address_line1: b.address_line1,
                    address_line2: b.address_line2,
                    city: b.city,
                    state: b.state,
                    postal_code: b.postal_code,
                    country: b.country,
                    gst_number: b.gst_number,
                    tax_id: b.tax_id,
                    created_at: b.created_at,
                    updated_at: b.updated_at,
                })) || [],
                paymentTransactions: subscription.paymentTransactions?.map((p) => ({
                    transaction_id: p.transaction_id,
                    amount: p.amount,
                    currency: p.currency,
                    payment_method: p.payment_method,
                    card_last4: p.card_last4,
                    card_expiry: p.card_expiry,
                    card_holder_name: p.card_holder_name,
                    transaction_status: p.transaction_status,
                    transaction_reference: p.transaction_reference,
                    paid_at: p.paid_at,
                    created_at: p.created_at,
                    updated_at: p.updated_at,
                })) || [],
                subscription_type: subscription.subscriptionType?.type_name ?? null,
                price: subscription.price,
                discounted_price: subscription.discounted_price,
                grand_total: subscription.grand_total,
                start_date: subscription.start_date,
                renewal_date: subscription.renewal_date,
                trial_end_date: subscription.trial_expiry_date,
                payment_status: subscription.payment_status,
                is_trial_period: subscription.is_trial_period,
                payment_mode: subscription.paymentMode
                    ? {
                        id: subscription.paymentMode.payment_mode_id,
                        name: subscription.paymentMode.mode_name,
                    }
                    : null,
                purchase_date: subscription.purchase_date,
                plan_billing_id: subscription.plan_billing_id,
                auto_renewal: subscription.auto_renewal,
                features,
                services,
                plan_cycle: subscription.plan_billing_id,
                billing_id: subscription.sub_billing_id,
                order_id: subscription.sub_order_id,
                is_active_subscription: subscription.is_activated,
            };
        }
        catch (error) {
            console.error('Error fetching subscription details by org:', error);
            throw new Error('Failed to fetch subscription details');
        }
    }
    async getAllPaymentModes() {
        try {
            return await this.paymentModeRepository.find({
                where: { is_deleted: false },
                order: { payment_mode_id: 'ASC' },
            });
        }
        catch (error) {
            throw new Error('Error fetching payment modes: ' + error.message);
        }
    }
    async createOfflinePaymentRequest(userId) {
        const subscription = await this.subscriptionRepository.findOne({
            where: { created_by: userId, is_active: true },
            relations: ['billingInfo', 'plan'],
        });
        if (!subscription) {
            throw new Error('No active subscription found for this user');
        }
        const user = await this.billinguserRepo.findOne({
            where: { user_id: userId },
        });
        if (!user) {
            throw new Error('User not found');
        }
        let billing = subscription.billingInfo?.[0];
        if (!billing) {
            billing = this.billingInfoRepository.create({
                org_subscription_id: subscription.subscription_id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.business_email,
                phone_number: user.phone_number,
                methodId: 5,
                created_at: new Date(),
                updated_at: new Date(),
            });
            billing = await this.billingInfoRepository.save(billing);
        }
        const offlineRequest = this.offlinePaymentRepo.create({
            subscription_id: subscription.subscription_id,
            billing_id: billing.billing_id,
            plan_id: subscription.plan_id,
            amount: subscription.grand_total,
            currency: 'RS',
            status: 'pending',
            created_by: userId,
        });
        return await this.offlinePaymentRepo.save(offlineRequest);
    }
    async createPayment(payload) {
        const { subscriptionId, billingData, transactionData } = payload;
        const subscription = await this.subscriptionRepository.findOne({
            where: { subscription_id: subscriptionId },
        });
        if (!subscription)
            throw new common_1.NotFoundException('Subscription not found');
        const billingInfo = this.billingInfoRepository.create({
            ...billingData,
            orgSubscription: subscription,
            methodId: 1,
        });
        await this.billingInfoRepository.save(billingInfo);
        const paymentTransaction = this.paymentTransactionRepository.create({
            ...transactionData,
            orgSubscription: subscription,
            payment_method: 1,
            methodId: 1,
            transaction_status: 'success',
            paid_at: new Date(),
        });
        await this.paymentTransactionRepository.save(paymentTransaction);
        return { billingInfo, paymentTransaction };
    }
    async getAllUsers(page = 1, limit = 10, search, status) {
        try {
            const query = this.dataSource
                .getRepository(organizational_user_entity_1.User)
                .createQueryBuilder('users')
                .leftJoinAndSelect('users.user_role', 'user_role')
                .where('users.is_deleted = 0');
            if (search) {
                query.andWhere('(users.first_name ILIKE :search OR users.last_name ILIKE :search OR users.users_business_email ILIKE :search)', { search: `%${search}%` });
            }
            if (status) {
                if (status === 'Active')
                    query.andWhere('users.is_active = :isActive', { isActive: 1 });
                if (status === 'Inactive')
                    query.andWhere('users.is_active = :isActive', { isActive: 0 });
            }
            const skip = (page - 1) * limit;
            const [result, total] = await query
                .orderBy('users.first_name', 'ASC')
                .skip(skip)
                .take(limit)
                .getManyAndCount();
            const cleanedData = result.map((user) => ({
                userId: user.user_id,
                firstName: user.first_name,
                lastName: user.last_name,
                email: user.users_business_email,
                status: user.is_active === 1 ? 'Active' : 'Inactive',
                role: user.user_role?.role_name || null,
            }));
            return {
                message: 'Users fetched successfully',
                total,
                data: cleanedData,
            };
        }
        catch (error) {
            console.error('Error fetching users:', error);
            throw new common_1.BadRequestException(`Error fetching Users: ${error.message}`);
        }
    }
    async getAllUsersWithOrganization(page, limit, search, status) {
        try {
            const qb = this.billinguserRepo
                .createQueryBuilder('user')
                .leftJoinAndSelect('user.organization', 'organization');
            if (status === 'Active')
                qb.andWhere('user.is_active = :active', { active: 1 });
            else if (status === 'Inactive')
                qb.andWhere('user.is_active = :active', { active: 0 });
            else
                qb.andWhere('user.is_deleted = :deleted', { deleted: 0 });
            if (search) {
                qb.andWhere('(LOWER(user.first_name) LIKE :search OR LOWER(user.last_name) LIKE :search OR LOWER(user.business_email) LIKE :search OR LOWER(organization.organization_name) LIKE :search)', { search: `%${search.toLowerCase()}%` });
            }
            qb.orderBy('user.first_name', 'ASC')
                .skip((page - 1) * limit)
                .take(limit);
            const [users, total] = await qb.getManyAndCount();
            const mappedUsers = users.map((user) => ({
                userId: user.user_id,
                firstName: user.first_name,
                lastName: user.last_name,
                email: user.business_email,
                phoneNumber: user.phone_number,
                isPrimaryUser: user.is_primary_user,
                organization: {
                    organizationId: user.organization?.organization_id,
                    organizationName: user.organization?.organization_name,
                    schemaName: user.organization?.organization_schema_name,
                    industryId: user.organization?.industry_type_id,
                },
                status: user.is_active ? 'Active' : 'Inactive',
            }));
            return {
                data: mappedUsers,
                total,
                success: true,
                currentPage: page,
                pageSize: limit,
            };
        }
        catch (error) {
            console.error('Error fetching users with organization:', error);
            throw new common_1.BadRequestException(`Error fetching users: ${error.message}`);
        }
    }
    async getOrgLimitations(orgId) {
        try {
            console.log('getOrgLimitations triggered:');
            const limitations = await this.orgFeatureOverrideRepository
                .createQueryBuilder('override')
                .leftJoin('override.feature', 'feature')
                .leftJoin('override.mapping', 'mapping')
                .addSelect([
                'feature.feature_id',
                'feature.feature_name',
                'feature.description',
                'mapping.mapping_id',
            ])
                .where('override.org_id = :orgId', { orgId })
                .andWhere('override.is_active = true')
                .andWhere('override.is_deleted = false')
                .distinctOn(['feature.feature_id'])
                .orderBy('feature.feature_id', 'ASC')
                .addOrderBy('override.created_at', 'DESC')
                .getMany();
            const formatted = limitations.map((item) => ({
                override_id: item.override_id,
                org_id: item.org_id,
                plan_id: item.plan_id,
                feature_id: item.feature_id,
                feature_name: item.feature?.feature_name || null,
                description: item.feature?.description || null,
                mapping_id: item.mapping_id,
                default_value: item.default_value,
                override_value: item.override_value,
                is_active: item.is_active,
                created_at: item.created_at,
                updated_at: item.updated_at,
            }));
            return formatted;
        }
        catch (error) {
            console.error('❌ Error fetching org limitations:', error);
            throw new Error('Failed to fetch organization limitations');
        }
    }
    async initializeOrgSetupProgress(organizationId) {
        try {
            const tasks = await this.setupTaskRepository
                .createQueryBuilder('task')
                .select(['task.id', 'task.title'])
                .orderBy('task.id', 'ASC')
                .getMany();
            if (!tasks.length) {
                return [];
            }
            await this.dataSource.query(`
      INSERT INTO onboarding_engine.organization_setup_progress (
        organization_id,
        task_id,
        status
      )
      SELECT
        $1,
        t.id,
        'PENDING'::onboarding_engine.setup_task_status
      FROM onboarding_engine.setup_tasks t
      ON CONFLICT (organization_id, task_id) DO NOTHING
      `, [organizationId]);
            const progress = await this.dataSource.query(`
      SELECT
        osp.id,
        osp.organization_id,
        osp.task_id,
        st.title,
        osp.status,
        osp.completed_by,
        osp.completed_at,
        osp.created_at
      FROM onboarding_engine.organization_setup_progress osp
      LEFT JOIN onboarding_engine.setup_tasks st
        ON st.id = osp.task_id
      WHERE osp.organization_id = $1
      ORDER BY osp.task_id ASC
      `, [organizationId]);
            return progress;
        }
        catch (error) {
            console.error('❌ Error initializing organization setup progress:', error);
            throw new Error('Failed to initialize organization setup progress');
        }
    }
    async getAssetRestrictions(orgId) {
        try {
            const limitations = await this.orgFeatureOverrideRepository
                .createQueryBuilder('override')
                .leftJoin('override.feature', 'feature')
                .leftJoin('override.mapping', 'mapping')
                .addSelect([
                'feature.feature_id',
                'feature.feature_name',
                'feature.description',
                'feature.set_limit',
                'mapping.mapping_id',
            ])
                .where('override.org_id = :orgId', { orgId })
                .andWhere('override.is_active = true')
                .andWhere('override.is_deleted = false')
                .distinctOn(['feature.feature_id'])
                .orderBy('feature.feature_id', 'ASC')
                .addOrderBy('override.created_at', 'DESC')
                .getMany();
            const formatted = limitations.map((item) => {
                let value = item.override_value;
                if (typeof value === 'string') {
                    const lower = value.toLowerCase();
                    if (lower === 'true' || lower === 'false') {
                        value = lower === 'true';
                    }
                    else if (!isNaN(Number(value))) {
                        value = Number(value);
                    }
                }
                let currentUsage = item.currentUsage;
                if (typeof currentUsage === 'string') {
                    const lower = currentUsage.toLowerCase?.();
                    if (lower === 'true' || lower === 'false')
                        currentUsage = lower === 'true';
                    else if (!isNaN(Number(currentUsage)))
                        currentUsage = Number(currentUsage);
                }
                let limitReached = false;
                if (typeof value === 'number' && typeof currentUsage === 'number') {
                    limitReached = currentUsage >= value;
                }
                return {
                    feature_id: item.feature_id,
                    feature_name: item.feature?.feature_name || null,
                    description: item.feature?.description || null,
                    set_limit: item.feature?.set_limit || null,
                    value,
                    default_value: item.default_value,
                    current_usage: item.currentUsage,
                    limit_reached: limitReached,
                };
            });
            return formatted;
        }
        catch (error) {
            console.error('❌ Error fetching org limitations:', error);
            throw new Error('Failed to fetch organization limitations');
        }
    }
    async getRestrictionByFeatureId(orgId, featureId) {
        try {
            const override = await this.orgFeatureOverrideRepository
                .createQueryBuilder('override')
                .leftJoin('override.feature', 'feature')
                .addSelect([
                'feature.feature_id',
                'feature.feature_name',
                'feature.description',
            ])
                .where('override.org_id = :orgId', { orgId })
                .andWhere('feature.feature_id = :featureId', { featureId })
                .andWhere('override.is_active = true')
                .andWhere('override.is_deleted = false')
                .orderBy('override.created_at', 'DESC')
                .getOne();
            if (!override)
                return null;
            let value = override.override_value;
            if (typeof value === 'string') {
                const lower = value.toLowerCase();
                if (lower === 'true' || lower === 'false')
                    value = lower === 'true';
                else if (!isNaN(Number(value)))
                    value = Number(value);
            }
            let currentUsage = override.currentUsage;
            if (typeof currentUsage === 'string') {
                const lower = currentUsage.toLowerCase?.();
                if (lower === 'true' || lower === 'false')
                    currentUsage = lower === 'true';
                else if (!isNaN(Number(currentUsage)))
                    currentUsage = Number(currentUsage);
            }
            let limitReached = false;
            if (typeof value === 'number' && typeof currentUsage === 'number') {
                limitReached = currentUsage >= value;
            }
            return {
                feature_id: override.feature?.feature_id || null,
                feature_name: override.feature?.feature_name || null,
                description: override.feature?.description || null,
                value,
                default_value: override.default_value,
                current_usage: override.currentUsage,
                limit_reached: limitReached,
            };
        }
        catch (error) {
            console.error('❌ Error fetching feature restriction:', error);
            throw new Error('Failed to fetch feature restriction');
        }
    }
    async updateUsageCount(orgId, featureId, currentValue) {
        const existing = await this.orgFeatureOverrideRepository.findOne({
            where: {
                org_id: orgId,
                feature_id: featureId,
                is_deleted: false,
            },
        });
        if (!existing) {
            throw new common_1.NotFoundException(`Limitation not found for orgId ${orgId} and featureId ${featureId}`);
        }
        let newUsageValue = 0;
        const oldUsage = Number(existing.currentUsage) || 0;
        if (currentValue.startsWith('increment')) {
            const parts = currentValue.split(':');
            const incrementBy = parts[1] ? parseInt(parts[1], 10) || 1 : 1;
            newUsageValue = oldUsage + incrementBy;
        }
        else if (currentValue.startsWith('decrement')) {
            const parts = currentValue.split(':');
            const decrementBy = parts[1] ? parseInt(parts[1], 10) || 1 : 1;
            newUsageValue = Math.max(0, oldUsage - decrementBy);
        }
        else if (!isNaN(Number(currentValue))) {
            newUsageValue = Number(currentValue);
        }
        else {
            newUsageValue = currentValue;
        }
        existing.currentUsage = String(newUsageValue);
        existing.updated_at = new Date();
        const saved = await this.orgFeatureOverrideRepository.save(existing);
        return {
            orgId,
            featureId,
            currentUsage: saved.currentUsage,
            updatedAt: saved.updated_at,
        };
    }
    async sendEnquiryMail(dto) {
        try {
            const orgName = 'Norbik Sales Team';
            const mailTo = 'dhanshree.konde@spitsolutions.com';
            const baseApiUrl = process.env.BILLING_API_URL;
            const encodedData = encodeURIComponent(JSON.stringify(dto));
            const convertToEnquiryUrl = `${baseApiUrl}/organizational-profile/convert-enquiry?data=${encodedData}`;
            console.log('👉 company_name:', dto.company_name);
            const mailContent = await (0, render_email_1.renderEmail)(render_email_1.EmailTemplate.SALES_ENQUIRY, {
                name: `${dto.first_name} ${dto.last_name}`,
                email: dto.email,
                phone: dto.phone,
                companyName: dto.company_name,
                jobTitle: dto.job_title,
                requirements: dto.requirements,
                message: dto.message,
                companySize: dto.company_size_id,
                industry: dto.industry_id,
                budgetRange: dto.budget_range_id,
                timeline: dto.implementation_timeline_id,
                companySizeLabel: dto.company_size_value,
                industryLabel: dto.industry_value,
                budgetRangeLabel: dto.budget_range_value,
                timelineLabel: dto.implementation_timeline_value,
                mailReply: dto.email,
                convertToEnquiryUrl,
            }, this.mailConfigService);
            await this.mailService.sendEmail(mailTo, `New Sales Enquiry from ${dto.first_name} ${dto.last_name}`, mailContent);
            return { sent: true };
        }
        catch (error) {
            console.error('❌ Error in sendEnquiryMail:', error);
            throw new common_1.HttpException('Failed to send enquiry mail', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async createContactSalesRequest(createDto) {
        const newRequest = this.contactSalesRepo.create({
            ...createDto,
            status: createDto.status || 'Pending',
            is_active: true,
            is_deleted: false,
        });
        return await this.contactSalesRepo.save(newRequest);
    }
    async createTicket(dto) {
        try {
            const ticket = this.supportTicketRepo.create({
                orgId: dto.orgId,
                supportTicketId: dto.supportTicketId,
                name: dto.userName,
                email: dto.email,
                subject: dto.subject,
                category: dto.category,
                priority: dto.priority,
                description: dto.description,
                userId: dto.userId,
                attachments: dto.attachments || [],
                status: support_entity_1.SupportTicketStatus.OPEN,
                is_active: 1,
                is_deleted: 0,
            });
            await this.supportTicketRepo.save(ticket);
        }
        catch (error) {
            console.error('Error saving billing support ticket:', error);
            throw new Error('Failed to create billing support ticket');
        }
    }
    async getOrganizationDetails() {
        const organization = await this.organizationRepository.findOne({
            where: {
                isActive: true,
            },
        });
        if (!organization) {
            throw new common_1.NotFoundException('Organization information not found');
        }
        return organization;
    }
};
exports.OrganizationService = OrganizationService;
exports.OrganizationService = OrganizationService = __decorate([
    (0, common_1.Injectable)(),
    __param(5, (0, typeorm_1.InjectRepository)(organizational_user_entity_1.User)),
    __param(6, (0, typeorm_1.InjectRepository)(register_user_login_entity_1.RegisterUserLogin)),
    __param(7, (0, typeorm_1.InjectRepository)(register_organization_entity_1.RegisterOrganization)),
    __param(8, (0, typeorm_1.InjectRepository)(public_billing_portal_user_entity_1.BillingPortalUser)),
    __param(9, (0, typeorm_1.InjectRepository)(organizational_vendors_entity_1.OrganizationVendors)),
    __param(10, (0, typeorm_1.InjectRepository)(branches_entity_1.Branch)),
    __param(11, (0, typeorm_1.InjectRepository)(department_entity_1.Department)),
    __param(12, (0, typeorm_1.InjectRepository)(roles_entity_1.Roles)),
    __param(13, (0, typeorm_1.InjectRepository)(roles_permission_entity_1.RolesPermission)),
    __param(14, (0, typeorm_1.InjectRepository)(designations_entity_1.Designations)),
    __param(15, (0, typeorm_1.InjectRepository)(locations_entity_1.Locations)),
    __param(16, (0, typeorm_1.InjectRepository)(pincode_entity_1.Pincodes)),
    __param(17, (0, typeorm_1.InjectRepository)(plan_entity_1.Plan)),
    __param(18, (0, typeorm_1.InjectRepository)(org_subscription_entity_1.OrgSubscription)),
    __param(19, (0, typeorm_1.InjectRepository)(plan_feature_mapping_entity_1.PlanFeatureMapping)),
    __param(20, (0, typeorm_1.InjectRepository)(payment_mode_entity_1.PaymentMode)),
    __param(21, (0, typeorm_1.InjectRepository)(billing_info_entity_1.BillingInfo)),
    __param(22, (0, typeorm_1.InjectRepository)(offline_payment_requests_entity_1.OfflinePaymentRequest)),
    __param(23, (0, typeorm_1.InjectRepository)(payment_transaction_entity_1.PaymentTransaction)),
    __param(24, (0, typeorm_1.InjectRepository)(org_feature_overrides_entity_1.OrgFeatureOverride)),
    __param(25, (0, typeorm_1.InjectRepository)(contact_sales_requests_entity_1.ContactSalesRequest)),
    __param(26, (0, typeorm_1.InjectRepository)(plan_services_mapping_entity_1.PlanServiceMapping)),
    __param(27, (0, typeorm_1.InjectRepository)(support_entity_1.SupportTicket)),
    __param(28, (0, typeorm_1.InjectRepository)(setup_task_entity_1.SetupTask)),
    __param(29, (0, typeorm_1.InjectRepository)(organization_information_entity_1.OrganizationInformation)),
    __metadata("design:paramtypes", [typeorm_2.DataSource,
        database_service_1.DatabaseService,
        mail_service_1.MailService,
        mail_config_service_1.MailConfigService,
        auth_service_1.AuthService,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], OrganizationService);
