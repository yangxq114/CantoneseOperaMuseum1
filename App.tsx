import React, { useState } from 'react';
import { PlayId, PlayData } from './types';
import { PLAYS } from './constants';
import IntroSection from './components/IntroSection';
import CharacterGraph from './components/CharacterGraph';
import LyricsSection from './components/LyricsSection';
import TimelineSection from './components/TimelineSection';
import SocialSection from './components/SocialSection';
import OperaMap from './components/OperaMap';
import { ChevronLeft, Map as MapIcon } from 'lucide-react';

const App: React.FC = () => {
  const [currentPlayId, setCurrentPlayId] = useState<PlayId | null>(null);
  const [showMap, setShowMap] = useState(false);

  const currentPlay: PlayData | undefined = currentPlayId ? PLAYS[currentPlayId] : undefined;

  const handleBack = () => {
    setCurrentPlayId(null);
    setShowMap(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShowMap = () => {
    setShowMap(true);
    setCurrentPlayId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div className={`min-h-screen overflow-x-hidden selection:bg-opera-gold selection:text-white transition-colors duration-700 ${(currentPlay || showMap) ? 'bg-[#F5F5DC] text-opera-ink' : 'bg-[#0f0505] text-stone-200'}`}>
      
      {/* Header / Nav */}
      <header className={`fixed top-0 left-0 w-full z-50 h-16 flex items-center px-4 md:px-8 justify-between shadow-sm transition-all duration-500 ${(currentPlay || showMap) ? 'bg-[#F5F5DC]/90 backdrop-blur-md border-b border-stone-200' : 'bg-transparent border-none'}`}>
        <div className="flex items-center gap-4">
          {(currentPlayId || showMap) && (
            <button 
              onClick={handleBack}
              className="p-2 hover:bg-black/5 rounded-full transition-colors group"
            >
              <ChevronLeft className="group-hover:-translate-x-1 transition-transform text-opera-ink" />
            </button>
          )}
          <h1 
            className={`text-lg md:text-xl font-serif font-bold tracking-widest cursor-pointer ${(currentPlay || showMap) ? 'text-opera-red' : 'text-opera-gold drop-shadow-lg'}`} 
            onClick={handleBack}
          >
            一出戏，一世界 <span className={`opacity-50 mx-2 text-sm font-sans font-normal ${(currentPlay || showMap) ? 'text-black' : 'text-stone-300'}`}>Opera World</span>
          </h1>
        </div>
        <div className="flex items-center gap-6">
            {!showMap && !currentPlay && (
                <button 
                    onClick={handleShowMap}
                    className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-opera-gold text-opera-gold text-xs font-bold hover:bg-opera-gold hover:text-black transition-all"
                >
                    <MapIcon size={14} />
                    EXPLORE MAP
                </button>
            )}
            <div className="hidden md:block text-xs text-stone-400 font-sans">
                Cantonese Opera Micro-Exhibition
            </div>
        </div>
      </header>

      <main className="pt-0 min-h-screen">
        
        {/* Gallery View (Theatre Lobby Design) */}
        {!currentPlay && !showMap && (
          <div className="relative min-h-screen flex flex-col items-center pt-24 pb-12 animate-fade-in">
             
             {/* Theatre Curtains CSS Effect */}
             <div className="fixed top-0 left-0 w-24 md:w-48 h-full bg-gradient-to-r from-red-950 to-red-900 z-0 shadow-2xl pointer-events-none hidden lg:block"></div>
             <div className="fixed top-0 right-0 w-24 md:w-48 h-full bg-gradient-to-l from-red-950 to-red-900 z-0 shadow-2xl pointer-events-none hidden lg:block"></div>
             <div className="fixed top-0 left-0 w-full h-24 bg-gradient-to-b from-red-950 to-transparent z-0 pointer-events-none"></div>

             {/* Stage Lighting Effect */}
             <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#000000_100%)] opacity-80 pointer-events-none z-0"></div>

             <div className="relative z-10 w-full max-w-6xl px-4 md:px-12 mx-auto">
                <div className="text-center mb-12 space-y-4">
                    <div className="inline-block border-2 border-opera-gold/30 px-6 py-2 rounded-full mb-4 bg-black/40 backdrop-blur">
                        <span className="text-opera-gold font-sans tracking-[0.2em] text-xs">NOW SHOWING</span>
                    </div>
                    <h2 className="text-5xl md:text-7xl font-serif text-white drop-shadow-[0_0_15px_rgba(212,175,55,0.5)] mt-2">梨园遗梦</h2>
                    <p className="text-stone-400 max-w-md mx-auto font-serif italic text-lg">Step into the spotlight of history</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {Object.values(PLAYS).map((play) => (
                    <div 
                        key={play.id}
                        onClick={() => setCurrentPlayId(play.id)}
                        className="group cursor-pointer perspective-1000 relative"
                    >
                        {/* Poster Frame */}
                        <div className="relative h-[520px] w-full bg-stone-900 rounded-lg overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)] transition-all duration-500 group-hover:shadow-[0_20px_50px_rgba(212,175,55,0.2)] group-hover:-translate-y-4 border-[6px] border-amber-900/50 group-hover:border-opera-gold">
                            <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-black/80 z-20 pointer-events-none"></div>
                            <img 
                                src={play.coverImage} 
                                alt={play.title} 
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter brightness-75 group-hover:brightness-100"
                            />
                            <div className="absolute top-6 right-6 bg-paper-texture px-4 py-8 shadow-black shadow-lg z-30 border-2 border-amber-900">
                                <h3 className="text-3xl font-serif font-bold text-opera-red vertical-text h-full tracking-widest drop-shadow-sm">
                                {play.title}
                                </h3>
                            </div>
                            <div className="absolute bottom-0 left-0 w-full p-6 z-30 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-80 group-hover:opacity-100">
                                <div className="w-10 h-1 bg-opera-gold mb-4 transition-all group-hover:w-full duration-500"></div>
                                <p className="text-white text-xl font-serif tracking-wide">{play.titleEn}</p>
                                <p className="text-opera-gold text-xs uppercase mt-2 opacity-0 group-hover:opacity-100 transition-opacity delay-100">Click to enter world</p>
                            </div>
                        </div>
                    </div>
                    ))}
                </div>

                <footer className="mt-24 text-center text-stone-600 text-xs pb-8 font-sans">
                    <p>© 2024 Opera World Exhibition. Powered by Google Gemini.</p>
                </footer>
             </div>
          </div>
        )}

        {/* Map View */}
        {showMap && (
            <div className="animate-fade-in px-4 md:px-8 max-w-7xl mx-auto pt-24 pb-20">
                <OperaMap />
                <div className="text-center mt-12">
                     <button onClick={handleBack} className="px-10 py-3 bg-opera-red text-white font-bold rounded shadow-lg hover:bg-opera-ink transition-all">
                        Exit Map View
                     </button>
                </div>
            </div>
        )}

        {/* Detail View (Original Light Theme) */}
        {currentPlay && (
          <div className="animate-fade-in pb-12 px-4 md:px-8 max-w-6xl mx-auto pt-24">
            {/* 1. Introduction with Easter Egg */}
            <IntroSection play={currentPlay} />

            <div className="grid grid-cols-1 gap-12">
                {/* 2. Character Map */}
                <section className="bg-white/60 p-1 md:p-8 rounded-2xl shadow-sm border border-stone-200">
                     <CharacterGraph play={currentPlay} />
                </section>

                {/* 3. Lyrics */}
                <section>
                    <LyricsSection play={currentPlay} />
                </section>

                {/* 4. Timeline */}
                <section className="bg-white/60 p-4 md:p-8 rounded-2xl shadow-sm border border-stone-200">
                    <TimelineSection play={currentPlay} />
                </section>

                {/* 5. Social & Comments */}
                <section>
                    <SocialSection play={currentPlay} />
                </section>
            </div>
            
            <div className="mt-20 text-center pb-12">
                 <button onClick={handleBack} className="px-8 py-3 bg-opera-ink text-opera-gold font-bold rounded hover:bg-opera-red transition-colors shadow-lg">
                    Return to Lobby
                 </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
