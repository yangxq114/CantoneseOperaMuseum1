import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { PlayData, CharacterNode, CharacterLink } from '../types';
import { getCharacterInsight } from '../services/geminiService';
import { Loader2, Sparkles } from 'lucide-react';

interface CharacterGraphProps {
  play: PlayData;
}

const CharacterGraph: React.FC<CharacterGraphProps> = ({ play }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedChar, setSelectedChar] = useState<CharacterNode | null>(null);
  const [aiInsight, setAiInsight] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Handle Gemini Insight Request
  const handleNodeClick = async (char: CharacterNode) => {
    setSelectedChar(char);
    setLoading(true);
    setAiInsight(null);
    try {
      const insight = await getCharacterInsight(play, char.name);
      setAiInsight(insight);
    } catch (e) {
      setAiInsight("Could not fetch insight.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    // Clear previous graph
    d3.select(svgRef.current).selectAll("*").remove();

    const width = containerRef.current.clientWidth;
    const height = 500;

    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height]);

    // Data copy to avoid mutation issues
    const nodes: any[] = play.characters.nodes.map(d => ({ ...d }));
    const links: any[] = play.characters.links.map(d => ({ ...d }));

    const simulation = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(links).id((d: any) => d.id).distance(150))
      .force("charge", d3.forceManyBody().strength(-400))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collide", d3.forceCollide().radius(40));

    // Draw Lines
    const link = svg.append("g")
      .attr("stroke-opacity", 0.6)
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke-width", d => Math.sqrt(d.value) * 2)
      // Check if either connected node is 'Abstract' (representing the system)
      .attr("stroke", (d: any) => {
        const isAbstractLink = d.source.roleType === 'Abstract' || d.target.roleType === 'Abstract';
        return isAbstractLink ? "#999" : "#8B0000";
      })
      // Apply dashed line style for abstract relationships (system vs individual)
      .attr("stroke-dasharray", (d: any) => {
        const isAbstractLink = d.source.roleType === 'Abstract' || d.target.roleType === 'Abstract';
        return isAbstractLink ? "5,5" : "none";
      });

    // Link Labels
    const linkLabel = svg.append("g")
        .selectAll("text")
        .data(links)
        .enter().append("text")
        .attr("class", "link-label")
        .attr("font-size", "10px")
        .attr("fill", "#555")
        .attr("text-anchor", "middle")
        .text(d => d.relation);

    // Draw Nodes
    const node = svg.append("g")
      .selectAll("circle")
      .data(nodes)
      .join("circle")
      .attr("r", 30)
      .attr("fill", d => {
        if (d.roleType === 'Abstract') return "#E5E7EB"; // Light grey for abstract nodes
        return d.group === 1 ? "#D4AF37" : (d.group === 2 ? "#F5F5DC" : "#8B0000");
      })
      .attr("stroke", (d: any) => d.roleType === 'Abstract' ? "#999" : "#1A1A1A")
      .attr("stroke-width", 2)
      .attr("cursor", "pointer")
      .call(drag(simulation) as any)
      .on("click", (event, d) => handleNodeClick(d as CharacterNode));

    // Node Labels
    const label = svg.append("g")
      .selectAll("text")
      .data(nodes)
      .join("text")
      .text(d => d.name)
      .attr("font-family", "Songti SC, serif")
      .attr("font-weight", "bold")
      .attr("font-size", "12px")
      .attr("text-anchor", "middle")
      .attr("dy", 45) // below the circle
      .attr("pointer-events", "none");

    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      linkLabel
        .attr("x", (d: any) => (d.source.x + d.target.x) / 2)
        .attr("y", (d: any) => (d.source.y + d.target.y) / 2);

      node
        .attr("cx", (d: any) => d.x)
        .attr("cy", (d: any) => d.y);

      label
        .attr("x", (d: any) => d.x)
        .attr("y", (d: any) => d.y);
    });

    function drag(sim: any) {
      function dragstarted(event: any) {
        if (!event.active) sim.alphaTarget(0.3).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
      }
      function dragged(event: any) {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
      }
      function dragended(event: any) {
        if (!event.active) sim.alphaTarget(0);
        event.subject.fx = null;
        event.subject.fy = null;
      }
      return d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);
    }

  }, [play]);

  return (
    <div className="my-12">
        <div className="flex items-center gap-2 mb-6">
            <span className="text-3xl">👤</span>
            <h3 className="text-2xl font-serif font-bold text-opera-ink">人物关系 Character Map</h3>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-6">
            {/* Graph Container */}
            <div ref={containerRef} className="w-full lg:w-2/3 h-[500px] border border-stone-300 bg-white/50 rounded-lg shadow-inner overflow-hidden relative">
                <svg ref={svgRef} className="w-full h-full"></svg>
                <div className="absolute bottom-2 left-2 text-xs text-gray-400 italic">
                    Click/Drag nodes to interact. Solid red lines represent personal bonds; dashed grey lines indicate institutional constraints.
                </div>
            </div>

            {/* AI Insight Panel */}
            <div className="w-full lg:w-1/3 bg-opera-ink text-paper-texture p-6 rounded-lg shadow-xl border-l-4 border-opera-gold min-h-[300px]">
                {!selectedChar ? (
                    <div className="h-full flex flex-col items-center justify-center text-gray-500 opacity-60">
                        <span className="text-4xl mb-4">👆</span>
                        <p>Select a character to reveal their story.</p>
                    </div>
                ) : (
                    <div>
                        <div className="flex items-center justify-between mb-4 border-b border-gray-700 pb-2">
                            <div>
                                <h4 className="text-xl font-bold text-opera-gold">{selectedChar.name}</h4>
                                <span className="text-sm text-gray-400">{selectedChar.nameEn} | {selectedChar.roleType}</span>
                            </div>
                        </div>

                        {loading ? (
                            <div className="flex items-center justify-center py-10 text-opera-gold">
                                <Loader2 className="animate-spin mr-2" />
                                <span>Consulting the curator...</span>
                            </div>
                        ) : (
                            <div className="animate-fade-in">
                                <p className="leading-relaxed text-gray-300 font-sans text-sm">
                                    {aiInsight}
                                </p>
                                <div className="mt-4 flex items-center text-xs text-opera-gold/70 gap-1">
                                    <Sparkles size={12} />
                                    <span>AI Interpretation</span>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    </div>
  );
};

export default CharacterGraph;