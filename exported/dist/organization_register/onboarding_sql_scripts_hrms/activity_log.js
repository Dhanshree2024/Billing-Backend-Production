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
exports.ActivityLogScript = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let ActivityLogScript = class ActivityLogScript {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    async createActivityLogTable(schemaName) {
        try {
            await this.dataSource.query(`
        CREATE TABLE IF NOT EXISTS ${schemaName}.activity_log (
            id SERIAL PRIMARY KEY,                     -- Unique identifier for the log entry
            action_type VARCHAR(50) NOT NULL,          -- Type of action (e.g., 'insert', 'update', 'delete')
            affected_table VARCHAR(50) NOT NULL,       -- The table affected (e.g., 'Employee', 'Education', etc.)
            affected_record_id INT NOT NULL,           -- ID of the affected record (e.g., user_id, education_id)
            previous_data JSONB,                       -- JSON data to store both previous 
            data_modified JSONB,    					-- JSON data to current values
            user_id INT NOT NULL,                      -- ID of the user who performed the action
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Timestamp when the log entry is created
        );
      `);
            console.log(`Table ${schemaName}.activity_log created successfully.`);
        }
        catch (error) {
            console.error(`Error creating activity_log table in schema ${schemaName}:`, error);
            throw new Error(`Failed to create activity_log table in schema ${schemaName}.`);
        }
    }
};
exports.ActivityLogScript = ActivityLogScript;
exports.ActivityLogScript = ActivityLogScript = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [typeorm_2.DataSource])
], ActivityLogScript);
