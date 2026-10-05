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
exports.AssetStockSerialsScript = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let AssetStockSerialsScript = class AssetStockSerialsScript {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    async createAssetStockSerialsTable(schemaName) {
        await this.dataSource.query(`
            
           CREATE TABLE IF NOT EXISTS ${schemaName}.asset_stock_serials
(
    asset_stocks_unique_id SERIAL PRIMARY KEY,
    asset_id integer NOT NULL,
    stock_id integer NOT NULL,
    stock_serials text COLLATE pg_catalog."default",
    asset_item_id integer,
    stock_asset_relation_id jsonb,
    license_key text COLLATE pg_catalog."default",
    system_code text COLLATE pg_catalog."default",
    license_detail jsonb,
    CONSTRAINT asset_stock_serials_asset_item_id_fkey FOREIGN KEY (asset_item_id)
        REFERENCES ${schemaName}.asset_items (asset_item_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT asset_stock_serials_stock_id_fkey FOREIGN KEY (stock_id)
        REFERENCES ${schemaName}.stocks (stock_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT asset_stocks_unique_asset_id_fkey FOREIGN KEY (asset_id)
        REFERENCES ${schemaName}.assets (asset_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)
        `);
    }
};
exports.AssetStockSerialsScript = AssetStockSerialsScript;
exports.AssetStockSerialsScript = AssetStockSerialsScript = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [typeorm_2.DataSource])
], AssetStockSerialsScript);
