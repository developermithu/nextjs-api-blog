'use client'

import { useAuth } from '@/hooks/auth'
import Navigation from './_components/Navigation'
import Loading from './_components/Loading'
import { Toaster } from '@/components/ui/sonner'

const AppLayout = ({ children }) => {
    const { user } = useAuth({ middleware: 'auth' })

    if (!user) {
        return <Loading />
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <Navigation user={user} />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</main>

            <Toaster richColors theme="light" />
        </div>
    )
}

export default AppLayout
