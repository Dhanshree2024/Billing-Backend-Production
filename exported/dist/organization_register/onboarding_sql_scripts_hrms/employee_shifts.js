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
exports.EmployeeShiftsScript = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let EmployeeShiftsScript = class EmployeeShiftsScript {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    async createEmployeeShiftsTable(schemaName) {
        try {
            await this.dataSource.query(`
        CREATE TABLE IF NOT EXISTS ${schemaName}.employee_shifts (
            employee_shift_id SERIAL PRIMARY KEY,
            employee_id integer NOT NULL,
            shift_rulesets_id integer,
            effective_from date,
            effective_to date,
            assigned_by integer,
            created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
            updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
            CONSTRAINT employee_shifts_shift_rulesets_id_fkey FOREIGN KEY (shift_rulesets_id)
                REFERENCES ${schemaName}.shift_rulesets (shift_rulesets_id) MATCH SIMPLE
                ON UPDATE NO ACTION
                ON DELETE CASCADE    
           
        );
      `);
            console.log(`Table ${schemaName}.employee_shifts created successfully.`);
        }
        catch (error) {
            console.error(`Error creating employee_shifts table in schema ${schemaName}:`, error);
            throw new Error(`Failed to create employee_shifts table in schema ${schemaName}.`);
        }
    }
};
exports.EmployeeShiftsScript = EmployeeShiftsScript;
exports.EmployeeShiftsScript = EmployeeShiftsScript = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [typeorm_2.DataSource])
], EmployeeShiftsScript);
