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
exports.ItemFieldsScript = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let ItemFieldsScript = class ItemFieldsScript {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    async createItemFieldsTable(schemaName) {
        await this.dataSource.query(`
            
           CREATE TABLE IF NOT EXISTS ${schemaName}.asset_fields
                  (
                      asset_field_id SERIAL PRIMARY KEY,
                      asset_field_name text COLLATE pg_catalog."default",
                      asset_field_description text COLLATE pg_catalog."default",
                      asset_field_label_name text COLLATE pg_catalog."default",
                      asset_field_type_details text COLLATE pg_catalog."default",
                      added_by integer,
                      is_active integer DEFAULT 1,
                      is_deleted integer DEFAULT 0,
                      created_at timestamp without time zone,
                      updated_at timestamp without time zone,
                      asset_field_type text COLLATE pg_catalog."default",
                      is_custom_field boolean,
                      asset_field_category_id integer,
                     
                      CONSTRAINT asset_fields_added_by_fkey FOREIGN KEY (added_by)
                          REFERENCES ${schemaName}.users (user_id) MATCH SIMPLE
                          ON UPDATE NO ACTION
                          ON DELETE NO ACTION
                  )
        `);
    }
    async insertAssetFieldsTable(schemaName, subCategories) {
        const itemInsertQuery = `INSERT INTO ${schemaName}.asset_fields(asset_field_category_id, asset_field_name,asset_field_label_name, asset_field_type) VALUES ($1, $2, $3, $4);`;
        await Promise.all(subCategories.map(subCategory => {
            return this.dataSource.query(itemInsertQuery, [
                subCategory.asset_field_category_id,
                subCategory.asset_field_name,
                subCategory.asset_field_label_name,
                subCategory.asset_field_type,
            ]);
        }));
    }
};
exports.ItemFieldsScript = ItemFieldsScript;
exports.ItemFieldsScript = ItemFieldsScript = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [typeorm_2.DataSource])
], ItemFieldsScript);
