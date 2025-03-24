import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export const metadata = {
  title: 'About',
};

export default function About() {
  return (
    <>
      <Header />

      <div className="py-20 text-center">About</div>
      
      <Footer />
    </>
  )
}