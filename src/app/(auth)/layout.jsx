import AppLogo from "@/components/AppLogo";
import { Header } from "@/components/Header";

export const metadata = {
    title: {
        template: '%s - Minimalist Blog',
        default: 'Authentication - Minimalist Blog',
    },
    description: 'Secure authentication portal for Minimalist Blog platform',
}

export default function AuthLayout({ children }) {
    return (
        <>
            <Header />

            <div className="flex h-[90vh] flex-col items-center py-10 lg:py-16 sm:py-5 bg-gray-100">
                <div>
                    <AppLogo className="w-20 h-20 fill-current text-gray-500" />
                </div>

                <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                    {children}
                </div>
            </div>
        </>
    )
}