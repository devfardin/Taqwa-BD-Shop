import { FaWhatsapp } from 'react-icons/fa'

const CTAButton = ({siteData}) => {

  if(!siteData.length == 0) {
    return 
  }

  return (
    <div className="fixed md:bottom-2 bottom-2left-4 right-4 z-50 md:left-1/2 md:right-auto md:transform md:-translate-x-1/2">
      <div className="bg-white shadow-xl rounded-lg p-4 flex items-center justify-between md:gap-5 gap-2 border  border-gray-200">
        {/* Left Side - Logo and Shop Info */}
        <div className="flex items-center space-x-3">
          <div className="w-14 h-14 rounded-full flex items-center justify-center border border-primary p-2" >
            
              <img className="w-10 h-10 object-cover" src={siteData.site_logo} alt={siteData.site_title} />
            
          </div>
          <div>
            <h3 className="font-semibold lg:text-xl text-gray-800"> {siteData.site_title} </h3>
            <a href={`tel:${siteData.shop_phone}`} className="md:text-lg text-gray-600 hover:text-primary transition-all duration-300"> {siteData.shop_phone} </a>
          </div>
        </div>

        {/* Right Side - WhatsApp Button */}
        <a target="_blank" href={siteData.whatsapp_number}
          // onClick={handleWhatsAppClick}
          className="bg-green-700 hover:bg-green-800 text-white md:px-4 px-3 py-2 rounded-xl flex items-center space-x-2 transition-colors shadow-md"
        >
          <FaWhatsapp size={20} />
          <span className="font-medium md:text-xl">WhatsApp</span>
        </a>
      </div>
    </div>
  )
}

export default CTAButton
