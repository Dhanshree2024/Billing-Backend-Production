export declare class ExportDto {
    search?: string;
    status?: 'All' | 'Active' | 'Inactive';
    type?: 'all' | 'paid' | 'trial';
    sortField?: string;
    sortOrder?: 'ASC' | 'DESC';
    format: 'excel' | 'csv' | 'pdf';
}
