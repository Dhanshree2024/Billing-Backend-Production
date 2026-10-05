import { DataSource } from 'typeorm';
import { RegisterUserLogin } from 'src/organization_register/entities/register-user-login.entity';
import { MailService } from 'src/common/mail/mail.service';
import { MailConfigService } from 'src/common/mail/mail-config.service';
export declare class HrmsOrganizationSchemaManager {
    private readonly dataSource;
    private readonly mailConfigService;
    private readonly mailService;
    constructor(dataSource: DataSource, mailConfigService: MailConfigService, mailService: MailService);
    private hashPassword;
    createOrganizationSchemaAndTables(user: RegisterUserLogin): Promise<void>;
}
