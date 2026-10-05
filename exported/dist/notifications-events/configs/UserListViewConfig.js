"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserListViewConfig = void 0;
exports.UserListViewConfig = {
    primaryKey: 'user_id',
    display_names: {
        user_id: 'User ID',
        first_name: 'First Name',
        last_name: 'Last Name',
        users_business_email: 'Business Email',
        phone_number: 'Phone Number',
        redirection_link: 'Link',
        temp_password: 'Temporary Password',
        otp: 'OTP',
        username: 'User Name',
    },
    defaultSortField: 'created_at',
    defaultSortOrder: 'desc',
    actionsEnabled: true,
};
