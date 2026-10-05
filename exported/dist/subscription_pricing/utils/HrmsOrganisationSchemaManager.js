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
Object.defineProperty(exports, "__esModule", { value: true });
exports.HrmsOrganizationSchemaManager = void 0;
const register_user_login_entity_1 = require("../../organization_register/entities/register-user-login.entity");
const bcrypt = __importStar(require("bcrypt"));
const users_1 = require("../../organization_register/onboarding_sql_scripts_hrms/users");
const organizational_profile_1 = require("../../organization_register/onboarding_sql_scripts_hrms/organizational_profile");
const branches_1 = require("../../organization_register/onboarding_sql_scripts_hrms/branches");
const departments_1 = require("../../organization_register/onboarding_sql_scripts_hrms/departments");
const organization_permissions_1 = require("../../organization_register/onboarding_sql_scripts_hrms/organization_permissions");
const organization_roles_1 = require("../../organization_register/onboarding_sql_scripts_hrms/organization_roles");
const designation_1 = require("../../organization_register/onboarding_sql_scripts_hrms/designation");
const product_entity_1 = require("../entity/product.entity");
class HrmsOrganizationSchemaManager {
    constructor(dataSource, mailConfigService, mailService) {
        this.dataSource = dataSource;
        this.mailConfigService = mailConfigService;
        this.mailService = mailService;
    }
    async hashPassword(password) {
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(password, salt);
    }
    async createOrganizationSchemaAndTables(user) {
        console.log("user die:", user);
        const randomPassword = Math.random().toString(36).slice(-8);
        console.log("randomPassword:", randomPassword);
        const hashedPassword = await this.hashPassword(randomPassword);
        user.verified = true;
        user.otp = null;
        user.otp_expiry = null;
        user.password = hashedPassword;
        await this.dataSource.getRepository(register_user_login_entity_1.RegisterUserLogin).save(user);
        console.log("hashedPassword:", hashedPassword);
        const product = await this.dataSource
            .getRepository(product_entity_1.Product)
            .findOne({ where: { productId: 2 } });
        if (!product) {
            throw new Error("Product with ID 2 not found");
        }
        console.log("Product schema_initial:", product.schemaInitial);
        const schemaName = `${product.schemaInitial}_org_${user.organization.organization_schema_name}`;
        const organizationId = user.organization.organization_id;
        await this.dataSource.query(`CREATE SCHEMA IF NOT EXISTS ${schemaName}`);
        console.log('1');
        const script = new users_1.UserScript(this.dataSource);
        await script.createUserTable(schemaName);
        const hashedPassword1 = await script.insertUserTable(schemaName, user);
        console.log('2');
        const script1 = new organizational_profile_1.OrganizationProfileScript(this.dataSource);
        await script1.createOrganizationProfileTable(schemaName);
        await script1.insertOrganizationProfileTable(schemaName, user);
        console.log('3');
        const branchscript = new branches_1.BranchesScript(this.dataSource);
        await branchscript.createBranchesTable(schemaName);
        console.log('4');
        const departmentscript = new departments_1.DepartmentsScript(this.dataSource);
        await departmentscript.createDepartmentsTable(schemaName);
        console.log('5');
        const organizationrolesscript = new organization_roles_1.OrganizationRolesScript(this.dataSource);
        await organizationrolesscript.createOrganizationRolesTable(schemaName);
        console.log('6');
        const organizationpermissionsscript = new organization_permissions_1.OrganizationPermissionScript(this.dataSource);
        await organizationpermissionsscript.createOrganizationPermissionTable(schemaName);
        console.log('9');
        const designationcript = new designation_1.DesignationScript(this.dataSource);
        await designationcript.createDesignationTable(schemaName);
        const fullname = 'Norbik Asset';
        console.log("Generated plain password (to be sent via email):", randomPassword);
    }
}
exports.HrmsOrganizationSchemaManager = HrmsOrganizationSchemaManager;
