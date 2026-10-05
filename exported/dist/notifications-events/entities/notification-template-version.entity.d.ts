import { NotificationTemplate } from './notification-template.entity';
import { ThirdPartyVendor } from './third-party-vendor.entity';
import { NotificationBatch } from "./notification_batches.entity";
import { NotificationMessage } from "./notifications_messages.entity";
export declare enum TemplateVersionState {
    DRAFT = "draft",
    IN_REVIEW = "in_review",
    APPROVED = "approved",
    ACTIVE = "active",
    ARCHIVED = "archived"
}
export declare class NotificationTemplateVersion {
    version_id: number;
    template_id: number;
    template: NotificationTemplate;
    version_no: number;
    state: TemplateVersionState;
    valid_from: Date;
    valid_to: Date;
    subject: string;
    body: string;
    body_format: string;
    dlt_template_id: string;
    notes: string;
    vendor_id: number;
    vendor: ThirdPartyVendor;
    template_variables: Record<string, any>;
    is_enabled: number;
    is_deleted: number;
    created_by: number;
    updated_by: number;
    created_at: Date;
    updated_at: Date;
    redirect_key: string;
    redirect_params: string[];
    notification_batches: NotificationBatch[];
    notification_messages: NotificationMessage[];
}
