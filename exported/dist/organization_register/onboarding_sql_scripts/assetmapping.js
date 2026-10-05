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
exports.AssetMappingRelations = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let AssetMappingRelations = class AssetMappingRelations {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    async createAssetMappingRelationsTable(schemaName) {
        await this.dataSource.query(`
            
                        CREATE TABLE IF NOT EXISTS ${schemaName}.asset_mapping
            (
                mapping_id SERIAL PRIMARY KEY,
                asset_id integer,
                system_code text COLLATE pg_catalog."default",
                mapping_type integer DEFAULT 0,
                asset_used_by integer,
                asset_managed_by integer,
                branch_id integer,
                status_type_id integer,
                description text COLLATE pg_catalog."default",
                department_id integer,
                reallocation_mapping_id integer,
                created_by integer,
                updated_by integer,
                created_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
                is_active smallint NOT NULL DEFAULT 1,
                is_deleted smallint NOT NULL DEFAULT 0,
                quantity integer,
                unique_id text COLLATE pg_catalog."default",
                stock_id integer,
                
                CONSTRAINT asset_mapping_asset_id_fkey FOREIGN KEY (asset_id)
                    REFERENCES ${schemaName}.assets (asset_id) MATCH SIMPLE
                    ON UPDATE NO ACTION
                    ON DELETE NO ACTION,
                CONSTRAINT asset_mapping_branch_id_fkey FOREIGN KEY (branch_id)
                    REFERENCES ${schemaName}.branches (branch_id) MATCH SIMPLE
                    ON UPDATE NO ACTION
                    ON DELETE NO ACTION,
                CONSTRAINT asset_mapping_created_by_fkey FOREIGN KEY (created_by)
                    REFERENCES ${schemaName}.users (user_id) MATCH SIMPLE
                    ON UPDATE NO ACTION
                    ON DELETE NO ACTION,
                CONSTRAINT asset_mapping_department_id_fkey FOREIGN KEY (department_id)
                    REFERENCES ${schemaName}.departments (department_id) MATCH SIMPLE
                    ON UPDATE NO ACTION
                    ON DELETE NO ACTION,
                CONSTRAINT asset_mapping_managed_by_fkey FOREIGN KEY (asset_managed_by)
                    REFERENCES ${schemaName}.users (user_id) MATCH SIMPLE
                    ON UPDATE NO ACTION
                    ON DELETE NO ACTION,
                CONSTRAINT asset_mapping_reallocation_mapping_id_fkey FOREIGN KEY (reallocation_mapping_id)
                    REFERENCES ${schemaName}.asset_mapping (mapping_id) MATCH SIMPLE
                    ON UPDATE NO ACTION
                    ON DELETE NO ACTION,
                CONSTRAINT asset_mapping_status_id_fkey FOREIGN KEY (status_type_id)
                    REFERENCES ${schemaName}.asset_status_types (status_type_id) MATCH SIMPLE
                    ON UPDATE NO ACTION
                    ON DELETE NO ACTION,
                CONSTRAINT asset_mapping_updated_by_fkey FOREIGN KEY (updated_by)
                    REFERENCES ${schemaName}.users (user_id) MATCH SIMPLE
                    ON UPDATE NO ACTION
                    ON DELETE NO ACTION,
                CONSTRAINT asset_mapping_used_by_fkey FOREIGN KEY (asset_used_by)
                    REFERENCES ${schemaName}.users (user_id) MATCH SIMPLE
                    ON UPDATE NO ACTION
                    ON DELETE NO ACTION,
                CONSTRAINT stockidfkey FOREIGN KEY (stock_id)
                    REFERENCES ${schemaName}.stocks (stock_id) MATCH SIMPLE
                    ON UPDATE NO ACTION
                    ON DELETE NO ACTION
            )
        `);
    }
};
exports.AssetMappingRelations = AssetMappingRelations;
exports.AssetMappingRelations = AssetMappingRelations = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [typeorm_2.DataSource])
], AssetMappingRelations);
