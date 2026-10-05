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
exports.AttendanceScript = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let AttendanceScript = class AttendanceScript {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    async createAttendanceTable(schemaName) {
        try {
            await this.dataSource.query(`
        
            CREATE TABLE IF NOT EXISTS ${schemaName}.attendance (

                id SERIAL PRIMARY KEY,
                user_id integer NOT NULL,
                date date NOT NULL DEFAULT CURRENT_DATE,
                clock_in timestamp with time zone,
                clock_out timestamp with time zone,
                work_hours character varying(50) COLLATE pg_catalog."default",
                shift_name character varying(50) COLLATE pg_catalog."default",
                shift_start_time time without time zone,
                shift_end_time time without time zone,
                overtime interval,
                late_arrival interval,
                early_departure interval,
                attendance_status character varying(20) COLLATE pg_catalog."default",
                reason text COLLATE pg_catalog."default",
                check_in_location character varying(255) COLLATE pg_catalog."default",
                check_in_device character varying(50) COLLATE pg_catalog."default",
                supporting_document text COLLATE pg_catalog."default",
                latitude DECIMAL(10, 7),
                longitude DECIMAL(10, 7),
                created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
                is_active boolean DEFAULT true,
                is_deleted boolean DEFAULT false,
                FOREIGN KEY (user_id) REFERENCES ${schemaName}.users(user_id) ON DELETE CASCADE          

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
exports.AttendanceScript = AttendanceScript;
exports.AttendanceScript = AttendanceScript = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [typeorm_2.DataSource])
], AttendanceScript);
