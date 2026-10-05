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
exports.EmployeeLeaveEntitlementScript = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let EmployeeLeaveEntitlementScript = class EmployeeLeaveEntitlementScript {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    async createEmployeeLeaveEntitlementTable(schemaName) {
        try {
            await this.dataSource.query(`
        CREATE TABLE IF NOT EXISTS ${schemaName}.employee_leave_entitlement (
            
            entitlement_id SERIAL PRIMARY KEY,
            employee_id INTEGER NOT NULL,
            leave_type_id INTEGER NOT NULL,
            year INTEGER NOT NULL,
            entitled_days NUMERIC(5,2) DEFAULT 0,
            used_days NUMERIC(5,2) DEFAULT 0,
            carried_forward_days NUMERIC(5,2) DEFAULT 0,
            encashed_days NUMERIC(5,2) DEFAULT 0,
            lapsed_days NUMERIC(5,2) DEFAULT 0,
            adjusted_days NUMERIC(5,2) DEFAULT 0,
            balance_days NUMERIC(5,2) GENERATED ALWAYS AS 
                ((entitled_days + carried_forward_days - used_days - encashed_days - lapsed_days + adjusted_days)) STORED,
            credit_type character varying(20) COLLATE pg_catalog."default" CHECK (credit_type::text = ANY (ARRAY['auto', 'manual']::text[])),
            is_locked BOOLEAN DEFAULT false,
            created_by INTEGER,
            created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
            updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,

            CONSTRAINT fk_employee FOREIGN KEY (employee_id)
                REFERENCES ${schemaName}.users (user_id) MATCH SIMPLE
                ON UPDATE NO ACTION
                ON DELETE CASCADE,
            CONSTRAINT fk_leave_type FOREIGN KEY (leave_type_id)
                REFERENCES ${schemaName}.leave_types (leave_type_id) MATCH SIMPLE
                ON UPDATE NO ACTION
                ON DELETE CASCADE
        );
      `);
            console.log(`Table ${schemaName}.employee_leave_entitlement created successfully.`);
        }
        catch (error) {
            console.error(`Error creating employee_leave_entitlement table in schema ${schemaName}:`, error);
            throw new Error(`Failed to create employee_leave_entitlement table in schema ${schemaName}.`);
        }
    }
};
exports.EmployeeLeaveEntitlementScript = EmployeeLeaveEntitlementScript;
exports.EmployeeLeaveEntitlementScript = EmployeeLeaveEntitlementScript = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [typeorm_2.DataSource])
], EmployeeLeaveEntitlementScript);
