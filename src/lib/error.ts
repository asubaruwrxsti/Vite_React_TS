export class TravelError extends Error {
    constructor(
        message: string,
        public code: string,
        public status?: number
    ) {
        super(message);
        this.name = 'TravelError';
    }
}

export const handleApiError = (error: unknown) => {
    if (error instanceof TravelError) {
        return { message: error.message, code: error.code };
    }
    return { message: 'An unexpected error occurred', code: 'UNKNOWN_ERROR' };
};