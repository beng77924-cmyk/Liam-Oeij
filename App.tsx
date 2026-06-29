import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedWorks from './components/FeaturedWorks';
import PortfolioGrid from './components/PortfolioGrid';
import ProjectDetail from './components/ProjectDetail';
import AboutView from './components/AboutView';
import Footer from './components/Footer';
import StudioPortal from './components/StudioPortal';
import { SCULPTURES } from './data';
import { ViewType, Sculpture } from './types';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  
  const [sculpturesList, setSculpturesList] = useState<Sculpture[]>(() => {
    const saved = localStorage.getItem('liam_sculptures');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing saved sculptures', e);
      }
    }
    return SCULPTURES;
  });

  const handleAddSculpture = (newSculpture: Sculpture) => {
    const updated = [newSculpture, ...sculpturesList];
    setSculpturesList(updated);
    localStorage.setItem('liam_sculptures', JSON.stringify(updated));
  };

  const handleUpdateSculpture = (updatedSculpture: Sculpture) => {
    const updated = sculpturesList.map(s => s.id === updatedSculpture.id ? updatedSculpture : s);
    setSculpturesList(updated);
    localStorage.setItem('liam_sculptures', JSON.stringify(updated));
  };

  const handleDeleteSculpture = (id: string) => {
    const updated = sculpturesList.filter(s => s.id !== id);
    setSculpturesList(updated);
    localStorage.setItem('liam_sculptures', JSON.stringify(updated));
  };

  const handleResetSculptures = () => {
    setSculpturesList(SCULPTURES);
    localStorage.removeItem('liam_sculptures');
  };

  const handleNavigate = (view: ViewType, projectId?: string) => {
    if (view === 'project' && projectId) {
      setActiveProjectId(projectId);
      setCurrentView('project');
    } else {
      setCurrentView(view);
      setActiveProjectId(null);
    }
    // Instant scroll to top on page switches to avoid starting at scrolled position
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const handleSelectProject = (projectId: string) => {
    handleNavigate('project', projectId);
  };

  const activeSculpture = sculpturesList.find((s) => s.id === activeProjectId);

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return (
          <div key="home-view" id="home-view-container">
            <Hero
              heroImage={sculpturesList[0]?.image || SCULPTURES[0].image}
              onExplore={handleNavigate}
            />
            <FeaturedWorks
              sculptures={sculpturesList}
              onSelectProject={handleSelectProject}
            />
          </div>
        );
      case 'portfolio':
        return (
          <div key="portfolio-view" id="portfolio-view-container">
            <PortfolioGrid
              sculptures={sculpturesList}
              onSelectProject={handleSelectProject}
            />
          </div>
        );
      case 'about':
        return (
          <div key="about-view" id="about-view-container">
            <AboutView />
          </div>
        );
      case 'studio-portal':
        return (
          <div key="studio-portal-view" id="studio-portal-view-container">
            <StudioPortal
              sculptures={sculpturesList}
              onAddSculpture={handleAddSculpture}
              onUpdateSculpture={handleUpdateSculpture}
              onDeleteSculpture={handleDeleteSculpture}
              onResetSculptures={handleResetSculptures}
              onNavigate={handleNavigate}
            />
          </div>
        );
      case 'project':
        if (activeSculpture) {
          return (
            <div key={`project-${activeSculpture.id}`} id="project-view-container">
              <ProjectDetail
                sculpture={activeSculpture}
                onBack={() => handleNavigate('portfolio')}
              />
            </div>
          );
        }
        // Fallback to portfolio if not found
        return (
          <div key="portfolio-fallback" id="portfolio-fallback-container">
            <PortfolioGrid
              sculptures={sculpturesList}
              onSelectProject={handleSelectProject}
            />
          </div>
        );
      default:
        return (
          <div key="home-fallback" id="home-fallback-container">
            <Hero
              heroImage={sculpturesList[0]?.image || SCULPTURES[0].image}
              onExplore={handleNavigate}
            />
          </div>
        );
    }
  };

  return (
    <div id="app-wrapper" className="min-h-screen flex flex-col bg-[#F9F9F7] font-sans selection:bg-[#EFEBE7] selection:text-[#121212]">
      {/* Navigation */}
      <Navbar currentView={currentView} onNavigate={handleNavigate} />

      {/* Main Content Area with Page Transitions */}
      <main id="main-content" className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView === 'project' ? `project-${activeProjectId}` : currentView}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
