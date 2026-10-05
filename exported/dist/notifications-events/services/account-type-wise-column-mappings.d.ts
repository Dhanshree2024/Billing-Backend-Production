import { AccountTypesEnum } from '../enums/enums';
import { PayloadSchema, AccountWiseDisplayMap } from '../list-view-registry/list-view-registry';
export declare class NotificationPayloadSchemaService {
    getPayloadSchema(accountType: AccountTypesEnum): PayloadSchema;
    getPayloadSchemaForMultiple(accountTypes: AccountTypesEnum[]): AccountWiseDisplayMap;
}
