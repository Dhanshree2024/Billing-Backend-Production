"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.YesNoSmallint = exports.TemplateApprovalAction = exports.BodyFormat = exports.TemplateVersionState = exports.MessageStatus = exports.BatchStatus = void 0;
var BatchStatus;
(function (BatchStatus) {
    BatchStatus["created"] = "created";
    BatchStatus["scheduled"] = "scheduled";
    BatchStatus["running"] = "running";
    BatchStatus["paused"] = "paused";
    BatchStatus["completed"] = "completed";
    BatchStatus["failed"] = "failed";
    BatchStatus["cancelled"] = "cancelled";
})(BatchStatus || (exports.BatchStatus = BatchStatus = {}));
var MessageStatus;
(function (MessageStatus) {
    MessageStatus["queued"] = "queued";
    MessageStatus["sent"] = "sent";
    MessageStatus["delivered"] = "delivered";
    MessageStatus["failed"] = "failed";
    MessageStatus["suppressed"] = "suppressed";
})(MessageStatus || (exports.MessageStatus = MessageStatus = {}));
var TemplateVersionState;
(function (TemplateVersionState) {
    TemplateVersionState["draft"] = "draft";
    TemplateVersionState["in_review"] = "in_review";
    TemplateVersionState["approved"] = "approved";
    TemplateVersionState["active"] = "active";
    TemplateVersionState["archived"] = "archived";
})(TemplateVersionState || (exports.TemplateVersionState = TemplateVersionState = {}));
var BodyFormat;
(function (BodyFormat) {
    BodyFormat["TEXT"] = "TEXT";
    BodyFormat["HTML"] = "HTML";
    BodyFormat["MJML"] = "MJML";
})(BodyFormat || (exports.BodyFormat = BodyFormat = {}));
var TemplateApprovalAction;
(function (TemplateApprovalAction) {
    TemplateApprovalAction["submit"] = "submit";
    TemplateApprovalAction["approve"] = "approve";
    TemplateApprovalAction["reject"] = "reject";
})(TemplateApprovalAction || (exports.TemplateApprovalAction = TemplateApprovalAction = {}));
var YesNoSmallint;
(function (YesNoSmallint) {
    YesNoSmallint[YesNoSmallint["No"] = 0] = "No";
    YesNoSmallint[YesNoSmallint["Yes"] = 1] = "Yes";
})(YesNoSmallint || (exports.YesNoSmallint = YesNoSmallint = {}));
