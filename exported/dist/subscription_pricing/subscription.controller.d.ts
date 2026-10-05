import { ExecutionContext, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { ExportDto } from 'src/common/export/dto/export.dto';
import { ExportService } from 'src/common/export/services/export.service';
import { OrganizationalProfileCommonData } from 'src/common/organizational-info/organizational-profile';
import { CreateOrderDto } from '../subscription_pricing/dto/create-order.dto';
import { UpdateStatusDto } from './dto/billing-request.dto';
import { CreateBillingSupportTicketDto } from './dto/create-billing-support-ticket.dto';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { CreatePlanDto } from './dto/create-plan.dto';
import { CreateSubscriptionTypeDto } from './dto/create-subscription-type.dto';
import { CreateOrgSubscriptionDto } from './dto/create-subscription.dto';
import { ExtendTrialDto } from './dto/extend-trial.dto';
import { CreateFeatureDto, UpdateFeatureDto } from './dto/feature.dto';
import { CreateMappingDto, UpdateMappingDto } from './dto/mapping.dto';
import { CreatePaymentDto } from './dto/payment.dto';
import { CreatePlanSettingDto } from './dto/plan-setting.dto';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';
import { UpdateOrgSubscriptionDto } from './dto/update-subscription.dto';
import { PdfService } from './pdf.service';
import { SubscriptionService } from './subscription.service';
export declare class SubscriptionController {
    private readonly subscriptionService;
    private readonly organizationalProfileCommonData;
    private readonly pdfService;
    private readonly exportService;
    constructor(subscriptionService: SubscriptionService, organizationalProfileCommonData: OrganizationalProfileCommonData, pdfService: PdfService, exportService: ExportService);
    createSubscriptionType(req: Request, res: Response, createSubscriptionTypeDto: CreateSubscriptionTypeDto): Promise<Response<any, Record<string, any>>>;
    getAllSubscriptionTypes(res: Response): Promise<Response<any, Record<string, any>>>;
    createNewPlan(payload: CreatePlanDto, res: Response): Promise<Response<any, Record<string, any>>>;
    updatePlan(payload: any, res: Response): Promise<Response<any, Record<string, any>>>;
    getPlanDetails(body: {
        plan_id: number;
    }, res: Response): Promise<Response<any, Record<string, any>>>;
    deletePlan(id: number, res: Response): Promise<Response<any, Record<string, any>>>;
    getAllPlanDetails(res: Response): Promise<Response<any, Record<string, any>>>;
    getBillingCyclesForPlanViaPayload(body: {
        plan_id: number;
    }, res: Response): Promise<Response<any, Record<string, any>>>;
    getAllBillingCycles(res: Response): Promise<Response<any, Record<string, any>>>;
    getBillingEntryById(body: {
        billing_id: number;
    }, res: Response): Promise<Response<any, Record<string, any>>>;
    getFeatureMappingsForPlan(body: {
        plan_id: number;
    }, res: Response): Promise<Response<any, Record<string, any>>>;
    getAllPlansWithFeatures(res: Response): Promise<Response<any, Record<string, any>>>;
    createOrgSubscription(payload: CreateOrgSubscriptionDto, res: Response, req: any): Promise<Response<any, Record<string, any>>>;
    getSubscriptionDetails(body: {
        subscription_id: number;
    }, res: Response): Promise<Response<any, Record<string, any>>>;
    getOrganizationDetails(body: {
        organization_id: number;
    }, res: Response): Promise<Response<any, Record<string, any>>>;
    cancelOrgSubscription(body: {
        organization_profile_id: number;
        subscription_id: number;
    }, res: Response, req: any): Promise<Response<any, Record<string, any>>>;
    updateOrgSubscription(dto: UpdateOrgSubscriptionDto, req: any): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entity/org_subscription.entity").OrgSubscription;
    }>;
    getSubscriptionHistoryDetails(body: {
        organisation_id: number;
    }, res: Response): Promise<Response<any, Record<string, any>>>;
    getSubscriptionLogs(body: {
        organization_profile_id: number;
    }, res: Response): Promise<Response<any, Record<string, any>>>;
    updateOverrides(org_id: number, updates: {
        override_id?: number;
        feature_id: number;
        plan_id: number;
        mapping_id?: number;
        override_value: string;
        default_value?: string;
        is_active?: boolean;
        is_deleted?: boolean;
    }[] | {
        override_id?: number;
        feature_id: number;
        plan_id: number;
        mapping_id?: number;
        override_value: string;
        default_value?: string;
        is_active?: boolean;
        is_deleted?: boolean;
    }): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: {
            pricing: import("./entity/org_feature_overrides.entity").OrgFeatureOverride[];
            public: import("../organization_register/entities/org_overrides.entity").OrgOverride[];
            logs: import("./entity/org_feature_override_logs.entity").OrgFeatureOverrideLog[];
        };
    }>;
    getOverridesByOrganisation(body: {
        organisation_id: number;
    }, res: Response): Promise<Response<any, Record<string, any>>>;
    getAllFeatures(page?: number, limit?: number, search?: string, status?: 'All' | 'Active' | 'Inactive', productId?: number): Promise<{
        success: boolean;
        message: string;
        data: import("./entity/feature.entity").Feature[];
        total: number;
        page: number;
        limit: number;
    }>;
    getAllPlansWithBilling(res: Response, page?: number, limit?: number, search?: string, status?: 'All' | 'Active' | 'Inactive', productId?: number): Promise<Response<any, Record<string, any>>>;
    getAllPlansWithBillingAndFeatures(res: Response, page?: number, limit?: number, search?: string, status?: 'All' | 'Active' | 'Inactive', productId?: number, planId?: number): Promise<Response<any, Record<string, any>>>;
    getPlanFeatureSummary(res: Response, page?: number, limit?: number, search?: string, status?: 'All' | 'Active' | 'Inactive', productId?: number): Promise<Response<any, Record<string, any>>>;
    createFeature(payload: CreateFeatureDto, res: Response): Promise<Response<any, Record<string, any>>>;
    updateFeature(payload: UpdateFeatureDto, res: Response): Promise<Response<any, Record<string, any>>>;
    getFeatureDetails(body: {
        feature_id: number;
    }, res: Response): Promise<Response<any, Record<string, any>>>;
    deleteFeature(id: number, res: Response): Promise<Response<any, Record<string, any>>>;
    getActivePlans(res: Response): Promise<Response<any, Record<string, any>>>;
    getActiveFeatures(res: Response): Promise<Response<any, Record<string, any>>>;
    getActivePaymentMethods(res: Response): Promise<Response<any, Record<string, any>>>;
    createMapping(payload: CreateMappingDto, res: Response): Promise<Response<any, Record<string, any>>>;
    updateMappingByPlan(body: UpdateMappingDto, res: Response): Promise<Response<any, Record<string, any>>>;
    getMappingDetails(body: {
        mapping_id: number;
    }, res: Response): Promise<Response<any, Record<string, any>>>;
    getMappingDetailsByPlan(body: {
        plan_id: number;
    }, res: Response): Promise<Response<any, Record<string, any>>>;
    deleteMapping(id: number, res: Response): Promise<Response<any, Record<string, any>>>;
    getPlanWithFeaturesById(id: number, res: Response): Promise<Response<any, Record<string, any>>>;
    createPayment(payload: CreatePaymentDto, res: Response, req: any): Promise<Response<any, Record<string, any>>>;
    getOrgSubscriptionDetails(res: Response, req: any): Promise<Response<any, Record<string, any>>>;
    createPlanSetting(payload: CreatePlanSettingDto, res: Response): Promise<Response<any, Record<string, any>>>;
    upsertPlanSetting(payload: CreatePlanSettingDto, res: Response): Promise<Response<any, Record<string, any>>>;
    getSettingsByPlan(planId: number, res: Response): Promise<Response<any, Record<string, any>>>;
    createOfflinePaymentRequest(req: Request, res: Response, body: any): Promise<Response<any, Record<string, any>>>;
    getOfflineRequests(page: number, limit: number, search: string, status: 'All' | 'pending' | 'approved' | 'rejected', res: Response): Promise<Response<any, Record<string, any>>>;
    exportOfflineRequests(dto: ExportDto, res: Response): Promise<void>;
    updateStatus(payload: UpdateStatusDto, res: Response): Promise<Response<any, Record<string, any>>>;
    getTrialAndLiveSubscriptions(page: number, limit: number, search: string, status: 'All' | 'Active' | 'Inactive' | 'Trial' | 'Live', res: Response): Promise<Response<any, Record<string, any>>>;
    exportTrialAndLiveSubscriptions(dto: ExportDto, res: Response): Promise<void>;
    getRenewals(res: Response, page?: string, limit?: string, search?: string, status?: 'All' | 'Active' | 'Inactive' | 'Trial' | 'Live', renewalStatus?: string, quoteStatus?: string, startDate?: string, endDate?: string, plan?: string): Promise<Response<any, Record<string, any>>>;
    getTrialSubscriptions(page: number, limit: number, search: string, status: 'All' | 'Active' | 'Inactive', res: Response): Promise<Response<any, Record<string, any>>>;
    getLiveSubscriptions(page: number, limit: number, search: string, status: 'All' | 'Active' | 'Inactive', res: Response): Promise<Response<any, Record<string, any>>>;
    deleteSubscription(id: number, res: Response): Promise<Response<any, Record<string, any>>>;
    getAllPaymentModes(res: Response): Promise<Response<any, Record<string, any>>>;
    getAllSubscriptions(page: number, limit: number, search: string, status: 'All' | 'Active' | 'Inactive' | 'Trial' | 'Live', res: Response): Promise<Response<any, Record<string, any>>>;
    getAllOrganizations(page?: number, limit?: number, search?: string, type?: 'all' | 'paid' | 'trial'): Promise<{
        statusCode: number;
        message: string;
        data: any[];
        total: number;
        page: number;
        limit: number;
    }>;
    exportOrganizations(dto: ExportDto, res: Response): Promise<void>;
    createOrganization(createOrganizationDto: CreateCustomerDto, context: ExecutionContext): Promise<any>;
    updateCustomer(body: any): Promise<{
        success: boolean;
        message: string;
        data: any;
    }>;
    fetchSingleUsersProfile(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    getOrganizations(): Promise<any[]>;
    createOrUpdateOrder(orderDto: CreateOrderDto, req: any): Promise<any>;
    generatePdf(id: string, res: Response): Promise<void>;
    getAllProducts(res: Response): Promise<Response<any, Record<string, any>>>;
    getActivePlansByProduct(productId: number, res: Response): Promise<Response<any, Record<string, any>>>;
    getActiveFeaturesByProduct(productId: number, res: Response): Promise<Response<any, Record<string, any>>>;
    listProducts(body: any, res: Response): Promise<Response<any, Record<string, any>>>;
    addProduct(createProductDto: CreateProductDto, res: Response): Promise<Response<any, Record<string, any>>>;
    getProduct(productId: number, res: Response): Promise<Response<any, Record<string, any>>>;
    updateProduct(productId: number, updateProductDto: UpdateProductDto, res: Response): Promise<Response<any, Record<string, any>>>;
    deleteProduct(productId: number, res: Response): Promise<Response<any, Record<string, any>>>;
    getAllStatus(res: Response): Promise<Response<any, Record<string, any>>>;
    getDashboardCounts(): Promise<any>;
    toggleLoginRestriction(id: number, res: Response): Promise<Response<any, Record<string, any>>>;
    listSalesRequests(body: any, res: Response): Promise<Response<any, Record<string, any>>>;
    getSalesRequest(id: number, res: Response): Promise<Response<any, Record<string, any>>>;
    deleteSalesRequest(id: number, res: Response): Promise<Response<any, Record<string, any>>>;
    disableOrganization(id: number, res: Response): Promise<Response<any, Record<string, any>>>;
    toggleLoginRestrictionByOrganization(organizationId: number, res: Response): Promise<{
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    }>;
    updateSalesRequestStatus(id: number, status: 'Converted' | 'Rejected', res: Response): Promise<Response<any, Record<string, any>>>;
    createTicket(dto: CreateBillingSupportTicketDto, res: Response): Promise<Response<any, Record<string, any>>>;
    listTickets(body: any, res: Response): Promise<Response<any, Record<string, any>>>;
    getTicket(id: number, res: Response): Promise<Response<any, Record<string, any>>>;
    deleteTicket(id: number, res: Response): Promise<Response<any, Record<string, any>>>;
    getTicketStatuses(res: Response): Promise<Response<any, Record<string, any>>>;
    updateTicketStatus(id: number, status: string, res: Response): Promise<Response<any, Record<string, any>>>;
    getOrgSubscriptionDetailsById(organizationId: number, res: Response): Promise<Response<any, Record<string, any>>>;
    extendTrial(dto: ExtendTrialDto): Promise<{
        success: boolean;
        message: string;
        data: {
            subscription_id: number;
            old_expiry_date: Date;
            new_expiry_date: Date;
        };
    }>;
}
