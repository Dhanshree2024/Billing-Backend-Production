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
exports.OrganizationHolidaysScript = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let OrganizationHolidaysScript = class OrganizationHolidaysScript {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    async OrganizationHolidaysTable(schemaName) {
        try {
            await this.dataSource.query(`
        
            CREATE TABLE IF NOT EXISTS ${schemaName}.organization_holidays (
                holiday_id SERIAL PRIMARY KEY,
                organization_id integer NOT NULL,
                year integer NOT NULL DEFAULT EXTRACT(year FROM CURRENT_DATE),
                holiday_year character varying COLLATE pg_catalog."default",
                holidays jsonb NOT NULL,
                is_active boolean DEFAULT true,
                is_deleted boolean DEFAULT false,
                created_by integer,
                created_at timestamp without time zone DEFAULT now(),
                updated_at timestamp without time zone DEFAULT now(),
                branches jsonb,
                CONSTRAINT organization_holidays_created_by_fkey FOREIGN KEY (created_by)
                    REFERENCES ${schemaName}.users (user_id) MATCH SIMPLE
                    ON UPDATE CASCADE
                    ON DELETE CASCADE,
                CONSTRAINT organization_holidays_organization_id_fkey FOREIGN KEY (organization_id)
                    REFERENCES ${schemaName}.organizational_profile (organization_profile_id) MATCH SIMPLE
                    ON UPDATE CASCADE
                    ON DELETE CASCADE
               
               
            );
      `);
            console.log(`Table ${schemaName}.organization_holidays created successfully.`);
        }
        catch (error) {
            console.error(`Error creating organization_holidays table in schema ${schemaName}:`, error);
            throw new Error(`Failed to create organization_holidays table in schema ${schemaName}.`);
        }
    }
};
exports.OrganizationHolidaysScript = OrganizationHolidaysScript;
exports.OrganizationHolidaysScript = OrganizationHolidaysScript = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [typeorm_2.DataSource])
], OrganizationHolidaysScript);
