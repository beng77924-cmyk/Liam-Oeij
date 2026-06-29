import { useState, useRef, ChangeEvent, FormEvent } from 'react';
import { motion } from 'motion/react';
import { Lock, Upload, Image as ImageIcon, LogOut, Check, ArrowLeft, Ruler, Plus, Trash2, Edit } from 'lucide-react';
import { Sculpture, ViewType } from '../types';

interface StudioPortalProps {
  sculptures: Sculpture[];
  onAddSculpture: (sculpture: Sculpture) => void;
  onUpdateSculpture: (sculpture: Sculpture) => void;
  onDeleteSculpture: (id: string) => void;
  onResetSculptures: () => void;
  onNavigate: (view: ViewType) => void;
}

const PRESET_IMAGES = [
  {
    name: 'Carrara Marble',
    path: '/src/assets/images/sculpture_hero_1782716827016.jpg',
  },
  {
    name: 'Granite & Obsidian',
    path: '/src/assets/images/sculpture_monolith_1782716844577.jpg',
  },
  {
    name: 'Cedar & Bronze',
    path: '/src/assets/images/sculpture_wood_bronze_1782716860077.jpg',
  },
  {
    name: 'Alabaster Continuous',
    path: '/src/assets/images/sculpture_alabaster_1782716875106.jpg',
  },
];

export default function StudioPortal({
  sculptures,
  onAddSculpture,
  onUpdateSculpture,
  onDeleteSculpture,
  onResetSculptures,
  onNavigate,
}: StudioPortalProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('liam_studio_auth') === 'true';
  });
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Portal sub-view and edit state
  const [activeSubView, setActiveSubView] = useState<'list' | 'form'>('list');
  const [editingSculptureId, setEditingSculptureId] = useState<string | null>(null);

  // Form states
  const [title, setTitle] = useState('');
  const [year, setYear] = useState(new Date().getFullYear());
  const [material, setMaterial] = useState('');
  const [dimensions, setDimensions] = useState('');
  const [imageType, setImageType] = useState<'upload' | 'preset' | 'url'>('upload');
  const [imageUrl, setImageUrl] = useState('');
  const [selectedPreset, setSelectedPreset] = useState(PRESET_IMAGES[0].path);
  const [uploadedBase64, setUploadedBase64] = useState<string>('');
  const [description, setDescription] = useState('');
  const [creativeProcess, setCreativeProcess] = useState('');
  const [inspiration, setInspiration] = useState('');
  
  // Technical details
  const [formDetail, setFormDetail] = useState('');
  const [weightDetail, setWeightDetail] = useState('');
  const [exhibitionDetail, setExhibitionDetail] = useState('');
  const [acquisitionDetail, setAcquisitionDetail] = useState('');

  const [isSuccess, setIsSuccess] = useState(false);
  const [sculptureToDelete, setSculptureToDelete] = useState<Sculpture | null>(null);
  const [formError, setFormError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    if (password === '931263') {
      setIsAuthenticated(true);
      localStorage.setItem('liam_studio_auth', 'true');
      setError('');
    } else {
      setError('Onjuist wachtwoord.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('liam_studio_auth');
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setFormError('Het bestand is te groot. Kies een afbeelding kleiner dan 2MB om overschrijding van de browseropslag te voorkomen.');
        return;
      }
      setFormError('');
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedBase64(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditClick = (sculpture: Sculpture) => {
    setFormError('');
    setEditingSculptureId(sculpture.id);
    setTitle(sculpture.title);
    setYear(sculpture.year);
    setMaterial(sculpture.material);
    setDimensions(sculpture.dimensions);
    setDescription(sculpture.description);
    setCreativeProcess(sculpture.creativeProcess || '');
    setInspiration(sculpture.inspiration || '');
    
    // Set technical details
    setFormDetail(sculpture.details?.[0]?.text || '');
    setWeightDetail(sculpture.details?.[1]?.text || '');
    setExhibitionDetail(sculpture.details?.[2]?.text || '');
    setAcquisitionDetail(sculpture.details?.[3]?.text || '');

    // Image logic
    const img = sculpture.image || '';
    if (img.startsWith('data:')) {
      setImageType('upload');
      setUploadedBase64(img);
    } else if (img.startsWith('/src/assets/') || PRESET_IMAGES.some(p => p.path === img)) {
      setImageType('preset');
      setSelectedPreset(img);
    } else {
      setImageType('url');
      setImageUrl(img);
    }

    setActiveSubView('form');
  };

  const handleNewClick = () => {
    setFormError('');
    setEditingSculptureId(null);
    setTitle('');
    setYear(new Date().getFullYear());
    setMaterial('');
    setDimensions('');
    setUploadedBase64('');
    setImageUrl('');
    setDescription('');
    setCreativeProcess('');
    setInspiration('');
    setFormDetail('');
    setWeightDetail('');
    setExhibitionDetail('');
    setAcquisitionDetail('');
    setImageType('upload');
    setActiveSubView('form');
  };

  const handleDeleteClick = (sculpture: Sculpture) => {
    setSculptureToDelete(sculpture);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFormError('');
    
    if (!title || !material || !dimensions || !description) {
      setFormError('Vul alstublieft alle verplichte velden in.');
      return;
    }

    let sculptureImage = '';
    if (imageType === 'upload') {
      if (!uploadedBase64) {
        setFormError('Upload alstublieft een afbeelding of selecteer een preset.');
        return;
      }
      sculptureImage = uploadedBase64;
    } else if (imageType === 'preset') {
      sculptureImage = selectedPreset;
    } else {
      if (!imageUrl) {
        setFormError('Vul alstublieft een geldige afbeelding-URL in.');
        return;
      }
      sculptureImage = imageUrl;
    }

    const finalId = editingSculptureId || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `sculpture-${Date.now()}`;

    const newSculpture: Sculpture = {
      id: finalId,
      title,
      year: Number(year),
      material,
      dimensions,
      image: sculptureImage,
      description,
      creativeProcess: creativeProcess || 'Vormgegeven en verfijnd met de hand in het atelier te Rotterdam.',
      inspiration: inspiration || 'Geïnspireerd door de natuurlijke spanning en abstractie van brute mineralen.',
      details: [
        { label: 'Form', text: formDetail || 'Biomorphic form language.' },
        { label: 'Weight', text: weightDetail || 'Approx. 30 kg' },
        { label: 'Exhibition History', text: exhibitionDetail || 'Studio Collection Rotterdam.' },
        { label: 'Acquisition', text: acquisitionDetail || 'Available through Studio Liam Oeij.' },
      ]
    };

    if (editingSculptureId) {
      onUpdateSculpture(newSculpture);
    } else {
      onAddSculpture(newSculpture);
    }

    setIsSuccess(true);
    
    // Reset form fields
    setTitle('');
    setMaterial('');
    setDimensions('');
    setUploadedBase64('');
    setImageUrl('');
    setDescription('');
    setCreativeProcess('');
    setInspiration('');
    setFormDetail('');
    setWeightDetail('');
    setExhibitionDetail('');
    setAcquisitionDetail('');
    setEditingSculptureId(null);

    setTimeout(() => {
      setIsSuccess(false);
      setActiveSubView('list');
    }, 1500);
  };

  if (!isAuthenticated) {
    return (
      <div id="studio-login-view" className="bg-[#F9F9F7] min-h-[85vh] flex items-center justify-center px-6 py-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md bg-[#EFEBE7]/40 border border-black/5 p-10 md:p-12 shadow-[40px_40px_80px_rgba(0,0,0,0.02)] space-y-8"
        >
          <div className="text-center space-y-2">
            <div className="inline-flex p-3 bg-[#EFEBE7] border border-black/5 rounded-full text-[#121212] mb-2">
              <Lock size={20} className="stroke-1.5" />
            </div>
            <span className="font-mono text-[9px] text-neutral-500 tracking-[0.4em] uppercase block">PORTAL</span>
            <h2 className="font-serif text-3xl font-light tracking-wide text-[#121212] uppercase">Studio Toegang</h2>
            <p className="font-sans text-xs text-neutral-500">
              Uitsluitend geautoriseerde toegang voor beeldhouwer Liam Oeij.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="font-mono text-[9px] text-neutral-500 tracking-widest uppercase block">
                Toegangscode
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Vul code in"
                className="w-full bg-[#F9F9F7] border border-black/10 px-4 py-3 text-sm font-sans focus:outline-hidden focus:border-[#121212] transition-colors rounded-none placeholder-neutral-400 text-[#121212]"
              />
              {error && (
                <p className="font-mono text-[10px] text-red-600 tracking-wide mt-1">
                  {error}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-[#121212] hover:bg-neutral-800 text-[#F9F9F7] font-mono text-[10px] tracking-widest uppercase py-3.5 transition-colors cursor-pointer"
            >
              Inloggen
            </button>
          </form>


        </motion.div>
      </div>
    );
  }

  return (
    <div id="studio-dashboard-view" className="bg-[#F9F9F7] min-h-screen pt-32 pb-24 md:pb-36">
      {/* Deletion Dialog overlay */}
      {sculptureToDelete && (
        <div className="fixed inset-0 bg-[#121212]/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#F9F9F7] border border-black/10 p-8 max-w-md w-full shadow-xl space-y-6"
          >
            <div className="space-y-2">
              <span className="font-mono text-[9px] text-red-600 tracking-[0.3em] uppercase block">
                Kunstwerk Verwijderen
              </span>
              <h3 className="font-serif text-xl text-[#121212] font-light uppercase tracking-wide">
                Weet u het zeker?
              </h3>
              <p className="font-sans text-xs text-neutral-600 font-light leading-relaxed">
                U staat op het punt om <strong className="font-medium text-[#121212] uppercase font-serif">"{sculptureToDelete.title}"</strong> permanent te verwijderen uit uw catalogus. Deze actie kan niet ongedaan worden gemaakt.
              </p>
            </div>
            <div className="flex space-x-3 font-mono text-[10px] tracking-widest uppercase">
              <button
                onClick={() => setSculptureToDelete(null)}
                className="flex-1 py-3 text-center border border-black/10 hover:bg-[#EFEBE7] transition-colors cursor-pointer text-[#121212]"
              >
                Annuleren
              </button>
              <button
                onClick={() => {
                  onDeleteSculpture(sculptureToDelete.id);
                  setSculptureToDelete(null);
                }}
                className="flex-1 py-3 text-center bg-red-600 hover:bg-red-700 text-white transition-colors cursor-pointer font-medium"
              >
                Ja, Verwijder
              </button>
            </div>
          </motion.div>
        </div>
      )}



      <div className="max-w-4xl mx-auto px-6">
        
        {/* Header Action Row */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-16 border-b border-black/5 pb-8">
          <div>
            <span className="font-mono text-[10px] text-neutral-500 tracking-[0.4em] uppercase block mb-1">
              STUDIO OPERATIONS
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#121212] font-light uppercase tracking-wide">
              Atelier Beheer
            </h1>
          </div>
          <div className="flex flex-wrap gap-3">
            {activeSubView === 'form' && (
              <button
                onClick={() => setActiveSubView('list')}
                className="flex items-center space-x-2 border border-black/10 hover:bg-[#EFEBE7] px-4 py-2 font-mono text-[10px] tracking-widest text-neutral-600 uppercase transition-colors cursor-pointer"
              >
                <ArrowLeft size={12} />
                <span>Terug Naar Overzicht</span>
              </button>
            )}

            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 bg-[#EFEBE7] hover:bg-[#e5dfd9] px-4 py-2 font-mono text-[10px] tracking-widest text-[#121212] uppercase transition-colors cursor-pointer"
            >
              <LogOut size={12} />
              <span>Uitloggen</span>
            </button>
          </div>
        </div>

        {/* Success Banner */}
        {isSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            max-width="md"
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 bg-emerald-50 border border-emerald-500/20 p-6 flex items-center space-x-4 text-emerald-800"
          >
            <div className="p-2 bg-emerald-500 text-white rounded-full">
              <Check size={16} />
            </div>
            <div>
              <p className="font-serif text-base font-medium">
                {editingSculptureId ? 'Kunstwerk succesvol bijgewerkt!' : 'Kunstwerk succesvol gepubliceerd!'}
              </p>
              <p className="font-sans text-xs text-emerald-600">
                De online catalogus is direct geüpdatet met de laatste wijzigingen.
              </p>
            </div>
          </motion.div>
        )}

        {activeSubView === 'list' ? (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="font-serif text-lg text-neutral-800 uppercase tracking-wider font-light">
                Catalogus Overzicht ({sculptures.length} kunstwerken)
              </h2>
              <button
                onClick={handleNewClick}
                className="flex items-center space-x-2 bg-[#121212] hover:bg-[#262626] text-[#F9F9F7] px-5 py-2.5 font-mono text-[10px] tracking-widest uppercase transition-colors cursor-pointer font-medium"
              >
                <Plus size={14} />
                <span>Nieuw Kunstwerk Toevoegen</span>
              </button>
            </div>

            <div className="border border-black/5 bg-white divide-y divide-black/5">
              {sculptures.map((sculpture) => (
                <div key={sculpture.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6 hover:bg-[#F9F9F7]/50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-neutral-100 overflow-hidden border border-black/5 shrink-0">
                      <img
                        src={sculpture.image}
                        alt={sculpture.title}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <h3 className="font-serif text-base text-[#121212] uppercase tracking-wide font-medium">
                        {sculpture.title}
                      </h3>
                      <p className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest mt-0.5">
                        {sculpture.material} &bull; {sculpture.year}
                      </p>
                      <p className="font-sans text-xs text-neutral-400 font-light mt-1">
                        {sculpture.dimensions}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <button
                      onClick={() => handleEditClick(sculpture)}
                      className="flex items-center space-x-1.5 font-mono text-[9px] tracking-wider uppercase text-neutral-600 hover:text-[#121212] border border-black/10 hover:border-black px-3 py-2 transition-all duration-200 cursor-pointer bg-white"
                      title="Bewerk dit kunstwerk"
                    >
                      <Edit size={12} />
                      <span>Bewerken</span>
                    </button>
                    <button
                      onClick={() => handleDeleteClick(sculpture)}
                      className="flex items-center space-x-1.5 font-mono text-[9px] tracking-wider uppercase text-red-600 hover:text-red-700 hover:bg-red-50/50 border border-red-500/10 hover:border-red-500/20 px-3 py-2 transition-all duration-200 cursor-pointer bg-white"
                      title="Verwijder dit kunstwerk"
                    >
                      <Trash2 size={12} />
                      <span>Verwijderen</span>
                    </button>
                  </div>
                </div>
              ))}
              {sculptures.length === 0 && (
                <div className="p-12 text-center text-neutral-400 space-y-4">
                  <p className="font-serif text-base italic">Geen kunstwerken gevonden in de catalogus.</p>
                  <button
                    onClick={handleNewClick}
                    className="inline-flex items-center space-x-2 bg-[#121212] text-white px-4 py-2 font-mono text-[10px] tracking-widest uppercase cursor-pointer"
                  >
                    <Plus size={12} />
                    <span>Voeg uw eerste kunstwerk toe</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-8 animate-fade-in">
            <div className="mb-4">
              <h2 className="font-serif text-xl text-[#121212] uppercase tracking-wider font-light pb-2 border-b border-black/5">
                {editingSculptureId ? `Kunstwerk Bewerken: ${title}` : 'Nieuw Kunstwerk Toevoegen'}
              </h2>
            </div>

            {formError && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 bg-red-50 border border-red-500/20 p-4 text-red-800 text-xs font-mono flex justify-between items-center"
              >
                <span>{formError}</span>
                <button
                  type="button"
                  onClick={() => setFormError('')}
                  className="hover:text-red-950 font-bold px-2 cursor-pointer text-sm"
                >
                  ✕
                </button>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-12">
              
              {/* Section 1: General Core Info */}
              <div className="space-y-6">
                <h3 className="font-serif text-xs text-neutral-500 tracking-[0.3em] uppercase border-b border-black/5 pb-2">
                  1. ALGEMENE INFORMATIE (VERPLICHT)
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  {/* Title */}
                  <div className="md:col-span-8 space-y-2">
                    <label className="font-mono text-[9px] text-neutral-500 tracking-widest uppercase block">
                      Titel van het Kunstwerk *
                    </label>
                    <input
                      type="text"
                      required
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Bijv. Morphic Flow II"
                      className="w-full bg-white border border-black/10 px-4 py-3 text-sm font-sans focus:outline-hidden focus:border-[#121212] transition-colors rounded-none text-[#121212]"
                    />
                  </div>

                  {/* Year */}
                  <div className="md:col-span-4 space-y-2">
                    <label className="font-mono text-[9px] text-neutral-500 tracking-widest uppercase block">
                      Jaar van Creatie *
                    </label>
                    <input
                      type="number"
                      required
                      min={2010}
                      max={2030}
                      value={year}
                      onChange={(e) => setYear(Number(e.target.value))}
                      className="w-full bg-white border border-black/10 px-4 py-3 text-sm font-sans focus:outline-hidden focus:border-[#121212] transition-colors rounded-none text-[#121212]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Material */}
                  <div className="space-y-2">
                    <label className="font-mono text-[9px] text-neutral-500 tracking-widest uppercase block">
                      Materiaal & Medium *
                    </label>
                    <input
                      type="text"
                      required
                      value={material}
                      onChange={(e) => setMaterial(e.target.value)}
                      placeholder="Bijv. Belgisch Hardsteen & Brons"
                      className="w-full bg-white border border-black/10 px-4 py-3 text-sm font-sans focus:outline-hidden focus:border-[#121212] transition-colors rounded-none text-[#121212]"
                    />
                  </div>

                  {/* Dimensions */}
                  <div className="space-y-2">
                    <label className="font-mono text-[9px] text-neutral-500 tracking-widest uppercase block">
                      Afmetingen (H × B × D in cm) *
                    </label>
                    <input
                      type="text"
                      required
                      value={dimensions}
                      onChange={(e) => setDimensions(e.target.value)}
                      placeholder="Bijv. 75 × 38 × 35 cm"
                      className="w-full bg-white border border-black/10 px-4 py-3 text-sm font-sans focus:outline-hidden focus:border-[#121212] transition-colors rounded-none text-[#121212]"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Visual Media representation */}
              <div className="space-y-6">
                <h3 className="font-serif text-xs text-neutral-500 tracking-[0.3em] uppercase border-b border-black/5 pb-2">
                  2. VISUEEL BEELDMATERIAAL *
                </h3>

                {/* Media Selector Tabs */}
                <div className="flex border border-black/10 font-mono text-[9px] tracking-widest uppercase">
                  <button
                    type="button"
                    onClick={() => setImageType('upload')}
                    className={`flex-1 py-3 text-center border-r border-black/10 transition-colors cursor-pointer ${
                      imageType === 'upload' ? 'bg-[#121212] text-white font-semibold' : 'bg-white hover:bg-neutral-50 text-neutral-600'
                    }`}
                  >
                    Lokale Foto Uploaden
                  </button>
                  <button
                    type="button"
                    onClick={() => setImageType('preset')}
                    className={`flex-1 py-3 text-center border-r border-black/10 transition-colors cursor-pointer ${
                      imageType === 'preset' ? 'bg-[#121212] text-white font-semibold' : 'bg-white hover:bg-neutral-50 text-neutral-600'
                    }`}
                  >
                    Gebruik Atelier Preset
                  </button>
                  <button
                    type="button"
                    onClick={() => setImageType('url')}
                    className={`flex-1 py-3 text-center transition-colors cursor-pointer ${
                      imageType === 'url' ? 'bg-[#121212] text-white font-semibold' : 'bg-white hover:bg-neutral-50 text-neutral-600'
                    }`}
                  >
                    Externe Afbeelding-URL
                  </button>
                </div>

                {/* Tab Panel 1: Upload */}
                {imageType === 'upload' && (
                  <div className="space-y-4">
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-black/10 bg-[#EFEBE7]/20 hover:bg-[#EFEBE7]/40 py-12 px-6 text-center cursor-pointer transition-colors flex flex-col items-center justify-center space-y-4"
                    >
                      <input
                        type="file"
                        ref={fileInputRef}
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      {uploadedBase64 ? (
                        <div className="relative group max-w-xs mx-auto">
                          <img
                            src={uploadedBase64}
                            alt="Preview"
                            className="max-h-48 w-auto object-cover border border-black/10"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                            <span className="text-white text-xs font-mono tracking-widest uppercase">Wijzig Foto</span>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="p-4 bg-white/80 rounded-full text-neutral-400">
                            <Upload size={24} className="stroke-1.5" />
                          </div>
                          <div className="space-y-1">
                            <p className="font-serif text-sm font-medium text-[#121212]">
                              Sleep uw foto hierheen, of klik om te bladeren
                            </p>
                            <p className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest">
                              PNG, JPG of WEBP (Max 2MB voor opslag)
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}

                {/* Tab Panel 2: Presets */}
                {imageType === 'preset' && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {PRESET_IMAGES.map((preset) => {
                      const isSelected = selectedPreset === preset.path;
                      return (
                        <div
                          key={preset.path}
                          onClick={() => setSelectedPreset(preset.path)}
                          className={`relative cursor-pointer overflow-hidden border transition-all duration-300 aspect-square ${
                            isSelected ? 'border-[#121212] ring-1 ring-[#121212]' : 'border-black/5 opacity-60 hover:opacity-100'
                          }`}
                        >
                          <img
                            src={preset.path}
                            alt={preset.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute bottom-0 inset-x-0 bg-black/60 p-2 text-center">
                            <p className="font-mono text-[8px] text-white tracking-widest uppercase truncate">
                              {preset.name}
                            </p>
                          </div>
                          {isSelected && (
                            <div className="absolute top-2 right-2 bg-[#121212] text-white p-1 rounded-full">
                              <Check size={10} />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Tab Panel 3: URL */}
                {imageType === 'url' && (
                  <div className="space-y-2">
                    <label className="font-mono text-[9px] text-neutral-500 tracking-widest uppercase block">
                      Afbeelding-URL
                    </label>
                    <input
                      type="url"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      placeholder="https://images.unsplash.com/... of andere web-link"
                      className="w-full bg-white border border-black/10 px-4 py-3 text-sm font-sans focus:outline-hidden focus:border-[#121212] transition-colors rounded-none text-[#121212]"
                    />
                  </div>
                )}
              </div>

              {/* Section 3: Narratives & Descriptions */}
              <div className="space-y-6">
                <h3 className="font-serif text-xs text-neutral-500 tracking-[0.3em] uppercase border-b border-black/5 pb-2">
                  3. ARTISTIEK CONTEXT & VERHAAL
                </h3>

                {/* Short Description */}
                <div className="space-y-2">
                  <label className="font-mono text-[9px] text-neutral-500 tracking-widest uppercase block">
                    Artistieke Beschrijving / Introductie *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Geef een filosofische en beschrijvende inleiding over het werk, de compositie en hoe het interacteert met de ruimte."
                    className="w-full bg-white border border-black/10 p-4 text-sm font-serif italic focus:outline-hidden focus:border-[#121212] transition-colors rounded-none text-neutral-800"
                  />
                </div>

                {/* Creative Process */}
                <div className="space-y-2">
                  <label className="font-mono text-[9px] text-neutral-500 tracking-widest uppercase block">
                    Creatief Proces (Optioneel)
                  </label>
                  <textarea
                    rows={3}
                    value={creativeProcess}
                    onChange={(e) => setCreativeProcess(e.target.value)}
                    placeholder="Beschrijf hoe het werk stap voor stap is gebeeldhouwd, bijv. over het handmatig raspen of polijsten."
                    className="w-full bg-white border border-black/10 p-4 text-sm font-sans focus:outline-hidden focus:border-[#121212] transition-colors rounded-none text-neutral-700 font-light"
                  />
                </div>

                {/* Inspiration */}
                <div className="space-y-2">
                  <label className="font-mono text-[9px] text-neutral-500 tracking-widest uppercase block">
                    Inspiratiebron (Optioneel)
                  </label>
                  <textarea
                    rows={3}
                    value={inspiration}
                    onChange={(e) => setInspiration(e.target.value)}
                    placeholder="Wat vormde de vonk voor dit beeldhouwwerk? Bijv. tektonische verschuivingen, vloeibaarheid van gletsjers of kosmische stilte."
                    className="w-full bg-white border border-black/10 p-4 text-sm font-sans focus:outline-hidden focus:border-[#121212] transition-colors rounded-none text-neutral-700 font-light"
                  />
                </div>
              </div>

              {/* Section 4: Technical Specifications */}
              <div className="space-y-6">
                <h3 className="font-serif text-xs text-neutral-500 tracking-[0.3em] uppercase border-b border-black/5 pb-2">
                  4. SPECIFICATIES & EXPOSITIE DETAILS (OPTIONEEL)
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Form shape */}
                  <div className="space-y-2">
                    <label className="font-mono text-[9px] text-neutral-500 tracking-widest uppercase block">
                      Vormtaal (Form)
                    </label>
                    <input
                      type="text"
                      value={formDetail}
                      onChange={(e) => setFormDetail(e.target.value)}
                      placeholder="Bijv. Golvende biomorfe contouren"
                      className="w-full bg-white border border-black/10 px-4 py-3 text-sm font-sans focus:outline-hidden focus:border-[#121212] transition-colors rounded-none text-[#121212]"
                    />
                  </div>

                  {/* Weight */}
                  <div className="space-y-2">
                    <label className="font-mono text-[9px] text-neutral-500 tracking-widest uppercase block">
                      Gewicht (Weight)
                    </label>
                    <input
                      type="text"
                      value={weightDetail}
                      onChange={(e) => setWeightDetail(e.target.value)}
                      placeholder="Bijv. Ca. 35 kg"
                      className="w-full bg-white border border-black/10 px-4 py-3 text-sm font-sans focus:outline-hidden focus:border-[#121212] transition-colors rounded-none text-[#121212]"
                    />
                  </div>

                  {/* Exhibition History */}
                  <div className="space-y-2">
                    <label className="font-mono text-[9px] text-neutral-500 tracking-widest uppercase block">
                      Expositiegeschiedenis (Exhibition)
                    </label>
                    <input
                      type="text"
                      value={exhibitionDetail}
                      onChange={(e) => setExhibitionDetail(e.target.value)}
                      placeholder="Bijv. Solotentoonstelling 'Silence of Mass', Rotterdam 2026."
                      className="w-full bg-white border border-black/10 px-4 py-3 text-sm font-sans focus:outline-hidden focus:border-[#121212] transition-colors rounded-none text-[#121212]"
                    />
                  </div>

                  {/* Acquisition status */}
                  <div className="space-y-2">
                    <label className="font-mono text-[9px] text-neutral-500 tracking-widest uppercase block">
                      Verwervingsstatus (Acquisition)
                    </label>
                    <input
                      type="text"
                      value={acquisitionDetail}
                      onChange={(e) => setAcquisitionDetail(e.target.value)}
                      placeholder="Bijv. Beschikbaar via Studio Liam Oeij."
                      className="w-full bg-white border border-black/10 px-4 py-3 text-sm font-sans focus:outline-hidden focus:border-[#121212] transition-colors rounded-none text-[#121212]"
                    />
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              <div className="pt-8 border-t border-black/5 flex flex-col sm:flex-row justify-end items-center gap-4">
                <button
                  type="button"
                  onClick={() => setActiveSubView('list')}
                  className="w-full sm:w-auto px-8 py-3.5 border border-black/10 hover:bg-[#EFEBE7] font-mono text-[10px] tracking-widest text-[#121212] uppercase transition-colors text-center cursor-pointer"
                >
                  Annuleren
                </button>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-12 py-4 bg-[#121212] hover:bg-neutral-800 text-[#F9F9F7] font-mono text-[10px] tracking-widest uppercase transition-colors text-center cursor-pointer font-medium"
                >
                  {editingSculptureId ? 'Wijzigingen Opslaan' : 'Kunstwerk Publiceren'}
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
