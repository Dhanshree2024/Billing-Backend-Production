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
exports.DisciplinaryActionStatusesScript = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let DisciplinaryActionStatusesScript = class DisciplinaryActionStatusesScript {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    async createDisciplinaryActionStatusesTable(schemaName) {
        try {
            await this.dataSource.query(`
        CREATE TABLE IF NOT EXISTS ${schemaName}.disciplinary_action_statuses (
            disciplinary_action_status_id SERIAL PRIMARY KEY,
            disciplinary_action_status_name VARCHAR(255) NOT NULL UNIQUE,
            is_active BOOLEAN DEFAULT TRUE,
            is_delete BOOLEAN DEFAULT FALSE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);
            console.log(`Table ${schemaName}.disciplinary_action_statuses created successfully.`);
            await this.dataSource.query(`
        INSERT INTO ${schemaName}.disciplinary_action_statuses (disciplinary_action_status_name)
        VALUES 
        
        ('Draft'),
        ('Initiated'),
        ('Under Investigation'),
        ('Decision Pending'),
        ('Action Taken'),
        ('Appeal in Progress'),
        ('Resolved');

      `);
            console.log('disciplinary_action_statuses inserted successfully.');
        }
        catch (error) {
            console.error(`Error creating disciplinary_action_statuses table in schema ${schemaName}:`, error);
            throw new Error(`Failed to create disciplinary_action_statuses table in schema ${schemaName}.`);
        }
    }
};
exports.DisciplinaryActionStatusesScript = DisciplinaryActionStatusesScript;
exports.DisciplinaryActionStatusesScript = DisciplinaryActionStatusesScript = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [typeorm_2.DataSource])
], DisciplinaryActionStatusesScript);
