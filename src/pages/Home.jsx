import React from 'react';
import HeroSection from '../components/home/HeroSection';
import ClinicCarouselSection from '../components/home/ClinicCarouselSection';
import FeaturedServicesSection from '../components/home/FeaturedServicesSection';
import WhyChooseUsSection from '../components/home/WhyChooseUsSection';
import CallToActionSection from '../components/home/CallToActionSection';

function Home() {
  return (
    <div className="bg-[var(--color-background-light)] min-h-screen text-[var(--color-text-dark)] font-inter">
      <HeroSection />
      <ClinicCarouselSection />
      <FeaturedServicesSection />
      <WhyChooseUsSection />
      <CallToActionSection />
    </div>
  );
}

export default Home;
