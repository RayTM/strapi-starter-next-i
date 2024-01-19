export const fetchData = <T>(url: string, options?: RequestInit): Promise<T> => {
    return fetch(url, options)
        .then(res => {
            if (!res.ok) {
                throw new Error(res.statusText);
            }
            return res.json();
        });
}
