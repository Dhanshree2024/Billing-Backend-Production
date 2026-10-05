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
exports.ServicesController = void 0;
const common_1 = require("@nestjs/common");
const services_service_1 = require("./services.service");
let ServicesController = class ServicesController {
    constructor(servicesService) {
        this.servicesService = servicesService;
    }
    async getAllServices(res) {
        try {
            const data = await this.servicesService.getAllServices();
            return res.status(common_1.HttpStatus.OK).json({
                success: true,
                message: 'Services fetched successfully',
                data,
            });
        }
        catch (error) {
            console.error('Get Services Error:', error);
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: error.message || 'Failed to fetch services',
            });
        }
    }
    async getServicesByProduct(productId, res) {
        try {
            const data = await this.servicesService.getServicesByProduct(productId);
            return res.status(common_1.HttpStatus.OK).json({
                success: true,
                message: 'Services fetched successfully for product',
                data,
            });
        }
        catch (error) {
            console.error('Get Services by Product Error:', error);
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: error.message || 'Failed to fetch services by product',
            });
        }
    }
    async getAllServicesList(page = 1, limit = 10, search = '', status = 'All', res) {
        try {
            const { data, total } = await this.servicesService.getAllServicesList(Number(page), Number(limit), search, status);
            return res.status(common_1.HttpStatus.OK).json({
                success: true,
                message: 'Services fetched successfully',
                data,
                total,
            });
        }
        catch (error) {
            console.error('Get Services Error:', error);
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: error.message || 'Failed to fetch services',
            });
        }
    }
    async createServiceMapping(body) {
        try {
            const { product_id, plan_id, status, services } = body;
            if (!Array.isArray(services) || services.length === 0) {
                throw new common_1.BadRequestException('No services provided');
            }
            for (const service of services) {
                if (!service.service_id) {
                    console.warn('⚠️ Skipping service without ID:', service);
                    continue;
                }
                const booleanStatus = service.status === 'Enabled'
                    ? true
                    : service.status === 'Disabled'
                        ? false
                        : status === 'Active';
                await this.servicesService.saveServiceMapping({
                    productId: product_id,
                    planId: plan_id,
                    serviceId: service.service_id,
                    status: booleanStatus,
                });
            }
            return { success: true, message: 'Service mappings saved successfully' };
        }
        catch (error) {
            console.error('❌ Error in createServiceMapping:', error);
            throw new common_1.InternalServerErrorException(error.message || 'Internal Server Error');
        }
    }
    async updateServiceMapping(body) {
        try {
            const { product_id, plan_id, status, services } = body;
            if (!Array.isArray(services) || services.length === 0) {
                throw new common_1.BadRequestException('No services provided');
            }
            for (const service of services) {
                if (!service.service_id) {
                    console.warn('⚠️ Skipping service without ID:', service);
                    continue;
                }
                const booleanStatus = service.status === 'Enabled'
                    ? true
                    : service.status === 'Disabled'
                        ? false
                        : status === 'Active';
                await this.servicesService.updateServiceMapping({
                    productId: product_id,
                    planId: plan_id,
                    serviceId: service.service_id,
                    status: booleanStatus,
                });
            }
            return { success: true, message: 'Service mappings saved successfully' };
        }
        catch (error) {
            console.error('❌ Error in createServiceMapping:', error);
            throw new common_1.InternalServerErrorException(error.message || 'Internal Server Error');
        }
    }
    async fetchMappings(page = 1, limit = 10, search = '', status = 'All', productId, planId) {
        const result = await this.servicesService.getAllMappings(Number(page), Number(limit), search, status, productId ? Number(productId) : undefined, planId ? Number(planId) : undefined);
        return {
            success: true,
            message: 'Plan-Service mappings fetched successfully',
            ...result,
        };
    }
    async getServiceMappingsByPlan(planId) {
        try {
            const data = await this.servicesService.getServiceMappingsByPlan(planId);
            return {
                success: true,
                message: 'Service mappings fetched successfully',
                data,
            };
        }
        catch (error) {
            console.error('Error fetching service mappings by plan:', error);
            throw new common_1.HttpException('Internal server error', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.ServicesController = ServicesController;
__decorate([
    (0, common_1.Get)('get-all-services'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ServicesController.prototype, "getAllServices", null);
__decorate([
    (0, common_1.Get)('get-services-by-product/:productId'),
    __param(0, (0, common_1.Param)('productId')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ServicesController.prototype, "getServicesByProduct", null);
__decorate([
    (0, common_1.Get)('get-all-services-list'),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('search')),
    __param(3, (0, common_1.Query)('status')),
    __param(4, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, String, Object]),
    __metadata("design:returntype", Promise)
], ServicesController.prototype, "getAllServicesList", null);
__decorate([
    (0, common_1.Post)('create-service-mapping'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ServicesController.prototype, "createServiceMapping", null);
__decorate([
    (0, common_1.Post)('update-service-mapping'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ServicesController.prototype, "updateServiceMapping", null);
__decorate([
    (0, common_1.Get)('get-all-service-mapping'),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('search')),
    __param(3, (0, common_1.Query)('status')),
    __param(4, (0, common_1.Query)('productId')),
    __param(5, (0, common_1.Query)('planId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, String, Number, Number]),
    __metadata("design:returntype", Promise)
], ServicesController.prototype, "fetchMappings", null);
__decorate([
    (0, common_1.Get)('mappings/:planId'),
    __param(0, (0, common_1.Param)('planId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ServicesController.prototype, "getServiceMappingsByPlan", null);
exports.ServicesController = ServicesController = __decorate([
    (0, common_1.Controller)('services'),
    __metadata("design:paramtypes", [services_service_1.ServicesService])
], ServicesController);
