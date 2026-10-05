import { CronJobService } from './cronjob.service';
export declare class CronJobController {
    private readonly cronJobService;
    constructor(cronJobService: CronJobService);
    testReminder(): Promise<{
        success: boolean;
        message: string;
    }>;
    runRenewalCron(): Promise<void>;
    runTrialCron(): Promise<void>;
    runQuotaCron(): Promise<void>;
}
