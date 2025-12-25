import { useContext } from 'react'
import { providerContext } from '../provider/SiteContext'

const UseInfo = () => {
    const context = useContext(providerContext);
    if (!context) {
    throw new Error("UseInfo must be used inside SiteContext");
  }
    return context;
}

export default UseInfo
