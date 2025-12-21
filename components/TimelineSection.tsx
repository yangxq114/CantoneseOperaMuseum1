import React from 'react';
import { PlayData } from '../types';

interface TimelineSectionProps {
  play: PlayData;
}

const TimelineSection: React.FC<TimelineSectionProps> = ({ play }) => {
  return (
    <div className="my-16">
         <div className="flex items-center gap-2 mb-10">
            <span className="text-3xl">📜</span>
            <h3 className="text-2xl font-serif font-bold text-opera-ink">名场面 Key Scenes</h3>
        </div>

        <div className="relative border-l-4 border-opera-gold/30 ml-4 md:ml-10 space-y-12">
            {play.timeline.map((event, index) => (
                <div key={index} className="relative pl-8 md:pl-12 group">
                    {/* Dot */}
                    <div className="absolute -left-[10px] top-2 w-5 h-5 rounded-full bg-opera-red border-4 border-paper shadow-md group-hover:scale-125 transition-transform duration-300"></div>
                    
                    {/* Content Card */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-stone-100 hover:shadow-md transition-shadow">
                        <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 mb-2">
                             <h4 className="text-xl font-serif font-bold text-opera-ink">{event.sceneTitle}</h4>
                             {event.year && <span className="text-xs text-stone-400 font-mono">{event.year}</span>}
                        </div>
                        <p className="text-stone-600 text-sm leading-relaxed font-sans">
                            {event.description}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
};

export default TimelineSection;