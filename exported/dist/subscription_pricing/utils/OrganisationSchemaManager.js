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
exports.OrganizationSchemaManager = void 0;
const register_user_login_entity_1 = require("../../organization_register/entities/register-user-login.entity");
const bcrypt = __importStar(require("bcrypt"));
const AdminDefaultPermission_1 = require("../../organization_register/default_permissions/AdminDefaultPermission");
const UserDefaultPermission_1 = require("../../organization_register/default_permissions/UserDefaultPermission");
const assetcostcenter_1 = require("../../organization_register/onboarding_sql_scripts/assetcostcenter");
const assetdepreciationmethods_1 = require("../../organization_register/onboarding_sql_scripts/assetdepreciationmethods");
const assetfieldcategory_1 = require("../../organization_register/onboarding_sql_scripts/assetfieldcategory");
const assetitemfieldmapping_1 = require("../../organization_register/onboarding_sql_scripts/assetitemfieldmapping");
const assetitemfields_1 = require("../../organization_register/onboarding_sql_scripts/assetitemfields");
const assetitemrelations_1 = require("../../organization_register/onboarding_sql_scripts/assetitemrelations");
const assetlocation_1 = require("../../organization_register/onboarding_sql_scripts/assetlocation");
const assetmapping_1 = require("../../organization_register/onboarding_sql_scripts/assetmapping");
const assetOwnershipstatsutypes_1 = require("../../organization_register/onboarding_sql_scripts/assetOwnershipstatsutypes");
const assetproject_1 = require("../../organization_register/onboarding_sql_scripts/assetproject");
const assets_1 = require("../../organization_register/onboarding_sql_scripts/assets");
const assetsorgstats_1 = require("../../organization_register/onboarding_sql_scripts/assetsorgstats");
const assetstatsutypes_1 = require("../../organization_register/onboarding_sql_scripts/assetstatsutypes");
const assetworkingstatus_1 = require("../../organization_register/onboarding_sql_scripts/assetworkingstatus");
const branches_1 = require("../../organization_register/onboarding_sql_scripts/branches");
const category_1 = require("../../organization_register/onboarding_sql_scripts/category");
const departments_1 = require("../../organization_register/onboarding_sql_scripts/departments");
const designation_1 = require("../../organization_register/onboarding_sql_scripts/designation");
const items_1 = require("../../organization_register/onboarding_sql_scripts/items");
const licencetypes_1 = require("../../organization_register/onboarding_sql_scripts/licencetypes");
const organization_permissions_1 = require("../../organization_register/onboarding_sql_scripts/organization_permissions");
const organization_profile_1 = require("../../organization_register/onboarding_sql_scripts/organization_profile");
const organization_roles_1 = require("../../organization_register/onboarding_sql_scripts/organization_roles");
const stocks_1 = require("../../organization_register/onboarding_sql_scripts/stocks");
const stockserial_1 = require("../../organization_register/onboarding_sql_scripts/stockserial");
const subcategory_1 = require("../../organization_register/onboarding_sql_scripts/subcategory");
const transferhistory_1 = require("../../organization_register/onboarding_sql_scripts/transferhistory");
const users_1 = require("../../organization_register/onboarding_sql_scripts/users");
const venders_1 = require("../../organization_register/onboarding_sql_scripts/venders");
const product_entity_1 = require("../entity/product.entity");
class OrganizationSchemaManager {
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
        console.log('user die:', user);
        const randomPassword = Math.random().toString(36).slice(-8);
        console.log('randomPassword:', randomPassword);
        const hashedPassword = await this.hashPassword(randomPassword);
        user.verified = true;
        user.otp = null;
        user.otp_expiry = null;
        user.password = hashedPassword;
        await this.dataSource.getRepository(register_user_login_entity_1.RegisterUserLogin).save(user);
        console.log('hashedPassword:', hashedPassword);
        const product = await this.dataSource
            .getRepository(product_entity_1.Product)
            .findOne({ where: { productId: 1 } });
        if (!product) {
            throw new Error('Product with ID 1 not found');
        }
        console.log('Product schema_initial:', product.schemaInitial);
        const schemaName = `${product.schemaInitial}_org_${user.organization.organization_schema_name}`;
        await this.dataSource.query(`CREATE SCHEMA IF NOT EXISTS ${schemaName}`);
        console.log('1');
        const script1 = new organization_profile_1.OrganizationProfileScript(this.dataSource);
        await script1.createOrganizationProfileTable(schemaName);
        await script1.insertOrganizationProfileTable(schemaName, user);
        const departmentscript = new departments_1.DepartmentsScript(this.dataSource);
        await departmentscript.createDepartmentsTable(schemaName);
        const designationcript = new designation_1.DesignationScript(this.dataSource);
        await designationcript.createDesignationTable(schemaName);
        const organizationrolesscript = new organization_roles_1.OrganizationRolesScript(this.dataSource);
        await organizationrolesscript.createOrganizationRolesTable(schemaName);
        const script = new users_1.UserScript(this.dataSource);
        await script.createUserTable(schemaName);
        console.log('2');
        const branchscript = new branches_1.BranchesScript(this.dataSource);
        await branchscript.createBranchesTable(schemaName);
        console.log('3');
        const departmentData = [
            { department_name: 'Administration' },
            { department_name: 'Human Resources (HR)' },
            { department_name: 'Store' },
            { department_name: 'Sales' },
            { department_name: 'Support/ Customer Service' },
        ];
        await departmentscript.insertOrganizationDepartmentTable(schemaName, departmentData);
        console.log('4');
        const rolesData = [
            { role_id: 1, role_name: 'Admin' },
            { role_id: 2, role_name: 'User' },
        ];
        await organizationrolesscript.insertOrganizationRolesTable(schemaName, rolesData);
        console.log('5');
        const organizationpermissionsscript = new organization_permissions_1.OrganizationPermissionScript(this.dataSource);
        await organizationpermissionsscript.createOrganizationPermissionTable(schemaName);
        const rolesPermissionData = [
            { role_id: 1, permission: AdminDefaultPermission_1.adminDefaultPermission },
            { role_id: 2, permission: UserDefaultPermission_1.userDefaultPermission },
        ];
        await organizationpermissionsscript.insertOrganizationRolesPermissionTable(schemaName, rolesPermissionData);
        console.log('6');
        if (user) {
            user.role_id = 1;
            user.department_id = 1;
        }
        const inserted = await script.insertUserTable(schemaName, user);
        console.log('8');
        const fieldCategoryScript = new assetfieldcategory_1.assetFieldCategoryScript(this.dataSource);
        await fieldCategoryScript.createAssetFieldCategoryScriptTable(schemaName);
        const fieldCategoryData = [
            { asset_field_category_name: 'General Information' },
            { asset_field_category_name: 'Network & Domain Information' },
            { asset_field_category_name: 'System Specification' },
        ];
        await fieldCategoryScript.insertFieldCategoryTable(schemaName, fieldCategoryData);
        const insertedFieldCategories = await this.dataSource.query(`SELECT asset_field_category_id, asset_field_category_name 
       FROM ${schemaName}.asset_field_category 
       WHERE asset_field_category_name IN ('General Information', 'Network & Domain Information', 'System Specification')`);
        const categoryMap = {};
        insertedFieldCategories.forEach((cat) => {
            categoryMap[cat.asset_field_category_name] = cat.asset_field_category_id;
        });
        console.log('9');
        const fieldScript = new assetitemfields_1.ItemFieldsScript(this.dataSource);
        await fieldScript.createItemFieldsTable(schemaName);
        const fieldData = [
            {
                asset_field_name: 'Location',
                asset_field_category_id: categoryMap['General Information'],
                asset_field_label_name: 'Location',
                asset_field_type: 'text',
            },
            {
                asset_field_name: 'Expiry Date',
                asset_field_category_id: categoryMap['General Information'],
                asset_field_label_name: 'Expiry Date',
                asset_field_type: 'text',
            },
            {
                asset_field_name: 'Port',
                asset_field_category_id: categoryMap['General Information'],
                asset_field_label_name: 'Port',
                asset_field_type: 'text',
            },
            {
                asset_field_name: 'Contract Type',
                asset_field_category_id: categoryMap['General Information'],
                asset_field_label_name: 'Contract Type',
                asset_field_type: 'text',
            },
            {
                asset_field_name: 'Firmware Version',
                asset_field_category_id: categoryMap['General Information'],
                asset_field_label_name: 'Firmware Version',
                asset_field_type: 'text',
            },
            {
                asset_field_name: 'Processor',
                asset_field_category_id: categoryMap['System Specification'],
                asset_field_label_name: 'Processor',
                asset_field_type: 'text',
            },
            {
                asset_field_name: 'RAM',
                asset_field_category_id: categoryMap['System Specification'],
                asset_field_label_name: 'RAM',
                asset_field_type: 'text',
            },
            {
                asset_field_name: 'HDD',
                asset_field_category_id: categoryMap['System Specification'],
                asset_field_label_name: 'HDD',
                asset_field_type: 'text',
            },
            {
                asset_field_name: 'Graphics',
                asset_field_category_id: categoryMap['System Specification'],
                asset_field_label_name: 'Graphics',
                asset_field_type: 'text',
            },
            {
                asset_field_name: 'Screen Size',
                asset_field_category_id: categoryMap['System Specification'],
                asset_field_label_name: 'Screen Size',
                asset_field_type: 'text',
            },
            {
                asset_field_name: 'Screen',
                asset_field_category_id: categoryMap['System Specification'],
                asset_field_label_name: 'Screen',
                asset_field_type: 'text',
            },
            {
                asset_field_name: 'Pixel',
                asset_field_category_id: categoryMap['General Information'],
                asset_field_label_name: 'Pixel',
                asset_field_type: 'text',
            },
            {
                asset_field_name: 'Product Description',
                asset_field_category_id: categoryMap['General Information'],
                asset_field_label_name: 'Product Description',
                asset_field_type: 'text',
            },
            {
                asset_field_name: 'Type',
                asset_field_category_id: categoryMap['General Information'],
                asset_field_label_name: 'Type',
                asset_field_type: 'text',
            },
            {
                asset_field_name: 'Capacity',
                asset_field_category_id: categoryMap['General Information'],
                asset_field_label_name: 'Capacity',
                asset_field_type: 'text',
            },
            {
                asset_field_name: 'Host Name',
                asset_field_category_id: categoryMap['General Information'],
                asset_field_label_name: 'Host Name',
                asset_field_type: 'text',
            },
            {
                asset_field_name: 'Domain Name',
                asset_field_category_id: categoryMap['Network & Domain Information'],
                asset_field_label_name: 'Domain Name',
                asset_field_type: 'text',
            },
            {
                asset_field_name: 'Carrier',
                asset_field_category_id: categoryMap['Network & Domain Information'],
                asset_field_label_name: 'Carrier',
                asset_field_type: 'text',
            },
            {
                asset_field_name: 'IMEI No.',
                asset_field_category_id: categoryMap['Network & Domain Information'],
                asset_field_label_name: 'IMEI No.',
                asset_field_type: 'text',
            },
            {
                asset_field_name: 'IPv4',
                asset_field_category_id: categoryMap['Network & Domain Information'],
                asset_field_label_name: 'IPv4',
                asset_field_type: 'text',
            },
            {
                asset_field_name: 'Platform',
                asset_field_category_id: categoryMap['Network & Domain Information'],
                asset_field_label_name: 'Platform',
                asset_field_type: 'text',
            },
        ];
        await fieldScript.insertAssetFieldsTable(schemaName, fieldData);
        console.log('10');
        const itemfieldMappingScript = new assetitemfieldmapping_1.ItemFieldsMappingScript(this.dataSource);
        await itemfieldMappingScript.createItemFieldsMappingTable(schemaName);
        console.log('11');
        const assetCategoryScript = new category_1.CategoryScript(this.dataSource);
        await assetCategoryScript.createCategoryTable(schemaName);
        const assetMainCategoryData = [
            { main_category_name: 'IT' },
            { main_category_name: 'Non IT' },
        ];
        await assetCategoryScript.insertAssetMainCategoryTable(schemaName, assetMainCategoryData);
        const insertedMainCategories = await this.dataSource.query(`SELECT main_category_id, main_category_name FROM ${schemaName}.asset_main_category WHERE main_category_name IN ('IT', 'Non IT')`);
        const mainCatMap = {};
        insertedMainCategories.forEach((cat) => {
            mainCatMap[cat.main_category_name] = cat.main_category_id;
        });
        if (!mainCatMap['IT'] || !mainCatMap['Non IT']) {
            throw new Error('Main category IDs not found.');
        }
        console.log('12');
        const assetSubCategoryScript = new subcategory_1.SubCategoryScript(this.dataSource);
        await assetSubCategoryScript.createSubCategoryTable(schemaName);
        const assetSubCategoryData = [
            { main_category_id: mainCatMap['IT'], sub_category_name: 'Hardware' },
            { main_category_id: mainCatMap['IT'], sub_category_name: 'Software' },
            { main_category_id: mainCatMap['IT'], sub_category_name: 'Cloud' },
            { main_category_id: mainCatMap['IT'], sub_category_name: 'Data' },
            {
                main_category_id: mainCatMap['IT'],
                sub_category_name: 'Consumable Inventory',
            },
            {
                main_category_id: mainCatMap['Non IT'],
                sub_category_name: 'Electrical Equipment',
            },
            {
                main_category_id: mainCatMap['Non IT'],
                sub_category_name: 'Scientific Equipment',
            },
            {
                main_category_id: mainCatMap['Non IT'],
                sub_category_name: 'Office Equipment',
            },
            {
                main_category_id: mainCatMap['Non IT'],
                sub_category_name: 'Furniture',
            },
        ];
        await assetSubCategoryScript.insertAssetSubCategoryTable(schemaName, assetSubCategoryData);
        console.log('13');
        const insertedSubCategories = await this.dataSource.query(`SELECT sub_category_id, sub_category_name, main_category_id FROM ${schemaName}.asset_sub_category`);
        const subCatMap = {};
        insertedSubCategories.forEach((sub) => {
            const mainName = Object.keys(mainCatMap).find((key) => mainCatMap[key] === sub.main_category_id);
            if (mainName) {
                if (!subCatMap[mainName])
                    subCatMap[mainName] = {};
                subCatMap[mainName][sub.sub_category_name] = sub.sub_category_id;
            }
        });
        const assetItemScript = new items_1.ItemsScript(this.dataSource);
        await assetItemScript.createItemsTable(schemaName);
        const assetItemRawData = [
            {
                main: 'IT',
                sub: 'Hardware',
                name: 'Computer',
                is_licensable: true,
                item_type: 'Physical',
            },
            {
                main: 'IT',
                sub: 'Hardware',
                name: 'Server',
                is_licensable: true,
                item_type: 'Physical',
            },
            {
                main: 'IT',
                sub: 'Hardware',
                name: 'Mobile',
                is_licensable: true,
                item_type: 'Physical',
            },
            {
                main: 'IT',
                sub: 'Hardware',
                name: 'Keyboard',
                is_licensable: false,
                item_type: 'Physical',
            },
            {
                main: 'IT',
                sub: 'Hardware',
                name: 'Mouse',
                is_licensable: false,
                item_type: 'Physical',
            },
            {
                main: 'IT',
                sub: 'Hardware',
                name: 'Webcam',
                is_licensable: false,
                item_type: 'Physical',
            },
            {
                main: 'IT',
                sub: 'Hardware',
                name: 'Router',
                is_licensable: false,
                item_type: 'Physical',
            },
            {
                main: 'IT',
                sub: 'Hardware',
                name: 'Switch',
                is_licensable: false,
                item_type: 'Physical',
            },
            {
                main: 'IT',
                sub: 'Hardware',
                name: 'Peripherals',
                is_licensable: false,
                item_type: 'Physical',
            },
            {
                main: 'IT',
                sub: 'Hardware',
                name: 'Printer and Scanners',
                is_licensable: false,
                item_type: 'Physical',
            },
            {
                main: 'IT',
                sub: 'Hardware',
                name: 'IP Camera',
                is_licensable: false,
                item_type: 'Physical',
            },
            {
                main: 'IT',
                sub: 'Hardware',
                name: 'Access Point',
                is_licensable: false,
                item_type: 'Physical',
            },
            {
                main: 'IT',
                sub: 'Hardware',
                name: 'Monitors',
                is_licensable: false,
                item_type: 'Physical',
            },
            {
                main: 'IT',
                sub: 'Hardware',
                name: 'Headset',
                is_licensable: false,
                item_type: 'Physical',
            },
            {
                main: 'IT',
                sub: 'Hardware',
                name: 'Projector',
                is_licensable: false,
                item_type: 'Physical',
            },
            {
                main: 'IT',
                sub: 'Hardware',
                name: 'Tablet',
                is_licensable: true,
                item_type: 'Physical',
            },
            {
                main: 'IT',
                sub: 'Hardware',
                name: 'Videoconference Camera',
                is_licensable: false,
                item_type: 'Physical',
            },
            {
                main: 'IT',
                sub: 'Hardware',
                name: 'Storage Device',
                is_licensable: true,
                item_type: 'Physical',
            },
            {
                main: 'IT',
                sub: 'Software',
                name: 'Operating System',
                is_licensable: true,
                item_type: 'Virtual',
            },
            {
                main: 'IT',
                sub: 'Software',
                name: 'Application Software',
                is_licensable: true,
                item_type: 'Virtual',
            },
            {
                main: 'IT',
                sub: 'Software',
                name: 'Contract',
                is_licensable: true,
                item_type: 'Virtual',
            },
            {
                main: 'IT',
                sub: 'Cloud',
                name: 'Virtual Machine',
                is_licensable: true,
                item_type: 'Virtual',
            },
            {
                main: 'IT',
                sub: 'Cloud',
                name: 'Storage resources',
                is_licensable: true,
                item_type: 'Virtual',
            },
            {
                main: 'IT',
                sub: 'Data',
                name: 'Contract',
                is_licensable: true,
                item_type: 'Virtual',
            },
            {
                main: 'IT',
                sub: 'Data',
                name: 'Warranty',
                is_licensable: true,
                item_type: 'Virtual',
            },
            {
                main: 'IT',
                sub: 'Data',
                name: 'Business Application',
                is_licensable: true,
                item_type: 'Virtual',
            },
            {
                main: 'IT',
                sub: 'Consumable Inventory',
                name: 'Pen Drive',
                is_licensable: false,
                item_type: 'Physical',
            },
            {
                main: 'IT',
                sub: 'Consumable Inventory',
                name: 'Cartridge',
                is_licensable: false,
                item_type: 'Physical',
            },
            {
                main: 'IT',
                sub: 'Consumable Inventory',
                name: 'CD / DVD',
                is_licensable: false,
                item_type: 'Physical',
            },
            {
                main: 'Non IT',
                sub: 'Electrical Equipment',
                name: 'Air Conditioner',
                is_licensable: false,
                item_type: 'Physical',
            },
            {
                main: 'Non IT',
                sub: 'Electrical Equipment',
                name: 'Pedestal Fan',
                is_licensable: false,
                item_type: 'Physical',
            },
            {
                main: 'Non IT',
                sub: 'Electrical Equipment',
                name: 'Desert Coolers',
                is_licensable: false,
                item_type: 'Physical',
            },
            {
                main: 'Non IT',
                sub: 'Electrical Equipment',
                name: 'Refrigerators',
                is_licensable: false,
                item_type: 'Physical',
            },
            {
                main: 'Non IT',
                sub: 'Electrical Equipment',
                name: 'Microwaves',
                is_licensable: false,
                item_type: 'Physical',
            },
            {
                main: 'Non IT',
                sub: 'Electrical Equipment',
                name: 'Electric Motors',
                is_licensable: false,
                item_type: 'Physical',
            },
            {
                main: 'Non IT',
                sub: 'Electrical Equipment',
                name: 'Generators',
                is_licensable: false,
                item_type: 'Physical',
            },
            {
                main: 'Non IT',
                sub: 'Electrical Equipment',
                name: 'Invertors',
                is_licensable: false,
                item_type: 'Physical',
            },
            {
                main: 'Non IT',
                sub: 'Electrical Equipment',
                name: 'Shredding machine',
                is_licensable: false,
                item_type: 'Physical',
            },
            {
                main: 'Non IT',
                sub: 'Electrical Equipment',
                name: 'Voltage Stabilizer',
                is_licensable: false,
                item_type: 'Physical',
            },
            {
                main: 'Non IT',
                sub: 'Electrical Equipment',
                name: 'UPS',
                is_licensable: false,
                item_type: 'Physical',
            },
            {
                main: 'Non IT',
                sub: 'Furniture',
                name: 'Chair',
                is_licensable: false,
                item_type: 'Physical',
            },
            {
                main: 'Non IT',
                sub: 'Furniture',
                name: 'Computer Desk',
                is_licensable: false,
                item_type: 'Physical',
            },
            {
                main: 'Non IT',
                sub: 'Electrical Equipment',
                name: 'CCTV Camera',
                is_licensable: true,
                item_type: 'Physical',
            },
            {
                main: 'Non IT',
                sub: 'Electrical Equipment',
                name: 'VC Camera',
                is_licensable: true,
                item_type: 'Physical',
            },
            {
                main: 'IT',
                sub: 'Hardware',
                name: 'Wireless AP',
                is_licensable: false,
                item_type: 'Physical',
            },
            {
                main: 'IT',
                sub: 'Software',
                name: 'Firewall',
                is_licensable: false,
                item_type: 'Physical',
            },
        ];
        const assetItemData = assetItemRawData.map((item) => {
            const mainId = mainCatMap[item.main];
            const subId = subCatMap[item.main]?.[item.sub];
            if (!mainId || !subId) {
                throw new Error(`Missing ID mapping for item: ${item.name}`);
            }
            return {
                main_category_id: mainId,
                sub_category_id: subId,
                asset_item_name: item.name,
                is_licensable: item.is_licensable,
                item_type: item.item_type,
            };
        });
        await assetItemScript.insertAssetItemTable(schemaName, assetItemData);
        console.log('14');
        const mappings = [
            { itemName: 'Computer', fieldName: 'RAM' },
            { itemName: 'Computer', fieldName: 'Processor' },
            { itemName: 'Computer', fieldName: 'Graphics' },
            { itemName: 'Computer', fieldName: 'HDD' },
            { itemName: 'Computer', fieldName: 'Host Name' },
            { itemName: 'Computer', fieldName: 'Domain Name' },
            { itemName: 'Computer', fieldName: 'IPv4' },
            { itemName: 'Server', fieldName: 'RAM' },
            { itemName: 'Server', fieldName: 'Processor' },
            { itemName: 'Server', fieldName: 'Graphics' },
            { itemName: 'Server', fieldName: 'HDD' },
            { itemName: 'Server', fieldName: 'IPv4' },
            { itemName: 'Server', fieldName: 'Graphics' },
            { itemName: 'Server', fieldName: 'Host Name' },
            { itemName: 'Server', fieldName: 'Domain Name' },
            { itemName: 'Tablet', fieldName: 'RAM' },
            { itemName: 'Tablet', fieldName: 'Processor' },
            { itemName: 'Tablet', fieldName: 'Graphics' },
            { itemName: 'Tablet', fieldName: 'HDD' },
            { itemName: 'Tablet', fieldName: 'IPv4' },
            { itemName: 'Tablet', fieldName: 'Graphics' },
            { itemName: 'Tablet', fieldName: 'Host Name' },
            { itemName: 'Tablet', fieldName: 'Domain Name' },
            { itemName: 'Mobile', fieldName: 'RAM' },
            { itemName: 'Mobile', fieldName: 'Processor' },
            { itemName: 'Mobile', fieldName: 'Graphics' },
            { itemName: 'Mobile', fieldName: 'HDD' },
            { itemName: 'Mobile', fieldName: 'IPv4' },
            { itemName: 'Mobile', fieldName: 'Screen' },
            { itemName: 'Mobile', fieldName: 'IMEI No.' },
            { itemName: 'Mobile', fieldName: 'Carrier' },
            { itemName: 'Switch', fieldName: 'RAM' },
            { itemName: 'Switch', fieldName: 'Processor' },
            { itemName: 'Switch', fieldName: 'HDD' },
            { itemName: 'Switch', fieldName: 'Host Name' },
            { itemName: 'Switch', fieldName: 'Domain Name' },
            { itemName: 'Switch', fieldName: 'IPv4' },
            { itemName: 'Router', fieldName: 'RAM' },
            { itemName: 'Router', fieldName: 'Processor' },
            { itemName: 'Router', fieldName: 'HDD' },
            { itemName: 'Router', fieldName: 'Host Name' },
            { itemName: 'Router', fieldName: 'Domain Name' },
            { itemName: 'Router', fieldName: 'IPv4' },
            { itemName: 'Firewall', fieldName: 'RAM' },
            { itemName: 'Firewall', fieldName: 'Processor' },
            { itemName: 'Firewall', fieldName: 'HDD' },
            { itemName: 'Firewall', fieldName: 'IPv4' },
            { itemName: 'Firewall', fieldName: 'Graphics' },
            { itemName: 'Firewall', fieldName: 'Host Name' },
            { itemName: 'Firewall', fieldName: 'Domain Name' },
            { itemName: 'Firewall', fieldName: 'Carrier' },
            { itemName: 'CCTV Camera', fieldName: 'Type' },
            { itemName: 'CCTV Camera', fieldName: 'Pixel' },
            { itemName: 'CCTV Camera', fieldName: 'IPv4' },
            { itemName: 'VC Camera', fieldName: 'Type' },
            { itemName: 'VC Camera', fieldName: 'Pixel' },
            { itemName: 'VC Camera', fieldName: 'IPv4' },
            { itemName: 'Storage Device', fieldName: 'Type' },
            { itemName: 'Storage Device', fieldName: 'Product Description' },
            { itemName: 'Storage Device', fieldName: 'IPv4' },
            { itemName: 'Wireless AP', fieldName: 'IPv4' },
            { itemName: 'Wireless AP', fieldName: 'Host Name' },
            { itemName: 'Printer and Scanners', fieldName: 'RAM' },
            { itemName: 'Printer and Scanners', fieldName: 'Host Name' },
            { itemName: 'Printer and Scanners', fieldName: 'Domain Name' },
            { itemName: 'Printer and Scanners', fieldName: 'IPv4' },
        ];
        await itemfieldMappingScript.insertItemFieldMappings(schemaName, mappings);
        const statusScript = new assetstatsutypes_1.AssetStatusTypesScript(this.dataSource);
        await statusScript.createAssetStatusTable(schemaName);
        const statusData = [
            { status_type_name: 'AVAILABLE' },
            { status_type_name: 'IN USE' },
        ];
        await statusScript.insertAssetStatusTable(schemaName, statusData);
        console.log('15');
        const ownershipstatusScript = new assetOwnershipstatsutypes_1.AssetOwnershipStatusTypesScript(this.dataSource);
        await ownershipstatusScript.createAssetOwnershipStatusTypesTable(schemaName);
        const ownershipstatusData = [
            { ownership_status_type_name: 'CAPEX' },
            { ownership_status_type_name: 'LEASE' },
            { ownership_status_type_name: 'OPEX' },
            { ownership_status_type_name: 'RENTED' },
            { ownership_status_type_name: 'OWNED' },
        ];
        await ownershipstatusScript.insertAssetOwnershipStatusTable(schemaName, ownershipstatusData);
        console.log('16');
        const workingstatusScript = new assetworkingstatus_1.AssetWorkingStatusScript(this.dataSource);
        await workingstatusScript.createAssetWorkingStatusTable(schemaName);
        const workingstatusData = [
            { working_status_type_name: 'OPERATIONAL' },
            { working_status_type_name: 'UNDER MAINTAINANCE' },
            { working_status_type_name: 'FAULTY' },
            { working_status_type_name: 'DAMAGED' },
            { working_status_type_name: 'RETIRED' },
        ];
        await workingstatusScript.insertAssetWorkingStatusTable(schemaName, workingstatusData);
        console.log('17');
        const itemRelationScript = new assetitemrelations_1.AssetItemRelationScript(this.dataSource);
        await itemRelationScript.createAssetItemRelationTable(schemaName);
        let RelationType;
        (function (RelationType) {
            RelationType["Other"] = "Other";
            RelationType["Accessory"] = "Accessory";
            RelationType["Contract"] = "Contract";
            RelationType["Application"] = "Application";
        })(RelationType || (RelationType = {}));
        const relations = [
            {
                parentItemName: 'Computer',
                childItemName: 'Keyboard',
                relationType: RelationType.Accessory,
            },
            {
                parentItemName: 'Computer',
                childItemName: 'Monitors',
                relationType: RelationType.Accessory,
            },
            {
                parentItemName: 'Computer',
                childItemName: 'Mouse',
                relationType: RelationType.Accessory,
            },
            {
                parentItemName: 'Computer',
                childItemName: 'Contract',
                relationType: RelationType.Contract,
            },
            {
                parentItemName: 'Computer',
                childItemName: 'Application Software',
                relationType: RelationType.Application,
            },
            {
                parentItemName: 'Computer',
                childItemName: 'Operating System',
                relationType: RelationType.Application,
            },
        ];
        await itemRelationScript.insertItemRelations(schemaName, relations);
        console.log('18');
        const assetScript = new assets_1.AssetsScript(this.dataSource);
        await assetScript.createAssetsTable(schemaName);
        console.log('19');
        const licencetypesScript = new licencetypes_1.LicenceTypesScript(this.dataSource);
        await licencetypesScript.createLicenceTypesTable(schemaName);
        const licencetypesDataflags = [
            {
                licence_type: 'FPP',
                licence_key_type: true,
                needs_license_key: true,
                bulk_license: false,
                have_plan_type: false,
                is_active: 1,
                is_delete: 0,
            },
            {
                licence_type: 'Volume',
                licence_key_type: false,
                needs_license_key: true,
                bulk_license: false,
                have_plan_type: false,
                is_active: 1,
                is_delete: 0,
            },
            {
                licence_type: 'Preloaded',
                licence_key_type: true,
                needs_license_key: false,
                bulk_license: false,
                have_plan_type: false,
                is_active: 1,
                is_delete: 0,
            },
            {
                licence_type: 'Subscription',
                licence_key_type: true,
                needs_license_key: true,
                bulk_license: false,
                have_plan_type: true,
                is_active: 1,
                is_delete: 0,
            },
            {
                licence_type: 'Perpetual',
                licence_key_type: true,
                needs_license_key: true,
                bulk_license: false,
                have_plan_type: false,
                is_active: 1,
                is_delete: 0,
            },
            {
                licence_type: 'OEM',
                licence_key_type: true,
                needs_license_key: true,
                bulk_license: false,
                have_plan_type: false,
                is_active: 1,
                is_delete: 0,
            },
        ];
        await licencetypesScript.insertLicenceTypeTable(schemaName, licencetypesDataflags);
        console.log('20');
        const vendorScript = new venders_1.VendersScript(this.dataSource);
        await vendorScript.createVendersTable(schemaName);
        console.log('21');
        const stockScript = new stocks_1.StocksScript(this.dataSource);
        await stockScript.createStocksTable(schemaName);
        console.log('22');
        const assetMappingScript = new assetmapping_1.AssetMappingRelations(this.dataSource);
        await assetMappingScript.createAssetMappingRelationsTable(schemaName);
        console.log('23');
        const transferScript = new transferhistory_1.AssetTransferHistoryScript(this.dataSource);
        await transferScript.createAssetTransferHistoryTable(schemaName);
        console.log('24');
        const stockSerialScript = new stockserial_1.AssetStockSerialsScript(this.dataSource);
        await stockSerialScript.createAssetStockSerialsTable(schemaName);
        console.log('25');
        const OrgStats = new assetsorgstats_1.orgStatsScriptScript(this.dataSource);
        await OrgStats.createOrgStatsScriptTable(schemaName);
        console.log('26');
        const assetProject = new assetproject_1.assetProjectScript(this.dataSource);
        await assetProject.createAssetProjectTable(schemaName);
        console.log('27');
        const costCenterTable = new assetcostcenter_1.assetCostCenterScript(this.dataSource);
        await costCenterTable.createAssetCostCenterScriptTable(schemaName);
        console.log('28');
        const locationTable = new assetlocation_1.assetLocationScript(this.dataSource);
        await locationTable.createAssetLocationScriptTable(schemaName);
        console.log('29');
        const depriciataionTable = new assetdepreciationmethods_1.assetDepreciationMethodsScript(this.dataSource);
        await depriciataionTable.createassetDepreciationMethodsScriptTable(schemaName);
        console.log('30');
    }
}
exports.OrganizationSchemaManager = OrganizationSchemaManager;
