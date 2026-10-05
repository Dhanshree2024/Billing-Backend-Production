import { AccountTypesEnum } from '../enums/enums';
export declare const LIST_VIEW_REGISTRY: Record<string, Partial<NotificationListViewConfig> & Record<string, any>>;
export declare const ACCOUNT_TYPE_LISTVIEW_MAP: Record<AccountTypesEnum, keyof typeof LIST_VIEW_REGISTRY>;
type DisplayNameMap = Record<string, string>;
type PageRedirectMap = Record<string, string>;
export interface PayloadSchema {
    display_names: DisplayNameMap;
    page_redirect?: PageRedirectMap | string | null;
}
export type AccountWiseDisplayMap = Record<AccountTypesEnum, PayloadSchema>;
export interface NotificationListViewConfig {
    display_names: Record<string, string>;
    page_redirect?: Record<string, string> | string | null;
}
export {};
