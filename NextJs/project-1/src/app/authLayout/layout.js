import AuthNav from '@/components/AuthNav'
import React from 'react'

const layout = ({children}) => {
  return (
    <html
      lang="en"
      className={`h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-black text-white">
      <AuthNav/>
      {children}
      </body>
    </html>
  )
}

export default layout
