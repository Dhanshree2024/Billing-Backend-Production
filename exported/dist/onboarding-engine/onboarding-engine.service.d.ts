import { DataSource, Repository } from 'typeorm';
import { SetupTask } from './entities/setup-task.entity';
import { SetupTaskStep } from './entities/setup-task-step.entity';
import { OrganizationSetupProgress } from './entities/organization-setup-progress.entity';
import { UserSetupProgress } from './entities/user-setup-progress.entity';
import { CreateSetupTaskDto } from './dto/create-setup-task.dto';
import { CreateSetupStepDto } from './dto/create-setup-steps.dto';
import { MarkTaskCompleteDto } from './dto/mark-setup-complete.dto';
import { SetupTaskMapping } from './entities/setup-task-mappings.entity';
export declare class OnboardingEngineService {
    private readonly dataSource;
    private readonly taskRepo;
    private readonly stepRepo;
    private readonly orgProgressRepo;
    private readonly userProgressRepo;
    private readonly taskMappingRepo;
    constructor(dataSource: DataSource, taskRepo: Repository<SetupTask>, stepRepo: Repository<SetupTaskStep>, orgProgressRepo: Repository<OrganizationSetupProgress>, userProgressRepo: Repository<UserSetupProgress>, taskMappingRepo: Repository<SetupTaskMapping>);
    getCategories(): Promise<any>;
    getTasksByCategory(categoryId: number): Promise<any>;
    getAllTasks(organizationId: number, userId: number, roleId?: number, page?: number, limit?: number, search?: string, role?: string[], sortColumn?: string, sortOrder?: 'ASC' | 'DESC'): Promise<{
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
    }>;
    createTask(dto: CreateSetupTaskDto): Promise<{
        success: boolean;
        message: string;
        data: SetupTask;
    }>;
    addStep(dto: CreateSetupStepDto): Promise<{
        success: boolean;
        message: string;
        data: SetupTaskStep;
    }>;
    markTaskComplete(dto: MarkTaskCompleteDto): Promise<{
        success: boolean;
        message: string;
    }>;
    getOrganizationProgress(orgId: number, planId: number): Promise<{
        success: boolean;
        message: string;
        data: any;
    }>;
    getUserProgress(orgId: number, userId: number): Promise<{
        success: boolean;
        message: string;
        data: any[];
    }>;
    getSetupDashboard(orgId: number, userId: number, planId: number): Promise<{
        success: boolean;
        data: {
            organization_progress: any;
            user_progress: any[];
        };
    }>;
    initializeOrgSetup(orgId: number, planId: number): Promise<{
        success: boolean;
        message: string;
    }>;
    getTaskSteps(taskId: number): Promise<SetupTaskStep[]>;
    getSetupCompletionsForAllOrgs(page?: number, limit?: number, search?: string): Promise<{
        data: {
            organization_id: number;
            organization_name: any;
            completed_tasks: number;
            pending_tasks: number;
            completion_percentage: number;
        }[];
        total: number;
    }>;
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
    markOrgTaskComplete(dto: {
        organizationId: number;
        taskId: number;
        userId: number;
    }): Promise<{
        success: boolean;
        message: string;
    }>;
    getTask(taskId: number): Promise<SetupTask[]>;
}
