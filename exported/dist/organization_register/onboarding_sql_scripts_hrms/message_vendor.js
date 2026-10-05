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
exports.MessageVendorScript = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let MessageVendorScript = class MessageVendorScript {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    async createMessageVendorTable(schemaName) {
        await this.dataSource.query(`
            
            CREATE TABLE IF NOT EXISTS ${schemaName}.message_vendor (
                message_vendor_id SERIAL PRIMARY KEY,
                message_vendor_type VARCHAR(10) CHECK (message_vendor_type IN ('SMS', 'WHATSAPP', 'EMAIL')),
                message_vendor_name VARCHAR(200),
                message_vendor_description VARCHAR(300),
                message_vendor_contact VARCHAR(20) NOT NULL,
                message_vendor_email VARCHAR(30),
                message_vendor_is_current SMALLINT NOT NULL DEFAULT 0,
                message_vendor_added_by INT,
                message_vendor_created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                message_vendor_website_url VARCHAR(200),
                message_variable_start_with VARCHAR(15),
                message_variable_end_with VARCHAR(15),
                message_vendor_key VARCHAR(1000),
                message_vendor_username VARCHAR(50),
                message_vendor_password VARCHAR(50),
                message_vendor_other_details VARCHAR(500),
                message_vendor_redirect_url VARCHAR(250),
                message_vendor_is_active SMALLINT NOT NULL DEFAULT 1,
                message_vendor_is_deleted SMALLINT NOT NULL DEFAULT 0
            );

        `);
    }
};
exports.MessageVendorScript = MessageVendorScript;
exports.MessageVendorScript = MessageVendorScript = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [typeorm_2.DataSource])
], MessageVendorScript);
