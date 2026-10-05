"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PolicyListViewConfig = void 0;
exports.PolicyListViewConfig = {
    primaryKey: 'policy_id',
    display_names: {
        policy_id: 'Policy ID',
        policy_name: 'Policy Name',
        policy_version: 'Policy Version',
        description: 'Description',
        policy_version_id: 'Policy Version ID',
    },
    defaultSortField: 'created_at',
    defaultSortOrder: 'desc',
    actionsEnabled: true,
};
