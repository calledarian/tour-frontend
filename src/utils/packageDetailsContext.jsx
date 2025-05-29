import { createContext, useContext, useState } from "react";
import axios from "axios";

const PackageDetailsContext = createContext();

const apiUrl = process.env.REACT_APP_API_URL;

export function PackageDetailsProvider({ children }) {

    const [cache, setCache] = useState({});

    async function fetchPackageById(id) {
        if (cache[id]) {
            return cache[id];
        }
        const res = await axios.get(`${apiUrl}/packages/${id}`);
        setCache(prev => ({ ...prev, [id]: res.data }));
        return res.data;
    }

    return (
        <PackageDetailsContext.Provider value={{ cache, fetchPackageById }}>
            {children}
        </PackageDetailsContext.Provider>
    );
}

export function usePackageDetails() {
    return useContext(PackageDetailsContext);
}
