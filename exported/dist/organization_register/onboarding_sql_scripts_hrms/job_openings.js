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
exports.JobOpeningsScript = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let JobOpeningsScript = class JobOpeningsScript {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    async createJobOpeningsTable(schemaName) {
        try {
            await this.dataSource.query(`
        CREATE TABLE IF NOT EXISTS ${schemaName}.job_openings (
            job_opening_id SERIAL PRIMARY KEY,
            job_id character varying(255) COLLATE pg_catalog."default" NOT NULL,
            job_title character varying(255) COLLATE pg_catalog."default" NOT NULL,
            designation_id integer NOT NULL,
            department_id integer NOT NULL,
            branch_id integer NOT NULL,
            employment_type_id integer NOT NULL,
            job_created_by_id integer,
            work_experience character varying(255) COLLATE pg_catalog."default" NOT NULL,
            offered_salary character varying(255) COLLATE pg_catalog."default" NOT NULL,
            job_description text COLLATE pg_catalog."default",
            opening_status character varying(20) COLLATE pg_catalog."default",
            published_at timestamp with time zone,
            expires_at timestamp with time zone,
            is_active boolean DEFAULT true,
            created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
            updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
            notify_employees boolean DEFAULT false,
            CONSTRAINT fk_branch FOREIGN KEY (branch_id)
                REFERENCES ${schemaName}.branches (branch_id) MATCH SIMPLE
                ON UPDATE NO ACTION
                ON DELETE NO ACTION,
            CONSTRAINT fk_created_by FOREIGN KEY (job_created_by_id)
                REFERENCES ${schemaName}.users (user_id) MATCH SIMPLE
                ON UPDATE NO ACTION
                ON DELETE NO ACTION,
            CONSTRAINT fk_department FOREIGN KEY (department_id)
                REFERENCES ${schemaName}.departments (department_id) MATCH SIMPLE
                ON UPDATE NO ACTION
                ON DELETE NO ACTION,
            CONSTRAINT fk_designation FOREIGN KEY (designation_id)
                REFERENCES ${schemaName}.designations (designation_id) MATCH SIMPLE
                ON UPDATE NO ACTION
                ON DELETE NO ACTION,
            CONSTRAINT fk_employment_type FOREIGN KEY (employment_type_id)
                REFERENCES public.employment_types (employment_type_id) MATCH SIMPLE
                ON UPDATE NO ACTION
                ON DELETE NO ACTION,
            CONSTRAINT job_openings_opening_status_check CHECK (opening_status::text = ANY (ARRAY['Open'::character varying, 'Closed'::character varying, 'Cancelled'::character varying, 'Draft'::character varying]::text[]))

            
        );
      `);
            console.log(`Table ${schemaName}.job_openings created successfully.`);
        }
        catch (error) {
            console.error(`Error creating job_openings table in schema ${schemaName}:`, error);
            throw new Error(`Failed to create job_openings table in schema ${schemaName}.`);
        }
    }
};
exports.JobOpeningsScript = JobOpeningsScript;
exports.JobOpeningsScript = JobOpeningsScript = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [typeorm_2.DataSource])
], JobOpeningsScript);
