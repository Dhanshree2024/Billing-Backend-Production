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
exports.UsersBenefitsScript = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let UsersBenefitsScript = class UsersBenefitsScript {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    async createUsersBenefitsTable(schemaName) {
        await this.dataSource.query(`
            
            CREATE TABLE IF NOT EXISTS ${schemaName}.users_benefits (
                users_benefits_id SERIAL PRIMARY KEY,
                user_id INT NOT NULL,             -- References the employee
                addhar_card_no BIGINT,
                is_covered_under_pf BOOLEAN ,
                uan_number VARCHAR(50),
                pf_member_id VARCHAR(50),
                pf_join_date DATE,
                family_pf_no VARCHAR(50),
                is_covered_under_esic BOOLEAN ,
                insurance_number VARCHAR(50),
                is_covered_under_lwf BOOLEAN ,
                lwf_number VARCHAR(50),
                policy_type VARCHAR(255)  NULL,
                policy_no VARCHAR(50)  NULL,
                policy_coverage VARCHAR(255),
                policy_period VARCHAR(255),
                sum_insured DECIMAL(18, 2),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                is_active BOOLEAN DEFAULT TRUE,
                is_delete BOOLEAN DEFAULT FALSE,
                CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES ${schemaName}.users (user_id) ON DELETE CASCADE -- Foreign key constraint

            );

        `);
    }
};
exports.UsersBenefitsScript = UsersBenefitsScript;
exports.UsersBenefitsScript = UsersBenefitsScript = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [typeorm_2.DataSource])
], UsersBenefitsScript);
