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
exports.AssetOwnershipStatusTypesScript = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let AssetOwnershipStatusTypesScript = class AssetOwnershipStatusTypesScript {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    async createAssetOwnershipStatusTypesTable(schemaName) {
        await this.dataSource.query(`
    DO $$ BEGIN
      CREATE TYPE ${schemaName}.ownership_type_enum AS ENUM ('capex', 'opex');
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;
  `);
        await this.dataSource.query(`
            
           CREATE TABLE IF NOT EXISTS ${schemaName}.asset_ownership_status_types
          (
              ownership_status_type_id SERIAL PRIMARY KEY,
              ownership_status_type_name text COLLATE pg_catalog."default",
              is_active smallint NOT NULL DEFAULT 1,
              is_deleted smallint NOT NULL DEFAULT 0,
              asset_ownership_status_color character varying(10) COLLATE pg_catalog."default",
              ownership_status_description text COLLATE pg_catalog."default",
              created_at timestamp without time zone,
              ownership_status_type ${schemaName}.ownership_type_enum
              
          )
        `);
    }
    async insertAssetOwnershipStatusTable(schemaName, statuses) {
        const statusInsertQuery = `INSERT INTO ${schemaName}.asset_ownership_status_types(ownership_status_type_name)VALUES ($1);`;
        await Promise.all(statuses.map(status => {
            return this.dataSource.query(statusInsertQuery, [status.ownership_status_type_name]);
        }));
    }
};
exports.AssetOwnershipStatusTypesScript = AssetOwnershipStatusTypesScript;
exports.AssetOwnershipStatusTypesScript = AssetOwnershipStatusTypesScript = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [typeorm_2.DataSource])
], AssetOwnershipStatusTypesScript);
