import { User } from './organizational-user.entity';
import { Locations } from './locations.entity';
export declare class Branch {
    branch_id: number;
    branch_name: string;
    gstNo: string;
    city_id: number;
    country_id: number;
    location_id: number;
    branch_street: string;
    branch_landmark: string;
    city: string;
    state: string;
    country: string;
    pincode: number;
    established_date: Date;
    contact_number: string;
    branch_email: string;
    alternative_contact_number: string;
    primary_user_id: number;
    primaryUser: User;
    createdAt: Date;
    updatedAt: Date;
    is_active: boolean;
    is_deleted: boolean;
    created_by: number;
    created_user: User;
    locations: Locations[];
}
