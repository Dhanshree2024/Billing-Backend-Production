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
exports.EmployeeStatusScript = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let EmployeeStatusScript = class EmployeeStatusScript {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    async createEmployeeStatusTable(schemaName) {
        try {
            await this.dataSource.query(`
        CREATE TABLE IF NOT EXISTS ${schemaName}.hiring_status (
          status_id SERIAL PRIMARY KEY,                 -- Unique identifier for the status
          name VARCHAR(50) NOT NULL,                    -- Name of the status (e.g., "Applied", "Onboarding")
          description TEXT,                             -- Additional details about the status
          sequence_number integer,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Timestamp when the status was created
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Last update timestamp
          is_active BOOLEAN DEFAULT TRUE,               -- Indicates if the status is active
          is_deleted BOOLEAN DEFAULT FALSE              -- Soft-delete flag
        );
      `);
            console.log(`Table ${schemaName}.hiring_status created successfully.`);
            await this.dataSource.query(`
        INSERT INTO ${schemaName}.hiring_status (name, description,is_active)
        VALUES 
        ('Applied', 'Candidate has applied for the position.',true),
        ('Interview', 'Candidate has interview for the position.',true),
        ('Offered', 'Candidate has been offered.',true),
        ('Onboarding', 'Candidate is being onboarded.',true),
        ('Reject', 'Candidate is rejected.',true);
      `);
            console.log('Initial statuses inserted successfully.');
        }
        catch (error) {
            console.error(`Error creating hiring_status table in schema ${schemaName}:`, error);
            throw new Error(`Failed to create hiring_status table in schema ${schemaName}.`);
        }
    }
};
exports.EmployeeStatusScript = EmployeeStatusScript;
exports.EmployeeStatusScript = EmployeeStatusScript = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [typeorm_2.DataSource])
], EmployeeStatusScript);
