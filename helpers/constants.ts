export const queryClientOptions = {
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false
        }
    }
}

export function formatDate(date: any): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-based, so we add 1.
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}
