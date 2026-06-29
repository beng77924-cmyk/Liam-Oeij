import { motion } from 'motion/react';
import { ARTIST_INFO } from '../data';

export default function AboutView() {
  return (
    <div id="about-view-root" className="bg-[#F9F9F7] min-h-screen pt-32 pb-24 md:pb-36">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Editorial Title */}
        <div id="about-header" className="max-w-3xl mb-20 md:mb-32">
          <motion.span
            id="about-tag"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="font-mono text-[10px] md:text-xs text-neutral-500 tracking-[0.4em] uppercase block mb-4"
          >
            THE SCULPTOR & THE STUDIO
          </motion.span>
          <motion.h1
            id="about-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="font-serif text-4xl sm:text-6xl md:text-7xl text-[#121212] font-light tracking-wide uppercase leading-tight"
          >
            About Liam Oeij
          </motion.h1>
          <motion.div
            id="about-header-line"
            initial={{ width: 0 }}
            animate={{ width: 60 }}
            transition={{ duration: 0.8 }}
            className="h-[1px] bg-[#121212]/30 mt-8"
          />
        </div>

        {/* Section 1: Portrait / Studio Image & Biography */}
        <div id="about-bio-section" className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-20 items-start mb-36 md:mb-52">
          {/* Big Photography Block */}
          <div className="lg:col-span-6 space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="aspect-3/4 overflow-hidden bg-[#EFEBE7] border border-black/5 shadow-[40px_40px_80px_rgba(0,0,0,0.02)]"
            >
              <img
                src={ARTIST_INFO.studioImage}
                alt="Liam Oeij Studio"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <div className="flex justify-between font-mono text-[9px] text-neutral-500 tracking-widest uppercase">
              <span>Fig. 05 &bull; The Atelier, Rotterdam</span>
              <span>Morning light</span>
            </div>
          </div>

          {/* Biography Text Block */}
          <div className="lg:col-span-6 space-y-8 lg:pt-12">
            <h2 className="font-serif text-xs text-neutral-500 tracking-[0.3em] uppercase">BIOGRAPHY</h2>
            <div className="space-y-6 text-neutral-700 font-serif text-base sm:text-lg leading-relaxed font-light">
              {ARTIST_INFO.bio.map((paragraph, index) => (
                <p key={index} className="italic text-neutral-600">
                  {paragraph}
                </p>
              ))}
            </div>
            
            <div className="font-mono text-xs text-neutral-500 space-y-1 pt-6 border-t border-black/5">
              <p className="font-semibold text-[#121212]">Liam Oeij</p>
              <p>{ARTIST_INFO.location}</p>
              <p>Studio Established 2017</p>
            </div>
          </div>
        </div>

        {/* Section 2: Artistic Vision & Inspiration */}
        <div id="about-vision-section" className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-20 items-start mb-36 md:mb-52">
          {/* Vision Text Block */}
          <div className="lg:col-span-6 space-y-8 lg:order-2">
            <h2 className="font-serif text-xs text-neutral-500 tracking-[0.3em] uppercase">ARTISTIC VISION</h2>
            <div className="space-y-6 text-neutral-600 font-sans text-sm md:text-base leading-relaxed font-light">
              {ARTIST_INFO.artisticVision.map((paragraph, index) => (
                <p key={index}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Aesthetic Quote block (alternating rhythm) */}
          <div className="lg:col-span-6 lg:order-1 bg-[#EFEBE7] p-8 md:p-16 border border-black/5 shadow-[40px_40px_80px_rgba(0,0,0,0.02)] space-y-6">
            <span className="font-mono text-[9px] text-neutral-500 tracking-widest uppercase block">THE PHILOSOPHY OF SILENCE</span>
            <p className="font-serif text-2xl md:text-3xl font-light text-[#121212] italic leading-normal">
              &ldquo;The sculpture is not just a form; it is a silent weight that captures and anchors the invisible flow of air and light around it.&rdquo;
            </p>
            <div className="h-[1px] w-12 bg-neutral-400" />
            <p className="font-mono text-[10px] text-neutral-600 tracking-wider">Liam Oeij, "The Subtractive Dialogue" lecture, 2024</p>
          </div>
        </div>

        {/* Section 3: Working Process & Materials Catalogue */}
        <div id="about-materials-section" className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-20 items-start mb-36 md:mb-52">
          {/* Left Column: Process */}
          <div className="lg:col-span-6 space-y-8">
            <h2 className="font-serif text-xs text-neutral-500 tracking-[0.3em] uppercase">WORKING PROCESS</h2>
            <div className="space-y-6 text-neutral-600 font-sans text-sm md:text-base leading-relaxed font-light">
              {ARTIST_INFO.workingProcess.map((paragraph, index) => (
                <p key={index}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Right Column: Materials list */}
          <div className="lg:col-span-6 space-y-8">
            <h2 className="font-serif text-xs text-neutral-500 tracking-[0.3em] uppercase">MATERIALS & ORIGINS</h2>
            <div className="divide-y divide-black/5 border-t border-b border-black/5">
              {ARTIST_INFO.materialsList.map((material, index) => (
                <div key={index} className="py-4 grid grid-cols-1 md:grid-cols-3 gap-2">
                  <span className="font-serif text-base text-[#121212] font-medium md:col-span-1 uppercase tracking-wide">
                    {material.name}
                  </span>
                  <p className="font-sans text-xs text-neutral-600 md:col-span-2 leading-relaxed">
                    {material.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section 4: Studio Practice (Footer highlight) */}
        <div id="about-practice-section" className="max-w-4xl mx-auto text-center border border-black/5 p-12 md:p-20 bg-[#EFEBE7]/30">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-mono text-[9px] text-neutral-500 tracking-widest uppercase block mb-4"
          >
            CRAFTSMANSHIP MANIFESTO
          </motion.span>
          <motion.h3
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-2xl md:text-3xl text-neutral-900 font-light uppercase tracking-wide mb-6"
          >
            The Studio Practice
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-base md:text-lg text-neutral-600 italic leading-relaxed max-w-2xl mx-auto"
          >
            {ARTIST_INFO.studioPractice}
          </motion.p>
        </div>
      </div>
    </div>
  );
}
