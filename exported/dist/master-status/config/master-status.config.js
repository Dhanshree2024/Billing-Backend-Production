"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MASTER_STATUS = void 0;
exports.MASTER_STATUS = {
    billingType: [
        {
            id: 1,
            label: 'Direct',
            value: 'DIRECT',
            description: 'Customer buys and pays directly to us',
        },
        {
            id: 2,
            label: 'Reseller',
            value: 'RESELLER',
            description: 'Product sold via reseller',
        },
    ],
    billingCycle: [
        {
            id: 1,
            label: 'Annual',
            value: 'ANNUAL',
            description: 'Billing every 12 months',
        },
        {
            id: 2,
            label: 'Monthly',
            value: 'MONTHLY',
            description: 'Billing every month',
        },
        {
            id: 3,
            label: 'One Time',
            value: 'ONE_TIME',
            description: 'Permanent or fixed duration',
        },
        {
            id: 4,
            label: 'Custom',
            value: 'CUSTOM',
            description: 'Quarterly/Weekly/Usage based',
        },
    ],
    subscriptionStatus: [
        {
            id: 1,
            label: 'Active',
            value: 'ACTIVE',
        },
        {
            id: 2,
            label: 'In Process',
            value: 'IN_PROCESS',
        },
        {
            id: 3,
            label: 'Payment Pending',
            value: 'PAYMENT_PENDING',
        },
        {
            id: 4,
            label: 'Graced',
            value: 'GRACED',
        },
        {
            id: 5,
            label: 'Expired',
            value: 'EXPIRED',
        },
        {
            id: 6,
            label: 'Terminated',
            value: 'TERMINATED',
        },
        {
            id: 7,
            label: 'Cancelled',
            value: 'CANCELLED',
        },
        {
            id: 8,
            label: 'Admin Hold',
            value: 'ADMIN_HOLD',
        },
        {
            id: 9,
            label: 'Credit Hold',
            value: 'CREDIT_HOLD',
        },
    ],
    salesEnquiryStatus: [
        {
            id: 1,
            label: 'New Enquiry',
            value: 'NEW',
        },
        {
            id: 2,
            label: 'In Progress',
            value: 'IN_PROGRESS',
        },
        {
            id: 3,
            label: 'Closed - Win',
            value: 'WIN',
        },
        {
            id: 4,
            label: 'Closed - Lost',
            value: 'LOST',
        },
        {
            id: 5,
            label: 'False',
            value: 'FALSE',
        },
    ],
    organizationStatus: [
        {
            id: 1,
            label: 'Active',
            value: 'ACTIVE',
        },
        {
            id: 2,
            label: 'Closed',
            value: 'CLOSED',
        },
        {
            id: 3,
            label: 'Inactive',
            value: 'INACTIVE',
        },
    ],
    trialStatus: [
        {
            id: 1,
            label: 'Active',
            value: 'ACTIVE',
        },
        {
            id: 2,
            label: 'Expiring Soon',
            value: 'EXPIRING_SOON',
        },
        {
            id: 3,
            label: 'Expired',
            value: 'EXPIRED',
        },
        {
            id: 4,
            label: 'Upgraded',
            value: 'UPGRADED',
        },
        {
            id: 5,
            label: 'Converted',
            value: 'CONVERTED',
        },
        {
            id: 6,
            label: 'Cancelled',
            value: 'CANCELLED',
        },
    ],
    orderType: [
        {
            id: 1,
            label: 'New',
            value: 'NEW',
        },
        {
            id: 2,
            label: 'Renewal',
            value: 'RENEWAL',
        },
        {
            id: 3,
            label: 'Auto Renewal',
            value: 'AUTO_RENEWAL',
        },
        {
            id: 4,
            label: 'Upgrade',
            value: 'UPGRADE',
        },
        {
            id: 5,
            label: 'Downgrade',
            value: 'DOWNGRADE',
        },
        {
            id: 6,
            label: 'Trial',
            value: 'TRIAL',
        },
    ],
    paymentStatus: [
        {
            id: 1,
            label: 'Settled',
            value: 'SETTLED',
        },
        {
            id: 2,
            label: 'Pending',
            value: 'PENDING',
        },
        {
            id: 3,
            label: 'Partially Paid',
            value: 'PARTIALLY_PAID',
        },
        {
            id: 4,
            label: 'Overdue',
            value: 'OVERDUE',
        },
        {
            id: 5,
            label: 'Credit Hold',
            value: 'CREDIT_HOLD',
        },
    ],
    partnerPaymentStatus: [
        {
            id: 1,
            label: 'Partner Settled',
            value: 'PARTNER_SETTLED',
        },
        {
            id: 2,
            label: 'Partner Pending',
            value: 'PARTNER_PENDING',
        },
        {
            id: 3,
            label: 'Partner Partially Paid',
            value: 'PARTNER_PARTIALLY_PAID',
        },
        {
            id: 4,
            label: 'Partner Overdue',
            value: 'PARTNER_OVERDUE',
        },
        {
            id: 5,
            label: 'Partner Credit Hold',
            value: 'PARTNER_CREDIT_HOLD',
        },
    ],
    budgetStatus: [
        {
            id: 1,
            label: 'Approved',
            value: 'APPROVED',
        },
        {
            id: 2,
            label: 'Pending',
            value: 'PENDING',
        },
        {
            id: 3,
            label: 'Not Allocated',
            value: 'NOT_ALLOCATED',
        },
        {
            id: 4,
            label: 'Flexible',
            value: 'FLEXIBLE',
        },
        {
            id: 5,
            label: 'Unknown',
            value: 'UNKNOWN',
        },
    ],
    businessType: [
        {
            id: 1,
            label: 'End Customer',
            value: 'END_CUSTOMER',
        },
        {
            id: 2,
            label: 'Reseller',
            value: 'RESELLER',
        },
        {
            id: 3,
            label: 'System Integrator',
            value: 'SYSTEM_INTEGRATOR',
        },
        {
            id: 4,
            label: 'Partner',
            value: 'PARTNER',
        },
        {
            id: 5,
            label: 'Distributor',
            value: 'DISTRIBUTOR',
        },
        {
            id: 6,
            label: 'Consultant',
            value: 'CONSULTANT',
        },
    ],
};
