export interface ListViewDto {
    primaryKey: string;
    display_names: Record<string, string>;
    page_redirect?: Record<string, string> | string | null;
    [key: string]: any;
}
