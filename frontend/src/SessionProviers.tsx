'use client'

import React from 'react'
import { SessionProvider } from "next-auth/react"


const SessionProviers = ({children}:{children:React.ReactNode }) => {
  return (
    <SessionProvider>
        {children}
    </SessionProvider>
  )
}

export default SessionProviers

