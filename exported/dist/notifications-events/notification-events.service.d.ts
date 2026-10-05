import { Repository, DataSource } from 'typeorm';
import { NotificationEvent } from './entities/notifications-event.entity';
import { CreateNotificationEventDto } from './dto/create-notification-event.dto';
import { UpdateNotificationEventDto } from './dto/update-notification-event.dto';
import { UpdateIntegrationTypeDto } from './dto/update-integration-type.dto';
import { CreateIntegrationTypeDto } from './dto/create-integration-type.dto';
import { IntegrationType } from './entities/integration-type.entity';
import { NotificationChannel } from './entities/notification-channel.entity';
import { NotificationTemplateVersion } from './entities/notification-template-version.entity';
import { NotificationTemplate } from './entities/notification-template.entity';
import { CreateNotificationTemplateVersionDto } from './dto/create-notification-template-version.dto';
import { EnableDisableTemplateVersionDto } from './dto/enabledisabletemplateversion.dto';
import { ThirdPartyVendor } from './entities/third-party-vendor.entity';
import { AccountTypesEnum } from './enums/enums';
import { TemplateVersionState } from './entities/notification-template-version.entity';
import { AccountWiseDisplayMap } from './list-view-registry/list-view-registry';
import { UpdateNotificationTemplateVersionDto } from './dto/update-notification-template-version.dto';
import { InAppNotifications } from 'src/push-notification/entity/in-app-notifications.entity';
import { CreateNotificationSettingDto } from './dto/create-notification-setting.dto';
import { CreateNotificationTriggerDto } from './dto/create-notification-trigger.dto';
import { NotificationTriggers } from './entities/notification-trigger.entity';
import { NotificationSettings } from './entities/notification-setting.entity';
type DisplayNameMap = Record<string, string>;
type PageRedirectMap = Record<string, string> | string | null;
export interface PayloadSchema {
    display_names: DisplayNameMap;
    page_redirect?: PageRedirectMap;
}
export declare class NotificationEventsService {
    private readonly dataSource;
    private repository;
    private IntegrationTyperepository;
    private templateRepository;
    private notificationChannelRepository;
    private templateversionRepository;
    private thirdPartyVendorRepo;
    private notificationRepo;
    private triggerRepository;
    private settingsRepository;
    constructor(dataSource: DataSource, repository: Repository<NotificationEvent>, IntegrationTyperepository: Repository<IntegrationType>, templateRepository: Repository<NotificationTemplate>, notificationChannelRepository: Repository<NotificationChannel>, templateversionRepository: Repository<NotificationTemplateVersion>, thirdPartyVendorRepo: Repository<ThirdPartyVendor>, notificationRepo: Repository<InAppNotifications>, triggerRepository: Repository<NotificationTriggers>, settingsRepository: Repository<NotificationSettings>);
    getAllEvents(filters: {
        page: number;
        limit: number;
        search?: string;
        status?: string;
    }): Promise<{
        message: string;
        data: NotificationEvent[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    create(dto: CreateNotificationEventDto): Promise<NotificationEvent>;
    update(id: number, dto: UpdateNotificationEventDto): Promise<NotificationEvent>;
    remove(id: number): Promise<{
        message: string;
    }>;
    getAllIntegrationTypes(filters: {
        page: number;
        limit: number;
        search?: string;
        status?: string;
    }): Promise<{
        data: IntegrationType[];
        total: number;
        page: number;
        limit: number;
    }>;
    createIntegrationType(dto: CreateIntegrationTypeDto): Promise<IntegrationType>;
    UpdateIntegrationType(id: number, dto: UpdateIntegrationTypeDto): Promise<IntegrationType>;
    removeIntegrationType(id: number): Promise<{
        message: string;
    }>;
    getAllNotificationTemplates(filters: {
        page: number;
        limit: number;
        search?: string;
        status?: string;
        eventId?: number;
    }): Promise<{
        message: string;
        data: NotificationTemplate[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    getTemplates(page: number, limit: number, search?: string, status?: string): Promise<{
        data: NotificationTemplate[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    createTemplate(body: any): Promise<{
        message: string;
        data: NotificationTemplate;
    }>;
    updateTemplate(id: number, bodyDto: any): Promise<{
        message: string;
    }>;
    createTemplateVersion(dto: CreateNotificationTemplateVersionDto): Promise<{
        success: boolean;
        message: string;
    }>;
    getTemplateVersionById(version_id: number): Promise<{
        success: boolean;
        message: string;
        data: {
            template_name: string;
            vendor_name: string;
            version_id: number;
            template_id: number;
            template: NotificationTemplate;
            version_no: number;
            state: TemplateVersionState;
            valid_from: Date;
            valid_to: Date;
            subject: string;
            body: string;
            body_format: string;
            dlt_template_id: string;
            notes: string;
            vendor_id: number;
            vendor: ThirdPartyVendor;
            template_variables: Record<string, any>;
            is_enabled: number;
            is_deleted: number;
            created_by: number;
            updated_by: number;
            created_at: Date;
            updated_at: Date;
            redirect_key: string;
            redirect_params: string[];
            notification_batches: import("./entities/notification_batches.entity").NotificationBatch[];
            notification_messages: import("./entities/notifications_messages.entity").NotificationMessage[];
        };
    }>;
    deleteTemplateVersion(version_id: number, updated_by: number): Promise<{
        success: boolean;
        message: string;
    }>;
    enableDisableTemplateVersion(enableDisableTemplateDto: EnableDisableTemplateVersionDto): Promise<{
        success: boolean;
        message: string;
    }>;
    updateTemplateVersion(dto: UpdateNotificationTemplateVersionDto): Promise<{
        success: boolean;
        message: string;
    }>;
    getTemplateVersions(templateId: number, page: number, limit: number, state?: string): Promise<{
        templateId: number;
        templateName: string;
        data: NotificationTemplateVersion[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    getVendorDropdown(): Promise<any[]>;
    getTemplateDropdown(): Promise<any[]>;
    getPayloadSchema(accountType: AccountTypesEnum): PayloadSchema;
    getPayloadSchemaForMultiple(accountTypes: AccountTypesEnum[]): AccountWiseDisplayMap;
    getEventDropdown(): Promise<{
        message: string;
        data: NotificationEvent[];
    }>;
    getChannelDropdown(): Promise<{
        message: string;
        data: NotificationChannel[];
    }>;
    getAllNotificationsByEvent(id: number): Promise<{
        success: boolean;
        message: string;
        data: {};
    }>;
    getAllNotificationsByEventForAsset(eventId: number): Promise<{
        success: boolean;
        message: string;
        data: {
            event_id: number;
            notifications: {};
        };
    }>;
    getVendors(page: number, limit: number, search?: string, status?: string): Promise<{
        data: ThirdPartyVendor[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    getNotifications(recipientId: string): Promise<{
        data: InAppNotifications[];
    }>;
    getUnreadCount(recipientId: string): Promise<{
        data: {
            count: number;
        };
    }>;
    markAsRead(notificationId: number): Promise<InAppNotifications>;
    getRedirectOptions(): {
        key: string;
        label: string;
        url: string;
        params: any[];
    }[];
    createConfig(settingDto: CreateNotificationSettingDto, triggerDtos: CreateNotificationTriggerDto[]): Promise<{
        success: boolean;
        message: string;
        data: NotificationSettings;
    }>;
    updateConfig(event_id: number, channel_id: number, settingDto: CreateNotificationSettingDto, triggerDtos: CreateNotificationTriggerDto[]): Promise<{
        success: boolean;
        message: string;
    }>;
    getConfig(event_id: number): Promise<{
        success: boolean;
        message: string;
        data: {
            settings: NotificationSettings[];
            triggers: NotificationTriggers[];
        };
    }>;
    getAllSettingsByEvent(filters: {
        page?: number;
        limit?: number;
        search?: string;
    }): Promise<{
        data: any[];
        pagination: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
}
export {};
