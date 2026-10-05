"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateResellerDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_reseller_dto_1 = require("./create-reseller.dto");
class UpdateResellerDto extends (0, mapped_types_1.PartialType)(create_reseller_dto_1.CreateResellerDto) {
}
exports.UpdateResellerDto = UpdateResellerDto;
