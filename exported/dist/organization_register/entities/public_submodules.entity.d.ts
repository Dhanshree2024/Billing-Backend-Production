import { PermissionModule } from './public_modules.entity';
export declare class Submodule {
    id: number;
    submodule_name: string;
    submodule_code: string;
    description: string;
    module_id: number;
    module: PermissionModule;
    created_at: Date;
    updated_at: Date;
}
