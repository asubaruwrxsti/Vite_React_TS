import { Destination } from "@/types/types";

export class TravelService {
    static async getDestinations(): Promise<Destination[]> {
        return [
            { name: 'Paris', country: 'France' },
            { name: 'Tokyo', country: 'Japan' }
        ];
    }
}