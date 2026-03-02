import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import AppPreview from "@/components/AppPreview";
import CTAStrip from "@/components/CTAStrip";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0d0d14] overflow-x-hidden">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <AppPreview />
      <CTAStrip />
      <Footer />
    </main>
  );
}
