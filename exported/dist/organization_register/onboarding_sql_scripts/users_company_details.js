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
exports.UserCompanyDetailsScript = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let UserCompanyDetailsScript = class UserCompanyDetailsScript {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    async createUserCompanyDetailsTable(schemaName) {
        await this.dataSource.query(`
            CREATE TABLE IF NOT EXISTS ${schemaName}.users_company_details (
                users_company_details_id SERIAL PRIMARY KEY, -- Auto-incrementing primary key
                user_id INT NOT NULL, -- Foreign key referencing users
                employee_id VARCHAR(50) NOT NULL, -- Employee ID
                joining_date DATE NOT NULL, -- Joining Date
                role_id INT NOT NULL, -- Role
                department_id INT NOT NULL, -- Department
                designation_id INT NOT NULL, -- Added Designation ID
                shift_id INT NOT NULL, -- Added Shift ID
                shift VARCHAR(100), -- Shift (optional if shift_id is used)
                salary DECIMAL(15, 2), -- Salary
                is_current BOOLEAN DEFAULT TRUE, -- Indicates if this is the user's current company detail
                start_date DATE, -- Start date of this employment record
                end_date DATE, -- End date of this employment record
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Record creation timestamp
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Last update timestamp
                is_active BOOLEAN DEFAULT TRUE, -- Indicates if the record is active
                is_deleted BOOLEAN DEFAULT FALSE, -- Indicates if the record is deleted,
                CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES ${schemaName}.users (user_id) ON DELETE CASCADE, -- Foreign key constraint
                CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES ${schemaName}.organization_roles (role_id) ON DELETE CASCADE, -- Foreign key constraint for role
                CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES ${schemaName}.departments (department_id) ON DELETE CASCADE, -- Foreign key constraint for department
                CONSTRAINT fk_designation FOREIGN KEY (designation_id) REFERENCES ${schemaName}.designations (designation_id) ON DELETE CASCADE, -- Foreign key constraint for designation
                CONSTRAINT fk_shift FOREIGN KEY (shift_id) REFERENCES ${schemaName}.shifts (shift_id) ON DELETE CASCADE -- Foreign key constraint for shift
            );
        `);
    }
};
exports.UserCompanyDetailsScript = UserCompanyDetailsScript;
exports.UserCompanyDetailsScript = UserCompanyDetailsScript = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [typeorm_2.DataSource])
], UserCompanyDetailsScript);
