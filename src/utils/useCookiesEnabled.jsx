import { useEffect, useState } from 'react';

export function useCookiesEnabled() {
    const [cookiesEnabled, setCookiesEnabled] = useState(true);

    useEffect(() => {
        try {
            document.cookie = 'cookietest=1';
            const isEnabled = document.cookie.indexOf('cookietest=') !== -1;
            document.cookie = 'cookietest=1; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
            setCookiesEnabled(isEnabled);
        } catch {
            setCookiesEnabled(false);
        }
    }, []);

    return cookiesEnabled;
}
