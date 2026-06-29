import { motion } from 'motion/react';
import { ArrowLeft, Layers, Landmark, Ruler, ShieldAlert } from 'lucide-react';
import { Sculpture } from '../types';

interface ProjectDetailProps {
  sculpture: Sculpture;
  onBack: () => void;
}

export default function ProjectDetail({ sculpture, onBack }: ProjectDetailProps) {
  return (
    <div id={`project-detail-view-${sculpture.id}`} className="bg-[#F9F9F7] min-h-screen pt-28 pb-24 md:pb-36">
      {/* Back Button and Path navigation */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12 flex justify-between items-center">
        <button
          id="project-back-btn"
          onClick={onBack}
          className="group flex items-center space-x-3 text-neutral-600 hover:text-[#121212] font-sans text-xs tracking-widest uppercase transition-colors cursor-pointer"
        >
          <ArrowLeft size={14} className="transform group-hover:-translate-x-1 transition-transform" />
          <span>Back to Portfolio</span>
        </button>
        <span className="font-mono text-[10px] text-neutral-600 tracking-widest hidden sm:inline uppercase">
          Liam Oeij &bull; Collection {sculpture.year}
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Full-width Flagship Image (Hero Style) */}
        <motion.div
          id="project-hero-image-container"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="aspect-16/9 overflow-hidden bg-[#EFEBE7] border border-black/5 mb-16 md:mb-24 relative group shadow-[40px_40px_80px_rgba(0,0,0,0.02)]"
        >
          <img
            src={sculpture.image}
            alt={sculpture.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#121212]/5" />
          <div className="absolute bottom-6 left-6 z-10 text-white select-none">
            <span className="font-mono text-[10px] tracking-widest text-neutral-200 uppercase bg-[#121212]/40 px-3 py-1.5 backdrop-blur-xs">
              Primary Study &bull; Natural Light
            </span>
          </div>
        </motion.div>

        {/* Title, Specs & Introductory Description Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 mb-24 md:mb-36">
          {/* Left Column: Big typography title & core details */}
          <div className="lg:col-span-5 space-y-6 md:space-y-8">
            <div className="space-y-2">
              <span className="font-mono text-[10px] text-neutral-500 tracking-widest uppercase">
                {sculpture.year} &bull; Studio Rotterdam
              </span>
              <h1 id="project-title" className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#121212] font-light tracking-wide uppercase leading-tight">
                {sculpture.title}
              </h1>
            </div>

            <div className="h-[1px] bg-black/5" />

            {/* Technical metadata table */}
            <div className="space-y-4 font-mono text-[11px] md:text-xs">
              <div className="flex justify-between py-1 border-b border-black/5">
                <span className="text-neutral-500 tracking-widest uppercase">Material</span>
                <span className="text-[#121212] font-medium">{sculpture.material}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-black/5">
                <span className="text-neutral-500 tracking-widest uppercase">Dimensions</span>
                <span className="text-[#121212] font-medium">{sculpture.dimensions}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-black/5">
                <span className="text-neutral-500 tracking-widest uppercase">Weight Class</span>
                <span className="text-[#121212] font-medium">Medium Sculptural</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-neutral-500 tracking-widest uppercase">Status</span>
                <span className="text-[#121212] font-medium">Unique Edition 1 of 1</span>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative descriptions */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <h2 className="font-serif text-xs text-neutral-500 tracking-[0.25em] uppercase mb-4">ARTISTIC CONTEXT</h2>
              <p className="font-serif text-xl md:text-2xl text-neutral-800 leading-relaxed font-light italic">
                {sculpture.description}
              </p>
            </div>

            <div className="space-y-6 text-neutral-700 font-sans text-sm md:text-base font-light leading-relaxed">
              <div>
                <h3 className="font-serif text-xs text-neutral-500 tracking-[0.25em] uppercase mb-3">INSPIRATION & FORM</h3>
                <p>{sculpture.inspiration}</p>
              </div>
              <div>
                <h3 className="font-serif text-xs text-neutral-500 tracking-[0.25em] uppercase mb-3">CREATIVE PROCESS</h3>
                <p>{sculpture.creativeProcess}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Highlight Image Section: Multiple high-resolution images & close-ups */}
        <div className="space-y-12 mb-24 md:mb-36">
          <div className="border-b border-black/5 pb-4">
            <h2 className="font-serif text-xs text-neutral-500 tracking-[0.3em] uppercase">MATERIAL STUDIES & FOCUS DETAILS</h2>
          </div>

          {/* Two-column layout showcasing crops to represent close-ups */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
            {/* Focus 1: Textures */}
            <div className="space-y-4">
              <div className="aspect-4/3 overflow-hidden bg-[#EFEBE7] border border-black/5 group shadow-[40px_40px_80px_rgba(0,0,0,0.02)]">
                <img
                  src={sculpture.image}
                  alt="Detail Focus"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top filter contrast-105 scale-110 group-hover:scale-115 transition-transform duration-1000"
                />
              </div>
              <div>
                <span className="font-mono text-[9px] text-neutral-500 tracking-widest uppercase block mb-1">DETAIL FOCUS I</span>
                <h4 className="font-serif text-base text-[#121212] uppercase tracking-wide font-medium">Textural Surface Topography</h4>
                <p className="font-serif text-sm text-neutral-700 italic mt-1 leading-relaxed">
                  A high-contrast macro perspective showing the transition margins, illustrating the meticulous chisel-and-file work of manual refinement.
                </p>
              </div>
            </div>

            {/* Focus 2: Geometric Silhouette */}
            <div className="space-y-4">
              <div className="aspect-4/3 overflow-hidden bg-[#EFEBE7] border border-black/5 group shadow-[40px_40px_80px_rgba(0,0,0,0.02)]">
                <img
                  src={sculpture.image}
                  alt="Contrast Focus"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center filter grayscale contrast-115 brightness-95 scale-105 group-hover:scale-110 transition-transform duration-1000"
                />
              </div>
              <div>
                <span className="font-mono text-[9px] text-neutral-500 tracking-widest uppercase block mb-1">DETAIL FOCUS II</span>
                <h4 className="font-serif text-base text-[#121212] uppercase tracking-wide font-medium">Silhouette, Depth & Monochromatic Intersections</h4>
                <p className="font-serif text-sm text-neutral-700 italic mt-1 leading-relaxed">
                  Evaluating the negative spaces. Removing color highlights the sculptural geometries and how the cast shadows anchor the structure to its space.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Gallery Exhibition Specifications / Technical Specifications Sheet */}
        <div className="bg-[#EFEBE7] p-8 md:p-16 border border-black/5 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 shadow-[40px_40px_80px_rgba(0,0,0,0.02)]">
          {sculpture.details.map((detail, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center space-x-2 text-neutral-500">
                {index === 0 && <Ruler size={14} className="stroke-1" />}
                {index === 1 && <Layers size={14} className="stroke-1" />}
                {index === 2 && <Landmark size={14} className="stroke-1" />}
                {index === 3 && <ShieldAlert size={14} className="stroke-1" />}
                <span className="font-mono text-[9px] tracking-widest uppercase">{detail.label}</span>
              </div>
              <p className="font-serif text-sm md:text-base text-[#121212] italic leading-relaxed">
                {detail.text}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Back Nav */}
        <div className="mt-20 md:mt-32 text-center">
          <button
            onClick={onBack}
            className="group relative cursor-pointer border border-[#121212] bg-transparent hover:bg-[#121212] px-12 py-4 text-xs font-medium tracking-[0.25em] text-[#121212] hover:text-[#F9F9F7] uppercase transition-all duration-300"
          >
            Return to Portfolio
          </button>
        </div>
      </div>
    </div>
  );
}
