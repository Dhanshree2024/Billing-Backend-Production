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
exports.OrganizationSetupScript = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let OrganizationSetupScript = class OrganizationSetupScript {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    async createOrganizationSetupTable(schemaName, organizationId) {
        try {
            await this.dataSource.query(`
        CREATE TABLE ${schemaName}.organization_setup (
          organization_setup_id SERIAL PRIMARY KEY,
          organization_id INT NOT NULL,
          pf_settings JSONB DEFAULT '{}'::JSONB,
          lwf_settings JSONB DEFAULT '{}'::JSONB,
          esic_settings JSONB DEFAULT '{}'::JSONB,
          insurance_settings JSONB DEFAULT '{}'::JSONB,
          employee_id_format JSONB DEFAULT '{}'::JSONB,
          attendance_setting JSONB DEFAULT '{}'::JSONB,
          sync_attendance BOOLEAN DEFAULT FALSE,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);
            await this.dataSource.query(`INSERT INTO ${schemaName}.organization_setup (organization_id) VALUES ($1)`, [organizationId]);
            console.log(`Table ${schemaName}.organization_setup created and default record inserted.`);
        }
        catch (error) {
            console.error(`Error creating or inserting into organization_setup table in schema ${schemaName}:`, error);
            throw new Error(`Failed to create or insert into organization_setup table in schema ${schemaName}.`);
        }
    }
};
exports.OrganizationSetupScript = OrganizationSetupScript;
exports.OrganizationSetupScript = OrganizationSetupScript = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [typeorm_2.DataSource])
], OrganizationSetupScript);
