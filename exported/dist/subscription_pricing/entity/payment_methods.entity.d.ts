export declare class PaymentMethod {
    methodId: number;
    methodName: string;
    methodCode: string;
    provider: string | null;
    isActive: boolean;
    displayOrder: number;
    createdAt: Date;
    updatedAt: Date;
}
