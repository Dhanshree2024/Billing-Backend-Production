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
exports.InterviewsScript = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let InterviewsScript = class InterviewsScript {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    async createInterviewsTable(schemaName) {
        try {
            await this.dataSource.query(`
        
            CREATE TABLE IF NOT EXISTS ${schemaName}.interviews (
                interview_id SERIAL PRIMARY KEY,
                user_id integer NOT NULL,
                interviewdate date NOT NULL,
                interviewers integer NOT NULL,
                interviewtype character varying COLLATE pg_catalog."default" NOT NULL,
                remarks text COLLATE pg_catalog."default",
                interviewstatus character varying COLLATE pg_catalog."default" NOT NULL,
                rescheduledate date,
                reschedulereason text COLLATE pg_catalog."default",
                is_active boolean DEFAULT true,
                is_deleted boolean DEFAULT false,
                created_at timestamp without time zone DEFAULT now(),
                updated_at timestamp without time zone DEFAULT now(),
                interviewcompleted boolean DEFAULT false,
                CONSTRAINT interviews_interviewers_fkey FOREIGN KEY (interviewers)
                    REFERENCES ${schemaName}.users (user_id) MATCH SIMPLE
                    ON UPDATE CASCADE
                    ON DELETE CASCADE,
                CONSTRAINT interviews_user_id_fkey FOREIGN KEY (user_id)
                    REFERENCES ${schemaName}.users (user_id) MATCH SIMPLE
                    ON UPDATE CASCADE
                    ON DELETE CASCADE
            
            );
      `);
            console.log(`Table ${schemaName}.interviews created successfully.`);
        }
        catch (error) {
            console.error(`Error creating interviews table in schema ${schemaName}:`, error);
            throw new Error(`Failed to create interviews table in schema ${schemaName}.`);
        }
    }
};
exports.InterviewsScript = InterviewsScript;
exports.InterviewsScript = InterviewsScript = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [typeorm_2.DataSource])
], InterviewsScript);
