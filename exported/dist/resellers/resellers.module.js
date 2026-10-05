"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResellersModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const export_module_1 = require("../common/export/export.module");
const reseller_entity_1 = require("./entity/reseller.entity");
const resellers_controller_1 = require("./resellers.controller");
const resellers_service_1 = require("./resellers.service");
let ResellersModule = class ResellersModule {
};
exports.ResellersModule = ResellersModule;
exports.ResellersModule = ResellersModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([reseller_entity_1.Reseller]), export_module_1.ExportModule],
        controllers: [resellers_controller_1.ResellersController],
        providers: [resellers_service_1.ResellersService],
    })
], ResellersModule);
