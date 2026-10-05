"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnboardingEngineService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const setup_task_entity_1 = require("./entities/setup-task.entity");
const setup_task_step_entity_1 = require("./entities/setup-task-step.entity");
const organization_setup_progress_entity_1 = require("./entities/organization-setup-progress.entity");
const user_setup_progress_entity_1 = require("./entities/user-setup-progress.entity");
const register_organization_entity_1 = require("../organization_register/entities/register-organization.entity");
const setup_task_mappings_entity_1 = require("./entities/setup-task-mappings.entity");
let OnboardingEngineService = class OnboardingEngineService {
    constructor(dataSource, taskRepo, stepRepo, orgProgressRepo, userProgressRepo, taskMappingRepo) {
        this.dataSource = dataSource;
        this.taskRepo = taskRepo;
        this.stepRepo = stepRepo;
        this.orgProgressRepo = orgProgressRepo;
        this.userProgressRepo = userProgressRepo;
        this.taskMappingRepo = taskMappingRepo;
    }
    async getCategories() {
        return this.dataSource.query(`SELECT * 
        FROM onboarding_engine.setup_categories
        WHERE is_active=true
        ORDER BY display_order`);
    }
    async getTasksByCategory(categoryId) {
        return this.dataSource.query(`SELECT *
        FROM onboarding_engine.setup_tasks
        WHERE category_id=$1
        AND is_active=true
        ORDER BY display_order`, [categoryId]);
    }
    async getAllTasks(organizationId, userId, roleId, page = 1, limit = 10, search, role, sortColumn = 'displayOrder', sortOrder = 'ASC') {
        console.log('👤 getAllTasks called with roleId:', roleId, 'userId:', userId, 'organizationId:', organizationId);
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        try {
            const qb = queryRunner.manager
                .getRepository(setup_task_entity_1.SetupTask)
                .createQueryBuilder('task')
                .leftJoin('task.category', 'cat')
                .leftJoin('task.steps', 'step')
                .leftJoin('task.mappings', 'map')
                .leftJoin('map.module', 'mod')
                .leftJoin('map.subModule', 'sub')
                .leftJoin('map.action', 'act');
            if (roleId === 1) {
                qb.leftJoin(organization_setup_progress_entity_1.OrganizationSetupProgress, 'progress', 'progress.task_id = task.id AND progress.organization_id = :orgId', { orgId: organizationId });
                qb.andWhere('task.task_scope IN (:...scopes)', {
                    scopes: ['COMMON', 'INDIVIDUAL', 'ONE_TIME'],
                });
            }
            else {
                qb.leftJoin(organization_setup_progress_entity_1.OrganizationSetupProgress, 'progress', 'progress.task_id = task.id AND progress.organization_id = :orgId AND progress.completed_by = :userId', { orgId: organizationId, userId });
                qb.andWhere('task.task_scope = :taskScope', {
                    taskScope: 'INDIVIDUAL',
                });
            }
            qb.select([
                'task.id AS id',
                'task.title AS title',
                'task.description AS description',
                'task.navigationPath AS navigation_path',
                'task.icon AS icon',
                'task.requiredRole AS role',
                'task.displayOrder AS display_order',
                'task.task_scope AS task_scope',
                'cat.name AS category',
                roleId === 1
                    ? `COALESCE(MAX(CASE WHEN progress.status = 'COMPLETED' THEN 'COMPLETED' ELSE 'PENDING' END), 'PENDING') AS status`
                    : `COALESCE(MAX(progress.status), 'PENDING') AS status`,
                `MAX(progress.completed_by) AS completed_by`,
                `COALESCE(
  json_agg(
    jsonb_build_object(
      'stepOrder', step.step_order,
      'title', step.title,
      'description', step.description
    )
    ORDER BY step.step_order
  ) FILTER (WHERE step.id IS NOT NULL),
  '[]'
) AS steps`,
                `COALESCE(
        json_agg(
          DISTINCT jsonb_build_object(
            'module', mod.module_name,
            'submodule', sub.submodule_name,
            'action', act.action_name
          )
        ) FILTER (WHERE map.id IS NOT NULL),
        '[]'
      ) AS mappings`
            ])
                .groupBy('task.id')
                .addGroupBy('cat.name');
            if (search) {
                qb.andWhere('task.title ILIKE :search', { search: `%${search}%` });
            }
            if (role && role.length > 0) {
                qb.andWhere('task.requiredRole IN (:...roles)', { roles: role });
            }
            qb.orderBy(`task.${sortColumn}`, sortOrder)
                .offset((page - 1) * limit)
                .limit(limit);
            const rows = await qb.getRawMany();
            console.log('🚀 Fetched tasks rows:', rows);
            const totalTaskQb = queryRunner.manager
                .getRepository(setup_task_entity_1.SetupTask)
                .createQueryBuilder('task');
            if (roleId === 1) {
                totalTaskQb.andWhere('task.task_scope IN (:...scopes)', {
                    scopes: ['COMMON', 'INDIVIDUAL', 'ONE_TIME'],
                });
            }
            else {
                totalTaskQb.andWhere('task.task_scope = :taskScope', {
                    taskScope: 'INDIVIDUAL',
                });
            }
            if (search) {
                totalTaskQb.andWhere('task.title ILIKE :search', { search: `%${search}%` });
            }
            if (role && role.length > 0) {
                totalTaskQb.andWhere('task.requiredRole IN (:...roles)', { roles: role });
            }
            const totalTasks = await totalTaskQb.getCount();
            console.log('📊 Total tasks count:', totalTasks);
            let totalCompletedTasks = 0;
            if (roleId === 1) {
                totalCompletedTasks = rows.filter(r => r.status === 'COMPLETED').length;
            }
            else {
                totalCompletedTasks = rows.filter(r => r.status === 'COMPLETED' && Number(r.completed_by) === Number(userId)).length;
            }
            console.log('✅ Completed tasks count:', totalCompletedTasks);
            const completionPercentage = totalTasks > 0
                ? Math.round((totalCompletedTasks / totalTasks) * 100)
                : 0;
            console.log('🎯 Completion percentage:', completionPercentage);
            return {
                data: rows,
                totalCompletedTasks,
                completionPercentage,
                totalTasks,
                meta: {
                    total: totalTasks,
                    page,
                    limit,
                    totalPages: Math.ceil(totalTasks / limit),
                    hasNextPage: page * limit < totalTasks
                }
            };
        }
        finally {
            await queryRunner.release();
            console.log('🔒 Query runner released');
        }
    }
    async createTask(dto) {
        const task = this.taskRepo.create(dto);
        await this.taskRepo.save(task);
        return {
            success: true,
            message: 'Task created successfully',
            data: task
        };
    }
    async addStep(dto) {
        const step = this.stepRepo.create(dto);
        await this.stepRepo.save(step);
        return {
            success: true,
            message: 'Step added successfully',
            data: step
        };
    }
    async markTaskComplete(dto) {
        await this.dataSource.query(`CALL onboarding_engine.mark_setup_complete($1,$2,$3)`, [
            dto.organizationId,
            dto.taskId,
            dto.user_id
        ]);
        await this.userProgressRepo.update({
            organizationId: dto.organizationId,
            userId: dto.user_id,
            taskId: dto.taskId
        }, {
            status: 'COMPLETED'
        });
        return {
            success: true,
            message: 'Task completed successfully'
        };
    }
    async getOrganizationProgress(orgId, planId) {
        const result = await this.dataSource.query(`SELECT *
       FROM onboarding_engine.get_org_setup_progress($1,$2)`, [orgId, planId]);
        return {
            success: true,
            message: 'Organization progress fetched',
            data: result
        };
    }
    async getUserProgress(orgId, userId) {
        const progress = await this.userProgressRepo
            .createQueryBuilder('p')
            .leftJoin('onboarding_engine.setup_tasks', 'task', 'task.id = p.task_id')
            .select([
            'p.task_id as task_id',
            'task.title as task_title',
            'p.status as status'
        ])
            .where('p.organization_id = :orgId', { orgId })
            .andWhere('p.user_id = :userId', { userId })
            .getRawMany();
        return {
            success: true,
            message: 'User progress fetched',
            data: progress
        };
    }
    async getSetupDashboard(orgId, userId, planId) {
        const orgProgress = await this.getOrganizationProgress(orgId, planId);
        const userProgress = await this.getUserProgress(orgId, userId);
        return {
            success: true,
            data: {
                organization_progress: orgProgress.data,
                user_progress: userProgress.data
            }
        };
    }
    async initializeOrgSetup(orgId, planId) {
        await this.dataSource.query(`CALL onboarding_engine.initialize_org_setup($1,$2)`, [orgId, planId]);
        return {
            success: true,
            message: 'Organization setup initialized successfully'
        };
    }
    async getTaskSteps(taskId) {
        return this.stepRepo.find({
            where: { taskId },
            order: { stepOrder: "ASC" }
        });
    }
    async getSetupCompletionsForAllOrgs(page = 1, limit = 10, search) {
        const offset = (page - 1) * limit;
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        try {
            const totalTasksRes = await queryRunner.manager
                .getRepository(setup_task_entity_1.SetupTask)
                .createQueryBuilder('task')
                .select('COUNT(task.id)', 'total')
                .getRawOne();
            const totalTasks = parseInt(totalTasksRes?.total || '0', 10);
            const completedTasksExpr = `
      COUNT(DISTINCT progress.task_id)
      FILTER (WHERE progress.status = 'COMPLETED')
    `;
            const qb = queryRunner.manager
                .getRepository(register_organization_entity_1.RegisterOrganization)
                .createQueryBuilder('org')
                .leftJoin(organization_setup_progress_entity_1.OrganizationSetupProgress, 'progress', 'progress.organization_id = org.organization_id')
                .select([
                'org.organization_id AS organization_id',
                'org.organization_name AS organization_name',
                `${completedTasksExpr} AS completed_tasks`,
                `${totalTasks} - ${completedTasksExpr} AS pending_tasks`,
                `
        CASE
          WHEN ${totalTasks} > 0
          THEN ROUND((${completedTasksExpr}::decimal / ${totalTasks}) * 100, 2)
          ELSE 0
        END AS completion_percentage
        `,
            ])
                .groupBy('org.organization_id')
                .addGroupBy('org.organization_name')
                .having(`${completedTasksExpr} > 0`)
                .orderBy('org.organization_name', 'ASC');
            if (search) {
                qb.andWhere('org.organization_name ILIKE :search', {
                    search: `%${search}%`,
                });
            }
            const totalQb = queryRunner.manager
                .getRepository(register_organization_entity_1.RegisterOrganization)
                .createQueryBuilder('org')
                .leftJoin(organization_setup_progress_entity_1.OrganizationSetupProgress, 'progress', 'progress.organization_id = org.organization_id')
                .select('org.organization_id')
                .groupBy('org.organization_id')
                .having(`${completedTasksExpr} > 0`);
            if (search) {
                totalQb.andWhere('org.organization_name ILIKE :search', {
                    search: `%${search}%`,
                });
            }
            const totalRows = await totalQb.getRawMany();
            const total = totalRows.length;
            qb.offset(offset).limit(limit);
            const orgData = await qb.getRawMany();
            const finalData = orgData.map((org) => ({
                organization_id: Number(org.organization_id),
                organization_name: org.organization_name,
                completed_tasks: Number(org.completed_tasks),
                pending_tasks: Number(org.pending_tasks),
                completion_percentage: Number(org.completion_percentage),
            }));
            return {
                data: finalData,
                total,
            };
        }
        finally {
            await queryRunner.release();
        }
    }
    async getSupportTasks(body) {
        const { page = 1, limit = 10, search = '', } = body;
        const skip = (page - 1) * limit;
        const query = this.dataSource
            .getRepository(setup_task_entity_1.SetupTask)
            .createQueryBuilder('task')
            .leftJoinAndSelect('task.category', 'category');
        if (search) {
            query.andWhere(`(task.title ILIKE :search OR category.name ILIKE :search)`, { search: `%${search}%` });
        }
        const [data, total] = await query
            .orderBy('task.displayOrder', 'ASC')
            .skip(skip)
            .take(limit)
            .getManyAndCount();
        const formatted = data.map((task) => ({
            id: task.id,
            title: task.title,
            description: task.description,
            category_name: task.category?.name,
            navigation_path: task.navigationPath,
            icon: task.icon,
            required_role: task.requiredRole,
            estimated_time: task.estimatedTime,
            is_active: task.isActive,
        }));
        return {
            data: formatted,
            total,
        };
    }
    async markOrgTaskComplete(dto) {
        try {
            console.log('[Billing Service] Inserting org progress', dto);
            const result = await this.dataSource.query(`
      INSERT INTO onboarding_engine.organization_setup_progress
        (organization_id, task_id, status, completed_by, completed_at)
      VALUES ($1,$2,'COMPLETED',$3,NOW())
      ON CONFLICT (organization_id, task_id)
      DO UPDATE SET
        status = 'COMPLETED',
        completed_by = $3,
        completed_at = NOW()
      WHERE onboarding_engine.organization_setup_progress.status IS DISTINCT FROM 'COMPLETED'
      `, [dto.organizationId, dto.taskId, dto.userId]);
            if (result.rowCount === 0) {
                return {
                    success: false,
                    message: 'Task already completed',
                };
            }
            return {
                success: true,
                message: 'Org task completed successfully',
            };
        }
        catch (error) {
            console.error('[Billing Service] Error inserting org progress', error);
            throw error;
        }
    }
    async getTask(taskId) {
        return this.taskRepo.find({
            where: { id: taskId },
        });
    }
};
exports.OnboardingEngineService = OnboardingEngineService;
exports.OnboardingEngineService = OnboardingEngineService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_2.InjectRepository)(setup_task_entity_1.SetupTask)),
    __param(2, (0, typeorm_2.InjectRepository)(setup_task_step_entity_1.SetupTaskStep)),
    __param(3, (0, typeorm_2.InjectRepository)(organization_setup_progress_entity_1.OrganizationSetupProgress)),
    __param(4, (0, typeorm_2.InjectRepository)(user_setup_progress_entity_1.UserSetupProgress)),
    __param(5, (0, typeorm_2.InjectRepository)(setup_task_mappings_entity_1.SetupTaskMapping)),
    __metadata("design:paramtypes", [typeorm_1.DataSource,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository])
], OnboardingEngineService);
