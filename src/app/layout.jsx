import { Inter } from 'next/font/google';
import './styles/app.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: 'Minimalist Blog - Next.js, and Laravel Rest API',
    description: 'A clean and modern blog built with Next.js, Laravel, and Tailwind CSS',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" className={inter.className}>
            <body className="antialiased">{children}</body>
        </html>
    )
}
