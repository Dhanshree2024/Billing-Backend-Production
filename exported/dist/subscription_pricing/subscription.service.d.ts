import { HttpService } from '@nestjs/axios';
import { MailService } from 'src/common/mail/mail.service';
import { OrgOverride } from 'src/organization_register/entities/org_overrides.entity';
import { RegisterOrganization } from 'src/organization_register/entities/register-organization.entity';
import { RegisterUserLogin } from 'src/organization_register/entities/register-user-login.entity';
import { DataSource, Repository } from 'typeorm';
import { MailConfigService } from '../common/mail/mail-config.service';
import { CreateOrderDto } from '../subscription_pricing/dto/create-order.dto';
import { OrgFeatureOverride } from '../subscription_pricing/entity/org_feature_overrides.entity';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { CreatePlanDto } from './dto/create-plan.dto';
import { CreateSubscriptionTypeDto } from './dto/create-subscription-type.dto';
import { CreateOrgSubscriptionDto } from './dto/create-subscription.dto';
import { CreateFeatureDto, UpdateFeatureDto } from './dto/feature.dto';
import { CreateMappingDto, UpdateMappingDto } from './dto/mapping.dto';
import { CreatePaymentDto } from './dto/payment.dto';
import { CreatePlanSettingDto } from './dto/plan-setting.dto';
import { UpdateOrgSubscriptionDto } from './dto/update-subscription.dto';
import { BillingInfo } from './entity/billing_info.entity';
import { Feature } from './entity/feature.entity';
import { OfflinePaymentRequest } from './entity/offline_payment_requests.entity';
import { OrgFeatureOverrideLog } from './entity/org_feature_override_logs.entity';
import { OrgSubscription } from './entity/org_subscription.entity';
import { PaymentMethod } from './entity/payment_methods.entity';
import { PaymentMode } from './entity/payment_mode.entity';
import { PaymentTransaction } from './entity/payment_transaction.entity';
import { PlanBilling } from './entity/plan-billing.entity';
import { PlanFeatureMapping } from './entity/plan-feature-mapping.entity';
import { Plan } from './entity/plan.entity';
import { PlanSetting } from './entity/plan_setting.entity';
import { Product } from './entity/product.entity';
import { RenewalStatus } from './entity/renewal.entity';
import { SubscriptionLog } from './entity/subscription-log.entity';
import { SubscriptionType } from './entity/subscription-type.entity';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';
import { ActivityLogService } from 'src/activity-log/activity-log.service';
import { NotificationHelper } from 'src/common/notifications/notification.helper';
import { CreateBillingSupportTicketDto } from './dto/create-billing-support-ticket.dto';
import { ExtendTrialDto } from './dto/extend-trial.dto';
import { ContactSalesRequest } from './entity/contact_sales_requests.entity';
import { SupportTicket, SupportTicketStatus } from './entity/support.entity';
import { PdfService } from './pdf.service';
export declare class SubscriptionService {
    private readonly activityLogService;
    private readonly pdfService;
    private readonly featureRepository;
    private readonly planBillingRepository;
    private readonly planFeatureMappingRepository;
    private readonly planRepository;
    private readonly orgsubscriptionTypeRepository;
    private readonly subscriptionRepository;
    private readonly subscriptionLogRepository;
    private pricingOverrideRepo;
    private publicOverrideRepo;
    private orgRepo;
    private featureOverrideLogs;
    private billingInfoRepository;
    private paymentTransactionRepository;
    private planSettingRepo;
    private offlinePaymentRepo;
    private readonly registerUser;
    private readonly paymentMethod;
    private readonly paymentModeRepository;
    private readonly productRepository;
    private readonly renewalStatusRepository;
    private readonly salesrequestsRepository;
    private readonly supportTicketRepo;
    private readonly dataSource;
    private readonly mailConfigService;
    private readonly mailService;
    private readonly httpService;
    private readonly notificationHelper;
    constructor(activityLogService: ActivityLogService, pdfService: PdfService, featureRepository: Repository<Feature>, planBillingRepository: Repository<PlanBilling>, planFeatureMappingRepository: Repository<PlanFeatureMapping>, planRepository: Repository<Plan>, orgsubscriptionTypeRepository: Repository<SubscriptionType>, subscriptionRepository: Repository<OrgSubscription>, subscriptionLogRepository: Repository<SubscriptionLog>, pricingOverrideRepo: Repository<OrgFeatureOverride>, publicOverrideRepo: Repository<OrgOverride>, orgRepo: Repository<RegisterOrganization>, featureOverrideLogs: Repository<OrgFeatureOverrideLog>, billingInfoRepository: Repository<BillingInfo>, paymentTransactionRepository: Repository<PaymentTransaction>, planSettingRepo: Repository<PlanSetting>, offlinePaymentRepo: Repository<OfflinePaymentRequest>, registerUser: Repository<RegisterUserLogin>, paymentMethod: Repository<PaymentMethod>, paymentModeRepository: Repository<PaymentMode>, productRepository: Repository<Product>, renewalStatusRepository: Repository<RenewalStatus>, salesrequestsRepository: Repository<ContactSalesRequest>, supportTicketRepo: Repository<SupportTicket>, dataSource: DataSource, mailConfigService: MailConfigService, mailService: MailService, httpService: HttpService, notificationHelper: NotificationHelper);
    createSubscriptionType(dto: CreateSubscriptionTypeDto, loginUserId: number): Promise<SubscriptionType>;
    getAllSubscriptionTypes(): Promise<any[]>;
    createPlan(payload: CreatePlanDto): Promise<Plan>;
    updatePlan(plan_id: number, payload: any): Promise<Plan>;
    getPlanDetailsById(plan_id: number): Promise<any>;
    deletePlan(id: number): Promise<void>;
    getAllPlanDetails(): Promise<any[]>;
    getBillingDetailsByPlanId(plan_id: number): Promise<any>;
    getAllBillingCycles(): Promise<any[]>;
    getBillingEntryById(billing_id: number): Promise<any>;
    getFeaturesByPlanId(plan_id: number): Promise<any[]>;
    getFeatureMappingsByPlanId(plan_id: number): Promise<any[]>;
    getAllPlansWithFeatures(): Promise<any[]>;
    createOrgSubscription(payload: CreateOrgSubscriptionDto, loginUserId: number): Promise<OrgSubscription>;
    getSubscriptionDetailsById(subscription_id: number): Promise<any>;
    cancelOrgSubscription(organization_profile_id: number, subscription_id: number, loginUserId: number): Promise<string>;
    getOrganizationDetails(organization_id: number): Promise<any>;
    updateOrgSubscription(subscription_id: number, dto: UpdateOrgSubscriptionDto, organizationId: number, updatedByUserId: number): Promise<OrgSubscription>;
    getSubscriptionHistoryByOrgId(orgId: number): Promise<any[]>;
    logSubscriptionChange(subscription_id: number, orgId: number, action: 'create' | 'update' | 'cancel', performed_by: number, oldData?: any, newData?: any, remarks?: string): Promise<void>;
    getSubscriptionLogs(organization_profile_id: number): Promise<SubscriptionLog[]>;
    updateOverrides(org_id: number, updates: {
        feature_id: number;
        plan_id: number;
        mapping_id?: number;
        override_value: string;
        default_value?: string;
        is_active?: boolean;
        is_deleted?: boolean;
    }[] | {
        feature_id: number;
        plan_id: number;
        mapping_id?: number;
        override_value: string;
        default_value?: string;
        is_active?: boolean;
        is_deleted?: boolean;
    }, changedBy?: number): Promise<{
        pricing: OrgFeatureOverride[];
        public: OrgOverride[];
        logs: OrgFeatureOverrideLog[];
    }>;
    updateOverrides1(org_id: number, updates: {
        feature_id: number;
        plan_id: number;
        mapping_id?: number;
        override_value: string;
        default_value?: string;
        is_active?: boolean;
        is_deleted?: boolean;
    }[] | {
        feature_id: number;
        plan_id: number;
        mapping_id?: number;
        override_value: string;
        default_value?: string;
        is_active?: boolean;
        is_deleted?: boolean;
    }, changedBy?: number): Promise<{
        pricing: OrgFeatureOverride[];
        public: OrgOverride[];
        logs: OrgFeatureOverrideLog[];
    }>;
    getOverridesByOrgId(orgId: number): Promise<any[]>;
    getAllFeatures(page: number, limit: number, search: string, status: 'All' | 'Active' | 'Inactive', productId: number): Promise<{
        data: Feature[];
        total: number;
    }>;
    getAllPlansWithBilling(page: number, limit: number, search: string, status: 'All' | 'Active' | 'Inactive', productId?: number): Promise<{
        data: Plan[];
        total: number;
    }>;
    getAllPlansWithBillingAndFeatures(page: number, limit: number, search: string, status: 'All' | 'Active' | 'Inactive', productId?: number, planId?: number): Promise<{
        data: any[];
        total: number;
    }>;
    getPlanFeatureSummary(page: number, limit: number, search: string, status: 'All' | 'Active' | 'Inactive', productId?: number): Promise<{
        data: any[];
        total: number;
    }>;
    createFeature(payload: CreateFeatureDto): Promise<Feature>;
    updateFeature(feature_id: number, payload: UpdateFeatureDto): Promise<Feature>;
    getFeatureDetailsById(feature_id: number): Promise<any>;
    deleteFeature(id: number): Promise<void>;
    getActivePlans(): Promise<{
        id: number;
        name: string;
    }[]>;
    getActiveFeatures(): Promise<{
        id: number;
        name: string;
    }[]>;
    getActivePaymentMethods(): Promise<{
        id: number;
        name: string;
    }[]>;
    createMapping(payload: CreateMappingDto): Promise<PlanFeatureMapping[]>;
    updateMappingsByPlanId(plan_id: number, payload: UpdateMappingDto): Promise<PlanFeatureMapping[]>;
    getMappingDetailsById(mapping_id: number): Promise<any>;
    getMappingDetailsByPlanId(plan_id: number): Promise<any>;
    deleteMapping(mapping_id: number): Promise<void>;
    getPlanWithFeaturesById(planId: number): Promise<any>;
    createPayment(payload: CreatePaymentDto, userId: number): Promise<{
        billingInfo: BillingInfo;
        paymentTransaction: PaymentTransaction;
    }>;
    getSubscriptionDetailsByOrganization(organization_profile_id: number): Promise<any>;
    createSetting(dto: CreatePlanSettingDto): Promise<PlanSetting>;
    upsertSetting(dto: CreatePlanSettingDto): Promise<PlanSetting>;
    getSettingsByPlan(plan_id: number): Promise<PlanSetting[]>;
    createOfflinePaymentRequest(userId: number): Promise<OfflinePaymentRequest>;
    getOfflineRequests(page: number, limit: number, search: string, status: 'All' | 'pending' | 'approved' | 'rejected'): Promise<{
        data: any[];
        total: number;
        page: number;
        limit: number;
    }>;
    private buildOfflineRequestQuery;
    exportOfflineRequests(search: string, status: 'All' | 'pending' | 'approved' | 'rejected'): Promise<any[]>;
    updateStatus(request_id: number, status: 'approved' | 'rejected'): Promise<any>;
    getTrialAndLiveSubscriptions(page: number, limit: number, search: string, status: 'All' | 'Active' | 'Inactive' | 'Trial' | 'Live'): Promise<{
        trial: any[];
        live: any[];
        total: number;
    }>;
    exportTrialAndLiveSubscriptions(search: string, status: 'All' | 'Active' | 'Inactive' | 'Trial' | 'Live'): Promise<any[]>;
    getRenewals(page: number, limit: number, search: string, status: 'All' | 'Active' | 'Inactive' | 'Trial' | 'Live', filters?: {
        renewalStatus?: string;
        quoteStatus?: string;
        startDate?: string;
        endDate?: string;
        plan?: string;
    }): Promise<{
        trial: any[];
        live: any[];
        total: number;
    }>;
    getTrialSubscriptions(page: number, limit: number, search: string, status?: 'All' | 'Active' | 'Inactive'): Promise<{
        data: any[];
        total: number;
    }>;
    getLiveSubscriptions(page: number, limit: number, search: string, status?: 'All' | 'Active' | 'Inactive'): Promise<{
        data: any[];
        total: number;
    }>;
    DeleteSubscription(id: number): Promise<void>;
    getAllPaymentModes(): Promise<PaymentMode[]>;
    getAllSubscriptionDetails(page: number, limit: number, search: string, status: 'All' | 'Active' | 'Inactive' | 'Trial' | 'Live'): Promise<{
        subscriptions: any[];
        total: number;
    }>;
    getAllOrganizationsWithPrimaryUsers(page: number, limit: number, search: string, type?: 'all' | 'paid' | 'trial'): Promise<{
        organizations: any[];
        total: number;
    }>;
    exportOrganizations(search: string, type?: 'all' | 'paid' | 'trial'): Promise<any[]>;
    createCustomer(createOrganizationDto: CreateCustomerDto, context: any): Promise<any>;
    updateCustomer(updateDto: any): Promise<any>;
    createOrUpdateOrder(orderDto: CreateOrderDto, context: any): Promise<any>;
    private generateBillingId;
    private generateOrderId;
    findOne(subscriptionId: number): Promise<OrgSubscription>;
    private createOrganizationSchemaAndTables;
    private hashPassword;
    fetchSingleUsersProfile(userId: number): Promise<{
        status: number;
        success: boolean;
        data?: any;
        message?: string;
    }>;
    getOrganizationsForSelect(): Promise<any[]>;
    getAllProducts(): Promise<Product[]>;
    getActivePlansByProduct(productId: number): Promise<{
        id: number;
        name: string;
    }[]>;
    getActiveFeaturesByProduct(productId: number): Promise<{
        id: number;
        name: string;
    }[]>;
    listProducts({ page, limit, search, status, }: {
        page: number;
        limit: number;
        search?: string;
        status?: 'active' | 'inactive';
    }): Promise<{
        data: Product[];
        total: number;
        currentPage: number;
        totalPages: number;
    }>;
    addProduct(dto: CreateProductDto): Promise<Product>;
    getProductById(productId: number): Promise<Product>;
    updateProduct(productId: number, dto: UpdateProductDto): Promise<Product>;
    softDeleteProduct(productId: number): Promise<void>;
    getAllStatus(): Promise<RenewalStatus[]>;
    getDashboardCounts(): Promise<any>;
    toggleLoginRestriction(id: number): Promise<OrgSubscription>;
    listSalesRequests({ page, limit, search, status, }: {
        page: number;
        limit: number;
        search?: string;
        status?: 'open' | 'closed' | 'pending';
    }): Promise<{
        data: ContactSalesRequest[];
        total: number;
        currentPage: number;
        totalPages: number;
    }>;
    getSalesRequestById(id: number): Promise<any>;
    softDeleteSalesRequest(requestId: number): Promise<void>;
    disableOrganization(id: number): Promise<void>;
    toggleLoginRestrictionByOrganization(organizationId: number): Promise<OrgSubscription>;
    updateSalesRequestStatus(id: number, status: 'Converted' | 'Rejected'): Promise<void>;
    createTicket(dto: CreateBillingSupportTicketDto): Promise<void>;
    listTickets({ page, limit, search, status, }: {
        page: number;
        limit: number;
        search?: string;
        status?: SupportTicketStatus | string;
    }): Promise<{
        data: {
            ticketId: number;
            supportTicketId: string;
            name: string;
            email: string;
            subject: string;
            category: string;
            priority: string;
            description: string;
            status: SupportTicketStatus;
            createdAt: Date;
            organizationName: any;
        }[];
        total: number;
        currentPage: number;
        totalPages: number;
    }>;
    getTicketById(id: number): Promise<SupportTicket>;
    softDeleteTicket(ticketId: number): Promise<void>;
    updateTicketStatus(ticketId: number, status: string): Promise<SupportTicket>;
    getSubscriptionDetailsForAsset(organization_profile_id: number): Promise<any>;
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
