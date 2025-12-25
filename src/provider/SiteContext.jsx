import React, { useEffect, useState } from 'react'
import { createContext } from 'react'

export const providerContext = createContext(null);

const SiteContext = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [siteData, setSiteData] = useState([]);
    
  const baseURL = import.meta.env.VITE_BASEURL_URL;
  

    useEffect(() => {
        const fetchData = async () => {
            if(!baseURL) return;
            try {
                setLoading(true);
                const res = await fetch(
                    `${baseURL}/wp-react-connect/v1/store-settings`
                );
                const data = await res.json();
                setSiteData(data);
            } catch (error) {
                console.error("Failed to fetch site settings", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [baseURL]);

    const sideInfo = { siteData, loading };
    return (
        <providerContext.Provider value={sideInfo}>
            {
                children
            }
        </providerContext.Provider>
    )
}
export default SiteContext;