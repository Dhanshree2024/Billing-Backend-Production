import { HttpException } from '@nestjs/common';
export declare class ErrorHandler {
    static getMessage(error: unknown): string;
    static isHttpException(error: unknown): error is HttpException;
    static throwInternalServerError(error: unknown, defaultMessage?: string): never;
    static throwBadRequest(error: unknown, defaultMessage?: string): never;
    static throwNotFound(error: unknown, defaultMessage?: string): never;
    static log(context: string, error: unknown): void;
}
