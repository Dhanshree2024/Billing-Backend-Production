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
exports.MisconductReasonsScript = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let MisconductReasonsScript = class MisconductReasonsScript {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    async createMisconductReasonsTable(schemaName) {
        try {
            await this.dataSource.query(`
        CREATE TABLE IF NOT EXISTS ${schemaName}.misconduct_reasons (
            misconduct_reasons_id SERIAL PRIMARY KEY,
            misconduct_reasons_name VARCHAR(255) NOT NULL UNIQUE,
            description TEXT NOT NULL,
            is_active BOOLEAN DEFAULT TRUE,
            is_delete BOOLEAN DEFAULT FALSE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);
            console.log(`Table ${schemaName}.misconduct_reasons created successfully.`);
            await this.dataSource.query(`
        INSERT INTO ${schemaName}.misconduct_reasons (misconduct_reasons_name, description)
        VALUES 
        ('Employee Misconduct', 'Any fraudulent activities'),
        ('Harassment', 'Physical violence or attack against another person'),
        ('Discrimination', 'Serious insubordination'),
        ('Absenteeism', 'Lack of care for duties (gross negligence)'),
        ('Poor Work Performance', 'Misuse of confidential information'),
        ('Workplace Bullying', 'Offering or accepting bribes'),
        ('Tardiness', 'Damage to company property');
      `);
            console.log('misconduct reasons inserted successfully.');
        }
        catch (error) {
            console.error(`Error creating misconduct reasons table in schema ${schemaName}:`, error);
            throw new Error(`Failed to create misconduct reasons table in schema ${schemaName}.`);
        }
    }
};
exports.MisconductReasonsScript = MisconductReasonsScript;
exports.MisconductReasonsScript = MisconductReasonsScript = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [typeorm_2.DataSource])
], MisconductReasonsScript);
