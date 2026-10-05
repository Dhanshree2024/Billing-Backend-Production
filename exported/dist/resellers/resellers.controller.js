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
exports.ResellersController = void 0;
const common_1 = require("@nestjs/common");
const export_dto_1 = require("../common/export/dto/export.dto");
const export_service_1 = require("../common/export/services/export.service");
const create_reseller_dto_1 = require("./dto/create-reseller.dto");
const update_reseller_dto_1 = require("./dto/update-reseller.dto");
const update_status_dto_1 = require("./dto/update-status.dto");
const resellers_service_1 = require("./resellers.service");
let ResellersController = class ResellersController {
    constructor(resellersService, exportService) {
        this.resellersService = resellersService;
        this.exportService = exportService;
    }
    async getAllResellers(res, filters) {
        try {
            const page = parseInt(filters.page) || 1;
            const limit = parseInt(filters.limit) || 10;
            const search = filters.search?.trim() || '';
            const status = filters.status || 'All';
            const { data, total } = await this.resellersService.getAllResellers(page, limit, search, status);
            return res.status(common_1.HttpStatus.OK).json({
                success: true,
                message: 'Fetched resellers successfully',
                total,
                page,
                limit,
                data,
            });
        }
        catch (error) {
            console.error('Error fetching resellers:', error);
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: error.message || 'Failed to fetch resellers',
                total: 0,
                data: [],
            });
        }
    }
    async exportResellers(dto, res) {
        const data = await this.resellersService.exportResellers(dto.search || '', dto.status || 'All');
        const columns = [
            {
                header: 'Reseller ID',
                key: 'reseller_id',
            },
            {
                header: 'Reseller Code',
                key: 'reseller_code',
            },
            {
                header: 'Company Name',
                key: 'reseller_name',
            },
            {
                header: 'First Name',
                key: 'contact_first_name',
            },
            {
                header: 'Last Name',
                key: 'contact_last_name',
            },
            {
                header: 'Email',
                key: 'email',
            },
            {
                header: 'Phone',
                key: 'phone_number',
            },
            {
                header: 'GST Number',
                key: 'gst_number',
            },
            {
                header: 'Payment Status',
                key: 'payment_status',
            },
            {
                header: 'Status',
                key: 'is_active',
            },
        ];
        return this.exportService.export(res, dto.format, columns, data, 'Resellers');
    }
    async addReseller(dto) {
        try {
            const result = await this.resellersService.create(dto);
            return {
                success: true,
                message: 'Reseller added successfully',
                data: result,
            };
        }
        catch (error) {
            console.error('Error adding reseller:', error);
            return {
                success: false,
                message: error.message || 'Failed to add reseller',
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
            };
        }
    }
    async updateReseller(id, dto) {
        try {
            const result = await this.resellersService.update(id, dto);
            return {
                success: true,
                message: 'Reseller updated successfully',
                data: result,
            };
        }
        catch (error) {
            console.error('Error updating reseller:', error);
            return {
                success: false,
                message: error.message || 'Failed to update reseller',
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
            };
        }
    }
    async getResellerById(id, res) {
        try {
            const reseller = await this.resellersService.getSingleReseller(id);
            if (!reseller) {
                return res.status(common_1.HttpStatus.NOT_FOUND).json({
                    success: false,
                    message: 'Reseller not found',
                });
            }
            return res.status(common_1.HttpStatus.OK).json({
                success: true,
                message: 'Reseller fetched successfully',
                data: reseller,
            });
        }
        catch (error) {
            console.error('Error fetching reseller:', error);
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: error.message || 'Failed to fetch reseller',
            });
        }
    }
    async softDeleteReseller(res, id) {
        try {
            const result = await this.resellersService.deleteReseller(id);
            return res.status(common_1.HttpStatus.OK).json({
                success: true,
                message: 'Reseller deleted successfully (soft delete)',
                data: result,
            });
        }
        catch (error) {
            console.error('Error deleting reseller:', error);
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: error.message || 'Failed to delete reseller',
            });
        }
    }
    async getDropdownResellers(res) {
        try {
            const result = await this.resellersService.getResellerDropdown();
            return res.status(common_1.HttpStatus.OK).json({
                success: true,
                message: 'Reseller dropdown fetched successfully',
                data: result,
            });
        }
        catch (error) {
            console.error('Error fetching reseller dropdown:', error);
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: error.message || 'Failed to fetch reseller dropdown',
            });
        }
    }
    async updatePaymentStatus(dto) {
        return this.resellersService.updatePaymentStatus(dto);
    }
};
exports.ResellersController = ResellersController;
__decorate([
    (0, common_1.Post)('get-all-resellers'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ResellersController.prototype, "getAllResellers", null);
__decorate([
    (0, common_1.Post)('export'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [export_dto_1.ExportDto, Object]),
    __metadata("design:returntype", Promise)
], ResellersController.prototype, "exportResellers", null);
__decorate([
    (0, common_1.Post)('add-reseller'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_reseller_dto_1.CreateResellerDto]),
    __metadata("design:returntype", Promise)
], ResellersController.prototype, "addReseller", null);
__decorate([
    (0, common_1.Post)('update-reseller/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_reseller_dto_1.UpdateResellerDto]),
    __metadata("design:returntype", Promise)
], ResellersController.prototype, "updateReseller", null);
__decorate([
    (0, common_1.Get)('get-reseller/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ResellersController.prototype, "getResellerById", null);
__decorate([
    (0, common_1.Post)('delete-reseller/:id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], ResellersController.prototype, "softDeleteReseller", null);
__decorate([
    (0, common_1.Get)('dropdown-resellers'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ResellersController.prototype, "getDropdownResellers", null);
__decorate([
    (0, common_1.Post)('payment-status'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_status_dto_1.UpdatePaymentStatusDto]),
    __metadata("design:returntype", Promise)
], ResellersController.prototype, "updatePaymentStatus", null);
exports.ResellersController = ResellersController = __decorate([
    (0, common_1.Controller)('reseller'),
    __metadata("design:paramtypes", [resellers_service_1.ResellersService,
        export_service_1.ExportService])
], ResellersController);
