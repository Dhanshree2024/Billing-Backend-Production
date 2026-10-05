export declare class ApiPagination {
    static response(message: string, data: any[], total: number, page: number, limit: number, statusCode?: number): {
        statusCode: number;
        message: string;
        data: any[];
        total: number;
        page: number;
        limit: number;
    };
}
