import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { ViewType } from '../types';

interface NavbarProps {
  currentView: ViewType;
  onNavigate: (view: ViewType, projectId?: string) => void;
}

export default function Navbar({ currentView, onNavigate }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { label: string; view: ViewType }[] = [
    { label: 'HOME', view: 'home' },
    { label: 'PORTFOLIO', view: 'portfolio' },
    { label: 'ABOUT', view: 'about' },
  ];

  if (typeof window !== 'undefined' && localStorage.getItem('liam_studio_auth') === 'true') {
    navItems.push({ label: 'STUDIO PANEL', view: 'studio-portal' });
  }

  const handleNavClick = (view: ViewType) => {
    onNavigate(view);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isDarkOverlay = currentView === 'home';

  return (
    <motion.header
      id="navbar-header"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#F9F9F7]/95 backdrop-blur-md border-b border-black/5 py-4'
          : isDarkOverlay
          ? 'bg-transparent py-6 text-white'
          : 'bg-transparent py-6 text-[#121212]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo */}
        <button
          id="nav-logo"
          onClick={() => handleNavClick('home')}
          className="group cursor-pointer flex flex-col items-start tracking-widest text-left"
        >
          <span className={`font-serif text-lg md:text-xl font-medium tracking-widest uppercase transition-colors duration-300 ${
            isScrolled ? 'text-neutral-950' : isDarkOverlay ? 'text-white' : 'text-neutral-950'
          }`}>
            Liam Oeij
          </span>
          <span className={`text-[9px] font-mono tracking-widest uppercase opacity-70 transition-colors duration-300 ${
            isScrolled ? 'text-neutral-600' : isDarkOverlay ? 'text-neutral-200' : 'text-neutral-600'
          }`}>
            Contemporary Sculptor
          </span>
        </button>

        {/* Desktop Navigation */}
        <nav id="desktop-nav" className="hidden md:flex items-center space-x-12">
          {navItems.map((item) => {
            const isActive = currentView === item.view || (item.view === 'portfolio' && currentView === 'project');
            return (
              <button
                id={`nav-item-${item.view}`}
                key={item.view}
                onClick={() => handleNavClick(item.view)}
                className={`relative font-sans text-xs font-medium tracking-widest cursor-pointer py-1.5 transition-colors duration-300 ${
                  isActive
                    ? isScrolled
                      ? 'text-neutral-950'
                      : isDarkOverlay
                      ? 'text-white'
                      : 'text-neutral-950'
                    : isScrolled
                    ? 'text-neutral-600 hover:text-neutral-950'
                    : isDarkOverlay
                    ? 'text-neutral-300 hover:text-white'
                    : 'text-neutral-600 hover:text-neutral-950'
                }`}
              >
                {item.label}
                {isActive && (
                  <motion.div
                    id={`active-indicator-${item.view}`}
                    layoutId="navbar-underline"
                    className={`absolute bottom-0 left-0 w-full h-[1px] ${
                      isScrolled ? 'bg-neutral-950' : isDarkOverlay ? 'bg-white' : 'bg-neutral-950'
                    }`}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Mobile Menu Button */}
        <button
          id="mobile-menu-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={`md:hidden p-2 transition-colors duration-300 cursor-pointer ${
            isScrolled ? 'text-neutral-900' : isDarkOverlay ? 'text-white' : 'text-neutral-900'
          }`}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <motion.div
          id="mobile-nav-drawer"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="absolute top-full left-0 w-full bg-[#F9F9F7] border-b border-black/5 shadow-md py-8 px-6 md:hidden flex flex-col space-y-6"
        >
          {navItems.map((item) => {
            const isActive = currentView === item.view || (item.view === 'portfolio' && currentView === 'project');
            return (
              <button
                id={`mobile-nav-item-${item.view}`}
                key={item.view}
                onClick={() => handleNavClick(item.view)}
                className={`text-left font-serif text-lg tracking-widest py-2 border-b border-black/5 ${
                  isActive ? 'text-[#121212] font-medium' : 'text-neutral-600'
                }`}
              >
                {item.label}
              </button>
            );
          })}
          {typeof window !== 'undefined' && localStorage.getItem('liam_studio_auth') !== 'true' && (
            <button
              onClick={() => handleNavClick('studio-portal')}
              className="text-left font-sans text-xs tracking-widest text-neutral-400 hover:text-[#121212] pt-2"
            >
              &rarr; STUDIO PORTAL
            </button>
          )}
        </motion.div>
      )}
    </motion.header>
  );
}
