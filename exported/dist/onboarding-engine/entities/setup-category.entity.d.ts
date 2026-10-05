import { SetupTask } from './setup-task.entity';
export declare class SetupCategory {
    id: number;
    name: string;
    categoryType: string;
    description: string;
    displayOrder: number;
    isActive: boolean;
    tasks: SetupTask[];
}
