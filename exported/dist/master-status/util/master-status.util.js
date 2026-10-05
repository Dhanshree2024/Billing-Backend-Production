"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MasterStatusUtil = void 0;
const master_status_config_1 = require("../config/master-status.config");
class MasterStatusUtil {
    static get(type) {
        return master_status_config_1.MASTER_STATUS[type] ?? [];
    }
    static getById(type, id) {
        return master_status_config_1.MASTER_STATUS[type]?.find((item) => item.id === id);
    }
    static getByValue(type, value) {
        return master_status_config_1.MASTER_STATUS[type]?.find((item) => item.value === value);
    }
    static getByLabel(type, label) {
        return master_status_config_1.MASTER_STATUS[type]?.find((item) => item.label === label);
    }
    static isValidId(type, id) {
        return master_status_config_1.MASTER_STATUS[type]?.some((item) => item.id === id);
    }
    static isValidValue(type, value) {
        return master_status_config_1.MASTER_STATUS[type]?.some((item) => item.value === value);
    }
    static getLabels(type) {
        return master_status_config_1.MASTER_STATUS[type]?.map((item) => item.label);
    }
    static getValues(type) {
        return master_status_config_1.MASTER_STATUS[type]?.map((item) => item.value);
    }
    static getIds(type) {
        return master_status_config_1.MASTER_STATUS[type]?.map((item) => item.id);
    }
    static getIdByValue(type, value) {
        return master_status_config_1.MASTER_STATUS[type]?.find((item) => item.value === value)?.id;
    }
    static getLabelByValue(type, value) {
        return master_status_config_1.MASTER_STATUS[type]?.find((item) => item.value === value)?.label;
    }
    static getValueById(type, id) {
        return master_status_config_1.MASTER_STATUS[type]?.find((item) => item.id === id)?.value;
    }
}
exports.MasterStatusUtil = MasterStatusUtil;
