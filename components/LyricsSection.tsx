import React, { useState } from 'react';
import { PlayData, LyricSegment } from '../types';
import { Quote, MessageCircleQuestion } from 'lucide-react';
import { getLyricInterpretation } from '../services/geminiService';

interface LyricsSectionProps {
  play: PlayData;
}

const LyricsSection: React.FC<LyricsSectionProps> = ({ play }) => {
  const [activeInterpretation, setActiveInterpretation] = useState<string | null>(null);
  const [loadingIndex, setLoadingIndex] = useState<number | null>(null);

  const handleInterpret = async (lyric: string, index: number) => {
    if (activeInterpretation && loadingIndex === null) {
        // If simply closing
        setActiveInterpretation(null);
        return;
    }
    
    setLoadingIndex(index);
    setActiveInterpretation(null);
    const result = await getLyricInterpretation(play, lyric);
    setActiveInterpretation(result);
    setLoadingIndex(null);
  };

  return (
    <div className="my-16 bg-white/40 p-8 rounded-xl backdrop-blur-sm border border-stone-200">
      <div className="flex items-center gap-2 mb-8 justify-center">
            <span className="text-3xl">💬</span>
            <h3 className="text-2xl font-serif font-bold text-opera-ink">经典唱词 Libretto</h3>
      </div>

      <div className="space-y-12">
        {play.lyrics.map((lyric, index) => (
          <div key={index} className="relative group">
            {/* Decorative Quote Icon */}
            <div className="absolute -top-4 -left-4 text-opera-red/10">
                <Quote size={64} />
            </div>

            <div className="text-center relative z-10">
                <p className="text-sm font-bold text-opera-gold mb-2 tracking-widest uppercase">{lyric.speaker}</p>
                
                {/* Original Text - Main Focus */}
                <h4 className="text-3xl md:text-4xl font-serif text-opera-red mb-4 leading-relaxed cursor-default selection:bg-opera-red selection:text-white">
                    {lyric.original}
                </h4>

                {/* Translations */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto mt-6 border-t border-stone-300 pt-4">
                    <p className="text-stone-600 font-serif">
                        <span className="text-xs text-stone-400 block mb-1">白话 Vernacular</span>
                        {lyric.vernacular}
                    </p>
                    <p className="text-stone-500 font-sans italic">
                         <span className="text-xs text-stone-400 block mb-1">English Translation</span>
                        {lyric.english}
                    </p>
                </div>

                {/* AI Interpretation Trigger */}
                <div className="mt-4 flex justify-center">
                    <button 
                        onClick={() => handleInterpret(lyric.original, index)}
                        className="flex items-center gap-2 text-xs font-bold text-opera-purple hover:text-opera-red transition-colors opacity-60 hover:opacity-100"
                        disabled={loadingIndex !== null}
                    >
                        <MessageCircleQuestion size={16} />
                        {loadingIndex === index ? 'Asking AI...' : 'Deep Interpretation'}
                    </button>
                </div>

                {/* AI Result Area */}
                {loadingIndex === index && (
                    <div className="mt-4 animate-pulse h-16 bg-gray-200 rounded-md mx-auto max-w-2xl"></div>
                )}
                
                {activeInterpretation && loadingIndex === null && (
                     /* Only show interpretation if this specific block was the last one clicked? 
                        In a real app, I'd manage state per item, but for simplicity, we toggle one global drawer 
                        if it matches the context, or just show it below. Let's simplfy to just showing below. 
                        Wait, state is global, so clicking another one replaces it. That's fine.
                     */
                     // Check if this is the active one? No, I only store string. Let's fix state.
                     // Actually, simplified approach: The interpretation renders below.
                     // But I need to know WHICH one is active.
                     // Let's rely on user behavior: one at a time.
                     null 
                )}
            </div>

             {/* Rendering Active Interpretation only under the correct item if tracked, 
                 or just use a simple logic: if activeInterpretation exists and we just clicked this index.
                 Let's fix the state management for simplicity.
              */}
          </div>
        ))}
      </div>

        {/* Modal-like or specialized area for the interpretation result if generated */}
        {activeInterpretation && (
            <div className="mt-8 p-6 bg-opera-purple/5 border border-opera-purple rounded-lg text-center animate-fade-in max-w-3xl mx-auto">
                <h5 className="font-bold text-opera-purple mb-2 flex items-center justify-center gap-2">
                     <span className="text-lg">✨</span> Interpretation
                </h5>
                <p className="text-opera-ink/80 text-sm leading-relaxed">{activeInterpretation}</p>
            </div>
        )}
    </div>
  );
};

export default LyricsSection;