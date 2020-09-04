import axios, { CancelToken } from 'axios';
import { useCallback, useState } from 'react';

const URL = 'https://rickandmortyapi.com/api/character/?name=';

let tokenSource: {
    cancel: (message: string) => any;
    token: CancelToken;
};

export const useHttps = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<null | {data: {error: string}}>(null);
    const [cancelPrevQuery, setCancelPrevQuery] = useState(false);

    const request = useCallback(async (keyword) => {
        setIsLoading(true);

        try {
            if (tokenSource !== undefined) {
                tokenSource.cancel!('Operation canceled due to new request!');
            }
            // save the new request for cancellation
            tokenSource = axios.CancelToken.source();

            const { data } = await axios.get(`${URL}${keyword}`, {
                cancelToken: tokenSource.token
            });

            setIsLoading(false);
            return data.results;

        } catch (error) {
            if (axios.isCancel(error)) { return setCancelPrevQuery(true); }
            setIsLoading(false);
            setError(error.response);
        }

    }, []);

    const clearError = useCallback(() => setError(null), []);

    return { isLoading, request, error, clearError, cancelPrevQuery };
};
