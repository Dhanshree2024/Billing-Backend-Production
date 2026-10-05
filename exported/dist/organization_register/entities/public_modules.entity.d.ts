import { Submodule } from './public_submodules.entity';
export declare class PermissionModule {
    id: number;
    module_name: string;
    module_code: string;
    description: string;
    submodules: Submodule[];
    created_at: Date;
    updated_at: Date;
}
