"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupportTicketsConfig = void 0;
exports.SupportTicketsConfig = {
    primaryKey: 'support_ticket_id',
    display_names: {
        support_ticket_id: 'Support Ticket ID',
        ticket_id: 'Ticket ID',
        name: 'Name',
        email: 'Email',
        subject: 'Subject',
        category: 'Category',
        priority: 'Priority',
        status: 'Status',
        created_at: 'Created At',
        updated_at: 'Updated At',
        description: 'Description',
        attachment: 'Attachment'
    },
    visible_columns: [
        'support_ticket_id',
        'name',
        'email',
        'subject',
        'category',
        'priority',
        'status',
        'created_at',
    ],
    searchable_columns: [
        'support_ticket_id',
        'name',
        'email',
        'subject',
        'category',
        'priority',
        'status',
    ],
    filterable_columns: [
        'status',
        'priority',
        'category',
    ],
    sortable_columns: [
        'created_at',
        'priority',
        'status',
    ],
    actionsEnabled: true,
};
