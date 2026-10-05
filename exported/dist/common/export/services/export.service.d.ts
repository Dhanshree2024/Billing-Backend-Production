import { Response } from 'express';
export declare class ExportService {
    export(res: Response, format: 'excel' | 'csv' | 'pdf', columns: any, data: any, fileName: string): Promise<void>;
}
