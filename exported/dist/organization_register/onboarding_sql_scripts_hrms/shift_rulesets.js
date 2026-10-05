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
exports.ShiftRulesetsScript = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let ShiftRulesetsScript = class ShiftRulesetsScript {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    async createShiftRulesetsable(schemaName) {
        await this.dataSource.query(`
            
            CREATE TABLE IF NOT EXISTS ${schemaName}.shift_rulesets (
                shift_rulesets_id SERIAL PRIMARY KEY, -- Unique shift ID
                schedule_type integer NOT NULL,
                applicable_shifts jsonb,
                rotation_frequency character varying(20) COLLATE pg_catalog."default",
                start_date date,
                end_date date,
                weekly_off_count integer DEFAULT 0,
                weekly_off_days text[] COLLATE pg_catalog."default",
                created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
                updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
                is_active boolean DEFAULT true,
                is_deleted boolean DEFAULT false,
                rule_name character varying COLLATE pg_catalog."default",
                is_temporary boolean DEFAULT false
            );

        `);
        const result = await this.dataSource.query(`
            SELECT shift_id, shifts_setup_name
            FROM ${schemaName}.shifts_setup
            WHERE shifts_setup_name = 'General Shift'
          `);
        if (result.length > 0) {
            await this.dataSource.query(`
              INSERT INTO ${schemaName}.shift_rulesets (
                schedule_type,
                applicable_shifts,
                rotation_frequency,
                start_date,
                end_date,
                weekly_off_count,
                weekly_off_days,
                rule_name,
                is_temporary
              )
              VALUES (
                1,
                $1,
                'None',
                CURRENT_DATE,
                NULL,
                1,
                ARRAY['Sunday'],
                'Default General RuleSet',
                false
              )
              ON CONFLICT DO NOTHING;
            `, [
                JSON.stringify(result.map((row, index) => ({
                    label: row.shifts_setup_name,
                    value: row.shift_id,
                    preference: index + 1
                })))
            ]);
        }
    }
};
exports.ShiftRulesetsScript = ShiftRulesetsScript;
exports.ShiftRulesetsScript = ShiftRulesetsScript = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [typeorm_2.DataSource])
], ShiftRulesetsScript);
