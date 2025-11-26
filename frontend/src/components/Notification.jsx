import { useEffect, useState } from 'react'
import checkmarkIcon from '../assets/icons/checkmark.svg'
import cancelIcon from '../assets/icons/cancelicon.svg'

const Notification = ({ type, title, message, onClose, duration = 5000 }) => {
  const [isClosing, setIsClosing] = useState(false)

  useEffect(() => {
    if (duration) {
      const timer = setTimeout(() => {
        handleClose()
      }, duration)

      return () => clearTimeout(timer)
    }
  }, [duration])

  const handleClose = () => {
    setIsClosing(true)
    // Wait for animation to complete before actually closing
    setTimeout(() => {
      onClose()
    }, 300) // Match animation duration
  }

  const config = {
    success: {
      icon: checkmarkIcon,
      textColor: 'text-[#0A1E3C]'
    },
    error: {
      icon: cancelIcon,
      textColor: 'text-[#0A1E3C]'
    }
  }

  const currentConfig = config[type] || config.success

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 flex justify-center pt-8 px-4 ${isClosing ? 'animate-slideUpFadeOut' : 'animate-slideDownFadeIn'}`}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden">
        {/* Main Content */}
        <div className="py-6 px-8 text-center">
          {/* Icon */}
          <div className="flex justify-center mb-4">
            <div className={`${currentConfig.iconBg} rounded-full p-3 w-16 h-16 flex items-center justify-center`}>
              <img 
                src={currentConfig.icon} 
                alt={type} 
                className="w-8 h-8"
              />
            </div>
          </div>

          {/* Title */}
          <h2 className={`text-xl font-bold ${currentConfig.textColor} mb-2`}>
            {title}
          </h2>

          {/* Message */}
          <p className="text-gray-600 text-sm">
            {message}
          </p>
        </div>

        {/* Footer with Close Button */}
        <div className="bg-[#0A1E3C] px-8 py-3 flex justify-end">
          <button
            onClick={handleClose}
            className="text-white text-sm font-medium hover:text-gray-300 transition-colors"
          >
            close
          </button>
        </div>
      </div>
    </div>
  )
}

export default Notification