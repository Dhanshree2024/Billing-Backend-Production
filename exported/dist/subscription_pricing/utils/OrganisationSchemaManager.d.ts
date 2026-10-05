import { RegisterUserLogin } from 'src/organization_register/entities/register-user-login.entity';
import { DataSource } from 'typeorm';
import { MailConfigService } from 'src/common/mail/mail-config.service';
import { MailService } from 'src/common/mail/mail.service';
export declare class OrganizationSchemaManager {
    private readonly dataSource;
    private readonly mailConfigService;
    private readonly mailService;
    constructor(dataSource: DataSource, mailConfigService: MailConfigService, mailService: MailService);
    private hashPassword;
    createOrganizationSchemaAndTables(user: RegisterUserLogin): Promise<void>;
}
