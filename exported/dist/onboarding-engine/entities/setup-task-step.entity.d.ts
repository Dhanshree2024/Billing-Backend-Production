import { SetupTask } from './setup-task.entity';
export declare class SetupTaskStep {
    id: number;
    taskId: number;
    task: SetupTask;
    stepOrder: number;
    title: string;
    description: string;
}
