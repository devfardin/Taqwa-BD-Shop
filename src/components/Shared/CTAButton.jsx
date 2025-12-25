import { FaWhatsapp } from 'react-icons/fa'

const CTAButton = () => {
  const handleWhatsAppClick = () => {
    window.open('https://wa.me/1234567890', '_blank')
  }

  return (
    <div className="fixed bottom-3 left-4 right-4 z-50 md:left-1/2 md:right-auto md:transform md:-translate-x-1/2 md:w-96">
      <div className="bg-white shadow-xl rounded-lg p-4 flex items-center justify-between border border-gray-200">
        {/* Left Side - Logo and Shop Info */}
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">T</span>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">Taqwa BD Shop</h3>
            <p className="text-sm text-gray-600">+880 1234-567890</p>
          </div>
        </div>

        {/* Right Side - WhatsApp Button */}
        <button
          onClick={handleWhatsAppClick}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full flex items-center space-x-2 transition-colors shadow-md"
        >
          <FaWhatsapp size={20} />
          <span className="font-medium">WhatsApp</span>
        </button>
      </div>
    </div>
  )
}

export default CTAButton
