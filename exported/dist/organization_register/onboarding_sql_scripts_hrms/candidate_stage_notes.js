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
exports.CandidateStageNotesScript = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let CandidateStageNotesScript = class CandidateStageNotesScript {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    async createCandidateStageNotesTable(schemaName) {
        await this.dataSource.query(`
            
            CREATE TABLE IF NOT EXISTS ${schemaName}.candidate_stage_notes (
                id SERIAL PRIMARY KEY, -- Auto-incrementing primary key                
                user_id integer NOT NULL,
                status_id integer NOT NULL,
                notes text[] COLLATE pg_catalog."default" DEFAULT '{}'::text[],
                is_active boolean DEFAULT true,
                is_deleted boolean DEFAULT false,
                created_by integer,
                created_at timestamp without time zone DEFAULT now(),
                candidate_id integer,
                candidate_note_id integer,
                CONSTRAINT candidate_stage_notes_created_by_fkey FOREIGN KEY (created_by)
                    REFERENCES ${schemaName}.users (user_id) MATCH SIMPLE
                    ON UPDATE NO ACTION
                    ON DELETE NO ACTION,
                CONSTRAINT candidate_stage_notes_status_id_fkey FOREIGN KEY (status_id)
                    REFERENCES ${schemaName}.hiring_status (status_id) MATCH SIMPLE
                    ON UPDATE NO ACTION
                    ON DELETE NO ACTION,
                CONSTRAINT candidate_stage_notes_user_id_fkey FOREIGN KEY (user_id)
                    REFERENCES ${schemaName}.users (user_id) MATCH SIMPLE
                    ON UPDATE NO ACTION
                    ON DELETE NO ACTION

            
                );

        `);
    }
};
exports.CandidateStageNotesScript = CandidateStageNotesScript;
exports.CandidateStageNotesScript = CandidateStageNotesScript = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [typeorm_2.DataSource])
], CandidateStageNotesScript);
