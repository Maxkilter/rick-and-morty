import { useState, useCallback } from 'react';

export const useHttps = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<null | number| string>(null);

    const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        setIsLoading(true);
        try {
            if (body) {
                // tslint:disable-next-line:no-parameter-reassignment
                body = JSON.stringify(body);
                headers['Content-Type'] = 'application/json';
            }

            const response = await fetch(url, { method, body, headers });
            const data = await response.json();

            if (response.status === 404) {
                setIsLoading(false);
                return setError(response.status);
            }

            setIsLoading(false);

            return data;
        } catch (e) {
            setIsLoading(false);
            setError(e.message);
            throw e;
        }
    }, []);

    const clearError = useCallback(() => setError(null), []);

    return { isLoading, request, error, clearError };
};
