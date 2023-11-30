import { atom } from 'recoil';

export const paramState = atom({
	key: 'paramState', // unique ID (with respect to other atoms/selectors)
	default: "", // default value (aka initial value)
});