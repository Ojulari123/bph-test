import { createContext, useContext, useState } from 'react'
import Notification from '../components/Notification'

const NotificationContext = createContext()

export const useNotification = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotification must be used within NotificationProvider')
  }
  return context
}

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState(null)

  const showNotification = (type, title, message, duration = 5000) => {
    setNotification({ type, title, message, duration })
  }

  const showSuccess = (title, message, duration) => {
    showNotification('success', title, message, duration)
  }

  const showError = (title, message, duration) => {
    showNotification('error', title, message, duration)
  }

  const closeNotification = () => {
    setNotification(null)
  }

  return (
    <NotificationContext.Provider value={{ showSuccess, showError, showNotification }}>
      {children}
      {notification && (
        <Notification
          type={notification.type}
          title={notification.title}
          message={notification.message}
          duration={notification.duration}
          onClose={closeNotification}
        />
      )}
    </NotificationContext.Provider>
  )
}