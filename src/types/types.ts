export interface Destination {
    name: string;
    code?: string;
    country?: string;
}

export type TravelDetails = {
    from: string;
    to: string;
    departDate: string;
    returnDate: string;
    travelers: number;
};