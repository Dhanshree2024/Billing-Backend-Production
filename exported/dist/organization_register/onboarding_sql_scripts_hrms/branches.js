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
exports.BranchesScript = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let BranchesScript = class BranchesScript {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    async createBranchesTable(schemaName) {
        await this.dataSource.query(`
            
            CREATE TABLE IF NOT EXISTS ${schemaName}.branches (
                branch_id SERIAL PRIMARY KEY, -- Primary Key with auto-increment
                branchname VARCHAR(255) NOT NULL,
                branchsortname VARCHAR(255) NOT NULL,
                branchContactno VARCHAR(10),
                branchEmail VARCHAR(255),
                branchAddressStreet VARCHAR(255),
                branchAddressLandmark VARCHAR(255),
                branchAddressCity VARCHAR(100),
                branchAddressState VARCHAR(100),
                branchAddressPincode VARCHAR(20),
                branchAddressCountry VARCHAR(100),
                gstin VARCHAR(15),
                establishdate DATE,
                telephone_number VARCHAR(20), -- Added Telephone Number
                branch_latitude DECIMAL(10, 7),
                branch_longitude DECIMAL(10, 7),
                
                users_first_name VARCHAR(100) NOT NULL,
                users_middle_name VARCHAR(100),
                users_last_name VARCHAR(100),
                phone_number VARCHAR(15) NOT NULL,
                alternative_number VARCHAR(15),
                users_business_email VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Record Creation Timestamp
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Last Update Timestamp
                is_active BOOLEAN DEFAULT TRUE,
                is_delete BOOLEAN DEFAULT FALSE,
                is_primary BOOLEAN DEFAULT FALSE



            );

        `);
    }
};
exports.BranchesScript = BranchesScript;
exports.BranchesScript = BranchesScript = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [typeorm_2.DataSource])
], BranchesScript);
