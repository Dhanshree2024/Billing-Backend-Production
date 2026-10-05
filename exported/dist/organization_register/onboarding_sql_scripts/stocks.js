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
exports.StocksScript = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let StocksScript = class StocksScript {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    async createStocksTable(schemaName) {
        await this.dataSource.query(`
            
      CREATE TABLE IF NOT EXISTS ${schemaName}.stocks
(
    stock_id SERIAL PRIMARY KEY,
    asset_id integer,
    previous_available_quantity integer,
    total_available_quantity integer,
    description text COLLATE pg_catalog."default",
    vendor_id integer,
    created_by integer,
    updated_by integer,
    is_active integer DEFAULT 1,
    is_deleted integer DEFAULT 0,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    asset_ownership_status integer,
    unique_description text COLLATE pg_catalog."default",
    quantity numeric(5,0) DEFAULT 1,
    warranty_start date,
    warranty_end date,
    buy_price numeric(12,2),
    purchase_date date,
    invoice_no character varying(50) COLLATE pg_catalog."default",
    branch_id integer,
    license_details jsonb,
    
    CONSTRAINT stocks_asset_id_fkey FOREIGN KEY (asset_id)
        REFERENCES ${schemaName}.assets (asset_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT stocks_asset_ownership_id_fkey FOREIGN KEY (asset_ownership_status)
        REFERENCES ${schemaName}.asset_ownership_status_types (ownership_status_type_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT stocks_branch_id_fkey FOREIGN KEY (branch_id)
        REFERENCES ${schemaName}.branches (branch_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT stocks_created_by_fkey FOREIGN KEY (created_by)
        REFERENCES ${schemaName}.users (user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT stocks_updated_by_fkey FOREIGN KEY (updated_by)
        REFERENCES ${schemaName}.users (user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT stocks_vender_id_fkey FOREIGN KEY (vendor_id)
        REFERENCES ${schemaName}.vendors (vendor_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT stocks_vendor_id_fkey FOREIGN KEY (vendor_id)
        REFERENCES ${schemaName}.vendors (vendor_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT chk_warranty_dates CHECK (warranty_start <= warranty_end)
)
        `);
    }
};
exports.StocksScript = StocksScript;
exports.StocksScript = StocksScript = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [typeorm_2.DataSource])
], StocksScript);
