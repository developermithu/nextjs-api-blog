import { Inter } from 'next/font/google';
import './styles/app.css';
import { metadata } from './metadata';
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ subsets: ['latin'] });

// Page Metadata for SEO
export { metadata };

export default function RootLayout({ children }) {
    return (
        <html lang="en" className={inter.className}>
            <body className="antialiased">
                {children}
                
                <Analytics />
            </body>
        </html>
    )
}
