import { motion } from 'motion/react';
import { ArrowDown } from 'lucide-react';
import { ViewType } from '../types';

interface HeroProps {
  heroImage: string;
  onExplore: (view: ViewType) => void;
}

export default function Hero({ heroImage, onExplore }: HeroProps) {
  return (
    <section id="hero-section" className="relative h-screen w-full overflow-hidden bg-neutral-950 flex items-center justify-center">
      {/* Background image with Ken Burns slow pan/zoom effect */}
      <motion.div
        id="hero-background"
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.65 }}
        transition={{ duration: 3, ease: [0.25, 1, 0.5, 1] }}
        className="absolute inset-0 bg-cover bg-center select-none"
        style={{ backgroundImage: `url(${heroImage})` }}
        referrerPolicy="no-referrer"
      />

      {/* Dark overlay to ensure contrast and premium museum atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-900/40 to-neutral-950/40" />

      {/* Hero Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto flex flex-col items-center">
        {/* Subtle Category Tag */}
        <motion.span
          id="hero-tag"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-mono text-[10px] md:text-xs text-neutral-300 tracking-[0.3em] uppercase mb-6"
        >
          Fine Art Exhibition &bull; Studio Rotterdam
        </motion.span>

        {/* Large Display Title */}
        <motion.h1
          id="hero-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="font-serif text-5xl sm:text-7xl md:text-9xl font-light text-neutral-50 tracking-[0.15em] leading-none uppercase mb-8"
        >
          LIAM OEIJ
        </motion.h1>

        {/* Separator Line */}
        <motion.div
          id="hero-separator"
          initial={{ width: 0 }}
          animate={{ width: 80 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="h-[1px] bg-neutral-400 mb-8"
        />

        {/* Elegant Subtitle */}
        <motion.p
          id="hero-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="font-serif text-lg sm:text-2xl md:text-3xl text-neutral-300 italic tracking-wide max-w-2xl mb-12 font-light leading-relaxed"
        >
          Contemporary sculptor exploring form, material, and emotion.
        </motion.p>

        {/* Interactive Action Button */}
        <motion.div
          id="hero-actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="flex flex-col items-center gap-6"
        >
          <button
            id="explore-portfolio-btn"
            onClick={() => onExplore('portfolio')}
            className="group relative cursor-pointer overflow-hidden border border-neutral-300/60 bg-neutral-50/10 backdrop-blur-xs hover:bg-neutral-50 hover:border-neutral-50 px-10 py-4 text-xs font-medium tracking-[0.25em] text-white hover:text-neutral-950 uppercase transition-all duration-500 ease-out"
          >
            {/* Animated hover background slide */}
            <span className="absolute inset-0 w-full h-full bg-neutral-50 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-0" />
            <span className="relative z-10 flex items-center gap-2">
              Explore the Portfolio
            </span>
          </button>
        </motion.div>
      </div>

      {/* Bottom Scroll Indicator */}
      <motion.div
        id="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5, y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center cursor-pointer text-neutral-300"
        onClick={() => {
          const featured = document.getElementById('featured-section-anchor');
          if (featured) {
            featured.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      >
        <span className="font-mono text-[9px] tracking-[0.2em] uppercase mb-2">Scroll Down</span>
        <ArrowDown size={14} className="stroke-1" />
      </motion.div>
    </section>
  );
}
