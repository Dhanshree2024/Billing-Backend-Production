import { HttpStatus } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { MailConfigService } from 'src/common/mail/mail-config.service';
import { MailService } from 'src/common/mail/mail.service';
import { RegisterOrganization } from 'src/organization_register/entities/register-organization.entity';
import { RegisterUserLogin } from 'src/organization_register/entities/register-user-login.entity';
import { RolesPermission } from 'src/roles_permissions/entities/roles_permission.entity';
import { DataSource, Repository } from 'typeorm';
import { DatabaseService } from '../dynamic-schema/database.service';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateOrganizationalProfileDto } from './dto/create-organizational-profile.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { DeleteDesignationsDto } from './dto/delete-degination-dto';
import { DeleteDepartmentsDto } from './dto/delete-department-dto';
import { CreateDepartmentsDto } from './dto/department.dto';
import { CreateDesignationDto } from './dto/designation.dto';
import { FetchSingleUserDto } from './dto/fetch-single-user.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { EditDepartmentDto } from './dto/update-dept.dto';
import { VendorIdListDto } from './dtos/vendor-id-list.dto';
import { Branch } from './entity/branches.entity';
import { Department } from './entity/department.entity';
import { Designations } from './entity/designations.entity';
import { Locations } from './entity/locations.entity';
import { OrganizationalProfile } from './entity/organizational-profile.entity';
import { User } from './entity/organizational-user.entity';
import { OrganizationVendors } from './entity/organizational-vendors.entity';
import { Roles } from './entity/roles.entity';
import { Pincodes } from './public_schema_entity/pincode.entity';
import { SetupTask } from 'src/onboarding-engine/entities/setup-task.entity';
import { BillingPortalUser } from 'src/organization_register/entities/public_billing_portal_user.entity';
import { PlanServiceMapping } from 'src/services/entity/plan_services_mapping.entity';
import { CreateContactSalesRequestDto } from 'src/subscription_pricing/dto/contact-sales-requests.dto';
import { CreateBillingSupportTicketDto } from 'src/subscription_pricing/dto/create-billing-support-ticket.dto';
import { CreatePaymentDto } from 'src/subscription_pricing/dto/payment.dto';
import { BillingInfo } from 'src/subscription_pricing/entity/billing_info.entity';
import { ContactSalesRequest } from 'src/subscription_pricing/entity/contact_sales_requests.entity';
import { OfflinePaymentRequest } from 'src/subscription_pricing/entity/offline_payment_requests.entity';
import { OrgFeatureOverride } from 'src/subscription_pricing/entity/org_feature_overrides.entity';
import { OrgSubscription } from 'src/subscription_pricing/entity/org_subscription.entity';
import { PaymentMode } from 'src/subscription_pricing/entity/payment_mode.entity';
import { PaymentTransaction } from 'src/subscription_pricing/entity/payment_transaction.entity';
import { PlanFeatureMapping } from 'src/subscription_pricing/entity/plan-feature-mapping.entity';
import { Plan } from 'src/subscription_pricing/entity/plan.entity';
import { SupportTicket } from 'src/subscription_pricing/entity/support.entity';
import { OrganizationInformation } from './public_schema_entity/organization-information.entity';
export declare class OrganizationService {
    private readonly dataSource;
    private readonly databaseService;
    private readonly mailService;
    private readonly mailConfigService;
    private readonly authService;
    private readonly userRepository;
    private readonly registerUser;
    private readonly registerOrganization;
    private readonly billinguserRepo;
    private readonly vendorRepository;
    private readonly branchRepository;
    private readonly departmentRepository;
    private readonly roleRepository;
    private readonly rolesPermissionRepository;
    private readonly designationsRepository;
    private readonly locationRepository;
    private readonly pincodesRepository;
    private readonly planRepository;
    private readonly subscriptionRepository;
    private readonly planFeatureMappingRepository;
    private readonly paymentModeRepository;
    private billingInfoRepository;
    private offlinePaymentRepo;
    private paymentTransactionRepository;
    private orgFeatureOverrideRepository;
    private contactSalesRepo;
    private serviceMappingRepo;
    private readonly supportTicketRepo;
    private readonly setupTaskRepository;
    private readonly organizationRepository;
    constructor(dataSource: DataSource, databaseService: DatabaseService, mailService: MailService, mailConfigService: MailConfigService, authService: AuthService, userRepository: Repository<User>, registerUser: Repository<RegisterUserLogin>, registerOrganization: Repository<RegisterOrganization>, billinguserRepo: Repository<BillingPortalUser>, vendorRepository: Repository<OrganizationVendors>, branchRepository: Repository<Branch>, departmentRepository: Repository<Department>, roleRepository: Repository<Roles>, rolesPermissionRepository: Repository<RolesPermission>, designationsRepository: Repository<Designations>, locationRepository: Repository<Locations>, pincodesRepository: Repository<Pincodes>, planRepository: Repository<Plan>, subscriptionRepository: Repository<OrgSubscription>, planFeatureMappingRepository: Repository<PlanFeatureMapping>, paymentModeRepository: Repository<PaymentMode>, billingInfoRepository: Repository<BillingInfo>, offlinePaymentRepo: Repository<OfflinePaymentRequest>, paymentTransactionRepository: Repository<PaymentTransaction>, orgFeatureOverrideRepository: Repository<OrgFeatureOverride>, contactSalesRepo: Repository<ContactSalesRequest>, serviceMappingRepo: Repository<PlanServiceMapping>, supportTicketRepo: Repository<SupportTicket>, setupTaskRepository: Repository<SetupTask>, organizationRepository: Repository<OrganizationInformation>);
    getUserDropdown(): Promise<{
        label: string;
        value: number;
    }[]>;
    getCounts(): Promise<any>;
    updateOrgainzationProfileValues(dto: UpdateOrganizationalProfileDto, organization_Id: number): Promise<{
        message: string;
        organization: OrganizationalProfile;
    }>;
    fetchIndustryTypes(): Promise<any>;
    getPlanWithFeaturesById(planId: number): Promise<any>;
    getPlansWithFeaturesByProducts(productId: number): Promise<any[]>;
    getAllPlansWithFeatures(): Promise<any[]>;
    getPlansWithFeaturesByProduct(productId: number): Promise<any[]>;
    fetchDesignationsconfig(): Promise<any>;
    createDesignations(CreateDesignationDto: CreateDesignationDto): Promise<any>;
    editDesignation(designationId: number, newName: string, newDescription: string, departmentId: number): Promise<any>;
    deleteDepartments(deleteDepartmentsDto: DeleteDepartmentsDto): Promise<{
        status: HttpStatus;
        message: string;
    }>;
    deleteDesignation(deleteDesignationDto: DeleteDesignationsDto): Promise<{
        status: HttpStatus;
        message: string;
    }>;
    fetchOrganizationDeparments(searchQuery?: string): Promise<any>;
    fetchOrganizationBranches1(): Promise<any>;
    fetchOrganizationBranches(): Promise<any>;
    fetchOrganizationUsers1(page: number, limit: number, searchQuery: string): Promise<any>;
    getFilterableUserColumns(): {
        key: string;
        label: string;
        type: string;
        mandatory: boolean;
    }[];
    getDepartmentDropdown(): Promise<{
        label: string;
        value: number;
    }[]>;
    getBranchDropdown(): Promise<{
        label: string;
        value: number;
    }[]>;
    exportUserCSV(): Promise<{
        decodedResults: {
            department_name: string;
            designation_name: string;
            role_name: string;
            user_id: number;
            first_name: string;
            last_name: string;
            users_business_email: string;
            phone_number: string;
            password: string;
            organization_id: number;
            organization: OrganizationalProfile;
            createdDepartments: Department[];
            headDepartments: Department[];
            is_primary_user: string;
            middle_name: string;
            user_alternative_contact_number: string;
            street: string;
            landmark: string;
            city: string;
            state: string;
            zip: string;
            country: string;
            branches: number[];
            created_by: number;
            added_by_user: BillingPortalUser;
            register_user_login_id: number;
            billingUser: BillingPortalUser;
            is_active: number;
            is_deleted: number;
            branchAsPrimary: Branch;
            created_at: Date;
            updated_at: Date;
            last_login: Date;
            role_id: number;
            department_id: number;
            designation_id: number;
            profile_image: string;
            user_role: Roles;
            user_designation: Designations;
            user_department: Department;
            is_department_head: boolean;
        }[];
    }>;
    fetchOrganizationDesignation(searchQuery?: string): Promise<any>;
    generateUserTemplate1(): Promise<any>;
    createNewPrimaryBranchUser(dto: CreateUserDto, organization_Id: number): Promise<number>;
    exportVendorCSV(): Promise<{
        'Vendor Name': string;
        'GST No.': string;
        Street: string;
        Landmark: string;
        City: string;
        State: string;
        Country: string;
        Pincode: string;
        'Contact Number': string;
        Email: string;
        'Primary Contact Person': String;
        'Alternative Contact': string;
        'Created By': string;
        'Created At': string;
        'Updated At': string;
    }[]>;
    private sendUserInvitationMail;
    fetchAllBranchusers(branch_id?: number, department_id?: number): Promise<any>;
    fetchAllUsers(branch_id?: number, department_id?: number): Promise<any>;
    getFilterableVendorColumns(): {
        key: string;
        label: string;
        type: string;
        mandatory: boolean;
    }[];
    getAllorganizationVenders(): Promise<any>;
    fetchSingleVendorsData(vendor_id: number): Promise<{
        status: number;
        message: string;
        data: OrganizationVendors;
        error?: undefined;
    } | {
        status: number;
        message: string;
        error: any;
        data?: undefined;
    }>;
    deleteUserManagementData(userIds: number[]): Promise<{
        status: HttpStatus;
        message: string;
        data: {
            deleted: any[];
            failed: any[];
        };
    }>;
    deleteVendorData(deleteVendorDto: any): Promise<{
        status: HttpStatus;
        message: string;
        data: {
            deleted: any[];
            failed: any[];
        };
    }>;
    getUserByPublicID(public_user_id: number): Promise<number>;
    fetchDepartments1(page: number, limit: number, searchQuery: string): Promise<any>;
    fetchOrganizationRoles(): Promise<any>;
    createDepartments(createDepartmentsDto: CreateDepartmentsDto): Promise<any>;
    editDepartment(id: number, dto: EditDepartmentDto): Promise<any>;
    fetchDepartmentconfig(page: number, limit: number, searchQuery: string): Promise<any>;
    fetchDepartments(page: number, limit: number, searchQuery: string): Promise<any>;
    generateUserTemplate(): Promise<any>;
    findByPincode(pincode: string): Promise<{
        success: boolean;
        message: string;
        city?: undefined;
        state?: undefined;
        latitude?: undefined;
        longitude?: undefined;
    } | {
        success: boolean;
        city: string;
        state: string;
        latitude: number;
        longitude: number;
        message?: undefined;
    }>;
    createBranch1(createBranchInfo: CreateBranchDto): Promise<any>;
    getLogoAsBase64(logoPath: string): string | null;
    fetchOrganizationalProfile(): Promise<any>;
    getBranchById(branch_id: number): Promise<{
        branch_id: number;
        branch_name: string;
        contact_number: string;
        alternative_contact_number: string;
        gstNo: string;
        established_date: Date;
        branch_email: string;
        address: {
            branch_street: string;
            branch_landmark: string;
            city: string;
            state: string;
            pincode: number;
            country: string;
        };
        primary_user_id: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateBranch(updateBranchInfo: Partial<UpdateBranchDto>): Promise<Branch>;
    deleteBranchById(payload: any): Promise<{
        success: boolean;
        message: string;
    }>;
    fetchOrganizationVendors(): Promise<any>;
    fetchOrganizationVendors1(payload: {
        gststatus?: string;
        status?: string;
        page?: number;
        limit?: number;
        search?: string;
        sortField?: string;
        sortOrder?: 'ASC' | 'DESC';
    }): Promise<any>;
    createNewVendor(payload: any, userId: number): Promise<{
        status: HttpStatus;
        message: string;
        data: OrganizationVendors;
    }>;
    updateVendorData(updatePayload: any): Promise<{
        status: HttpStatus;
        message: string;
        data: OrganizationVendors;
    }>;
    activateVendors(dto: VendorIdListDto): Promise<{
        status: string;
        message: string;
        data: {
            updated: any[];
            failed: any[];
        };
    }>;
    deactivateVendors(dto: VendorIdListDto): Promise<{
        status: string;
        message: string;
        data: {
            updated: any[];
            failed: any[];
        };
    }>;
    generateVendorTemplate(): Promise<any>;
    bulkCreateVendors(dtos: any[], user_id: number): Promise<{
        status: HttpStatus;
        message: string;
        data: {
            created_count: number;
            created_vendors: any[];
            error_vendors: any[];
        };
    }>;
    exportOrganizationVendorsExcel(payload: {
        gststatus?: string;
        status?: string;
        search?: string;
        sortField?: string;
        sortOrder?: 'ASC' | 'DESC';
        selectedIds?: number[];
    }): Promise<Buffer>;
    getAllAssetsLocations(payload: {
        status?: string;
        page?: number;
        limit?: number;
        search?: string;
        sortField?: string;
        sortOrder?: 'ASC' | 'DESC';
    }): Promise<any>;
    exportLocationsExcel(payload: {
        status?: string;
        search?: string;
        sortField?: string;
        sortOrder?: 'ASC' | 'DESC';
        selectedIds?: number[];
    }): Promise<Buffer>;
    addNewLocation(payload: any, userId: number): Promise<{
        status: HttpStatus;
        message: string;
        data: Locations;
    }>;
    getLocationById(location_id: number): Promise<{
        status: HttpStatus;
        message: string;
        data: Locations;
    }>;
    deleteLocationsById(ids: number[] | number, userId: number): Promise<{
        message: string;
        deletedIds: number[];
    }>;
    updateLocation(payloadWithId: any, userId: number): Promise<{
        status: HttpStatus;
        message: string;
        data: Locations;
    }>;
    activateLocations(dto: {
        location_ids: number[];
    }): Promise<{
        status: string;
        message: string;
        data: {
            updated: any[];
            failed: any[];
        };
    }>;
    deactivateLocations(dto: {
        location_ids: number[];
    }): Promise<{
        status: string;
        message: string;
        data: {
            updated: any[];
            failed: any[];
        };
    }>;
    fetchOrganizationUsers(payload: {
        page?: number;
        limit?: number;
        search?: string;
        sortField?: string;
        sortOrder?: 'ASC' | 'DESC';
        customFilters?: Record<string, string[]>;
    }): Promise<any>;
    fetchSingleUsersData(user_id: number): Promise<{
        status: number;
        message: string;
        data: {
            branches: {
                branch_id: number;
                branch_name: string;
            }[];
            permissions: string[];
            user_id: number;
            first_name: string;
            last_name: string;
            users_business_email: string;
            phone_number: string;
            password: string;
            organization_id: number;
            organization: OrganizationalProfile;
            createdDepartments: Department[];
            headDepartments: Department[];
            is_primary_user: string;
            middle_name: string;
            user_alternative_contact_number: string;
            street: string;
            landmark: string;
            city: string;
            state: string;
            zip: string;
            country: string;
            created_by: number;
            added_by_user: BillingPortalUser;
            register_user_login_id: number;
            billingUser: BillingPortalUser;
            is_active: number;
            is_deleted: number;
            branchAsPrimary: Branch;
            created_at: Date;
            updated_at: Date;
            last_login: Date;
            role_id: number;
            department_id: number;
            designation_id: number;
            profile_image: string;
            user_role: Roles;
            user_designation: Designations;
            user_department: Department;
            is_department_head: boolean;
        };
        error?: undefined;
    } | {
        status: number;
        message: string;
        error: any;
        data?: undefined;
    }>;
    fetchSingleUsersDataOLD(fetchSingleUserDto: FetchSingleUserDto): Promise<{
        status: number;
        message: string;
        data: {
            usersData: User;
        };
        error?: undefined;
    } | {
        status: number;
        message: string;
        error: any;
        data?: undefined;
    }>;
    createNewUser(payload: any, organization_Id: number, decrypted_system_user_id: number): Promise<{
        status: HttpStatus;
        message: string;
        data: {
            billingUser: BillingPortalUser;
            user: User;
        };
    }>;
    updateUserManagementData(payload: any): Promise<{
        status: HttpStatus;
        message: string;
        data: {
            user: User;
            userLogin: BillingPortalUser;
        };
    }>;
    activateUsers(userIds: number[], systemUserId: number): Promise<{
        status: string;
        message: string;
        data: {
            updated: any[];
            failed: any[];
        };
    }>;
    deactivateUsers(userIds: number[], systemUserId: number): Promise<{
        status: string;
        message: string;
        data: {
            updated: any[];
            failed: any[];
        };
    }>;
    exportFilteredExcelForUsers(payload: {
        search?: string;
        sortField?: string;
        sortOrder?: 'ASC' | 'DESC';
        customFilters?: Record<string, string[]>;
        selectedIds?: number[];
    }): Promise<Buffer>;
    sendResetPasswordEmailByAdmin(userId: number, decrypted_system_user_id: number): Promise<{
        status: HttpStatus;
        message: string;
    }>;
    getSubscriptionDetailsByOrganizationAsset(organization_profile_id: number): Promise<any>;
    getAllPaymentModes(): Promise<PaymentMode[]>;
    createOfflinePaymentRequest(userId: number): Promise<OfflinePaymentRequest>;
    createPayment(payload: CreatePaymentDto): Promise<{
        billingInfo: BillingInfo;
        paymentTransaction: PaymentTransaction;
    }>;
    getAllUsers(page?: number, limit?: number, search?: string, status?: string): Promise<any>;
    getAllUsersWithOrganization(page: number, limit: number, search: string, status: 'All' | 'Active' | 'Inactive'): Promise<any>;
    getOrgLimitations(orgId: number): Promise<any[]>;
    initializeOrgSetupProgress(organizationId: number): Promise<any[]>;
    getAssetRestrictions(orgId: number): Promise<any[]>;
    getRestrictionByFeatureId(orgId: number, featureId: number): Promise<any>;
    updateUsageCount(orgId: number, featureId: number, currentValue: string): Promise<{
        orgId: number;
        featureId: number;
        currentUsage: string;
        updatedAt: Date;
    }>;
    sendEnquiryMail(dto: CreateContactSalesRequestDto): Promise<{
        sent: boolean;
    }>;
    createContactSalesRequest(createDto: CreateContactSalesRequestDto): Promise<ContactSalesRequest>;
    createTicket(dto: CreateBillingSupportTicketDto): Promise<void>;
    getOrganizationDetails(): Promise<OrganizationInformation>;
}
