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
exports.EmployeeFloaterLeaveScript = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let EmployeeFloaterLeaveScript = class EmployeeFloaterLeaveScript {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    async createEmployeeFloaterLeaveTable(schemaName) {
        try {
            await this.dataSource.query(`
        CREATE TABLE IF NOT EXISTS ${schemaName}.employee_floater_holidays (
          floater_holiday_id SERIAL PRIMARY KEY,
          
          employee_id INTEGER NOT NULL,
          organization_id INTEGER NOT NULL,
          
          year INTEGER DEFAULT EXTRACT(YEAR FROM CURRENT_DATE),
          holidays JSONB NOT NULL,
          branches JSON,
          holiday_year VARCHAR,
          
          is_active BOOLEAN DEFAULT TRUE,
          is_deleted BOOLEAN DEFAULT FALSE,
          
          created_by INTEGER,
          created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,

          CONSTRAINT fk_employee_user FOREIGN KEY (employee_id)
            REFERENCES ${schemaName}.users (user_id) MATCH SIMPLE
            ON UPDATE NO ACTION
            ON DELETE CASCADE,

          CONSTRAINT fk_organization_profile FOREIGN KEY (organization_id)
            REFERENCES ${schemaName}.organizational_profile (organization_profile_id) MATCH SIMPLE
            ON UPDATE NO ACTION
            ON DELETE CASCADE
        );
      `);
            console.log(`Table ${schemaName}.employee_floater_holidays created successfully.`);
        }
        catch (error) {
            console.error(`Error creating employee_floater_holidays table in schema ${schemaName}:`, error);
            throw new Error(`Failed to create employee_floater_holidays table in schema ${schemaName}.`);
        }
    }
};
exports.EmployeeFloaterLeaveScript = EmployeeFloaterLeaveScript;
exports.EmployeeFloaterLeaveScript = EmployeeFloaterLeaveScript = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [typeorm_2.DataSource])
], EmployeeFloaterLeaveScript);
