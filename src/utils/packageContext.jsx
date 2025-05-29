import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const PackagesContext = createContext();

const apiUrl = process.env.REACT_APP_API_URL;

export function PackagesProvider({ children }) {
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchPackages() {
            try {
                const response = await axios.get(`${apiUrl}/packages`);
                setPackages(response.data);
            } catch (err) {
                console.error("Error fetching packages:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchPackages();
    }, []);

    return (
        <PackagesContext.Provider value={{ packages, loading }}>
            {children}
        </PackagesContext.Provider>
    );
}

export function usePackages() {
    return useContext(PackagesContext);
}
