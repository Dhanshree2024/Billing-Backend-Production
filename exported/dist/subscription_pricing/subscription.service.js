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
exports.SubscriptionService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const rxjs_1 = require("rxjs");
const mail_service_1 = require("../common/mail/mail.service");
const render_email_1 = require("../common/mail/render-email");
const org_overrides_entity_1 = require("../organization_register/entities/org_overrides.entity");
const register_organization_entity_1 = require("../organization_register/entities/register-organization.entity");
const register_user_login_entity_1 = require("../organization_register/entities/register-user-login.entity");
const typeorm_2 = require("typeorm");
const mail_config_service_1 = require("../common/mail/mail-config.service");
const org_feature_overrides_entity_1 = require("../subscription_pricing/entity/org_feature_overrides.entity");
const billing_info_entity_1 = require("./entity/billing_info.entity");
const feature_entity_1 = require("./entity/feature.entity");
const offline_payment_requests_entity_1 = require("./entity/offline_payment_requests.entity");
const org_feature_override_logs_entity_1 = require("./entity/org_feature_override_logs.entity");
const org_subscription_entity_1 = require("./entity/org_subscription.entity");
const payment_methods_entity_1 = require("./entity/payment_methods.entity");
const payment_mode_entity_1 = require("./entity/payment_mode.entity");
const payment_transaction_entity_1 = require("./entity/payment_transaction.entity");
const plan_billing_entity_1 = require("./entity/plan-billing.entity");
const plan_feature_mapping_entity_1 = require("./entity/plan-feature-mapping.entity");
const plan_entity_1 = require("./entity/plan.entity");
const plan_setting_entity_1 = require("./entity/plan_setting.entity");
const product_entity_1 = require("./entity/product.entity");
const renewal_entity_1 = require("./entity/renewal.entity");
const subscription_log_entity_1 = require("./entity/subscription-log.entity");
const subscription_type_entity_1 = require("./entity/subscription-type.entity");
const bcrypt = __importStar(require("bcrypt"));
const AdminDefaultPermission_1 = require("../organization_register/default_permissions/AdminDefaultPermission");
const UserDefaultPermission_1 = require("../organization_register/default_permissions/UserDefaultPermission");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const activity_log_service_1 = require("../activity-log/activity-log.service");
const notification_helper_1 = require("../common/notifications/notification.helper");
const error_handler_util_1 = require("../common/utils/error-handler.util");
const location_util_1 = require("../location/utils/location.util");
const assetfieldcategory_1 = require("../organization_register/onboarding_sql_scripts/assetfieldcategory");
const assetitemfieldmapping_1 = require("../organization_register/onboarding_sql_scripts/assetitemfieldmapping");
const assetitemfields_1 = require("../organization_register/onboarding_sql_scripts/assetitemfields");
const assetitemrelations_1 = require("../organization_register/onboarding_sql_scripts/assetitemrelations");
const assetmapping_1 = require("../organization_register/onboarding_sql_scripts/assetmapping");
const assetOwnershipstatsutypes_1 = require("../organization_register/onboarding_sql_scripts/assetOwnershipstatsutypes");
const assets_1 = require("../organization_register/onboarding_sql_scripts/assets");
const assetstatsutypes_1 = require("../organization_register/onboarding_sql_scripts/assetstatsutypes");
const assetworkingstatus_1 = require("../organization_register/onboarding_sql_scripts/assetworkingstatus");
const branches_1 = require("../organization_register/onboarding_sql_scripts/branches");
const category_1 = require("../organization_register/onboarding_sql_scripts/category");
const departments_1 = require("../organization_register/onboarding_sql_scripts/departments");
const designation_1 = require("../organization_register/onboarding_sql_scripts/designation");
const items_1 = require("../organization_register/onboarding_sql_scripts/items");
const licencetypes_1 = require("../organization_register/onboarding_sql_scripts/licencetypes");
const organization_permissions_1 = require("../organization_register/onboarding_sql_scripts/organization_permissions");
const organization_profile_1 = require("../organization_register/onboarding_sql_scripts/organization_profile");
const organization_roles_1 = require("../organization_register/onboarding_sql_scripts/organization_roles");
const stocks_1 = require("../organization_register/onboarding_sql_scripts/stocks");
const stockserial_1 = require("../organization_register/onboarding_sql_scripts/stockserial");
const subcategory_1 = require("../organization_register/onboarding_sql_scripts/subcategory");
const transferhistory_1 = require("../organization_register/onboarding_sql_scripts/transferhistory");
const users_1 = require("../organization_register/onboarding_sql_scripts/users");
const venders_1 = require("../organization_register/onboarding_sql_scripts/venders");
const activity_log_entity_1 = require("../organizational-profile/public_schema_entity/activity-log.entity");
const contact_sales_requests_entity_1 = require("./entity/contact_sales_requests.entity");
const support_entity_1 = require("./entity/support.entity");
const pdf_service_1 = require("./pdf.service");
const HrmsOrganisationSchemaManager_1 = require("./utils/HrmsOrganisationSchemaManager");
const OrganisationSchemaManager_1 = require("./utils/OrganisationSchemaManager");
let SubscriptionService = class SubscriptionService {
    constructor(activityLogService, pdfService, featureRepository, planBillingRepository, planFeatureMappingRepository, planRepository, orgsubscriptionTypeRepository, subscriptionRepository, subscriptionLogRepository, pricingOverrideRepo, publicOverrideRepo, orgRepo, featureOverrideLogs, billingInfoRepository, paymentTransactionRepository, planSettingRepo, offlinePaymentRepo, registerUser, paymentMethod, paymentModeRepository, productRepository, renewalStatusRepository, salesrequestsRepository, supportTicketRepo, dataSource, mailConfigService, mailService, httpService, notificationHelper) {
        this.activityLogService = activityLogService;
        this.pdfService = pdfService;
        this.featureRepository = featureRepository;
        this.planBillingRepository = planBillingRepository;
        this.planFeatureMappingRepository = planFeatureMappingRepository;
        this.planRepository = planRepository;
        this.orgsubscriptionTypeRepository = orgsubscriptionTypeRepository;
        this.subscriptionRepository = subscriptionRepository;
        this.subscriptionLogRepository = subscriptionLogRepository;
        this.pricingOverrideRepo = pricingOverrideRepo;
        this.publicOverrideRepo = publicOverrideRepo;
        this.orgRepo = orgRepo;
        this.featureOverrideLogs = featureOverrideLogs;
        this.billingInfoRepository = billingInfoRepository;
        this.paymentTransactionRepository = paymentTransactionRepository;
        this.planSettingRepo = planSettingRepo;
        this.offlinePaymentRepo = offlinePaymentRepo;
        this.registerUser = registerUser;
        this.paymentMethod = paymentMethod;
        this.paymentModeRepository = paymentModeRepository;
        this.productRepository = productRepository;
        this.renewalStatusRepository = renewalStatusRepository;
        this.salesrequestsRepository = salesrequestsRepository;
        this.supportTicketRepo = supportTicketRepo;
        this.dataSource = dataSource;
        this.mailConfigService = mailConfigService;
        this.mailService = mailService;
        this.httpService = httpService;
        this.notificationHelper = notificationHelper;
    }
    async createSubscriptionType(dto, loginUserId) {
        const existingType = await this.orgsubscriptionTypeRepository.findOne({
            where: {
                type_name: dto.typeName,
            },
        });
        if (existingType) {
            throw new Error('A subscription type with the same name already exists.');
        }
        console.log('existingType:', existingType);
        const type = this.orgsubscriptionTypeRepository.create({
            type_name: dto.typeName,
            description: dto.description || '',
            created_by: loginUserId,
        });
        return this.orgsubscriptionTypeRepository.save(type);
    }
    async getAllSubscriptionTypes() {
        try {
            return await this.orgsubscriptionTypeRepository.find({
                order: { type_id: 'ASC' },
            });
        }
        catch (error) {
            error_handler_util_1.ErrorHandler.log('Error fetching subscriptions', error);
            error_handler_util_1.ErrorHandler.throwInternalServerError(error, 'Error fetching subscriptions');
        }
    }
    async createPlan(payload) {
        const { plan_name, description, billing_cycle, price, subscription_type, product_id, set_trial, trial_period, trial_period_count, } = payload;
        const existing = await this.planRepository.findOne({
            where: { plan_name },
        });
        if (existing) {
            throw new common_1.BadRequestException('Plan with this name already exists');
        }
        const plan = this.planRepository.create({
            plan_name,
            description,
            is_active: true,
            productId: product_id,
            set_trial,
            trial_period_unit: trial_period,
            trial_period_count,
        });
        const savedPlan = await this.planRepository.save(plan);
        const billing = this.planBillingRepository.create({
            billing_cycle,
            price,
            plan: savedPlan,
            subscription_type_id: subscription_type,
        });
        await this.planBillingRepository.save(billing);
        return savedPlan;
    }
    async updatePlan(plan_id, payload) {
        const { plan_name, description, billing_cycle, price, subscription_type, product_id, set_trial, trial_period, trial_period_count, } = payload;
        const plan = await this.planRepository.findOne({ where: { plan_id } });
        if (!plan) {
            throw new common_1.NotFoundException('Plan not found');
        }
        Object.assign(plan, {
            plan_name,
            description,
            productId: product_id,
            set_trial,
            trial_period_unit: payload.trial_period,
            trial_period_count: payload.trial_period_count,
        });
        const updatedPlan = await this.planRepository.save(plan);
        let billing = await this.planBillingRepository.findOne({
            where: { plan: { plan_id }, billing_cycle },
        });
        if (billing) {
            billing.price = price;
        }
        else {
            billing = this.planBillingRepository.create({
                billing_cycle,
                price,
                plan: updatedPlan,
                subscription_type_id: subscription_type,
            });
        }
        await this.planBillingRepository.save(billing);
        return updatedPlan;
    }
    async getPlanDetailsById(plan_id) {
        try {
            const plan = await this.planRepository.findOne({
                where: { plan_id, is_active: true },
                relations: ['billings', 'billings.subscriptionType', 'product'],
            });
            if (!plan) {
                throw new Error('Plan not found');
            }
            return {
                plan_id: plan.plan_id,
                plan_name: plan.plan_name,
                description: plan.description,
                is_active: plan.is_active,
                created_at: plan.created_at,
                updated_at: plan.updated_at,
                product: plan.product,
                isTrial: plan.set_trial,
                trial_period: plan.trial_period_unit,
                trial_period_count: plan.trial_period_count,
                billings: plan.billings.map((b) => ({
                    billing_id: b.billing_id,
                    billing_cycle: b.billing_cycle,
                    price: b.price,
                    discounted_percentage: b.discounted_percentage,
                    subscriptionType: {
                        type_id: b.subscriptionType?.type_id,
                        type_name: b.subscriptionType?.type_name,
                    },
                    created_at: b.created_at,
                    updated_at: b.updated_at,
                })),
            };
        }
        catch (error) {
            console.error('Error fetching plan details:', error);
            throw new Error('Failed to fetch plan details');
        }
    }
    async deletePlan(id) {
        try {
            const plan = await this.planRepository.findOne({
                where: { plan_id: id },
            });
            if (!plan) {
                throw new Error('Plan not found');
            }
            plan.is_active = false;
            plan.is_deleted = true;
            await this.planRepository.save(plan);
        }
        catch (error) {
            console.error('Error deleting plan:', error);
            throw new Error('Failed to delete plan');
        }
    }
    async getAllPlanDetails() {
        try {
            return await this.planRepository.find({
                order: { plan_id: 'ASC' },
            });
        }
        catch (error) {
            error_handler_util_1.ErrorHandler.log('Error fetching plan details', error);
            error_handler_util_1.ErrorHandler.throwInternalServerError(error, 'Error fetching plan details');
        }
    }
    async getBillingDetailsByPlanId(plan_id) {
        try {
            const billingDetails = await this.planBillingRepository
                .createQueryBuilder('plan_billing')
                .leftJoinAndSelect('plan_billing.plan', 'plan')
                .where('plan.plan_id = :plan_id', { plan_id })
                .orderBy('plan_billing.billing_cycle', 'ASC')
                .getMany();
            return billingDetails;
        }
        catch (error) {
            console.error('Error fetching billing cycle details:', error);
            throw new Error('Failed to fetch billing cycle details');
        }
    }
    async getAllBillingCycles() {
        try {
            const billingCycles = await this.planBillingRepository
                .createQueryBuilder('plan_billing')
                .leftJoinAndSelect('plan_billing.plan', 'plan')
                .orderBy('plan_billing.plan', 'ASC')
                .addOrderBy('plan_billing.billing_cycle', 'ASC')
                .getMany();
            return billingCycles;
        }
        catch (error) {
            console.error('Error fetching all billing cycles:', error);
            throw new Error('Failed to fetch all billing cycles');
        }
    }
    async getBillingEntryById(billing_id) {
        try {
            const billingEntry = await this.planBillingRepository
                .createQueryBuilder('plan_billing')
                .leftJoinAndSelect('plan_billing.plan', 'plan')
                .where('plan_billing.billing_id = :billing_id', { billing_id })
                .getOne();
            return billingEntry;
        }
        catch (error) {
            console.error('Error fetching billing entry:', error);
            throw new Error('Failed to fetch billing entry');
        }
    }
    async getFeaturesByPlanId(plan_id) {
        try {
            const features = await this.planFeatureMappingRepository
                .createQueryBuilder('plan_feature_mappings')
                .leftJoinAndSelect('plan_feature_mappings.plan', 'plan')
                .leftJoinAndSelect('plan_feature_mappings.feature', 'feature')
                .where('plan.plan_id = :plan_id', { plan_id })
                .orderBy('feature.feature_name', 'ASC')
                .getMany();
            return features;
        }
        catch (error) {
            console.error('Error fetching features by plan_id:', error);
            throw new Error('Failed to fetch plan features');
        }
    }
    async getFeatureMappingsByPlanId(plan_id) {
        try {
            const features = await this.planFeatureMappingRepository
                .createQueryBuilder('mapping')
                .leftJoinAndSelect('mapping.feature', 'feature')
                .where('mapping.plan = :plan_id', { plan_id })
                .orderBy('feature.feature_name', 'ASC')
                .getMany();
            return features;
        }
        catch (error) {
            console.error('Error fetching features for plan:', error);
            throw new Error('Failed to fetch features for the plan');
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
    async createOrgSubscription(payload, loginUserId) {
        const { organization_profile_id, plan_id, subscription_type_id, payment_status, payment_mode, purchase_date, } = payload;
        await this.subscriptionRepository.update({
            organization_profile_id,
            is_active: true,
            is_deleted: false,
        }, {
            is_active: false,
            is_deleted: true,
        });
        const plan = await this.planRepository.findOne({
            where: { plan_id },
            relations: ['billings'],
        });
        if (!plan) {
            throw new common_1.NotFoundException('Plan not found');
        }
        const billing = plan.billings?.[0];
        if (!billing) {
            throw new common_1.NotFoundException('Billing info not found for plan');
        }
        const price = +billing.price;
        const discountPercentage = billing.discounted_percentage ?? 0;
        const discounted_price = discountPercentage > 0
            ? +(price - (price * discountPercentage) / 100).toFixed(2)
            : null;
        const grand_total = discounted_price ?? price;
        const start_date = new Date(purchase_date);
        const renewal_date = new Date(start_date);
        renewal_date.setFullYear(start_date.getFullYear() + 1);
        const orgSub = this.subscriptionRepository.create({
            organization_profile_id,
            plan_id,
            billing_id: billing.billing_id,
            subscription_type_id,
            start_date,
            renewal_date,
            payment_status,
            payment_mode,
            purchase_date,
            price,
            discounted_price,
            grand_total,
        });
        const savedSub = await this.subscriptionRepository.save(orgSub);
        await this.logSubscriptionChange(savedSub.subscription_id, organization_profile_id, 'create', loginUserId, null, savedSub, 'New subscription created');
        return savedSub;
    }
    async getSubscriptionDetailsById(subscription_id) {
        try {
            const subscription = await this.subscriptionRepository
                .createQueryBuilder('sub')
                .leftJoinAndSelect('sub.plan', 'plan')
                .leftJoinAndSelect('sub.organization', 'org')
                .leftJoinAndSelect('org.users', 'users')
                .leftJoinAndSelect('sub.subscriptionType', 'subscriptionType')
                .leftJoinAndSelect('sub.billingInfo', 'billing')
                .leftJoinAndSelect('sub.reseller', 'reseller')
                .leftJoinAndSelect('billing.paymentMethod', 'billingMethod')
                .leftJoinAndSelect('sub.paymentTransactions', 'payment')
                .leftJoinAndSelect('sub.product', 'product')
                .where('sub.subscription_id = :subscription_id', { subscription_id })
                .andWhere('sub.is_active = :isActive', { isActive: true })
                .getOne();
            if (!subscription) {
                throw new Error('Subscription not found');
            }
            const billing = subscription.billingInfo?.[0]
                ? {
                    first_name: subscription.billingInfo[0].first_name,
                    last_name: subscription.billingInfo[0].last_name,
                    email: subscription.billingInfo[0].email,
                    phone_number: subscription.billingInfo[0].phone_number,
                    method: subscription.billingInfo[0].paymentMethod?.methodName || null,
                    same_as_primary_contact: subscription.billingInfo[0].same_as_primary_contact,
                    orderplacedby: subscription.billingInfo[0].orderplacedby,
                    paymentterm: subscription.billingInfo[0].paymentterm,
                    customerpo: subscription.billingInfo[0].customerpo,
                }
                : null;
            const featureMappings = await this.planFeatureMappingRepository
                .createQueryBuilder('mapping')
                .leftJoinAndSelect('mapping.feature', 'feature')
                .where('mapping.plan = :plan_id', { plan_id: subscription.plan_id })
                .orderBy('feature.feature_name', 'ASC')
                .getMany();
            const features = featureMappings.map((mapping) => ({
                feature_id: mapping.feature?.feature_id,
                feature_name: mapping.feature?.feature_name,
                feature_value: mapping.feature_value ?? mapping.feature?.default_value ?? null,
                is_trial: mapping.is_trial,
            }));
            const paymentTransactions = subscription.paymentTransactions?.map((tx) => ({
                transaction_id: tx.transaction_id,
                amount: tx.amount,
                payment_method: tx.payment_method,
            })) || [];
            const limitations = await this.pricingOverrideRepo
                .createQueryBuilder('lim')
                .leftJoinAndSelect('lim.feature', 'feature')
                .where('lim.org_id = :orgId', {
                orgId: subscription.organization_profile_id,
            })
                .andWhere('lim.is_active = :active', { active: true })
                .getMany();
            const featureslimit = limitations.map((lim) => {
                const mapping = featureMappings.find((m) => m.feature?.feature_id === lim.feature_id);
                return {
                    feature_id: lim.feature?.feature_id || mapping?.feature?.feature_id,
                    feature_name: lim.feature?.feature_name || mapping?.feature?.feature_name,
                    feature_value: lim.override_value ??
                        mapping?.feature_value ??
                        mapping?.feature?.default_value ??
                        null,
                    is_trial: mapping?.is_trial ?? false,
                };
            });
            return {
                subscription_id: subscription.subscription_id,
                organization_profile_id: subscription.organization_profile_id,
                organization_name: subscription.organization?.organization_name || null,
                industry_type_id: subscription.organization?.industry_type_id || null,
                users: subscription.organization?.users?.map((u) => ({
                    user_id: u.user_id,
                    first_name: u.first_name,
                    last_name: u.last_name,
                    email: u.business_email,
                    phone: u.phone_number,
                })) || [],
                plan: {
                    plan_id: subscription.plan.plan_id,
                    plan_name: subscription.plan.plan_name,
                },
                billing: billing ?? null,
                subscription_type: subscription.subscriptionType?.type_name ?? null,
                price: subscription.price,
                discounted_price: subscription.discounted_price,
                grand_total: subscription.grand_total,
                start_date: subscription.start_date,
                renewal_date: subscription.renewal_date,
                payment_status: subscription.payment_status,
                payment_mode: subscription.payment_mode,
                purchase_date: subscription.purchase_date,
                billing_cycle: subscription.plan_billing_id,
                is_active: subscription.is_active,
                autoRenewal: subscription.auto_renewal,
                isTrialPeriod: subscription.is_trial_period,
                trialPeriod: subscription.trial_period_unit || '',
                trialPeriodCount: subscription.trial_period_count || '',
                trialStartDate: subscription.trial_start_date || '',
                trialExpiryDate: subscription.trial_expiry_date || '',
                gracePeriod: subscription.grace_period || '',
                plan_billing_id: subscription.plan_billing_id,
                discount: subscription.percentage,
                limitations_features: featureslimit,
                resellerId: subscription.reseller_id,
                features,
                paymentTransactions,
                product_id: subscription.productId,
                product: {
                    product_id: subscription.product?.productId || subscription.productId,
                    product_name: subscription.product?.name || null,
                },
            };
        }
        catch (error) {
            console.error('Error fetching subscription details:', error);
            throw new Error('Failed to fetch subscription details');
        }
    }
    async cancelOrgSubscription(organization_profile_id, subscription_id, loginUserId) {
        const existing = await this.subscriptionRepository.findOne({
            where: {
                subscription_id,
                organization_profile_id,
                is_active: true,
                is_deleted: false,
            },
        });
        console.log('Existing subscription:', existing);
        if (!existing) {
            throw new common_1.NotFoundException('No active subscription found to cancel');
        }
        const result = await this.subscriptionRepository.update({
            subscription_id,
            is_active: true,
            is_deleted: false,
        }, {
            is_active: false,
            is_deleted: true,
        });
        await this.logSubscriptionChange(existing.subscription_id, organization_profile_id, 'cancel', loginUserId, existing, { ...existing, is_active: false, is_deleted: true }, 'Subscription cancelled');
        return 'Subscription cancelled successfully';
    }
    async getOrganizationDetails(organization_id) {
        try {
            const organization = await this.orgRepo.findOne({
                where: { organization_id },
                relations: [
                    'users',
                    'subscriptions',
                    'subscriptions.billingInfo',
                    'subscriptions.billingInfo.paymentMethod',
                    'subscriptions.plan',
                    'subscriptions.subscriptionType',
                ],
            });
            if (!organization) {
                throw new Error('Organization not found');
            }
            const primaryUser = organization.users?.find((u) => u.is_primary_user === 'Y') || null;
            const location = location_util_1.LocationUtil.getLocationDetails(organization);
            const subscriptions = organization.subscriptions?.map((sub) => ({
                subscription_id: sub.subscription_id,
                plan_id: sub.plan_id,
                plan_name: sub.plan?.plan_name || null,
                subscription_type: sub.subscriptionType?.type_name || null,
                price: sub.price,
                discounted_price: sub.discounted_price,
                grand_total: sub.grand_total,
                payment_status: sub.payment_status,
                payment_mode: sub.payment_mode,
                start_date: sub.start_date,
                renewal_date: sub.renewal_date,
                is_trial_period: sub.is_trial_period,
                auto_renewal: sub.auto_renewal,
                is_active: sub.is_active,
                reseller_id: sub.reseller_id,
                billing_type: sub.reseller_id ? 'Reseller' : 'Direct',
                billing: sub.billingInfo?.[0]
                    ? {
                        first_name: sub.billingInfo[0].first_name,
                        last_name: sub.billingInfo[0].last_name,
                        email: sub.billingInfo[0].email,
                        phone_number: sub.billingInfo[0].phone_number,
                        method: sub.billingInfo[0].paymentMethod?.methodName || null,
                        same_as_primary_contact: sub.billingInfo[0].same_as_primary_contact,
                        orderplacedby: sub.billingInfo[0].orderplacedby,
                        paymentterm: sub.billingInfo[0].paymentterm,
                        customerpo: sub.billingInfo[0].customerpo,
                    }
                    : null,
            })) || [];
            return {
                organization_id: organization.organization_id,
                organization_name: organization.organization_name,
                organization_schema_name: organization.organization_schema_name,
                industry_type_id: organization.industry_type_id,
                customer_id: organization.customer_id,
                payment_term: organization.payment_term,
                gst_registered: organization.gst_registered,
                gst_number: organization.gst_number,
                org_code: organization.organization_code,
                street: organization.street,
                landmark: organization.landmark,
                postal_code: organization.postal_code,
                city: organization.city,
                state: organization.state,
                country: organization.country,
                city_name: location.city_name,
                state_name: location.state_name,
                country_name: location.country_name,
                primary_user: primaryUser
                    ? {
                        user_id: primaryUser.user_id,
                        first_name: primaryUser.first_name,
                        last_name: primaryUser.last_name,
                        business_email: primaryUser.business_email,
                        phone_number: primaryUser.phone_number,
                    }
                    : null,
                subscriptions,
            };
        }
        catch (error) {
            console.error('Error fetching organization details:', error);
            throw new Error('Failed to fetch organization details');
        }
    }
    async updateOrgSubscription(subscription_id, dto, organizationId, updatedByUserId) {
        const existing = await this.subscriptionRepository.findOne({
            where: { subscription_id },
        });
        if (!existing) {
            throw new common_1.NotFoundException('Subscription not found');
        }
        const updated = this.subscriptionRepository.merge(existing, {
            ...dto,
            created_by: updatedByUserId,
            updated_at: new Date(),
        });
        const saved = await this.subscriptionRepository.save(updated);
        await this.logSubscriptionChange(subscription_id, organizationId, 'update', updatedByUserId, existing, saved, 'Subscription updated');
        return saved;
    }
    async getSubscriptionHistoryByOrgId(orgId) {
        try {
            const subscriptions = await this.subscriptionRepository
                .createQueryBuilder('sub')
                .leftJoinAndSelect('sub.plan', 'plan')
                .leftJoinAndSelect('sub.subscriptionType', 'subscriptionType')
                .where('sub.organization_profile_id = :orgId', { orgId })
                .orderBy('sub.created_at', 'DESC')
                .getMany();
            const history = await Promise.all(subscriptions.map(async (sub) => {
                const billing = await this.planBillingRepository
                    .createQueryBuilder('billing')
                    .where('billing.billing_id = :billing_id', {
                    billing_id: sub.billing_id,
                })
                    .getOne();
                const featureMappings = await this.planFeatureMappingRepository
                    .createQueryBuilder('mapping')
                    .leftJoinAndSelect('mapping.feature', 'feature')
                    .where('mapping.plan = :plan_id', { plan_id: sub.plan_id })
                    .orderBy('feature.feature_name', 'ASC')
                    .getMany();
                const features = featureMappings.map((mapping) => ({
                    feature_id: mapping.feature?.feature_id,
                    feature_name: mapping.feature?.feature_name,
                    feature_value: mapping.feature_value,
                }));
                return {
                    subscription_id: sub.subscription_id,
                    organization_profile_id: sub.organization_profile_id,
                    plan: {
                        plan_id: sub.plan.plan_id,
                        plan_name: sub.plan.plan_name,
                    },
                    billing: billing ?? null,
                    subscription_type: sub.subscriptionType?.type_name ?? null,
                    price: sub.price,
                    discounted_price: sub.discounted_price,
                    grand_total: sub.grand_total,
                    start_date: sub.start_date,
                    renewal_date: sub.renewal_date,
                    payment_status: sub.payment_status,
                    payment_mode: sub.payment_mode,
                    purchase_date: sub.purchase_date,
                    is_active: sub.is_active,
                    features,
                };
            }));
            return history;
        }
        catch (error) {
            console.error('Error fetching subscription history:', error);
            throw new Error('Failed to fetch subscription history');
        }
    }
    async logSubscriptionChange(subscription_id, orgId, action, performed_by, oldData, newData, remarks) {
        const log = this.subscriptionLogRepository.create({
            subscription_id,
            organization_profile_id: orgId,
            action,
            old_data: oldData || null,
            new_data: newData || null,
            remarks: remarks || '',
            performed_by,
        });
        await this.subscriptionLogRepository.save(log);
    }
    async getSubscriptionLogs(organization_profile_id) {
        return this.subscriptionLogRepository.find({
            where: { organization_profile_id },
            order: { created_at: 'DESC' },
        });
    }
    async updateOverrides(org_id, updates, changedBy) {
        const updatesArray = Array.isArray(updates) ? updates : [updates];
        const result = await this.dataSource.transaction(async (manager) => {
            const updatedPricing = [];
            const updatedPublic = [];
            const logs = [];
            for (const u of updatesArray) {
                let action = 'INSERT';
                let oldValue = null;
                let pricingOverride = await manager
                    .getRepository(org_feature_overrides_entity_1.OrgFeatureOverride)
                    .findOne({
                    where: {
                        org_id,
                        plan_id: u.plan_id,
                        feature_id: u.feature_id,
                        is_deleted: false,
                    },
                });
                if (!pricingOverride) {
                    pricingOverride = manager.getRepository(org_feature_overrides_entity_1.OrgFeatureOverride).create({
                        org_id,
                        plan_id: u.plan_id,
                        feature_id: u.feature_id,
                        mapping_id: u.mapping_id,
                        override_value: u.override_value,
                        default_value: u.default_value,
                        is_active: u.is_active !== undefined ? u.is_active : true,
                        is_deleted: u.is_deleted !== undefined ? u.is_deleted : false,
                    });
                    action = 'INSERT';
                }
                else {
                    oldValue = pricingOverride.override_value;
                    pricingOverride.override_value = u.override_value;
                    pricingOverride.is_active =
                        u.is_active !== undefined ? u.is_active : pricingOverride.is_active;
                    pricingOverride.is_deleted =
                        u.is_deleted !== undefined
                            ? u.is_deleted
                            : pricingOverride.is_deleted;
                    pricingOverride.updated_at = new Date();
                    action = 'UPDATE';
                }
                const savedPricing = await manager
                    .getRepository(org_feature_overrides_entity_1.OrgFeatureOverride)
                    .save(pricingOverride);
                updatedPricing.push(savedPricing);
                const log = manager.getRepository(org_feature_override_logs_entity_1.OrgFeatureOverrideLog).create({
                    override_id: savedPricing.override_id,
                    org_id: savedPricing.org_id,
                    plan_id: savedPricing.plan_id,
                    feature_id: savedPricing.feature_id,
                    mapping_id: savedPricing.mapping_id,
                    old_value: oldValue,
                    new_value: savedPricing.override_value,
                    changed_by: changedBy ?? null,
                    action,
                });
                logs.push(await manager.getRepository(org_feature_override_logs_entity_1.OrgFeatureOverrideLog).save(log));
                let publicOverride = await manager.getRepository(org_overrides_entity_1.OrgOverride).findOne({
                    where: {
                        org_id,
                        plan_id: savedPricing.plan_id,
                        feature_id: savedPricing.feature_id,
                        is_deleted: false,
                    },
                });
                if (!publicOverride) {
                    publicOverride = manager.getRepository(org_overrides_entity_1.OrgOverride).create({
                        override_id: savedPricing.override_id,
                        org_id: savedPricing.org_id,
                        plan_id: savedPricing.plan_id,
                        feature_id: savedPricing.feature_id,
                        mapping_id: savedPricing.mapping_id,
                        override_value: savedPricing.override_value,
                        default_value: savedPricing.default_value,
                        is_active: savedPricing.is_active,
                        is_deleted: savedPricing.is_deleted,
                    });
                }
                else {
                    publicOverride.override_value = savedPricing.override_value;
                    publicOverride.is_active = savedPricing.is_active;
                    publicOverride.is_deleted = savedPricing.is_deleted;
                    publicOverride.updated_at = new Date();
                }
                updatedPublic.push(await manager.getRepository(org_overrides_entity_1.OrgOverride).save(publicOverride));
            }
            return { pricing: updatedPricing, public: updatedPublic, logs };
        });
        const assetApiUrl = `${process.env.ASSET_API_URL}/organization/update-asset-limitations`;
        try {
            const payload = {
                billingOrgId: org_id,
                limitations: updatesArray.map((u) => ({
                    feature_id: u.feature_id,
                    plan_id: u.plan_id,
                    mapping_id: u.mapping_id,
                    override_value: u.override_value,
                    default_value: u.default_value,
                    is_active: u.is_active,
                    is_deleted: u.is_deleted,
                })),
            };
            const assetResponse = await (0, rxjs_1.firstValueFrom)(this.httpService.post(assetApiUrl, payload));
            console.log(`✅ Synced override updates to Asset DB for org ${org_id}:`, assetResponse.data?.message || 'Success');
        }
        catch (err) {
            error_handler_util_1.ErrorHandler.log('Error updating limitations.', err);
            error_handler_util_1.ErrorHandler.throwInternalServerError(err, 'Error updating limitations');
        }
        return result;
    }
    async updateOverrides1(org_id, updates, changedBy) {
        const updatesArray = Array.isArray(updates) ? updates : [updates];
        const result = await this.dataSource.transaction(async (manager) => {
            const updatedPricing = [];
            const updatedPublic = [];
            const logs = [];
            for (const u of updatesArray) {
                let action = 'INSERT';
                let oldValue = null;
                let pricingOverride = await manager
                    .getRepository(org_feature_overrides_entity_1.OrgFeatureOverride)
                    .findOne({
                    where: {
                        org_id,
                        plan_id: u.plan_id,
                        feature_id: u.feature_id,
                        is_deleted: false,
                    },
                });
                if (!pricingOverride) {
                    pricingOverride = manager.getRepository(org_feature_overrides_entity_1.OrgFeatureOverride).create({
                        org_id,
                        plan_id: u.plan_id,
                        feature_id: u.feature_id,
                        mapping_id: u.mapping_id,
                        override_value: u.override_value,
                        default_value: u.default_value,
                        is_active: u.is_active ?? true,
                        is_deleted: u.is_deleted ?? false,
                    });
                    action = 'INSERT';
                }
                else {
                    oldValue = pricingOverride.override_value;
                    pricingOverride.override_value = u.override_value;
                    pricingOverride.is_active = u.is_active ?? pricingOverride.is_active;
                    pricingOverride.is_deleted =
                        u.is_deleted ?? pricingOverride.is_deleted;
                    pricingOverride.updated_at = new Date();
                    action = 'UPDATE';
                }
                const savedPricing = await manager
                    .getRepository(org_feature_overrides_entity_1.OrgFeatureOverride)
                    .save(pricingOverride);
                updatedPricing.push(savedPricing);
                const log = manager.getRepository(org_feature_override_logs_entity_1.OrgFeatureOverrideLog).create({
                    override_id: savedPricing.override_id,
                    org_id: savedPricing.org_id,
                    plan_id: savedPricing.plan_id,
                    feature_id: savedPricing.feature_id,
                    mapping_id: savedPricing.mapping_id,
                    old_value: oldValue,
                    new_value: savedPricing.override_value,
                    changed_by: changedBy ?? null,
                    action,
                });
                logs.push(await manager.getRepository(org_feature_override_logs_entity_1.OrgFeatureOverrideLog).save(log));
                let publicOverride = await manager.getRepository(org_overrides_entity_1.OrgOverride).findOne({
                    where: {
                        org_id,
                        plan_id: savedPricing.plan_id,
                        feature_id: savedPricing.feature_id,
                        is_deleted: false,
                    },
                });
                if (!publicOverride) {
                    publicOverride = manager.getRepository(org_overrides_entity_1.OrgOverride).create({
                        override_id: savedPricing.override_id,
                        org_id: savedPricing.org_id,
                        plan_id: savedPricing.plan_id,
                        feature_id: savedPricing.feature_id,
                        mapping_id: savedPricing.mapping_id,
                        override_value: savedPricing.override_value,
                        default_value: savedPricing.default_value,
                        is_active: savedPricing.is_active,
                        is_deleted: savedPricing.is_deleted,
                    });
                }
                else {
                    publicOverride.override_value = savedPricing.override_value;
                    publicOverride.is_active = savedPricing.is_active;
                    publicOverride.is_deleted = savedPricing.is_deleted;
                    publicOverride.updated_at = new Date();
                }
                updatedPublic.push(await manager.getRepository(org_overrides_entity_1.OrgOverride).save(publicOverride));
            }
            return { pricing: updatedPricing, public: updatedPublic, logs };
        });
        try {
            const orgResponse = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`${process.env.ASSET_API_URL}/organization/get-by-billing-org/${org_id}`));
            console.log('👉 Org API Response:', orgResponse.data);
            const assetOrgId = orgResponse.data?.result?.orgId;
            if (!assetOrgId) {
                throw new Error(`Asset org not found for billing org ${org_id}`);
            }
            const payload = {
                orgId: assetOrgId,
                billingOrgId: org_id,
                limitations: updatesArray.map((u) => ({
                    feature_id: u.feature_id,
                    plan_id: u.plan_id,
                    mapping_id: u.mapping_id ?? null,
                    override_value: u.override_value,
                    default_value: u.default_value ?? u.override_value,
                    is_active: u.is_active ?? true,
                    is_deleted: u.is_deleted ?? false,
                })),
            };
            console.log('👉 Sending payload to Asset:', payload);
            const assetResponse = await (0, rxjs_1.firstValueFrom)(this.httpService.post(`${process.env.ASSET_API_URL}/organization/store-asset-limitations`, payload));
            console.log(`✅ Synced to Asset DB for billing org ${org_id}`, assetResponse.data?.message || 'Success');
        }
        catch (err) {
            error_handler_util_1.ErrorHandler.log('Asset sync failed for org', err);
            error_handler_util_1.ErrorHandler.throwInternalServerError(err, 'Asset sync failed for org');
        }
        return result;
    }
    async getOverridesByOrgId(orgId) {
        try {
            const overrides = await this.pricingOverrideRepo
                .createQueryBuilder('override')
                .leftJoinAndSelect('override.feature', 'feature')
                .where('override.org_id = :orgId', { orgId })
                .andWhere('override.is_deleted = false')
                .orderBy('override.updated_at', 'DESC')
                .getMany();
            return overrides.map((o) => ({
                override_id: o.override_id,
                org_id: o.org_id,
                plan_id: o.plan_id,
                feature_id: o.feature_id,
                feature_name: o['feature']?.feature_name ?? null,
                default_value: o.default_value,
                override_value: o.override_value,
                is_active: o.is_active,
                created_at: o.created_at,
                updated_at: o.updated_at,
            }));
        }
        catch (error) {
            console.error('Error fetching overrides:', error);
            throw new Error('Failed to fetch overrides');
        }
    }
    async getAllFeatures(page, limit, search, status, productId) {
        try {
            const qb = this.featureRepository
                .createQueryBuilder('f')
                .leftJoinAndSelect('f.product', 'p');
            qb.andWhere('f.is_deleted = false');
            if (search) {
                qb.andWhere('(LOWER(f.feature_name) LIKE :search OR LOWER(f.description) LIKE :search OR LOWER(p.name) LIKE :search)', { search: `%${search.toLowerCase()}%` });
            }
            if (status === 'Active') {
                qb.andWhere('f.is_active = true');
            }
            else if (status === 'Inactive') {
                qb.andWhere('f.is_active = false');
            }
            if (productId) {
                qb.andWhere('f.product_id = :productId', { productId });
            }
            const [data, total] = await qb
                .orderBy('f.feature_id', 'ASC')
                .skip((page - 1) * limit)
                .take(limit)
                .getManyAndCount();
            return { data, total };
        }
        catch (error) {
            error_handler_util_1.ErrorHandler.log('Error fetching features', error);
            error_handler_util_1.ErrorHandler.throwInternalServerError(error, 'Error fetching features');
        }
    }
    async getAllPlansWithBilling(page, limit, search, status, productId) {
        try {
            const qb = this.planRepository
                .createQueryBuilder('p')
                .leftJoinAndSelect('p.billings', 'b')
                .leftJoinAndSelect('p.product', 'prod')
                .loadRelationCountAndMap('p.organization_count', 'p.subscriptions', 'subs', (qb) => qb
                .where('subs.is_active = true')
                .andWhere('subs.is_activated = true'));
            if (search) {
                qb.andWhere('(LOWER(p.plan_name) LIKE :search OR LOWER(p.description) LIKE :search)', {
                    search: `%${search.toLowerCase()}%`,
                });
            }
            if (status === 'Active')
                qb.andWhere('p.is_active = true');
            else if (status === 'Inactive')
                qb.andWhere('p.is_active = false');
            if (productId) {
                qb.andWhere('p.product_id = :productId', { productId });
            }
            const [data, total] = await qb
                .orderBy('p.plan_id', 'ASC')
                .skip((page - 1) * limit)
                .take(limit)
                .getManyAndCount();
            return { data, total };
        }
        catch (error) {
            error_handler_util_1.ErrorHandler.log('Error fetching plan with billing', error);
            error_handler_util_1.ErrorHandler.throwInternalServerError(error, 'Error fetching plan with billing');
        }
    }
    async getAllPlansWithBillingAndFeatures(page, limit, search, status, productId, planId) {
        try {
            const qb = this.planFeatureMappingRepository
                .createQueryBuilder('fm')
                .leftJoinAndSelect('fm.plan', 'p')
                .leftJoinAndSelect('fm.feature', 'f')
                .leftJoinAndSelect('p.billings', 'b')
                .leftJoinAndSelect('fm.product', 'pr')
                .where('fm.status = :mappingStatus', { mappingStatus: 'Active' });
            if (search) {
                qb.andWhere('(LOWER(p.plan_name) LIKE :search OR LOWER(f.feature_name) LIKE :search OR LOWER(pr.name) LIKE :search)', { search: `%${search.toLowerCase()}%` });
            }
            if (status === 'Active')
                qb.andWhere('p.is_active = true');
            else if (status === 'Inactive')
                qb.andWhere('p.is_active = false');
            if (productId) {
                qb.andWhere('pr.product_id = :productId', { productId });
            }
            if (planId) {
                qb.andWhere('p.plan_id = :planId', { planId });
            }
            const [rows, total] = await Promise.all([
                qb
                    .orderBy('fm.mapping_id', 'ASC')
                    .skip((page - 1) * limit)
                    .take(limit)
                    .getMany(),
                qb.getCount(),
            ]);
            const data = rows.map((r) => ({
                mapping_id: r.mapping_id,
                mapping_status: r.status,
                feature_name: r.feature?.feature_name || null,
                feature_value: r.feature_value,
                status: r.status,
                created_at: r.created_at,
                updated_at: r.updated_at,
                product: r.product
                    ? {
                        id: r.product.productId,
                        name: r.product.name,
                        description: r.product.description,
                        isActive: r.product.isActive,
                    }
                    : null,
                plan: {
                    id: r.plan?.plan_id || null,
                    name: r.plan?.plan_name || null,
                    description: r.plan?.description || null,
                    status: r.plan?.is_active ? 'Active' : 'Inactive',
                },
                billing: r.plan?.billings?.length
                    ? r.plan.billings.map((b) => ({
                        id: b.billing_id,
                        cycle: b.billing_cycle,
                        price: b.price,
                        discount: b.discounted_percentage,
                    }))
                    : [],
            }));
            return { data, total };
        }
        catch (error) {
            error_handler_util_1.ErrorHandler.log('Error fetching plan with billing and feature', error);
            error_handler_util_1.ErrorHandler.throwInternalServerError(error, 'Error fetching plan with billing and feature');
        }
    }
    async getPlanFeatureSummary(page, limit, search, status, productId) {
        try {
            const qb = this.planFeatureMappingRepository
                .createQueryBuilder('pfm')
                .leftJoin('pfm.plan', 'plan')
                .leftJoin('pfm.product', 'product')
                .select([
                'MIN(pfm.mapping_id) AS mapping_id',
                'product.product_id AS product_id',
                'product.name AS product_name',
                'plan.plan_id AS plan_id',
                'plan.plan_name AS plan_name',
                'COUNT(pfm.feature_id) AS feature_count',
                'plan.is_active AS plan_active',
                'pfm.status AS mapping_status',
            ])
                .groupBy('product.product_id, product.name, plan.plan_id, plan.plan_name, plan.is_active, pfm.status');
            if (search) {
                qb.andWhere('(LOWER(plan.plan_name) LIKE :search OR LOWER(product.name) LIKE :search)', { search: `%${search.toLowerCase()}%` });
            }
            if (status === 'Active')
                qb.andWhere('plan.is_active = true');
            else if (status === 'Inactive')
                qb.andWhere('plan.is_active = false');
            if (productId) {
                qb.andWhere('product.product_id = :productId', { productId });
            }
            const [rows, total] = await Promise.all([
                qb
                    .orderBy('product.name', 'ASC')
                    .addOrderBy('plan.plan_name', 'ASC')
                    .offset((page - 1) * limit)
                    .limit(limit)
                    .getRawMany(),
                qb.getCount(),
            ]);
            const data = rows.map((r) => ({
                mapping_id: Number(r.mapping_id),
                product_id: Number(r.product_id),
                product_name: r.product_name,
                plan_id: Number(r.plan_id),
                plan_name: r.plan_name,
                feature_count: Number(r.feature_count),
                status: r.plan_active ? 'Active' : 'Inactive',
                mapping_status: r.mapping_status ? 'Enabled' : 'Disabled',
            }));
            return { data, total };
        }
        catch (error) {
            error_handler_util_1.ErrorHandler.log('Error fetching plan feature summary', error);
            error_handler_util_1.ErrorHandler.throwInternalServerError(error, 'Error fetching plan feature summary');
        }
    }
    async createFeature(payload) {
        const { feature_name, description, default_value, product_id } = payload;
        const existing = await this.featureRepository.findOne({
            where: { feature_name, product_id, is_deleted: false },
        });
        if (existing) {
            throw new common_1.BadRequestException('Feature with this name already exists for this product');
        }
        const feature = this.featureRepository.create({
            feature_name,
            description,
            default_value,
            product_id,
        });
        return await this.featureRepository.save(feature);
    }
    async updateFeature(feature_id, payload) {
        const feature = await this.featureRepository.findOne({
            where: { feature_id },
        });
        if (!feature) {
            throw new common_1.NotFoundException('Feature not found');
        }
        Object.assign(feature, payload);
        return await this.featureRepository.save(feature);
    }
    async getFeatureDetailsById(feature_id) {
        try {
            const feature = await this.featureRepository.findOne({
                where: { feature_id, is_active: true },
            });
            if (!feature) {
                throw new Error('Feature not found');
            }
            return {
                feature_id: feature.feature_id,
                feature_name: feature.feature_name,
                description: feature.description,
                default_value: feature.default_value,
                is_active: feature.is_active,
                set_limit: feature.set_limit,
                product_id: feature.product?.productId || feature.product_id || null,
                created_at: feature.created_at,
                updated_at: feature.updated_at,
            };
        }
        catch (error) {
            console.error('Error fetching feature details:', error);
            throw new Error('Failed to fetch feature details');
        }
    }
    async deleteFeature(id) {
        try {
            const feature = await this.featureRepository.findOne({
                where: { feature_id: id },
            });
            if (!feature) {
                throw new Error('Feature not found');
            }
            feature.is_active = false;
            feature.is_deleted = true;
            await this.featureRepository.save(feature);
        }
        catch (error) {
            console.error('Error deleting feature:', error);
            throw new Error('Failed to delete feature');
        }
    }
    async getActivePlans() {
        try {
            const plans = await this.planRepository.find({
                select: ['plan_id', 'plan_name'],
                where: { is_active: true },
                order: { plan_name: 'ASC' },
            });
            return plans.map((p) => ({ id: p.plan_id, name: p.plan_name }));
        }
        catch (error) {
            error_handler_util_1.ErrorHandler.log('Error fetching plans', error);
            error_handler_util_1.ErrorHandler.throwInternalServerError(error, 'Error fetching plans');
        }
    }
    async getActiveFeatures() {
        try {
            const features = await this.featureRepository.find({
                select: ['feature_id', 'feature_name', 'set_limit'],
                where: { is_active: true },
                order: { feature_name: 'ASC' },
            });
            return features.map((f) => ({
                id: f.feature_id,
                name: f.feature_name,
                limit: f.set_limit,
            }));
        }
        catch (error) {
            error_handler_util_1.ErrorHandler.log('Error fetching features', error);
            error_handler_util_1.ErrorHandler.throwInternalServerError(error, 'Error fetching features');
        }
    }
    async getActivePaymentMethods() {
        try {
            const methods = await this.paymentMethod.find({
                select: ['methodId', 'methodName'],
                where: { isActive: true },
                order: { displayOrder: 'ASC' },
            });
            return methods.map((m) => ({ id: m.methodId, name: m.methodName }));
        }
        catch (error) {
            error_handler_util_1.ErrorHandler.log('Error fetching payment modes', error);
            error_handler_util_1.ErrorHandler.throwInternalServerError(error, 'Error fetching payment modes');
        }
    }
    async createMapping(payload) {
        const mappings = [];
        const allFeatures = [
            ...(payload.features || []).map((f) => ({ ...f, isTrial: false })),
            ...(payload.trial_features || []).map((f) => ({ ...f, isTrial: true })),
        ];
        for (const f of allFeatures) {
            const featureValue = f.limit === '' ? null : f.limit;
            const existing = await this.planFeatureMappingRepository.findOne({
                where: {
                    product_id: payload.product_id,
                    plan_id: payload.plan_id,
                    feature_id: f.feature_id,
                    is_trial: f.isTrial,
                },
            });
            if (existing) {
                existing.feature_value = featureValue;
                existing.status = payload.status || 'Active';
                existing.type = f.type || existing.type || 'Boolean';
                const updated = await this.planFeatureMappingRepository.save(existing);
                mappings.push(updated);
            }
            else {
                const newMapping = this.planFeatureMappingRepository.create({
                    product_id: payload.product_id,
                    plan_id: payload.plan_id,
                    feature_id: f.feature_id,
                    feature_value: featureValue,
                    status: payload.status || 'Active',
                    type: f.type || 'Boolean',
                    is_trial: f.isTrial,
                });
                const saved = await this.planFeatureMappingRepository.save(newMapping);
                mappings.push(saved);
            }
        }
        return mappings;
    }
    async updateMappingsByPlanId(plan_id, payload) {
        const { product_id, features, trial_features, status } = payload;
        const mappings = [];
        const allFeatures = [
            ...(features || []).map((f) => ({ ...f, isTrial: false })),
            ...(trial_features || []).map((f) => ({ ...f, isTrial: true })),
        ];
        for (const f of allFeatures) {
            const featureValue = f.limit === '' || f.limit === null ? null : f.limit;
            const existing = await this.planFeatureMappingRepository.findOne({
                where: {
                    plan_id,
                    product_id,
                    feature_id: f.feature_id,
                    is_trial: f.isTrial,
                },
            });
            if (existing) {
                existing.feature_value = featureValue;
                existing.status = status || 'Active';
                existing.type = f.type || existing.type || 'Boolean';
                mappings.push(await this.planFeatureMappingRepository.save(existing));
            }
            else {
                const newMapping = this.planFeatureMappingRepository.create({
                    plan_id,
                    product_id,
                    feature_id: f.feature_id,
                    feature_value: featureValue,
                    status: status || 'Active',
                    type: f.type || 'Boolean',
                    is_trial: f.isTrial,
                });
                mappings.push(await this.planFeatureMappingRepository.save(newMapping));
            }
        }
        return mappings;
    }
    async getMappingDetailsById(mapping_id) {
        try {
            const mapping = await this.planFeatureMappingRepository.findOne({
                where: { mapping_id },
                relations: ['feature', 'plan'],
            });
            if (!mapping) {
                throw new Error('Mapping not found');
            }
            return {
                mapping_id: mapping.mapping_id,
                feature_id: mapping.feature_id,
                feature_name: mapping.feature?.feature_name || null,
                feature_value: mapping.feature_value || null,
                plan_id: mapping.plan_id,
                plan_name: mapping.plan?.plan_name || null,
                limit: mapping.feature_value,
                status: mapping.status,
                created_at: mapping.created_at,
                updated_at: mapping.updated_at,
                product_id: mapping.product_id,
            };
        }
        catch (error) {
            console.error('Error fetching mapping details:', error);
            throw new Error('Failed to fetch mapping details');
        }
    }
    async getMappingDetailsByPlanId(plan_id) {
        try {
            const mappings = await this.planFeatureMappingRepository.find({
                where: { plan_id },
                relations: ['feature', 'plan', 'product'],
            });
            if (!mappings || mappings.length === 0) {
                throw new Error('No mappings found for this plan');
            }
            const plan = mappings[0].plan;
            const product = mappings[0].product;
            return {
                plan_id: plan.plan_id,
                plan_name: plan.plan_name,
                product_id: product?.productId || null,
                product_name: product?.name || null,
                status: mappings[0].status,
                features: mappings.map((m) => ({
                    mapping_id: m.mapping_id,
                    feature_id: m.feature?.feature_id || null,
                    feature_name: m.feature?.feature_name || null,
                    feature_value: m.feature_value || null,
                    limit: m.feature_value,
                    created_at: m.created_at,
                    updated_at: m.updated_at,
                })),
            };
        }
        catch (error) {
            console.error('Error fetching mapping details by plan:', error);
            throw new Error('Failed to fetch mapping details by plan');
        }
    }
    async deleteMapping(mapping_id) {
        try {
            const mapping = await this.planFeatureMappingRepository.findOne({
                where: { mapping_id },
            });
            if (!mapping) {
                throw new Error('Mapping not found');
            }
            mapping.status = 'Inactive';
            await this.planFeatureMappingRepository.save(mapping);
        }
        catch (error) {
            console.error('Error deleting mapping:', error);
            throw new Error('Failed to delete mapping');
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
                        description: mapping.feature.description,
                        created_at: mapping.feature.created_at,
                        updated_at: mapping.feature.updated_at,
                        is_active: mapping.feature.is_active,
                        is_deleted: mapping.feature.is_deleted,
                        default_value: mapping.feature.default_value,
                    },
                })),
            };
        }
        catch (error) {
            console.error('Error fetching plan with features:', error);
            throw new Error('Failed to fetch plan with features');
        }
    }
    async createPayment(payload, userId) {
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
            payment_method: Number(transactionData.payment_method),
            methodId: 1,
            transaction_status: 'success',
            paid_at: new Date(),
        });
        await this.paymentTransactionRepository.save(paymentTransaction);
        return { billingInfo, paymentTransaction };
    }
    async getSubscriptionDetailsByOrganization(organization_profile_id) {
        try {
            const subscription = await this.subscriptionRepository
                .createQueryBuilder('sub')
                .leftJoinAndSelect('sub.plan', 'plan')
                .leftJoinAndSelect('sub.subscriptionType', 'subscriptionType')
                .leftJoinAndSelect('sub.billingInfo', 'billingInfo')
                .leftJoinAndSelect('sub.paymentTransactions', 'paymentTransactions')
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
            }));
            return {
                subscription_id: subscription.subscription_id,
                organization_profile_id: subscription.organization_profile_id,
                plan: {
                    plan_id: subscription.plan.plan_id,
                    plan_name: subscription.plan.plan_name,
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
                payment_status: subscription.payment_status,
                payment_mode: subscription.payment_mode,
                purchase_date: subscription.purchase_date,
                plan_billing_id: subscription.plan_billing_id,
                auto_renewal: subscription.auto_renewal,
                features,
            };
        }
        catch (error) {
            console.error('Error fetching subscription details by org:', error);
            throw new Error('Failed to fetch subscription details');
        }
    }
    async createSetting(dto) {
        const setting = this.planSettingRepo.create(dto);
        return await this.planSettingRepo.save(setting);
    }
    async upsertSetting(dto) {
        let setting = await this.planSettingRepo.findOne({
            where: { plan_id: dto.plan_id, setting_name: dto.setting_name },
        });
        if (setting) {
            Object.assign(setting, dto);
        }
        else {
            setting = this.planSettingRepo.create(dto);
        }
        return await this.planSettingRepo.save(setting);
    }
    async getSettingsByPlan(plan_id) {
        return await this.planSettingRepo.find({
            where: { plan_id, is_deleted: false },
        });
    }
    async createOfflinePaymentRequest(userId) {
        const subscription = await this.subscriptionRepository.findOne({
            where: { created_by: userId, is_active: true },
            relations: ['billingInfo', 'plan'],
        });
        if (!subscription) {
            throw new Error('No active subscription found for this user');
        }
        const user = await this.registerUser.findOne({
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
    async getOfflineRequests(page, limit, search, status) {
        try {
            const qb = this.billingInfoRepository
                .createQueryBuilder('billing')
                .leftJoinAndSelect('billing.orgSubscription', 'sub')
                .leftJoinAndSelect('sub.organization', 'organization')
                .leftJoinAndSelect('sub.plan', 'plan')
                .leftJoinAndSelect('sub.reseller', 'reseller')
                .leftJoinAndSelect('billing.product', 'product');
            qb.where('billing.method_id = :methodId', {
                methodId: 5,
            });
            qb.andWhere('sub.is_active = :isActive', {
                isActive: true,
            });
            qb.andWhere('sub.is_activated = :isActivated', {
                isActivated: true,
            });
            if (search?.trim()) {
                const searchTerm = `%${search.trim().toLowerCase()}%`;
                qb.andWhere(`(
          LOWER(COALESCE(billing.first_name, '')) LIKE :search
          OR LOWER(COALESCE(billing.last_name, '')) LIKE :search
          OR LOWER(COALESCE(billing.email, '')) LIKE :search
          OR LOWER(COALESCE(billing.billing_id::text, '')) LIKE :search
          OR LOWER(COALESCE(billing.company_name, '')) LIKE :search
          OR LOWER(COALESCE(billing.customerpo, '')) LIKE :search
          OR LOWER(COALESCE(billing.paymentterm, '')) LIKE :search
          OR LOWER(COALESCE(billing.orderplacedby, '')) LIKE :search

          OR LOWER(COALESCE(organization.organization_name, '')) LIKE :search

          OR LOWER(COALESCE(product.name, '')) LIKE :search

          OR LOWER(COALESCE(plan.plan_name, '')) LIKE :search

          OR LOWER(COALESCE(reseller.reseller_name, '')) LIKE :search

          OR LOWER(COALESCE(sub.sub_billing_id::text, '')) LIKE :search
          OR LOWER(COALESCE(sub.sub_order_id::text, '')) LIKE :search
        )`, {
                    search: searchTerm,
                });
            }
            if (status && status !== 'All') {
                qb.andWhere('billing.status = :status', {
                    status,
                });
            }
            qb.orderBy('billing.created_at', 'DESC');
            qb.skip((page - 1) * limit).take(limit);
            const [billingData, total] = await qb.getManyAndCount();
            const data = billingData.map((b) => ({
                billing_id: b.billing_id,
                first_name: b.first_name,
                last_name: b.last_name,
                email: b.email,
                phone_number: b.phone_number,
                company_name: b.company_name,
                status: b.status,
                order_placed_by: b.orderplacedby,
                customer_po: b.customerpo,
                payment_term: b.paymentterm,
                product: b.product
                    ? {
                        product_id: b.product.productId,
                        product_name: b.product.name,
                    }
                    : null,
                subscription: b.orgSubscription
                    ? {
                        subscription_id: b.orgSubscription.subscription_id,
                        organization_profile_id: b.orgSubscription.organization_profile_id,
                        organization_name: b.orgSubscription.organization?.organization_name,
                        start_date: b.orgSubscription.start_date,
                        renewal_date: b.orgSubscription.renewal_date,
                        payment_status: b.orgSubscription.payment_status,
                        billing_id: b.orgSubscription.sub_billing_id,
                        price: b.orgSubscription.price,
                        grand_total: b.orgSubscription.grand_total,
                        discount: b.orgSubscription.percentage,
                        order_id: b.orgSubscription.sub_order_id,
                        plan: b.orgSubscription.plan
                            ? {
                                plan_id: b.orgSubscription.plan.plan_id,
                                plan_name: b.orgSubscription.plan.plan_name,
                            }
                            : null,
                        reseller: b.orgSubscription.reseller
                            ? {
                                reseller_id: b.orgSubscription.reseller.reseller_id,
                                reseller_name: b.orgSubscription.reseller.reseller_name,
                            }
                            : null,
                    }
                    : null,
            }));
            return {
                data,
                total,
                page,
                limit,
            };
        }
        catch (error) {
            error_handler_util_1.ErrorHandler.log('Error fetching offline requests', error);
            error_handler_util_1.ErrorHandler.throwInternalServerError(error, 'Error fetching offline requests');
        }
    }
    buildOfflineRequestQuery(search, status) {
        const qb = this.billingInfoRepository
            .createQueryBuilder('billing')
            .leftJoinAndSelect('billing.orgSubscription', 'sub')
            .leftJoinAndSelect('sub.organization', 'organization')
            .leftJoinAndSelect('sub.plan', 'plan')
            .leftJoinAndSelect('sub.reseller', 'reseller')
            .leftJoinAndSelect('billing.product', 'product')
            .orderBy('billing.created_at', 'DESC');
        qb.andWhere('billing.method_id = :methodId', { methodId: 5 });
        qb.andWhere('sub.is_active = :isActive', { isActive: true });
        qb.andWhere('sub.is_activated = :isActivated', {
            isActivated: true,
        });
        if (status !== 'All') {
            qb.andWhere('LOWER(billing.status) = :status', {
                status: status.toLowerCase(),
            });
        }
        if (search) {
            qb.andWhere(`(LOWER(billing.first_name) LIKE :search
        OR LOWER(billing.last_name) LIKE :search
        OR LOWER(billing.email) LIKE :search
        OR LOWER(billing.company_name) LIKE :search)`, {
                search: `%${search.toLowerCase()}%`,
            });
        }
        return qb;
    }
    async exportOfflineRequests(search, status) {
        try {
            const qb = this.buildOfflineRequestQuery(search, status);
            const billingData = await qb.getMany();
            return billingData.map((b) => ({
                billing_id: b.billing_id,
                company_name: b.company_name,
                first_name: b.first_name,
                last_name: b.last_name,
                email: b.email,
                phone_number: b.phone_number,
                order_placed_by: b.orderplacedby,
                customer_po: b.customerpo,
                payment_term: b.paymentterm,
                status: b.status,
                product_name: b.product?.name ?? '-',
                organization_name: b.orgSubscription?.organization?.organization_name ?? '-',
                plan_name: b.orgSubscription?.plan?.plan_name ?? '-',
                reseller_name: b.orgSubscription?.reseller?.reseller_name ?? '-',
                payment_status: b.orgSubscription?.payment_status ?? '-',
                order_id: b.orgSubscription?.sub_order_id ?? '-',
                grand_total: b.orgSubscription?.grand_total ?? 0,
            }));
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to export offline requests');
        }
    }
    async updateStatus(request_id, status) {
        const existing = await this.billingInfoRepository.findOne({
            where: { billing_id: request_id },
        });
        if (!existing)
            return null;
        existing.status = status;
        return await this.billingInfoRepository.save(existing);
    }
    async getTrialAndLiveSubscriptions(page, limit, search, status) {
        try {
            const qb = this.subscriptionRepository
                .createQueryBuilder('subscription')
                .leftJoinAndSelect('subscription.plan', 'plan')
                .leftJoinAndSelect('subscription.product', 'product')
                .leftJoinAndSelect('subscription.organization', 'org')
                .addSelect(['org.organization_name', 'product.name'])
                .orderBy('subscription.created_at', 'DESC');
            qb.andWhere('subscription.is_active = :active', { active: true });
            qb.andWhere('subscription.is_activated = :active', { active: true });
            if (search) {
                qb.andWhere('(LOWER(plan.plan_name) LIKE :search OR LOWER(org.organization_name) LIKE :search)', { search: `%${search.toLowerCase()}%` });
            }
            if (status === 'Trial') {
                qb.andWhere('subscription.is_trial_period = :trial', { trial: true });
            }
            else if (status === 'Live') {
                qb.andWhere('subscription.is_trial_period = :trial', { trial: false });
            }
            const [subscriptions, total] = await qb
                .skip((page - 1) * limit)
                .take(limit)
                .getManyAndCount();
            const trial = [];
            const live = [];
            subscriptions.forEach((sub) => {
                const mapped = {
                    subscription_id: sub.subscription_id,
                    organization_profile_id: sub.organization_profile_id,
                    organization_name: sub.organization?.organization_name || null,
                    organization_code: sub.organization?.organization_code || null,
                    billing_id: sub.sub_billing_id,
                    order_id: sub.sub_order_id,
                    start_date: sub.start_date,
                    renewal_date: sub.renewal_date,
                    payment_status: sub.payment_status,
                    is_trial_period: sub.is_trial_period,
                    is_active: sub.is_active,
                    plan_billing_id: sub.plan_billing_id,
                    renewal: sub.auto_renewal,
                    restrict_login: sub.restrict_login,
                    plan: {
                        plan_id: sub.plan?.plan_id,
                        plan_name: sub.plan?.plan_name,
                        description: sub.plan?.description,
                        set_trial: sub.plan?.set_trial,
                    },
                    product: {
                        product_id: sub.product?.product_id,
                        product_name: sub.product?.name || null,
                    },
                };
                if (sub.is_trial_period) {
                    trial.push(mapped);
                }
                else {
                    live.push(mapped);
                }
            });
            return { trial, live, total };
        }
        catch (error) {
            console.error('Error fetching subscriptions:', error);
            throw new Error('Failed to fetch subscriptions');
        }
    }
    async exportTrialAndLiveSubscriptions(search, status) {
        try {
            const qb = this.subscriptionRepository
                .createQueryBuilder('subscription')
                .leftJoinAndSelect('subscription.plan', 'plan')
                .leftJoinAndSelect('subscription.product', 'product')
                .leftJoinAndSelect('subscription.organization', 'org')
                .addSelect(['org.organization_name', 'product.name'])
                .orderBy('subscription.created_at', 'DESC');
            qb.andWhere('subscription.is_active = :active', {
                active: true,
            });
            qb.andWhere('subscription.is_activated = :activated', {
                activated: true,
            });
            if (search) {
                qb.andWhere(`(LOWER(plan.plan_name) LIKE :search
        OR LOWER(org.organization_name) LIKE :search)`, {
                    search: `%${search.toLowerCase()}%`,
                });
            }
            if (status === 'Trial') {
                qb.andWhere('subscription.is_trial_period = :trial', {
                    trial: true,
                });
            }
            else if (status === 'Live') {
                qb.andWhere('subscription.is_trial_period = :trial', {
                    trial: false,
                });
            }
            else if (status === 'Active') {
                qb.andWhere('subscription.is_active = :activeStatus', {
                    activeStatus: true,
                });
            }
            else if (status === 'Inactive') {
                qb.andWhere('subscription.is_active = :activeStatus', {
                    activeStatus: false,
                });
            }
            const subscriptions = await qb.getMany();
            return subscriptions.map((sub) => ({
                subscription_id: sub.subscription_id,
                organization_name: sub.organization?.organization_name ?? '-',
                organization_code: sub.organization?.organization_code ?? '-',
                order_id: sub.sub_order_id,
                billing_id: sub.sub_billing_id,
                product_name: sub.product?.name ?? '-',
                plan_name: sub.plan?.plan_name ?? '-',
                start_date: sub.start_date,
                renewal_date: sub.renewal_date,
                payment_status: sub.payment_status,
                subscription_type: sub.is_trial_period ? 'Trial' : 'Live',
                renewal: sub.auto_renewal ? 'Yes' : 'No',
                restrict_login: sub.restrict_login ? 'Yes' : 'No',
                status: sub.is_active ? 'Active' : 'Inactive',
            }));
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to export subscriptions');
        }
    }
    async getRenewals(page, limit, search, status, filters) {
        try {
            const qb = this.subscriptionRepository
                .createQueryBuilder('subscription')
                .leftJoinAndSelect('subscription.plan', 'plan')
                .leftJoinAndSelect('subscription.organization', 'org')
                .leftJoinAndSelect('subscription.product', 'product')
                .leftJoinAndSelect('subscription.renewalStatus', 'renewalStatus')
                .leftJoinAndSelect('subscription.billingInfo', 'billingInfo')
                .leftJoinAndSelect('subscription.reseller', 'reseller')
                .addSelect([
                'org.organization_name',
                'renewalStatus.status_name',
                'renewalStatus.status_id',
            ])
                .addSelect(['org.organization_name'])
                .orderBy('subscription.renewal_date', 'DESC');
            qb.andWhere('subscription.is_active = :active', { active: true });
            qb.andWhere('subscription.is_activated = :active', { active: true });
            if (search) {
                qb.andWhere('(LOWER(plan.plan_name) LIKE :search OR LOWER(org.organization_name) LIKE :search)', { search: `%${search.toLowerCase()}%` });
            }
            if (status === 'Trial') {
                qb.andWhere('subscription.is_trial_period = :trial', { trial: true });
            }
            else if (status === 'Live') {
                qb.andWhere('subscription.is_trial_period = :trial', { trial: false });
            }
            if (filters) {
                const { renewalStatus, quoteStatus, startDate, endDate, plan } = filters;
                if (renewalStatus && renewalStatus !== 'All') {
                    qb.andWhere('subscription.renewal_status = :rStatusId', {
                        rStatusId: Number(renewalStatus),
                    });
                }
                if (quoteStatus && quoteStatus !== 'All') {
                    qb.andWhere('subscription.quote_status = :qStatus', {
                        qStatus: quoteStatus,
                    });
                }
                if (plan && plan !== 'All') {
                    qb.andWhere('plan.plan_id = :planId', { planId: Number(plan) });
                }
                if (startDate && endDate) {
                    qb.andWhere('subscription.renewal_date BETWEEN :start AND :end', {
                        start: `${startDate} 00:00:00`,
                        end: `${endDate} 23:59:59`,
                    });
                }
                else if (startDate) {
                    qb.andWhere('subscription.renewal_date >= :start', {
                        start: `${startDate} 00:00:00`,
                    });
                }
                else if (endDate) {
                    qb.andWhere('subscription.renewal_date <= :end', {
                        end: `${endDate} 23:59:59`,
                    });
                }
            }
            const [subscriptions, total] = await qb
                .skip((page - 1) * limit)
                .take(limit)
                .getManyAndCount();
            const trial = [];
            const live = [];
            subscriptions.forEach((sub) => {
                const billing = Array.isArray(sub.billingInfo)
                    ? sub.billingInfo[0]
                    : sub.billingInfo;
                const mapped = {
                    subscription_id: sub.subscription_id,
                    organization_profile_id: sub.organization_profile_id,
                    organization_name: sub.organization?.organization_name || null,
                    billing_id: sub.sub_billing_id,
                    order_id: sub.sub_order_id,
                    start_date: sub.start_date,
                    renewal_date: sub.renewal_date,
                    payment_status: sub.payment_status,
                    is_trial_period: sub.is_trial_period,
                    is_active: sub.is_active,
                    plan_billing_id: sub.plan_billing_id,
                    invoice_number: sub.invoice_number,
                    renewal: sub.auto_renewal,
                    product_name: sub.product?.name || null,
                    plan: {
                        plan_id: sub.plan?.plan_id,
                        plan_name: sub.plan?.plan_name,
                        description: sub.plan?.description,
                        set_trial: sub.plan?.set_trial,
                    },
                    renewalStatus: sub.renewalStatus
                        ? {
                            status_id: sub.renewalStatus.status_id,
                            status_name: sub.renewalStatus.status_name,
                        }
                        : null,
                    billingInfo: billing
                        ? {
                            billing_id: billing.billing_id,
                            first_name: billing.first_name,
                            last_name: billing.last_name,
                            email: billing.email,
                            phone_number: billing.phone_number,
                            company_name: billing.company_name,
                            address_line1: billing.address_line1,
                            address_line2: billing.address_line2,
                            city: billing.city,
                            state: billing.state,
                            postal_code: billing.postal_code,
                            country: billing.country,
                            gst_number: billing.gst_number,
                            tax_id: billing.tax_id,
                            paymentterm: billing.paymentterm,
                            customerpo: billing.customerpo,
                            same_as_primary_contact: billing.same_as_primary_contact,
                            created_at: billing.created_at,
                        }
                        : null,
                    reseller: sub.reseller
                        ? {
                            reseller_id: sub.reseller.reseller_id,
                            reseller_name: sub.reseller.reseller_name,
                            contact_first_name: sub.reseller.contact_first_name,
                            contact_last_name: sub.reseller.contact_last_name,
                            email: sub.reseller.email,
                            phone_number: sub.reseller.phone_number,
                            is_active: sub.reseller.is_active,
                        }
                        : null,
                };
                if (sub.is_trial_period) {
                    trial.push(mapped);
                }
                else {
                    live.push(mapped);
                }
            });
            return { trial, live, total };
        }
        catch (error) {
            console.error('Error fetching subscriptions:', error);
            throw new Error('Failed to fetch subscriptions');
        }
    }
    async getTrialSubscriptions(page, limit, search, status = 'All') {
        try {
            const qb = this.subscriptionRepository
                .createQueryBuilder('subscription')
                .leftJoinAndSelect('subscription.plan', 'plan')
                .leftJoinAndSelect('subscription.organization', 'org')
                .leftJoinAndSelect('subscription.product', 'product')
                .addSelect(['org.organization_name'])
                .where('subscription.is_trial_period = :trial', { trial: true })
                .orderBy('subscription.created_at', 'DESC');
            if (search) {
                qb.andWhere('(LOWER(plan.plan_name) LIKE :search OR LOWER(org.organization_name) LIKE :search)', { search: `%${search.toLowerCase()}%` });
            }
            if (status === 'Active')
                qb.andWhere('subscription.is_active = :active', { active: true });
            else if (status === 'Inactive')
                qb.andWhere('subscription.is_active = :active', { active: false });
            const [subscriptions, total] = await qb
                .skip((page - 1) * limit)
                .take(limit)
                .getManyAndCount();
            const data = subscriptions.map((sub) => ({
                subscription_id: sub.subscription_id,
                organization_profile_id: sub.organization_profile_id,
                organization_name: sub.organization?.organization_name || null,
                product_name: sub.product?.name || null,
                start_date: sub.start_date,
                renewal_date: sub.renewal_date,
                payment_status: sub.payment_status,
                is_trial_period: sub.is_trial_period,
                is_active: sub.is_active,
                plan: {
                    plan_id: sub.plan?.plan_id,
                    plan_name: sub.plan?.plan_name,
                    description: sub.plan?.description,
                    set_trial: sub.plan?.set_trial,
                },
            }));
            return { data, total };
        }
        catch (error) {
            console.error('Error fetching trial subscriptions:', error);
            throw new Error('Failed to fetch trial subscriptions');
        }
    }
    async getLiveSubscriptions(page, limit, search, status = 'All') {
        try {
            const qb = this.subscriptionRepository
                .createQueryBuilder('subscription')
                .leftJoinAndSelect('subscription.plan', 'plan')
                .leftJoinAndSelect('subscription.organization', 'org')
                .addSelect(['org.organization_name'])
                .where('subscription.is_trial_period = :trial', { trial: false })
                .orderBy('subscription.created_at', 'DESC');
            if (search) {
                qb.andWhere('(LOWER(plan.plan_name) LIKE :search OR LOWER(org.organization_name) LIKE :search)', { search: `%${search.toLowerCase()}%` });
            }
            if (status === 'Active')
                qb.andWhere('subscription.is_active = :active', { active: true });
            else if (status === 'Inactive')
                qb.andWhere('subscription.is_active = :active', { active: false });
            const [subscriptions, total] = await qb
                .skip((page - 1) * limit)
                .take(limit)
                .getManyAndCount();
            const data = subscriptions.map((sub) => ({
                subscription_id: sub.subscription_id,
                organization_profile_id: sub.organization_profile_id,
                organization_name: sub.organization?.organization_name || null,
                start_date: sub.start_date,
                renewal_date: sub.renewal_date,
                payment_status: sub.payment_status,
                is_trial_period: sub.is_trial_period,
                is_active: sub.is_active,
                plan: {
                    plan_id: sub.plan?.plan_id,
                    plan_name: sub.plan?.plan_name,
                    description: sub.plan?.description,
                    set_trial: sub.plan?.set_trial,
                },
            }));
            return { data, total };
        }
        catch (error) {
            console.error('Error fetching live subscriptions:', error);
            throw new Error('Failed to fetch live subscriptions');
        }
    }
    async DeleteSubscription(id) {
        try {
            const subscription = await this.subscriptionRepository.findOne({
                where: { subscription_id: id },
            });
            if (!subscription) {
                throw new Error('Subscription not found');
            }
            subscription.is_active = false;
            subscription.is_deleted = true;
            await this.subscriptionRepository.save(subscription);
        }
        catch (error) {
            console.error('Error deleting subscription:', error);
            throw new Error('Failed to delete subscription');
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
            error_handler_util_1.ErrorHandler.log('Error fetching payment mode', error);
            error_handler_util_1.ErrorHandler.throwInternalServerError(error, 'Error fetching payment mode');
        }
    }
    async getAllSubscriptionDetails(page, limit, search, status) {
        try {
            const qb = this.subscriptionRepository
                .createQueryBuilder('subscription')
                .leftJoinAndSelect('subscription.plan', 'plan')
                .leftJoinAndSelect('subscription.organization', 'org')
                .leftJoinAndSelect('subscription.product', 'product')
                .leftJoinAndSelect('subscription.billingInfo', 'billing')
                .leftJoinAndSelect('billing.paymentMethod', 'billingMethod')
                .leftJoinAndSelect('subscription.paymentTransactions', 'payment')
                .leftJoinAndSelect('payment.method', 'paymentMethod')
                .leftJoinAndSelect('subscription.subscriptionType', 'type')
                .orderBy('subscription.created_at', 'DESC');
            if (search) {
                qb.andWhere('(LOWER(plan.plan_name) LIKE :search OR LOWER(org.organization_name) LIKE :search OR LOWER(billing.invoice_number) LIKE :search OR LOWER(product.name) LIKE :search))', { search: `%${search.toLowerCase()}%` });
            }
            if (status === 'Active') {
                qb.andWhere('subscription.is_active = :active', { active: true });
            }
            else if (status === 'Inactive') {
                qb.andWhere('subscription.is_active = :active', { active: false });
            }
            else if (status === 'Trial') {
                qb.andWhere('subscription.is_trial_period = :trial', { trial: true });
            }
            else if (status === 'Live') {
                qb.andWhere('subscription.is_trial_period = :trial', { trial: false });
            }
            const [subscriptions, total] = await qb
                .skip((page - 1) * limit)
                .take(limit)
                .getManyAndCount();
            const mappedSubs = subscriptions.map((sub) => ({
                subscription_id: sub.subscription_id,
                organization_profile_id: sub.organization_profile_id,
                organization_name: sub.organization?.organization_name || null,
                start_date: sub.start_date,
                renewal_date: sub.renewal_date,
                payment_status: sub.payment_status,
                is_trial_period: sub.is_trial_period,
                is_active: sub.is_active,
                amount: sub.price,
                product: sub.product
                    ? {
                        product_id: sub.product.productId,
                        name: sub.product.name,
                    }
                    : null,
                plan: {
                    plan_id: sub.plan?.plan_id,
                    plan_name: sub.plan?.plan_name,
                    description: sub.plan?.description,
                    set_trial: sub.plan?.set_trial,
                },
                billing: sub.billingInfo && sub.billingInfo.length > 0
                    ? {
                        first_name: sub.billingInfo[0].first_name,
                        last_name: sub.billingInfo[0].last_name,
                        email: sub.billingInfo[0].email,
                        phone_number: sub.billingInfo[0].phone_number,
                        status: sub.billingInfo[0].status,
                        method: sub.billingInfo[0].paymentMethod?.methodName || null,
                    }
                    : null,
                payments: sub.paymentTransactions
                    ? sub.paymentTransactions.map((p) => ({
                        payment_id: p.payment_id,
                        amount: p.amount,
                        status: p.status,
                        date: p.created_at,
                        method: p.paymentMethod?.methodName || null,
                    }))
                    : [],
            }));
            return { subscriptions: mappedSubs, total };
        }
        catch (error) {
            console.error('Error fetching subscriptions with billing:', error);
            throw new Error('Failed to fetch subscriptions with billing');
        }
    }
    async getAllOrganizationsWithPrimaryUsers(page, limit, search, type = 'all') {
        try {
            const qb = this.registerUser
                .createQueryBuilder('user')
                .leftJoinAndSelect('user.organization', 'org')
                .leftJoinAndSelect('org.subscriptions', 'sub')
                .leftJoinAndSelect('sub.plan', 'plan')
                .leftJoinAndSelect('sub.product', 'product')
                .leftJoinAndSelect('sub.reseller', 'reseller')
                .where('user.is_primary_user = :primary', { primary: 'Y' })
                .orderBy('org.organization_name', 'ASC');
            if (type === 'trial') {
                qb.andWhere('sub.is_trial_period = true');
            }
            if (type === 'paid') {
                qb.andWhere('sub.is_trial_period = false');
            }
            if (search) {
                qb.andWhere(`(LOWER(org.organization_name) LIKE :search
          OR LOWER(user.first_name) LIKE :search
          OR LOWER(user.last_name) LIKE :search
          OR LOWER(user.business_email) LIKE :search)`, { search: `%${search.toLowerCase()}%` });
            }
            const [users, total] = await qb
                .skip((page - 1) * limit)
                .take(limit)
                .getManyAndCount();
            const mappedOrgs = users.map((user) => {
                const subscription = user.organization.subscriptions?.[0];
                const location = location_util_1.LocationUtil.getLocationDetails(user.organization);
                return {
                    organization_id: user.organization.organization_id,
                    organization_name: user.organization.organization_name,
                    customer_id: user.organization.customer_id,
                    gst_number: user.organization.gst_number,
                    organization_schema_name: user.organization.organization_schema_name,
                    industry_type_id: user.organization.industry_type_id,
                    status: user.organization.status,
                    ...location,
                    product_name: subscription?.product?.product_name ?? null,
                    plan_name: subscription?.plan?.plan_name ?? null,
                    reseller_name: subscription?.reseller?.reseller_name ?? null,
                    organization_code: user.organization?.organization_code ?? false,
                    restrict_login: subscription?.restrict_login ?? false,
                    billing_type: subscription?.reseller ? 'Reseller' : 'Direct',
                    is_trial_period: subscription?.is_trial_period ?? false,
                    primary_user: {
                        user_id: user.user_id,
                        first_name: user.first_name,
                        last_name: user.last_name,
                        business_email: user.business_email,
                        phone_number: user.phone_number,
                    },
                };
            });
            return {
                organizations: mappedOrgs,
                total,
            };
        }
        catch (error) {
            console.error('Error fetching organizations with primary users:', error);
            throw new Error('Failed to fetch organizations with primary users');
        }
    }
    async exportOrganizations(search, type = 'all') {
        try {
            const qb = this.registerUser
                .createQueryBuilder('user')
                .leftJoinAndSelect('user.organization', 'org')
                .leftJoinAndSelect('org.subscriptions', 'sub')
                .leftJoinAndSelect('sub.plan', 'plan')
                .leftJoinAndSelect('sub.product', 'product')
                .leftJoinAndSelect('sub.reseller', 'reseller')
                .where('user.is_primary_user = :primary', { primary: 'Y' })
                .orderBy('org.organization_name', 'ASC');
            if (type === 'trial') {
                qb.andWhere('sub.is_trial_period = true');
            }
            if (type === 'paid') {
                qb.andWhere('sub.is_trial_period = false');
            }
            if (search) {
                qb.andWhere(`(LOWER(org.organization_name) LIKE :search
          OR LOWER(user.first_name) LIKE :search
          OR LOWER(user.last_name) LIKE :search
          OR LOWER(user.business_email) LIKE :search)`, {
                    search: `%${search.toLowerCase()}%`,
                });
            }
            const users = await qb.getMany();
            return users.map((user) => {
                const subscription = user.organization.subscriptions?.[0];
                const location = location_util_1.LocationUtil.getLocationDetails(user.organization);
                return {
                    customer_id: user.organization.customer_id,
                    organization_code: user.organization.organization_code,
                    organization_name: user.organization.organization_name,
                    gst_number: user.organization.gst_number,
                    ...location,
                    product_name: subscription?.product?.product_name ?? 'Norbik Asset',
                    plan_name: subscription?.plan?.plan_name ?? '-',
                    reseller_name: subscription?.reseller?.reseller_name ?? '-',
                    billing_type: subscription?.reseller ? 'Reseller' : 'Direct',
                    subscription_type: subscription?.is_trial_period ? 'Trial' : 'Paid',
                    primary_contact: `${user.first_name} ${user.last_name}`,
                    email: user.business_email,
                    phone_number: user.phone_number,
                    status: user.organization.status ? 'Active' : 'Inactive',
                };
            });
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to export organizations');
        }
    }
    async createCustomer(createOrganizationDto, context) {
        const { companyName, firstName, lastName, businessEmail, phoneNumber, industryId, billingFirstName, billingLastName, billingEmail, billingPhone, sameAsPrimary, productId, streetAddress, landmark, city, state, country, postalCode, billingType, resellerId, } = createOrganizationDto;
        const assignedProductId = productId || 1;
        if (!companyName ||
            !firstName ||
            !lastName ||
            !businessEmail ||
            !phoneNumber ||
            !industryId) {
            throw new common_1.BadRequestException({
                statusCode: 400,
                message: 'Missing required fields.',
            });
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(businessEmail)) {
            throw new common_1.BadRequestException({
                statusCode: 400,
                message: 'Invalid email format.',
            });
        }
        const [localPart, domain] = businessEmail.trim().toLowerCase().split('@');
        const normalizedEmail = domain === 'gmail.com' || domain === 'googlemail.com'
            ? `${localPart.split('+')[0].replace(/\./g, '')}@${domain}`
            : `${localPart}@${domain}`;
        try {
            const existingOrg = await this.orgRepo.findOne({
                where: { organization_name: companyName },
                relations: ['users'],
            });
            const existingUserGlobal = await this.registerUser.findOne({
                where: { business_email: normalizedEmail },
                relations: ['organization'],
            });
            if (existingOrg &&
                existingUserGlobal &&
                existingUserGlobal.organization.organization_name === companyName) {
                if (!existingUserGlobal.verified) {
                    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
                    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);
                    existingUserGlobal.otp = newOtp;
                    existingUserGlobal.otp_expiry = otpExpiry;
                    await this.registerUser.save(existingUserGlobal);
                    return {
                        statusCode: 200,
                        message: 'OTP resent. Please check your email for verification.',
                        data: { userId: existingUserGlobal.user_id },
                    };
                }
                return {
                    statusCode: 200,
                    message: 'Email already verified. Please log in.',
                    data: { redirectToLogin: true, userId: existingUserGlobal.user_id },
                };
            }
            if (!existingOrg && existingUserGlobal) {
                if (existingUserGlobal.verified) {
                    throw new common_1.BadRequestException({
                        statusCode: 400,
                        message: 'You already registered with this email. Please log in.',
                    });
                }
                existingUserGlobal.first_name = firstName;
                existingUserGlobal.last_name = lastName;
                existingUserGlobal.phone_number = phoneNumber;
                const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
                const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);
                existingUserGlobal.otp = newOtp;
                existingUserGlobal.otp_expiry = otpExpiry;
                await this.registerUser.save(existingUserGlobal);
                return {
                    statusCode: 200,
                    message: 'Email exists but not verified. OTP resent.',
                    data: { userId: existingUserGlobal.user_id },
                };
            }
            const schemaName = companyName.toLowerCase().replace(/\s+/g, '_');
            const organization = this.orgRepo.create({
                organization_name: companyName,
                organization_schema_name: schemaName,
                industry_type_id: industryId,
                customer_id: createOrganizationDto.customerId || null,
                payment_term: createOrganizationDto.paymentTerm || null,
                gst_registered: createOrganizationDto.gstRegistered ?? false,
                gst_number: createOrganizationDto.gstRegistered
                    ? createOrganizationDto.gstNumber
                    : null,
                street: streetAddress || null,
                landmark: landmark || null,
                city: city ? city.toString() : null,
                state: state ? state.toString() : null,
                country: country ? country.toString() : null,
                postal_code: postalCode || null,
            });
            const savedOrg = await this.orgRepo.save(organization);
            const organizationCode = `ORG-${String(savedOrg.organization_id).padStart(2, '0')}`;
            await this.orgRepo.update({ organization_id: savedOrg.organization_id }, { organization_code: organizationCode });
            savedOrg.organization_code = organizationCode;
            const otp = Math.floor(100000 + Math.random() * 900000).toString();
            const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);
            const user = this.registerUser.create({
                organization: savedOrg,
                first_name: firstName,
                last_name: lastName,
                business_email: normalizedEmail,
                phone_number: phoneNumber,
                otp,
                otp_expiry: otpExpiry,
                is_primary_user: 'Y',
            });
            const savedUser = await this.registerUser.save(user);
            const today = new Date();
            const renewalDate = new Date(today);
            renewalDate.setMonth(today.getMonth() + 1);
            const SubbillingId = await this.generateBillingId();
            const subOrderId = await this.generateOrderId();
            const orgSub = this.subscriptionRepository.create({
                organization_profile_id: savedOrg.organization_id,
                plan_id: 1,
                plan_billing_id: '5',
                subscription_type_id: 1,
                start_date: today,
                renewal_date: renewalDate,
                payment_status: 'pending',
                price: 0,
                discounted_price: 0,
                grand_total: 0,
                is_active: false,
                is_deleted: false,
                created_by: savedUser.user_id,
                purchase_date: today,
                sub_billing_id: SubbillingId,
                sub_order_id: subOrderId,
                productId: assignedProductId,
                reseller_id: billingType === 'Reseller' ? resellerId : null,
            });
            const savedSub = await this.subscriptionRepository.save(orgSub);
            let billing = await this.billingInfoRepository.findOne({
                where: { org_subscription_id: savedSub.subscription_id },
            });
            if (!billing) {
                billing = this.billingInfoRepository.create({
                    org_subscription_id: savedSub.subscription_id,
                    first_name: billingFirstName,
                    last_name: billingLastName,
                    email: billingEmail,
                    phone_number: billingPhone,
                    same_as_primary_contact: sameAsPrimary,
                    methodId: 5,
                    created_at: new Date(),
                    updated_at: new Date(),
                    productId: assignedProductId,
                });
                billing = await this.billingInfoRepository.save(billing);
            }
            await this.activityLogService.logActivity({
                organization_id: savedOrg.organization_id,
                subscription_id: savedSub.subscription_id,
                user_id: savedUser.user_id,
                module_name: activity_log_entity_1.ModuleName.CUSTOMER,
                operation_type: activity_log_entity_1.OperationType.CREATE,
                operation_status: activity_log_entity_1.OperationStatus.SUCCESS,
                remarks: `Customer ${savedOrg.organization_code} created successfully.`,
                old_data: null,
                new_data: {
                    organization_code: savedOrg.organization_code,
                    organization_name: savedOrg.organization_name,
                    customer_id: savedOrg.customer_id,
                    business_email: savedUser.business_email,
                    subscription_id: savedSub.subscription_id,
                    product_id: assignedProductId,
                },
                created_by: savedUser.user_id,
            });
            return {
                statusCode: 200,
                message: 'Customer created successfully. Password sent via email.',
                data: {
                    schema: schemaName,
                    userId: savedUser.user_id,
                    subscriptionId: savedSub.subscription_id,
                },
            };
        }
        catch (error) {
            console.error('Error creating organization:', error);
            error_handler_util_1.ErrorHandler.log('Error creating organization', error);
            error_handler_util_1.ErrorHandler.throwInternalServerError(error, 'Error creating organization');
        }
    }
    async updateCustomer(updateDto) {
        console.log('================ UPDATE DTO ================');
        console.log(JSON.stringify(updateDto, null, 2));
        console.log('============================================');
        const { subscriptionId, companyName, firstName, lastName, businessEmail, phoneNumber, industryId, billingFirstName, billingLastName, billingEmail, billingPhone, planId, billingCycle, startDate, endDate, price, sameAsPrimary, streetAddress, landmark, city, state, country, postalCode, billingType, resellerId, } = updateDto;
        if (!subscriptionId ||
            !companyName ||
            !firstName ||
            !lastName ||
            !businessEmail ||
            !phoneNumber ||
            !industryId) {
            throw new common_1.BadRequestException({
                statusCode: 400,
                message: 'Missing required fields.',
            });
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(businessEmail)) {
            throw new common_1.BadRequestException({
                statusCode: 400,
                message: 'Invalid email format.',
            });
        }
        const [localPart, domain] = businessEmail.trim().toLowerCase().split('@');
        const normalizedEmail = domain === 'gmail.com' || domain === 'googlemail.com'
            ? `${localPart.split('+')[0].replace(/\./g, '')}@${domain}`
            : `${localPart}@${domain}`;
        try {
            const subscription = await this.subscriptionRepository.findOne({
                where: { organization_profile_id: subscriptionId },
                relations: ['organization', 'organization.users', 'billingInfo'],
            });
            if (!subscription) {
                throw new common_1.NotFoundException({ message: 'Subscription not found.' });
            }
            const organization = subscription.organization;
            const primaryUser = organization.users.find((u) => u.is_primary_user === 'Y');
            if (!primaryUser) {
                throw new common_1.NotFoundException({ message: 'Primary user not found.' });
            }
            organization.organization_name = companyName;
            organization.industry_type_id = industryId;
            organization.street = streetAddress;
            organization.landmark = landmark;
            organization.city = city;
            organization.state = state;
            organization.country = country;
            organization.postal_code = postalCode;
            await this.orgRepo.save(organization);
            primaryUser.first_name = firstName;
            primaryUser.last_name = lastName;
            primaryUser.business_email = normalizedEmail;
            primaryUser.phone_number = phoneNumber;
            await this.registerUser.save(primaryUser);
            subscription.plan_id = planId || subscription.plan_id;
            subscription.plan_billing_id =
                billingCycle || subscription.plan_billing_id;
            const start = startDate ? new Date(startDate) : subscription.start_date;
            const renewal = endDate ? new Date(endDate) : subscription.renewal_date;
            subscription.start_date = start;
            subscription.renewal_date = renewal;
            subscription.price = price ? Number(price) : subscription.price;
            await this.subscriptionRepository.save(subscription);
            let billing = subscription.billingInfo?.[0];
            if (billing) {
                billing.first_name = billingFirstName;
                billing.last_name = billingLastName;
                billing.email = billingEmail;
                billing.phone_number = billingPhone;
                billing.same_as_primary_contact = sameAsPrimary;
                await this.billingInfoRepository.save(billing);
            }
            else {
                billing = this.billingInfoRepository.create({
                    org_subscription_id: subscription.subscription_id,
                    first_name: billingFirstName,
                    last_name: billingLastName,
                    email: billingEmail,
                    phone_number: billingPhone,
                    same_as_primary_contact: sameAsPrimary,
                    methodId: 5,
                    created_at: new Date(),
                    updated_at: new Date(),
                });
                await this.billingInfoRepository.save(billing);
            }
            if (planId && planId !== subscription.plan_id) {
                const planFeatures = await this.planFeatureMappingRepository.find({
                    where: { plan_id: planId },
                    relations: ['feature'],
                });
                const pricingLimitations = planFeatures.map((mapping) => this.pricingOverrideRepo.create({
                    org_id: organization.organization_id,
                    plan_id: planId,
                    feature_id: mapping.feature_id,
                    mapping_id: mapping.mapping_id,
                    override_value: mapping.feature_value ?? '0',
                    default_value: mapping.feature_value ?? '0',
                    is_active: true,
                    is_deleted: false,
                }));
                await this.pricingOverrideRepo.save(pricingLimitations);
            }
            let paymentTx = await this.paymentTransactionRepository.findOne({
                where: { org_subscription_id: subscription.subscription_id },
            });
            if (paymentTx) {
                paymentTx.amount = Number(price) || paymentTx.amount;
                paymentTx.currency = 'INR';
                paymentTx.payment_method = 5;
                paymentTx.transaction_status =
                    paymentTx.transaction_status || 'pending';
                paymentTx.updated_at = new Date();
                if (price) {
                    paymentTx.paid_at = new Date();
                }
                await this.paymentTransactionRepository.save(paymentTx);
            }
            else {
                paymentTx = this.paymentTransactionRepository.create({
                    org_subscription_id: subscription.subscription_id,
                    amount: Number(price) || 0,
                    currency: 'INR',
                    payment_method: 5,
                    transaction_status: 'pending',
                    transaction_reference: `INIT-${Date.now()}`,
                    methodId: 5,
                    created_at: new Date(),
                    updated_at: new Date(),
                    paid_at: null,
                });
                await this.paymentTransactionRepository.save(paymentTx);
            }
            return {
                statusCode: 200,
                message: 'Customer updated successfully.',
                data: {
                    subscriptionId: subscription.subscription_id,
                    userId: primaryUser.user_id,
                    organizationId: organization.organization_id,
                },
            };
        }
        catch (error) {
            console.error('Error updating customer:', error);
            error_handler_util_1.ErrorHandler.log('Error updating customer', error);
            error_handler_util_1.ErrorHandler.throwInternalServerError(error, 'Error updating customer');
        }
    }
    async createOrUpdateOrder(orderDto, context) {
        const { organizationId, planId, billingCycle, startDate, endDate, price, autoRenewal, isTrialPeriod, paymentMethodId, paymentTerm, customerPO, paymentStatus, orderPlacedBy, productId, trialPeriodUnit, trialPeriodCount, trialStartDate, trialExpiryDate, gracePeriod, percentage, grandTotal, resellerId, } = orderDto;
        if (!organizationId || !planId || !billingCycle || !price || !productId) {
            throw new common_1.BadRequestException({
                statusCode: 400,
                message: 'Missing required fields.',
            });
        }
        try {
            const primaryUser = await this.registerUser.findOne({
                where: { organization_id: organizationId, is_primary_user: 'Y' },
                relations: ['organization'],
            });
            if (!primaryUser)
                throw new common_1.BadRequestException({
                    statusCode: 404,
                    message: 'Primary user not found for this organization.',
                });
            const organization = primaryUser.organization;
            const today = new Date();
            const renewalDate = endDate ? new Date(endDate) : new Date(today);
            if (!endDate) {
                if (billingCycle === 'monthly')
                    renewalDate.setMonth(renewalDate.getMonth() + 1);
                else if (billingCycle === 'yearly')
                    renewalDate.setFullYear(renewalDate.getFullYear() + 1);
            }
            let subscription = await this.subscriptionRepository.findOne({
                where: { organization_profile_id: organizationId, productId },
            });
            console.log('subscription subscription:', subscription);
            if (!subscription) {
                const subBillingId = await this.generateBillingId();
                const subOrderId = await this.generateOrderId();
                subscription = this.subscriptionRepository.create({
                    organization_profile_id: organizationId,
                    productId,
                    plan_id: planId,
                    plan_billing_id: billingCycle,
                    subscription_type_id: 1,
                    start_date: new Date(startDate) || today,
                    renewal_date: renewalDate,
                    price: Number(price),
                    auto_renewal: autoRenewal,
                    is_trial_period: isTrialPeriod,
                    percentage: orderDto.percentage || 0,
                    grand_total: Number(grandTotal),
                    payment_status: paymentStatus,
                    sub_billing_id: subBillingId,
                    sub_order_id: subOrderId,
                    created_by: context.userId,
                    purchase_date: today,
                    payment_mode: Number(paymentMethodId),
                    is_activated: true,
                    trial_period_unit: trialPeriodUnit || null,
                    trial_period_count: trialPeriodCount || null,
                    trial_start_date: trialStartDate ? new Date(trialStartDate) : null,
                    trial_expiry_date: trialExpiryDate ? new Date(trialExpiryDate) : null,
                    grace_period: gracePeriod || 0,
                    reseller_id: resellerId || null,
                });
            }
            else {
                subscription.plan_billing_id = billingCycle;
                subscription.plan_id = planId;
                subscription.start_date =
                    new Date(startDate) || subscription.start_date;
                subscription.renewal_date = renewalDate;
                subscription.price = Number(price);
                subscription.auto_renewal = autoRenewal;
                subscription.is_trial_period = isTrialPeriod;
                subscription.grand_total = grandTotal;
                subscription.payment_status = paymentStatus;
                subscription.purchase_date = today;
                subscription.payment_mode = Number(paymentMethodId);
                subscription.is_active = true;
                subscription.is_activated = true;
                subscription.productId = productId;
                subscription.percentage =
                    orderDto.percentage || subscription.percentage || 0;
                subscription.trial_period_unit =
                    trialPeriodUnit || subscription.trial_period_unit;
                subscription.trial_period_count =
                    trialPeriodCount || subscription.trial_period_count;
                subscription.trial_start_date = trialStartDate
                    ? new Date(trialStartDate)
                    : subscription.trial_start_date;
                subscription.trial_expiry_date = trialExpiryDate
                    ? new Date(trialExpiryDate)
                    : subscription.trial_expiry_date;
                subscription.grace_period = gracePeriod ?? subscription.grace_period;
                subscription.reseller_id = resellerId ?? subscription.reseller_id;
            }
            const savedSub = await this.subscriptionRepository.save(subscription);
            let billing = await this.billingInfoRepository.findOne({
                where: { org_subscription_id: savedSub.subscription_id },
            });
            if (!billing) {
                billing = this.billingInfoRepository.create({
                    org_subscription_id: savedSub.subscription_id,
                    orderplacedby: orderPlacedBy,
                    paymentterm: paymentTerm,
                    customerpo: customerPO,
                    methodId: paymentMethodId || 5,
                    company_name: organization.organization_name,
                    first_name: primaryUser.first_name,
                    last_name: primaryUser.last_name,
                    email: primaryUser.business_email,
                    phone_number: primaryUser.phone_number,
                    productId,
                    created_at: new Date(),
                    updated_at: new Date(),
                });
            }
            else {
                billing.methodId = paymentMethodId || billing.methodId;
                billing.orderplacedby = orderPlacedBy;
                billing.paymentterm = paymentTerm;
                billing.customerpo = customerPO;
                billing.company_name = organization.organization_name;
                billing.first_name = primaryUser.first_name;
                billing.last_name = primaryUser.last_name;
                billing.email = primaryUser.business_email;
                billing.phone_number = primaryUser.phone_number;
                billing.productId = productId;
                billing.updated_at = new Date();
            }
            const savedBilling = await this.billingInfoRepository.save(billing);
            const order = await this.findOne(savedSub.subscription_id);
            const pdfBuffer = await this.pdfService.generateOrderPdf(order);
            const uploadDir = path.join(process.cwd(), 'uploads', 'orderspdf');
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
            }
            const fileName = `${savedSub.sub_order_id}.pdf`;
            const filePath = path.join(uploadDir, fileName);
            fs.writeFileSync(filePath, pdfBuffer);
            savedSub.order_pdf = {
                fileName,
                url: `/uploads/orderspdf/${fileName}`,
                generatedAt: new Date().toISOString(),
                size: pdfBuffer.length,
                mimeType: 'application/pdf',
            };
            await this.subscriptionRepository.save(savedSub);
            const productRepo = await this.dataSource.getRepository(product_entity_1.Product);
            const product = await productRepo.findOne({ where: { productId } });
            if (!product)
                throw new common_1.BadRequestException({
                    statusCode: 404,
                    message: 'Product not found.',
                });
            const schemaName = `${product.schemaInitial}_org_${organization.organization_schema_name}`;
            const schemaExists = await this.dataSource.query(`SELECT schema_name FROM information_schema.schemata WHERE schema_name = $1`, [schemaName]);
            if (schemaExists.length === 0) {
                if (productId === 1) {
                    const schemaManager = new OrganisationSchemaManager_1.OrganizationSchemaManager(this.dataSource, this.mailConfigService, this.mailService);
                    await schemaManager.createOrganizationSchemaAndTables(primaryUser);
                }
                else {
                    const hrmsSchemaManager = new HrmsOrganisationSchemaManager_1.HrmsOrganizationSchemaManager(this.dataSource, this.mailConfigService, this.mailService);
                    await hrmsSchemaManager.createOrganizationSchemaAndTables(primaryUser);
                }
            }
            else {
                console.log(`Schema "${schemaName}" already exists. Skipping creation.`);
            }
            try {
                const plan = await this.planRepository.findOne({
                    where: { plan_id: planId },
                });
                const productName = product?.name || 'Selected Product';
                await this.mailService.sendEmail(primaryUser.business_email, 'Your Subscription Order Has Been Placed Successfully', await (0, render_email_1.renderEmail)(render_email_1.EmailTemplate.PO_CONFIRMATION_EMAIL, {
                    name: primaryUser.first_name + ' ' + (primaryUser.last_name || ''),
                    renewalDate: new Date(savedSub.renewal_date).toLocaleDateString('en-IN'),
                    softwareName: productName,
                    planType: plan?.plan_name || 'Selected Plan',
                    users: 1 || 1,
                    duration: billingCycle === 'monthly' ? '1 Month' : '1 Year',
                    amount: `₹${Number(price).toLocaleString('en-IN')}`,
                    poNumber: customerPO || 'N/A',
                }, this.mailConfigService));
            }
            catch (emailError) {
                console.error('Failed to send order email:', emailError);
            }
            try {
                const plan = await this.planRepository.findOne({
                    where: { plan_id: planId },
                });
                const productName = product?.name || 'Selected Product';
                await this.mailService.sendEmail(primaryUser.business_email, `Offline Payment Instructions – ${productName}`, await (0, render_email_1.renderEmail)(render_email_1.EmailTemplate.OFFLINE_PAYMENT_EMAIL, {
                    name: primaryUser.first_name + ' ' + (primaryUser.last_name || ''),
                    softwareName: productName,
                    planType: plan?.plan_name || 'Selected Plan',
                    users: 1,
                    duration: billingCycle === 'monthly' ? '1 Month' : '1 Year',
                    amount: `₹${Number(price).toLocaleString('en-IN')}`,
                    poNumber: customerPO || 'N/A',
                    bankName: 'Your Bank Name',
                    accountName: 'Account Name',
                    accountNumber: 'XXXXXX1234',
                    ifscCode: 'IFSC0001',
                }, this.mailConfigService));
                console.log(`Offline payment email sent to ${primaryUser.business_email}`);
            }
            catch (offlineEmailError) {
                console.error('Failed to send offline payment email:', offlineEmailError);
            }
            if (productId === 1) {
                try {
                    await (0, rxjs_1.firstValueFrom)(this.httpService.post(`${process.env.ASSET_API_URL}/organization/create-customer-organisation`, {
                        companyName: organization.organization_name,
                        firstName: primaryUser.first_name,
                        lastName: primaryUser.last_name,
                        businessEmail: primaryUser.business_email,
                        phoneNumber: primaryUser.phone_number,
                        industryId: organization.industry_type_id,
                        org_billing_id: organization.organization_id,
                    }));
                    console.log('✅ Asset org ensured before overrides');
                }
                catch (err) {
                    throw new common_1.BadRequestException('Asset org creation failed');
                }
            }
            if (orderDto.featureOverrides?.length) {
                await this.updateOverrides1(orderDto.organizationId, orderDto.featureOverrides, context.userId);
            }
            return {
                statusCode: 200,
                message: 'Order created/updated successfully',
                data: {
                    subscriptionId: savedSub.subscription_id,
                    orderId: savedSub.sub_order_id,
                    subscription: savedSub,
                    organization: {
                        organizationId: organization.organization_id,
                        companyName: organization.organization_name,
                        organizationSchemaName: organization.organization_schema_name,
                        industryId: organization.industry_type_id,
                        firstName: primaryUser.first_name,
                        lastName: primaryUser.last_name,
                        businessEmail: primaryUser.business_email,
                        phoneNumber: primaryUser.phone_number,
                    },
                },
            };
        }
        catch (error) {
            console.error('Error creating/updating order:', error);
            error_handler_util_1.ErrorHandler.log('Error creating/updating order', error);
            error_handler_util_1.ErrorHandler.throwInternalServerError(error, 'Error creating/updating order');
        }
    }
    async generateBillingId() {
        const date = new Date();
        const day = date.toISOString().slice(0, 10).replace(/-/g, '');
        const lastSub = await this.subscriptionRepository
            .createQueryBuilder('sub')
            .where('sub.sub_billing_id  LIKE :day', { day: `BILL-${day}-%` })
            .orderBy('sub.sub_billing_id ', 'DESC')
            .getOne();
        let seq = 1;
        if (lastSub) {
            seq = parseInt(String(lastSub.sub_billing_id).split('-')[2]) + 1;
        }
        return `BILL-${day}-${seq.toString().padStart(4, '0')}`;
    }
    async generateOrderId() {
        const date = new Date();
        const day = date.toISOString().slice(0, 10).replace(/-/g, '');
        const lastOrder = await this.subscriptionRepository
            .createQueryBuilder('sub')
            .where('sub.sub_order_id LIKE :day', { day: `ORD-${day}-%` })
            .orderBy('sub.sub_order_id', 'DESC')
            .getOne();
        let seq = 1;
        if (lastOrder) {
            const parts = lastOrder.sub_order_id.split('-');
            seq = parseInt(parts[2], 10) + 1;
        }
        return `ORD-${day}-${seq.toString().padStart(4, '0')}`;
    }
    async findOne(subscriptionId) {
        const subscription = await this.subscriptionRepository.findOne({
            where: {
                subscription_id: subscriptionId,
            },
            relations: ['plan', 'product', 'billingInfo'],
        });
        if (!subscription) {
            throw new common_1.NotFoundException('Order not found');
        }
        return subscription;
    }
    async createOrganizationSchemaAndTables(user) {
        console.log('user die:', user);
        const randomPassword = Math.random().toString(36).slice(-8);
        console.log('randomPassword:', randomPassword);
        const hashedPassword = await this.hashPassword(randomPassword);
        user.verified = true;
        user.otp = null;
        user.otp_expiry = null;
        user.password = hashedPassword;
        await this.registerUser.save(user);
        console.log('hashedPassword:', hashedPassword);
        const schemaName = `org_${user.organization.organization_schema_name}`;
        await this.dataSource.query(`CREATE SCHEMA IF NOT EXISTS ${schemaName}`);
        console.log('1');
        const script1 = new organization_profile_1.OrganizationProfileScript(this.dataSource);
        await script1.createOrganizationProfileTable(schemaName);
        await script1.insertOrganizationProfileTable(schemaName, user);
        const departmentscript = new departments_1.DepartmentsScript(this.dataSource);
        await departmentscript.createDepartmentsTable(schemaName);
        const designationcript = new designation_1.DesignationScript(this.dataSource);
        await designationcript.createDesignationTable(schemaName);
        const organizationrolesscript = new organization_roles_1.OrganizationRolesScript(this.dataSource);
        await organizationrolesscript.createOrganizationRolesTable(schemaName);
        const script = new users_1.UserScript(this.dataSource);
        await script.createUserTable(schemaName);
        console.log('2');
        const branchscript = new branches_1.BranchesScript(this.dataSource);
        await branchscript.createBranchesTable(schemaName);
        console.log('3');
        const departmentData = [
            { department_name: 'Administration' },
            { department_name: 'Human Resources (HR)' },
            { department_name: 'Store' },
            { department_name: 'Sales' },
            { department_name: 'Support/ Customer Service' },
        ];
        await departmentscript.insertOrganizationDepartmentTable(schemaName, departmentData);
        console.log('4');
        const rolesData = [
            { role_id: 1, role_name: 'Admin' },
            { role_id: 2, role_name: 'User' },
        ];
        await organizationrolesscript.insertOrganizationRolesTable(schemaName, rolesData);
        console.log('5');
        const organizationpermissionsscript = new organization_permissions_1.OrganizationPermissionScript(this.dataSource);
        await organizationpermissionsscript.createOrganizationPermissionTable(schemaName);
        const rolesPermissionData = [
            { role_id: 1, permission: AdminDefaultPermission_1.adminDefaultPermission },
            { role_id: 2, permission: UserDefaultPermission_1.userDefaultPermission },
        ];
        await organizationpermissionsscript.insertOrganizationRolesPermissionTable(schemaName, rolesPermissionData);
        console.log('6');
        if (user) {
            user.role_id = 1;
            user.department_id = 1;
        }
        const inserted = await script.insertUserTable(schemaName, user);
        console.log('8');
        const fieldCategoryScript = new assetfieldcategory_1.assetFieldCategoryScript(this.dataSource);
        await fieldCategoryScript.createAssetFieldCategoryScriptTable(schemaName);
        const fieldCategoryData = [
            { asset_field_category_name: 'General Information' },
            { asset_field_category_name: 'Network & Domain Information' },
            { asset_field_category_name: 'System Specification' },
        ];
        await fieldCategoryScript.insertFieldCategoryTable(schemaName, fieldCategoryData);
        const insertedFieldCategories = await this.dataSource.query(`SELECT asset_field_category_id, asset_field_category_name 
       FROM ${schemaName}.asset_field_category 
       WHERE asset_field_category_name IN ('General Information', 'Network & Domain Information', 'System Specification')`);
        const categoryMap = {};
        insertedFieldCategories.forEach((cat) => {
            categoryMap[cat.asset_field_category_name] = cat.asset_field_category_id;
        });
        console.log('9');
        const fieldScript = new assetitemfields_1.ItemFieldsScript(this.dataSource);
        await fieldScript.createItemFieldsTable(schemaName);
        const fieldData = [
            {
                asset_field_name: 'Location',
                asset_field_category_id: categoryMap['General Information'],
                asset_field_label_name: 'Location',
                asset_field_type: 'text',
            },
            {
                asset_field_name: 'Expiry Date',
                asset_field_category_id: categoryMap['General Information'],
                asset_field_label_name: 'Expiry Date',
                asset_field_type: 'text',
            },
            {
                asset_field_name: 'Port',
                asset_field_category_id: categoryMap['General Information'],
                asset_field_label_name: 'Port',
                asset_field_type: 'text',
            },
            {
                asset_field_name: 'Contract Type',
                asset_field_category_id: categoryMap['General Information'],
                asset_field_label_name: 'Contract Type',
                asset_field_type: 'text',
            },
            {
                asset_field_name: 'Firmware Version',
                asset_field_category_id: categoryMap['General Information'],
                asset_field_label_name: 'Firmware Version',
                asset_field_type: 'text',
            },
            {
                asset_field_name: 'Processor',
                asset_field_category_id: categoryMap['System Specification'],
                asset_field_label_name: 'Processor',
                asset_field_type: 'text',
            },
            {
                asset_field_name: 'RAM',
                asset_field_category_id: categoryMap['System Specification'],
                asset_field_label_name: 'RAM',
                asset_field_type: 'text',
            },
            {
                asset_field_name: 'HDD',
                asset_field_category_id: categoryMap['System Specification'],
                asset_field_label_name: 'HDD',
                asset_field_type: 'text',
            },
            {
                asset_field_name: 'Graphics',
                asset_field_category_id: categoryMap['System Specification'],
                asset_field_label_name: 'Graphics',
                asset_field_type: 'text',
            },
            {
                asset_field_name: 'Screen Size',
                asset_field_category_id: categoryMap['System Specification'],
                asset_field_label_name: 'Screen Size',
                asset_field_type: 'text',
            },
            {
                asset_field_name: 'Screen',
                asset_field_category_id: categoryMap['System Specification'],
                asset_field_label_name: 'Screen',
                asset_field_type: 'text',
            },
            {
                asset_field_name: 'Pixel',
                asset_field_category_id: categoryMap['General Information'],
                asset_field_label_name: 'Pixel',
                asset_field_type: 'text',
            },
            {
                asset_field_name: 'Product Description',
                asset_field_category_id: categoryMap['General Information'],
                asset_field_label_name: 'Product Description',
                asset_field_type: 'text',
            },
            {
                asset_field_name: 'Type',
                asset_field_category_id: categoryMap['General Information'],
                asset_field_label_name: 'Type',
                asset_field_type: 'text',
            },
            {
                asset_field_name: 'Capacity',
                asset_field_category_id: categoryMap['General Information'],
                asset_field_label_name: 'Capacity',
                asset_field_type: 'text',
            },
            {
                asset_field_name: 'Host Name',
                asset_field_category_id: categoryMap['General Information'],
                asset_field_label_name: 'Host Name',
                asset_field_type: 'text',
            },
            {
                asset_field_name: 'Domain Name',
                asset_field_category_id: categoryMap['Network & Domain Information'],
                asset_field_label_name: 'Domain Name',
                asset_field_type: 'text',
            },
            {
                asset_field_name: 'Carrier',
                asset_field_category_id: categoryMap['Network & Domain Information'],
                asset_field_label_name: 'Carrier',
                asset_field_type: 'text',
            },
            {
                asset_field_name: 'IMEI No.',
                asset_field_category_id: categoryMap['Network & Domain Information'],
                asset_field_label_name: 'IMEI No.',
                asset_field_type: 'text',
            },
            {
                asset_field_name: 'IPv4',
                asset_field_category_id: categoryMap['Network & Domain Information'],
                asset_field_label_name: 'IPv4',
                asset_field_type: 'text',
            },
            {
                asset_field_name: 'Platform',
                asset_field_category_id: categoryMap['Network & Domain Information'],
                asset_field_label_name: 'Platform',
                asset_field_type: 'text',
            },
        ];
        await fieldScript.insertAssetFieldsTable(schemaName, fieldData);
        console.log('10');
        const itemfieldMappingScript = new assetitemfieldmapping_1.ItemFieldsMappingScript(this.dataSource);
        await itemfieldMappingScript.createItemFieldsMappingTable(schemaName);
        console.log('11');
        const assetCategoryScript = new category_1.CategoryScript(this.dataSource);
        await assetCategoryScript.createCategoryTable(schemaName);
        const assetMainCategoryData = [
            { main_category_name: 'IT' },
            { main_category_name: 'Non IT' },
        ];
        await assetCategoryScript.insertAssetMainCategoryTable(schemaName, assetMainCategoryData);
        const insertedMainCategories = await this.dataSource.query(`SELECT main_category_id, main_category_name FROM ${schemaName}.asset_main_category WHERE main_category_name IN ('IT', 'Non IT')`);
        const mainCatMap = {};
        insertedMainCategories.forEach((cat) => {
            mainCatMap[cat.main_category_name] = cat.main_category_id;
        });
        if (!mainCatMap['IT'] || !mainCatMap['Non IT']) {
            throw new Error('Main category IDs not found.');
        }
        console.log('12');
        const assetSubCategoryScript = new subcategory_1.SubCategoryScript(this.dataSource);
        await assetSubCategoryScript.createSubCategoryTable(schemaName);
        const assetSubCategoryData = [
            { main_category_id: mainCatMap['IT'], sub_category_name: 'Hardware' },
            { main_category_id: mainCatMap['IT'], sub_category_name: 'Software' },
            { main_category_id: mainCatMap['IT'], sub_category_name: 'Cloud' },
            { main_category_id: mainCatMap['IT'], sub_category_name: 'Data' },
            {
                main_category_id: mainCatMap['IT'],
                sub_category_name: 'Consumable Inventory',
            },
            {
                main_category_id: mainCatMap['Non IT'],
                sub_category_name: 'Electrical Equipment',
            },
            {
                main_category_id: mainCatMap['Non IT'],
                sub_category_name: 'Scientific Equipment',
            },
            {
                main_category_id: mainCatMap['Non IT'],
                sub_category_name: 'Office Equipment',
            },
            {
                main_category_id: mainCatMap['Non IT'],
                sub_category_name: 'Furniture',
            },
        ];
        await assetSubCategoryScript.insertAssetSubCategoryTable(schemaName, assetSubCategoryData);
        console.log('13');
        const insertedSubCategories = await this.dataSource.query(`SELECT sub_category_id, sub_category_name, main_category_id FROM ${schemaName}.asset_sub_category`);
        const subCatMap = {};
        insertedSubCategories.forEach((sub) => {
            const mainName = Object.keys(mainCatMap).find((key) => mainCatMap[key] === sub.main_category_id);
            if (mainName) {
                if (!subCatMap[mainName])
                    subCatMap[mainName] = {};
                subCatMap[mainName][sub.sub_category_name] = sub.sub_category_id;
            }
        });
        const assetItemScript = new items_1.ItemsScript(this.dataSource);
        await assetItemScript.createItemsTable(schemaName);
        const assetItemRawData = [
            {
                main: 'IT',
                sub: 'Hardware',
                name: 'Computer',
                is_licensable: true,
                item_type: 'Physical',
            },
            {
                main: 'IT',
                sub: 'Hardware',
                name: 'Server',
                is_licensable: true,
                item_type: 'Physical',
            },
            {
                main: 'IT',
                sub: 'Hardware',
                name: 'Mobile',
                is_licensable: true,
                item_type: 'Physical',
            },
            {
                main: 'IT',
                sub: 'Hardware',
                name: 'Keyboard',
                is_licensable: false,
                item_type: 'Physical',
            },
            {
                main: 'IT',
                sub: 'Hardware',
                name: 'Mouse',
                is_licensable: false,
                item_type: 'Physical',
            },
            {
                main: 'IT',
                sub: 'Hardware',
                name: 'Webcam',
                is_licensable: false,
                item_type: 'Physical',
            },
            {
                main: 'IT',
                sub: 'Hardware',
                name: 'Router',
                is_licensable: false,
                item_type: 'Physical',
            },
            {
                main: 'IT',
                sub: 'Hardware',
                name: 'Switch',
                is_licensable: false,
                item_type: 'Physical',
            },
            {
                main: 'IT',
                sub: 'Hardware',
                name: 'Peripherals',
                is_licensable: false,
                item_type: 'Physical',
            },
            {
                main: 'IT',
                sub: 'Hardware',
                name: 'Printer and Scanners',
                is_licensable: false,
                item_type: 'Physical',
            },
            {
                main: 'IT',
                sub: 'Hardware',
                name: 'IP Camera',
                is_licensable: false,
                item_type: 'Physical',
            },
            {
                main: 'IT',
                sub: 'Hardware',
                name: 'Access Point',
                is_licensable: false,
                item_type: 'Physical',
            },
            {
                main: 'IT',
                sub: 'Hardware',
                name: 'Monitors',
                is_licensable: false,
                item_type: 'Physical',
            },
            {
                main: 'IT',
                sub: 'Hardware',
                name: 'Headset',
                is_licensable: false,
                item_type: 'Physical',
            },
            {
                main: 'IT',
                sub: 'Hardware',
                name: 'Projector',
                is_licensable: false,
                item_type: 'Physical',
            },
            {
                main: 'IT',
                sub: 'Hardware',
                name: 'Tablet',
                is_licensable: true,
                item_type: 'Physical',
            },
            {
                main: 'IT',
                sub: 'Hardware',
                name: 'Videoconference Camera',
                is_licensable: false,
                item_type: 'Physical',
            },
            {
                main: 'IT',
                sub: 'Hardware',
                name: 'Storage Device',
                is_licensable: true,
                item_type: 'Physical',
            },
            {
                main: 'IT',
                sub: 'Software',
                name: 'Operating System',
                is_licensable: true,
                item_type: 'Virtual',
            },
            {
                main: 'IT',
                sub: 'Software',
                name: 'Application Software',
                is_licensable: true,
                item_type: 'Virtual',
            },
            {
                main: 'IT',
                sub: 'Software',
                name: 'Contract',
                is_licensable: true,
                item_type: 'Virtual',
            },
            {
                main: 'IT',
                sub: 'Cloud',
                name: 'Virtual Machine',
                is_licensable: true,
                item_type: 'Virtual',
            },
            {
                main: 'IT',
                sub: 'Cloud',
                name: 'Storage resources',
                is_licensable: true,
                item_type: 'Virtual',
            },
            {
                main: 'IT',
                sub: 'Data',
                name: 'Contract',
                is_licensable: true,
                item_type: 'Virtual',
            },
            {
                main: 'IT',
                sub: 'Data',
                name: 'Warranty',
                is_licensable: true,
                item_type: 'Virtual',
            },
            {
                main: 'IT',
                sub: 'Data',
                name: 'Business Application',
                is_licensable: true,
                item_type: 'Virtual',
            },
            {
                main: 'IT',
                sub: 'Consumable Inventory',
                name: 'Pen Drive',
                is_licensable: false,
                item_type: 'Physical',
            },
            {
                main: 'IT',
                sub: 'Consumable Inventory',
                name: 'Cartridge',
                is_licensable: false,
                item_type: 'Physical',
            },
            {
                main: 'IT',
                sub: 'Consumable Inventory',
                name: 'CD / DVD',
                is_licensable: false,
                item_type: 'Physical',
            },
            {
                main: 'Non IT',
                sub: 'Electrical Equipment',
                name: 'Air Conditioner',
                is_licensable: false,
                item_type: 'Physical',
            },
            {
                main: 'Non IT',
                sub: 'Electrical Equipment',
                name: 'Pedestal Fan',
                is_licensable: false,
                item_type: 'Physical',
            },
            {
                main: 'Non IT',
                sub: 'Electrical Equipment',
                name: 'Desert Coolers',
                is_licensable: false,
                item_type: 'Physical',
            },
            {
                main: 'Non IT',
                sub: 'Electrical Equipment',
                name: 'Refrigerators',
                is_licensable: false,
                item_type: 'Physical',
            },
            {
                main: 'Non IT',
                sub: 'Electrical Equipment',
                name: 'Microwaves',
                is_licensable: false,
                item_type: 'Physical',
            },
            {
                main: 'Non IT',
                sub: 'Electrical Equipment',
                name: 'Electric Motors',
                is_licensable: false,
                item_type: 'Physical',
            },
            {
                main: 'Non IT',
                sub: 'Electrical Equipment',
                name: 'Generators',
                is_licensable: false,
                item_type: 'Physical',
            },
            {
                main: 'Non IT',
                sub: 'Electrical Equipment',
                name: 'Invertors',
                is_licensable: false,
                item_type: 'Physical',
            },
            {
                main: 'Non IT',
                sub: 'Electrical Equipment',
                name: 'Shredding machine',
                is_licensable: false,
                item_type: 'Physical',
            },
            {
                main: 'Non IT',
                sub: 'Electrical Equipment',
                name: 'Voltage Stabilizer',
                is_licensable: false,
                item_type: 'Physical',
            },
            {
                main: 'Non IT',
                sub: 'Electrical Equipment',
                name: 'UPS',
                is_licensable: false,
                item_type: 'Physical',
            },
            {
                main: 'Non IT',
                sub: 'Furniture',
                name: 'Chair',
                is_licensable: false,
                item_type: 'Physical',
            },
            {
                main: 'Non IT',
                sub: 'Furniture',
                name: 'Computer Desk',
                is_licensable: false,
                item_type: 'Physical',
            },
            {
                main: 'Non IT',
                sub: 'Electrical Equipment',
                name: 'CCTV Camera',
                is_licensable: true,
                item_type: 'Physical',
            },
            {
                main: 'Non IT',
                sub: 'Electrical Equipment',
                name: 'VC Camera',
                is_licensable: true,
                item_type: 'Physical',
            },
            {
                main: 'IT',
                sub: 'Hardware',
                name: 'Wireless AP',
                is_licensable: false,
                item_type: 'Physical',
            },
            {
                main: 'IT',
                sub: 'Software',
                name: 'Firewall',
                is_licensable: false,
                item_type: 'Physical',
            },
        ];
        const assetItemData = assetItemRawData.map((item) => {
            const mainId = mainCatMap[item.main];
            const subId = subCatMap[item.main]?.[item.sub];
            if (!mainId || !subId) {
                throw new Error(`Missing ID mapping for item: ${item.name}`);
            }
            return {
                main_category_id: mainId,
                sub_category_id: subId,
                asset_item_name: item.name,
                is_licensable: item.is_licensable,
                item_type: item.item_type,
            };
        });
        await assetItemScript.insertAssetItemTable(schemaName, assetItemData);
        console.log('14');
        const mappings = [
            { itemName: 'Computer', fieldName: 'RAM' },
            { itemName: 'Computer', fieldName: 'Processor' },
            { itemName: 'Computer', fieldName: 'Graphics' },
            { itemName: 'Computer', fieldName: 'HDD' },
            { itemName: 'Computer', fieldName: 'Host Name' },
            { itemName: 'Computer', fieldName: 'Domain Name' },
            { itemName: 'Computer', fieldName: 'IPv4' },
            { itemName: 'Server', fieldName: 'RAM' },
            { itemName: 'Server', fieldName: 'Processor' },
            { itemName: 'Server', fieldName: 'Graphics' },
            { itemName: 'Server', fieldName: 'HDD' },
            { itemName: 'Server', fieldName: 'IPv4' },
            { itemName: 'Server', fieldName: 'Graphics' },
            { itemName: 'Server', fieldName: 'Host Name' },
            { itemName: 'Server', fieldName: 'Domain Name' },
            { itemName: 'Tablet', fieldName: 'RAM' },
            { itemName: 'Tablet', fieldName: 'Processor' },
            { itemName: 'Tablet', fieldName: 'Graphics' },
            { itemName: 'Tablet', fieldName: 'HDD' },
            { itemName: 'Tablet', fieldName: 'IPv4' },
            { itemName: 'Tablet', fieldName: 'Graphics' },
            { itemName: 'Tablet', fieldName: 'Host Name' },
            { itemName: 'Tablet', fieldName: 'Domain Name' },
            { itemName: 'Mobile', fieldName: 'RAM' },
            { itemName: 'Mobile', fieldName: 'Processor' },
            { itemName: 'Mobile', fieldName: 'Graphics' },
            { itemName: 'Mobile', fieldName: 'HDD' },
            { itemName: 'Mobile', fieldName: 'IPv4' },
            { itemName: 'Mobile', fieldName: 'Screen' },
            { itemName: 'Mobile', fieldName: 'IMEI No.' },
            { itemName: 'Mobile', fieldName: 'Carrier' },
            { itemName: 'Switch', fieldName: 'RAM' },
            { itemName: 'Switch', fieldName: 'Processor' },
            { itemName: 'Switch', fieldName: 'HDD' },
            { itemName: 'Switch', fieldName: 'Host Name' },
            { itemName: 'Switch', fieldName: 'Domain Name' },
            { itemName: 'Switch', fieldName: 'IPv4' },
            { itemName: 'Router', fieldName: 'RAM' },
            { itemName: 'Router', fieldName: 'Processor' },
            { itemName: 'Router', fieldName: 'HDD' },
            { itemName: 'Router', fieldName: 'Host Name' },
            { itemName: 'Router', fieldName: 'Domain Name' },
            { itemName: 'Router', fieldName: 'IPv4' },
            { itemName: 'Firewall', fieldName: 'RAM' },
            { itemName: 'Firewall', fieldName: 'Processor' },
            { itemName: 'Firewall', fieldName: 'HDD' },
            { itemName: 'Firewall', fieldName: 'IPv4' },
            { itemName: 'Firewall', fieldName: 'Graphics' },
            { itemName: 'Firewall', fieldName: 'Host Name' },
            { itemName: 'Firewall', fieldName: 'Domain Name' },
            { itemName: 'Firewall', fieldName: 'Carrier' },
            { itemName: 'CCTV Camera', fieldName: 'Type' },
            { itemName: 'CCTV Camera', fieldName: 'Pixel' },
            { itemName: 'CCTV Camera', fieldName: 'IPv4' },
            { itemName: 'VC Camera', fieldName: 'Type' },
            { itemName: 'VC Camera', fieldName: 'Pixel' },
            { itemName: 'VC Camera', fieldName: 'IPv4' },
            { itemName: 'Storage Device', fieldName: 'Type' },
            { itemName: 'Storage Device', fieldName: 'Product Description' },
            { itemName: 'Storage Device', fieldName: 'IPv4' },
            { itemName: 'Wireless AP', fieldName: 'IPv4' },
            { itemName: 'Wireless AP', fieldName: 'Host Name' },
            { itemName: 'Printer and Scanners', fieldName: 'RAM' },
            { itemName: 'Printer and Scanners', fieldName: 'Host Name' },
            { itemName: 'Printer and Scanners', fieldName: 'Domain Name' },
            { itemName: 'Printer and Scanners', fieldName: 'IPv4' },
        ];
        await itemfieldMappingScript.insertItemFieldMappings(schemaName, mappings);
        const statusScript = new assetstatsutypes_1.AssetStatusTypesScript(this.dataSource);
        await statusScript.createAssetStatusTable(schemaName);
        const statusData = [
            { status_type_name: 'AVAILABLE' },
            { status_type_name: 'IN USE' },
        ];
        await statusScript.insertAssetStatusTable(schemaName, statusData);
        console.log('15');
        const ownershipstatusScript = new assetOwnershipstatsutypes_1.AssetOwnershipStatusTypesScript(this.dataSource);
        await ownershipstatusScript.createAssetOwnershipStatusTypesTable(schemaName);
        const ownershipstatusData = [
            { ownership_status_type_name: 'CAPEX' },
            { ownership_status_type_name: 'LEASE' },
            { ownership_status_type_name: 'OPEX' },
            { ownership_status_type_name: 'RENTED' },
            { ownership_status_type_name: 'OWNED' },
        ];
        await ownershipstatusScript.insertAssetOwnershipStatusTable(schemaName, ownershipstatusData);
        console.log('16');
        const workingstatusScript = new assetworkingstatus_1.AssetWorkingStatusScript(this.dataSource);
        await workingstatusScript.createAssetWorkingStatusTable(schemaName);
        const workingstatusData = [
            { working_status_type_name: 'OPERATIONAL' },
            { working_status_type_name: 'UNDER MAINTAINANCE' },
            { working_status_type_name: 'FAULTY' },
            { working_status_type_name: 'DAMAGED' },
            { working_status_type_name: 'RETIRED' },
        ];
        await workingstatusScript.insertAssetWorkingStatusTable(schemaName, workingstatusData);
        console.log('17');
        const itemRelationScript = new assetitemrelations_1.AssetItemRelationScript(this.dataSource);
        await itemRelationScript.createAssetItemRelationTable(schemaName);
        let RelationType;
        (function (RelationType) {
            RelationType["Other"] = "Other";
            RelationType["Accessory"] = "Accessory";
            RelationType["Contract"] = "Contract";
            RelationType["Application"] = "Application";
        })(RelationType || (RelationType = {}));
        const relations = [
            {
                parentItemName: 'Computer',
                childItemName: 'Keyboard',
                relationType: RelationType.Accessory,
            },
            {
                parentItemName: 'Computer',
                childItemName: 'Monitors',
                relationType: RelationType.Accessory,
            },
            {
                parentItemName: 'Computer',
                childItemName: 'Mouse',
                relationType: RelationType.Accessory,
            },
            {
                parentItemName: 'Computer',
                childItemName: 'Contract',
                relationType: RelationType.Contract,
            },
            {
                parentItemName: 'Computer',
                childItemName: 'Application Software',
                relationType: RelationType.Application,
            },
            {
                parentItemName: 'Computer',
                childItemName: 'Operating System',
                relationType: RelationType.Application,
            },
        ];
        await itemRelationScript.insertItemRelations(schemaName, relations);
        console.log('18');
        const assetScript = new assets_1.AssetsScript(this.dataSource);
        await assetScript.createAssetsTable(schemaName);
        console.log('19');
        const licencetypesScript = new licencetypes_1.LicenceTypesScript(this.dataSource);
        await licencetypesScript.createLicenceTypesTable(schemaName);
        const licencetypesDataflags = [
            {
                licence_type: 'FPP',
                licence_key_type: true,
                needs_license_key: true,
                bulk_license: false,
                have_plan_type: false,
                is_active: 1,
                is_delete: 0,
            },
            {
                licence_type: 'Volume',
                licence_key_type: false,
                needs_license_key: true,
                bulk_license: false,
                have_plan_type: false,
                is_active: 1,
                is_delete: 0,
            },
            {
                licence_type: 'Preloaded',
                licence_key_type: true,
                needs_license_key: false,
                bulk_license: false,
                have_plan_type: false,
                is_active: 1,
                is_delete: 0,
            },
            {
                licence_type: 'Subscription',
                licence_key_type: true,
                needs_license_key: true,
                bulk_license: false,
                have_plan_type: true,
                is_active: 1,
                is_delete: 0,
            },
            {
                licence_type: 'Perpetual',
                licence_key_type: true,
                needs_license_key: true,
                bulk_license: false,
                have_plan_type: false,
                is_active: 1,
                is_delete: 0,
            },
            {
                licence_type: 'OEM',
                licence_key_type: true,
                needs_license_key: true,
                bulk_license: false,
                have_plan_type: false,
                is_active: 1,
                is_delete: 0,
            },
        ];
        await licencetypesScript.insertLicenceTypeTable(schemaName, licencetypesDataflags);
        console.log('20');
        const vendorScript = new venders_1.VendersScript(this.dataSource);
        await vendorScript.createVendersTable(schemaName);
        console.log('21');
        const stockScript = new stocks_1.StocksScript(this.dataSource);
        await stockScript.createStocksTable(schemaName);
        console.log('22');
        const assetMappingScript = new assetmapping_1.AssetMappingRelations(this.dataSource);
        await assetMappingScript.createAssetMappingRelationsTable(schemaName);
        console.log('23');
        const transferScript = new transferhistory_1.AssetTransferHistoryScript(this.dataSource);
        await transferScript.createAssetTransferHistoryTable(schemaName);
        console.log('24');
        const stockSerialScript = new stockserial_1.AssetStockSerialsScript(this.dataSource);
        await stockSerialScript.createAssetStockSerialsTable(schemaName);
        console.log('25');
        const fullname = 'Norbik Asset';
        console.log('Generated plain password (to be sent via email):', randomPassword);
        await this.mailService.sendEmail(user.business_email, 'Welcome Aboard! Everything You Need to Get Started', await (0, render_email_1.renderEmail)(render_email_1.EmailTemplate.ONBOARDING_CONFIRMATION, {
            name: fullname,
            companyName: user.organization.organization_name,
            trialUrl: `${process.env.CLIENT_ORIGIN_URL}/sign-in`,
            username: user.business_email,
            password: randomPassword,
        }, this.mailConfigService));
    }
    async hashPassword(password) {
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(password, salt);
    }
    async fetchSingleUsersProfile(userId) {
        try {
            if (!userId) {
                return { status: 400, success: false, message: 'userId is required' };
            }
            const user = await this.registerUser.findOne({
                where: { user_id: userId },
                relations: ['organization'],
            });
            if (!user) {
                return { status: 404, success: false, message: 'User not found' };
            }
            return {
                status: 200,
                success: true,
                data: {
                    id: user.user_id,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.business_email,
                    organization: user.organization,
                },
            };
        }
        catch (error) {
            console.error('Error fetching user profile:', error);
            return { status: 500, success: false, message: 'Internal server error' };
        }
    }
    async getOrganizationsForSelect() {
        const organizations = await this.orgRepo
            .createQueryBuilder('org')
            .leftJoin('org.subscriptions', 'sub', 'sub.is_active = true')
            .leftJoin('sub.reseller', 'reseller')
            .select([
            'org.organization_id AS id',
            'org.organization_name AS name',
            'sub.reseller_id AS resellerId',
            'reseller.reseller_name AS resellerName',
        ])
            .getRawMany();
        return organizations;
    }
    async getAllProducts() {
        try {
            return await this.productRepository.find({
                where: { isDeleted: false, isActive: true },
                order: { productId: 'ASC' },
            });
        }
        catch (error) {
            error_handler_util_1.ErrorHandler.log('Error fetching products', error);
            error_handler_util_1.ErrorHandler.throwInternalServerError(error, 'Error fetching products');
        }
    }
    async getActivePlansByProduct(productId) {
        try {
            const plans = await this.planRepository.find({
                select: ['plan_id', 'plan_name', 'set_trial'],
                where: { is_active: true, product: { productId: productId } },
                order: { plan_name: 'ASC' },
                relations: ['product'],
            });
            return plans.map((p) => ({
                id: p.plan_id,
                name: p.plan_name,
                set_trial: p.set_trial,
            }));
        }
        catch (error) {
            error_handler_util_1.ErrorHandler.log('Error fetching plans by products', error);
            error_handler_util_1.ErrorHandler.throwInternalServerError(error, 'Error fetching plans by product');
        }
    }
    async getActiveFeaturesByProduct(productId) {
        try {
            const features = await this.featureRepository.find({
                select: ['feature_id', 'feature_name', 'set_limit'],
                where: { is_active: true, product: { productId: productId } },
                relations: ['product'],
                order: { feature_name: 'ASC' },
            });
            return features.map((f) => ({
                id: f.feature_id,
                name: f.feature_name,
                limit: f.set_limit,
            }));
        }
        catch (error) {
            error_handler_util_1.ErrorHandler.log('Error fetching features by product', error);
            error_handler_util_1.ErrorHandler.throwInternalServerError(error, 'Error fetching features by product');
        }
    }
    async listProducts({ page = 1, limit = 10, search = '', status, }) {
        try {
            const qb = this.productRepository
                .createQueryBuilder('product')
                .where('product.isDeleted = false');
            if (search) {
                qb.andWhere('(LOWER(product.name) LIKE LOWER(:search) OR LOWER(product.description) LIKE LOWER(:search))', { search: `%${search}%` });
            }
            if (status) {
                qb.andWhere('product.isActive = :isActive', {
                    isActive: status === 'active',
                });
            }
            qb.orderBy('product.productId', 'ASC')
                .skip((page - 1) * limit)
                .take(limit);
            const [data, total] = await qb.getManyAndCount();
            return {
                data,
                total,
                currentPage: page,
                totalPages: Math.ceil(total / limit),
            };
        }
        catch (error) {
            error_handler_util_1.ErrorHandler.log('Error fetching products', error);
            error_handler_util_1.ErrorHandler.throwInternalServerError(error, 'Error fetching products');
        }
    }
    async addProduct(dto) {
        const product = this.productRepository.create(dto);
        return await this.productRepository.save(product);
    }
    async getProductById(productId) {
        const product = await this.productRepository.findOne({
            where: { productId, isDeleted: false },
        });
        if (!product)
            throw new Error('Product not found');
        return product;
    }
    async updateProduct(productId, dto) {
        const product = await this.getProductById(productId);
        Object.assign(product, dto);
        return await this.productRepository.save(product);
    }
    async softDeleteProduct(productId) {
        const product = await this.getProductById(productId);
        product.isDeleted = true;
        product.isActive = false;
        await this.productRepository.save(product);
    }
    async getAllStatus() {
        try {
            return await this.renewalStatusRepository.find({
                where: { is_deleted: false },
                order: { status_id: 'ASC' },
            });
        }
        catch (error) {
            error_handler_util_1.ErrorHandler.log('Error fetching status', error);
            error_handler_util_1.ErrorHandler.throwInternalServerError(error, 'Error fetching status');
        }
    }
    async getDashboardCounts() {
        try {
            const orgCount = await this.orgRepo.count();
            const productCount = await this.productRepository.count({
                where: { isActive: true },
            });
            const userCount = await this.registerUser.count();
            const subscriptionCount = await this.subscriptionRepository.count({
                where: { is_active: true, is_activated: true },
            });
            const renewalCount = await this.subscriptionRepository
                .createQueryBuilder('sub')
                .where('sub.is_active = :active', { active: true })
                .andWhere("sub.renewal_date BETWEEN CURRENT_DATE AND CURRENT_DATE + INTERVAL '30 days'")
                .getCount();
            const trialSubscriptionCount = await this.subscriptionRepository.count({
                where: { is_trial_period: true },
            });
            const productWiseSubscriptions = await this.subscriptionRepository
                .createQueryBuilder('sub')
                .select('p.name', 'productName')
                .addSelect('COUNT(sub.subscription_id)', 'count')
                .leftJoin('sub.product', 'p')
                .where('sub.is_active = true')
                .andWhere('sub.product_id IS NOT NULL')
                .groupBy('p.name')
                .getRawMany();
            return {
                orgCount,
                productCount,
                userCount,
                subscriptionCount,
                renewalCount,
                trialSubscriptionCount,
                productWiseSubscriptions,
            };
        }
        catch (error) {
            error_handler_util_1.ErrorHandler.log('Error fetching counts', error);
            error_handler_util_1.ErrorHandler.throwInternalServerError(error, 'Error fetching counts');
        }
    }
    async toggleLoginRestriction(id) {
        try {
            const subscription = await this.subscriptionRepository.findOne({
                where: { subscription_id: id },
            });
            if (!subscription) {
                throw new Error('Subscription not found');
            }
            subscription.restrict_login = !subscription.restrict_login;
            const updated = await this.subscriptionRepository.save(subscription);
            return updated;
        }
        catch (error) {
            console.error('Error toggling login restriction:', error);
            throw new Error('Failed to toggle login restriction');
        }
    }
    async listSalesRequests({ page = 1, limit = 10, search = '', status, }) {
        try {
            const qb = this.salesrequestsRepository
                .createQueryBuilder('request')
                .where('request.is_deleted = false');
            if (search) {
                qb.andWhere('(LOWER(request.customerName) LIKE LOWER(:search) OR LOWER(request.email) LIKE LOWER(:search) OR LOWER(request.message) LIKE LOWER(:search))', { search: `%${search}%` });
            }
            if (status) {
                qb.andWhere('request.status = :status', { status });
            }
            qb.orderBy('request.created_at', 'DESC')
                .skip((page - 1) * limit)
                .take(limit);
            const [data, total] = await qb.getManyAndCount();
            return {
                data,
                total,
                currentPage: page,
                totalPages: Math.ceil(total / limit),
            };
        }
        catch (error) {
            error_handler_util_1.ErrorHandler.log('Error fetching sales requests', error);
            error_handler_util_1.ErrorHandler.throwInternalServerError(error, 'Error fetching sales requests');
        }
    }
    async getSalesRequestById(id) {
        const qb = this.salesrequestsRepository
            .createQueryBuilder('request')
            .leftJoinAndSelect('request.industry', 'industry')
            .where('request.is_deleted = false')
            .andWhere('request.contact_request_id = :id', { id });
        const request = await qb.getOne();
        if (!request)
            throw new Error('Sales request not found');
        return request;
    }
    async softDeleteSalesRequest(requestId) {
        const request = await this.salesrequestsRepository.findOne({
            where: { contactRequestId: requestId },
        });
        if (!request) {
            throw new Error('Sales request not found');
        }
        request.is_deleted = true;
        request.is_active = false;
        await this.salesrequestsRepository.save(request);
    }
    async disableOrganization(id) {
        try {
            const organization = await this.orgRepo.findOne({
                where: { organization_id: id },
            });
            if (!organization) {
                throw new Error('Organization not found');
            }
            organization.status = false;
            await this.orgRepo.save(organization);
        }
        catch (error) {
            console.error('Error disabling organization:', error);
            throw new Error('Failed to disable organization');
        }
    }
    async toggleLoginRestrictionByOrganization(organizationId) {
        try {
            const subscription = await this.subscriptionRepository.findOne({
                where: { organization_profile_id: organizationId },
            });
            if (!subscription) {
                throw new Error('Subscription not found for this organization');
            }
            const organization = await this.orgRepo.findOne({
                where: { organization_id: organizationId },
            });
            if (!organization) {
                throw new Error('Organization not found');
            }
            subscription.restrict_login = !subscription.restrict_login;
            await this.subscriptionRepository.save(subscription);
            if (subscription.restrict_login) {
                organization.status = false;
            }
            else {
                organization.status = true;
            }
            await this.orgRepo.save(organization);
            return subscription;
        }
        catch (error) {
            console.error('Error toggling login restriction:', error);
            error_handler_util_1.ErrorHandler.log('Error toggling login restriction', error);
            error_handler_util_1.ErrorHandler.throwInternalServerError(error, 'Error toggling login restriction');
        }
    }
    async updateSalesRequestStatus(id, status) {
        try {
            const salesRequest = await this.salesrequestsRepository.findOne({
                where: { contactRequestId: id },
            });
            if (!salesRequest) {
                throw new Error('Sales request not found');
            }
            salesRequest.status = status;
            await this.salesrequestsRepository.save(salesRequest);
        }
        catch (error) {
            console.error('Error updating sales request status:', error);
            throw new Error('Failed to update sales request status');
        }
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
    async listTickets({ page = 1, limit = 10, search = '', status, }) {
        const qb = this.supportTicketRepo
            .createQueryBuilder('ticket')
            .leftJoinAndSelect('ticket.organization', 'org')
            .where('ticket.is_deleted = 0');
        if (search) {
            qb.andWhere(`LOWER(ticket.name) LIKE LOWER(:search)
       OR LOWER(ticket.email) LIKE LOWER(:search)
       OR LOWER(ticket.subject) LIKE LOWER(:search)
       OR LOWER(ticket.description) LIKE LOWER(:search)`, { search: `%${search}%` });
        }
        if (status) {
            qb.andWhere('ticket.status = :status', { status });
        }
        qb.orderBy('ticket.createdAt', 'DESC')
            .skip((page - 1) * limit)
            .take(limit);
        const [data, total] = await qb.getManyAndCount();
        const formattedData = data.map((ticket) => ({
            ticketId: ticket.ticketId,
            supportTicketId: ticket.supportTicketId,
            name: ticket.name,
            email: ticket.email,
            subject: ticket.subject,
            category: ticket.category,
            priority: ticket.priority,
            description: ticket.description,
            status: ticket.status,
            createdAt: ticket.createdAt,
            organizationName: ticket.organization?.organization_name || null,
        }));
        return {
            data: formattedData,
            total,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
        };
    }
    async getTicketById(id) {
        const ticket = await this.supportTicketRepo.findOne({
            where: { ticketId: id, is_deleted: 0 },
        });
        if (!ticket) {
            throw new Error('Support ticket not found');
        }
        return ticket;
    }
    async softDeleteTicket(ticketId) {
        const ticket = await this.supportTicketRepo.findOne({
            where: { ticketId },
        });
        if (!ticket) {
            throw new Error('Support ticket not found');
        }
        ticket.is_deleted = 1;
        ticket.is_active = 0;
        await this.supportTicketRepo.save(ticket);
    }
    async updateTicketStatus(ticketId, status) {
        console.log('🔵 [BILLING SERVICE] Updating ticket:', ticketId);
        const ticket = await this.supportTicketRepo.findOne({
            where: { ticketId },
        });
        if (!ticket)
            throw new Error('Ticket not found');
        console.log('🟡 Current Status:', ticket.status);
        if (!Object.values(support_entity_1.SupportTicketStatus).includes(status)) {
            throw new Error('Invalid ticket status');
        }
        ticket.status = status;
        const updatedTicket = await this.supportTicketRepo.save(ticket);
        console.log('🟢 [BILLING SERVICE] Status saved:', updatedTicket.status);
        if (updatedTicket.status === support_entity_1.SupportTicketStatus.CLOSED) {
            const SUPPORT_TICKET_RESOLVED_EVENT_ID = 59;
            const formatDate = () => {
                const d = new Date();
                return `${String(d.getDate()).padStart(2, '0')}-${String(d.getMonth() + 1).padStart(2, '0')}-${d.getFullYear()}`;
            };
            const contextData = {
                support: {
                    support_ticket_id: updatedTicket.supportTicketId,
                    subject: updatedTicket.subject,
                    status: updatedTicket.status,
                    updated_at: formatDate(),
                },
                user: {
                    user_id: updatedTicket.name?.split(' ')[0] || '',
                },
            };
            const recipients = [];
            if (updatedTicket.email) {
                recipients.push({
                    recipient_type: 'user',
                    recipient_email: updatedTicket.email,
                });
            }
            recipients.push({
                recipient_type: 'user',
                recipient_email: process.env.SUPPORT_EMAIL || 'support@norbikasset.com',
            });
            await this.notificationHelper.triggerEventNotification({
                eventId: SUPPORT_TICKET_RESOLVED_EVENT_ID,
                contextData,
                recipients,
                meta: {
                    trace_id: updatedTicket.supportTicketId,
                },
            });
            console.log('📩 Resolved email triggered');
        }
        return updatedTicket;
    }
    async getSubscriptionDetailsForAsset(organization_profile_id) {
        try {
            const subscription = await this.subscriptionRepository
                .createQueryBuilder('sub')
                .leftJoinAndSelect('sub.plan', 'plan')
                .leftJoinAndSelect('sub.subscriptionType', 'subscriptionType')
                .leftJoinAndSelect('sub.billingInfo', 'billingInfo')
                .leftJoinAndSelect('sub.paymentTransactions', 'paymentTransactions')
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
            }));
            return {
                subscription_id: subscription.subscription_id,
                organization_profile_id: subscription.organization_profile_id,
                plan: {
                    plan_id: subscription.plan.plan_id,
                    plan_name: subscription.plan.plan_name,
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
                payment_status: subscription.payment_status,
                payment_mode: subscription.payment_mode,
                purchase_date: subscription.purchase_date,
                plan_billing_id: subscription.plan_billing_id,
                auto_renewal: subscription.auto_renewal,
                features,
            };
        }
        catch (error) {
            console.error('Error fetching subscription details by org:', error);
            throw new Error('Failed to fetch subscription details');
        }
    }
    async extendTrial(dto) {
        const subscription = await this.subscriptionRepository.findOne({
            where: {
                subscription_id: dto.subscription_id,
                is_deleted: false,
            },
        });
        if (!subscription) {
            throw new common_1.NotFoundException('Subscription not found.');
        }
        const baseDate = subscription.renewal_date
            ? new Date(subscription.renewal_date)
            : new Date();
        if (isNaN(baseDate.getTime())) {
            throw new common_1.BadRequestException('Invalid renewal date.');
        }
        const newExpiryDate = new Date(baseDate);
        newExpiryDate.setDate(newExpiryDate.getDate() + dto.extend_days);
        subscription.renewal_date = newExpiryDate;
        subscription.trial_expiry_date = newExpiryDate;
        subscription.is_active = true;
        subscription.is_trial_period = true;
        await this.subscriptionRepository.save(subscription);
        return {
            success: true,
            message: 'Trial extended successfully.',
            data: {
                subscription_id: subscription.subscription_id,
                old_expiry_date: baseDate,
                new_expiry_date: newExpiryDate,
            },
        };
    }
};
exports.SubscriptionService = SubscriptionService;
exports.SubscriptionService = SubscriptionService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, typeorm_1.InjectRepository)(feature_entity_1.Feature)),
    __param(3, (0, typeorm_1.InjectRepository)(plan_billing_entity_1.PlanBilling)),
    __param(4, (0, typeorm_1.InjectRepository)(plan_feature_mapping_entity_1.PlanFeatureMapping)),
    __param(5, (0, typeorm_1.InjectRepository)(plan_entity_1.Plan)),
    __param(6, (0, typeorm_1.InjectRepository)(subscription_type_entity_1.SubscriptionType)),
    __param(7, (0, typeorm_1.InjectRepository)(org_subscription_entity_1.OrgSubscription)),
    __param(8, (0, typeorm_1.InjectRepository)(subscription_log_entity_1.SubscriptionLog)),
    __param(9, (0, typeorm_1.InjectRepository)(org_feature_overrides_entity_1.OrgFeatureOverride)),
    __param(10, (0, typeorm_1.InjectRepository)(org_overrides_entity_1.OrgOverride)),
    __param(11, (0, typeorm_1.InjectRepository)(register_organization_entity_1.RegisterOrganization)),
    __param(12, (0, typeorm_1.InjectRepository)(org_feature_override_logs_entity_1.OrgFeatureOverrideLog)),
    __param(13, (0, typeorm_1.InjectRepository)(billing_info_entity_1.BillingInfo)),
    __param(14, (0, typeorm_1.InjectRepository)(payment_transaction_entity_1.PaymentTransaction)),
    __param(15, (0, typeorm_1.InjectRepository)(plan_setting_entity_1.PlanSetting)),
    __param(16, (0, typeorm_1.InjectRepository)(offline_payment_requests_entity_1.OfflinePaymentRequest)),
    __param(17, (0, typeorm_1.InjectRepository)(register_user_login_entity_1.RegisterUserLogin)),
    __param(18, (0, typeorm_1.InjectRepository)(payment_methods_entity_1.PaymentMethod)),
    __param(19, (0, typeorm_1.InjectRepository)(payment_mode_entity_1.PaymentMode)),
    __param(20, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __param(21, (0, typeorm_1.InjectRepository)(renewal_entity_1.RenewalStatus)),
    __param(22, (0, typeorm_1.InjectRepository)(contact_sales_requests_entity_1.ContactSalesRequest)),
    __param(23, (0, typeorm_1.InjectRepository)(support_entity_1.SupportTicket)),
    __param(24, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [activity_log_service_1.ActivityLogService,
        pdf_service_1.PdfService,
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
        typeorm_2.DataSource,
        mail_config_service_1.MailConfigService,
        mail_service_1.MailService,
        axios_1.HttpService,
        notification_helper_1.NotificationHelper])
], SubscriptionService);
