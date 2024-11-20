import { atom } from 'recoil';
import { TravelDetails } from '@/types/types';

export const paramState = atom({
	key: 'paramState', // unique ID (with respect to other atoms/selectors)
	default: "", // default value (aka initial value)
});

export const travelDetailsState = atom<TravelDetails>({
    key: 'travelDetailsState',
    default: {
        from: '',
        to: '',
        departDate: '',
        returnDate: '',
        travelers: 1
    }
});