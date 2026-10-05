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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationController = void 0;
const common_1 = require("@nestjs/common");
const location_service_1 = require("./location.service");
let LocationController = class LocationController {
    constructor(locationService) {
        this.locationService = locationService;
    }
    getCountries() {
        return this.locationService.getCountries();
    }
    getStates(countryId) {
        return this.locationService.getStates(countryId);
    }
    getCities(stateId) {
        return this.locationService.getCities(stateId);
    }
    getPostalCodes(cityId) {
        return this.locationService.getPostalCodes(cityId);
    }
};
exports.LocationController = LocationController;
__decorate([
    (0, common_1.Get)('countries'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LocationController.prototype, "getCountries", null);
__decorate([
    (0, common_1.Get)('states'),
    __param(0, (0, common_1.Query)('countryId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], LocationController.prototype, "getStates", null);
__decorate([
    (0, common_1.Get)('cities'),
    __param(0, (0, common_1.Query)('stateId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], LocationController.prototype, "getCities", null);
__decorate([
    (0, common_1.Get)('postal-codes'),
    __param(0, (0, common_1.Query)('cityId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], LocationController.prototype, "getPostalCodes", null);
exports.LocationController = LocationController = __decorate([
    (0, common_1.Controller)('location'),
    __metadata("design:paramtypes", [location_service_1.LocationService])
], LocationController);
