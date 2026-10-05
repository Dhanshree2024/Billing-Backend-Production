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
exports.EmployeeDisciplinaryRecordsScript = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let EmployeeDisciplinaryRecordsScript = class EmployeeDisciplinaryRecordsScript {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    async createEmployeeDisciplinaryRecordsTable(schemaName) {
        try {
            await this.dataSource.query(`
        CREATE TABLE IF NOT EXISTS ${schemaName}.employee_disciplinary_records (
            employee_disciplinary_records_id SERIAL PRIMARY KEY,
            employee_id INT NOT NULL,
            misconduct_reasons_id INT NOT NULL,
            disciplinary_actions_id INT NOT NULL,
            disciplinary_action_status_id INT NOT NULL,
            incident_date DATE NOT NULL,
            resolution_date DATE NULL,
            description TEXT NOT NULL,
            comments TEXT NULL,
            initiated_by INT NOT NULL,  -- New Column for tracking who initiated the action
            is_active BOOLEAN DEFAULT TRUE,
            is_delete BOOLEAN DEFAULT FALSE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (employee_id) REFERENCES ${schemaName}.users(user_id) ON DELETE CASCADE,
            FOREIGN KEY (initiated_by) REFERENCES ${schemaName}.users(user_id),
            FOREIGN KEY (misconduct_reasons_id) REFERENCES ${schemaName}.misconduct_reasons(misconduct_reasons_id),
            FOREIGN KEY (disciplinary_actions_id) REFERENCES ${schemaName}.disciplinary_actions(disciplinary_actions_id),
            FOREIGN KEY (disciplinary_action_status_id) REFERENCES ${schemaName}.disciplinary_action_statuses(disciplinary_action_status_id)
        );
      `);
            console.log(`Table ${schemaName}.employee_disciplinary_records created successfully.`);
        }
        catch (error) {
            console.error(`Error creating employee_disciplinary_records table in schema ${schemaName}:`, error);
            throw new Error(`Failed to create employee_disciplinary_records table in schema ${schemaName}.`);
        }
    }
};
exports.EmployeeDisciplinaryRecordsScript = EmployeeDisciplinaryRecordsScript;
exports.EmployeeDisciplinaryRecordsScript = EmployeeDisciplinaryRecordsScript = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [typeorm_2.DataSource])
], EmployeeDisciplinaryRecordsScript);
