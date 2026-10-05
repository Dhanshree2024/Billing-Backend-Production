export declare class LocationService {
    getCountries(): {
        id: number;
        code: string;
        name: string;
    }[];
    getStates(countryId?: number): {
        id: number;
        countryId: number;
        name: string;
    }[];
    getCities(stateId?: number): {
        id: number;
        stateId: number;
        name: string;
    }[];
    getPostalCodes(cityId?: number): {
        cityId: number;
        postalCode: string;
        area: string;
    }[];
}
