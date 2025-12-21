import React, { useState } from 'react';
import { MapLayerType, MapMarker, PlayId } from '../types';
import { MAP_MARKERS, PLAYS } from '../constants';
import { Map as MapIcon, Globe, Info, PlayCircle, X, ChevronLeft, Building2, Calendar } from 'lucide-react';

const OperaMap: React.FC = () => {
  const [activeLayer, setActiveLayer] = useState<MapLayerType>(MapLayerType.DRAMATIC);
  const [selectedMarker, setSelectedMarker] = useState<MapMarker | null>(null);
  const [viewingCity, setViewingCity] = useState<MapMarker | null>(null);

  const markersToShow = viewingCity ? (viewingCity.subMarkers || []) : MAP_MARKERS.filter(m => m.type === activeLayer);

  const handleMarkerClick = (marker: MapMarker) => {
    setSelectedMarker(marker);
  };

  const drillDown = (city: MapMarker) => {
    setViewingCity(city);
    setSelectedMarker(null);
  };

  const backToGlobal = () => {
    setViewingCity(null);
    setSelectedMarker(null);
  };

  // Background images for different map layers and cities
  const dramaticBgUrl = "https://raw.githubusercontent.com/shinnyyyy0114-crypto/CantoneseMuseumPic/refs/heads/main/%E7%94%9F%E6%88%90%E5%8F%A4%E9%A3%8E%E7%B2%A4%E5%89%A7%E8%88%9E%E5%8F%B0%E8%83%8C%E6%99%AF%E5%9B%BE(1).png";
  const realBgUrl = "https://raw.githubusercontent.com/shinnyyyy0114-crypto/CantoneseMuseumPic/refs/heads/main/%E5%8F%A4%E9%A3%8E%E5%9C%B0%E5%9B%BE.png";
  
  // City-specific backgrounds
  const gzBgUrl = "https://raw.githubusercontent.com/shinnyyyy0114-crypto/CantoneseMuseumPic/refs/heads/main/%E5%B9%BF%E5%B7%9E.png";
  const hkBgUrl = "https://raw.githubusercontent.com/shinnyyyy0114-crypto/CantoneseMuseumPic/refs/heads/main/%E9%A6%99%E6%B8%AF.png";
  const seaBgUrl = "https://raw.githubusercontent.com/shinnyyyy0114-crypto/CantoneseMuseumPic/refs/heads/main/%E4%B8%9C%E5%8D%97%E4%BA%9A.png";

  const mapStyle: React.CSSProperties = {
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    transition: 'background-image 0.5s ease-in-out'
  };

  if (viewingCity) {
    // Determine city background based on ID
    if (viewingCity.id === 'guangzhou') {
      mapStyle.backgroundImage = `url('${gzBgUrl}')`;
    } else if (viewingCity.id === 'hongkong') {
      mapStyle.backgroundImage = `url('${hkBgUrl}')`;
    } else if (viewingCity.id === 'southeastasia') {
      mapStyle.backgroundImage = `url('${seaBgUrl}')`;
    }
  } else {
    // Global layer backgrounds
    if (activeLayer === MapLayerType.DRAMATIC) {
      mapStyle.backgroundImage = `url('${dramaticBgUrl}')`;
    } else if (activeLayer === MapLayerType.REAL) {
      mapStyle.backgroundImage = `url('${realBgUrl}')`;
    }
  }

  return (
    <div className="my-20 relative">
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
        <div className="flex items-center gap-3">
            <span className="text-4xl">🗺️</span>
            <div>
                <h3 className="text-3xl font-serif font-bold text-opera-ink">粤剧地图 Cantonese Opera Map</h3>
                {viewingCity && (
                    <div className="flex items-center gap-2 text-opera-red text-sm font-bold">
                        <ChevronLeft size={16} />
                        <span>{viewingCity.name} 详情 City Detail</span>
                    </div>
                )}
            </div>
        </div>

        {!viewingCity && (
            <div className="flex bg-opera-ink/5 p-1 rounded-full border border-stone-300">
                <button 
                    onClick={() => {setActiveLayer(MapLayerType.DRAMATIC); setSelectedMarker(null);}}
                    className={`px-6 py-2 rounded-full font-serif text-sm transition-all ${activeLayer === MapLayerType.DRAMATIC ? 'bg-opera-red text-white shadow-md' : 'text-stone-500 hover:text-opera-red'}`}
                >
                    戏内空间 Dramatic
                </button>
                <button 
                    onClick={() => {setActiveLayer(MapLayerType.REAL); setSelectedMarker(null);}}
                    className={`px-6 py-2 rounded-full font-serif text-sm transition-all ${activeLayer === MapLayerType.REAL ? 'bg-opera-gold text-white shadow-md' : 'text-stone-500 hover:text-opera-gold'}`}
                >
                    现实传播 Real/History
                </button>
            </div>
        )}
        
        {viewingCity && (
            <button 
                onClick={backToGlobal}
                className="px-6 py-2 rounded-full bg-stone-800 text-white font-serif text-sm hover:bg-opera-red transition-all shadow-md flex items-center gap-2"
            >
                <ChevronLeft size={16} /> 返回主地图 Global Map
            </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div 
            className="lg:col-span-3 relative aspect-[16/9] bg-paper-texture border-4 border-amber-900/20 rounded-xl overflow-hidden shadow-inner group transition-all duration-500"
            style={mapStyle}
        >
            <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/dark-wood.png')] grayscale"></div>
            
            <div className="absolute top-4 left-4 bg-white/80 backdrop-blur px-3 py-1 rounded-md text-xs font-bold border border-stone-200 z-10 flex items-center gap-2">
                {viewingCity ? <Building2 size={14} className="text-opera-red" /> : (activeLayer === MapLayerType.DRAMATIC ? <PlayCircle size={14} className="text-opera-red" /> : <Globe size={14} className="text-opera-gold" />)}
                <span className="uppercase tracking-widest">
                    {viewingCity ? `${viewingCity.nameEn} Detailed Layout` : (activeLayer === MapLayerType.DRAMATIC ? 'Spatial Narrative' : 'Transmission History')}
                </span>
            </div>

            {viewingCity && (
                <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
                     <span className="text-[20vw] font-serif font-black">{viewingCity.name}</span>
                </div>
            )}

            {markersToShow.map(marker => (
                <button
                    key={marker.id}
                    onClick={() => handleMarkerClick(marker)}
                    style={{ left: `${marker.x}%`, top: `${marker.y}%` }}
                    className={`absolute transform -translate-x-1/2 -translate-y-1/2 p-2 rounded-full shadow-lg transition-all hover:scale-125 z-20 group/marker
                        ${marker.subMarkers ? 'animate-pulse scale-110' : ''}
                        ${activeLayer === MapLayerType.DRAMATIC || viewingCity ? 'bg-opera-red text-white ring-4 ring-red-100' : 'bg-opera-gold text-white ring-4 ring-amber-100'}`}
                >
                    <div className="relative">
                        {marker.subMarkers ? <Building2 size={24} /> : <MapIcon size={20} />}
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-[10px] rounded opacity-0 group-hover/marker:opacity-100 transition-opacity whitespace-nowrap z-50">
                            {marker.name} {marker.subMarkers ? '(Click for detail)' : ''}
                        </div>
                    </div>
                </button>
            ))}
        </div>

        <div className="lg:col-span-1 bg-white p-6 rounded-xl border border-stone-200 shadow-sm flex flex-col max-h-[600px] overflow-y-auto">
            {!selectedMarker ? (
                <div className="flex-grow flex flex-col items-center justify-center text-center text-stone-400 py-12">
                    <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mb-4">
                        <Info size={32} />
                    </div>
                    <p className="font-serif italic">
                        {viewingCity ? `探索 ${viewingCity.name} 的具体戏院地点。` : "Select a point on the map to unveil the story."}
                    </p>
                </div>
            ) : (
                <div className="animate-fade-in flex flex-col h-full">
                    <div className="flex justify-between items-start mb-4">
                        <div className="px-2 py-1 bg-stone-100 rounded text-[10px] font-bold text-stone-500 uppercase tracking-wider">
                            {selectedMarker.categoryEn}
                        </div>
                        <button onClick={() => setSelectedMarker(null)} className="text-stone-300 hover:text-stone-900 transition-colors">
                            <X size={20} />
                        </button>
                    </div>

                    <h4 className="text-2xl font-serif font-bold text-opera-red mb-1">{selectedMarker.name}</h4>
                    <p className="text-sm text-stone-400 font-sans mb-3">{selectedMarker.nameEn}</p>

                    <div className="space-y-4">
                        {selectedMarker.period && (
                            <div className="flex items-center gap-2 text-xs font-bold text-stone-500 bg-stone-100 p-2 rounded">
                                <Calendar size={14} className="text-opera-gold" />
                                <span>时代 / Period: {selectedMarker.period}</span>
                            </div>
                        )}

                        {selectedMarker.role && (
                             <div className="p-3 bg-red-50/50 rounded-lg border-l-4 border-opera-red">
                                <h5 className="text-[10px] font-bold text-opera-red uppercase mb-1">戏院/城市角色 Role</h5>
                                <p className="text-sm font-serif leading-relaxed text-stone-800">
                                    {selectedMarker.role}
                                </p>
                            </div>
                        )}

                        {selectedMarker.functions && (
                             <div className="p-3 bg-stone-50 rounded-lg">
                                <h5 className="text-[10px] font-bold text-stone-400 uppercase mb-1">功能说明 Functions</h5>
                                <p className="text-sm font-sans leading-relaxed text-stone-700">
                                    {selectedMarker.functions}
                                </p>
                            </div>
                        )}

                        <div className="p-3 bg-stone-50 rounded-lg border-l-4 border-opera-gold">
                            <p className="text-sm font-serif leading-relaxed text-stone-700 italic">
                                "{selectedMarker.description}"
                            </p>
                        </div>

                        {selectedMarker.significance && (
                            <div>
                                <h5 className="text-xs font-bold text-stone-400 uppercase mb-2">代表意义 Significance</h5>
                                <p className="text-stone-600 text-sm leading-relaxed">
                                    {selectedMarker.significance}
                                </p>
                            </div>
                        )}

                        {selectedMarker.subMarkers && (
                            <div className="pt-4 mt-4 border-t border-stone-200">
                                <button 
                                    onClick={() => drillDown(selectedMarker)}
                                    className="w-full py-3 bg-opera-red text-white rounded font-bold text-sm shadow-md hover:bg-opera-ink transition-all flex items-center justify-center gap-2"
                                >
                                    <MapIcon size={16} /> 进入细节地图 View City Detail
                                </button>
                            </div>
                        )}

                        {selectedMarker.plays && selectedMarker.plays.length > 0 && (
                            <div>
                                <h5 className="text-xs font-bold text-stone-400 uppercase mb-2">Related Plays / 关联剧目</h5>
                                <div className="flex flex-wrap gap-2">
                                    {selectedMarker.plays.map(pId => (
                                        <span key={pId} className="px-2 py-1 bg-opera-red/10 text-opera-red text-[10px] font-bold rounded">
                                            {PLAYS[pId]?.title}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default OperaMap;