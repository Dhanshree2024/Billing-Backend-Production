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
exports.CompOffRequestsScript = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let CompOffRequestsScript = class CompOffRequestsScript {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    async createCompOffRequestsTable(schemaName) {
        await this.dataSource.query(`
      CREATE TABLE IF NOT EXISTS ${schemaName}.comp_off_requests (
        comp_off_id SERIAL PRIMARY KEY,
        employee_id INT NOT NULL REFERENCES ${schemaName}.users(user_id),
        work_date DATE NOT NULL,
        unit VARCHAR,
        duration VARCHAR,
        start_time VARCHAR,
        end_time VARCHAR,
        expiry_date DATE,
        reason TEXT,
        remark TEXT,
        status VARCHAR DEFAULT 'PENDING',
        approved_by INT REFERENCES ${schemaName}.users(user_id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        created_by INT REFERENCES ${schemaName}.users(user_id),
        is_active BOOLEAN DEFAULT TRUE,
        is_deleted BOOLEAN DEFAULT FALSE,
        approved_on TIMESTAMP,
        cancelled_by INT REFERENCES ${schemaName}.users(user_id),
        cancelled_on TIMESTAMP,
        updated_at TIMESTAMP
      );
    `);
    }
};
exports.CompOffRequestsScript = CompOffRequestsScript;
exports.CompOffRequestsScript = CompOffRequestsScript = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [typeorm_2.DataSource])
], CompOffRequestsScript);
