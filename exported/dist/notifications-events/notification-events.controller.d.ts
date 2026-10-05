import { NotificationEventsService } from './notification-events.service';
import { NotificationsOrchestratorService } from './render-notification.service';
import { CreateNotificationEventDto } from './dto/create-notification-event.dto';
import { UpdateNotificationEventDto } from './dto/update-notification-event.dto';
import { UpdateIntegrationTypeDto } from './dto/update-integration-type.dto';
import { CreateIntegrationTypeDto } from './dto/create-integration-type.dto';
import { CreateNotificationTemplateVersionDto } from './dto/create-notification-template-version.dto';
import { EnableDisableTemplateVersionDto } from './dto/enabledisabletemplateversion.dto';
import { NotificationTriggerEvent } from './render-notification.service';
import { UpdateNotificationTemplateVersionDto } from './dto/update-notification-template-version.dto';
import { CreateNotificationSettingDto } from './dto/create-notification-setting.dto';
import { CreateNotificationTriggerDto } from './dto/create-notification-trigger.dto';
export declare class NotificationEventsController {
    private readonly service;
    private readonly orchestratorService;
    constructor(service: NotificationEventsService, orchestratorService: NotificationsOrchestratorService);
    getAllEvents(page?: number, limit?: number, search?: string, status?: string): Promise<{
        message: string;
        data: import("./entities/notifications-event.entity").NotificationEvent[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    create(dto: CreateNotificationEventDto): Promise<import("./entities/notifications-event.entity").NotificationEvent>;
    getAllIntegrationTypes(page?: number, limit?: number, search?: string, status?: string): Promise<{
        data: import("./entities/integration-type.entity").IntegrationType[];
        total: number;
        page: number;
        limit: number;
    }>;
    createIntegrationType(dto: CreateIntegrationTypeDto): Promise<import("./entities/integration-type.entity").IntegrationType>;
    updateIntegrationType(id: number, dto: UpdateIntegrationTypeDto): Promise<import("./entities/integration-type.entity").IntegrationType>;
    removeIntegrationType(id: number): Promise<{
        message: string;
    }>;
    update(id: number, dto: UpdateNotificationEventDto): Promise<import("./entities/notifications-event.entity").NotificationEvent>;
    remove(id: number): Promise<{
        message: string;
    }>;
    getAllNotificationTemplates(page?: number, limit?: number, search?: string, status?: string, eventId?: string): Promise<{
        message: string;
        data: import("./entities/notification-template.entity").NotificationTemplate[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    getTemplates(page?: number, limit?: number, search?: string, status?: string): Promise<{
        data: import("./entities/notification-template.entity").NotificationTemplate[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    createTemplate(body: any): Promise<{
        message: string;
        data: import("./entities/notification-template.entity").NotificationTemplate;
    }>;
    updateTemplate(id: number, body: any): Promise<{
        message: string;
    }>;
    createVersion(dto: CreateNotificationTemplateVersionDto): Promise<{
        success: boolean;
        message: string;
    }>;
    updateVersion(dto: UpdateNotificationTemplateVersionDto): Promise<{
        success: boolean;
        message: string;
    }>;
    getSingleVersion(version_id: number): Promise<{
        success: boolean;
        message: string;
        data: {
            template_name: string;
            vendor_name: string;
            version_id: number;
            template_id: number;
            template: import("./entities/notification-template.entity").NotificationTemplate;
            version_no: number;
            state: import("./entities/notification-template-version.entity").TemplateVersionState;
            valid_from: Date;
            valid_to: Date;
            subject: string;
            body: string;
            body_format: string;
            dlt_template_id: string;
            notes: string;
            vendor_id: number;
            vendor: import("./entities/third-party-vendor.entity").ThirdPartyVendor;
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
    deleteVersion(version_id: number, updated_by: number): Promise<{
        success: boolean;
        message: string;
    }>;
    enableDisableVersion(dto: EnableDisableTemplateVersionDto): Promise<{
        success: boolean;
        message: string;
    }>;
    getTemplateVersions(templateId: number, page?: number, limit?: number, state?: string): Promise<{
        templateId: number;
        templateName: string;
        data: import("./entities/notification-template-version.entity").NotificationTemplateVersion[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    getVendorDropdown(): Promise<any[]>;
    getTemplateDropdown(): Promise<any[]>;
    getMultiplePayloadSchemas(accountTypes?: string): Promise<import("./list-view-registry/list-view-registry").AccountWiseDisplayMap>;
    getEventDropdown(): Promise<{
        message: string;
        data: import("./entities/notifications-event.entity").NotificationEvent[];
    }>;
    getChannelDropdown(): Promise<{
        message: string;
        data: import("./entities/notification-channel.entity").NotificationChannel[];
    }>;
    getNotificationsByEvent(event_id: number): Promise<{
        success: boolean;
        message: string;
        data: {};
    }>;
    getNotificationsByEventForAsset(event_id: number): Promise<{
        success: boolean;
        message: string;
        data: {};
    }>;
    triggerNotification(body: NotificationTriggerEvent): Promise<{
        success: boolean;
        message: string;
    }>;
    getVendors(page?: number, limit?: number, search?: string, status?: string): Promise<{
        data: import("./entities/third-party-vendor.entity").ThirdPartyVendor[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    getNotifications(recipientId: string): Promise<{
        data: import("../push-notification/entity/in-app-notifications.entity").InAppNotifications[];
    }>;
    getUnreadCount(recipientId: string): Promise<{
        data: {
            count: number;
        };
    }>;
    markAsRead(notificationId: string): Promise<{
        success: boolean;
        notification: import("../push-notification/entity/in-app-notifications.entity").InAppNotifications;
    }>;
    getRedirectOptions(): {
        data: {
            key: string;
            label: string;
            url: string;
            params: any[];
        }[];
    };
    createConfig(dto: {
        setting: CreateNotificationSettingDto;
        triggers: CreateNotificationTriggerDto[];
    }): Promise<{
        success: boolean;
        message: string;
        data: import("./entities/notification-setting.entity").NotificationSettings;
    }>;
    updateConfig(dto: {
        setting: CreateNotificationSettingDto;
        triggers: CreateNotificationTriggerDto[];
    }): Promise<{
        success: boolean;
        message: string;
    }>;
    getConfig(event_id: number): Promise<{
        success: boolean;
        message: string;
        data: {
            settings: import("./entities/notification-setting.entity").NotificationSettings[];
            triggers: import("./entities/notification-trigger.entity").NotificationTriggers[];
        };
    }>;
    fetchEventWiseSettings(page?: number, limit?: number, search?: string): Promise<{
        data: any[];
        pagination: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
        success: boolean;
        message: string;
    }>;
}
