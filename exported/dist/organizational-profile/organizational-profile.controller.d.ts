import { HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateBillingSupportTicketDto } from 'src/subscription_pricing/dto/create-billing-support-ticket.dto';
import { CreatePaymentDto } from 'src/subscription_pricing/dto/payment.dto';
import { DeleteDesignationsDto } from './dto/delete-degination-dto';
import { DeleteDepartmentsDto } from './dto/delete-department-dto';
import { CreateDepartmentsDto } from './dto/department.dto';
import { CreateDesignationDto } from './dto/designation.dto';
import { EditDepartmentDto } from './dto/update-dept.dto';
import { OrganizationService } from './organizational-profile.service';
import { CreateContactSalesRequestDto } from 'src/subscription_pricing/dto/contact-sales-requests.dto';
import { GetBranchByIdDto } from './dtos/get-branch-by-id.dto';
import { VendorIdListDto } from './dtos/vendor-id-list.dto';
export declare class OrganizationalProfileController {
    private readonly organizationService;
    constructor(organizationService: OrganizationService);
    downloadVendorTemplate(req: Request, res: Response): Promise<void>;
    generateUserTemplate(req: Request, res: Response): Promise<void>;
    fetchOrganizationDesignation(page: number, limit: number, searchQuery: string, req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    getIndustryTypeValues(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    getjs(): Promise<void>;
    getPlanWithFeaturesById(id: number, res: Response): Promise<Response<any, Record<string, any>>>;
    getAllPlansWithFeatures(res: Response): Promise<Response<any, Record<string, any>>>;
    getPlansWithFeaturesByProducts(productId: number, res: Response): Promise<Response<any, Record<string, any>>>;
    getPlansWithFeaturesByProduct(productId: number, res: Response): Promise<Response<any, Record<string, any>>>;
    getDepartmentConfigValues(req: Request, res: Response, page?: number, limit?: number, searchQuery?: string): Promise<Response<any, Record<string, any>>>;
    getDepartmentsWithPagination(req: Request, res: Response, page?: number, limit?: number, searchQuery?: string): Promise<Response<any, Record<string, any>>>;
    getDesignationsWithPagination(req: Request, res: Response, searchQuery?: string): Promise<Response<any, Record<string, any>>>;
    getDesignationsConfigValues(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    setDepartmentValues(createDepartmentsDto: CreateDepartmentsDto): Promise<any>;
    editDepartment(id: string, editDto: EditDepartmentDto): Promise<any>;
    setDesignationsValues(CreateDesignationDto: CreateDesignationDto): Promise<any>;
    editDesignation(designationId: number, designationName: string, desg_description: string, departmentId: number): Promise<any>;
    removeDepartmentValues(deleteDepartmentsDto: DeleteDepartmentsDto): Promise<{
        status: HttpStatus;
        message: string;
    }>;
    removeDesignationValue(deleteDesignationDto: DeleteDesignationsDto): Promise<{
        status: HttpStatus;
        message: string;
    }>;
    fetchOrganizationDeparments(searchQuery: string, req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    getDepartmentDropdown(): Promise<{
        label: string;
        value: number;
    }[]>;
    getBranchDropdown(): Promise<{
        label: string;
        value: number;
    }[]>;
    getFilterableItemColumns(): {
        success: boolean;
        data: {
            key: string;
            label: string;
            type: string;
            mandatory: boolean;
        }[];
    };
    getCategoryDropdown(): Promise<{
        success: boolean;
        data: {
            label: string;
            value: number;
        }[];
    }>;
    exportUsersCSV(): Promise<{
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
            organization: import("./entity/organizational-profile.entity").OrganizationalProfile;
            createdDepartments: import("./entity/department.entity").Department[];
            headDepartments: import("./entity/department.entity").Department[];
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
            added_by_user: import("../organization_register/entities/public_billing_portal_user.entity").BillingPortalUser;
            register_user_login_id: number;
            billingUser: import("../organization_register/entities/public_billing_portal_user.entity").BillingPortalUser;
            is_active: number;
            is_deleted: number;
            branchAsPrimary: import("./entity/branches.entity").Branch;
            created_at: Date;
            updated_at: Date;
            last_login: Date;
            role_id: number;
            department_id: number;
            designation_id: number;
            profile_image: string;
            user_role: import("./entity/roles.entity").Roles;
            user_designation: import("./entity/designations.entity").Designations;
            user_department: import("./entity/department.entity").Department;
            is_department_head: boolean;
        }[];
    }>;
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
    getAllorganizationVenders(): Promise<any>;
    fetchAllBranchusers(branch_id: number, department_id?: number): Promise<any>;
    fetchOrganizationBranches(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    getOrganizationalProfile(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    createBranch1(body: any, req: any): Promise<{
        message: string;
        branch_id: any;
    }>;
    updateBranch(body: any, req: any): Promise<{
        message: string;
        branch_id: number;
        primary_user_id: number;
        updatedBranch: import("./entity/branches.entity").Branch;
        updatedUser: {
            status: HttpStatus;
            message: string;
            data: {
                user: import("./entity/organizational-user.entity").User;
                userLogin: import("../organization_register/entities/public_billing_portal_user.entity").BillingPortalUser;
            };
        };
    } | {
        message: string;
        branch_id: number;
        updatedBranch: import("./entity/branches.entity").Branch;
        primary_user_id?: undefined;
        updatedUser?: undefined;
    }>;
    updateOrgainzationProfileValues(logoFile: Express.Multer.File, payload: any, req: any): Promise<{
        statusCode: number;
        message: string;
        data: {
            message: string;
            organization: import("./entity/organizational-profile.entity").OrganizationalProfile;
        };
    }>;
    getBranchById(body: GetBranchByIdDto): Promise<{
        success: boolean;
        message: string;
        data: {
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
        };
    }>;
    deleteBranchById(payload: any): Promise<{
        success: boolean;
        message: string;
    }>;
    getCounts(): Promise<any>;
    fetchSingleVendorsData(body: {
        vendor_id: number;
    }, res: Response): Promise<Response<any, Record<string, any>>>;
    fetchOrganizationVendors(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    fetchOrganizationVendors1(body: {
        gststatus?: string;
        status?: string;
        page?: number;
        limit?: number;
        search?: string;
    }, req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    createNewVendor(createvendorpayload: any, req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    updateVendorData(updatepayload: any, req: any, res: any): Promise<any>;
    deleteVendorData(body: {
        vendor_ids: number[];
    }, req: any, res: any): Promise<any>;
    activateVendors(dto: VendorIdListDto, res: Response): Promise<Response<any, Record<string, any>>>;
    deactivateVendors(dto: VendorIdListDto, res: Response): Promise<Response<any, Record<string, any>>>;
    bulkCreateVendors(dtos: any[], req: any): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: {
            created_count: number;
            created_vendors: any[];
            error_vendors: any[];
        };
    } | {
        statusCode: number;
        message: string;
        data: any;
    }>;
    exportOrganizationVendorsExcel(res: Response, body: {
        gststatus?: string;
        status?: string;
        search?: string;
        sortField?: string;
        sortOrder?: 'ASC' | 'DESC';
        selectedIds?: number[];
    }): Promise<void>;
    getAllOrganiationLocation(body: {
        status?: string;
        page?: number;
        limit?: number;
        search?: string;
    }, req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    exportLocationsExcel(res: Response, body: {
        status?: 'active' | 'inactive';
        search?: string;
        sortField?: string;
        sortOrder?: 'ASC' | 'DESC';
        selectedIds?: number[];
    }): Promise<void>;
    getLocationById(body: {
        location_id: number;
    }, req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    deleteLocations(body: {
        location_id: number[] | number;
    }, req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    addNewLocation(createnewlocationpayload: any, req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    updateLocation(body: any, req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    activateLocations(body: {
        location_ids: number[];
    }, res: Response): Promise<Response<any, Record<string, any>>>;
    deactivateLocations(body: {
        location_ids: number[];
    }, res: Response): Promise<Response<any, Record<string, any>>>;
    fetchOrganizationUsers(page?: number, limit?: number, search?: string, sortField?: string, sortOrder?: string, customFiltersStr?: string): Promise<{
        success: boolean;
        message: any;
        data: any;
        meta: any;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        data?: undefined;
        meta?: undefined;
    }>;
    fetchSingleUsersData(body: {
        user_id: number;
    }, res: Response): Promise<Response<any, Record<string, any>>>;
    createNewUser(payload: any, req: any): Promise<{
        status: HttpStatus;
        message: string;
        data: {
            billingUser: import("../organization_register/entities/public_billing_portal_user.entity").BillingPortalUser;
            user: import("./entity/organizational-user.entity").User;
        };
    } | {
        status: number;
        message: string;
    }>;
    updateUserManagementData(payload: any, req: any, res: any): Promise<any>;
    activateUsers(body: {
        userIds: number[];
    }, res: Response, req: any): Promise<Response<any, Record<string, any>> | {
        status: number;
        message: string;
    }>;
    deactivateUsers(body: {
        userIds: number[];
    }, res: Response, req: any): Promise<Response<any, Record<string, any>> | {
        status: number;
        message: string;
    }>;
    deleteUserManagementData(body: {
        userIds: number[] | number;
    }, req: any, res: any): Promise<any>;
    exportUsersToExcel(res: Response, body: {
        search?: string;
        sortField?: string;
        sortOrder?: 'ASC' | 'DESC';
        customFilters?: Record<string, any>;
        selectedIds?: number[];
    }): Promise<void>;
    resetPasswordByAdmin(userId: number, req: any): Promise<{
        status: HttpStatus;
        message: string;
    }>;
    getByPincode(pincode: string): Promise<{
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
    getAssetOrgSubscriptionDetails(body: {
        userId: number;
        orgId: number;
    }, res: Response): Promise<Response<any, Record<string, any>>>;
    getAllPaymentModes(res: Response): Promise<Response<any, Record<string, any>>>;
    createOfflinePaymentRequest(req: Request, res: Response, body: any): Promise<Response<any, Record<string, any>>>;
    createPayment(payload: CreatePaymentDto, res: Response, req: any): Promise<Response<any, Record<string, any>>>;
    getOrganizationUsers(res: Response, page?: number, limit?: number, search?: string, status?: string): Promise<Response<any, Record<string, any>>>;
    getAllUsersWithOrganization(page?: number, limit?: number, search?: string, status?: 'All' | 'Active' | 'Inactive'): Promise<any>;
    getAssetOrgLimitations(body: {
        userId: number;
        orgId: number;
    }, res: Response): Promise<Response<any, Record<string, any>>>;
    initializeOrgSetupProgress(body: {
        orgId: number;
    }, res: Response): Promise<Response<any, Record<string, any>>>;
    getAssetRestrictions(body: {
        userId: number;
        orgId: number;
    }, res: Response): Promise<Response<any, Record<string, any>>>;
    checkAssetRestriction(body: {
        orgId: number;
        featureId: number;
    }, res: Response): Promise<Response<any, Record<string, any>>>;
    updateUsageCount(body: {
        orgId: number;
        featureId: number;
        currentValue: string;
    }): Promise<{
        success: boolean;
        message: string;
        result: {
            orgId: number;
            featureId: number;
            currentUsage: string;
            updatedAt: Date;
        };
    }>;
    sendEnquiryMail(createContactSalesRequestDto: CreateContactSalesRequestDto): Promise<{
        success: boolean;
        message: string;
        data: {
            sent: boolean;
        };
    }>;
    convertEnquiry(data: string, res: Response): Promise<void>;
    submitContactSalesRequest(createContactSalesRequestDto: CreateContactSalesRequestDto): Promise<{
        success: boolean;
        message: string;
        data: import("../subscription_pricing/entity/contact_sales_requests.entity").ContactSalesRequest;
    }>;
    createTicket(dto: CreateBillingSupportTicketDto, res: Response): Promise<Response<any, Record<string, any>>>;
    getOrganizationDetails(): Promise<{
        success: boolean;
        message: string;
        data: import("./public_schema_entity/organization-information.entity").OrganizationInformation;
    }>;
}
