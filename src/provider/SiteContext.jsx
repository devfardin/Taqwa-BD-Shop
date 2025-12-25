import React, { useEffect, useState } from 'react'
import { createContext } from 'react'

export const providerContext = createContext(null);

const SiteContext = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [siteData, setSiteData] = useState([]);
    useEffect(() => {
        setLoading(true);
        fetch(`${import.meta.env.VITE_BASEURL_URL}/wp-react-connect/v1/store-settings`)
            .then(res => res.json())
            .then(data => {
                setSiteData(data);
                setLoading(false);
            })
    }, []);

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