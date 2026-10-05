import { Repository } from 'typeorm';
import { CreateResellerDto } from './dto/create-reseller.dto';
import { UpdateResellerDto } from './dto/update-reseller.dto';
import { Reseller } from './entity/reseller.entity';
import { UpdatePaymentStatusDto } from './dto/update-status.dto';
export declare class ResellersService {
    private resellerRepo;
    constructor(resellerRepo: Repository<Reseller>);
    getAllResellers(page: number, limit: number, search: string, status: 'All' | 'Active' | 'Inactive'): Promise<{
        data: Reseller[];
        total: number;
    }>;
    private buildQuery;
    exportResellers(search: string, status: 'All' | 'Active' | 'Inactive'): Promise<Reseller[]>;
    private generateResellerCode;
    create(dto: CreateResellerDto): Promise<Reseller>;
    update(id: number, dto: UpdateResellerDto): Promise<Reseller>;
    getSingleReseller(id: number): Promise<Reseller | null>;
    deleteReseller(id: number): Promise<Reseller>;
    getResellerDropdown(): Promise<{
        reseller_id: number;
        reseller_name: string;
    }[]>;
    updatePaymentStatus(dto: UpdatePaymentStatusDto): Promise<{
        message: string;
    }>;
}
