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
exports.ShiftsSetupScript = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let ShiftsSetupScript = class ShiftsSetupScript {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    async createShiftsSetuptable(schemaName) {
        await this.dataSource.query(`
            
            CREATE TABLE IF NOT EXISTS ${schemaName}.shifts_setup (
                shift_id SERIAL PRIMARY KEY, -- Unique shift ID
                shifts_setup_name character varying(255) COLLATE pg_catalog."default" NOT NULL,
                shift_type_id integer,
                shift_color_id integer NOT NULL,
                start_time timestamp with time zone NOT NULL,
                end_time timestamp with time zone NOT NULL,
                break_duration interval NOT NULL,
                total_working_hours integer GENERATED ALWAYS AS ((EXTRACT(epoch FROM (end_time - start_time)) / (3600)::numeric)) STORED,
                late_arrival_grace_period interval NOT NULL,
                early_exit_tolerance interval NOT NULL,
                overtime_eligibility boolean DEFAULT false,
                max_overtime_allowed interval,
                min_overtime_allowed interval,
                shift_notes text COLLATE pg_catalog."default",
                shift_created_by integer,
                created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
                updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
                is_active boolean DEFAULT true,
                is_deleted boolean DEFAULT false,
                shifts_sort_name character varying COLLATE pg_catalog."default",
                CONSTRAINT shifts_setup_shift_color_id_fkey FOREIGN KEY (shift_color_id)
                    REFERENCES public.shift_colors (shift_color_id) MATCH SIMPLE
                    ON UPDATE NO ACTION
                    ON DELETE NO ACTION,
                CONSTRAINT shifts_setup_shift_type_id_fkey FOREIGN KEY (shift_type_id)
                    REFERENCES public.shift_types (shift_type_id) MATCH SIMPLE
                    ON UPDATE NO ACTION
                    ON DELETE NO ACTION
                
            );

        `);
        await this.dataSource.query(`
                INSERT INTO ${schemaName}.shifts_setup (
                shifts_setup_name,
                shift_type_id,
                shift_color_id,
                start_time,
                end_time,
                break_duration,
                late_arrival_grace_period,
                early_exit_tolerance,
                overtime_eligibility,
                max_overtime_allowed,
                min_overtime_allowed,
                shift_notes,
                shift_created_by,
                shifts_sort_name
                )
                VALUES (
                'General Shift',         -- Shift name
                1,                       -- Assuming shift_type_id 1 = General
                1,                       -- Assuming shift_color_id 1 = Default color
                '2025-01-01 09:00:00+05:30', -- Start time
                '2025-01-01 18:00:00+05:30', -- End time
                '01:00:00',              -- Break duration
                '00:15:00',              -- Late arrival grace
                '00:10:00',              -- Early exit tolerance
                true,                    -- Overtime eligible
                '02:00:00',              -- Max overtime
                '00:30:00',              -- Min overtime
                'Default general shift for all employees',
                1,                       -- Created by user ID (e.g., admin)
                'GEN'                    -- Sort name
                )
                ON CONFLICT DO NOTHING; -- Prevent duplicate insert if already exists
            `);
    }
};
exports.ShiftsSetupScript = ShiftsSetupScript;
exports.ShiftsSetupScript = ShiftsSetupScript = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [typeorm_2.DataSource])
], ShiftsSetupScript);
