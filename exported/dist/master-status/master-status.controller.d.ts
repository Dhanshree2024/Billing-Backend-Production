import { MasterStatusService } from './master-status.service';
export declare class MasterStatusController {
    private readonly masterStatusService;
    constructor(masterStatusService: MasterStatusService);
    getAllStatuses(): {
        success: boolean;
        message: string;
        data: {
            billingType: {
                id: number;
                label: string;
                value: string;
                description: string;
            }[];
            billingCycle: {
                id: number;
                label: string;
                value: string;
                description: string;
            }[];
            subscriptionStatus: {
                id: number;
                label: string;
                value: string;
            }[];
            salesEnquiryStatus: {
                id: number;
                label: string;
                value: string;
            }[];
            organizationStatus: {
                id: number;
                label: string;
                value: string;
            }[];
            trialStatus: {
                id: number;
                label: string;
                value: string;
            }[];
            orderType: {
                id: number;
                label: string;
                value: string;
            }[];
            paymentStatus: {
                id: number;
                label: string;
                value: string;
            }[];
            partnerPaymentStatus: {
                id: number;
                label: string;
                value: string;
            }[];
            budgetStatus: {
                id: number;
                label: string;
                value: string;
            }[];
            businessType: {
                id: number;
                label: string;
                value: string;
            }[];
        };
    };
    getStatusByType(type: string): {
        success: boolean;
        message: string;
        data: any;
    };
}
