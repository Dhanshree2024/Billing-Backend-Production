"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationPayloadSchemaService = void 0;
const common_1 = require("@nestjs/common");
const list_view_registry_1 = require("../list-view-registry/list-view-registry");
let NotificationPayloadSchemaService = class NotificationPayloadSchemaService {
    getPayloadSchema(accountType) {
        const registryKey = list_view_registry_1.ACCOUNT_TYPE_LISTVIEW_MAP[accountType];
        if (!registryKey) {
            throw new Error(`No list-view mapping found for ${accountType}`);
        }
        const config = list_view_registry_1.LIST_VIEW_REGISTRY[registryKey];
        if (!config?.display_names) {
            throw new Error(`display_names missing for ${registryKey}`);
        }
        return {
            display_names: config.display_names,
            page_redirect: config.page_redirect ?? null,
        };
    }
    getPayloadSchemaForMultiple(accountTypes) {
        const result = {};
        for (const accountType of accountTypes) {
            result[accountType] = this.getPayloadSchema(accountType);
        }
        return result;
    }
};
exports.NotificationPayloadSchemaService = NotificationPayloadSchemaService;
exports.NotificationPayloadSchemaService = NotificationPayloadSchemaService = __decorate([
    (0, common_1.Injectable)()
], NotificationPayloadSchemaService);
