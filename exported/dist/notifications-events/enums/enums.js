"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateVersionState = exports.BloodGroup = exports.TransactionType = exports.LoanTypeEnum = exports.AccountTypesEnum = void 0;
var AccountTypesEnum;
(function (AccountTypesEnum) {
    AccountTypesEnum["User"] = "User";
    AccountTypesEnum["AssetMaintenance"] = "AssetMaintenance";
    AccountTypesEnum["AssetAssignment"] = "AssetAssignment";
    AccountTypesEnum["AssetScrap"] = "AssetScrap";
    AccountTypesEnum["RoleCreation"] = "RoleCreation";
    AccountTypesEnum["StockTransfer"] = "StockTransfer";
    AccountTypesEnum["SubscriptionExpiry"] = "SubscriptionExpiry";
    AccountTypesEnum["BranchCreation"] = "BranchCreation";
    AccountTypesEnum["LocationCreation"] = "LocationCreation";
    AccountTypesEnum["CostCenterCreation"] = "CostCenterCreation";
    AccountTypesEnum["ProjectCreation"] = "ProjectCreation";
    AccountTypesEnum["DepartmentCreation"] = "DepartmentCreation";
    AccountTypesEnum["AssetStockSerialCreation"] = "AssetStockSerialCreation";
    AccountTypesEnum["VendorCreation"] = "VendorCreation";
    AccountTypesEnum["SupportTicketsCreation"] = "SupportTicketsCreation";
    AccountTypesEnum["Policy"] = "Policy";
})(AccountTypesEnum || (exports.AccountTypesEnum = AccountTypesEnum = {}));
var LoanTypeEnum;
(function (LoanTypeEnum) {
    LoanTypeEnum["GOLD"] = "Gold Loan";
    LoanTypeEnum["PersonalLoan"] = "Personal Loan";
    LoanTypeEnum["HomeLoan"] = "Home Loan";
    LoanTypeEnum["FD"] = "Deposit Loan FD";
})(LoanTypeEnum || (exports.LoanTypeEnum = LoanTypeEnum = {}));
var TransactionType;
(function (TransactionType) {
    TransactionType["Debit"] = "Debit";
    TransactionType["Credit"] = "Credit";
})(TransactionType || (exports.TransactionType = TransactionType = {}));
var BloodGroup;
(function (BloodGroup) {
    BloodGroup["A_POSITIVE"] = "A+";
    BloodGroup["A_NEGATIVE"] = "A-";
    BloodGroup["B_POSITIVE"] = "B+";
    BloodGroup["B_NEGATIVE"] = "B-";
    BloodGroup["AB_POSITIVE"] = "AB+";
    BloodGroup["AB_NEGATIVE"] = "AB-";
    BloodGroup["O_POSITIVE"] = "O+";
    BloodGroup["O_NEGATIVE"] = "O-";
})(BloodGroup || (exports.BloodGroup = BloodGroup = {}));
var TemplateVersionState;
(function (TemplateVersionState) {
    TemplateVersionState["draft"] = "draft";
    TemplateVersionState["in_review"] = "in_review";
    TemplateVersionState["approved"] = "approved";
    TemplateVersionState["active"] = "active";
    TemplateVersionState["archived"] = "archived";
})(TemplateVersionState || (exports.TemplateVersionState = TemplateVersionState = {}));
