"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ACCOUNT_TYPE_LISTVIEW_MAP = exports.LIST_VIEW_REGISTRY = void 0;
const enums_1 = require("../enums/enums");
const UserListViewConfig_1 = require("../configs/UserListViewConfig");
const AssetMaintenanceConfig_1 = require("../configs/AssetMaintenanceConfig");
const AssetsAndAssignementConfig_1 = require("../configs/AssetsAndAssignementConfig");
const AssetScrapConfig_1 = require("../configs/AssetScrapConfig");
const RoleConfig_1 = require("../configs/RoleConfig");
const StockTransferConfig_1 = require("../configs/StockTransferConfig");
const SubscriptionListViewConfig_1 = require("../configs/SubscriptionListViewConfig");
const BranchConfig_1 = require("../configs/BranchConfig");
const LocationConfig_1 = require("../configs/LocationConfig");
const CostCenterConfig_1 = require("../configs/CostCenterConfig");
const ProjectConfig_1 = require("../configs/ProjectConfig");
const DepartmentConfig_1 = require("../configs/DepartmentConfig");
const StockSerialsVariableConfig_1 = require("../configs/StockSerialsVariableConfig");
const vendorConfig_1 = require("../configs/vendorConfig");
const SupportTicketConfig_1 = require("../configs/SupportTicketConfig");
const PolicyConfig_1 = require("../configs/PolicyConfig");
exports.LIST_VIEW_REGISTRY = {
    UserListViewConfig: UserListViewConfig_1.UserListViewConfig,
    AssetMaintenanceVariablesConfig: AssetMaintenanceConfig_1.AssetMaintenanceVariablesConfig,
    AssetAssignmentVariablesConfig: AssetsAndAssignementConfig_1.AssetAssignmentVariablesConfig,
    AssetScrapVariablesConfig: AssetScrapConfig_1.AssetScrapVariablesConfig,
    RoleCreationVariablesConfig: RoleConfig_1.RoleCreationVariablesConfig,
    StockTransferVariablesConfig: StockTransferConfig_1.StockTransferVariablesConfig,
    SubscriptionExpiryVariablesConfig: SubscriptionListViewConfig_1.SubscriptionExpiryVariablesConfig,
    BranchVariablesConfig: BranchConfig_1.BranchVariablesConfig,
    LocationVariablesConfig: LocationConfig_1.LocationVariablesConfig,
    CostCenterVariablesConfig: CostCenterConfig_1.CostCenterVariablesConfig,
    ProjectVariablesConfig: ProjectConfig_1.ProjectVariablesConfig,
    DepartmentVariablesConfig: DepartmentConfig_1.DepartmentVariablesConfig,
    AssetStockSerialsVariablesConfig: StockSerialsVariableConfig_1.AssetStockSerialsVariablesConfig,
    VendorVariablesConfig: vendorConfig_1.VendorVariablesConfig,
    SupportTicketsConfig: SupportTicketConfig_1.SupportTicketsConfig,
    PolicyListViewConfig: PolicyConfig_1.PolicyListViewConfig
};
exports.ACCOUNT_TYPE_LISTVIEW_MAP = {
    [enums_1.AccountTypesEnum.User]: 'UserListViewConfig',
    [enums_1.AccountTypesEnum.AssetMaintenance]: 'AssetMaintenanceVariablesConfig',
    [enums_1.AccountTypesEnum.AssetAssignment]: 'AssetAssignmentVariablesConfig',
    [enums_1.AccountTypesEnum.AssetScrap]: 'AssetScrapVariablesConfig',
    [enums_1.AccountTypesEnum.RoleCreation]: 'RoleCreationVariablesConfig',
    [enums_1.AccountTypesEnum.StockTransfer]: 'StockTransferVariablesConfig',
    [enums_1.AccountTypesEnum.SubscriptionExpiry]: 'SubscriptionExpiryVariablesConfig',
    [enums_1.AccountTypesEnum.BranchCreation]: 'BranchVariablesConfig',
    [enums_1.AccountTypesEnum.LocationCreation]: 'LocationVariablesConfig',
    [enums_1.AccountTypesEnum.CostCenterCreation]: 'CostCenterVariablesConfig',
    [enums_1.AccountTypesEnum.ProjectCreation]: 'ProjectVariablesConfig',
    [enums_1.AccountTypesEnum.DepartmentCreation]: 'DepartmentVariablesConfig',
    [enums_1.AccountTypesEnum.AssetStockSerialCreation]: 'AssetStockSerialsVariablesConfig',
    [enums_1.AccountTypesEnum.VendorCreation]: 'VendorVariablesConfig',
    [enums_1.AccountTypesEnum.SupportTicketsCreation]: 'SupportTicketsConfig',
    [enums_1.AccountTypesEnum.Policy]: 'PolicyListViewConfig',
};
