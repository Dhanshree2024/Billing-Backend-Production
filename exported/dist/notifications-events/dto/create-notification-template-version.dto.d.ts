import { BodyFormat } from './enums';
import { TemplateVersionState } from '../entities/notification-template-version.entity';
export declare class CreateNotificationTemplateVersionDto {
    template_id: number;
    vendor_id: number;
    version_no: number;
    state: TemplateVersionState;
    valid_from?: string;
    valid_to?: string;
    subject?: string;
    body: string;
    body_format: BodyFormat;
    dlt_template_id?: string;
    notes?: string;
    created_by?: number;
    redirect_key?: string;
    redirect_params?: string[];
    template_variables?: Record<string, {
        account_type: string;
        label: string;
    }> | null;
}
