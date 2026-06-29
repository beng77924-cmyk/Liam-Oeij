import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Sculpture } from '../types';

interface FeaturedWorksProps {
  sculptures: Sculpture[];
  onSelectProject: (projectId: string) => void;
}

export default function FeaturedWorks({ sculptures, onSelectProject }: FeaturedWorksProps) {
  // We'll feature the first three sculptures
  const featured = sculptures.slice(0, 3);

  return (
    <section id="featured-section-anchor" className="bg-[#F9F9F7] py-24 md:py-40 border-b border-black/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Curated Section Header */}
        <div id="featured-header" className="mb-20 md:mb-32 text-center md:text-left">
          <motion.span
            id="featured-curated-tag"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="font-mono text-[10px] md:text-xs text-neutral-500 tracking-[0.4em] uppercase block mb-4"
          >
            SELECTED WORKS
          </motion.span>
          <motion.h2
            id="featured-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-serif text-3xl md:text-5xl lg:text-6xl text-[#121212] font-light tracking-wide leading-tight uppercase"
          >
            Curated Exhibitions
          </motion.h2>
          <motion.div
            id="featured-header-line"
            initial={{ width: 0 }}
            whileInView={{ width: 60 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-[1px] bg-[#121212]/30 mt-6 mx-auto md:mx-0"
          />
        </div>

        {/* Alternating Layout Sections */}
        <div className="space-y-36 md:space-y-56">
          {featured.map((work, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                id={`featured-item-${work.id}`}
                key={work.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-20 items-center"
              >
                {/* Image Section - alternates column order on desktop */}
                <div
                  className={`lg:col-span-7 overflow-hidden ${
                    isEven ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98, y: 40 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    onClick={() => onSelectProject(work.id)}
                    className="group relative aspect-4/3 overflow-hidden bg-[#EFEBE7] cursor-pointer border border-black/5 shadow-[40px_40px_80px_rgba(0,0,0,0.03)]"
                  >
                    {/* Dark filter on hover for museum look */}
                    <div className="absolute inset-0 bg-[#121212]/5 group-hover:bg-[#121212]/15 transition-all duration-700 z-10" />
                    <motion.img
                      src={work.image}
                      alt={work.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-1000 ease-out"
                    />
                    {/* Visual metadata overlay in image corner */}
                    <div className="absolute bottom-6 left-6 z-20 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 hidden md:block">
                      <span className="font-mono text-[10px] tracking-widest uppercase bg-[#121212]/40 px-3 py-1.5 backdrop-blur-xs">
                        {work.material}
                      </span>
                    </div>
                  </motion.div>
                </div>

                {/* Text Content Section */}
                <div
                  className={`lg:col-span-5 space-y-6 md:space-y-8 ${
                    isEven ? 'lg:order-2 lg:pl-6' : 'lg:order-1 lg:pr-6'
                  }`}
                >
                  {/* Category Tag */}
                  <div className="flex items-center space-x-4">
                    <span className="font-mono text-[9px] text-neutral-500 tracking-[0.25em] uppercase">
                      {work.year} &bull; {work.dimensions}
                    </span>
                  </div>

                  {/* Title */}
                  <motion.h3
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="font-serif text-3xl md:text-4xl text-[#121212] tracking-wide uppercase font-light"
                  >
                    {work.title}
                  </motion.h3>

                  {/* Material Indicator */}
                  <p className="font-sans text-xs tracking-[0.2em] uppercase text-neutral-600 font-medium">
                    {work.material}
                  </p>

                  {/* Description */}
                  <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="font-serif text-base md:text-lg text-neutral-600 font-light italic leading-relaxed"
                  >
                    {work.featuredDescription || work.description}
                  </motion.p>

                  {/* Action Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="pt-4"
                  >
                    <button
                      id={`view-project-btn-${work.id}`}
                      onClick={() => onSelectProject(work.id)}
                      className="group flex items-center space-x-3 text-[#121212] font-sans text-xs tracking-[0.25em] font-medium uppercase cursor-pointer"
                    >
                      <span>View Project</span>
                      <motion.div
                        className="transform group-hover:translate-x-1.5 transition-transform duration-300"
                      >
                        <ArrowRight size={14} className="stroke-1.5" />
                      </motion.div>
                    </button>
                    <div className="w-24 h-[1px] bg-[#121212]/30 mt-2 transform group-hover:scale-x-110 origin-left transition-transform duration-300" />
                  </motion.div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
