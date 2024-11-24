import PocketBase from 'pocketbase';

const POCKETBASE_URL = import.meta.env.VITE_POCKETBASE_URL;

if (!POCKETBASE_URL) {
    throw new Error('VITE_POCKETBASE_URL environment variable is not defined');
}

let instance: PocketBase | null = null;

export const getPocketBase = (): PocketBase => {
    if (!instance) {
        instance = new PocketBase(POCKETBASE_URL);
    }
    return instance;
};