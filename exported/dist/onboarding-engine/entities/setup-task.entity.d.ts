import { SetupCategory } from './setup-category.entity';
import { SetupTaskStep } from './setup-task-step.entity';
import { SetupTaskMapping } from './setup-task-mappings.entity';
export declare class SetupTask {
    id: number;
    categoryId: number;
    category: SetupCategory;
    steps: SetupTaskStep[];
    title: string;
    description: string;
    navigationPath: string;
    icon: string;
    requiredRole: string;
    estimatedTime: string;
    autoDetectable: boolean;
    displayOrder: number;
    isActive: boolean;
    mappings: SetupTaskMapping[];
    taskScope: 'INDIVIDUAL' | 'COMMON' | 'ONE_TIME';
    isAutoComplete: boolean;
    completionEventKey: string;
}
