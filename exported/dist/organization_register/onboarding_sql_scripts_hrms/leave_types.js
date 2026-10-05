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
exports.LeaveTypesScript = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let LeaveTypesScript = class LeaveTypesScript {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    async createLeaveTypesTable(schemaName) {
        try {
            await this.dataSource.query(`
        
            CREATE TABLE IF NOT EXISTS ${schemaName}.leave_types (
                leave_type_id SERIAL PRIMARY KEY,
                name character varying(100) COLLATE pg_catalog."default" NOT NULL,
                short_code character varying(20) COLLATE pg_catalog."default" NOT NULL,
                color_tag character varying(10) COLLATE pg_catalog."default",
                category character varying(20) COLLATE pg_catalog."default",
                created_at timestamp without time zone DEFAULT now(),
                is_deleted boolean DEFAULT false,
                is_active boolean DEFAULT true,
                limited_period boolean DEFAULT false,
                valid_from date,
                expires_on date
                
               
            );
      `);
            await this.dataSource.query(`
        INSERT INTO ${schemaName}.leave_types (name, short_code, color_tag, category)
        VALUES 
          ('Loss of Pay', 'LOP', '#FF0000', 'Unpaid'),
          ('Sick Leave', 'SL', '#00BFFF', 'Paid'),
          ('Casual Leave', 'CL', '#32CD32', 'Paid'),
          ('Floater Leave', 'FL', '#32CD32', 'Paid')
        ON CONFLICT DO NOTHING;
      `);
            console.log(`Table ${schemaName}.leave_types created successfully.`);
        }
        catch (error) {
            console.error(`Error creating leave_types table in schema ${schemaName}:`, error);
            throw new Error(`Failed to create leave_types table in schema ${schemaName}.`);
        }
    }
};
exports.LeaveTypesScript = LeaveTypesScript;
exports.LeaveTypesScript = LeaveTypesScript = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [typeorm_2.DataSource])
], LeaveTypesScript);
