import { HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { ExportDto } from 'src/common/export/dto/export.dto';
import { ExportService } from 'src/common/export/services/export.service';
import { CreateResellerDto } from './dto/create-reseller.dto';
import { UpdateResellerDto } from './dto/update-reseller.dto';
import { UpdatePaymentStatusDto } from './dto/update-status.dto';
import { ResellersService } from './resellers.service';
export declare class ResellersController {
    private readonly resellersService;
    private readonly exportService;
    constructor(resellersService: ResellersService, exportService: ExportService);
    getAllResellers(res: Response, filters: any): Promise<Response<any, Record<string, any>>>;
    exportResellers(dto: ExportDto, res: Response): Promise<void>;
    addReseller(dto: CreateResellerDto): Promise<{
        success: boolean;
        message: string;
        data: import("./entity/reseller.entity").Reseller;
        statusCode?: undefined;
    } | {
        success: boolean;
        message: any;
        statusCode: HttpStatus;
        data?: undefined;
    }>;
    updateReseller(id: number, dto: UpdateResellerDto): Promise<{
        success: boolean;
        message: string;
        data: import("./entity/reseller.entity").Reseller;
        statusCode?: undefined;
    } | {
        success: boolean;
        message: any;
        statusCode: HttpStatus;
        data?: undefined;
    }>;
    getResellerById(id: number, res: Response): Promise<Response<any, Record<string, any>>>;
    softDeleteReseller(res: Response, id: number): Promise<Response<any, Record<string, any>>>;
    getDropdownResellers(res: Response): Promise<Response<any, Record<string, any>>>;
    updatePaymentStatus(dto: UpdatePaymentStatusDto): Promise<{
        message: string;
    }>;
}
