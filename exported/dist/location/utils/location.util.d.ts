export declare class LocationUtil {
    static getCityName(cityId?: string | number): string | null;
    static getStateName(stateId?: string | number): string | null;
    static getCountryName(countryId?: string | number): string | null;
    static getLocationDetails(org: any): {
        city_name: string;
        state_name: string;
        country_name: string;
        postal_code: any;
    };
}
