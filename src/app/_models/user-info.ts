export class User {
    id?: string;
    username?: string;
    country?: string;
}

export interface ApiResponse {
    data: any[];
    error: boolean;
    msg: string;
}

export interface Country {
    id: string;
    name: string;
    population: string;
    land_area: string;
    density: string;
    capital: string;
    currency: string;
}

export interface CountryResponse extends ApiResponse {
    data: Country[];
}