import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export const metadata = {
    title: 'About - Minimalist Blog',
    description: 'Learn more about the Minimalist Blog project.',
};

export default function MainLayout({ children }) {
    return (
        <div>
            <Header />
            {children}
            <Footer />
        </div>
    )
}