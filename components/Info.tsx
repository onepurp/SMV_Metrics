import React from 'react';
import { BookOpen, AlertTriangle, TrendingUp, Cpu, Lock } from 'lucide-react';

export const Info: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto pb-24 space-y-8">
      
      {/* Hero Header */}
      <div className="border border-white/10 bg-panel p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
            <Cpu size={200} />
        </div>
        <div className="relative z-10">
            <h1 className="text-3xl font-mono font-bold text-white mb-2">PRAXEOLOGY_DATABASE</h1>
            <p className="text-gray-400 font-mono text-sm max-w-xl">
                Technical documentation regarding Sexual Market Value (SMV) dynamics, Hypergamy algorithms, and biological decay curves.
            </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Core Concepts */}
        <section className="space-y-4">
            <div className="flex items-center gap-2 text-cyan mb-2">
                <TerminalIcon />
                <h2 className="font-mono font-bold">KERNEL_CONCEPTS</h2>
            </div>
            
            <div className="bg-panel border border-white/10 p-6 space-y-6">
                <div>
                    <h3 className="text-white font-bold font-mono text-sm border-l-2 border-crimson pl-3 mb-2">HYPERGAMY.EXE</h3>
                    <p className="text-gray-400 text-xs leading-relaxed">
                        The biological imperative of the female to seek the highest status male available. Stability is algorithmically maximized when Male_SMV > Female_SMV. Inversion creates "Hypergamous Tension," leading to relationship instability.
                    </p>
                </div>
                <div>
                    <h3 className="text-white font-bold font-mono text-sm border-l-2 border-crimson pl-3 mb-2">THE_WALL (Age 30)</h3>
                    <p className="text-gray-400 text-xs leading-relaxed">
                        A critical inflection point in the female valuation curve where fertility cues decline rapidly. Conversely, the male valuation curve typically ascends post-30, provided status acquisition is successful.
                    </p>
                </div>
            </div>
        </section>

        {/* Optimization Strategies */}
        <section className="space-y-4">
            <div className="flex items-center gap-2 text-magenta mb-2">
                <TrendingUp size={16} />
                <h2 className="font-mono font-bold">OPTIMIZATION_PROTOCOLS</h2>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
                <div className="bg-surface border border-white/10 p-4">
                    <h4 className="text-cyan font-mono text-xs font-bold mb-3 uppercase">Male_Protocol (XY)</h4>
                    <ul className="space-y-2">
                        <li className="flex items-center gap-2 text-gray-400 text-xs">
                            <span className="w-1 h-1 bg-cyan"></span> Acquire Resources (Status)
                        </li>
                        <li className="flex items-center gap-2 text-gray-400 text-xs">
                            <span className="w-1 h-1 bg-cyan"></span> Master Social Dynamics (Game)
                        </li>
                        <li className="flex items-center gap-2 text-gray-400 text-xs">
                            <span className="w-1 h-1 bg-cyan"></span> Maximize Physicality
                        </li>
                    </ul>
                </div>
                <div className="bg-surface border border-white/10 p-4">
                    <h4 className="text-magenta font-mono text-xs font-bold mb-3 uppercase">Female_Protocol (XX)</h4>
                    <ul className="space-y-2">
                        <li className="flex items-center gap-2 text-gray-400 text-xs">
                            <span className="w-1 h-1 bg-magenta"></span> Preserve Youth Indicators
                        </li>
                        <li className="flex items-center gap-2 text-gray-400 text-xs">
                            <span className="w-1 h-1 bg-magenta"></span> Cooperative Disposition
                        </li>
                        <li className="flex items-center gap-2 text-gray-400 text-xs">
                            <span className="w-1 h-1 bg-magenta"></span> Minimize Pair-Bond Trauma (N-Count)
                        </li>
                    </ul>
                </div>
            </div>
        </section>

      </div>

      <div className="border border-crimson/30 bg-crimson/5 p-4 flex gap-4 items-start">
         <AlertTriangle className="text-crimson shrink-0" size={20} />
         <div>
            <h4 className="text-crimson font-mono text-xs font-bold mb-1">DISCLAIMER // THEORETICAL_MODEL</h4>
            <p className="text-crimson/70 text-[10px] font-mono leading-relaxed">
                This utility is a theoretical construct based on praxeology and behavioral observation. It is intended for analytical self-reflection. Human dynamics contain variables outside this dataset.
            </p>
         </div>
      </div>

    </div>
  );
};

const TerminalIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="4 17 10 11 4 5"></polyline>
        <line x1="12" y1="19" x2="20" y2="19"></line>
    </svg>
);