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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionController = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = __importDefault(require("axios"));
const path_1 = __importDefault(require("path"));
const export_dto_1 = require("../common/export/dto/export.dto");
const export_service_1 = require("../common/export/services/export.service");
const organizational_profile_1 = require("../common/organizational-info/organizational-profile");
const api_pagination_util_1 = require("../common/utils/api-pagination.util");
const api_response_util_1 = require("../common/utils/api-response.util");
const error_handler_util_1 = require("../common/utils/error-handler.util");
const api_key_guard_1 = require("../auth/api-key.guard");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const create_order_dto_1 = require("../subscription_pricing/dto/create-order.dto");
const billing_request_dto_1 = require("./dto/billing-request.dto");
const create_billing_support_ticket_dto_1 = require("./dto/create-billing-support-ticket.dto");
const create_customer_dto_1 = require("./dto/create-customer.dto");
const create_plan_dto_1 = require("./dto/create-plan.dto");
const create_subscription_type_dto_1 = require("./dto/create-subscription-type.dto");
const create_subscription_dto_1 = require("./dto/create-subscription.dto");
const extend_trial_dto_1 = require("./dto/extend-trial.dto");
const feature_dto_1 = require("./dto/feature.dto");
const mapping_dto_1 = require("./dto/mapping.dto");
const payment_dto_1 = require("./dto/payment.dto");
const plan_setting_dto_1 = require("./dto/plan-setting.dto");
const product_dto_1 = require("./dto/product.dto");
const update_subscription_dto_1 = require("./dto/update-subscription.dto");
const support_entity_1 = require("./entity/support.entity");
const pdf_service_1 = require("./pdf.service");
const subscription_service_1 = require("./subscription.service");
let SubscriptionController = class SubscriptionController {
    constructor(subscriptionService, organizationalProfileCommonData, pdfService, exportService) {
        this.subscriptionService = subscriptionService;
        this.organizationalProfileCommonData = organizationalProfileCommonData;
        this.pdfService = pdfService;
        this.exportService = exportService;
    }
    async createSubscriptionType(req, res, createSubscriptionTypeDto) {
        try {
            const organizationDetails = await this.organizationalProfileCommonData.getOrganizationDetails(req);
            const { loginUserId } = organizationDetails;
            console.log('loginUserId:', loginUserId);
            if (!loginUserId) {
                throw new common_1.NotFoundException('User is not logged in or organization details are incomplete');
            }
            console.log('Cookie Header Length:', req.headers.cookie?.length);
            const subscriptionType = await this.subscriptionService.createSubscriptionType(createSubscriptionTypeDto, loginUserId);
            return res.status(common_1.HttpStatus.CREATED).json({
                success: 200,
                message: 'Subscription type created successfully',
                data: subscriptionType,
            });
        }
        catch (error) {
            console.error('Error creating subscription type:', error);
            if (error_handler_util_1.ErrorHandler.isHttpException(error)) {
                throw error;
            }
            error_handler_util_1.ErrorHandler.throwInternalServerError(error, 'Failed to update customer');
        }
    }
    async getAllSubscriptionTypes(res) {
        try {
            const data = await this.subscriptionService.getAllSubscriptionTypes();
            return res.status(common_1.HttpStatus.OK).json({
                success: true,
                message: 'Fetched subscription types successfully',
                data,
            });
        }
        catch (error) {
            console.error('Error fetching subscription types:', error);
            if (error_handler_util_1.ErrorHandler.isHttpException(error)) {
                throw error;
            }
            error_handler_util_1.ErrorHandler.throwInternalServerError(error, 'Failed to update customer');
        }
    }
    async createNewPlan(payload, res) {
        try {
            const data = await this.subscriptionService.createPlan(payload);
            return res.status(common_1.HttpStatus.CREATED).json({
                success: true,
                message: 'Plan created successfully',
                data,
            });
        }
        catch (error) {
            console.error('Create Plan Error:', error);
            if (error_handler_util_1.ErrorHandler.isHttpException(error)) {
                throw error;
            }
            error_handler_util_1.ErrorHandler.throwInternalServerError(error, 'Failed to update customer');
        }
    }
    async updatePlan(payload, res) {
        try {
            if (!payload.plan_id) {
                return res.status(common_1.HttpStatus.BAD_REQUEST).json({
                    success: false,
                    message: 'plan_id is required',
                });
            }
            const data = await this.subscriptionService.updatePlan(payload.plan_id, payload);
            return res.status(common_1.HttpStatus.OK).json({
                success: true,
                message: 'Plan updated successfully',
                data,
            });
        }
        catch (error) {
            console.error('Update Plan Error:', error);
            if (error_handler_util_1.ErrorHandler.isHttpException(error)) {
                throw error;
            }
            error_handler_util_1.ErrorHandler.throwInternalServerError(error, 'Failed to update customer');
        }
    }
    async getPlanDetails(body, res) {
        try {
            const { plan_id } = body;
            if (!plan_id) {
                return res.status(common_1.HttpStatus.BAD_REQUEST).json({
                    success: false,
                    message: 'plan_id is required',
                });
            }
            const data = await this.subscriptionService.getPlanDetailsById(plan_id);
            return res.status(common_1.HttpStatus.OK).json({
                success: true,
                message: 'Fetched plan details successfully',
                data,
            });
        }
        catch (error) {
            console.error('Error fetching plan details:', error);
            if (error_handler_util_1.ErrorHandler.isHttpException(error)) {
                throw error;
            }
            error_handler_util_1.ErrorHandler.throwInternalServerError(error, 'Failed to update customer');
        }
    }
    async deletePlan(id, res) {
        try {
            await this.subscriptionService.deletePlan(Number(id));
            return res.status(common_1.HttpStatus.OK).json({
                success: true,
                message: 'Plan deleted successfully',
            });
        }
        catch (error) {
            console.error('Error deleting plan:', error);
            if (error_handler_util_1.ErrorHandler.isHttpException(error)) {
                throw error;
            }
            error_handler_util_1.ErrorHandler.throwInternalServerError(error, 'Failed to update customer');
        }
    }
    async getAllPlanDetails(res) {
        try {
            const data = await this.subscriptionService.getAllPlanDetails();
            return res.status(common_1.HttpStatus.OK).json({
                success: true,
                message: 'Fetched subscription types successfully',
                data,
            });
        }
        catch (error) {
            console.error('Error fetching subscription types:', error);
            if (error_handler_util_1.ErrorHandler.isHttpException(error)) {
                throw error;
            }
            error_handler_util_1.ErrorHandler.throwInternalServerError(error, 'Failed to update customer');
        }
    }
    async getBillingCyclesForPlanViaPayload(body, res) {
        try {
            const { plan_id } = body;
            if (!plan_id) {
                return res.status(common_1.HttpStatus.BAD_REQUEST).json({
                    success: false,
                    message: 'plan_id is required',
                });
            }
            const billingDetails = await this.subscriptionService.getBillingDetailsByPlanId(plan_id);
            return res.status(common_1.HttpStatus.OK).json({
                success: true,
                message: 'Fetched billing cycle details successfully',
                data: billingDetails,
            });
        }
        catch (error) {
            console.error('Error fetching billing cycles:', error);
            if (error_handler_util_1.ErrorHandler.isHttpException(error)) {
                throw error;
            }
            error_handler_util_1.ErrorHandler.throwInternalServerError(error, 'Failed to update customer');
        }
    }
    async getAllBillingCycles(res) {
        try {
            const data = await this.subscriptionService.getAllBillingCycles();
            return res.status(common_1.HttpStatus.OK).json({
                success: true,
                message: 'Fetched all billing cycles successfully',
                data,
            });
        }
        catch (error) {
            console.error('Error fetching billing cycles:', error);
            if (error_handler_util_1.ErrorHandler.isHttpException(error)) {
                throw error;
            }
            error_handler_util_1.ErrorHandler.throwInternalServerError(error, 'Failed to update customer');
        }
    }
    async getBillingEntryById(body, res) {
        const { billing_id } = body;
        if (!billing_id) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json({
                success: false,
                message: 'billing_id is required',
            });
        }
        try {
            const data = await this.subscriptionService.getBillingEntryById(billing_id);
            if (!data) {
                return res.status(common_1.HttpStatus.NOT_FOUND).json({
                    success: false,
                    message: `Billing entry with id ${billing_id} not found`,
                });
            }
            return res.status(common_1.HttpStatus.OK).json({
                success: true,
                message: 'Fetched billing entry successfully',
                data,
            });
        }
        catch (error) {
            console.error('Error fetching billing entry:', error);
            if (error_handler_util_1.ErrorHandler.isHttpException(error)) {
                throw error;
            }
            error_handler_util_1.ErrorHandler.throwInternalServerError(error, 'Failed to update customer');
        }
    }
    async getFeatureMappingsForPlan(body, res) {
        try {
            const { plan_id } = body;
            if (!plan_id) {
                return res.status(common_1.HttpStatus.BAD_REQUEST).json({
                    success: false,
                    message: 'plan_id is required',
                });
            }
            const data = await this.subscriptionService.getFeatureMappingsByPlanId(plan_id);
            return res.status(common_1.HttpStatus.OK).json({
                success: true,
                message: 'Fetched feature mappings successfully',
                data,
            });
        }
        catch (error) {
            console.error('Error fetching feature mappings:', error);
            if (error_handler_util_1.ErrorHandler.isHttpException(error)) {
                throw error;
            }
            error_handler_util_1.ErrorHandler.throwInternalServerError(error, 'Failed to update customer');
        }
    }
    async getAllPlansWithFeatures(res) {
        try {
            const data = await this.subscriptionService.getAllPlansWithFeatures();
            return res.status(common_1.HttpStatus.OK).json({
                success: true,
                message: 'Fetched all plans with their features successfully',
                data,
            });
        }
        catch (error) {
            console.error('Error fetching plans with features:', error);
            if (error_handler_util_1.ErrorHandler.isHttpException(error)) {
                throw error;
            }
            error_handler_util_1.ErrorHandler.throwInternalServerError(error, 'Failed to update customer');
        }
    }
    async createOrgSubscription(payload, res, req) {
        const organizationDetails = await this.organizationalProfileCommonData.getOrganizationDetails(req);
        try {
            const result = await this.subscriptionService.createOrgSubscription(payload, organizationDetails.loginUserId);
            return res.status(common_1.HttpStatus.CREATED).json({
                success: true,
                message: 'Subscription(s) created successfully',
                data: result,
            });
        }
        catch (error) {
            console.error('Subscription creation failed:', error);
            if (error_handler_util_1.ErrorHandler.isHttpException(error)) {
                throw error;
            }
            error_handler_util_1.ErrorHandler.throwInternalServerError(error, 'Failed to update customer');
        }
    }
    async getSubscriptionDetails(body, res) {
        try {
            const { subscription_id } = body;
            if (!subscription_id) {
                return res.status(common_1.HttpStatus.BAD_REQUEST).json({
                    success: false,
                    message: 'subscription_id is required',
                });
            }
            const data = await this.subscriptionService.getSubscriptionDetailsById(subscription_id);
            return res.status(common_1.HttpStatus.OK).json({
                success: true,
                message: 'Fetched subscription details successfully',
                data,
            });
        }
        catch (error) {
            console.error('Error fetching subscription details:', error);
            if (error_handler_util_1.ErrorHandler.isHttpException(error)) {
                throw error;
            }
            error_handler_util_1.ErrorHandler.throwInternalServerError(error, 'Failed to update customer');
        }
    }
    async getOrganizationDetails(body, res) {
        try {
            const { organization_id } = body;
            if (!organization_id) {
                return res.status(common_1.HttpStatus.BAD_REQUEST).json({
                    success: false,
                    message: 'organization_id is required',
                });
            }
            const data = await this.subscriptionService.getOrganizationDetails(organization_id);
            return res.status(common_1.HttpStatus.OK).json({
                success: true,
                message: 'Fetched subscription details successfully',
                data,
            });
        }
        catch (error) {
            console.error('Error fetching subscription details:', error);
            if (error_handler_util_1.ErrorHandler.isHttpException(error)) {
                throw error;
            }
            error_handler_util_1.ErrorHandler.throwInternalServerError(error, 'Failed to update customer');
        }
    }
    async cancelOrgSubscription(body, res, req) {
        try {
            const organizationDetails = await this.organizationalProfileCommonData.getOrganizationDetails(req);
            const { organization_profile_id, subscription_id } = body;
            console.log('organization_profile_id:', organization_profile_id, 'or subscription_id:', subscription_id);
            if (!organization_profile_id || !subscription_id) {
                return res.status(common_1.HttpStatus.BAD_REQUEST).json({
                    success: false,
                    message: 'organization_profile_id and subscription_id are required',
                });
            }
            const message = await this.subscriptionService.cancelOrgSubscription(organization_profile_id, subscription_id, organizationDetails.loginUserId);
            return res.status(common_1.HttpStatus.OK).json({
                success: true,
                message,
            });
        }
        catch (error) {
            console.error('Subscription cancel failed:', error);
            if (error_handler_util_1.ErrorHandler.isHttpException(error)) {
                throw error;
            }
            error_handler_util_1.ErrorHandler.throwInternalServerError(error, 'Failed to update customer');
        }
    }
    async updateOrgSubscription(dto, req) {
        const organizationDetails = await this.organizationalProfileCommonData.getOrganizationDetails(req);
        if (!dto.subscription_id) {
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.BAD_REQUEST,
                message: 'subscription_id is required',
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        try {
            const updatedSubscription = await this.subscriptionService.updateOrgSubscription(dto.subscription_id, dto, organizationDetails.organizationId, organizationDetails.loginUserId);
            return {
                statusCode: common_1.HttpStatus.OK,
                message: 'Subscription updated successfully',
                data: updatedSubscription,
            };
        }
        catch (error) {
            if (error_handler_util_1.ErrorHandler.isHttpException(error)) {
                throw error;
            }
            error_handler_util_1.ErrorHandler.throwInternalServerError(error, 'Failed to update customer');
        }
    }
    async getSubscriptionHistoryDetails(body, res) {
        try {
            const { organisation_id } = body;
            if (!organisation_id) {
                return res.status(common_1.HttpStatus.BAD_REQUEST).json({
                    success: false,
                    message: 'organisation_id is required',
                });
            }
            const data = await this.subscriptionService.getSubscriptionHistoryByOrgId(organisation_id);
            return res.status(common_1.HttpStatus.OK).json({
                success: true,
                message: 'Fetched subscription details successfully',
                data,
            });
        }
        catch (error) {
            console.error('Error fetching subscription details:', error);
            if (error_handler_util_1.ErrorHandler.isHttpException(error)) {
                throw error;
            }
            error_handler_util_1.ErrorHandler.throwInternalServerError(error, 'Failed to update customer');
        }
    }
    async getSubscriptionLogs(body, res) {
        const { organization_profile_id } = body;
        if (!organization_profile_id) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json({
                success: false,
                message: 'organization_profile_id is required',
            });
        }
        try {
            const logs = await this.subscriptionService.getSubscriptionLogs(organization_profile_id);
            return res.status(common_1.HttpStatus.OK).json({
                success: true,
                data: logs,
            });
        }
        catch (error) {
            console.error('Error fetching logs:', error);
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: 'Failed to fetch subscription logs',
            });
        }
    }
    async updateOverrides(org_id, updates) {
        try {
            const updated = await this.subscriptionService.updateOverrides(org_id, updates);
            return {
                statusCode: common_1.HttpStatus.OK,
                message: 'Override(s) upserted successfully',
                data: updated,
            };
        }
        catch (error) {
            if (error_handler_util_1.ErrorHandler.isHttpException(error)) {
                throw error;
            }
            error_handler_util_1.ErrorHandler.throwInternalServerError(error, 'Failed to update customer');
        }
    }
    async getOverridesByOrganisation(body, res) {
        try {
            const { organisation_id } = body;
            if (!organisation_id) {
                return res.status(common_1.HttpStatus.BAD_REQUEST).json({
                    success: false,
                    message: 'organisation_id is required',
                });
            }
            const data = await this.subscriptionService.getOverridesByOrgId(organisation_id);
            return res.status(common_1.HttpStatus.OK).json({
                success: true,
                message: 'Fetched overrides successfully',
                data,
            });
        }
        catch (error) {
            console.error('Error fetching overrides:', error);
            if (error_handler_util_1.ErrorHandler.isHttpException(error)) {
                throw error;
            }
            error_handler_util_1.ErrorHandler.throwInternalServerError(error, 'Failed to update customer');
        }
    }
    async getAllFeatures(page = 1, limit = 10, search = '', status = 'All', productId) {
        const { data, total } = await this.subscriptionService.getAllFeatures(Number(page), Number(limit), search, status, productId);
        return {
            success: true,
            message: 'Fetched features successfully',
            data,
            total,
            page,
            limit,
        };
    }
    async getAllPlansWithBilling(res, page = 1, limit = 10, search = '', status = 'All', productId) {
        try {
            const { data, total } = await this.subscriptionService.getAllPlansWithBilling(Number(page), Number(limit), search, status, productId);
            console.log('status:', status);
            return res.status(common_1.HttpStatus.OK).json({
                success: true,
                message: 'Fetched plans with billing successfully',
                data,
                total,
                page,
                limit,
            });
        }
        catch (error) {
            if (error_handler_util_1.ErrorHandler.isHttpException(error)) {
                throw error;
            }
            error_handler_util_1.ErrorHandler.throwInternalServerError(error, 'Failed to update customer');
        }
    }
    async getAllPlansWithBillingAndFeatures(res, page = 1, limit = 10, search = '', status = 'All', productId, planId) {
        try {
            const { data, total } = await this.subscriptionService.getAllPlansWithBillingAndFeatures(Number(page), Number(limit), search, status, productId ? Number(productId) : undefined, planId ? Number(planId) : undefined);
            return res.status(common_1.HttpStatus.OK).json({
                success: true,
                message: 'Fetched plans with billing and features successfully',
                data,
                total,
                page,
                limit,
            });
        }
        catch (error) {
            if (error_handler_util_1.ErrorHandler.isHttpException(error)) {
                throw error;
            }
            error_handler_util_1.ErrorHandler.throwInternalServerError(error, 'Failed to update customer');
        }
    }
    async getPlanFeatureSummary(res, page = 1, limit = 10, search = '', status = 'All', productId) {
        try {
            const { data, total } = await this.subscriptionService.getPlanFeatureSummary(Number(page), Number(limit), search, status, productId ? Number(productId) : undefined);
            return res.status(common_1.HttpStatus.OK).json({
                success: true,
                message: 'Fetched plan-feature summary successfully',
                data,
                total,
                page,
                limit,
            });
        }
        catch (error) {
            if (error_handler_util_1.ErrorHandler.isHttpException(error)) {
                throw error;
            }
            error_handler_util_1.ErrorHandler.throwInternalServerError(error, 'Failed to update customer');
        }
    }
    async createFeature(payload, res) {
        try {
            const data = await this.subscriptionService.createFeature(payload);
            return res.status(common_1.HttpStatus.CREATED).json({
                success: true,
                message: 'Feature created successfully',
                data,
            });
        }
        catch (error) {
            console.error('Create Feature Error:', error);
            if (error_handler_util_1.ErrorHandler.isHttpException(error)) {
                throw error;
            }
            error_handler_util_1.ErrorHandler.throwInternalServerError(error, 'Failed to update customer');
        }
    }
    async updateFeature(payload, res) {
        try {
            if (!payload.feature_id) {
                return res.status(common_1.HttpStatus.BAD_REQUEST).json({
                    success: false,
                    message: 'feature_id is required',
                });
            }
            const data = await this.subscriptionService.updateFeature(payload.feature_id, payload);
            return res.status(common_1.HttpStatus.OK).json({
                success: true,
                message: 'Feature updated successfully',
                data,
            });
        }
        catch (error) {
            console.error('Update Feature Error:', error);
            if (error_handler_util_1.ErrorHandler.isHttpException(error)) {
                throw error;
            }
            error_handler_util_1.ErrorHandler.throwInternalServerError(error, 'Failed to update customer');
        }
    }
    async getFeatureDetails(body, res) {
        try {
            const { feature_id } = body;
            if (!feature_id) {
                return res.status(common_1.HttpStatus.BAD_REQUEST).json({
                    success: false,
                    message: 'feature_id is required',
                });
            }
            const data = await this.subscriptionService.getFeatureDetailsById(feature_id);
            return res.status(common_1.HttpStatus.OK).json({
                success: true,
                message: 'Fetched feature details successfully',
                data,
            });
        }
        catch (error) {
            console.error('Error fetching feature details:', error);
            if (error_handler_util_1.ErrorHandler.isHttpException(error)) {
                throw error;
            }
            error_handler_util_1.ErrorHandler.throwInternalServerError(error, 'Failed to update customer');
        }
    }
    async deleteFeature(id, res) {
        try {
            await this.subscriptionService.deleteFeature(Number(id));
            return res.status(common_1.HttpStatus.OK).json({
                success: true,
                message: 'Feature deleted successfully',
            });
        }
        catch (error) {
            console.error('Error deleting feature:', error);
            if (error_handler_util_1.ErrorHandler.isHttpException(error)) {
                throw error;
            }
            error_handler_util_1.ErrorHandler.throwInternalServerError(error, 'Failed to update customer');
        }
    }
    async getActivePlans(res) {
        try {
            const data = await this.subscriptionService.getActivePlans();
            return res.status(common_1.HttpStatus.OK).json({
                success: true,
                message: 'Fetched active plans successfully',
                data,
            });
        }
        catch (error) {
            if (error_handler_util_1.ErrorHandler.isHttpException(error)) {
                throw error;
            }
            error_handler_util_1.ErrorHandler.throwInternalServerError(error, 'Failed to update customer');
        }
    }
    async getActiveFeatures(res) {
        try {
            const data = await this.subscriptionService.getActiveFeatures();
            return res.status(common_1.HttpStatus.OK).json({
                success: true,
                message: 'Fetched active features successfully',
                data,
            });
        }
        catch (error) {
            if (error_handler_util_1.ErrorHandler.isHttpException(error)) {
                throw error;
            }
            error_handler_util_1.ErrorHandler.throwInternalServerError(error, 'Failed to update customer');
        }
    }
    async getActivePaymentMethods(res) {
        try {
            const data = await this.subscriptionService.getActivePaymentMethods();
            return res.status(common_1.HttpStatus.OK).json({
                success: true,
                message: 'Fetched active payment methods successfully',
                data,
            });
        }
        catch (error) {
            if (error_handler_util_1.ErrorHandler.isHttpException(error)) {
                throw error;
            }
            error_handler_util_1.ErrorHandler.throwInternalServerError(error, 'Failed to update customer');
        }
    }
    async createMapping(payload, res) {
        try {
            const data = await this.subscriptionService.createMapping(payload);
            return res.status(common_1.HttpStatus.CREATED).json({
                success: true,
                message: 'Mapping created successfully',
                data,
            });
        }
        catch (error) {
            console.error('Create Mapping Error:', error);
            if (error_handler_util_1.ErrorHandler.isHttpException(error)) {
                throw error;
            }
            error_handler_util_1.ErrorHandler.throwInternalServerError(error, 'Failed to update customer');
        }
    }
    async updateMappingByPlan(body, res) {
        try {
            const { plan_id } = body;
            if (!plan_id) {
                return res.status(common_1.HttpStatus.BAD_REQUEST).json({
                    success: false,
                    message: 'plan_id is required',
                });
            }
            const updated = await this.subscriptionService.updateMappingsByPlanId(plan_id, body);
            return res.status(common_1.HttpStatus.OK).json({
                success: true,
                message: 'Mappings updated successfully',
                data: updated,
            });
        }
        catch (error) {
            console.error('Error updating mappings by plan:', error);
            if (error_handler_util_1.ErrorHandler.isHttpException(error)) {
                throw error;
            }
            error_handler_util_1.ErrorHandler.throwInternalServerError(error, 'Failed to update customer');
        }
    }
    async getMappingDetails(body, res) {
        try {
            const { mapping_id } = body;
            if (!mapping_id) {
                return res.status(common_1.HttpStatus.BAD_REQUEST).json({
                    success: false,
                    message: 'mapping_id is required',
                });
            }
            const data = await this.subscriptionService.getMappingDetailsById(mapping_id);
            return res.status(common_1.HttpStatus.OK).json({
                success: true,
                message: 'Fetched mapping details successfully',
                data,
            });
        }
        catch (error) {
            console.error('Error fetching mapping details:', error);
            if (error_handler_util_1.ErrorHandler.isHttpException(error)) {
                throw error;
            }
            error_handler_util_1.ErrorHandler.throwInternalServerError(error, 'Failed to update customer');
        }
    }
    async getMappingDetailsByPlan(body, res) {
        try {
            const { plan_id } = body;
            if (!plan_id) {
                return res.status(common_1.HttpStatus.BAD_REQUEST).json({
                    success: false,
                    message: 'plan_id is required',
                });
            }
            const data = await this.subscriptionService.getMappingDetailsByPlanId(plan_id);
            return res.status(common_1.HttpStatus.OK).json({
                success: true,
                message: 'Fetched mapping details by plan successfully',
                data,
            });
        }
        catch (error) {
            console.error('Error fetching mapping details by plan:', error);
            if (error_handler_util_1.ErrorHandler.isHttpException(error)) {
                throw error;
            }
            error_handler_util_1.ErrorHandler.throwInternalServerError(error, 'Failed to update customer');
        }
    }
    async deleteMapping(id, res) {
        try {
            await this.subscriptionService.deleteMapping(Number(id));
            return res.status(common_1.HttpStatus.OK).json({
                success: true,
                message: 'Mapping deleted successfully',
            });
        }
        catch (error) {
            console.error('Error deleting mapping:', error);
            if (error_handler_util_1.ErrorHandler.isHttpException(error)) {
                throw error;
            }
            error_handler_util_1.ErrorHandler.throwInternalServerError(error, 'Failed to update customer');
        }
    }
    async getPlanWithFeaturesById(id, res) {
        try {
            const data = await this.subscriptionService.getPlanWithFeaturesById(id);
            if (!data) {
                return res.status(common_1.HttpStatus.NOT_FOUND).json({
                    success: false,
                    message: `Plan with id ${id} not found`,
                });
            }
            return res.status(common_1.HttpStatus.OK).json({
                success: true,
                message: 'Fetched plan with features successfully',
                data,
            });
        }
        catch (error) {
            console.error('Error fetching plan with features:', error);
            if (error_handler_util_1.ErrorHandler.isHttpException(error)) {
                throw error;
            }
            error_handler_util_1.ErrorHandler.throwInternalServerError(error, 'Failed to update customer');
        }
    }
    async createPayment(payload, res, req) {
        try {
            const result = await this.subscriptionService.createPayment(payload, req.user.id);
            return res.status(common_1.HttpStatus.CREATED).json({
                success: true,
                message: 'Payment processed successfully',
                data: result,
            });
        }
        catch (error) {
            console.error('Payment creation failed:', error);
            if (error_handler_util_1.ErrorHandler.isHttpException(error)) {
                throw error;
            }
            error_handler_util_1.ErrorHandler.throwInternalServerError(error, 'Failed to update customer');
        }
    }
    async getOrgSubscriptionDetails(res, req) {
        try {
            const organizationDetails = await this.organizationalProfileCommonData.getOrganizationDetails(req);
            if (!organizationDetails || !organizationDetails.organizationId) {
                return res.status(common_1.HttpStatus.BAD_REQUEST).json({
                    success: false,
                    message: 'Organization not found for this request',
                });
            }
            const data = await this.subscriptionService.getSubscriptionDetailsByOrganization(organizationDetails.organizationId);
            if (!data) {
                return res.status(common_1.HttpStatus.NOT_FOUND).json({
                    success: false,
                    message: 'No subscription found for this organization',
                });
            }
            return res.status(common_1.HttpStatus.OK).json({
                success: true,
                message: 'Fetched subscription details successfully',
                data,
            });
        }
        catch (error) {
            console.error('Error fetching subscription details:', error);
            if (error_handler_util_1.ErrorHandler.isHttpException(error)) {
                throw error;
            }
            error_handler_util_1.ErrorHandler.throwInternalServerError(error, 'Failed to update customer');
        }
    }
    async createPlanSetting(payload, res) {
        try {
            const data = await this.subscriptionService.createSetting(payload);
            return res.status(common_1.HttpStatus.CREATED).json({
                success: true,
                message: 'Plan setting created successfully',
                data,
            });
        }
        catch (error) {
            console.error('Create Plan Setting Error:', error);
            if (error_handler_util_1.ErrorHandler.isHttpException(error)) {
                throw error;
            }
            error_handler_util_1.ErrorHandler.throwInternalServerError(error, 'Failed to update customer');
        }
    }
    async upsertPlanSetting(payload, res) {
        try {
            const data = await this.subscriptionService.upsertSetting(payload);
            return res.status(common_1.HttpStatus.OK).json({
                success: true,
                message: 'Plan setting upserted successfully',
                data,
            });
        }
        catch (error) {
            console.error('Upsert Plan Setting Error:', error);
            if (error_handler_util_1.ErrorHandler.isHttpException(error)) {
                throw error;
            }
            error_handler_util_1.ErrorHandler.throwInternalServerError(error, 'Failed to update customer');
        }
    }
    async getSettingsByPlan(planId, res) {
        try {
            const data = await this.subscriptionService.getSettingsByPlan(planId);
            return res.status(common_1.HttpStatus.OK).json({
                success: true,
                message: 'Fetched plan settings successfully',
                data,
            });
        }
        catch (error) {
            console.error('Get Plan Settings Error:', error);
            if (error_handler_util_1.ErrorHandler.isHttpException(error)) {
                throw error;
            }
            error_handler_util_1.ErrorHandler.throwInternalServerError(error, 'Failed to update customer');
        }
    }
    async createOfflinePaymentRequest(req, res, body) {
        try {
            const { user_id } = body;
            if (!user_id) {
                return res.status(common_1.HttpStatus.BAD_REQUEST).json({
                    success: false,
                    message: 'User ID is required',
                });
            }
            const requestData = await this.subscriptionService.createOfflinePaymentRequest(user_id);
            return res.status(common_1.HttpStatus.OK).json({
                success: true,
                message: 'Offline payment request submitted successfully',
                data: requestData,
            });
        }
        catch (error) {
            console.error('Error creating offline payment request:', error);
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: 'Failed to create offline payment request',
            });
        }
    }
    async getOfflineRequests(page = 1, limit = 10, search = '', status = 'All', res) {
        try {
            const { data, total, page: p, limit: l, } = await this.subscriptionService.getOfflineRequests(+page, +limit, search, status);
            return res.status(common_1.HttpStatus.OK).json({
                success: true,
                message: 'Offline requests fetched successfully',
                data,
                total,
                page: p,
                limit: l,
            });
        }
        catch (error) {
            console.error('Error fetching offline requests:', error);
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: 'Failed to fetch offline requests',
            });
        }
    }
    async exportOfflineRequests(dto, res) {
        const data = await this.subscriptionService.exportOfflineRequests(dto.search || '', dto.status || 'All');
        const columns = [
            { header: 'Billing ID', key: 'billing_id' },
            { header: 'Company Name', key: 'company_name' },
            { header: 'First Name', key: 'first_name' },
            { header: 'Last Name', key: 'last_name' },
            { header: 'Email', key: 'email' },
            { header: 'Phone', key: 'phone_number' },
            { header: 'Organization', key: 'organization_name' },
            { header: 'Product', key: 'product_name' },
            { header: 'Plan', key: 'plan_name' },
            { header: 'Reseller', key: 'reseller_name' },
            { header: 'Payment Status', key: 'payment_status' },
            { header: 'Order ID', key: 'order_id' },
            { header: 'Grand Total', key: 'grand_total' },
            { header: 'Order Placed By', key: 'order_placed_by' },
            { header: 'Customer PO', key: 'customer_po' },
            { header: 'Payment Term', key: 'payment_term' },
            { header: 'Status', key: 'status' },
        ];
        return this.exportService.export(res, dto.format, columns, data, 'Orders');
    }
    async updateStatus(payload, res) {
        try {
            if (!payload.request_id || !payload.status) {
                return res.status(common_1.HttpStatus.BAD_REQUEST).json({
                    success: false,
                    message: 'request_id and action are required',
                });
            }
            const updated = await this.subscriptionService.updateStatus(payload.request_id, payload.status === 'approve' ? 'approved' : 'rejected');
            if (!updated) {
                return res.status(common_1.HttpStatus.NOT_FOUND).json({
                    success: false,
                    message: `Request with ID ${payload.request_id} not found`,
                });
            }
            return res.status(common_1.HttpStatus.OK).json({
                success: true,
                message: `Request ${payload.status}d successfully`,
                data: updated,
            });
        }
        catch (error) {
            console.error('Update Status Error:', error);
            if (error_handler_util_1.ErrorHandler.isHttpException(error)) {
                throw error;
            }
            error_handler_util_1.ErrorHandler.throwInternalServerError(error, 'Failed to update customer');
        }
    }
    async getTrialAndLiveSubscriptions(page = 1, limit = 10, search = '', status = 'All', res) {
        try {
            const { trial, live, total } = await this.subscriptionService.getTrialAndLiveSubscriptions(Number(page), Number(limit), search, status);
            return res.status(common_1.HttpStatus.OK).json({
                success: true,
                message: 'Fetched subscriptions successfully',
                trial,
                live,
                total,
            });
        }
        catch (error) {
            console.error('Error fetching trial/live subscriptions:', error);
            if (error_handler_util_1.ErrorHandler.isHttpException(error)) {
                throw error;
            }
            error_handler_util_1.ErrorHandler.throwInternalServerError(error, 'Failed to update customer');
        }
    }
    async exportTrialAndLiveSubscriptions(dto, res) {
        const data = await this.subscriptionService.exportTrialAndLiveSubscriptions(dto.search || '', dto.status || 'All');
        const columns = [
            { header: 'Subscription ID', key: 'subscription_id' },
            { header: 'Organization', key: 'organization_name' },
            { header: 'Organization Code', key: 'organization_code' },
            { header: 'Order ID', key: 'order_id' },
            { header: 'Billing ID', key: 'billing_id' },
            { header: 'Product', key: 'product_name' },
            { header: 'Plan', key: 'plan_name' },
            { header: 'Start Date', key: 'start_date' },
            { header: 'Renewal Date', key: 'renewal_date' },
            { header: 'Payment Status', key: 'payment_status' },
            { header: 'Subscription Type', key: 'subscription_type' },
            { header: 'Auto Renewal', key: 'renewal' },
            { header: 'Restrict Login', key: 'restrict_login' },
            { header: 'Status', key: 'status' },
        ];
        return this.exportService.export(res, dto.format, columns, data, 'Subscriptions');
    }
    async getRenewals(res, page, limit, search, status, renewalStatus, quoteStatus, startDate, endDate, plan) {
        try {
            const currentPage = parseInt(page) || 1;
            const currentLimit = parseInt(limit) || 10;
            const searchTerm = search?.trim() || '';
            const filterStatus = status || 'All';
            const filters = { renewalStatus, quoteStatus, startDate, endDate, plan };
            const { trial, live, total } = await this.subscriptionService.getRenewals(currentPage, currentLimit, searchTerm, filterStatus, filters);
            return res.status(common_1.HttpStatus.OK).json({
                success: true,
                message: 'Fetched subscriptions successfully',
                trial,
                live,
                total,
            });
        }
        catch (error) {
            console.error('Error fetching trial/live subscriptions:', error);
            if (error_handler_util_1.ErrorHandler.isHttpException(error)) {
                throw error;
            }
            error_handler_util_1.ErrorHandler.throwInternalServerError(error, 'Failed to update customer');
        }
    }
    async getTrialSubscriptions(page = 1, limit = 10, search = '', status = 'All', res) {
        try {
            const { data, total } = await this.subscriptionService.getTrialSubscriptions(Number(page), Number(limit), search, status);
            return res.status(common_1.HttpStatus.OK).json({ success: true, data, total });
        }
        catch (err) {
            return res
                .status(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
                .json({ success: false, data: [], total: 0 });
        }
    }
    async getLiveSubscriptions(page = 1, limit = 10, search = '', status = 'All', res) {
        try {
            const { data, total } = await this.subscriptionService.getLiveSubscriptions(Number(page), Number(limit), search, status);
            return res.status(common_1.HttpStatus.OK).json({ success: true, data, total });
        }
        catch (err) {
            return res
                .status(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
                .json({ success: false, data: [], total: 0 });
        }
    }
    async deleteSubscription(id, res) {
        try {
            await this.subscriptionService.DeleteSubscription(Number(id));
            return res.status(common_1.HttpStatus.OK).json({
                success: true,
                message: 'Subscription deleted successfully (soft delete)',
            });
        }
        catch (error) {
            console.error('Error deleting subscription:', error);
            if (error_handler_util_1.ErrorHandler.isHttpException(error)) {
                throw error;
            }
            error_handler_util_1.ErrorHandler.throwInternalServerError(error, 'Failed to update customer');
        }
    }
    async getAllPaymentModes(res) {
        try {
            const data = await this.subscriptionService.getAllPaymentModes();
            return res.status(common_1.HttpStatus.OK).json({
                success: true,
                message: 'Fetched payment modes successfully',
                data,
            });
        }
        catch (error) {
            console.error('Error fetching payment modes:', error);
            if (error_handler_util_1.ErrorHandler.isHttpException(error)) {
                throw error;
            }
            error_handler_util_1.ErrorHandler.throwInternalServerError(error, 'Failed to update customer');
        }
    }
    async getAllSubscriptions(page = 1, limit = 10, search = '', status = 'All', res) {
        try {
            const { subscriptions, total } = await this.subscriptionService.getAllSubscriptionDetails(Number(page), Number(limit), search, status);
            return res.status(common_1.HttpStatus.OK).json({
                success: true,
                message: 'Fetched subscriptions with all details successfully',
                subscriptions,
                total,
            });
        }
        catch (error) {
            if (error_handler_util_1.ErrorHandler.isHttpException(error)) {
                throw error;
            }
            error_handler_util_1.ErrorHandler.throwInternalServerError(error, 'Failed to update customer');
        }
    }
    async getAllOrganizations(page = 1, limit = 10, search = '', type = 'all') {
        const parsedPage = Number(page);
        const parsedLimit = Number(limit);
        const result = await this.subscriptionService.getAllOrganizationsWithPrimaryUsers(parsedPage, parsedLimit, search, type);
        return api_pagination_util_1.ApiPagination.response('Organizations fetched successfully', result.organizations, result.total, parsedPage, parsedLimit);
    }
    async exportOrganizations(dto, res) {
        const data = await this.subscriptionService.exportOrganizations(dto.search || '', dto.type || 'all');
        const columns = [
            { header: 'Organization ID', key: 'organization_code' },
            { header: 'Organization Name', key: 'organization_name' },
            { header: 'Product', key: 'product_name' },
            { header: 'Plan', key: 'plan_name' },
            { header: 'Primary Contact', key: 'primary_contact' },
            { header: 'Email', key: 'email' },
            { header: 'Phone', key: 'phone_number' },
            { header: 'Billing Type', key: 'billing_type' },
            { header: 'Subscription Type', key: 'subscription_type' },
            { header: 'Reseller', key: 'reseller_name' },
            { header: 'GST Number', key: 'gst_number' },
            { header: 'Status', key: 'status' },
        ];
        return this.exportService.export(res, dto.format, columns, data, 'Organizations');
    }
    async createOrganization(createOrganizationDto, context) {
        return await this.subscriptionService.createCustomer(createOrganizationDto, context);
    }
    async updateCustomer(body) {
        try {
            const { subscriptionId, ...updateData } = body;
            if (!subscriptionId) {
                throw new common_1.HttpException({ success: false, message: 'subscriptionId is required' }, common_1.HttpStatus.BAD_REQUEST);
            }
            const result = await this.subscriptionService.updateCustomer({
                subscriptionId,
                ...updateData,
            });
            return {
                success: true,
                message: 'Customer updated successfully',
                data: result.data,
            };
        }
        catch (error) {
            console.error('Update customer error:', error);
            if (error_handler_util_1.ErrorHandler.isHttpException(error)) {
                throw error;
            }
            error_handler_util_1.ErrorHandler.throwInternalServerError(error, 'Failed to update customer');
        }
    }
    async fetchSingleUsersProfile(req, res) {
        try {
            const organizationDetails = await this.organizationalProfileCommonData.getOrganizationDetails(req);
            const { loginUserId } = organizationDetails;
            if (!loginUserId) {
                return res
                    .status(400)
                    .json({ success: false, message: 'Logged-in user not found' });
            }
            const response = await this.subscriptionService.fetchSingleUsersProfile(loginUserId);
            return res.status(response.status).json(response);
        }
        catch (error) {
            console.error('Error fetching user profile:', error);
            return res
                .status(500)
                .json({ success: false, message: 'Internal server error' });
        }
    }
    async getOrganizations() {
        return await this.subscriptionService.getOrganizationsForSelect();
    }
    async createOrUpdateOrder(orderDto, req) {
        try {
            console.log('Incoming DTO:', orderDto);
            const context = { userId: req.user?.id || null };
            console.log('Context:', context);
            const result = await this.subscriptionService.createOrUpdateOrder(orderDto, context);
            return result;
        }
        catch (error) {
            console.error('Controller Error:', error);
            if (error_handler_util_1.ErrorHandler.isHttpException(error)) {
                throw error;
            }
            error_handler_util_1.ErrorHandler.throwInternalServerError(error, 'Failed to update customer');
        }
    }
    async generatePdf(id, res) {
        const order = await this.subscriptionService.findOne(Number(id));
        if (!order) {
            throw new common_1.NotFoundException('Order not found');
        }
        if (!order.order_pdf?.url) {
            throw new common_1.NotFoundException('PDF not found');
        }
        const filePath = path_1.default.join(process.cwd(), order.order_pdf.url.replace(/^\//, ''));
        return res.sendFile(filePath);
    }
    async getAllProducts(res) {
        try {
            const data = await this.subscriptionService.getAllProducts();
            return res.status(common_1.HttpStatus.OK).json({
                success: true,
                message: 'Fetched products successfully',
                data,
            });
        }
        catch (error) {
            console.error('Error fetching products:', error);
            if (error_handler_util_1.ErrorHandler.isHttpException(error)) {
                throw error;
            }
            error_handler_util_1.ErrorHandler.throwInternalServerError(error, 'Failed to update customer');
        }
    }
    async getActivePlansByProduct(productId, res) {
        try {
            const data = await this.subscriptionService.getActivePlansByProduct(productId);
            return res.status(common_1.HttpStatus.OK).json({
                success: true,
                message: 'Fetched active plans successfully',
                data,
            });
        }
        catch (error) {
            if (error_handler_util_1.ErrorHandler.isHttpException(error)) {
                throw error;
            }
            error_handler_util_1.ErrorHandler.throwInternalServerError(error, 'Failed to update customer');
        }
    }
    async getActiveFeaturesByProduct(productId, res) {
        try {
            const data = await this.subscriptionService.getActiveFeaturesByProduct(productId);
            return res.status(common_1.HttpStatus.OK).json({
                success: true,
                message: 'Fetched active features successfully',
                data,
            });
        }
        catch (error) {
            if (error_handler_util_1.ErrorHandler.isHttpException(error)) {
                throw error;
            }
            error_handler_util_1.ErrorHandler.throwInternalServerError(error, 'Failed to update customer');
        }
    }
    async listProducts(body, res) {
        try {
            const { page = 1, limit = 10, search = '', status } = body;
            const result = await this.subscriptionService.listProducts({
                page: Number(page),
                limit: Number(limit),
                search,
                status,
            });
            return res.status(common_1.HttpStatus.OK).json({
                success: true,
                message: 'Fetched products successfully',
                ...result,
            });
        }
        catch (error) {
            console.error('Error fetching products:', error);
            if (error_handler_util_1.ErrorHandler.isHttpException(error)) {
                throw error;
            }
            error_handler_util_1.ErrorHandler.throwInternalServerError(error, 'Failed to update customer');
        }
    }
    async addProduct(createProductDto, res) {
        try {
            const product = await this.subscriptionService.addProduct(createProductDto);
            return res.status(common_1.HttpStatus.CREATED).json({
                success: true,
                message: 'Product created successfully',
                data: product,
            });
        }
        catch (error) {
            if (error_handler_util_1.ErrorHandler.isHttpException(error)) {
                throw error;
            }
            error_handler_util_1.ErrorHandler.throwInternalServerError(error, 'Failed to update customer');
        }
    }
    async getProduct(productId, res) {
        try {
            const product = await this.subscriptionService.getProductById(productId);
            return res.status(common_1.HttpStatus.OK).json({
                success: true,
                message: 'Fetched product successfully',
                data: product,
            });
        }
        catch (error) {
            if (error_handler_util_1.ErrorHandler.isHttpException(error)) {
                throw error;
            }
            error_handler_util_1.ErrorHandler.throwInternalServerError(error, 'Failed to update customer');
        }
    }
    async updateProduct(productId, updateProductDto, res) {
        try {
            const product = await this.subscriptionService.updateProduct(productId, updateProductDto);
            return res.status(common_1.HttpStatus.OK).json({
                success: true,
                message: 'Product updated successfully',
                data: product,
            });
        }
        catch (error) {
            if (error_handler_util_1.ErrorHandler.isHttpException(error)) {
                throw error;
            }
            error_handler_util_1.ErrorHandler.throwInternalServerError(error, 'Failed to update customer');
        }
    }
    async deleteProduct(productId, res) {
        try {
            await this.subscriptionService.softDeleteProduct(productId);
            return res.status(common_1.HttpStatus.OK).json({
                success: true,
                message: 'Product deleted successfully',
            });
        }
        catch (error) {
            if (error_handler_util_1.ErrorHandler.isHttpException(error)) {
                throw error;
            }
            error_handler_util_1.ErrorHandler.throwInternalServerError(error, 'Failed to update customer');
        }
    }
    async getAllStatus(res) {
        try {
            const data = await this.subscriptionService.getAllStatus();
            return res.status(common_1.HttpStatus.OK).json({
                success: true,
                message: 'Fetched renewal statuses successfully',
                data,
            });
        }
        catch (error) {
            console.error('Error fetching renewal statuses:', error);
            if (error_handler_util_1.ErrorHandler.isHttpException(error)) {
                throw error;
            }
            error_handler_util_1.ErrorHandler.throwInternalServerError(error, 'Failed to update customer');
        }
    }
    async getDashboardCounts() {
        return await this.subscriptionService.getDashboardCounts();
    }
    async toggleLoginRestriction(id, res) {
        try {
            const updated = await this.subscriptionService.toggleLoginRestriction(Number(id));
            return res.status(common_1.HttpStatus.OK).json({
                success: true,
                message: `Login has been ${updated.restrict_login ? 'disabled' : 'enabled'} successfully`,
                data: updated,
            });
        }
        catch (error) {
            console.error('Error toggling login restriction:', error);
            if (error_handler_util_1.ErrorHandler.isHttpException(error)) {
                throw error;
            }
            error_handler_util_1.ErrorHandler.throwInternalServerError(error, 'Failed to update customer');
        }
    }
    async listSalesRequests(body, res) {
        try {
            const { page = 1, limit = 10, search = '', status } = body;
            const result = await this.subscriptionService.listSalesRequests({
                page: Number(page),
                limit: Number(limit),
                search,
                status,
            });
            return res.status(common_1.HttpStatus.OK).json({
                success: true,
                message: 'Fetched sales requests successfully',
                ...result,
            });
        }
        catch (error) {
            console.error('Error fetching sales requests:', error);
            if (error_handler_util_1.ErrorHandler.isHttpException(error)) {
                throw error;
            }
            error_handler_util_1.ErrorHandler.throwInternalServerError(error, 'Failed to update customer');
        }
    }
    async getSalesRequest(id, res) {
        try {
            const request = await this.subscriptionService.getSalesRequestById(id);
            return res.status(common_1.HttpStatus.OK).json({
                success: true,
                message: 'Fetched sales request successfully',
                data: request,
            });
        }
        catch (error) {
            if (error_handler_util_1.ErrorHandler.isHttpException(error)) {
                throw error;
            }
            error_handler_util_1.ErrorHandler.throwInternalServerError(error, 'Failed to update customer');
        }
    }
    async deleteSalesRequest(id, res) {
        try {
            await this.subscriptionService.softDeleteSalesRequest(id);
            return res.status(common_1.HttpStatus.OK).json({
                success: true,
                message: 'Sales request deleted successfully',
            });
        }
        catch (error) {
            if (error_handler_util_1.ErrorHandler.isHttpException(error)) {
                throw error;
            }
            error_handler_util_1.ErrorHandler.throwInternalServerError(error, 'Failed to update customer');
        }
    }
    async disableOrganization(id, res) {
        try {
            await this.subscriptionService.disableOrganization(Number(id));
            return res.status(common_1.HttpStatus.OK).json({
                success: true,
                message: 'Organization disabled successfully',
            });
        }
        catch (error) {
            console.error('Error disabling organization:', error);
            if (error_handler_util_1.ErrorHandler.isHttpException(error)) {
                throw error;
            }
            error_handler_util_1.ErrorHandler.throwInternalServerError(error, 'Failed to update customer');
        }
    }
    async toggleLoginRestrictionByOrganization(organizationId, res) {
        try {
            const updated = await this.subscriptionService.toggleLoginRestrictionByOrganization(Number(organizationId));
            return api_response_util_1.ApiResponse.success(`Login has been ${updated.restrict_login ? 'disabled' : 'enabled'} successfully`, updated);
        }
        catch (error) {
            console.error('Error toggling login restriction:', error);
            if (error_handler_util_1.ErrorHandler.isHttpException(error)) {
                throw error;
            }
            error_handler_util_1.ErrorHandler.throwInternalServerError(error, 'Failed to update customer');
        }
    }
    async updateSalesRequestStatus(id, status, res) {
        try {
            await this.subscriptionService.updateSalesRequestStatus(Number(id), status);
            return res.status(common_1.HttpStatus.OK).json({
                success: true,
                message: `Sales request ${status.toLowerCase()} successfully`,
            });
        }
        catch (error) {
            console.error('Error updating sales request status:', error);
            if (error_handler_util_1.ErrorHandler.isHttpException(error)) {
                throw error;
            }
            error_handler_util_1.ErrorHandler.throwInternalServerError(error, 'Failed to update customer');
        }
    }
    async createTicket(dto, res) {
        try {
            await this.subscriptionService.createTicket(dto);
            return res.status(common_1.HttpStatus.CREATED).json({
                success: true,
                message: 'Support ticket created successfully in Billing',
            });
        }
        catch (error) {
            console.error('Error creating billing ticket:', error);
            if (error_handler_util_1.ErrorHandler.isHttpException(error)) {
                throw error;
            }
            error_handler_util_1.ErrorHandler.throwInternalServerError(error, 'Failed to update customer');
        }
    }
    async listTickets(body, res) {
        try {
            const { page = 1, limit = 10, search = '', status } = body;
            const result = await this.subscriptionService.listTickets({
                page: Number(page),
                limit: Number(limit),
                search,
                status,
            });
            return res.status(common_1.HttpStatus.OK).json({
                success: true,
                message: 'Fetched support tickets successfully',
                ...result,
            });
        }
        catch (error) {
            console.error('Error fetching support tickets:', error);
            if (error_handler_util_1.ErrorHandler.isHttpException(error)) {
                throw error;
            }
            error_handler_util_1.ErrorHandler.throwInternalServerError(error, 'Failed to update customer');
        }
    }
    async getTicket(id, res) {
        try {
            const ticket = await this.subscriptionService.getTicketById(id);
            return res.status(common_1.HttpStatus.OK).json({
                success: true,
                message: 'Fetched support ticket successfully',
                data: ticket,
            });
        }
        catch (error) {
            if (error_handler_util_1.ErrorHandler.isHttpException(error)) {
                throw error;
            }
            error_handler_util_1.ErrorHandler.throwInternalServerError(error, 'Failed to update customer');
        }
    }
    async deleteTicket(id, res) {
        try {
            await this.subscriptionService.softDeleteTicket(id);
            return res.status(common_1.HttpStatus.OK).json({
                success: true,
                message: 'Support ticket deleted successfully',
            });
        }
        catch (error) {
            if (error_handler_util_1.ErrorHandler.isHttpException(error)) {
                throw error;
            }
            error_handler_util_1.ErrorHandler.throwInternalServerError(error, 'Failed to update customer');
        }
    }
    async getTicketStatuses(res) {
        try {
            const statuses = Object.values(support_entity_1.SupportTicketStatus);
            return res.status(common_1.HttpStatus.OK).json({ success: true, data: statuses });
        }
        catch (error) {
            if (error_handler_util_1.ErrorHandler.isHttpException(error)) {
                throw error;
            }
            error_handler_util_1.ErrorHandler.throwInternalServerError(error, 'Failed to update customer');
        }
    }
    async updateTicketStatus(id, status, res) {
        try {
            console.log('🔵 [BILLING] Update request received');
            console.log('Ticket ID:', id, 'New Status:', status);
            const ticket = await this.subscriptionService.updateTicketStatus(id, status);
            console.log('🟢 [BILLING] Billing DB updated');
            console.log('Ticket Data:', {
                supportTicketId: ticket.supportTicketId,
                status: ticket.status,
                orgId: ticket.orgId,
            });
            const assetUrl = `${process.env.ASSET_API_URL}/support/sync-ticket-status`;
            console.log('➡️ [BILLING] Calling Asset API:', assetUrl);
            const assetResponse = await axios_1.default.post(assetUrl, {
                ticketId: ticket.supportTicketId,
                status: ticket.status,
                orgId: ticket.orgId,
            });
            console.log('🟢 [BILLING] Asset API Response:', assetResponse.data);
            return res.status(200).json({
                success: true,
                message: 'Status updated in Billing & Asset',
            });
        }
        catch (error) {
            if (error_handler_util_1.ErrorHandler.isHttpException(error)) {
                throw error;
            }
            error_handler_util_1.ErrorHandler.throwInternalServerError(error, 'Failed to update customer');
        }
    }
    async getOrgSubscriptionDetailsById(organizationId, res) {
        try {
            if (!organizationId) {
                return res.status(common_1.HttpStatus.BAD_REQUEST).json({
                    success: false,
                    message: 'organizationId is required',
                });
            }
            const data = await this.subscriptionService.getSubscriptionDetailsForAsset(organizationId);
            if (!data) {
                return res.status(common_1.HttpStatus.NOT_FOUND).json({
                    success: false,
                    message: 'No subscription found for this organization',
                });
            }
            return res.status(common_1.HttpStatus.OK).json({
                success: true,
                message: 'Fetched subscription details successfully',
                data,
            });
        }
        catch (error) {
            console.error('Error fetching subscription details:', error);
            if (error_handler_util_1.ErrorHandler.isHttpException(error)) {
                throw error;
            }
            error_handler_util_1.ErrorHandler.throwInternalServerError(error, 'Failed to update customer');
        }
    }
    async extendTrial(dto) {
        return this.subscriptionService.extendTrial(dto);
    }
};
exports.SubscriptionController = SubscriptionController;
__decorate([
    (0, common_1.Post)('create-subscription-type'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, create_subscription_type_dto_1.CreateSubscriptionTypeDto]),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "createSubscriptionType", null);
__decorate([
    (0, common_1.Get)('subscription-types'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "getAllSubscriptionTypes", null);
__decorate([
    (0, common_1.Post)('create-plan'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_plan_dto_1.CreatePlanDto, Object]),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "createNewPlan", null);
__decorate([
    (0, common_1.Post)('update-plan'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "updatePlan", null);
__decorate([
    (0, common_1.Post)('plan-details'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "getPlanDetails", null);
__decorate([
    (0, common_1.Post)('delete-plan/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "deletePlan", null);
__decorate([
    (0, common_1.Get)('fetch-all-plans'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "getAllPlanDetails", null);
__decorate([
    (0, common_1.Post)('billing-cycles'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "getBillingCyclesForPlanViaPayload", null);
__decorate([
    (0, common_1.Get)('fetch-all-billing-cycles'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "getAllBillingCycles", null);
__decorate([
    (0, common_1.Post)('get-single-billing-cycles'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "getBillingEntryById", null);
__decorate([
    (0, common_1.Post)('plan-features'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "getFeatureMappingsForPlan", null);
__decorate([
    (0, common_1.Post)('plans-with-features'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "getAllPlansWithFeatures", null);
__decorate([
    (0, common_1.Post)('create-org-subscription'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_subscription_dto_1.CreateOrgSubscriptionDto, Object, Object]),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "createOrgSubscription", null);
__decorate([
    (0, common_1.Post)('subscription-details'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "getSubscriptionDetails", null);
__decorate([
    (0, common_1.Post)('organization-details'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "getOrganizationDetails", null);
__decorate([
    (0, common_1.Post)('cancel-org-subscription'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "cancelOrgSubscription", null);
__decorate([
    (0, common_1.Post)('update-subscription'),
    (0, common_1.UseGuards)(api_key_guard_1.ApiKeyGuard, jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_subscription_dto_1.UpdateOrgSubscriptionDto, Object]),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "updateOrgSubscription", null);
__decorate([
    (0, common_1.Post)('subscription-history-details'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "getSubscriptionHistoryDetails", null);
__decorate([
    (0, common_1.Post)('subscription-logs'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "getSubscriptionLogs", null);
__decorate([
    (0, common_1.Post)('update-overrides'),
    __param(0, (0, common_1.Body)('org_id')),
    __param(1, (0, common_1.Body)('updates')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "updateOverrides", null);
__decorate([
    (0, common_1.Post)('override-by-organisation'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "getOverridesByOrganisation", null);
__decorate([
    (0, common_1.Get)('get-all-features'),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('search')),
    __param(3, (0, common_1.Query)('status')),
    __param(4, (0, common_1.Query)('productId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, String, Number]),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "getAllFeatures", null);
__decorate([
    (0, common_1.Get)('fetch-all-plans-with-billing'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __param(3, (0, common_1.Query)('search')),
    __param(4, (0, common_1.Query)('status')),
    __param(5, (0, common_1.Query)('productId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object, String, Number]),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "getAllPlansWithBilling", null);
__decorate([
    (0, common_1.Get)('fetch-all-plans-with-billing-and-features'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __param(3, (0, common_1.Query)('search')),
    __param(4, (0, common_1.Query)('status')),
    __param(5, (0, common_1.Query)('productId')),
    __param(6, (0, common_1.Query)('planId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object, String, Number, Number]),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "getAllPlansWithBillingAndFeatures", null);
__decorate([
    (0, common_1.Get)('fetch-plan-feature-summary'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __param(3, (0, common_1.Query)('search')),
    __param(4, (0, common_1.Query)('status')),
    __param(5, (0, common_1.Query)('productId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object, String, Number]),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "getPlanFeatureSummary", null);
__decorate([
    (0, common_1.Post)('create-feature'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [feature_dto_1.CreateFeatureDto, Object]),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "createFeature", null);
__decorate([
    (0, common_1.Post)('update-feature'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [feature_dto_1.UpdateFeatureDto, Object]),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "updateFeature", null);
__decorate([
    (0, common_1.Post)('feature-details'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "getFeatureDetails", null);
__decorate([
    (0, common_1.Post)('delete-feature/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "deleteFeature", null);
__decorate([
    (0, common_1.Get)('active-plans'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "getActivePlans", null);
__decorate([
    (0, common_1.Get)('active-features'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "getActiveFeatures", null);
__decorate([
    (0, common_1.Get)('active-payment-methods'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "getActivePaymentMethods", null);
__decorate([
    (0, common_1.Post)('create-mapping'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mapping_dto_1.CreateMappingDto, Object]),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "createMapping", null);
__decorate([
    (0, common_1.Post)('update-mapping-by-plan'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mapping_dto_1.UpdateMappingDto, Object]),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "updateMappingByPlan", null);
__decorate([
    (0, common_1.Post)('mapping-details'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "getMappingDetails", null);
__decorate([
    (0, common_1.Post)('mapping-details-by-plan'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "getMappingDetailsByPlan", null);
__decorate([
    (0, common_1.Post)('delete-mapping/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "deleteMapping", null);
__decorate([
    (0, common_1.Get)('plan-with-all-details/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "getPlanWithFeaturesById", null);
__decorate([
    (0, common_1.Post)('create-payment'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [payment_dto_1.CreatePaymentDto, Object, Object]),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "createPayment", null);
__decorate([
    (0, common_1.Post)('org-subscription-details'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "getOrgSubscriptionDetails", null);
__decorate([
    (0, common_1.Post)('create-plan-setting'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [plan_setting_dto_1.CreatePlanSettingDto, Object]),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "createPlanSetting", null);
__decorate([
    (0, common_1.Post)('upsert-plan-setting'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [plan_setting_dto_1.CreatePlanSettingDto, Object]),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "upsertPlanSetting", null);
__decorate([
    (0, common_1.Get)('get-settings/:planId'),
    __param(0, (0, common_1.Param)('planId')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "getSettingsByPlan", null);
__decorate([
    (0, common_1.Post)('payment-request'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "createOfflinePaymentRequest", null);
__decorate([
    (0, common_1.Get)('offline-requests'),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('search')),
    __param(3, (0, common_1.Query)('status')),
    __param(4, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, String, Object]),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "getOfflineRequests", null);
__decorate([
    (0, common_1.Post)('offline-requests/export'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [export_dto_1.ExportDto, Object]),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "exportOfflineRequests", null);
__decorate([
    (0, common_1.Post)('update-request-status'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [billing_request_dto_1.UpdateStatusDto, Object]),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Get)('trial-live-subscriptions'),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('search')),
    __param(3, (0, common_1.Query)('status')),
    __param(4, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, String, Object]),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "getTrialAndLiveSubscriptions", null);
__decorate([
    (0, common_1.Post)('trial-live-subscriptions/export'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [export_dto_1.ExportDto, Object]),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "exportTrialAndLiveSubscriptions", null);
__decorate([
    (0, common_1.Get)('get-all-renewals'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __param(3, (0, common_1.Query)('search')),
    __param(4, (0, common_1.Query)('status')),
    __param(5, (0, common_1.Query)('renewalStatus')),
    __param(6, (0, common_1.Query)('quoteStatus')),
    __param(7, (0, common_1.Query)('startDate')),
    __param(8, (0, common_1.Query)('endDate')),
    __param(9, (0, common_1.Query)('plan')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String, String, String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "getRenewals", null);
__decorate([
    (0, common_1.Post)('trial-subscriptions'),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('search')),
    __param(3, (0, common_1.Query)('status')),
    __param(4, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, String, Object]),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "getTrialSubscriptions", null);
__decorate([
    (0, common_1.Post)('live-subscriptions'),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('search')),
    __param(3, (0, common_1.Query)('status')),
    __param(4, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, String, Object]),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "getLiveSubscriptions", null);
__decorate([
    (0, common_1.Post)('delete/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "deleteSubscription", null);
__decorate([
    (0, common_1.Get)('payment-modes'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "getAllPaymentModes", null);
__decorate([
    (0, common_1.Get)('all-subscriptions'),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('search')),
    __param(3, (0, common_1.Query)('status')),
    __param(4, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, String, Object]),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "getAllSubscriptions", null);
__decorate([
    (0, common_1.Get)('get-all-organisations'),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('search')),
    __param(3, (0, common_1.Query)('type')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String, String]),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "getAllOrganizations", null);
__decorate([
    (0, common_1.Post)('export'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [export_dto_1.ExportDto, Object]),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "exportOrganizations", null);
__decorate([
    (0, common_1.Post)('create-customer'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_customer_dto_1.CreateCustomerDto, Object]),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "createOrganization", null);
__decorate([
    (0, common_1.Post)('update-customer'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "updateCustomer", null);
__decorate([
    (0, common_1.Post)('fetch-single-user-profile'),
    (0, common_1.UseGuards)(api_key_guard_1.ApiKeyGuard, jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "fetchSingleUsersProfile", null);
__decorate([
    (0, common_1.Get)('all-organisations'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "getOrganizations", null);
__decorate([
    (0, common_1.Post)('create-or-update'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_order_dto_1.CreateOrderDto, Object]),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "createOrUpdateOrder", null);
__decorate([
    (0, common_1.Get)(':id/pdf'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "generatePdf", null);
__decorate([
    (0, common_1.Get)('get-all-products'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "getAllProducts", null);
__decorate([
    (0, common_1.Post)('get-plans-by-product'),
    __param(0, (0, common_1.Body)('productId')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "getActivePlansByProduct", null);
__decorate([
    (0, common_1.Post)('get-features-by-product'),
    __param(0, (0, common_1.Body)('productId')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "getActiveFeaturesByProduct", null);
__decorate([
    (0, common_1.Post)('list-products'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "listProducts", null);
__decorate([
    (0, common_1.Post)('add-product'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [product_dto_1.CreateProductDto, Object]),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "addProduct", null);
__decorate([
    (0, common_1.Get)('get-product/:productId'),
    __param(0, (0, common_1.Param)('productId')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "getProduct", null);
__decorate([
    (0, common_1.Post)('update-product/:productId'),
    __param(0, (0, common_1.Param)('productId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, product_dto_1.UpdateProductDto, Object]),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "updateProduct", null);
__decorate([
    (0, common_1.Post)('delete-product/:productId'),
    __param(0, (0, common_1.Param)('productId')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "deleteProduct", null);
__decorate([
    (0, common_1.Get)('get-all-status'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "getAllStatus", null);
__decorate([
    (0, common_1.Get)('dashboard-counts'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "getDashboardCounts", null);
__decorate([
    (0, common_1.Post)('toggle-login/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "toggleLoginRestriction", null);
__decorate([
    (0, common_1.Post)('sales-requests-list'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "listSalesRequests", null);
__decorate([
    (0, common_1.Get)('get-sales-requests/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "getSalesRequest", null);
__decorate([
    (0, common_1.Post)('delete-sales-request/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "deleteSalesRequest", null);
__decorate([
    (0, common_1.Post)('disable-organization/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "disableOrganization", null);
__decorate([
    (0, common_1.Post)('toggle-login-by-organization/:organizationId'),
    __param(0, (0, common_1.Param)('organizationId')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "toggleLoginRestrictionByOrganization", null);
__decorate([
    (0, common_1.Post)('update-sales-request/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('status')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, Object]),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "updateSalesRequestStatus", null);
__decorate([
    (0, common_1.Post)('create-ticket'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_billing_support_ticket_dto_1.CreateBillingSupportTicketDto, Object]),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "createTicket", null);
__decorate([
    (0, common_1.Post)('tickets-list'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "listTickets", null);
__decorate([
    (0, common_1.Get)('get-ticket/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "getTicket", null);
__decorate([
    (0, common_1.Post)('delete-ticket/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "deleteTicket", null);
__decorate([
    (0, common_1.Get)('ticket-statuses'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "getTicketStatuses", null);
__decorate([
    (0, common_1.Post)('update-ticket-status/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('status')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, Object]),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "updateTicketStatus", null);
__decorate([
    (0, common_1.Post)('org-subscription-details-by-id'),
    __param(0, (0, common_1.Body)('organizationId')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "getOrgSubscriptionDetailsById", null);
__decorate([
    (0, common_1.Post)('extend-trial'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [extend_trial_dto_1.ExtendTrialDto]),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "extendTrial", null);
exports.SubscriptionController = SubscriptionController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, api_key_guard_1.ApiKeyGuard),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })),
    (0, common_1.Controller)('subscriptions'),
    __metadata("design:paramtypes", [subscription_service_1.SubscriptionService,
        organizational_profile_1.OrganizationalProfileCommonData,
        pdf_service_1.PdfService,
        export_service_1.ExportService])
], SubscriptionController);
