'use client'

import { useAuth } from '@/hooks/auth'
import Navigation from './_components/Navigation'
import { Toaster } from '@/components/ui/sonner'
import { redirect } from 'next/navigation'

const AppLayout = ({ children }) => {
    const { user, isAdmin } = useAuth({ middleware: 'auth' })

    if (!user) {
        redirect('/login')
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <Navigation user={user} isAdmin={isAdmin} />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</main>

            <Toaster richColors theme="light" />
        </div>
    )
}

export default AppLayout
