import { Branch } from './branches.entity';
export declare class Locations {
    location_id: number;
    location_name: string;
    branch_id: number;
    department_id: number;
    location_floor_room: string;
    location_code: string;
    location_city: string;
    location_state: string;
    location_total_asset: number;
    location_street_address: string;
    location_description: string;
    location_google_map_pin: string;
    created_at: Date;
    updated_at: Date;
    created_by: number;
    updated_by: number;
    is_active: number;
    is_deleted: number;
    branch: Branch;
}
