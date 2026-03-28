import LenisScroll from "@/components/shared/lenis-scroll";
import { Montserrat } from "next/font/google";
import LandingHeader from "@/components/landing-page/landing-header";
import HeroSection from "@/components/landing-page/hero-section";
import DestinationsSection from "@/components/landing-page/destinations-section";
import ExperiencesSection from "@/components/landing-page/experiences-section";
import CommunitySection from "@/components/landing-page/community-section";
import FeaturesBentoSection from "@/components/landing-page/features-bento-section";
import TestimonialsSection from "@/components/landing-page/testimonials-section";
import NewsletterSection from "@/components/landing-page/newsletter-section";
import FooterSection from "@/components/landing-page/footer-section";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
});

export default function Home() {
  return (
    <LenisScroll>
      <div
        className={`scrollbar-custom landing-root min-h-screen bg-[var(--landing-bg)] ${montserrat.className}`}
      >
        <LandingHeader />
        <HeroSection />
        <DestinationsSection />
        <ExperiencesSection />
        <CommunitySection />
        <FeaturesBentoSection />
        <TestimonialsSection />
        <NewsletterSection />
        <FooterSection />
      </div>
    </LenisScroll>
  );
}
