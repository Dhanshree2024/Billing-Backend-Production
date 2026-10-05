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
exports.OrganizationalProfileController = void 0;
const common_1 = require("@nestjs/common");
const crypto_utils_1 = require("../common/encryption_decryption/crypto-utils");
const create_billing_support_ticket_dto_1 = require("../subscription_pricing/dto/create-billing-support-ticket.dto");
const payment_dto_1 = require("../subscription_pricing/dto/payment.dto");
const api_key_guard_1 = require("../auth/api-key.guard");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const delete_degination_dto_1 = require("./dto/delete-degination-dto");
const delete_department_dto_1 = require("./dto/delete-department-dto");
const department_dto_1 = require("./dto/department.dto");
const designation_dto_1 = require("./dto/designation.dto");
const update_dept_dto_1 = require("./dto/update-dept.dto");
const organizational_profile_service_1 = require("./organizational-profile.service");
const contact_sales_requests_dto_1 = require("../subscription_pricing/dto/contact-sales-requests.dto");
const platform_express_1 = require("@nestjs/platform-express");
const fs_1 = require("fs");
const multer_1 = require("multer");
const path_1 = require("path");
const get_branch_by_id_dto_1 = require("./dtos/get-branch-by-id.dto");
const vendor_id_list_dto_1 = require("./dtos/vendor-id-list.dto");
let OrganizationalProfileController = class OrganizationalProfileController {
    constructor(organizationService) {
        this.organizationService = organizationService;
    }
    async downloadVendorTemplate(req, res) {
        try {
            const buffer = await this.organizationService.generateVendorTemplate();
            res.setHeader('Content-Disposition', 'attachment; filename=vendor_template.xlsx');
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            res.send(buffer);
        }
        catch (error) {
            console.error('Error generating vendor template:', error);
            res.status(500).send('Failed to generate Excel template');
        }
    }
    async generateUserTemplate(req, res) {
        try {
            const buffer = await this.organizationService.generateUserTemplate();
            res.setHeader('Content-Disposition', 'attachment; filename=user_template.xlsx');
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            res.send(buffer);
        }
        catch (error) {
            console.error('Error generating vendor template:', error);
            res.status(500).send('Failed to generate Excel template');
        }
    }
    async fetchOrganizationDesignation(page = 1, limit = 10, searchQuery = '', req, res) {
        try {
            const result = await this.organizationService.fetchOrganizationDesignation();
            return res.status(200).json({
                result,
            });
        }
        catch (error) {
            return res.status(error.status || 500).json({
                statusCode: error.status || 500,
                message: error.message || 'Internal server error.',
            });
        }
    }
    async getIndustryTypeValues(req, res) {
        try {
            const result = await this.organizationService.fetchIndustryTypes();
            return res.status(200).json({
                result,
            });
        }
        catch (error) {
            return res.status(error.status || 500).json({
                statusCode: error.status || 500,
                message: error.message || 'Internal server error.',
            });
        }
    }
    async getjs() {
        console.log('d0');
    }
    async getPlanWithFeaturesById(id, res) {
        try {
            console.log('Plan ID:', id);
            const data = await this.organizationService.getPlanWithFeaturesById(id);
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
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: error.message || 'Failed to fetch plan with features',
            });
        }
    }
    async getAllPlansWithFeatures(res) {
        try {
            const data = await this.organizationService.getAllPlansWithFeatures();
            return res.status(common_1.HttpStatus.OK).json({
                success: true,
                message: 'Fetched all plans with their features successfully',
                data,
            });
        }
        catch (error) {
            console.error('Error fetching plans with features:', error);
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: error.message || 'Failed to fetch plans with features',
            });
        }
    }
    async getPlansWithFeaturesByProducts(productId, res) {
        try {
            const data = await this.organizationService.getPlansWithFeaturesByProducts(productId);
            return res.status(common_1.HttpStatus.OK).json({
                success: true,
                message: 'Fetched plans with features for the product successfully',
                data,
            });
        }
        catch (error) {
            console.error('Error fetching plans with features by product:', error);
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: error.message || 'Failed to fetch plans with features by product',
            });
        }
    }
    async getPlansWithFeaturesByProduct(productId, res) {
        try {
            if (!productId) {
                return res.status(common_1.HttpStatus.BAD_REQUEST).json({
                    success: false,
                    message: 'Product ID is required',
                });
            }
            const data = await this.organizationService.getPlansWithFeaturesByProduct(productId);
            return res.status(common_1.HttpStatus.OK).json({
                success: true,
                message: 'Fetched all plans with their features for the product successfully',
                data,
            });
        }
        catch (error) {
            console.error('Error fetching plans with features by product:', error);
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: error.message || 'Failed to fetch plans with features by product',
            });
        }
    }
    async getDepartmentConfigValues(req, res, page = 1, limit = 10, searchQuery = '') {
        try {
            const result = await this.organizationService.fetchDepartmentconfig(page, limit, searchQuery);
            return res.status(200).json({ result });
        }
        catch (error) {
            return res.status(error.status || 500).json({
                statusCode: error.status || 500,
                message: error.message || 'Internal server error.',
            });
        }
    }
    async getDepartmentsWithPagination(req, res, page = 1, limit = 10, searchQuery = '') {
        try {
            const result = await this.organizationService.fetchDepartments(page, limit, searchQuery);
            return res.status(200).json({ result });
        }
        catch (error) {
            return res.status(error.status || 500).json({
                statusCode: error.status || 500,
                message: error.message || 'Internal server error.',
            });
        }
    }
    async getDesignationsWithPagination(req, res, searchQuery = '') {
        try {
            const result = await this.organizationService.fetchOrganizationDesignation(searchQuery);
            return res.status(200).json({ result });
        }
        catch (error) {
            return res.status(error.status || 500).json({
                statusCode: error.status || 500,
                message: error.message || 'Internal server error.',
            });
        }
    }
    async getDesignationsConfigValues(req, res) {
        try {
            const result = await this.organizationService.fetchDesignationsconfig();
            return res.status(200).json({
                result,
            });
        }
        catch (error) {
            return res.status(error.status || 500).json({
                statusCode: error.status || 500,
                message: error.message || 'Internal server error.',
            });
        }
    }
    async setDepartmentValues(createDepartmentsDto) {
        try {
            return this.organizationService.createDepartments(createDepartmentsDto);
        }
        catch (error) {
            console.log(error);
        }
    }
    async editDepartment(id, editDto) {
        try {
            return this.organizationService.editDepartment(+id, editDto);
        }
        catch (error) {
            console.error(error);
            throw new common_1.BadRequestException('Failed to edit department');
        }
    }
    async setDesignationsValues(CreateDesignationDto) {
        try {
            return this.organizationService.createDesignations(CreateDesignationDto);
        }
        catch (error) {
            console.log(error);
        }
    }
    async editDesignation(designationId, designationName, desg_description, departmentId) {
        try {
            return await this.organizationService.editDesignation(designationId, designationName, desg_description, departmentId);
        }
        catch (error) {
            console.log(error);
            throw new common_1.BadRequestException('Failed to edit designation.');
        }
    }
    async removeDepartmentValues(deleteDepartmentsDto) {
        return await this.organizationService.deleteDepartments(deleteDepartmentsDto);
    }
    async removeDesignationValue(deleteDesignationDto) {
        return await this.organizationService.deleteDesignation(deleteDesignationDto);
    }
    async fetchOrganizationDeparments(searchQuery = '', req, res) {
        try {
            const result = await this.organizationService.fetchOrganizationDeparments();
            return res.status(200).json({
                result,
            });
        }
        catch (error) {
            return res.status(error.status || 500).json({
                statusCode: error.status || 500,
                message: error.message || 'Internal server error.',
            });
        }
    }
    async getDepartmentDropdown() {
        return await this.organizationService.getDepartmentDropdown();
    }
    async getBranchDropdown() {
        return await this.organizationService.getBranchDropdown();
    }
    getFilterableItemColumns() {
        return {
            success: true,
            data: this.organizationService.getFilterableUserColumns(),
        };
    }
    async getCategoryDropdown() {
        const data = await this.organizationService.getUserDropdown();
        return {
            success: true,
            data,
        };
    }
    async exportUsersCSV() {
        return this.organizationService.exportUserCSV();
    }
    async exportVendorCSV() {
        return this.organizationService.exportVendorCSV();
    }
    async getAllorganizationVenders() {
        try {
            return this.organizationService.getAllorganizationVenders();
        }
        catch (error) {
            return false;
        }
    }
    async fetchAllBranchusers(branch_id, department_id) {
        try {
            return await this.organizationService.fetchAllBranchusers(branch_id, department_id);
        }
        catch (error) {
            return false;
        }
    }
    async fetchOrganizationBranches(req, res) {
        try {
            const result = await this.organizationService.fetchOrganizationBranches();
            return res.status(200).json(result);
        }
        catch (error) {
            return res.status(error.status || 500).json({
                status: 'error',
                message: error.message || 'Internal server error.',
            });
        }
    }
    async getOrganizationalProfile(req, res) {
        try {
            console.log("abcd");
            const result = await this.organizationService.fetchOrganizationalProfile();
            console.log("result", result);
            return res.status(200).json(result);
        }
        catch (error) {
            return res.status(error.status || 500).json({
                statusCode: error.status || 500,
                message: error.message || 'Internal server error.',
            });
        }
    }
    async createBranch1(body, req) {
        console.log("body :- ", body);
        const createBranchDto = {
            branch_name: body.branch_name || "",
            gstNo: body.gstNo || "",
            contact_number: body.contact_number || "",
            alternative_contact_number: body.alternative_contact_number || "",
            branch_email: body.branch_email || "",
            established_date: body.established_date ?? null,
            branch_street: body.branch_street || "",
            branch_landmark: body.branch_landmark || "",
            city: body.city || "",
            state: body.state || "",
            country: body.country || "",
            pincode: body.pincode || "",
            city_id: body.city_id ?? null,
            country_id: body.country_id ?? null,
            location_id: body.location_id ?? null,
            primary_user_id: body.primary_user_id ?? null,
            created_by: body.created_by ?? null,
            is_active: body.is_active ?? false,
            is_deleted: body.is_deleted ?? false,
            primaryUser: body.primaryUser ?? undefined,
        };
        console.log("createBranchDto", createBranchDto);
        const organizationID = (0, crypto_utils_1.decrypt)(req.cookies.organization_id);
        const system_user_id = (0, crypto_utils_1.decrypt)(req.cookies.system_user_id);
        const decrypted_system_user_id = Number(organizationID);
        if (!organizationID) {
            throw new Error('Organization ID not found in cookies');
        }
        const organization_Id = Number(organizationID);
        if (isNaN(organization_Id)) {
            throw new Error('Invalid decrypted organization ID');
        }
        const branch = await this.organizationService.createBranch1(createBranchDto);
        const branch_id = branch.branchId;
        console.log('branch', branch);
        if (createBranchDto.primary_user_id) {
            return {
                message: 'Branch created with existing primary user',
                branch_id,
            };
        }
        if (createBranchDto.primaryUser) {
            const primaryUser = createBranchDto.primaryUser;
            if (!primaryUser ||
                !primaryUser.first_name ||
                !primaryUser.phone_number ||
                !primaryUser.users_business_email) {
                throw new Error('Missing required primary user fields for new user creation');
            }
            const userDto = {
                first_name: primaryUser.first_name,
                middle_name: primaryUser.middle_name || null,
                last_name: primaryUser.last_name || null,
                phone_number: primaryUser.phone_number,
                user_alternative_contact_number: primaryUser.user_alternative_contact_number,
                users_business_email: primaryUser.users_business_email,
                branch_id: branch_id,
                role_id: null,
                department_id: null,
                designation_id: null,
                street: null,
                landmark: null,
                country: null,
                city: null,
                state: null,
                zip: null,
            };
            console.log('userDto', userDto);
            const userResult = await this.organizationService.createNewUser(userDto, organization_Id, decrypted_system_user_id);
            console.log('userResult', userResult);
            console.log('userDto, organization_Id, decrypted_system_user_id', userDto, organization_Id, decrypted_system_user_id);
            const user_id = userResult?.data?.user?.user_id;
            if (!user_id) {
                throw new Error('User ID missing from user creation result');
            }
            const updateBranchDto = {
                branch_id,
                primary_user_id: user_id,
            };
            const updatedBranch = await this.organizationService.updateBranch(updateBranchDto);
        }
        return {
            message: 'Branch created with new primary user',
            branch_id: branch_id,
        };
    }
    async updateBranch(body, req) {
        console.log('body :- ', body);
        const updateBranchDto = {
            branch_id: body.branch_id,
            branch_name: body.branch_name || '',
            gstNo: body.gstNo || '',
            contact_number: body.contact_number || '',
            alternative_contact_number: body.alternative_contact_number || '',
            branch_email: body.branch_email || '',
            established_date: body.established_date ?? null,
            branch_street: body.branch_street || '',
            branch_landmark: body.branch_landmark || '',
            city: body.city || '',
            state: body.state || '',
            pincode: body.pincode || '',
            country: body.country || '',
            city_id: body.city_id ?? null,
            country_id: body.country_id ?? null,
            location_id: body.location_id ?? null,
            primary_user_id: body.primary_user_id ?? null,
            created_by: body.created_by ?? null,
            is_active: body.is_active ?? false,
            is_deleted: body.is_deleted ?? false,
            primaryUser: body.primaryUser ?? undefined,
        };
        console.log('updateBranchDto', updateBranchDto);
        const updatedBranch = await this.organizationService.updateBranch(updateBranchDto);
        const branch_id = updateBranchDto.branch_id;
        const primaryUser = updateBranchDto.primaryUser;
        if (updateBranchDto.primary_user_id && primaryUser) {
            const userUpdateDto = {
                user_id: updateBranchDto.primary_user_id,
                first_name: primaryUser.first_name,
                middle_name: primaryUser.middle_name || null,
                last_name: primaryUser.last_name || null,
                phone_number: primaryUser.phone_number,
                user_alternative_contact_number: primaryUser.user_alternative_contact_number,
                users_business_email: primaryUser.users_business_email,
                branch_id: branch_id,
                role_id: null,
                department_id: null,
                designation_id: null,
                street: null,
                landmark: null,
                country: null,
                city: null,
                state: null,
                zip: null,
            };
            console.log('userUpdateDto', userUpdateDto);
            const userUpdateResult = await this.organizationService.updateUserManagementData(userUpdateDto);
            return {
                message: 'Branch and user details updated successfully',
                branch_id,
                primary_user_id: updateBranchDto.primary_user_id,
                updatedBranch,
                updatedUser: userUpdateResult,
            };
        }
        return {
            message: 'Branch updated with existing primary user',
            branch_id,
            updatedBranch,
        };
    }
    async updateOrgainzationProfileValues(logoFile, payload, req) {
        console.log("payload", payload);
        let logoPath = null;
        if (logoFile) {
            logoPath = `/uploads/${logoFile.filename}`;
        }
        else if (payload.logoPreviewBase64 && payload.logoPreviewBase64?.startsWith('data:image')) {
            const matches = payload.logoPreviewBase64.match(/^data:image\/(\w+);base64,(.+)$/);
            if (matches) {
                const ext = matches[1];
                const base64Data = matches[2];
                const orgId = req.cookies?.organization_id
                    ? parseInt((0, crypto_utils_1.decrypt)(req.cookies.organization_id))
                    : 'unknown';
                const filename = `org-${orgId}-${Date.now()}.${ext}`;
                const uploadDir = (0, path_1.join)(process.cwd(), 'uploads');
                if (!(0, fs_1.existsSync)(uploadDir)) {
                    (0, fs_1.mkdirSync)(uploadDir, { recursive: true });
                }
                const filePath = (0, path_1.join)(uploadDir, filename);
                (0, fs_1.writeFileSync)(filePath, Buffer.from(base64Data, 'base64'));
                logoPath = `/uploads/${filename}`;
            }
        }
        payload.logo = logoPath;
        console.log("payload.logo", payload.logo);
        const mappedpayload = {
            organization_profile_id: payload.organization_profile_id,
            user_id: payload.user_id,
            organization_name: payload.organizationName,
            industry_type_name: payload.industryType,
            gst_no: payload.gstNumber,
            mobile_number: payload.contactNumber,
            email: payload.email,
            website_url: payload.website,
            financial_year: payload.financialYear,
            base_currency: payload.baseCurrency,
            dateformat: payload.dateFormat,
            time_zone: payload.timeZone,
            landmark: payload.hqAddressFields?.landmark,
            street: payload.hqAddressFields?.street,
            city: payload.hqAddressFields?.city,
            state: payload.hqAddressFields?.state,
            pincode: payload.hqAddressFields?.postalCode,
            country: payload.hqAddressFields?.country,
            organization_location_name: payload.hqAddress,
            organization_address: payload.hqAddress,
            established_date: payload.establishedDate ? new Date(payload.establishedDate) : undefined,
            users_designation: payload.designation_id,
            users_first_name: payload.primaryContactName?.split(' ')[0],
            users_middle_name: payload.primaryContactName?.split(' ')[1] ?? '',
            users_last_name: payload.primaryContactName?.split(' ')[2] ?? '',
            users_business_email: payload.primaryContactEmail,
            users_phone_number: payload.primaryContactPhone,
            billingContactName: payload.billingContactName,
            billingContactEmail: payload.billingContactEmail,
            billingContactPhone: payload.billingContactPhone,
            org_profile_image_address: payload.logo,
            logo: logoPath,
            themeMode: payload.themeMode,
            customThemeColor: payload.customThemeColor,
        };
        const organizationID = req.cookies.organization_id;
        const decryptedOrgId = (0, crypto_utils_1.decrypt)(organizationID);
        if (!decryptedOrgId) {
            throw new Error('Organization ID not found in cookies');
        }
        const organization_Id = Number(decryptedOrgId);
        if (isNaN(organization_Id)) {
            throw new Error('Invalid decrypted organization ID');
        }
        const result = await this.organizationService.updateOrgainzationProfileValues(mappedpayload, organization_Id);
        return {
            statusCode: 200,
            message: 'Update successful',
            data: result,
        };
    }
    async getBranchById(body) {
        const { branch_id } = body;
        if (!branch_id) {
            throw new Error('Branch ID is required');
        }
        const branch = await this.organizationService.getBranchById(branch_id);
        return {
            success: true,
            message: 'Branch fetched successfully',
            data: branch,
        };
    }
    async deleteBranchById(payload) {
        return await this.organizationService.deleteBranchById(payload);
    }
    async getCounts() {
        return this.organizationService.getCounts();
    }
    async fetchSingleVendorsData(body, res) {
        const vendorId = Number(body.vendor_id);
        if (!vendorId) {
            return res.status(400).json({ status: 400, message: 'Vendor ID is required' });
        }
        const response = await this.organizationService.fetchSingleVendorsData(vendorId);
        return res.status(response.status).json(response);
    }
    async fetchOrganizationVendors(req, res) {
        try {
            const result = await this.organizationService.fetchOrganizationVendors();
            return res.status(200).json({
                result,
            });
        }
        catch (error) {
            return res.status(error.status || 500).json({
                statusCode: error.status || 500,
                message: error.message || 'Internal server error.',
            });
        }
    }
    async fetchOrganizationVendors1(body, req, res) {
        try {
            const result = await this.organizationService.fetchOrganizationVendors1(body);
            return res.status(200).json({
                result,
            });
        }
        catch (error) {
            return res.status(error.status || 500).json({
                statusCode: error.status || 500,
                message: error.message || 'Internal server error.',
            });
        }
    }
    async createNewVendor(createvendorpayload, req, res) {
        try {
            const system_user_id = req.cookies.system_user_id;
            const decrypted_system_user_id = (0, crypto_utils_1.decrypt)(system_user_id.toString());
            const userId = await this.organizationService.getUserByPublicID(Number(decrypted_system_user_id));
            const result = await this.organizationService.createNewVendor(createvendorpayload, +userId);
            return res.status(result.status).json(result);
        }
        catch (error) {
            console.error('Error creating vendor:', error);
            return res.status(500).json({
                message: 'Failed to create vendor',
                error: error.message || error,
            });
        }
    }
    async updateVendorData(updatepayload, req, res) {
        try {
            const updatedVendors = await this.organizationService.updateVendorData(updatepayload);
            return res.status(common_1.HttpStatus.OK).json({
                status: common_1.HttpStatus.OK,
                message: 'Vendor updated successfully',
                data: updatedVendors.data,
            });
        }
        catch (error) {
            return res.status(error.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: error.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: error.message,
            });
        }
    }
    async deleteVendorData(body, req, res) {
        console.log('Received vendor_ids:', body.vendor_ids);
        const deletedVendors = await this.organizationService.deleteVendorData(body);
        return res.status(common_1.HttpStatus.OK).json({
            status: common_1.HttpStatus.OK,
            message: 'Vendor deletion processed.',
            data: deletedVendors,
        });
    }
    async activateVendors(dto, res) {
        const result = await this.organizationService.activateVendors(dto);
        return res.status(200).json(result);
    }
    async deactivateVendors(dto, res) {
        const result = await this.organizationService.deactivateVendors(dto);
        return res.status(200).json(result);
    }
    async bulkCreateVendors(dtos, req) {
        const system_user_id = req.cookies.system_user_id;
        const decrypted_system_user_id = (0, crypto_utils_1.decrypt)(system_user_id.toString());
        if (decrypted_system_user_id) {
            const result = await this.organizationService.bulkCreateVendors(dtos, +decrypted_system_user_id);
            return {
                statusCode: result.status,
                message: result.message,
                data: result.data,
            };
        }
        else {
            return {
                statusCode: 401,
                message: 'Unauthorized: Invalid or missing user ID.',
                data: null,
            };
        }
    }
    async exportOrganizationVendorsExcel(res, body) {
        const buffer = await this.organizationService.exportOrganizationVendorsExcel(body);
        const dateStamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');
        res.set({
            'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'Content-Disposition': `attachment; filename=organization-vendors-${dateStamp}.xlsx`,
        });
        res.end(buffer);
    }
    async getAllOrganiationLocation(body, req, res) {
        try {
            const result = await this.organizationService.getAllAssetsLocations(body);
            return res.status(200).json({
                result,
            });
        }
        catch (error) {
            return res.status(error.status || 500).json({
                statusCode: error.status || 500,
                message: error.message || 'Internal server error.',
            });
        }
    }
    async exportLocationsExcel(res, body) {
        const buffer = await this.organizationService.exportLocationsExcel(body);
        const dateStamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');
        res.set({
            'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'Content-Disposition': `attachment; filename=locations-${dateStamp}.xlsx`,
        });
        res.end(buffer);
    }
    async getLocationById(body, req, res) {
        try {
            const { location_id } = body;
            console.log("location_id", location_id);
            const result = await this.organizationService.getLocationById(+location_id);
            return res.status(200).json({
                result
            });
        }
        catch (error) {
            return res.status(error.status || 500).json({
                statusCode: error.status || 500,
                message: error.message || 'Internal server error.',
            });
        }
    }
    async deleteLocations(body, req, res) {
        try {
            const system_user_id = req.cookies.system_user_id;
            const userId = (0, crypto_utils_1.decrypt)(system_user_id.toString());
            const ids = Array.isArray(body.location_id)
                ? body.location_id
                : [body.location_id];
            const result = await this.organizationService.deleteLocationsById(ids, +userId);
            return res.status(200).json({
                statusCode: 200,
                message: `Deleted ${result.deletedIds.length} location(s) successfully`,
                deletedIds: result.deletedIds,
            });
        }
        catch (error) {
            return res.status(error.status || 500).json({
                statusCode: error.status || 500,
                message: error.message || "Internal server error.",
            });
        }
    }
    async addNewLocation(createnewlocationpayload, req, res) {
        try {
            console.log("createnewlocationpayload", createnewlocationpayload);
            const system_user_id = req.cookies.system_user_id;
            const decrypted_system_user_id = (0, crypto_utils_1.decrypt)(system_user_id.toString());
            const userId = await this.organizationService.getUserByPublicID(Number(decrypted_system_user_id));
            const result = await this.organizationService.addNewLocation(createnewlocationpayload, +userId);
            return res.status(200).json(result);
        }
        catch (error) {
            console.error('Error creating vendor:', error);
            return res.status(500).json({
                message: 'Failed to create vendor',
                error: error.message || error,
            });
        }
    }
    async updateLocation(body, req, res) {
        try {
            const { location_id, ...payload } = body;
            const system_user_id = req.cookies.system_user_id;
            const decrypted_system_user_id = (0, crypto_utils_1.decrypt)(system_user_id.toString());
            const userId = await this.organizationService.getUserByPublicID(Number(decrypted_system_user_id));
            const result = await this.organizationService.updateLocation({ ...payload, location_id }, +userId);
            return res.status(200).json(result);
        }
        catch (error) {
            console.error('Error updating location:', error);
            return res.status(500).json({
                message: 'Failed to update location',
                error: error.message || error,
            });
        }
    }
    async activateLocations(body, res) {
        try {
            if (!body?.location_ids || !Array.isArray(body.location_ids) || body.location_ids.length === 0) {
                return res.status(common_1.HttpStatus.BAD_REQUEST).json({
                    status: 'error',
                    message: 'location_ids must be a non-empty array',
                });
            }
            const result = await this.organizationService.activateLocations(body);
            return res.status(common_1.HttpStatus.OK).json(result);
        }
        catch (error) {
            console.error('Error activating locations:', error);
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: 'error',
                message: 'Failed to activate locations',
                error: error.message || error,
            });
        }
    }
    async deactivateLocations(body, res) {
        try {
            if (!body?.location_ids || !Array.isArray(body.location_ids) || body.location_ids.length === 0) {
                return res.status(common_1.HttpStatus.BAD_REQUEST).json({
                    status: 'error',
                    message: 'location_ids must be a non-empty array',
                });
            }
            const result = await this.organizationService.deactivateLocations(body);
            return res.status(common_1.HttpStatus.OK).json(result);
        }
        catch (error) {
            console.error('Error deactivating locations:', error);
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: 'error',
                message: 'Failed to deactivate locations',
                error: error.message || error,
            });
        }
    }
    async fetchOrganizationUsers(page = 1, limit = 10, search = '', sortField, sortOrder, customFiltersStr) {
        console.log('controller page limit search customFilters sortField sortOrder', page, limit, search, customFiltersStr, sortField, sortOrder);
        try {
            let customFilters = {};
            if (customFiltersStr) {
                try {
                    customFilters = JSON.parse(customFiltersStr);
                }
                catch (err) {
                    throw new common_1.BadRequestException('Invalid JSON in customFilters parameter');
                }
            }
            const response = await this.organizationService.fetchOrganizationUsers({
                page,
                limit,
                search,
                customFilters,
                sortField,
                sortOrder: sortOrder,
            });
            return {
                success: true,
                message: response.message,
                data: response.data,
                meta: response.meta,
            };
        }
        catch (error) {
            return {
                success: false,
                message: 'An error occurred while fetching users',
                error: error.message,
            };
        }
    }
    async fetchSingleUsersData(body, res) {
        const { user_id } = body;
        if (!user_id) {
            return res.status(400).json({ success: false, message: 'user_id is required' });
        }
        const response = await this.organizationService.fetchSingleUsersData(+user_id);
        return res.status(response.status).json(response);
    }
    async createNewUser(payload, req) {
        console.log("payload", payload);
        const organizationID = req.cookies.organization_id;
        const encryptedorganizationID = (0, crypto_utils_1.decrypt)(organizationID);
        if (!encryptedorganizationID) {
            throw new Error('Orgnaization ID not found in cookies');
        }
        const organization_Id = Number(encryptedorganizationID);
        if (isNaN(organization_Id)) {
            throw new Error('Invalid decrypted user ID');
        }
        const system_user_id = req.cookies.system_user_id;
        if (!system_user_id) {
            return {
                status: 401,
                message: 'Unauthorized: No user ID found',
            };
        }
        const decrypted_system_user_id = Number((0, crypto_utils_1.decrypt)(system_user_id.toString()));
        const newUser = await this.organizationService.createNewUser(payload, organization_Id, decrypted_system_user_id);
        console.log('newUser :- ', newUser);
        return newUser;
    }
    async updateUserManagementData(payload, req, res) {
        console.log("payload", payload);
        try {
            const updatedUser = await this.organizationService.updateUserManagementData(payload);
            return res.status(common_1.HttpStatus.OK).json({
                status: common_1.HttpStatus.OK,
                message: 'User updated successfully',
                data: updatedUser.data,
            });
        }
        catch (error) {
            return res.status(error.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: error.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: error.message,
            });
        }
    }
    async activateUsers(body, res, req) {
        const user_ids = body.userIds;
        const system_user_id = req.cookies.system_user_id;
        if (!system_user_id) {
            return {
                status: 401,
                message: 'Unauthorized: No user ID found',
            };
        }
        const decrypted_system_user_id = (0, crypto_utils_1.decrypt)(system_user_id.toString());
        try {
            if (!user_ids || user_ids.length === 0) {
                return res.status(common_1.HttpStatus.BAD_REQUEST).json({
                    status: 'error',
                    message: 'user_ids must be a non-empty array',
                });
            }
            const result = await this.organizationService.activateUsers(user_ids, +decrypted_system_user_id);
            return res.status(common_1.HttpStatus.OK).json(result);
        }
        catch (error) {
            console.error('Error activating users:', error);
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: 'error',
                message: 'Failed to activate users',
                error: error.message || error,
            });
        }
    }
    async deactivateUsers(body, res, req) {
        const user_ids = body.userIds;
        const system_user_id = req.cookies.system_user_id;
        if (!system_user_id) {
            return {
                status: 401,
                message: 'Unauthorized: No user ID found',
            };
        }
        const decrypted_system_user_id = (0, crypto_utils_1.decrypt)(system_user_id.toString());
        console.log("deactivate-users", user_ids);
        try {
            if (!user_ids || user_ids.length === 0) {
                return res.status(common_1.HttpStatus.BAD_REQUEST).json({
                    status: 'error',
                    message: 'user_ids must be a non-empty array',
                });
            }
            const result = await this.organizationService.deactivateUsers(user_ids, +decrypted_system_user_id);
            return res.status(common_1.HttpStatus.OK).json(result);
        }
        catch (error) {
            console.error('Error deactivating users:', error);
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: 'error',
                message: 'Failed to deativate users',
                error: error.message || error,
            });
        }
    }
    async deleteUserManagementData(body, req, res) {
        const userIds = Array.isArray(body.userIds) ? body.userIds : [body.userIds];
        const result = await this.organizationService.deleteUserManagementData(userIds);
        return res.status(common_1.HttpStatus.OK).json(result);
    }
    async exportUsersToExcel(res, body) {
        const buffer = await this.organizationService.exportFilteredExcelForUsers(body);
        const dateStamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');
        res.set({
            'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'Content-Disposition': `attachment; filename=users-${dateStamp}.xlsx`,
        });
        res.end(buffer);
    }
    async resetPasswordByAdmin(userId, req) {
        const system_user_id = req.cookies.system_user_id;
        const decrypted_system_user_id = (0, crypto_utils_1.decrypt)(system_user_id.toString());
        if (!decrypted_system_user_id) {
            throw new common_1.UnauthorizedException('Invalid session');
        }
        return await this.organizationService.sendResetPasswordEmailByAdmin(Number(userId), Number(decrypted_system_user_id));
    }
    async getByPincode(pincode) {
        return this.organizationService.findByPincode(pincode);
    }
    async getAssetOrgSubscriptionDetails(body, res) {
        try {
            const { userId, orgId } = body;
            if (!userId || !orgId) {
                return res.status(common_1.HttpStatus.BAD_REQUEST).json({
                    success: false,
                    message: 'userId or orgId is missing in request',
                });
            }
            const data = await this.organizationService.getSubscriptionDetailsByOrganizationAsset(orgId);
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
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: error.message || 'Failed to fetch subscription details',
            });
        }
    }
    async getAllPaymentModes(res) {
        try {
            const data = await this.organizationService.getAllPaymentModes();
            return res.status(common_1.HttpStatus.OK).json({
                success: true,
                message: 'Fetched payment modes successfully',
                data,
            });
        }
        catch (error) {
            console.error('Error fetching payment modes:', error);
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: error.message || 'Failed to fetch payment modes',
            });
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
            const requestData = await this.organizationService.createOfflinePaymentRequest(user_id);
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
    async createPayment(payload, res, req) {
        try {
            const result = await this.organizationService.createPayment(payload);
            return res.status(common_1.HttpStatus.CREATED).json({
                success: true,
                message: 'Payment processed successfully',
                data: result,
            });
        }
        catch (error) {
            console.error('Payment creation failed:', error);
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: error.message || 'Failed to process payment',
            });
        }
    }
    async getOrganizationUsers(res, page = 1, limit = 10, search, status) {
        try {
            const users = await this.organizationService.getAllUsers(Number(page), Number(limit), search, status);
            return res.status(common_1.HttpStatus.OK).json(users);
        }
        catch (error) {
            console.error('Error fetching users:', error);
            return res.status(common_1.HttpStatus.BAD_REQUEST).json({
                message: 'Failed to fetch users',
                error: error.message,
            });
        }
    }
    async getAllUsersWithOrganization(page = 1, limit = 10, search = '', status = 'All') {
        try {
            return await this.organizationService.getAllUsersWithOrganization(Number(page), Number(limit), search, status);
        }
        catch (error) {
            return {
                success: false,
                message: error.message || 'Error fetching users',
            };
        }
    }
    async getAssetOrgLimitations(body, res) {
        try {
            const { userId, orgId } = body;
            if (!userId || !orgId) {
                return res.status(common_1.HttpStatus.BAD_REQUEST).json({
                    success: false,
                    message: 'userId or orgId is missing in request',
                });
            }
            const data = await this.organizationService.getOrgLimitations(orgId);
            if (!data || data.length === 0) {
                return res.status(common_1.HttpStatus.NOT_FOUND).json({
                    success: false,
                    message: 'No limitations found for this organization',
                });
            }
            return res.status(common_1.HttpStatus.OK).json({
                success: true,
                message: 'Fetched organization limitations successfully',
                data,
            });
        }
        catch (error) {
            console.error('Error fetching organization limitations:', error);
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: error.message || 'Failed to fetch organization limitations',
            });
        }
    }
    async initializeOrgSetupProgress(body, res) {
        try {
            const { orgId } = body;
            if (!orgId) {
                return res.status(common_1.HttpStatus.BAD_REQUEST).json({
                    success: false,
                    message: 'orgId is missing in request',
                });
            }
            const data = await this.organizationService.initializeOrgSetupProgress(orgId);
            return res.status(common_1.HttpStatus.OK).json({
                success: true,
                message: 'Organization setup progress initialized successfully',
                data,
            });
        }
        catch (error) {
            console.error('Error initializing organization setup progress:', error);
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: error.message || 'Failed to initialize organization setup progress',
            });
        }
    }
    async getAssetRestrictions(body, res) {
        try {
            const { userId, orgId } = body;
            if (!userId || !orgId) {
                return res.status(common_1.HttpStatus.BAD_REQUEST).json({
                    success: false,
                    message: 'userId or orgId is missing in request',
                });
            }
            const data = await this.organizationService.getAssetRestrictions(orgId);
            if (!data || data.length === 0) {
                return res.status(common_1.HttpStatus.NOT_FOUND).json({
                    success: false,
                    message: 'No limitations found for this organization',
                });
            }
            return res.status(common_1.HttpStatus.OK).json({
                success: true,
                message: 'Fetched organization limitations successfully',
                data,
            });
        }
        catch (error) {
            console.error('❌ Error fetching organization limitations:', error);
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: error.message || 'Failed to fetch organization limitations',
            });
        }
    }
    async checkAssetRestriction(body, res) {
        try {
            const { orgId, featureId } = body;
            if (!orgId || !featureId) {
                return res.status(common_1.HttpStatus.BAD_REQUEST).json({
                    success: false,
                    message: 'orgId or featureId is missing in request',
                });
            }
            const restriction = await this.organizationService.getRestrictionByFeatureId(orgId, featureId);
            if (!restriction) {
                return res.status(common_1.HttpStatus.NOT_FOUND).json({
                    success: false,
                    message: 'No restriction found for this feature in organization',
                });
            }
            return res.status(common_1.HttpStatus.OK).json({
                success: true,
                message: 'Fetched feature restriction successfully',
                data: restriction,
            });
        }
        catch (error) {
            console.error('❌ Error fetching feature restriction:', error);
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: error.message || 'Failed to fetch feature restriction',
            });
        }
    }
    async updateUsageCount(body) {
        try {
            const result = await this.organizationService.updateUsageCount(body.orgId, body.featureId, body.currentValue);
            return {
                success: true,
                message: 'Usage value updated successfully',
                result,
            };
        }
        catch (error) {
            console.error('❌ Error updating usage value:', error);
            throw new common_1.HttpException('Failed to update usage value', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async sendEnquiryMail(createContactSalesRequestDto) {
        try {
            const result = await this.organizationService.sendEnquiryMail(createContactSalesRequestDto);
            return {
                success: true,
                message: 'Enquiry mail sent successfully',
                data: result,
            };
        }
        catch (error) {
            console.error('❌ Error sending enquiry mail:', error);
            throw new common_1.HttpException({
                success: false,
                message: 'Failed to send enquiry mail',
                error: error.message,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async convertEnquiry(data, res) {
        try {
            const parsedDto = JSON.parse(decodeURIComponent(data));
            await this.organizationService.createContactSalesRequest({
                ...parsedDto,
                status: 'Pending',
                is_active: true,
                is_deleted: false,
            });
            return res.redirect(`${process.env.CLIENT_ORIGIN_URL}/contact-sales?status=success`);
        }
        catch (error) {
            console.error('❌ Error converting enquiry:', error);
            return res.redirect(`${process.env.CLIENT_ORIGIN_URL}/contact-sales?status=failed`);
        }
    }
    async submitContactSalesRequest(createContactSalesRequestDto) {
        try {
            const result = await this.organizationService.createContactSalesRequest(createContactSalesRequestDto);
            return {
                success: true,
                message: 'Contact sales request submitted successfully',
                data: result,
            };
        }
        catch (error) {
            console.error('Error submitting contact sales request:', error);
            throw new common_1.HttpException({
                success: false,
                message: 'Failed to submit contact sales request',
                error: error.message,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async createTicket(dto, res) {
        try {
            await this.organizationService.createTicket(dto);
            return res.status(common_1.HttpStatus.CREATED).json({
                success: true,
                message: 'Support ticket created successfully in Billing',
            });
        }
        catch (error) {
            console.error('Error creating billing ticket:', error);
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: error.message || 'Failed to create billing ticket',
            });
        }
    }
    async getOrganizationDetails() {
        const data = await this.organizationService.getOrganizationDetails();
        return {
            success: true,
            message: 'Organization information fetched successfully',
            data,
        };
    }
};
exports.OrganizationalProfileController = OrganizationalProfileController;
__decorate([
    (0, common_1.Get)('download-vendor-template'),
    (0, common_1.UseGuards)(api_key_guard_1.ApiKeyGuard, jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], OrganizationalProfileController.prototype, "downloadVendorTemplate", null);
__decorate([
    (0, common_1.Get)('download-user-template'),
    (0, common_1.UseGuards)(api_key_guard_1.ApiKeyGuard, jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], OrganizationalProfileController.prototype, "generateUserTemplate", null);
__decorate([
    (0, common_1.Get)('getOrganizationDesignation'),
    (0, common_1.UseGuards)(api_key_guard_1.ApiKeyGuard, jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('search')),
    __param(3, (0, common_1.Req)()),
    __param(4, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String, Object, Object]),
    __metadata("design:returntype", Promise)
], OrganizationalProfileController.prototype, "fetchOrganizationDesignation", null);
__decorate([
    (0, common_1.Get)('fetchindustrytype'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], OrganizationalProfileController.prototype, "getIndustryTypeValues", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrganizationalProfileController.prototype, "getjs", null);
__decorate([
    (0, common_1.Get)('plan-with-all-details/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], OrganizationalProfileController.prototype, "getPlanWithFeaturesById", null);
__decorate([
    (0, common_1.Post)('plans-with-features'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrganizationalProfileController.prototype, "getAllPlansWithFeatures", null);
__decorate([
    (0, common_1.Post)('plans-by-product'),
    __param(0, (0, common_1.Body)('productId')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], OrganizationalProfileController.prototype, "getPlansWithFeaturesByProducts", null);
__decorate([
    (0, common_1.Post)('get-plans-by-product'),
    __param(0, (0, common_1.Body)('productId')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], OrganizationalProfileController.prototype, "getPlansWithFeaturesByProduct", null);
__decorate([
    (0, common_1.Get)('fetchDepartmentconfig'),
    (0, common_1.UseGuards)(api_key_guard_1.ApiKeyGuard, jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Query)('page')),
    __param(3, (0, common_1.Query)('limit')),
    __param(4, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Number, Number, String]),
    __metadata("design:returntype", Promise)
], OrganizationalProfileController.prototype, "getDepartmentConfigValues", null);
__decorate([
    (0, common_1.Get)('fetchDepartments'),
    (0, common_1.UseGuards)(api_key_guard_1.ApiKeyGuard, jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Query)('page')),
    __param(3, (0, common_1.Query)('limit')),
    __param(4, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Number, Number, String]),
    __metadata("design:returntype", Promise)
], OrganizationalProfileController.prototype, "getDepartmentsWithPagination", null);
__decorate([
    (0, common_1.Get)('fetchDesignations'),
    (0, common_1.UseGuards)(api_key_guard_1.ApiKeyGuard, jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], OrganizationalProfileController.prototype, "getDesignationsWithPagination", null);
__decorate([
    (0, common_1.Get)('fetchDesignationsconfig'),
    (0, common_1.UseGuards)(api_key_guard_1.ApiKeyGuard, jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], OrganizationalProfileController.prototype, "getDesignationsConfigValues", null);
__decorate([
    (0, common_1.Post)('setDepartments'),
    (0, common_1.UseGuards)(api_key_guard_1.ApiKeyGuard, jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [department_dto_1.CreateDepartmentsDto]),
    __metadata("design:returntype", Promise)
], OrganizationalProfileController.prototype, "setDepartmentValues", null);
__decorate([
    (0, common_1.Post)('editDepartment'),
    (0, common_1.UseGuards)(api_key_guard_1.ApiKeyGuard, jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Query)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_dept_dto_1.EditDepartmentDto]),
    __metadata("design:returntype", Promise)
], OrganizationalProfileController.prototype, "editDepartment", null);
__decorate([
    (0, common_1.Post)('setDesignations'),
    (0, common_1.UseGuards)(api_key_guard_1.ApiKeyGuard, jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [designation_dto_1.CreateDesignationDto]),
    __metadata("design:returntype", Promise)
], OrganizationalProfileController.prototype, "setDesignationsValues", null);
__decorate([
    (0, common_1.Post)('editDesignation'),
    (0, common_1.UseGuards)(api_key_guard_1.ApiKeyGuard, jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Query)('id')),
    __param(1, (0, common_1.Body)('designation_name')),
    __param(2, (0, common_1.Body)('desg_description')),
    __param(3, (0, common_1.Body)('departmentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String, Number]),
    __metadata("design:returntype", Promise)
], OrganizationalProfileController.prototype, "editDesignation", null);
__decorate([
    (0, common_1.Post)('removeDepartments'),
    (0, common_1.UseGuards)(api_key_guard_1.ApiKeyGuard, jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [delete_department_dto_1.DeleteDepartmentsDto]),
    __metadata("design:returntype", Promise)
], OrganizationalProfileController.prototype, "removeDepartmentValues", null);
__decorate([
    (0, common_1.Post)('removeDesignation'),
    (0, common_1.UseGuards)(api_key_guard_1.ApiKeyGuard, jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [delete_degination_dto_1.DeleteDesignationsDto]),
    __metadata("design:returntype", Promise)
], OrganizationalProfileController.prototype, "removeDesignationValue", null);
__decorate([
    (0, common_1.Get)('getOrganizationDepartments'),
    (0, common_1.UseGuards)(api_key_guard_1.ApiKeyGuard, jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Query)('search')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], OrganizationalProfileController.prototype, "fetchOrganizationDeparments", null);
__decorate([
    (0, common_1.Get)('getDepartmentDropdown'),
    (0, common_1.UseGuards)(api_key_guard_1.ApiKeyGuard, jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrganizationalProfileController.prototype, "getDepartmentDropdown", null);
__decorate([
    (0, common_1.Get)('getBranchDropdown'),
    (0, common_1.UseGuards)(api_key_guard_1.ApiKeyGuard, jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrganizationalProfileController.prototype, "getBranchDropdown", null);
__decorate([
    (0, common_1.Get)('filterable-user-columns'),
    (0, common_1.UseGuards)(api_key_guard_1.ApiKeyGuard, jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], OrganizationalProfileController.prototype, "getFilterableItemColumns", null);
__decorate([
    (0, common_1.Get)('users-for-dropdown-of-filter'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrganizationalProfileController.prototype, "getCategoryDropdown", null);
__decorate([
    (0, common_1.Get)('exportUserCSV'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrganizationalProfileController.prototype, "exportUsersCSV", null);
__decorate([
    (0, common_1.Get)('exportVendorCSV'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrganizationalProfileController.prototype, "exportVendorCSV", null);
__decorate([
    (0, common_1.Get)('getAllorganizationVenders'),
    (0, common_1.UseGuards)(api_key_guard_1.ApiKeyGuard, jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrganizationalProfileController.prototype, "getAllorganizationVenders", null);
__decorate([
    (0, common_1.Get)('fetchAllBranchusers'),
    (0, common_1.UseGuards)(api_key_guard_1.ApiKeyGuard, jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Query)('branch_id')),
    __param(1, (0, common_1.Query)('department_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], OrganizationalProfileController.prototype, "fetchAllBranchusers", null);
__decorate([
    (0, common_1.Get)('getOrganizationBranches'),
    (0, common_1.UseGuards)(api_key_guard_1.ApiKeyGuard, jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], OrganizationalProfileController.prototype, "fetchOrganizationBranches", null);
__decorate([
    (0, common_1.Get)('fetchOrganizationProfile'),
    (0, common_1.UseGuards)(api_key_guard_1.ApiKeyGuard, jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], OrganizationalProfileController.prototype, "getOrganizationalProfile", null);
__decorate([
    (0, common_1.Post)('createBranch'),
    (0, common_1.UseGuards)(api_key_guard_1.ApiKeyGuard, jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], OrganizationalProfileController.prototype, "createBranch1", null);
__decorate([
    (0, common_1.Post)('updateBranch'),
    (0, common_1.UseGuards)(api_key_guard_1.ApiKeyGuard, jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], OrganizationalProfileController.prototype, "updateBranch", null);
__decorate([
    (0, common_1.Post)('updateOrganizationalProfile'),
    (0, common_1.UseGuards)(api_key_guard_1.ApiKeyGuard, jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('logoPreviewBase64', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads',
            filename: (req, file, cb) => {
                const orgId = req.cookies?.organization_id
                    ? parseInt((0, crypto_utils_1.decrypt)(req.cookies.organization_id))
                    : 'unknown';
                const timestamp = Date.now();
                const ext = (0, path_1.extname)(file.originalname);
                cb(null, `org-${orgId}-${timestamp}${ext}`);
            },
        }),
        fileFilter: (req, file, cb) => {
            const allowed = ['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml'];
            if (!allowed.includes(file.mimetype)) {
                return cb(new Error('Only PNG, JPG, JPEG, SVG files allowed'), false);
            }
            cb(null, true);
        },
        limits: {
            fileSize: 5 * 1024 * 1024,
        },
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], OrganizationalProfileController.prototype, "updateOrgainzationProfileValues", null);
__decorate([
    (0, common_1.Post)('get-branch-by-id'),
    (0, common_1.UseGuards)(api_key_guard_1.ApiKeyGuard, jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_branch_by_id_dto_1.GetBranchByIdDto]),
    __metadata("design:returntype", Promise)
], OrganizationalProfileController.prototype, "getBranchById", null);
__decorate([
    (0, common_1.Post)('delete-branch-by-id'),
    (0, common_1.UseGuards)(api_key_guard_1.ApiKeyGuard, jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrganizationalProfileController.prototype, "deleteBranchById", null);
__decorate([
    (0, common_1.Get)('fetchCount'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrganizationalProfileController.prototype, "getCounts", null);
__decorate([
    (0, common_1.Post)('fetch-single-vendor-data'),
    (0, common_1.UseGuards)(api_key_guard_1.ApiKeyGuard, jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], OrganizationalProfileController.prototype, "fetchSingleVendorsData", null);
__decorate([
    (0, common_1.Get)('getOrganizationVendors'),
    (0, common_1.UseGuards)(api_key_guard_1.ApiKeyGuard, jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], OrganizationalProfileController.prototype, "fetchOrganizationVendors", null);
__decorate([
    (0, common_1.Post)('getOrganizationVendors1'),
    (0, common_1.UseGuards)(api_key_guard_1.ApiKeyGuard, jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], OrganizationalProfileController.prototype, "fetchOrganizationVendors1", null);
__decorate([
    (0, common_1.Post)('insert-new-vendor'),
    (0, common_1.UseGuards)(api_key_guard_1.ApiKeyGuard, jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], OrganizationalProfileController.prototype, "createNewVendor", null);
__decorate([
    (0, common_1.Post)('update-vendor-data'),
    (0, common_1.UseGuards)(api_key_guard_1.ApiKeyGuard, jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], OrganizationalProfileController.prototype, "updateVendorData", null);
__decorate([
    (0, common_1.Post)('delete-vendor-data'),
    (0, common_1.UseGuards)(api_key_guard_1.ApiKeyGuard, jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], OrganizationalProfileController.prototype, "deleteVendorData", null);
__decorate([
    (0, common_1.Post)('activate-vendors'),
    (0, common_1.UseGuards)(api_key_guard_1.ApiKeyGuard, jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [vendor_id_list_dto_1.VendorIdListDto, Object]),
    __metadata("design:returntype", Promise)
], OrganizationalProfileController.prototype, "activateVendors", null);
__decorate([
    (0, common_1.Post)('deactivate-vendors'),
    (0, common_1.UseGuards)(api_key_guard_1.ApiKeyGuard, jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [vendor_id_list_dto_1.VendorIdListDto, Object]),
    __metadata("design:returntype", Promise)
], OrganizationalProfileController.prototype, "deactivateVendors", null);
__decorate([
    (0, common_1.Post)('bulk-import-vendor'),
    (0, common_1.UseGuards)(api_key_guard_1.ApiKeyGuard, jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Object]),
    __metadata("design:returntype", Promise)
], OrganizationalProfileController.prototype, "bulkCreateVendors", null);
__decorate([
    (0, common_1.Post)('export-organization-vendors'),
    (0, common_1.UseGuards)(api_key_guard_1.ApiKeyGuard, jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], OrganizationalProfileController.prototype, "exportOrganizationVendorsExcel", null);
__decorate([
    (0, common_1.Post)('get-all-organization-locations'),
    (0, common_1.UseGuards)(api_key_guard_1.ApiKeyGuard, jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], OrganizationalProfileController.prototype, "getAllOrganiationLocation", null);
__decorate([
    (0, common_1.Post)('export-locations'),
    (0, common_1.UseGuards)(api_key_guard_1.ApiKeyGuard, jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], OrganizationalProfileController.prototype, "exportLocationsExcel", null);
__decorate([
    (0, common_1.Post)("get-locations-by-id"),
    (0, common_1.UseGuards)(api_key_guard_1.ApiKeyGuard, jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], OrganizationalProfileController.prototype, "getLocationById", null);
__decorate([
    (0, common_1.Post)("delete-locations-by-id"),
    (0, common_1.UseGuards)(api_key_guard_1.ApiKeyGuard, jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], OrganizationalProfileController.prototype, "deleteLocations", null);
__decorate([
    (0, common_1.Post)('create-new-location'),
    (0, common_1.UseGuards)(api_key_guard_1.ApiKeyGuard, jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], OrganizationalProfileController.prototype, "addNewLocation", null);
__decorate([
    (0, common_1.Post)('update-location'),
    (0, common_1.UseGuards)(api_key_guard_1.ApiKeyGuard, jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], OrganizationalProfileController.prototype, "updateLocation", null);
__decorate([
    (0, common_1.Post)('activate-locations'),
    (0, common_1.UseGuards)(api_key_guard_1.ApiKeyGuard, jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], OrganizationalProfileController.prototype, "activateLocations", null);
__decorate([
    (0, common_1.Post)('deactivate-locations'),
    (0, common_1.UseGuards)(api_key_guard_1.ApiKeyGuard, jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], OrganizationalProfileController.prototype, "deactivateLocations", null);
__decorate([
    (0, common_1.Get)('getOrganizationUsers'),
    (0, common_1.UseGuards)(api_key_guard_1.ApiKeyGuard, jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('search')),
    __param(3, (0, common_1.Query)('sortField')),
    __param(4, (0, common_1.Query)('sortOrder')),
    __param(5, (0, common_1.Query)('customFilters')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String, String, String, String]),
    __metadata("design:returntype", Promise)
], OrganizationalProfileController.prototype, "fetchOrganizationUsers", null);
__decorate([
    (0, common_1.Post)('fetch-single-user-data'),
    (0, common_1.UseGuards)(api_key_guard_1.ApiKeyGuard, jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], OrganizationalProfileController.prototype, "fetchSingleUsersData", null);
__decorate([
    (0, common_1.Post)('insert-new-user'),
    (0, common_1.UseGuards)(api_key_guard_1.ApiKeyGuard, jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], OrganizationalProfileController.prototype, "createNewUser", null);
__decorate([
    (0, common_1.Post)('update-user-management-data'),
    (0, common_1.UseGuards)(api_key_guard_1.ApiKeyGuard, jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], OrganizationalProfileController.prototype, "updateUserManagementData", null);
__decorate([
    (0, common_1.Post)('activate-users'),
    (0, common_1.UseGuards)(api_key_guard_1.ApiKeyGuard, jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], OrganizationalProfileController.prototype, "activateUsers", null);
__decorate([
    (0, common_1.Post)('deactivate-users'),
    (0, common_1.UseGuards)(api_key_guard_1.ApiKeyGuard, jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], OrganizationalProfileController.prototype, "deactivateUsers", null);
__decorate([
    (0, common_1.Post)('delete-user-management-data'),
    (0, common_1.UseGuards)(api_key_guard_1.ApiKeyGuard, jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], OrganizationalProfileController.prototype, "deleteUserManagementData", null);
__decorate([
    (0, common_1.Post)('export-users-excel'),
    (0, common_1.UseGuards)(api_key_guard_1.ApiKeyGuard, jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], OrganizationalProfileController.prototype, "exportUsersToExcel", null);
__decorate([
    (0, common_1.Post)('reset-password-by-admin'),
    (0, common_1.UseGuards)(api_key_guard_1.ApiKeyGuard, jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Query)('userId')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], OrganizationalProfileController.prototype, "resetPasswordByAdmin", null);
__decorate([
    (0, common_1.Get)('get-pincode-state-city'),
    (0, common_1.UseGuards)(api_key_guard_1.ApiKeyGuard, jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Query)('pincode')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrganizationalProfileController.prototype, "getByPincode", null);
__decorate([
    (0, common_1.Post)('asset-org-subscription-details'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], OrganizationalProfileController.prototype, "getAssetOrgSubscriptionDetails", null);
__decorate([
    (0, common_1.Get)('payment-modes'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrganizationalProfileController.prototype, "getAllPaymentModes", null);
__decorate([
    (0, common_1.Post)('payment-request'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], OrganizationalProfileController.prototype, "createOfflinePaymentRequest", null);
__decorate([
    (0, common_1.Post)('create-payment'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [payment_dto_1.CreatePaymentDto, Object, Object]),
    __metadata("design:returntype", Promise)
], OrganizationalProfileController.prototype, "createPayment", null);
__decorate([
    (0, common_1.Get)('get-all-users'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __param(3, (0, common_1.Query)('search')),
    __param(4, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, String, String]),
    __metadata("design:returntype", Promise)
], OrganizationalProfileController.prototype, "getOrganizationUsers", null);
__decorate([
    (0, common_1.Get)('getAllUsersWithOrganization'),
    (0, common_1.UseGuards)(api_key_guard_1.ApiKeyGuard, jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('search')),
    __param(3, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String, String]),
    __metadata("design:returntype", Promise)
], OrganizationalProfileController.prototype, "getAllUsersWithOrganization", null);
__decorate([
    (0, common_1.Post)('asset-org-limitations'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], OrganizationalProfileController.prototype, "getAssetOrgLimitations", null);
__decorate([
    (0, common_1.Post)('initialize-org-setup-progress'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], OrganizationalProfileController.prototype, "initializeOrgSetupProgress", null);
__decorate([
    (0, common_1.Post)('asset-restrictions'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], OrganizationalProfileController.prototype, "getAssetRestrictions", null);
__decorate([
    (0, common_1.Post)('check-restriction-by-feature'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], OrganizationalProfileController.prototype, "checkAssetRestriction", null);
__decorate([
    (0, common_1.Post)('update-usage-count'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrganizationalProfileController.prototype, "updateUsageCount", null);
__decorate([
    (0, common_1.Post)('send-enquiry-mail'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [contact_sales_requests_dto_1.CreateContactSalesRequestDto]),
    __metadata("design:returntype", Promise)
], OrganizationalProfileController.prototype, "sendEnquiryMail", null);
__decorate([
    (0, common_1.Get)('convert-enquiry'),
    __param(0, (0, common_1.Query)('data')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], OrganizationalProfileController.prototype, "convertEnquiry", null);
__decorate([
    (0, common_1.Post)('insert-sales-request'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [contact_sales_requests_dto_1.CreateContactSalesRequestDto]),
    __metadata("design:returntype", Promise)
], OrganizationalProfileController.prototype, "submitContactSalesRequest", null);
__decorate([
    (0, common_1.Post)('create-ticket'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_billing_support_ticket_dto_1.CreateBillingSupportTicketDto, Object]),
    __metadata("design:returntype", Promise)
], OrganizationalProfileController.prototype, "createTicket", null);
__decorate([
    (0, common_1.Get)('organization-details'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrganizationalProfileController.prototype, "getOrganizationDetails", null);
exports.OrganizationalProfileController = OrganizationalProfileController = __decorate([
    (0, common_1.Controller)('organizational-profile'),
    __metadata("design:paramtypes", [organizational_profile_service_1.OrganizationService])
], OrganizationalProfileController);
