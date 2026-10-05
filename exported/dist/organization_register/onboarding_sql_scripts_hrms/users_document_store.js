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
exports.UsersDocumentStoreScript = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let UsersDocumentStoreScript = class UsersDocumentStoreScript {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    async createUsersDocumentStoreTable(schemaName) {
        await this.dataSource.query(`
            CREATE TABLE IF NOT EXISTS ${schemaName}.users_document_store (
                user_document_store_id SERIAL PRIMARY KEY, -- Auto-incrementing primary key
                user_id INT NOT NULL, -- Foreign key referencing org_tcs.users
                document_type_id INT NOT NULL, -- Foreign key referencing org_tcs.document_type
                document_uploaded_by INT NOT NULL, -- User ID or reference to the user who added the document
                document_path TEXT NULL, -- Path where the document is stored
                file_name VARCHAR(255) NULL, -- Name of the document file
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Record creation timestamp
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Last update timestamp
                is_active BOOLEAN DEFAULT TRUE, -- Indicates if the record is active
                is_deleted BOOLEAN DEFAULT FALSE, -- Indicates if the record is deleted
                is_verified BOOLEAN DEFAULT FALSE,
                verified_by INT ,
                CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES ${schemaName}.users (user_id) ON DELETE CASCADE, -- Foreign key constraint to users table
                CONSTRAINT fk_document_type FOREIGN KEY (document_type_id) REFERENCES ${schemaName}.document_type (document_type_id) ON DELETE CASCADE, -- Foreign key constraint to document_type table
                CONSTRAINT fk_document_uploaded_by FOREIGN KEY (document_uploaded_by) REFERENCES ${schemaName}.users (user_id) ON DELETE CASCADE -- Foreign key constraint to users table for the user who added the document
            );
        `);
    }
};
exports.UsersDocumentStoreScript = UsersDocumentStoreScript;
exports.UsersDocumentStoreScript = UsersDocumentStoreScript = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [typeorm_2.DataSource])
], UsersDocumentStoreScript);
