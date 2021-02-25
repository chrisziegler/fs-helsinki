import React from 'react'

export const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  return <div className="error fade-out">{message}</div>
}
