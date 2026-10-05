export declare class ApiResponse {
    static success(message: string, data?: any, statusCode?: number, extra?: Record<string, any>): {
        success: boolean;
        statusCode: number;
        message: string;
        data: any;
    };
    static error(message: string, statusCode?: number, errors?: any): {
        success: boolean;
        statusCode: number;
        message: string;
        errors: any;
    };
}
