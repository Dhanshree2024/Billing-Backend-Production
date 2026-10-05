import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { DatabaseService } from './database.service';
export declare class SetSchemaMiddleware implements NestMiddleware {
    private readonly databaseService;
    constructor(databaseService: DatabaseService);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
}
