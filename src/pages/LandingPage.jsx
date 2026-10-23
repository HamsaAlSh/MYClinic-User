import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import ContactSection from '../components/ContactSection';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] font-sans selection:bg-[#D4AF37] selection:text-[#041a14]">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ContactSection />
    </div>
  );
}