import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocale } from '../localization/LocaleProvider';
import LocaleToggle from './LocaleToggle';
import logo from '../assets/MYClinicLogo.jpg';
import { LogIn, Menu, X } from 'lucide-react';

export default function Navbar() {
  const { tr } = useLocale();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigation = (id) => {
    setMobileMenu(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        
        {/* Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
          <img src={logo} alt="Logo" className="w-10 h-10 rounded-xl object-contain" />
          <span className="font-serif text-xl font-bold text-[#0B3B2D] tracking-wider hidden sm:block">
            {tr('appName')}
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <button onClick={() => handleNavigation('home')} className="text-sm font-semibold text-gray-700 hover:text-[#0B3B2D] transition">{tr('home')}</button>
          <button onClick={() => handleNavigation('about')} className="text-sm font-semibold text-gray-700 hover:text-[#0B3B2D] transition">{tr('about')}</button>
          <button onClick={() => handleNavigation('contact')} className="text-sm font-semibold text-gray-700 hover:text-[#0B3B2D] transition">{tr('contact')}</button>
          
          <div className="flex items-center gap-4 border-r border-gray-300 pr-6 ml-2">
            <LocaleToggle />
            <button onClick={() => navigate('/login')} className="flex items-center gap-2 bg-[#0B3B2D] text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-[#135c47] transition shadow-lg shadow-[#0B3B2D]/20">
              <LogIn className="w-4 h-4" />
              {tr('login')}
            </button>
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-4">
          <LocaleToggle />
          <button onClick={() => setMobileMenu(!mobileMenu)}>
            {mobileMenu ? <X className="w-6 h-6 text-[#0B3B2D]" /> : <Menu className="w-6 h-6 text-[#0B3B2D]" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenu && (
        <div className="md:hidden bg-white border-t border-gray-100 mt-3 px-6 py-4 flex flex-col gap-4 shadow-xl">
          <button onClick={() => handleNavigation('home')} className="text-right font-semibold text-gray-700">{tr('home')}</button>
          <button onClick={() => handleNavigation('about')} className="text-right font-semibold text-gray-700">{tr('about')}</button>
          <button onClick={() => handleNavigation('contact')} className="text-right font-semibold text-gray-700">{tr('contact')}</button>
          <button onClick={() => navigate('/login')} className="bg-[#0B3B2D] text-white py-3 rounded-xl font-bold mt-2">
            {tr('login')}
          </button>
        </div>
      )}
    </nav>
  );
}