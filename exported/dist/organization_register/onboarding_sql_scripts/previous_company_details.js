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
exports.UsersPerviousCompanyDetailsScript = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let UsersPerviousCompanyDetailsScript = class UsersPerviousCompanyDetailsScript {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    async createUsersPerviousCompanyDetailsTable(schemaName) {
        await this.dataSource.query(`
            
            CREATE TABLE IF NOT EXISTS ${schemaName}.previous_company_details (
               
                previous_company_details_id SERIAL PRIMARY KEY, -- Auto-incrementing primary key
                user_id INT NOT NULL, -- Foreign key referencing users
                company_name VARCHAR(255) NOT NULL, -- Name of the previous company
                joining_date DATE NOT NULL, -- Joining date at the previous company
                leave_date DATE NOT NULL, -- Leaving date from the previous company
                role VARCHAR(255), -- Role held at the previous company
                total_experience INTERVAL NOT NULL, -- Total experience in years and months
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Record creation timestamp
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Last update timestamp
                is_active BOOLEAN DEFAULT TRUE, -- Indicates if the record is active
                is_deleted BOOLEAN DEFAULT FALSE, -- Indicates if the record is deleted
                CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES ${schemaName}.users (user_id) ON DELETE CASCADE -- Foreign key constraint
            
             );

        `);
    }
};
exports.UsersPerviousCompanyDetailsScript = UsersPerviousCompanyDetailsScript;
exports.UsersPerviousCompanyDetailsScript = UsersPerviousCompanyDetailsScript = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [typeorm_2.DataSource])
], UsersPerviousCompanyDetailsScript);
