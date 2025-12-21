import React, { useState } from 'react';
import { PlayData } from '../types';
import { Sparkles, X } from 'lucide-react';

interface IntroSectionProps {
  play: PlayData;
}

const IntroSection: React.FC<IntroSectionProps> = ({ play }) => {
  const [showEgg, setShowEgg] = useState(false);

  return (
    <div className="relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 animate-fade-in-up">
        <div className="bg-opera-paper border-2 border-opera-red p-6 shadow-lg transform -rotate-1 relative">
            <h2 className="text-3xl font-serif text-opera-red mb-4 border-b border-opera-gold pb-2">
            {play.title}
            </h2>
            <p className="text-lg text-opera-ink leading-loose font-serif">
            {play.intro.zh}
            </p>

            {/* Hidden Easter Egg Trigger */}
            <div 
                className="absolute bottom-2 right-2 opacity-30 hover:opacity-100 transition-opacity cursor-pointer animate-bounce hover:animate-none"
                onClick={() => setShowEgg(true)}
                title={play.easterEgg.hint}
            >
                <span className="text-2xl filter drop-shadow-md grayscale hover:grayscale-0 transition-all duration-500">{play.easterEgg.triggerIcon}</span>
            </div>
        </div>
        
        <div className="bg-opera-ink p-6 shadow-lg transform rotate-1 flex flex-col justify-center">
            <h2 className="text-2xl font-sans text-opera-gold mb-4 border-b border-gray-600 pb-2">
            {play.titleEn}
            </h2>
            <p className="text-md text-gray-300 leading-relaxed font-sans">
            {play.intro.en}
            </p>
        </div>
        </div>

        {/* Easter Egg Modal */}
        {showEgg && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
                <div className="bg-opera-paper border-4 border-opera-gold p-8 max-w-md rounded-lg shadow-2xl relative text-center">
                    <button 
                        onClick={() => setShowEgg(false)}
                        className="absolute top-2 right-2 text-opera-ink hover:text-opera-red transition-colors"
                    >
                        <X size={24} />
                    </button>
                    
                    <div className="text-4xl mb-4 animate-spin-slow inline-block">{play.easterEgg.triggerIcon}</div>
                    <h3 className="text-2xl font-serif font-bold text-opera-red mb-2">{play.easterEgg.title}</h3>
                    <div className="w-16 h-1 bg-opera-gold mx-auto mb-4"></div>
                    <p className="text-opera-ink font-serif leading-relaxed">
                        {play.easterEgg.content}
                    </p>
                    <div className="mt-6 text-xs text-stone-500 uppercase tracking-widest">Secret Discovered</div>
                </div>
            </div>
        )}
    </div>
  );
};

export default IntroSection;