import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Inter } from 'next/font/google';
import './styles/app.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: 'Minimalist Blog',
    description: 'A clean and modern blog built with Next.js and Tailwind CSS',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={`${inter.className}`}>
                <div className="relative flex min-h-screen flex-col">
                    <Header />
                    <main className="container mx-auto flex-1 px-4 sm:px-6 lg:px-8">{children}</main>
                    <Footer />
                </div>
            </body>
        </html>
    );
}
