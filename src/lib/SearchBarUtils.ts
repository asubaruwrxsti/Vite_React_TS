import { Destination } from "@/types/types";

// Filter the destinations based on the input value
export const filterDestinations = (inputValue: string, destinations: Destination[]) => {
    const inputValueLowerCase = inputValue.toLowerCase();
    return destinations.filter(
        (destination) => destination.name.toLowerCase().includes(inputValueLowerCase)
    );
};