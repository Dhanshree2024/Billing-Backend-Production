"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationService = void 0;
const common_1 = require("@nestjs/common");
const city_config_1 = require("./config/city.config");
const country_config_1 = require("./config/country.config");
const postal_code_config_1 = require("./config/postal-code.config");
const state_config_1 = require("./config/state.config");
let LocationService = class LocationService {
    getCountries() {
        return country_config_1.COUNTRIES;
    }
    getStates(countryId) {
        if (countryId) {
            return state_config_1.STATES.filter((state) => state.countryId === Number(countryId));
        }
        return state_config_1.STATES;
    }
    getCities(stateId) {
        if (stateId) {
            return city_config_1.CITIES.filter((city) => city.stateId === Number(stateId));
        }
        return city_config_1.CITIES;
    }
    getPostalCodes(cityId) {
        if (cityId) {
            return postal_code_config_1.POSTAL_CODES.filter((pin) => pin.cityId === Number(cityId));
        }
        return postal_code_config_1.POSTAL_CODES;
    }
};
exports.LocationService = LocationService;
exports.LocationService = LocationService = __decorate([
    (0, common_1.Injectable)()
], LocationService);
