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
exports.AssetsScript = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let AssetsScript = class AssetsScript {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    async createAssetsTable(schemaName) {
        await this.dataSource.query(`
            
            CREATE TABLE IF NOT EXISTS ${schemaName}.assets
                (
                    asset_id SERIAL PRIMARY KEY,
                    asset_main_category_id integer NOT NULL,
                    asset_sub_category_id integer NOT NULL,
                    asset_item_id integer NOT NULL,
                    asset_information_fields text COLLATE pg_catalog."default",
                    asset_description text COLLATE pg_catalog."default",
                    asset_added_by integer NOT NULL,
                    asset_is_active integer NOT NULL DEFAULT 1,
                    asset_is_deleted integer NOT NULL DEFAULT 0,
                    asset_created_at date NOT NULL DEFAULT CURRENT_TIMESTAMP,
                    asset_updated_at date NOT NULL DEFAULT CURRENT_TIMESTAMP,
                    asset_title text COLLATE pg_catalog."default",
                    manufacturer text COLLATE pg_catalog."default",
                    model_no text COLLATE pg_catalog."default",
                    
                    CONSTRAINT assets_asset_added_by_fkey FOREIGN KEY (asset_added_by)
                        REFERENCES ${schemaName}.users (user_id) MATCH SIMPLE
                        ON UPDATE NO ACTION
                        ON DELETE NO ACTION,
                    CONSTRAINT assets_asset_main_category_id_fkey FOREIGN KEY (asset_main_category_id)
                        REFERENCES ${schemaName}.asset_main_category (main_category_id) MATCH SIMPLE
                        ON UPDATE NO ACTION
                        ON DELETE NO ACTION,
                    CONSTRAINT assets_asset_sub_category_id_fkey FOREIGN KEY (asset_sub_category_id)
                        REFERENCES ${schemaName}.asset_sub_category (sub_category_id) MATCH SIMPLE
                        ON UPDATE NO ACTION
                        ON DELETE NO ACTION
                )
        `);
    }
};
exports.AssetsScript = AssetsScript;
exports.AssetsScript = AssetsScript = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [typeorm_2.DataSource])
], AssetsScript);
