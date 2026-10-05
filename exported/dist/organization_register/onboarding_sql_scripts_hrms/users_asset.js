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
exports.UsersAssetScript = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let UsersAssetScript = class UsersAssetScript {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    async createUsersAssetTable(schemaName) {
        await this.dataSource.query(`
            
            CREATE TABLE IF NOT EXISTS ${schemaName}.users_assets (
                asset_id SERIAL PRIMARY KEY,                        -- Auto-incrementing primary key for each asset
                user_id INT NOT NULL,         -- Unique identifier for the asset (non-primary key)
                asset_name VARCHAR(255) NOT NULL,             -- Name of the asset
                asset_type VARCHAR(255) NULL,
                assigned_by INT NOT NULL,                     -- User ID of the person who assigned the asset
                assigned_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Date and time when the asset was assigned
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Last updated timestamp
                is_active BOOLEAN DEFAULT TRUE,               -- Indicates if the asset is active (true) or inactive (false)
                is_deleted BOOLEAN DEFAULT FALSE,             -- Indicates if the asset is deleted (true) or not (false)
                CONSTRAINT fk_assigned_by FOREIGN KEY (assigned_by) REFERENCES ${schemaName}.users(user_id) ON DELETE CASCADE, -- Assuming there's a 'users' table where 'user_id' exists
                CONSTRAINT fk_auser_id FOREIGN KEY (user_id) REFERENCES ${schemaName}.users(user_id) ON DELETE CASCADE -- Assuming there's a 'users' table where 'user_id' exists

            );

        `);
    }
};
exports.UsersAssetScript = UsersAssetScript;
exports.UsersAssetScript = UsersAssetScript = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [typeorm_2.DataSource])
], UsersAssetScript);
