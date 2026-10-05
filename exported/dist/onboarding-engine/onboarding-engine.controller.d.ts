import { OnboardingEngineService } from './onboarding-engine.service';
import { CreateSetupTaskDto } from './dto/create-setup-task.dto';
import { CreateSetupStepDto } from './dto/create-setup-steps.dto';
import { MarkTaskCompleteDto } from './dto/mark-setup-complete.dto';
export declare class OnboardingEngineController {
    private readonly service;
    constructor(service: OnboardingEngineService);
    getCategories(body: any): Promise<any>;
    getTasksByCategory(body: any): Promise<any>;
    getAllTasks(organizationId: number, userId: number, roleId: number, page: number, limit: number, search?: string, role?: string[], sortColumn?: string, sortOrder?: 'ASC' | 'DESC'): Promise<{
        data: any[];
        totalCompletedTasks: number;
        completionPercentage: number;
        totalTasks: number;
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
            hasNextPage: boolean;
        };
        success: boolean;
        message: string;
    }>;
    getSetupCompletions(page?: number, limit?: number, search?: string): Promise<{
        data: {
            organization_id: number;
            organization_name: any;
            completed_tasks: number;
            pending_tasks: number;
            completion_percentage: number;
        }[];
        total: number;
        success: boolean;
        message: string;
    }>;
    createTask(dto: CreateSetupTaskDto): Promise<{
        success: boolean;
        message: string;
        data: import("./entities/setup-task.entity").SetupTask;
    }>;
    addSteps(dto: CreateSetupStepDto): Promise<{
        success: boolean;
        message: string;
        data: import("./entities/setup-task-step.entity").SetupTaskStep;
    }>;
    markComplete(dto: MarkTaskCompleteDto): Promise<{
        success: boolean;
        message: string;
    }>;
    getOrganizationProgress(body: any): Promise<{
        success: boolean;
        message: string;
        data: any;
    }>;
    getUserProgress(body: any): Promise<{
        success: boolean;
        message: string;
        data: any[];
    }>;
    getSetupDashboard(body: any): Promise<{
        success: boolean;
        data: {
            organization_progress: any;
            user_progress: any[];
        };
    }>;
    initialize(body: any): Promise<{
        success: boolean;
        message: string;
    }>;
    getSteps(body: any): Promise<import("./entities/setup-task-step.entity").SetupTaskStep[]>;
    getSupportTasks(body: any): Promise<{
        data: {
            id: number;
            title: string;
            description: string;
            category_name: string;
            navigation_path: string;
            icon: string;
            required_role: string;
            estimated_time: string;
            is_active: boolean;
        }[];
        total: number;
    }>;
    markOrgTaskComplete(dto: any): Promise<{
        success: boolean;
        message: string;
    }>;
    gettask(body: any): Promise<import("./entities/setup-task.entity").SetupTask[]>;
}
