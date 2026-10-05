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
exports.NotificationEventsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const notifications_event_entity_1 = require("./entities/notifications-event.entity");
const integration_type_entity_1 = require("./entities/integration-type.entity");
const notification_channel_entity_1 = require("./entities/notification-channel.entity");
const notification_template_version_entity_1 = require("./entities/notification-template-version.entity");
const notification_template_entity_1 = require("./entities/notification-template.entity");
const error_dto_1 = require("../common/error-dto/error-dto");
const third_party_vendor_entity_1 = require("./entities/third-party-vendor.entity");
const list_view_registry_1 = require("./list-view-registry/list-view-registry");
const in_app_notifications_entity_1 = require("../push-notification/entity/in-app-notifications.entity");
const notification_redirect_config_1 = require("./configs/notification-redirect.config");
const notification_trigger_entity_1 = require("./entities/notification-trigger.entity");
const notification_setting_entity_1 = require("./entities/notification-setting.entity");
let NotificationEventsService = class NotificationEventsService {
    constructor(dataSource, repository, IntegrationTyperepository, templateRepository, notificationChannelRepository, templateversionRepository, thirdPartyVendorRepo, notificationRepo, triggerRepository, settingsRepository) {
        this.dataSource = dataSource;
        this.repository = repository;
        this.IntegrationTyperepository = IntegrationTyperepository;
        this.templateRepository = templateRepository;
        this.notificationChannelRepository = notificationChannelRepository;
        this.templateversionRepository = templateversionRepository;
        this.thirdPartyVendorRepo = thirdPartyVendorRepo;
        this.notificationRepo = notificationRepo;
        this.triggerRepository = triggerRepository;
        this.settingsRepository = settingsRepository;
    }
    async getAllEvents(filters) {
        const { page, limit, search, status } = filters;
        const query = this.repository.createQueryBuilder('event')
            .where('event.is_deleted = :is_deleted', { is_deleted: 0 });
        if (search) {
            query.andWhere('(event.event_name ILIKE :search OR event.event_description ILIKE :search)', { search: `%${search}%` });
        }
        if (status) {
            query.andWhere('event.status = :status', { status });
        }
        query
            .skip((page - 1) * limit)
            .take(limit)
            .orderBy('event.event_id', 'DESC');
        const [data, total] = await query.getManyAndCount();
        return {
            message: 'Notification events fetched successfully',
            data,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }
    async create(dto) {
        const event = this.repository.create(dto);
        return await this.repository.save(event);
    }
    async update(id, dto) {
        const event = await this.repository.findOne({
            where: { event_id: id, is_deleted: 0 },
        });
        if (!event) {
            throw new common_1.NotFoundException('Notification event not found');
        }
        Object.assign(event, dto);
        return await this.repository.save(event);
    }
    async remove(id) {
        const event = await this.repository.findOne({
            where: { event_id: id, is_deleted: 0 },
        });
        if (!event) {
            throw new common_1.NotFoundException('Notification event not found');
        }
        event.is_deleted = 1;
        await this.repository.save(event);
        return {
            message: 'Notification event deleted successfully',
        };
    }
    async getAllIntegrationTypes(filters) {
        const { page, limit, search, status } = filters;
        const query = this.IntegrationTyperepository
            .createQueryBuilder('integration')
            .where('integration.is_deleted = 0');
        if (search) {
            query.andWhere(`(integration.integration_type_name ILIKE :search
          OR integration.integration_type_description ILIKE :search)`, { search: `%${search}%` });
        }
        if (status !== undefined) {
            query.andWhere('integration.is_enabled = :status', {
                status: Number(status),
            });
        }
        const [data, total] = await query
            .orderBy('integration.created_at', 'DESC')
            .skip((page - 1) * limit)
            .take(limit)
            .getManyAndCount();
        return {
            data,
            total,
            page,
            limit,
        };
    }
    async createIntegrationType(dto) {
        const entity = this.IntegrationTyperepository.create({
            ...dto,
            is_deleted: 0,
        });
        return await this.IntegrationTyperepository.save(entity);
    }
    async UpdateIntegrationType(id, dto) {
        const entity = await this.IntegrationTyperepository.findOne({
            where: { integration_type_id: id, is_deleted: 0 },
        });
        if (!entity) {
            throw new common_1.NotFoundException('Integration type not found');
        }
        Object.assign(entity, dto);
        entity.updated_at = new Date();
        return await this.IntegrationTyperepository.save(entity);
    }
    async removeIntegrationType(id) {
        const entity = await this.IntegrationTyperepository.findOne({
            where: { integration_type_id: id, is_deleted: 0 },
        });
        if (!entity) {
            throw new common_1.NotFoundException('Integration type not found');
        }
        entity.is_deleted = 1;
        entity.updated_at = new Date();
        await this.IntegrationTyperepository.save(entity);
        return { message: 'Integration type deleted successfully' };
    }
    async getAllNotificationTemplates(filters) {
        const { page, limit, search, status, eventId } = filters;
        const query = this.templateRepository
            .createQueryBuilder('template')
            .leftJoinAndSelect('template.event', 'event')
            .leftJoinAndSelect('template.channel', 'channel')
            .where('template.is_deleted = 0');
        if (search) {
            query.andWhere(`(template.template_name ILIKE :search
        OR template.language_code ILIKE :search)`, { search: `%${search}%` });
        }
        if (status !== undefined) {
            query.andWhere('template.is_enabled = :status', {
                status: Number(status),
            });
        }
        if (eventId) {
            query.andWhere('template.event_id = :eventId', { eventId });
        }
        const [data, total] = await query
            .orderBy('template.created_at', 'DESC')
            .skip((page - 1) * limit)
            .take(limit)
            .getManyAndCount();
        return {
            message: 'Notification templates fetched successfully',
            data,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }
    async getTemplates(page, limit, search, status) {
        const query = this.templateRepository
            .createQueryBuilder('template')
            .leftJoinAndSelect('template.channel', 'channel')
            .leftJoinAndSelect('template.versions', 'versions')
            .orderBy('template.created_at', 'DESC');
        if (search) {
            query.andWhere(`(LOWER(template.template_name) LIKE LOWER(:search))`, { search: `%${search}%` });
        }
        if (status) {
            query.andWhere('template.status = :status', { status });
        }
        const [data, total] = await query
            .skip((page - 1) * limit)
            .take(limit)
            .getManyAndCount();
        return {
            data,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }
    async createTemplate(body) {
        const { template_name, channel_id, event_id, language_code, is_enabled, } = body;
        const channel = await this.notificationChannelRepository.findOne({
            where: { notification_channel_id: channel_id },
        });
        if (!channel) {
            throw new common_1.BadRequestException('Notification channel not found');
        }
        const event = await this.repository.findOne({
            where: { event_id },
        });
        if (!event) {
            throw new common_1.BadRequestException('Notification event not found');
        }
        const template = this.templateRepository.create({
            template_name,
            channel_id,
            event_id,
            language_code: language_code ?? 'en',
            is_enabled: is_enabled ?? 1,
        });
        const savedTemplate = await this.templateRepository.save(template);
        return {
            message: 'Notification template created successfully',
            data: savedTemplate,
        };
    }
    async updateTemplate(id, bodyDto) {
        const template = await this.templateRepository.findOne({
            where: { template_id: id },
            relations: ['versions'],
        });
        if (!template) {
            throw new common_1.NotFoundException('Template not found');
        }
        const { template_name, channel_id, language_code, is_enabled, } = bodyDto;
        if (template_name)
            template.template_name = template_name;
        if (language_code)
            template.language_code = language_code;
        if (is_enabled !== undefined)
            template.is_enabled = is_enabled;
        if (channel_id) {
            const channel = await this.notificationChannelRepository.findOne({
                where: { notification_channel_id: channel_id },
            });
            if (!channel) {
                throw new common_1.BadRequestException('Notification channel not found');
            }
            template.channel_id = channel_id;
        }
        await this.templateRepository.save(template);
        return {
            message: 'Notification template updated successfully',
        };
    }
    async createTemplateVersion(dto) {
        try {
            console.log("Service received DTO:", dto);
            const template = await this.templateRepository.findOne({
                where: { template_id: dto.template_id },
            });
            if (!template)
                throw new common_1.NotFoundException("Template not found");
            const exists = await this.templateversionRepository.findOne({
                where: {
                    template_id: dto.template_id,
                    version_no: dto.version_no,
                },
            });
            if (exists)
                throw new common_1.BadRequestException("Version number already exists for this template");
            const entity = this.templateversionRepository.create({
                template_id: dto.template_id,
                vendor_id: dto.vendor_id || 2,
                version_no: dto.version_no,
                state: dto.state,
                body: dto.body,
                body_format: dto.body_format,
                dlt_template_id: dto.dlt_template_id,
                notes: dto.notes,
                subject: dto.subject,
                created_by: dto.created_by,
                template_variables: dto.template_variables || null,
                redirect_key: dto.redirect_key || null,
                redirect_params: dto.redirect_params || null,
                is_enabled: 1,
                is_deleted: 0,
                created_at: new Date(),
            });
            console.log("Saving entity to DB:", entity);
            await this.templateversionRepository.save(entity);
            return {
                success: true,
                message: "Template version created successfully",
            };
        }
        catch (error) {
            console.error("Error in createTemplateVersion:", error);
            throw new common_1.BadRequestException({
                success: false,
                message: error?.message || "Something went wrong",
                stack: error?.stack,
            });
        }
    }
    async getTemplateVersionById(version_id) {
        try {
            const t = await this.templateversionRepository.findOne({
                where: { version_id: version_id, is_deleted: 0 },
                relations: ['template', 'vendor'],
            });
            if (!t)
                throw new common_1.NotFoundException('Template Version not found');
            return {
                success: true,
                message: 'Template Version Details fetched successfully',
                data: {
                    ...t,
                    template_name: t.template?.template_name || null,
                    vendor_name: t.vendor?.vendorName || null,
                },
            };
        }
        catch (error) {
            const dbError = (0, error_dto_1.getErrorMessage)(error);
            throw new common_1.BadRequestException({
                success: false,
                code: dbError.code,
                message: dbError.message,
            });
        }
    }
    async deleteTemplateVersion(version_id, updated_by) {
        try {
            const template = await this.templateversionRepository.findOne({
                where: { version_id: version_id, is_deleted: 0 },
            });
            if (!template) {
                throw new common_1.NotFoundException('Template Version not found');
            }
            template.is_enabled = 0;
            template.is_deleted = 1;
            template.updated_by = updated_by;
            template.updated_at = new Date();
            await this.templateversionRepository.save(template);
            return {
                success: true,
                message: 'Template deleted successfully',
            };
        }
        catch (error) {
            const dbError = (0, error_dto_1.getErrorMessage)(error);
            throw new common_1.BadRequestException({
                success: false,
                code: dbError.code,
                message: dbError.message,
            });
        }
    }
    async enableDisableTemplateVersion(enableDisableTemplateDto) {
        try {
            const { version_id, is_enabled } = enableDisableTemplateDto;
            const currentVersion = await this.templateversionRepository.findOne({
                where: { version_id: version_id, is_deleted: 0 },
            });
            if (!currentVersion) {
                throw new common_1.NotFoundException('Template Version not found');
            }
            const templateId = currentVersion.template_id;
            await this.templateversionRepository.update({
                template_id: templateId,
                version_id: (0, typeorm_2.Not)(version_id),
                is_deleted: 0,
            }, {
                is_enabled: 0,
            });
            await this.templateversionRepository.update({ version_id: version_id }, { is_enabled });
            return {
                success: true,
                message: 'Template version updated successfully',
            };
        }
        catch (error) {
            const dbError = (0, error_dto_1.getErrorMessage)(error);
            throw new common_1.BadRequestException({
                success: false,
                code: dbError.code,
                message: dbError.message,
            });
        }
    }
    async updateTemplateVersion(dto) {
        try {
            const existingVersion = await this.templateversionRepository.findOne({
                where: { version_id: dto.version_id },
            });
            if (!existingVersion) {
                throw new common_1.NotFoundException('Template version not found');
            }
            Object.assign(existingVersion, dto, { updated_at: new Date() });
            await this.templateversionRepository.save(existingVersion);
            return {
                success: true,
                message: 'Template version updated successfully',
            };
        }
        catch (error) {
            const dbError = (0, error_dto_1.getErrorMessage)(error);
            throw new common_1.BadRequestException({
                success: false,
                code: dbError.code,
                message: dbError.message,
            });
        }
    }
    async getTemplateVersions(templateId, page, limit, state) {
        const template = await this.templateRepository.findOne({
            where: { template_id: templateId, is_deleted: 0 },
            select: ['template_id', 'template_name'],
        });
        if (!template) {
            throw new common_1.NotFoundException('Template not found');
        }
        const query = this.templateversionRepository
            .createQueryBuilder('v')
            .where('v.template_id = :templateId', { templateId })
            .andWhere('v.is_deleted = 0');
        if (state) {
            query.andWhere('v.state = :state', { state });
        }
        const [data, total] = await query
            .orderBy('v.version_no', 'DESC')
            .skip((page - 1) * limit)
            .take(limit)
            .getManyAndCount();
        return {
            templateId: template.template_id,
            templateName: template.template_name,
            data,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }
    async getVendorDropdown() {
        return this.thirdPartyVendorRepo
            .createQueryBuilder('vendor')
            .select([
            'vendor.vendorId AS value',
            'vendor.vendorName AS label',
        ])
            .where('vendor.isDeleted = :isDeleted', { isDeleted: 0 })
            .andWhere('vendor.isEnabled = :isEnabled', { isEnabled: 1 })
            .orderBy('vendor.vendorName', 'ASC')
            .getRawMany();
    }
    async getTemplateDropdown() {
        return this.templateRepository
            .createQueryBuilder('template')
            .select([
            'template.template_id AS value',
            'template.template_name AS label',
            'template.channel_id AS channel_id',
        ])
            .where('template.is_deleted = :isDeleted', { isDeleted: 0 })
            .andWhere('template.is_enabled = :isEnabled', { isEnabled: 1 })
            .orderBy('template.template_name', 'ASC')
            .getRawMany();
    }
    getPayloadSchema(accountType) {
        const registryKey = list_view_registry_1.ACCOUNT_TYPE_LISTVIEW_MAP[accountType];
        const config = list_view_registry_1.LIST_VIEW_REGISTRY[registryKey];
        if (!config?.display_names) {
            throw new Error(`display_names missing for ${registryKey}`);
        }
        return {
            display_names: config.display_names,
            page_redirect: config.page_redirect ?? null,
        };
    }
    getPayloadSchemaForMultiple(accountTypes) {
        const result = {};
        for (const accountType of accountTypes) {
            result[accountType] = this.getPayloadSchema(accountType);
        }
        return result;
    }
    async getEventDropdown() {
        const events = await this.repository.find({
            select: {
                event_id: true,
                event_name: true,
            },
            where: {
                is_deleted: 0,
                is_enabled: 1,
            },
            order: {
                event_name: 'ASC',
            },
        });
        return {
            message: 'Events fetched successfully',
            data: events,
        };
    }
    async getChannelDropdown() {
        const channels = await this.notificationChannelRepository.find({
            select: {
                notification_channel_id: true,
                notification_channel_name: true,
            },
            order: {
                notification_channel_name: 'ASC',
            },
        });
        return {
            message: 'Channels fetched successfully',
            data: channels,
        };
    }
    async getAllNotificationsByEvent(id) {
        try {
            const event = await this.repository.findOne({ where: { event_id: id, is_enabled: 1, is_deleted: 0 } });
            if (!event)
                throw new common_1.NotFoundException('Event not found');
            const data = await this.templateversionRepository.find({
                where: {
                    is_enabled: 1,
                    is_deleted: 0,
                    template: {
                        event_id: id,
                        is_enabled: 1,
                        is_deleted: 0,
                    },
                    vendor: {
                        isEnabled: 1,
                        isDeleted: 0,
                    },
                },
                relations: [
                    'template',
                    'template.channel',
                    'vendor',
                ],
            });
            let groupedByChannel = data.reduce((acc, item) => {
                const channelName = item.template.channel.notification_channel_name;
                if (!acc[channelName]) {
                    acc[channelName] = [];
                }
                acc[channelName].push(item);
                return acc;
            }, {});
            groupedByChannel = { event, notifications: groupedByChannel };
            return {
                success: true,
                message: "Event Notifications",
                data: groupedByChannel
            };
        }
        catch (error) {
            const dbError = (0, error_dto_1.getErrorMessage)(error);
            throw new common_1.BadRequestException({
                success: false,
                code: dbError.code,
                message: dbError.message,
            });
        }
    }
    async getAllNotificationsByEventForAsset(eventId) {
        try {
            const templates = await this.templateversionRepository.find({
                where: {
                    is_enabled: 1,
                    is_deleted: 0,
                    template: {
                        event_id: eventId,
                        is_enabled: 1,
                        is_deleted: 0,
                    },
                },
                relations: [
                    'template',
                    'template.channel',
                ],
            });
            if (!templates.length) {
                throw new common_1.NotFoundException('No active templates found for this event');
            }
            const groupedByChannel = templates.reduce((acc, version) => {
                const channelName = version.template.channel.notification_channel_name;
                if (!acc[channelName]) {
                    acc[channelName] = [];
                }
                acc[channelName].push({
                    template_id: version.template.template_id,
                    template_name: version.template.template_name,
                    template_version_id: version.version_id,
                    subject: version.subject,
                    body: version.body,
                    template_variables: version.template_variables,
                });
                return acc;
            }, {});
            return {
                success: true,
                message: 'Event Templates',
                data: {
                    event_id: eventId,
                    notifications: groupedByChannel,
                },
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async getVendors(page, limit, search, status) {
        const query = this.thirdPartyVendorRepo
            .createQueryBuilder('vendor')
            .leftJoinAndSelect('vendor.templateVersions', 'versions')
            .orderBy('vendor.createdAt', 'DESC');
        if (search) {
            query.andWhere(`(LOWER(vendor.vendorName) LIKE LOWER(:search)
        OR LOWER(vendor.vendorEmailAddress) LIKE LOWER(:search)
        OR LOWER(vendor.vendorContactPersonName) LIKE LOWER(:search))`, { search: `%${search}%` });
        }
        if (status) {
            query.andWhere('vendor.isEnabled = :status', {
                status: +status,
            });
        }
        query.andWhere('vendor.isDeleted = :isDeleted', {
            isDeleted: 0,
        });
        const [data, total] = await query
            .skip((page - 1) * limit)
            .take(limit)
            .getManyAndCount();
        return {
            data,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }
    async getNotifications(recipientId) {
        const notifications = await this.notificationRepo.find({
            where: { recipient_id: recipientId },
            order: { created_at: 'DESC' },
        });
        return { data: notifications };
    }
    async getUnreadCount(recipientId) {
        const count = await this.notificationRepo.count({
            where: { recipient_id: recipientId, is_read: false },
        });
        return { data: { count } };
    }
    async markAsRead(notificationId) {
        const notif = await this.notificationRepo.findOne({
            where: { notification_id: notificationId },
        });
        if (!notif)
            return null;
        notif.is_read = true;
        await this.notificationRepo.save(notif);
        return notif;
    }
    getRedirectOptions() {
        return Object.entries(notification_redirect_config_1.NOTIFICATION_REDIRECTS).map(([key, value]) => ({
            key,
            label: value.label,
            url: value.url,
            params: value.params || [],
        }));
    }
    async createConfig(settingDto, triggerDtos) {
        try {
            console.log("Service received DTO:", { settingDto, triggerDtos });
            const toNumberOrNull = (val) => val === "" || val === undefined ? null : Number(val);
            const toStringOrNull = (val) => val === "" || val === undefined ? null : val;
            const event = await this.repository.findOne({
                where: { event_id: settingDto.event_id },
            });
            if (!event)
                throw new common_1.NotFoundException("Event not found");
            const channel = await this.notificationChannelRepository.findOne({
                where: { notification_channel_id: settingDto.channel_id },
            });
            if (!channel)
                throw new common_1.NotFoundException("Channel not found");
            const exists = await this.settingsRepository.findOne({
                where: {
                    event_id: settingDto.event_id,
                    channel_id: settingDto.channel_id,
                },
            });
            if (exists) {
                throw new common_1.BadRequestException("Notification setting already exists for this event and channel");
            }
            const settingEntity = this.settingsRepository.create({
                event_id: settingDto.event_id,
                channel_id: settingDto.channel_id,
                is_enabled: settingDto.is_enabled ?? true,
                quota_limit: settingDto.quota_limit,
                quota_interval: settingDto.quota_interval,
                send_start_time: settingDto.send_start_time,
                send_end_time: settingDto.send_end_time,
                created_at: new Date(),
                updated_at: new Date(),
            });
            console.log("Saving setting:", settingEntity);
            const savedSetting = await this.settingsRepository.save(settingEntity);
            if (triggerDtos?.length) {
                const triggerEntities = triggerDtos.map((t) => this.triggerRepository.create({
                    setting_id: savedSetting.id,
                    trigger_type: t.trigger_type,
                    delay_value: toNumberOrNull(t.delay_value),
                    delay_unit: toStringOrNull(t.delay_unit),
                    repeat_enabled: t.repeat_enabled ?? false,
                    repeat_count: t.repeat_enabled
                        ? (t.repeat_count ?? 1)
                        : null,
                    repeat_interval: t.repeat_enabled
                        ? toNumberOrNull(t.repeat_interval)
                        : null,
                    repeat_unit: t.repeat_enabled
                        ? toStringOrNull(t.repeat_unit)
                        : null,
                    repeat_times: t.repeat_enabled
                        ? toNumberOrNull(t.repeat_times)
                        : null,
                    schedule_type: toStringOrNull(t.schedule_type),
                    day_of_month: toNumberOrNull(t.day_of_month),
                    day_of_week: toNumberOrNull(t.day_of_week),
                    schedule_time: t.schedule_time || null,
                    condition_type: toStringOrNull(t.condition_type),
                    operator: toStringOrNull(t.operator),
                    condition_value: toNumberOrNull(t.condition_value),
                    sequence_no: toNumberOrNull(t.sequence_no) ?? 1,
                    stop_after: t.stop_after || null,
                    created_at: new Date(),
                }));
                console.log("Saving triggers:", triggerEntities);
                await this.triggerRepository.save(triggerEntities);
            }
            return {
                success: true,
                message: "Notification config created successfully",
                data: savedSetting,
            };
        }
        catch (error) {
            console.error("Error in createConfig:", error);
            throw new common_1.BadRequestException({
                success: false,
                message: error?.message || "Something went wrong",
                stack: error?.stack,
            });
        }
    }
    async updateConfig(event_id, channel_id, settingDto, triggerDtos) {
        try {
            console.log("Update DTO:", { event_id, channel_id, settingDto, triggerDtos });
            const toNumberOrNull = (val) => val === "" || val === undefined || val === null ? null : Number(val);
            const toStringOrNull = (val) => val === "" || val === undefined ? null : val;
            const existing = await this.settingsRepository.findOne({
                where: { event_id, channel_id },
            });
            if (!existing) {
                throw new common_1.NotFoundException("Notification setting not found");
            }
            await this.settingsRepository.update({ id: existing.id }, {
                event_id: settingDto.event_id,
                channel_id: settingDto.channel_id,
                is_enabled: settingDto.is_enabled ?? true,
                quota_limit: toNumberOrNull(settingDto.quota_limit),
                quota_interval: toStringOrNull(settingDto.quota_interval),
                send_start_time: settingDto.send_start_time,
                send_end_time: settingDto.send_end_time,
                updated_at: new Date(),
            });
            await this.triggerRepository.delete({
                setting_id: existing.id,
            });
            if (triggerDtos?.length) {
                const triggerEntities = triggerDtos.map((t, index) => this.triggerRepository.create({
                    setting_id: existing.id,
                    trigger_type: t.trigger_type,
                    delay_value: toNumberOrNull(t.delay_value),
                    delay_unit: toStringOrNull(t.delay_unit),
                    repeat_enabled: t.repeat_enabled ?? false,
                    repeat_count: t.repeat_enabled
                        ? t.repeat_count ?? 1
                        : null,
                    repeat_interval: t.repeat_enabled
                        ? toNumberOrNull(t.repeat_interval)
                        : null,
                    repeat_unit: t.repeat_enabled
                        ? toStringOrNull(t.repeat_unit)
                        : null,
                    repeat_times: t.repeat_enabled
                        ? toNumberOrNull(t.repeat_times)
                        : null,
                    schedule_type: toStringOrNull(t.schedule_type),
                    day_of_month: toNumberOrNull(t.day_of_month),
                    day_of_week: toNumberOrNull(t.day_of_week),
                    condition_type: toStringOrNull(t.condition_type),
                    operator: toStringOrNull(t.operator),
                    condition_value: toNumberOrNull(t.condition_value),
                    schedule_time: t.schedule_time || null,
                    sequence_no: toNumberOrNull(t.sequence_no) ?? index + 1,
                    stop_after: t.stop_after || null,
                    created_at: new Date(),
                }));
                await this.triggerRepository.save(triggerEntities);
            }
            return {
                success: true,
                message: "Notification config updated successfully",
            };
        }
        catch (error) {
            console.error("Error in updateConfig:", error);
            throw new common_1.BadRequestException({
                success: false,
                message: error?.message || "Something went wrong",
            });
        }
    }
    async getConfig(event_id) {
        try {
            console.log("Fetching config for event_id:", event_id);
            const settings = await this.settingsRepository.find({
                where: { event_id },
                relations: ['channel', 'event'],
            });
            if (!settings.length) {
                throw new common_1.NotFoundException("Notification config not found");
            }
            const settingIds = settings.map((s) => s.id);
            const triggers = await this.triggerRepository.find({
                where: {
                    setting_id: (0, typeorm_2.In)(settingIds),
                },
                order: {
                    sequence_no: 'ASC',
                },
            });
            return {
                success: true,
                message: "Notification config fetched successfully",
                data: {
                    settings,
                    triggers,
                },
            };
        }
        catch (error) {
            console.error("Error in getConfig:", error);
            throw new common_1.BadRequestException({
                success: false,
                message: error?.message || "Something went wrong",
                stack: error?.stack,
            });
        }
    }
    async getAllSettingsByEvent(filters) {
        try {
            const page = filters.page || 1;
            const limit = filters.limit || 10;
            const skip = (page - 1) * limit;
            const query = this.settingsRepository
                .createQueryBuilder("setting")
                .leftJoinAndSelect("setting.triggers", "trigger")
                .leftJoinAndSelect("setting.event", "event");
            if (filters.search) {
                query.andWhere(`(LOWER(event.event_name) LIKE LOWER(:search))`, { search: `%${filters.search}%` });
            }
            const total = await query.getCount();
            const settings = await query
                .orderBy("event.event_name", "ASC")
                .addOrderBy("setting.id", "ASC")
                .skip(skip)
                .take(limit)
                .getMany();
            const grouped = settings.reduce((acc, setting) => {
                const eventId = setting.event_id;
                if (!acc[eventId]) {
                    acc[eventId] = {
                        event_id: eventId,
                        event_name: setting.event?.event_name || "",
                        settings: [],
                    };
                }
                acc[eventId].settings.push(setting);
                return acc;
            }, {});
            return {
                data: Object.values(grouped),
                pagination: {
                    total,
                    page,
                    limit,
                    totalPages: Math.ceil(total / limit),
                },
            };
        }
        catch (error) {
            console.error("Error fetching event-wise settings:", error);
            throw new common_1.BadRequestException({
                success: false,
                message: error?.message || "Failed to fetch settings",
            });
        }
    }
};
exports.NotificationEventsService = NotificationEventsService;
exports.NotificationEventsService = NotificationEventsService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(notifications_event_entity_1.NotificationEvent)),
    __param(2, (0, typeorm_1.InjectRepository)(integration_type_entity_1.IntegrationType)),
    __param(3, (0, typeorm_1.InjectRepository)(notification_template_entity_1.NotificationTemplate)),
    __param(4, (0, typeorm_1.InjectRepository)(notification_channel_entity_1.NotificationChannel)),
    __param(5, (0, typeorm_1.InjectRepository)(notification_template_version_entity_1.NotificationTemplateVersion)),
    __param(6, (0, typeorm_1.InjectRepository)(third_party_vendor_entity_1.ThirdPartyVendor)),
    __param(7, (0, typeorm_1.InjectRepository)(in_app_notifications_entity_1.InAppNotifications)),
    __param(8, (0, typeorm_1.InjectRepository)(notification_trigger_entity_1.NotificationTriggers)),
    __param(9, (0, typeorm_1.InjectRepository)(notification_setting_entity_1.NotificationSettings)),
    __metadata("design:paramtypes", [typeorm_2.DataSource,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], NotificationEventsService);
