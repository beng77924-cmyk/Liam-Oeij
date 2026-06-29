import { ViewType } from '../types';

interface FooterProps {
  onNavigate: (view: ViewType) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (view: ViewType) => {
    onNavigate(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="footer" className="bg-[#F9F9F7] border-t border-black/5 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          {/* Logo Brand Column */}
          <div className="md:col-span-6 space-y-4">
            <button
              onClick={() => handleNavClick('home')}
              className="text-left font-serif text-2xl tracking-[0.2em] uppercase font-medium text-[#121212] cursor-pointer"
            >
              LIAM OEIJ
            </button>
            <p className="font-sans text-[11px] text-neutral-500 tracking-wider uppercase">
              Contemporary Sculptor & Visual Artist &bull; Rotterdam
            </p>
          </div>

          {/* Navigation Links Column */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-mono text-[9px] text-neutral-500 tracking-widest uppercase">NAVIGATE</h4>
            <div className="flex flex-col space-y-2.5">
              <button
                onClick={() => handleNavClick('home')}
                className="text-left font-serif text-sm text-neutral-600 hover:text-[#121212] transition-colors cursor-pointer uppercase tracking-wider font-light"
              >
                Home
              </button>
              <button
                onClick={() => handleNavClick('portfolio')}
                className="text-left font-serif text-sm text-neutral-600 hover:text-[#121212] transition-colors cursor-pointer uppercase tracking-wider font-light"
              >
                Portfolio
              </button>
              <button
                onClick={() => handleNavClick('about')}
                className="text-left font-serif text-sm text-neutral-600 hover:text-[#121212] transition-colors cursor-pointer uppercase tracking-wider font-light"
              >
                About
              </button>
              <button
                onClick={() => handleNavClick('studio-portal')}
                className="text-left font-serif text-sm text-neutral-600 hover:text-[#121212] transition-colors cursor-pointer uppercase tracking-wider font-light"
              >
                Studio Portal
              </button>
            </div>
          </div>

          {/* Studio Hours & Contact Column */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-mono text-[9px] text-neutral-500 tracking-widest uppercase">ENQUIRIES</h4>
            <div className="font-serif text-sm text-neutral-600 space-y-1 font-light italic">
              <p>studio@liamoeij.com</p>
              <p>+31 (0) 10 458 920</p>
              <p className="not-italic font-mono text-[10px] text-neutral-500 uppercase tracking-widest pt-2">By appointment only</p>
            </div>
          </div>
        </div>

        {/* Bottom Rule & Copyright */}
        <div className="border-t border-black/5 mt-16 md:mt-24 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="font-mono text-[9px] text-neutral-500 tracking-widest uppercase">
            &copy; {currentYear} LIAM OEIJ. ALL RIGHTS RESERVED.
          </p>
          <div className="flex space-x-6 text-[10px] font-mono text-neutral-500 uppercase tracking-widest items-center">
            <span className="hover:text-[#121212] transition-colors cursor-pointer">INSTAGRAM</span>
            <span>&bull;</span>
            <span className="hover:text-[#121212] transition-colors cursor-pointer">ARTSY</span>
            <span>&bull;</span>
            <button onClick={() => handleNavClick('studio-portal')} className="hover:text-[#121212] transition-colors cursor-pointer font-semibold uppercase tracking-widest text-[10px]">STUDIO PORTAL</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
