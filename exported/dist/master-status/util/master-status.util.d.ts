import { MASTER_STATUS } from '../config/master-status.config';
export declare class MasterStatusUtil {
    static get(type: keyof typeof MASTER_STATUS): {
        id: number;
        label: string;
        value: string;
    }[];
    static getById(type: keyof typeof MASTER_STATUS, id: number): {
        id: number;
        label: string;
        value: string;
    };
    static getByValue(type: keyof typeof MASTER_STATUS, value: string): {
        id: number;
        label: string;
        value: string;
    };
    static getByLabel(type: keyof typeof MASTER_STATUS, label: string): {
        id: number;
        label: string;
        value: string;
    };
    static isValidId(type: keyof typeof MASTER_STATUS, id: number): boolean;
    static isValidValue(type: keyof typeof MASTER_STATUS, value: string): boolean;
    static getLabels(type: keyof typeof MASTER_STATUS): any[];
    static getValues(type: keyof typeof MASTER_STATUS): any[];
    static getIds(type: keyof typeof MASTER_STATUS): any[];
    static getIdByValue(type: keyof typeof MASTER_STATUS, value: string): number;
    static getLabelByValue(type: keyof typeof MASTER_STATUS, value: string): string;
    static getValueById(type: keyof typeof MASTER_STATUS, id: number): string;
}
