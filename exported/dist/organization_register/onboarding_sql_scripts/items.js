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
exports.ItemsScript = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let ItemsScript = class ItemsScript {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    async createItemsTable(schemaName) {
        await this.dataSource.query(`
      CREATE TABLE IF NOT EXISTS ${schemaName}.asset_items
          (
              asset_item_id SERIAL PRIMARY KEY,
              main_category_id integer,
              sub_category_id integer,
              asset_item_name text COLLATE pg_catalog."default",
              asset_item_description text COLLATE pg_catalog."default",
              parent_organization_id integer,
              added_by integer,
              is_active integer DEFAULT 1,
              is_deleted integer DEFAULT 0,
              created_at date,
              updated_at date,
              is_licensable boolean DEFAULT false,
              item_type item_type_enum,
              has_depreciation boolean,
              company_act_asset_life integer,
              it_act_asset_life integer,
              company_depreciation_rate integer,
              it_act_depreciation_rate integer,
              company_act_residual_value integer,
              it_act_residual_value integer,
              preffered_method integer,
              asset_item_icon text COLLATE pg_catalog."default",
              upload_documents boolean
              
          )
      `);
    }
    async insertAssetItemTable(schemaName, subCategories) {
        const itemInsertQuery = `INSERT INTO ${schemaName}.asset_items(main_category_id, sub_category_id, asset_item_name,is_licensable,item_type) VALUES ($1,$2,$3,$4,$5);`;
        await Promise.all(subCategories.map(subCategory => {
            return this.dataSource.query(itemInsertQuery, [
                subCategory.main_category_id,
                subCategory.sub_category_id,
                subCategory.asset_item_name.trim(),
                subCategory.is_licensable,
                subCategory.item_type,
            ]);
        }));
    }
};
exports.ItemsScript = ItemsScript;
exports.ItemsScript = ItemsScript = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [typeorm_2.DataSource])
], ItemsScript);
