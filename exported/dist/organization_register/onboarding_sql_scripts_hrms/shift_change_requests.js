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
exports.ShiftChangeRequestsScript = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let ShiftChangeRequestsScript = class ShiftChangeRequestsScript {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    async createShiftChangeRequestsTable(schemaName) {
        try {
            await this.dataSource.query(`
                CREATE TABLE IF NOT EXISTS ${schemaName}.shift_change_requests (
 
                shift_change_request_id SERIAL PRIMARY KEY,
                employee_id integer NOT NULL,
                request_type character varying(50) COLLATE pg_catalog."default",
                target_employee_id integer,
                current_shift_rule_id integer,
                requested_rule_id integer,
                requested_start_date date NOT NULL,
                requested_end_date date,
                requested_weekoff_days text[] COLLATE pg_catalog."default",
                reason text COLLATE pg_catalog."default" NOT NULL,
                is_confirmed_by_peer boolean DEFAULT false,
                status character varying(20) COLLATE pg_catalog."default" NOT NULL DEFAULT 'pending'::character varying,
                attendance_manager_id integer,
                reviewed_by integer,
                reviewed_at timestamp without time zone,
                review_remarks text COLLATE pg_catalog."default",
                created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
                updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
                is_active boolean DEFAULT true,
                is_deleted boolean DEFAULT false,
                CONSTRAINT fk_current_rule FOREIGN KEY (current_shift_rule_id)
                    REFERENCES ${schemaName}.shift_rulesets (shift_rulesets_id) MATCH SIMPLE
                    ON UPDATE NO ACTION
                    ON DELETE CASCADE,
                CONSTRAINT fk_employee FOREIGN KEY (employee_id)
                    REFERENCES ${schemaName}.users (user_id) MATCH SIMPLE
                    ON UPDATE NO ACTION
                    ON DELETE CASCADE,
                CONSTRAINT fk_target_employee FOREIGN KEY (target_employee_id)
                    REFERENCES ${schemaName}.users (user_id) MATCH SIMPLE
                    ON UPDATE NO ACTION
                    ON DELETE CASCADE,
                CONSTRAINT shift_change_requests_status_check CHECK (status::text = ANY (ARRAY['pending'::character varying, 'approved'::character varying, 'rejected'::character varying, 'cancelled'::character varying]::text[]))

            
        );
      `);
            console.log(`Table ${schemaName}.shift_change_requests created successfully.`);
        }
        catch (error) {
            console.error(`Error creating shift_change_requests table in schema ${schemaName}:`, error);
            throw new Error(`Failed to create shift_change_requests table in schema ${schemaName}.`);
        }
    }
};
exports.ShiftChangeRequestsScript = ShiftChangeRequestsScript;
exports.ShiftChangeRequestsScript = ShiftChangeRequestsScript = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [typeorm_2.DataSource])
], ShiftChangeRequestsScript);
