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
exports.ManualAttendanceScript = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let ManualAttendanceScript = class ManualAttendanceScript {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    async createManualAttendanceTable(schemaName) {
        try {
            await this.dataSource.query(`
        
            CREATE TABLE IF NOT EXISTS ${schemaName}.manual_attendance_requests (
                id SERIAL PRIMARY KEY,
                date DATE NOT NULL DEFAULT CURRENT_DATE,
                clock_in TIMESTAMP WITH TIME ZONE,
                clock_out TIMESTAMP WITH TIME ZONE,
                work_hours VARCHAR(255),
                reason TEXT,
                status VARCHAR(20) DEFAULT 'pending',
                requested_to INTEGER NOT NULL,
                requested_by INTEGER NOT NULL,
                attendance_record_id INTEGER,
                remarks text,
                cancellation_reason text,
                is_active BOOLEAN DEFAULT TRUE,
                is_deleted BOOLEAN DEFAULT FALSE,
                created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (requested_to) REFERENCES ${schemaName}.users(user_id) ON DELETE CASCADE,
                FOREIGN KEY (requested_by) REFERENCES ${schemaName}.users(user_id) ON DELETE CASCADE,
                FOREIGN KEY (attendance_record_id) REFERENCES ${schemaName}.attendance(id) ON DELETE CASCADE
            );
      `);
            console.log(`Table ${schemaName}.resignation_requests created successfully.`);
        }
        catch (error) {
            console.error(`Error creating resignation_requests table in schema ${schemaName}:`, error);
            throw new Error(`Failed to create resignation_requests table in schema ${schemaName}.`);
        }
    }
};
exports.ManualAttendanceScript = ManualAttendanceScript;
exports.ManualAttendanceScript = ManualAttendanceScript = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [typeorm_2.DataSource])
], ManualAttendanceScript);
