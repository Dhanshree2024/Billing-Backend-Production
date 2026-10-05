"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var CronJobService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CronJobService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const typeorm_1 = require("@nestjs/typeorm");
const date_fns_1 = require("date-fns");
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const nodemailer = __importStar(require("nodemailer"));
const date_utils_1 = require("../date_format/date-utils");
const mail_service_1 = require("../mail/mail.service");
const notification_log_entity_1 = require("../../notifications-events/entities/notification-log.entity");
const notification_setting_entity_1 = require("../../notifications-events/entities/notification-setting.entity");
const notification_trigger_entity_1 = require("../../notifications-events/entities/notification-trigger.entity");
const register_organization_entity_1 = require("../../organization_register/entities/register-organization.entity");
const register_user_login_entity_1 = require("../../organization_register/entities/register-user-login.entity");
const org_feature_overrides_entity_1 = require("../../subscription_pricing/entity/org_feature_overrides.entity");
const org_subscription_entity_1 = require("../../subscription_pricing/entity/org_subscription.entity");
const typeorm_2 = require("typeorm");
const mail_config_service_1 = require("../../common/mail/mail-config.service");
const notification_helper_1 = require("../notifications/notification.helper");
let CronJobService = CronJobService_1 = class CronJobService {
    constructor(subscriptionRepo, userRepo, notificationLogRepo, triggerRepository, settingsRepository, limitationsRepository, orgRepo, mailConfigService, mailService, dataSource, dateFormatService, notificationHelper) {
        this.subscriptionRepo = subscriptionRepo;
        this.userRepo = userRepo;
        this.notificationLogRepo = notificationLogRepo;
        this.triggerRepository = triggerRepository;
        this.settingsRepository = settingsRepository;
        this.limitationsRepository = limitationsRepository;
        this.orgRepo = orgRepo;
        this.mailConfigService = mailConfigService;
        this.mailService = mailService;
        this.dataSource = dataSource;
        this.dateFormatService = dateFormatService;
        this.notificationHelper = notificationHelper;
        this.logger = new common_1.Logger(CronJobService_1.name);
        this.isRunning = false;
        this.lastSyncedMap = new Map();
        this.isAttendanceReminderRunning = false;
        this.istodaysAttendanceReminderRunning = false;
    }
    async sendRenewalReminderEmails() {
        const today = new Date();
        const fiveDay = (0, date_fns_1.addDays)(today, 5);
        const twoDay = (0, date_fns_1.addDays)(today, 2);
        console.log('--- Starting Subscription Renewal Reminder Job ---');
        console.log('Today:', today);
        console.log('Checking subscriptions for dates:', (0, date_fns_1.format)(twoDay, 'yyyy-MM-dd'), 'and', (0, date_fns_1.format)(fiveDay, 'yyyy-MM-dd'));
        const transporter = nodemailer.createTransport({
            host: 'smtp.zeptomail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD_NORBIK,
            },
        });
        const subscriptions = await this.subscriptionRepo.find({
            where: [
                {
                    renewal_date: (0, typeorm_2.Raw)((alias) => `DATE(${alias}) = :twoDay`, {
                        twoDay: (0, date_fns_1.format)(twoDay, 'yyyy-MM-dd'),
                    }),
                },
                {
                    renewal_date: (0, typeorm_2.Raw)((alias) => `DATE(${alias}) = :fiveDay`, {
                        fiveDay: (0, date_fns_1.format)(fiveDay, 'yyyy-MM-dd'),
                    }),
                },
            ],
            relations: ['organization'],
        });
        console.log(`Found ${subscriptions.length} subscription(s) due for reminder.`);
        for (const sub of subscriptions) {
            console.log('Processing subscription:', sub.subscription_id, 'Org:', sub.organization_profile_id);
            const primaryUsers = await this.userRepo.find({
                where: {
                    organization_id: sub.organization_profile_id,
                    is_primary_user: 'Y',
                },
            });
            console.log('primaryUsers', primaryUsers);
            if (!primaryUsers.length) {
                console.log(`No primary users found for organization ${sub.organization_profile_id}. Skipping email.`);
                continue;
            }
            console.log(`Found ${primaryUsers.length} primary user(s) for organization ${sub.organization_profile_id}:`, primaryUsers.map((u) => u.business_email));
            for (const user of primaryUsers) {
                const daysLeft = (0, date_fns_1.format)(sub.renewal_date, 'yyyy-MM-dd') ===
                    (0, date_fns_1.format)(fiveDay, 'yyyy-MM-dd')
                    ? 5
                    : 2;
                console.log(`Sending email to ${user.business_email}. Days left: ${daysLeft}. Renewal date: ${sub.renewal_date}`);
                const mailOptions = {
                    from: process.env.FROM_EMAIL,
                    to: user.business_email,
                    subject: '⏰ Subscription Renewal Reminder',
                    html: `
            <p>Hello ${user.first_name},</p>
            <p>Your organization's subscription will expire in <strong>${daysLeft}</strong> day(s), on <strong>${sub.renewal_date}</strong>.</p>
            <p>Please renew to avoid service interruptions.</p>
            <p>Thank you,<br/>Support Team</p>
          `,
                };
                await transporter.sendMail(mailOptions);
                console.log(`Reminder sent to ${user.business_email} for org ${sub.organization_profile_id}`);
            }
        }
    }
    async handleCronReminder() {
        this.logger.log('⏰ Running cron: Renewal Reminder');
        await this.handleRenewalReminderCron();
    }
    async handleRenewalReminderCron() {
        if (this.isRunning) {
            this.logger.warn('⚠️ Renewal cron already running...');
            return;
        }
        this.isRunning = true;
        try {
            this.logger.log('🚀 Renewal Reminder Cron Started');
            const setting = await this.dataSource
                .getRepository('notification_settings')
                .createQueryBuilder('ns')
                .where('ns.event_id = :event_id', { event_id: 7 })
                .andWhere('ns.is_enabled = true')
                .getOne();
            if (!setting) {
                this.logger.warn('❌ No renewal setting found');
                return;
            }
            const config = setting.config || {};
            const daysBefore = config.days_before || [];
            const sendTimes = config.send_times || [];
            this.logger.log(`⚙️ days_before: ${JSON.stringify(daysBefore)}`);
            this.logger.log(`⚙️ send_times: ${JSON.stringify(sendTimes)}`);
            if (!daysBefore.length)
                return;
            const now = (0, moment_timezone_1.default)().tz('Asia/Kolkata');
            const currentTime = now.format('HH:mm');
            this.logger.log(`🕒 Current Time: ${currentTime}`);
            const isValidTime = sendTimes.length
                ? sendTimes.some((time) => {
                    const scheduled = (0, moment_timezone_1.default)(time, 'HH:mm');
                    return Math.abs(now.diff(scheduled, 'minutes')) <= 2;
                })
                : true;
            if (!isValidTime) {
                this.logger.log(`⏳ Skipping - Not in time window`);
                return;
            }
            this.logger.log(`✅ Time matched`);
            const maxDays = Math.max(...daysBefore);
            const subscriptions = await this.subscriptionRepo
                .createQueryBuilder('sub')
                .leftJoinAndSelect('sub.plan', 'plan')
                .where('sub.is_active = true')
                .andWhere('DATE(sub.renewal_date) >= CURRENT_DATE')
                .andWhere(`DATE(sub.renewal_date) <= CURRENT_DATE + INTERVAL '${maxDays} days'`)
                .getMany();
            this.logger.log(`📦 Found ${subscriptions.length} subscriptions`);
            for (const sub of subscriptions) {
                if (!sub.renewal_date)
                    continue;
                const today = (0, moment_timezone_1.default)().tz('Asia/Kolkata').startOf('day');
                const renewal = (0, moment_timezone_1.default)(sub.renewal_date)
                    .tz('Asia/Kolkata')
                    .startOf('day');
                const diffDays = renewal.diff(today, 'days');
                this.logger.log(`🔍 Org: ${sub.organization_profile_id} | diffDays: ${diffDays}`);
                if (!daysBefore.includes(diffDays))
                    continue;
                const user = await this.userRepo.findOne({
                    where: {
                        organization_id: sub.organization_profile_id,
                        is_primary_user: 'Y',
                    },
                });
                if (!user?.business_email)
                    continue;
                const alreadySent = await this.notificationLogRepo
                    .createQueryBuilder('log')
                    .where('log.event_id = :eventId', { eventId: 7 })
                    .andWhere('log.org_id = :orgId', {
                    orgId: sub.organization_profile_id,
                })
                    .andWhere('log.user_id = :userId', { userId: user.user_id })
                    .andWhere('DATE(log.created_at) = CURRENT_DATE')
                    .andWhere(`log.context_data->>'days_left' = :days`, {
                    days: String(diffDays),
                })
                    .getOne();
                if (alreadySent) {
                    this.logger.warn(`⚠️ Already sent for org ${sub.organization_profile_id}`);
                    continue;
                }
                this.logger.log(`📧 Sending to: ${user.business_email}`);
                const formatDate = (date) => {
                    return new Date(date).toLocaleDateString('en-GB');
                };
                const contextData = {
                    subscription: {
                        price: sub.price || '',
                        plan_id: sub.plan?.plan_name || '',
                        renewal_date: formatDate(sub.renewal_date) || '',
                        trial_expiry_date: formatDate(sub.renewal_date) || '',
                    },
                    user: {
                        first_name: user.first_name || '',
                        last_name: user.last_name || '',
                    },
                };
                try {
                    await this.notificationHelper.triggerEventNotification({
                        eventId: 7,
                        contextData,
                        recipients: [
                            {
                                recipient_type: 'user',
                                recipient_id: String(user.user_id),
                                recipient_email: user.business_email,
                            },
                        ],
                        meta: {
                            trace_id: `${sub.organization_profile_id}-${diffDays}`,
                            organization_id: sub.organization_profile_id,
                        },
                    });
                    this.logger.log(`✅ Mail sent to ${user.business_email}`);
                    await this.notificationLogRepo.save({
                        event_id: 7,
                        org_id: sub.organization_profile_id,
                        user_id: user.user_id,
                        recipient_email: user.business_email,
                        status: 'SUCCESS',
                        message: 'Mail sent successfully',
                        context_data: contextData,
                    });
                }
                catch (error) {
                    this.logger.error(`❌ Failed for ${user.business_email}`, error);
                    await this.notificationLogRepo.save({
                        event_id: 7,
                        org_id: sub.organization_profile_id,
                        user_id: user.user_id,
                        recipient_email: user.business_email,
                        status: 'FAILED',
                        message: error.message,
                        context_data: contextData,
                    });
                }
            }
            this.logger.log('✅ Renewal Cron Completed');
        }
        catch (error) {
            this.logger.error('❌ Cron Error:', error);
        }
        finally {
            this.isRunning = false;
        }
    }
    isWithinTimeWindow(sendTimes, windowMinutes = 2) {
        const now = new Date();
        return sendTimes.some((time) => {
            const parts = time.split(':');
            const hours = Number(parts[0]);
            const minutes = Number(parts[1] ?? 0);
            if (isNaN(hours) || isNaN(minutes)) {
                this.logger.warn(`⚠️ Invalid time format: ${time}`);
                return false;
            }
            const target = new Date();
            target.setHours(hours, minutes, 0, 0);
            const diff = Math.abs(now.getTime() - target.getTime());
            return diff <= windowMinutes * 60 * 1000;
        });
    }
    async handleTrialExpiryCron() {
        this.logger.log('⏰ Running cron: Trial Expiry Reminder');
        await this.handleTrialExpiryReminderCron();
    }
    async handleTrialExpiryReminderCron() {
        if (this.isRunning) {
            this.logger.warn('⚠️ Trial cron already running...');
            return;
        }
        this.isRunning = true;
        try {
            this.logger.log('🚀 Trial Expiry Cron Started');
            const now = (0, moment_timezone_1.default)().tz('Asia/Kolkata');
            const settings = await this.settingsRepository.find({
                where: { event_id: 6, is_enabled: true },
            });
            if (!settings.length) {
                this.logger.warn('❌ No trial settings found');
                return;
            }
            for (const setting of settings) {
                const triggers = await this.triggerRepository.find({
                    where: { setting_id: setting.id },
                    order: { sequence_no: 'ASC' },
                });
                if (!triggers.length)
                    continue;
                const maxDelay = Math.max(...triggers.map((t) => t.delay_value || 0));
                const subscriptions = await this.subscriptionRepo
                    .createQueryBuilder('sub')
                    .leftJoinAndSelect('sub.plan', 'plan')
                    .where('sub.is_active = true')
                    .andWhere('sub.is_trial_period = true')
                    .andWhere('sub.trial_expiry_date IS NOT NULL')
                    .andWhere('DATE(sub.trial_expiry_date) >= CURRENT_DATE')
                    .andWhere(`DATE(sub.trial_expiry_date) <= CURRENT_DATE + INTERVAL '${maxDelay} days'`)
                    .getMany();
                this.logger.log(`📦 Found ${subscriptions.length} subscriptions`);
                for (const sub of subscriptions) {
                    const today = (0, moment_timezone_1.default)().tz('Asia/Kolkata').startOf('day');
                    const expiry = (0, moment_timezone_1.default)(sub.trial_expiry_date)
                        .tz('Asia/Kolkata')
                        .startOf('day');
                    const diffDays = expiry.diff(today, 'days');
                    for (const trigger of triggers) {
                        const user = await this.userRepo.findOne({
                            where: {
                                organization_id: sub.organization_profile_id,
                                is_primary_user: 'Y',
                            },
                        });
                        if (!user?.business_email)
                            continue;
                        const alreadySent = await this.notificationLogRepo
                            .createQueryBuilder('log')
                            .where('log.event_id = :eventId', { eventId: 6 })
                            .andWhere('log.org_id = :orgId', {
                            orgId: sub.organization_profile_id,
                        })
                            .andWhere('log.user_id = :userId', {
                            userId: user.user_id,
                        })
                            .andWhere('DATE(log.created_at) = CURRENT_DATE')
                            .andWhere(`log.context_data->>'days_left' = :days`, {
                            days: String(diffDays),
                        })
                            .andWhere(`log.context_data->>'sequence_no' = :seq`, {
                            seq: String(trigger.sequence_no),
                        })
                            .getOne();
                        if (alreadySent)
                            continue;
                        const formatDate = (date) => new Date(date).toLocaleDateString('en-GB');
                        const contextData = {
                            subscription: {
                                price: sub.price || '',
                                plan_id: sub.plan?.plan_name || '',
                                trial_expiry_date: formatDate(sub.trial_expiry_date),
                                DaysRemaining: diffDays,
                            },
                            user: {
                                first_name: user.first_name || '',
                                last_name: user.last_name || '',
                            },
                        };
                        try {
                            this.logger.log('==============================');
                            this.logger.log('🚀 About to trigger notification');
                            this.logger.log(`Event ID: 6`);
                            this.logger.log(`Organization ID: ${sub.organization_profile_id}`);
                            this.logger.log(`User ID: ${user.user_id}`);
                            this.logger.log(`Recipient Email: ${user.business_email}`);
                            this.logger.log(`Days Remaining: ${diffDays}`);
                            this.logger.log(`Trigger Sequence: ${trigger.sequence_no}`);
                            this.logger.debug(`Context Data: ${JSON.stringify(contextData, null, 2)}`);
                            await this.notificationHelper.triggerEventNotification({
                                eventId: 6,
                                contextData,
                                recipients: [
                                    {
                                        recipient_type: 'user',
                                        recipient_id: String(user.user_id),
                                        recipient_email: user.business_email,
                                    },
                                ],
                            });
                            this.logger.log(`✅ NotificationHelper completed successfully for Org ${sub.organization_profile_id}`);
                            await this.notificationLogRepo.save({
                                event_id: 6,
                                org_id: sub.organization_profile_id,
                                user_id: user.user_id,
                                recipient_email: user.business_email,
                                status: 'SUCCESS',
                                context_data: contextData,
                            });
                        }
                        catch (error) {
                            this.logger.error(`❌ Notification failed for Org ${sub.organization_profile_id}`, error.stack || error);
                            await this.notificationLogRepo.save({
                                event_id: 6,
                                org_id: sub.organization_profile_id,
                                user_id: user.user_id,
                                recipient_email: user.business_email,
                                status: 'FAILED',
                                message: error.message,
                                context_data: contextData,
                            });
                        }
                    }
                }
            }
            this.logger.log('✅ Trial Expiry Cron Completed');
        }
        catch (error) {
            this.logger.error('❌ Trial Cron Error:', error);
        }
        finally {
            this.isRunning = false;
        }
    }
    async handleQuotaUsageCron() {
        if (this.isAttendanceReminderRunning)
            return;
        this.isAttendanceReminderRunning = true;
        try {
            this.logger.log('⏰ Running Quota Usage Alert Cron');
            await this.processQuotaUsage();
        }
        catch (err) {
            this.logger.error('❌ Quota Cron Error:', err);
        }
        finally {
            this.isAttendanceReminderRunning = false;
        }
    }
    async processQuotaUsage() {
        const now = (0, moment_timezone_1.default)().tz('Asia/Kolkata');
        const settings = await this.settingsRepository.find({
            where: { event_id: 37, is_enabled: true },
            relations: ['channel'],
        });
        if (!settings.length) {
            this.logger.warn('⚠️ No quota alert settings found');
            return;
        }
        for (const setting of settings) {
            const triggers = await this.triggerRepository.find({
                where: { setting: { id: setting.id } },
                order: { sequence_no: 'ASC' },
            });
            if (!triggers.length)
                continue;
            const TARGET_FEATURE_ID = 2;
            const orgUsages = await this.limitationsRepository.find({
                where: {
                    feature_id: TARGET_FEATURE_ID,
                },
                relations: ['feature'],
            });
            for (const usage of orgUsages) {
                const org = await this.orgRepo.findOne({
                    where: { organization_id: usage.org_id },
                });
                if (!org)
                    continue;
                const total = Number(usage.override_value ?? usage.feature?.default_value ?? 0);
                const used = Number(usage.currentUsage ?? 0);
                const usagePercent = (used / total) * 100;
                console.log(`📊 Org: ${org.organization_name}`);
                console.log(`➡️ Used: ${used}, Total: ${total}, %: ${usagePercent.toFixed(2)}`);
                for (const trigger of triggers) {
                    if (trigger.condition_type !== 'quota_percentage')
                        continue;
                    const conditionValue = Number(trigger.condition_value || 0);
                    const operator = trigger.operator;
                    let isMatch = false;
                    switch (operator) {
                        case '>=':
                            isMatch = usagePercent >= conditionValue;
                            break;
                        case '>':
                            isMatch = usagePercent > conditionValue;
                            break;
                        case '<=':
                            isMatch = usagePercent <= conditionValue;
                            break;
                        case '<':
                            isMatch = usagePercent < conditionValue;
                            break;
                        case '==':
                            isMatch = Math.floor(usagePercent) === conditionValue;
                            break;
                    }
                    console.log(`🔍 Checking condition: ${usagePercent} ${operator} ${conditionValue} => ${isMatch}`);
                    if (!isMatch)
                        continue;
                    console.log(`✅ Condition matched for Org: ${org.organization_name}`);
                    const user = await this.userRepo.findOne({
                        where: {
                            organization_id: org.organization_id,
                            is_primary_user: 'Y',
                        },
                    });
                    console.log('Condition matched for user:', user);
                    const alreadySent = await this.notificationLogRepo.findOne({
                        where: {
                            event_id: setting.event_id,
                            org_id: org.organization_id,
                            user_id: user.user_id,
                            created_at: (0, typeorm_2.Between)((0, moment_timezone_1.default)().startOf('day').toDate(), (0, moment_timezone_1.default)().endOf('day').toDate()),
                        },
                    });
                    console.log('Condition matched for alreadySent', alreadySent);
                    if (alreadySent) {
                        console.log(`⏭️ Already sent today for Org: ${org.organization_name}`);
                        continue;
                    }
                    const contextData = {
                        organization: { name: org.organization_name },
                        quota: { used, total, usagePercent },
                        user: {
                            first_name: user.first_name,
                            last_name: user.last_name,
                        },
                    };
                    try {
                        console.log(`📧 Sending email to ${user.business_email}`);
                        await this.notificationHelper.triggerEventNotification({
                            eventId: setting.event_id,
                            contextData,
                            recipients: [
                                {
                                    recipient_type: 'user',
                                    recipient_id: String(user.user_id),
                                    recipient_email: user.business_email,
                                },
                            ],
                        });
                        await this.notificationLogRepo.save({
                            event_id: setting.event_id,
                            org_id: org.organization_id,
                            user_id: user.user_id,
                            recipient_email: user.business_email,
                            status: 'SUCCESS',
                            context_data: contextData,
                        });
                        console.log(`✅ Email sent successfully`);
                    }
                    catch (error) {
                        console.error(`❌ Email failed`, error.message);
                        await this.notificationLogRepo.save({
                            event_id: setting.event_id,
                            org_id: org.organization_id,
                            user_id: user.user_id,
                            recipient_email: user.business_email,
                            status: 'FAILED',
                            message: error.message,
                            context_data: contextData,
                        });
                    }
                }
            }
        }
        this.logger.log('✅ Quota Usage Cron Completed');
    }
};
exports.CronJobService = CronJobService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_5_MINUTES),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CronJobService.prototype, "handleCronReminder", null);
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_5_MINUTES),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CronJobService.prototype, "handleTrialExpiryCron", null);
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_HOUR),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CronJobService.prototype, "handleQuotaUsageCron", null);
exports.CronJobService = CronJobService = CronJobService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(org_subscription_entity_1.OrgSubscription)),
    __param(1, (0, typeorm_1.InjectRepository)(register_user_login_entity_1.RegisterUserLogin)),
    __param(2, (0, typeorm_1.InjectRepository)(notification_log_entity_1.NotificationLog)),
    __param(3, (0, typeorm_1.InjectRepository)(notification_trigger_entity_1.NotificationTriggers)),
    __param(4, (0, typeorm_1.InjectRepository)(notification_setting_entity_1.NotificationSettings)),
    __param(5, (0, typeorm_1.InjectRepository)(org_feature_overrides_entity_1.OrgFeatureOverride)),
    __param(6, (0, typeorm_1.InjectRepository)(register_organization_entity_1.RegisterOrganization)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        mail_config_service_1.MailConfigService,
        mail_service_1.MailService,
        typeorm_2.DataSource,
        date_utils_1.DateFormatService,
        notification_helper_1.NotificationHelper])
], CronJobService);
