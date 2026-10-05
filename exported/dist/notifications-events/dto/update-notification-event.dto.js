"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateNotificationEventDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_notification_event_dto_1 = require("./create-notification-event.dto");
class UpdateNotificationEventDto extends (0, swagger_1.PartialType)(create_notification_event_dto_1.CreateNotificationEventDto) {
}
exports.UpdateNotificationEventDto = UpdateNotificationEventDto;
