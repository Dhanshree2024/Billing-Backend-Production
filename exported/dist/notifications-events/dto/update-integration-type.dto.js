"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateIntegrationTypeDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_integration_type_dto_1 = require("./create-integration-type.dto");
class UpdateIntegrationTypeDto extends (0, swagger_1.PartialType)(create_integration_type_dto_1.CreateIntegrationTypeDto) {
}
exports.UpdateIntegrationTypeDto = UpdateIntegrationTypeDto;
