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
exports.ShiftsScript = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let ShiftsScript = class ShiftsScript {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    async createShiftsTable(schemaName) {
        await this.dataSource.query(`
            
            CREATE TABLE IF NOT EXISTS ${schemaName}.shifts (
                shift_id SERIAL PRIMARY KEY, -- Unique shift ID
                shift_name VARCHAR(255) NOT NULL, -- Name of the shift (e.g., Morning, Evening)
                start_time TIME NOT NULL, -- Shift start time
                end_time TIME NOT NULL, -- Shift end time
                break_time INTERVAL, -- Break time duration
                timezone VARCHAR(50), -- Timezone for the shift (e.g., 'UTC', 'EST', etc.)
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Record creation timestamp
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Last update timestamp
                is_active BOOLEAN DEFAULT TRUE, -- Mark shift as active
                is_delete BOOLEAN DEFAULT FALSE -- Mark shift as deleted
            );

        `);
    }
};
exports.ShiftsScript = ShiftsScript;
exports.ShiftsScript = ShiftsScript = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [typeorm_2.DataSource])
], ShiftsScript);
