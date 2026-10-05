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
exports.ServicesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const services_entity_1 = require("./entity/services.entity");
const plan_services_mapping_entity_1 = require("./entity/plan_services_mapping.entity");
let ServicesService = class ServicesService {
    constructor(serviceRepo, mappingserviceRepo) {
        this.serviceRepo = serviceRepo;
        this.mappingserviceRepo = mappingserviceRepo;
    }
    async getAllServices() {
        return await this.serviceRepo.find({
            where: { isActive: true },
            order: { serviceId: 'ASC' },
        });
    }
    async getServicesByProduct(productId) {
        return await this.serviceRepo.find({
            where: { productId, isActive: true },
            order: { serviceId: 'ASC' },
        });
    }
    async getAllServicesList(page, limit, search, status) {
        const skip = (page - 1) * limit;
        const qb = this.serviceRepo.createQueryBuilder('service');
        if (status !== 'All') {
            qb.andWhere('service.isActive = :isActive', { isActive: status === 'Active' });
        }
        if (search) {
            qb.andWhere('(LOWER(service.name) LIKE :search OR LOWER(service.description) LIKE :search)', { search: `%${search.toLowerCase()}%` });
        }
        qb.orderBy('service.serviceId', 'ASC')
            .skip(skip)
            .take(limit);
        const [data, total] = await qb.getManyAndCount();
        return { data, total };
    }
    async saveServiceMapping({ productId, planId, serviceId, status, }) {
        const existingMapping = await this.mappingserviceRepo.findOne({
            where: { productId, planId, serviceId },
        });
        if (existingMapping) {
            existingMapping.status = status;
            return await this.mappingserviceRepo.save(existingMapping);
        }
        const newMapping = this.mappingserviceRepo.create({
            productId,
            planId,
            serviceId,
            status,
        });
        return await this.mappingserviceRepo.save(newMapping);
    }
    async updateServiceMapping({ productId, planId, serviceId, status, }) {
        const existingMapping = await this.mappingserviceRepo.findOne({
            where: { productId, planId, serviceId },
        });
        if (existingMapping) {
            existingMapping.status = status;
            return await this.mappingserviceRepo.save(existingMapping);
        }
        const newMapping = this.mappingserviceRepo.create({
            productId,
            planId,
            serviceId,
            status,
        });
        return await this.mappingserviceRepo.save(newMapping);
    }
    async getAllMappings(page, limit, search, status, productId, planId) {
        const skip = (page - 1) * limit;
        const query = this.mappingserviceRepo
            .createQueryBuilder('mapping')
            .leftJoin('mapping.plan', 'plan')
            .leftJoin('mapping.product', 'product')
            .where('mapping.isDeleted = false');
        if (search) {
            query.andWhere('LOWER(plan.plan_name) LIKE :search', { search: `%${search.toLowerCase()}%` });
        }
        if (status === 'Active')
            query.andWhere('mapping.status = true');
        else if (status === 'Inactive')
            query.andWhere('mapping.status = false');
        if (productId)
            query.andWhere('mapping.productId = :productId', { productId });
        if (planId)
            query.andWhere('mapping.planId = :planId', { planId });
        const dataQuery = query
            .select([
            'plan.plan_id AS "planId"',
            'plan.plan_name AS "planName"',
            'product.product_id AS "productId"',
            'product.name AS "productName"',
            'COUNT(mapping.mappingId) AS "totalServices"',
            'SUM(CASE WHEN mapping.status = true THEN 1 ELSE 0 END) AS "enabledServices"',
        ])
            .groupBy('plan.plan_id, plan.plan_name, product.product_id, product.name')
            .orderBy('plan.plan_name', 'ASC')
            .offset(skip)
            .limit(limit);
        const data = await dataQuery.getRawMany();
        const totalQuery = this.mappingserviceRepo
            .createQueryBuilder('mapping')
            .leftJoin('mapping.plan', 'plan')
            .where('mapping.isDeleted = false');
        if (search)
            totalQuery.andWhere('LOWER(plan.plan_name) LIKE :search', { search: `%${search.toLowerCase()}%` });
        if (status === 'Active')
            totalQuery.andWhere('mapping.status = true');
        else if (status === 'Inactive')
            totalQuery.andWhere('mapping.status = false');
        if (productId)
            totalQuery.andWhere('mapping.productId = :productId', { productId });
        if (planId)
            totalQuery.andWhere('mapping.planId = :planId', { planId });
        const total = (await totalQuery
            .select('plan.plan_id')
            .groupBy('plan.plan_id')
            .getRawMany()).length;
        const mappedData = data.map(d => ({
            planId: d.planId,
            planName: d.planName,
            productId: d.productId,
            productName: d.productName,
            totalServices: Number(d.totalServices),
            enabledServices: Number(d.enabledServices),
        }));
        return { data: mappedData, total };
    }
    async getServiceMappingsByPlan(planId) {
        try {
            const mappings = await this.mappingserviceRepo.find({
                where: { planId, isDeleted: false },
                relations: ['service', 'plan'],
                order: { mappingId: 'ASC' },
            });
            return mappings.map((m) => ({
                mappingId: m.mappingId,
                productId: m.productId,
                planId: m.planId,
                serviceId: m.serviceId,
                serviceName: m.service?.name,
                planName: m.plan?.plan_name,
                status: m.status ? 'Enabled' : 'Disabled',
            }));
        }
        catch (error) {
            console.error('Error in getServiceMappingsByPlan:', error);
            throw new common_1.HttpException('Failed to fetch service mappings', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.ServicesService = ServicesService;
exports.ServicesService = ServicesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(services_entity_1.Service)),
    __param(1, (0, typeorm_1.InjectRepository)(plan_services_mapping_entity_1.PlanServiceMapping)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ServicesService);
