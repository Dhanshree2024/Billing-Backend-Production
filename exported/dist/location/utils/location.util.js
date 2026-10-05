"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationUtil = void 0;
const city_config_1 = require("../config/city.config");
const country_config_1 = require("../config/country.config");
const state_config_1 = require("../config/state.config");
const cityMap = new Map(city_config_1.CITIES.map((city) => [Number(city.id), city.name]));
const stateMap = new Map(state_config_1.STATES.map((state) => [Number(state.id), state.name]));
const countryMap = new Map(country_config_1.COUNTRIES.map((country) => [Number(country.id), country.name]));
class LocationUtil {
    static getCityName(cityId) {
        if (!cityId)
            return null;
        return cityMap.get(Number(cityId)) ?? null;
    }
    static getStateName(stateId) {
        if (!stateId)
            return null;
        return stateMap.get(Number(stateId)) ?? null;
    }
    static getCountryName(countryId) {
        if (!countryId)
            return null;
        return countryMap.get(Number(countryId)) ?? null;
    }
    static getLocationDetails(org) {
        return {
            city_name: this.getCityName(org.city),
            state_name: this.getStateName(org.state),
            country_name: this.getCountryName(org.country),
            postal_code: org.postal_code,
        };
    }
}
exports.LocationUtil = LocationUtil;
