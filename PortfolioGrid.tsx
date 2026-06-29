import { motion } from 'motion/react';
import { Sculpture } from '../types';

interface PortfolioGridProps {
  sculptures: Sculpture[];
  onSelectProject: (projectId: string) => void;
}

export default function PortfolioGrid({ sculptures, onSelectProject }: PortfolioGridProps) {
  return (
    <section id="portfolio-section" className="bg-[#F9F9F7] py-32 md:py-48">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Gallery Introduction */}
        <div id="portfolio-header" className="max-w-3xl mb-24 md:mb-36">
          <motion.span
            id="portfolio-tag"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="font-mono text-[10px] md:text-xs text-neutral-500 tracking-[0.4em] uppercase block mb-4"
          >
            CATALOGUE RAISONNÉ
          </motion.span>
          <motion.h1
            id="portfolio-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="font-serif text-4xl sm:text-6xl md:text-7xl text-[#121212] font-light tracking-wide uppercase leading-tight mb-8"
          >
            The Works
          </motion.h1>
          <motion.p
            id="portfolio-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-serif text-lg md:text-xl text-neutral-700 font-light italic leading-relaxed"
          >
            An ongoing exploration of the dialog between subtractive form, raw mineral density, and the play of atmospheric light on physical mass.
          </motion.p>
          <div className="w-16 h-[1px] bg-[#121212]/30 mt-8" />
        </div>

        {/* Asymmetric Staggered Grid */}
        <div id="portfolio-grid" className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-24 md:gap-y-36">
          {sculptures.map((sculpture, index) => {
            // Apply a slight upward margin stagger to even-indexed items on desktop for an organic editorial flow
            const staggerClass = index % 2 === 1 ? 'md:mt-24' : '';

            return (
              <motion.div
                id={`portfolio-card-${sculpture.id}`}
                key={sculpture.id}
                className={`flex flex-col group ${staggerClass}`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.8, delay: (index % 2) * 0.15 }}
              >
                {/* Image Container with high hover zoom and fade-in shadow */}
                <div
                  onClick={() => onSelectProject(sculpture.id)}
                  className="aspect-3/4 overflow-hidden bg-[#EFEBE7] cursor-pointer border border-black/5 mb-8 relative shadow-[40px_40px_80px_rgba(0,0,0,0.02)]"
                >
                  <div className="absolute inset-0 bg-[#121212]/0 group-hover:bg-[#121212]/10 transition-all duration-700 z-10" />
                  <img
                    src={sculpture.image}
                    alt={sculpture.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transform scale-100 group-hover:scale-[1.03] transition-transform duration-1000 ease-out"
                  />
                  
                  {/* Subtle technical overlay */}
                  <div className="absolute bottom-6 right-6 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-mono text-[9px] tracking-widest text-neutral-50 bg-[#121212]/40 backdrop-blur-xs px-3 py-1">
                    DETAIL VIEW
                  </div>
                </div>

                {/* Sculpture Metadata & Description */}
                <div className="space-y-4">
                  {/* Monospaced tag line */}
                  <div className="flex items-center justify-between font-mono text-[9px] text-neutral-500 tracking-[0.25em] uppercase">
                    <span>{sculpture.material}</span>
                    <span>{sculpture.year}</span>
                  </div>

                  {/* Title and dimension row */}
                  <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-black/5 pb-3">
                    <button
                      onClick={() => onSelectProject(sculpture.id)}
                      className="font-serif text-2xl md:text-3xl font-light text-[#121212] hover:text-neutral-600 transition-colors cursor-pointer text-left uppercase tracking-wide"
                    >
                      {sculpture.title}
                    </button>
                    <span className="font-mono text-[10px] text-neutral-600 tracking-wider">
                      {sculpture.dimensions}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="font-serif text-sm md:text-base text-neutral-700 leading-relaxed font-light italic">
                    {sculpture.description}
                  </p>

                  {/* Exploration Action */}
                  <button
                    onClick={() => onSelectProject(sculpture.id)}
                    className="group flex items-center space-x-2 text-[10px] font-sans font-semibold tracking-[0.25em] text-[#121212] uppercase cursor-pointer pt-2"
                  >
                    <span>View Project</span>
                    <span className="transform group-hover:translate-x-1 transition-transform duration-300">&rarr;</span>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
