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
var NotificationsOrchestratorService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsOrchestratorService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const notification_template_version_entity_1 = require("./entities/notification-template-version.entity");
const notification_template_entity_1 = require("./entities/notification-template.entity");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
const mail_config_service_1 = require("../common/mail/mail-config.service");
const mail_service_1 = require("../common/mail/mail.service");
const sms_service_1 = require("../common/sms/sms.service");
const push_notification_service_1 = require("../push-notification/push-notification.service");
const notification_events_service_1 = require("./notification-events.service");
let NotificationsOrchestratorService = NotificationsOrchestratorService_1 = class NotificationsOrchestratorService {
    constructor(eventRepo, templateVersionRepo, notificationsService, PushnotificationsService, mailService, mailConfigService, smsService, httpService) {
        this.eventRepo = eventRepo;
        this.templateVersionRepo = templateVersionRepo;
        this.notificationsService = notificationsService;
        this.PushnotificationsService = PushnotificationsService;
        this.mailService = mailService;
        this.mailConfigService = mailConfigService;
        this.smsService = smsService;
        this.httpService = httpService;
        this.logger = new common_1.Logger(NotificationsOrchestratorService_1.name);
    }
    async orchestrate(event) {
        this.logger.log(`================ ORCHESTRATION START ================`);
        this.logger.log(`Event received: ${event.event_id}`);
        this.logger.log(`Recipients count: ${event.recipients?.length || 0}`);
        this.logger.log(`Organization ID from meta: ${event.meta?.organization_id}`);
        const payloadArray = Array.isArray(event.payload)
            ? event.payload
            : [event.payload];
        this.logger.log(`Payload count: ${payloadArray.length}`);
        if (!event.recipients?.length) {
            this.logger.warn(`No recipients provided`);
            return;
        }
        if (!payloadArray.length) {
            this.logger.warn(`Invalid payload format`);
            return;
        }
        const response = (await this.notificationsService.getAllNotificationsByEvent(event.event_id));
        const notifications = response?.data?.notifications;
        if (!notifications) {
            this.logger.warn(`No notifications found for event`);
            return;
        }
        this.logger.log(`Channels received: ${Object.keys(notifications).join(', ')}`);
        for (const recipient of event.recipients) {
            this.logger.log(`---- Processing recipient: ${recipient.recipient_id} ----`);
            let finalPayload = {};
            if (Array.isArray(event.payload)) {
                const recipientPayload = event.payload.find((p) => p.recipient_id === recipient.recipient_id);
                finalPayload = recipientPayload?.data ?? {};
            }
            else if (typeof event.payload === 'object') {
                finalPayload = event.payload;
            }
            this.logger.log(`Final payload for recipient ${recipient.recipient_id}: ${JSON.stringify(finalPayload)}`);
            this.logger.log(`Payload for recipient ${recipient.recipient_id}: ${JSON.stringify(finalPayload)}`);
            for (const channelName of Object.keys(notifications)) {
                this.logger.log(`Channel detected: ${channelName}`);
                const channelTemplates = notifications[channelName];
                if (!channelTemplates?.length) {
                    this.logger.warn(`No templates found for channel ${channelName}`);
                    continue;
                }
                const templateVersion = channelTemplates[0];
                this.logger.log(`Using template version ID: ${templateVersion.version_id}`);
                const { subject, body, renderContext } = this.renderTemplateVersion(templateVersion, finalPayload, recipient);
                this.logger.log(`Rendered Subject: ${subject}`);
                this.logger.log(`Rendered Body: ${body}`);
                try {
                    await this.dispatchChannel(channelName, templateVersion, recipient, subject, body, renderContext, event.event_id, event.meta);
                    this.logger.log(`Dispatch successful for recipient ${recipient.recipient_id} on ${channelName}`);
                }
                catch (err) {
                    this.logger.error(`Dispatch FAILED for recipient ${recipient.recipient_id} on ${channelName}`, err.stack);
                }
            }
        }
        this.logger.log(`================ ORCHESTRATION END ================`);
    }
    async dispatchChannel(channelName, templateVersion, recipient, subject, body, renderContext, eventId, meta) {
        const normalizedChannel = channelName.toLowerCase().trim();
        this.logger.log(`Entering dispatchChannel: ${normalizedChannel}`);
        this.logger.log(`Redirect Config -> key: ${templateVersion.redirect_key}, params: ${JSON.stringify(templateVersion.redirect_params)}`);
        switch (normalizedChannel) {
            case 'sms':
                if (!recipient.recipient_contact)
                    return;
                this.logger.log(`SMS channel triggered for ${recipient.recipient_contact}`);
                await this.smsService.sendSms({
                    to: recipient.recipient_contact,
                    text: body,
                    templateId: templateVersion.dlt_template_id,
                });
                this.logger.log(`SMS sent successfully`);
                break;
            case 'email':
                if (!recipient.recipient_email)
                    return;
                this.logger.log(`Email channel triggered for ${recipient.recipient_email}`);
                const finalHtml = this.wrapEmailLayout(body);
                const safeHtml = this.sanitizeImageUrls(finalHtml);
                await this.mailService.sendEmailDynamic({
                    to: recipient.recipient_email,
                    subject: subject ?? 'Notification',
                    html: safeHtml,
                });
                this.logger.log(`Email sent successfully`);
                break;
            case 'push notification':
                this.logger.log(`Push Notification channel triggered`);
                const orgId = meta?.organization_id;
                this.logger.log(`Organization ID for push notification: ${orgId}`);
                const redirectKey = templateVersion.redirect_key;
                const redirectParams = templateVersion.redirect_params || [];
                this.logger.log(`Passing Redirect Data -> key: ${redirectKey}, params: ${JSON.stringify(redirectParams)}`);
                await this.PushnotificationsService.processPush({
                    recipient,
                    templateVersion,
                    renderedBody: body,
                    renderContext,
                    eventId,
                    organization_id: orgId,
                    redirect_key: redirectKey,
                    redirect_params: redirectParams,
                });
                break;
            case 'whatsapp':
                this.logger.log(`WhatsApp channel triggered`);
                break;
            default:
                this.logger.warn(`Unknown channel received: ${channelName}`);
        }
    }
    async notifyAssetUsers(eventId) {
        this.logger.log(`Fetching users from Asset backend for notifications...`);
        try {
            const assetUrl = `${process.env.ASSET_API_URL}/organizational-profile/get-All-Organization-Users`;
            const response$ = this.httpService.get(assetUrl);
            const assetResponse = await (0, rxjs_1.firstValueFrom)(response$);
            const assetUsers = assetResponse.data;
            if (!Array.isArray(assetUsers) || !assetUsers.length) {
                this.logger.warn(`No users found in Asset backend`);
                return { success: false, message: 'No users found' };
            }
            this.logger.log(`Fetched ${assetUsers.length} users from Asset backend`);
            const recipients = assetUsers.map((user) => ({
                recipient_id: String(user.id),
                recipient_type: 'user',
                recipient_email: user.email,
                recipient_contact: user.phone_number,
            }));
            const payload = assetUsers.map((user) => ({
                recipient_id: String(user.id),
                data: {
                    full_name: user.full_name,
                    phone_number: user.phone_number,
                    user_email: user.email,
                },
            }));
            const notificationEvent = {
                event_id: eventId,
                recipients,
                payload,
            };
            await this.orchestrate(notificationEvent);
            this.logger.log(`Notifications dispatched successfully to Asset users`);
            return { success: true, message: 'Notifications sent successfully' };
        }
        catch (error) {
            this.logger.error('Failed to send notifications to Asset users', error.stack);
            return { success: false, message: error.message };
        }
    }
    sanitizeImageUrls(html) {
        const billingUrl = process.env.BILLING_API_URL;
        const fixUrl = (url) => {
            let resolvedUrl = url.replace('${process.env.BILLING_API_URL}', billingUrl);
            if (resolvedUrl.startsWith('/')) {
                resolvedUrl = `${billingUrl}${resolvedUrl}`;
            }
            return encodeURI(resolvedUrl);
        };
        let result = html.replace(/src="([^"]+)"/g, (match, url) => {
            try {
                return `src="${fixUrl(url)}"`;
            }
            catch {
                return match;
            }
        });
        result = result.replace(/background="([^"]+)"/g, (match, url) => {
            try {
                return `background="${fixUrl(url)}"`;
            }
            catch {
                return match;
            }
        });
        result = result.replace(/url\('([^']+)'\)/g, (match, url) => {
            try {
                return `url('${fixUrl(url)}')`;
            }
            catch {
                return match;
            }
        });
        return result;
    }
    renderTemplateVersion(version, eventPayload, recipient, runtimeVars = {}) {
        const templateVariables = version.template_variables || {};
        const context = this.buildRenderContext(templateVariables, eventPayload);
        const finalContext = {
            ...context,
            recipient,
            ...runtimeVars,
            BASE_URL: process.env.BILLING_API_URL,
        };
        const subject = version.subject
            ? this.render(version.subject, finalContext)
            : undefined;
        const body = this.render(version.body, finalContext);
        return { subject, body, renderContext: finalContext };
    }
    buildRenderContext(templateVariables, eventPayload) {
        const context = {};
        for (const key of Object.keys(templateVariables)) {
            const mapping = templateVariables[key];
            const accountType = mapping.account_type;
            const fieldName = mapping.label ?? mapping.variable;
            const value = eventPayload?.[accountType]?.[fieldName];
            context[key] = value ?? '';
        }
        return context;
    }
    render(template, context) {
        if (!template) {
            this.logger.warn(`Render called with empty template`);
            return template;
        }
        this.logger.log(`Rendering template: ${template}`);
        return template.replace(/\$\{\s*([^}]+)\s*\}/g, (_, variablePath) => {
            this.logger.log(`Resolving variable: ${variablePath}`);
            const value = variablePath
                .split('.')
                .reduce((obj, key) => obj?.[key], context);
            if (value === undefined || value === null) {
                this.logger.warn(`Missing or null variable: ${variablePath}`);
                return '';
            }
            this.logger.log(`Resolved ${variablePath} => ${value}`);
            return String(value);
        });
    }
    wrapEmailLayout(body) {
        return `
<!DOCTYPE html>
<html>
<body style="margin:0;background:#f5f7fb;font-family:Arial, Helvetica, sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f7fb;padding:30px 0;">
<tr>
<td align="center">

<table width="700" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:14px;overflow:hidden;">

${body}

</table>

</td>
</tr>
</table>

</body>
</html>
`;
    }
};
exports.NotificationsOrchestratorService = NotificationsOrchestratorService;
exports.NotificationsOrchestratorService = NotificationsOrchestratorService = NotificationsOrchestratorService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(notification_template_entity_1.NotificationTemplate)),
    __param(1, (0, typeorm_1.InjectRepository)(notification_template_version_entity_1.NotificationTemplateVersion)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        notification_events_service_1.NotificationEventsService,
        push_notification_service_1.PushNotificationService,
        mail_service_1.MailService,
        mail_config_service_1.MailConfigService,
        sms_service_1.SmsService,
        axios_1.HttpService])
], NotificationsOrchestratorService);
