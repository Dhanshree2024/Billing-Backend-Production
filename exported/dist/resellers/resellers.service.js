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
exports.ResellersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const location_util_1 = require("../location/utils/location.util");
const typeorm_2 = require("typeorm");
const reseller_entity_1 = require("./entity/reseller.entity");
let ResellersService = class ResellersService {
    constructor(resellerRepo) {
        this.resellerRepo = resellerRepo;
    }
    async getAllResellers(page, limit, search, status) {
        try {
            const qb = this.resellerRepo.createQueryBuilder('reseller');
            qb.where('reseller.is_deleted = :deleted', { deleted: false });
            if (status === 'Active') {
                qb.andWhere('reseller.is_active = :active', { active: true });
            }
            else if (status === 'Inactive') {
                qb.andWhere('reseller.is_active = :active', { active: false });
            }
            if (search) {
                qb.andWhere('(LOWER(reseller.company_name) LIKE :search OR LOWER(reseller.primary_contact_first_name) LIKE :search OR LOWER(reseller.primary_contact_last_name) LIKE :search)', { search: `%${search.toLowerCase()}%` });
            }
            qb.skip((page - 1) * limit).take(limit);
            qb.orderBy('reseller.reseller_id', 'ASC');
            const [data, total] = await qb.getManyAndCount();
            return { data, total };
        }
        catch (error) {
            console.error('Error fetching resellers:', error);
            throw new Error('Failed to fetch resellers');
        }
    }
    buildQuery(search, status) {
        const qb = this.resellerRepo.createQueryBuilder('reseller');
        qb.where('reseller.is_deleted = :deleted', {
            deleted: false,
        });
        if (status === 'Active') {
            qb.andWhere('reseller.is_active = :active', {
                active: true,
            });
        }
        else if (status === 'Inactive') {
            qb.andWhere('reseller.is_active = :active', {
                active: false,
            });
        }
        if (search?.trim()) {
            qb.andWhere(`(
        LOWER(reseller.company_name) LIKE :search
        OR LOWER(reseller.primary_contact_first_name) LIKE :search
        OR LOWER(reseller.primary_contact_last_name) LIKE :search
      )`, {
                search: `%${search.toLowerCase()}%`,
            });
        }
        return qb;
    }
    async exportResellers(search, status) {
        try {
            const qb = this.buildQuery(search, status);
            qb.orderBy('reseller.reseller_id', 'ASC');
            return await qb.getMany();
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to export resellers');
        }
    }
    async generateResellerCode() {
        const lastReseller = await this.resellerRepo
            .createQueryBuilder('r')
            .where('r.reseller_code IS NOT NULL')
            .orderBy("CAST(REGEXP_REPLACE(r.reseller_code, '[^0-9]', '', 'g') AS INTEGER)", 'DESC')
            .limit(1)
            .getOne();
        let nextNumber = 1;
        if (lastReseller?.reseller_code) {
            const currentNumber = parseInt(lastReseller.reseller_code.replace(/\D/g, ''), 10);
            if (!isNaN(currentNumber)) {
                nextNumber = currentNumber + 1;
            }
        }
        return `RES-${String(nextNumber).padStart(3, '0')}`;
    }
    async create(dto) {
        const resellerCode = await this.generateResellerCode();
        const reseller = this.resellerRepo.create({
            reseller_name: dto.reseller_name,
            contact_first_name: dto.contact_first_name,
            contact_last_name: dto.contact_last_name,
            email: dto.email,
            phone_number: dto.phone_number,
            payment_term: dto.payment_term ?? null,
            gst_registered: dto.gst_registered ?? false,
            gst_number: dto.gst_number ?? null,
            is_active: dto.is_active ?? true,
            is_deleted: dto.is_deleted ?? false,
            payment_status: dto.payment_status ?? null,
            reseller_code: resellerCode,
            pan_number: dto.pan_number,
            address_line1: dto.address_line1 ?? null,
            address_line2: dto.address_line2 ?? null,
            country: dto.country ?? null,
            state: dto.state ?? null,
            city: dto.city ?? null,
            postal_code: dto.postal_code ?? null,
        });
        return await this.resellerRepo.save(reseller);
    }
    async update(id, dto) {
        const reseller = await this.resellerRepo.findOneBy({ reseller_id: id });
        if (!reseller) {
            throw new Error('Reseller not found');
        }
        reseller.reseller_name = dto.reseller_name ?? reseller.reseller_name;
        reseller.contact_first_name =
            dto.contact_first_name ?? reseller.contact_first_name;
        reseller.contact_last_name =
            dto.contact_last_name ?? reseller.contact_last_name;
        reseller.email = dto.email ?? reseller.email;
        reseller.phone_number = dto.phone_number ?? reseller.phone_number;
        reseller.is_active = dto.is_active ?? reseller.is_active;
        reseller.is_deleted = dto.is_deleted ?? reseller.is_deleted;
        reseller.industry_id = dto.industry_id ?? reseller.industry_id;
        reseller.payment_term = dto.payment_term ?? reseller.payment_term;
        reseller.gst_registered = dto.gst_registered ?? reseller.gst_registered;
        reseller.gst_number = dto.gst_number ?? reseller.gst_number;
        reseller.payment_status = dto.payment_status ?? reseller.payment_status;
        reseller.pan_number = dto.pan_number ?? reseller.pan_number;
        reseller.address_line1 = dto.address_line1 ?? reseller.address_line1;
        reseller.address_line2 = dto.address_line2 ?? reseller.address_line2;
        reseller.country = dto.country ?? reseller.country;
        reseller.state = dto.state ?? reseller.state;
        reseller.city = dto.city ?? reseller.city;
        reseller.postal_code = dto.postal_code ?? reseller.postal_code;
        return await this.resellerRepo.save(reseller);
    }
    async getSingleReseller(id) {
        const reseller = await this.resellerRepo.findOne({
            where: { reseller_id: id, is_deleted: false },
            relations: ['industry'],
        });
        if (!reseller) {
            return null;
        }
        return {
            ...reseller,
            ...location_util_1.LocationUtil.getLocationDetails(reseller),
        };
    }
    async deleteReseller(id) {
        const reseller = await this.resellerRepo.findOneBy({ reseller_id: id });
        if (!reseller) {
            throw new Error('Reseller not found');
        }
        reseller.is_active = false;
        reseller.is_deleted = true;
        return await this.resellerRepo.save(reseller);
    }
    async getResellerDropdown() {
        const data = await this.resellerRepo.find({
            select: ['reseller_id', 'reseller_name'],
            where: { is_deleted: false },
            order: { reseller_name: 'ASC' },
        });
        console.log('🔍 Reseller DB result:', data);
        return data;
    }
    async updatePaymentStatus(dto) {
        const reseller = await this.resellerRepo.findOne({
            where: {
                reseller_id: dto.reseller_id,
            },
        });
        if (!reseller) {
            throw new common_1.NotFoundException('Reseller not found');
        }
        reseller.payment_status = dto.payment_status;
        await this.resellerRepo.save(reseller);
        return {
            message: 'Payment status updated successfully.',
        };
    }
};
exports.ResellersService = ResellersService;
exports.ResellersService = ResellersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(reseller_entity_1.Reseller)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ResellersService);
