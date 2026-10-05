"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationChannel = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const notification_template_entity_1 = require("./notification-template.entity");
const notification_setting_entity_1 = require("./notification-setting.entity");
let NotificationChannel = class NotificationChannel {
};
exports.NotificationChannel = NotificationChannel;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], NotificationChannel.prototype, "notification_channel_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Email' }),
    (0, typeorm_1.Column)({ type: 'varchar', length: 50 }),
    __metadata("design:type", String)
], NotificationChannel.prototype, "notification_channel_name", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => notification_template_entity_1.NotificationTemplate, (template) => template.channel),
    __metadata("design:type", Array)
], NotificationChannel.prototype, "templates", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => notification_setting_entity_1.NotificationSettings, (setting) => setting.channel),
    __metadata("design:type", Array)
], NotificationChannel.prototype, "notification_settings", void 0);
exports.NotificationChannel = NotificationChannel = __decorate([
    (0, typeorm_1.Entity)('notification_channels', { schema: 'public' })
], NotificationChannel);
