import { HttpService } from '@nestjs/axios';
import { MailConfigService } from 'src/common/mail/mail-config.service';
import { MailService } from 'src/common/mail/mail.service';
import { NotificationHelper } from 'src/common/notifications/notification.helper';
import { SmsService } from 'src/common/sms/sms.service';
import { DataSource, Repository } from 'typeorm';
import { OrgSubscription } from '../subscription_pricing/entity/org_subscription.entity';
import { CreateOrganizationDto } from './create-organization.dto';
import { ResendOtpDto } from './dto/resend-otp.dto';
import { VerifyOtpDto } from './verify-otp.dto';
export declare class OrganizationService {
    private readonly dataSource;
    private readonly subscriptionRepository;
    private readonly notificationHelper;
    private readonly mailService;
    private readonly mailConfigService;
    private readonly smsService;
    private readonly httpService;
    constructor(dataSource: DataSource, subscriptionRepository: Repository<OrgSubscription>, notificationHelper: NotificationHelper, mailService: MailService, mailConfigService: MailConfigService, smsService: SmsService, httpService: HttpService);
    createOrganization(createOrganizationDto: CreateOrganizationDto, context: any): Promise<any>;
    resendOtp(resendOtpDto: ResendOtpDto, context: any): Promise<any>;
    verifyOtp(verifyOtpDto: VerifyOtpDto, context: any): Promise<any>;
    private hashPassword;
    private sendVerificationEmail;
    private generateBillingId;
    private generateOrderId;
}
