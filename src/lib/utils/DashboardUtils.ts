export function calculateNextPayment(createdDate: string, interval: string): string {
    const date = new Date(createdDate);
    let nextPayment: Date;

    if (interval === "month") {
        nextPayment = new Date(date.setMonth(date.getMonth() + 1));
    } else if (interval === "year") {
        nextPayment = new Date(date.setFullYear(date.getFullYear() + 1));
    } else {
        throw new Error(`Invalid interval: ${interval}`);
    }

    return nextPayment.toISOString();
}