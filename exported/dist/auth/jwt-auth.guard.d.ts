import { CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/user/user.repository';
import { Session } from 'src/organizational-profile/public_schema_entity/sessions.entity';
import { Repository } from 'typeorm';
import { RegisterUserLogin } from 'src/organization_register/entities/register-user-login.entity';
import { BillingPortalUser } from 'src/organization_register/entities/public_billing_portal_user.entity';
export declare class JwtAuthGuard implements CanActivate {
    private jwtService;
    private userRepository;
    private readonly sessionRepository;
    private readonly registerUserLogin;
    private readonly billinguserRepo;
    constructor(jwtService: JwtService, userRepository: UserRepository, sessionRepository: Repository<Session>, registerUserLogin: Repository<RegisterUserLogin>, billinguserRepo: Repository<BillingPortalUser>);
    canActivate(context: ExecutionContext): Promise<boolean>;
    generateTokens(user: any): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
}
