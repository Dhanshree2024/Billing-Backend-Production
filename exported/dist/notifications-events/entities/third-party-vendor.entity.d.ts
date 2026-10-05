import { NotificationTemplateVersion } from './notification-template-version.entity';
export declare class ThirdPartyVendor {
    vendorId: number;
    vendorName?: string;
    vendorDescription?: string;
    vendorContactPersonName?: string;
    vendorContactNumber?: string;
    vendorEmailAddress?: string;
    vendorWebsite?: string;
    isDeleted: number;
    isEnabled: number;
    createdBy?: number;
    updatedBy?: number;
    createdAt: Date;
    updatedAt?: Date;
    additionalParameters?: Record<string, any>;
    templateVersions: NotificationTemplateVersion[];
}
