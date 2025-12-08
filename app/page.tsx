import LenisScroll from "@/components/shared/lenis-scroll";
import HeroSection from "@/components/landing-page/hero-section";
import PlanTripSection from "@/components/landing-page/features-section";
import DestinationsSection from "@/components/landing-page/destinations-section";
import StatsSection from "@/components/landing-page/stats-section";
import TestimonialsSection from "@/components/landing-page/testimonials-section";
import NewsletterSection from "@/components/landing-page/newsletter-section";
import FooterSection from "@/components/landing-page/footer-section";

export default function Home() {
  return (
    <LenisScroll>
      <div className="min-h-screen bg-white">
        <HeroSection />
        <PlanTripSection />
        <DestinationsSection />
        <StatsSection />
        <NewsletterSection />
        <FooterSection />
      </div>
    </LenisScroll>
  );
}
