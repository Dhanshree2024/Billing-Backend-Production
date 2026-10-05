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
exports.LeaveApplicationScript = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let LeaveApplicationScript = class LeaveApplicationScript {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    async createLeaveApplicationTable(schemaName) {
        try {
            await this.dataSource.query(`
        CREATE TABLE IF NOT EXISTS ${schemaName}.leave_application (
          leave_id SERIAL PRIMARY KEY,
          employee_id INTEGER NOT NULL,
          leave_type_id INTEGER NOT NULL,
          start_date DATE NOT NULL,
          end_date DATE NOT NULL,
          total_days NUMERIC(5,2) DEFAULT 0,
          leave_unit VARCHAR(10),
          partial_day_detail JSONB,
          reason TEXT,
          status VARCHAR(20) DEFAULT 'Pending',
          applied_on TIMESTAMP DEFAULT NOW(),
          approved_on TIMESTAMP,
          approver_id INTEGER,
          approval_reason TEXT,
          attachments JSONB,
          workflow_step INTEGER DEFAULT 1,
          is_cancellation_requested BOOLEAN DEFAULT FALSE,
          cancelled_on TIMESTAMP,
          cancelled_by INTEGER,
          leave_source VARCHAR(20) DEFAULT 'web',
          is_active BOOLEAN DEFAULT TRUE,
          is_deleted BOOLEAN DEFAULT FALSE, -- Indicates if the document type is deleted
          created_by INTEGER,
          updated_at TIMESTAMP DEFAULT NOW(),

          CONSTRAINT fk_employee FOREIGN KEY (employee_id)
            REFERENCES ${schemaName}.users(user_id)
            ON DELETE CASCADE ON UPDATE CASCADE,

          CONSTRAINT fk_leave_type FOREIGN KEY (leave_type_id)
            REFERENCES ${schemaName}.leave_types(leave_type_id)
            ON DELETE CASCADE ON UPDATE CASCADE,

          CONSTRAINT fk_approver FOREIGN KEY (approver_id)
            REFERENCES ${schemaName}.users(user_id)
            ON DELETE SET NULL ON UPDATE CASCADE,

          CONSTRAINT fk_cancelled_by FOREIGN KEY (cancelled_by)
            REFERENCES ${schemaName}.users(user_id)
            ON DELETE SET NULL ON UPDATE CASCADE,

          CONSTRAINT fk_created_by FOREIGN KEY (created_by)
            REFERENCES ${schemaName}.users(user_id)
            ON DELETE CASCADE ON UPDATE CASCADE
        );
      `);
            console.log(`Table ${schemaName}.leave_application created successfully.`);
        }
        catch (error) {
            console.error(`Error creating leave_application table in schema ${schemaName}:`, error);
            throw new Error(`Failed to create leave_application table in schema ${schemaName}.`);
        }
    }
};
exports.LeaveApplicationScript = LeaveApplicationScript;
exports.LeaveApplicationScript = LeaveApplicationScript = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [typeorm_2.DataSource])
], LeaveApplicationScript);
