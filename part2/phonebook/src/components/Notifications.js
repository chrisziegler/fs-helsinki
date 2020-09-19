import React from 'react'

export default ({ errorMessage, successMessage }) => {
  return (
    <div className="notifications-wrapper">
      {successMessage && (
        <div className="notification-success">{successMessage}</div>
      )}
      {errorMessage && (
        <div className="notification-error">{errorMessage}</div>
      )}
    </div>
  )
}
