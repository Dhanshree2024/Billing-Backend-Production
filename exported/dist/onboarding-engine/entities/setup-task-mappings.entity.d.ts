import { SetupTask } from './setup-task.entity';
import { Submodule } from 'src/organization_register/entities/public_submodules.entity';
import { PermissionModule } from 'src/organization_register/entities/public_modules.entity';
import { Action } from 'src/organization_register/entities/public_actions.entity';
export declare class SetupTaskMapping {
    id: number;
    taskId: number;
    task: SetupTask;
    moduleId: number;
    module: PermissionModule;
    subModuleId: number;
    subModule: Submodule;
    actionId: number;
    action: Action;
}
