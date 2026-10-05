"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionExpiryVariablesConfig = void 0;
exports.SubscriptionExpiryVariablesConfig = {
    primaryKey: 'subscription_id',
    display_names: {
        organisation_name: 'Organization Name',
        subscription_id: 'Subscription ID',
        plan_id: 'Plan ID',
        subscription_type_id: 'Subscription Type',
        DaysRemaining: 'Days Remaining',
        start_date: 'Start Date',
        renewal_date: 'Renewal Date',
        purchase_date: 'Purchase Date',
        trial_start_date: 'Trial Start Date',
        trial_expiry_date: 'Trial Expiry Date',
        price: 'Plan Price',
        discounted_price: 'Discounted Price',
        grand_total: 'Grand Total',
        renewal_status: 'Renewal Status',
    },
    defaultSortField: 'created_at',
    defaultSortOrder: 'desc',
    actionsEnabled: false,
};
