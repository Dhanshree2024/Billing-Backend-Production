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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CronJobController = void 0;
const common_1 = require("@nestjs/common");
const cronjob_service_1 = require("./cronjob.service");
let CronJobController = class CronJobController {
    constructor(cronJobService) {
        this.cronJobService = cronJobService;
    }
    async testReminder() {
        await this.cronJobService.sendRenewalReminderEmails();
        return { success: true, message: 'Reminder function executed manually' };
    }
    async runRenewalCron() {
        console.log('Manual cron trigger hit');
        return await this.cronJobService.handleRenewalReminderCron();
    }
    async runTrialCron() {
        console.log('Manual cron trigger hit');
        return await this.cronJobService.handleTrialExpiryReminderCron();
    }
    async runQuotaCron() {
        console.log('Manual cron trigger hit');
        return await this.cronJobService.handleQuotaUsageCron();
    }
};
exports.CronJobController = CronJobController;
__decorate([
    (0, common_1.Get)('test-reminder'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CronJobController.prototype, "testReminder", null);
__decorate([
    (0, common_1.Post)('run-renewal-cron'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CronJobController.prototype, "runRenewalCron", null);
__decorate([
    (0, common_1.Post)('run-trial-cron'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CronJobController.prototype, "runTrialCron", null);
__decorate([
    (0, common_1.Post)('run-quota-cron'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CronJobController.prototype, "runQuotaCron", null);
exports.CronJobController = CronJobController = __decorate([
    (0, common_1.Controller)('cronjob'),
    __metadata("design:paramtypes", [cronjob_service_1.CronJobService])
], CronJobController);
