export declare class AssetUtil {
    static post<T = any>(endpoint: string, payload: any, options?: {
        headers?: Record<string, string>;
        timeout?: number;
    }): Promise<T>;
}
