"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NOTIFICATION_REDIRECTS = void 0;
exports.NOTIFICATION_REDIRECTS = {
    asset_details: {
        label: 'Asset Details',
        url: '/all-assets',
        params: ['asset_id'],
    },
    asset_maintenance: {
        label: 'Asset Maintenance',
        url: '/manage-asset',
        params: [],
    },
    user_profile: {
        label: 'User Profile',
        url: '/user-profile',
        params: [],
    },
    project_details: {
        label: 'Projects',
        url: '/projects',
        params: [],
    },
    asset_transfer: {
        label: 'Asset Transfer',
        url: '/asset-transfer',
        params: ['asset_id', 'transfer_id'],
    },
    organization_profile: {
        label: 'Organization Profile',
        url: '/organization-profile',
        params: [],
    },
    users: {
        label: 'Users',
        url: '/users',
        params: [],
    },
    location: {
        label: 'Location',
        url: '/location',
        params: [],
    },
    cost_center: {
        label: 'Cost Center',
        url: '/cost-center',
        params: [],
    },
    all_assets: {
        label: 'All Asset',
        url: '/all-assets',
        params: [],
    },
    asset_stocks: {
        label: 'Stocks',
        url: '/asset-stocks',
        params: [],
    },
    dashboard: {
        label: 'Dashboard',
        url: '/dashboard',
        params: [],
    },
    scrap_asset: {
        label: 'Scrap',
        url: '/scrap-asset',
        params: [],
    },
    location_transfer: {
        label: 'Location Transfer',
        url: '/location-transfer',
        params: [],
    },
    roles_permissions: {
        label: 'Roles & Permissions',
        url: '/roles-permissions',
        params: [],
    },
    vendor: {
        label: 'Vendor',
        url: '/vendor',
        params: [],
    },
    branch: {
        label: 'Branch',
        url: '/organization-profile',
        params: [],
        tab: 'branches',
    },
    departments: {
        label: 'Departments',
        url: '/organization-profile',
        params: [],
        tab: 'departments',
    },
    subscription: {
        label: 'Subscription',
        url: '/organization-profile',
        params: [],
        tab: 'subscription',
    },
    other: {
        label: 'Other Settings',
        url: '/organization-profile',
        params: [],
        tab: 'other-settings',
    },
    software: {
        label: 'Subscription Management',
        url: '/asset-softwares',
        params: [],
    },
    perpetual: {
        label: 'Perpetual Software',
        url: '/perpetual-software',
        params: [],
    },
    renewals: {
        label: 'Renewal Management',
        url: '/manage-renewals',
        params: [],
    },
    policy_details: {
        label: 'Policy Details',
        url: '',
        params: ['policy_id', 'policy_version_id'],
        action: 'modal',
        modal: 'policy',
    },
};
