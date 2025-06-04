import { useState, useEffect } from "react";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

export const usePackages = () => {
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchPackages() {
            try {
                const response = await axios.get(`${apiUrl}/packages`, {
                    withCredentials: true,
                });
                setPackages(response.data);
                setLoading(false);
            } catch (err) {
                setError("Failed to load packages.");
                setLoading(false);
            }
        }
        fetchPackages();
    }, []);

    const deletePackage = async (id) => {
        if (!window.confirm("Are you sure you want to delete this package?")) return;
        try {
            await axios.delete(`${apiUrl}/packages/${id}`, {
                withCredentials: true,
            });
            setPackages((prev) => prev.filter((pkg) => pkg.id !== id));
        } catch (err) {
            alert("Failed to delete package.");
        }
    };

    const updatePackage = async (id, updatedData) => {
        try {
            await axios.put(`${apiUrl}/packages/${id}`, updatedData, {
                withCredentials: true,
            });
            setPackages((prev) =>
                prev.map((pkg) => (pkg.id === id ? { ...pkg, ...updatedData } : pkg))
            );
        } catch (err) {
            alert("Failed to update package.");
            throw err;
        }
    };

    const addPackage = (newPackage) => {
        setPackages((prev) => [...prev, newPackage]);
    };

    return {
        packages,
        loading,
        error,
        deletePackage,
        updatePackage,
        addPackage,
    };
};
