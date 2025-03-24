import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export const metadata = {
    title: '%s - Minimalist Blog',
    description: 'Learn more about the Minimalist Blog project.',
};

export default function MainLayout({ children }) {
    return (
        <>
            {children}
        </>
    )
}