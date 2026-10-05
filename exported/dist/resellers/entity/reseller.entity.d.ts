import { IndustryTypes } from 'src/organizational-profile/public_schema_entity/industry-types.entity';
export declare class Reseller {
    reseller_id: number;
    reseller_name: string;
    contact_first_name: string;
    contact_last_name: string;
    email: string;
    phone_number: string;
    industry_id: number | null;
    payment_term: string | null;
    gst_registered: boolean;
    gst_number: string | null;
    address_line1: string;
    address_line2: string;
    city: string;
    state: string;
    country: string;
    postal_code: string;
    is_active: boolean;
    is_deleted: boolean;
    created_at: Date;
    updated_at: Date;
    industry: IndustryTypes;
    reseller_code: string;
    pan_number: string;
    payment_status: string;
}
