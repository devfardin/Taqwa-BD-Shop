import { Outlet } from 'react-router-dom'
import Navbar from '../components/Shared/Navbar/Navbar'
import Footer from '../components/Shared/Footer/Footer'
import { useEffect, useState } from 'react'
import { initFacebookPixel } from '../facebookPixel'
import CTAButton from '../components/Shared/CTAButton'
import Loader from '../components/Shared/Loader'
const Main = () => {
  const [siteData, setSiteData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetch(`${import.meta.env.VITE_BASEURL_URL}/wp-react-connect/v1/store-settings`)
      .then(res => res.json())
      .then(data => {
        setSiteData(data);
        setLoading(false);
      })
  }, [] )

  // useEffect(() => {
  //   initFacebookPixel();
  // }, []);
  
  if(loading) return (
    <div className='min-h-screen flex items-center justify-center'>
      <span className='text-xl font-bold text-primary'> {import.meta.env.VITE_SHOP_NAME}</span>
       {/* <Loader/> */}
    </div>
    //
  )  
  return (
    <div>
      <Navbar siteData={siteData} />
      <div className='py-8 min-h-[calc(100vh-68px)] bg-bodycolor'>
        <Outlet />
      </div>
       <CTAButton siteData={siteData}/>
      <Footer />
    </div>
  )
}

export default Main
