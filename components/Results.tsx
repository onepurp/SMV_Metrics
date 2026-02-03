import React from 'react';
import { CalculationResult, Gender } from '../types';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, ReferenceLine, CartesianGrid } from 'recharts';
import { getAgeCurveData } from '../services/smvLogic';
import { RefreshCw, Save, TrendingUp, AlertTriangle } from 'lucide-react';

interface ResultsProps {
  result: CalculationResult;
  onReset: () => void;
  onSave: () => void;
  saved?: boolean;
}

export const Results: React.FC<ResultsProps> = ({ result, onReset, onSave, saved }) => {
  const curveData = getAgeCurveData(result.input.gender);
  const isMale = result.input.gender === Gender.Male;
  const accentColor = isMale ? '#00F0FF' : '#FF00FF';
  const accentClass = isMale ? 'cyan' : 'magenta';
  
  const getScoreColor = (score: number) => {
    if (score >= 8) return isMale ? 'text-cyan' : 'text-magenta';
    if (score >= 6) return 'text-white';
    if (score >= 4) return 'text-yellow-500';
    return 'text-crimson';
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-20">
      {/* Header Panel */}
      <div className="flex flex-col md:flex-row justify-between items-end border-b border-white/10 pb-4 mb-8">
        <div>
           <div className="flex items-center gap-2 text-xs font-mono text-gray-500 mb-1">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              ANALYSIS COMPLETE
           </div>
           <h2 className="text-2xl font-mono font-bold text-white tracking-tight">SMV_DIAGNOSTIC_REPORT</h2>
        </div>
        <div className="flex gap-4 mt-4 md:mt-0">
             <button 
               onClick={onSave}
               disabled={saved}
               className={`flex items-center gap-2 px-4 py-2 border ${saved ? 'border-green-500/50 text-green-500 bg-green-500/10' : 'border-white/20 text-gray-400 hover:text-white hover:border-white'} font-mono text-xs uppercase tracking-widest transition-all`}
             >
               <Save size={14} />
               {saved ? 'SAVED_TO_DB' : 'SAVE_DATA'}
             </button>
             <button 
                onClick={onReset}
                className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-white font-mono text-xs uppercase tracking-widest transition-all"
             >
               <RefreshCw size={14} />
               RESET
             </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Primary Score Module */}
        <div 
          className="bg-panel border border-white/10 relative overflow-hidden group"
        >
          <div className="p-1 bg-surface border-b border-white/5 flex justify-between items-center px-4">
             <span className="text-[10px] font-mono text-gray-500">METRIC: AGGREGATE_VALUE</span>
             <ActivityIcon color={accentColor} />
          </div>
          
          <div className="p-8 flex flex-col items-center justify-center h-64 relative">
             {/* Background decorative ring */}
             <div className={`absolute w-48 h-48 rounded-full border-4 border-white/5 border-t-${accentClass} border-r-${accentClass} opacity-20 animate-spin-slow`}></div>
             
             <div className={`text-6xl font-mono font-bold ${getScoreColor(result.finalScore)} drop-shadow-[0_0_15px_rgba(0,0,0,0.5)] z-10`}>
                {result.finalScore.toFixed(2)}
             </div>
             <div className="text-xs font-mono text-gray-500 mt-2 tracking-[0.2em]">MARKET VALUE</div>
          </div>
          
          {/* Footer stats */}
          <div className="grid grid-cols-2 border-t border-white/10 divide-x divide-white/10 bg-surface/50">
             <div className="p-3 text-center">
                <div className="text-[10px] text-gray-500 font-mono">BASE</div>
                <div className="text-lg font-mono text-white">{result.baseScore.toFixed(1)}</div>
             </div>
             <div className="p-3 text-center">
                <div className="text-[10px] text-gray-500 font-mono">DELTA</div>
                <div className={`text-lg font-mono ${(result.finalScore - result.baseScore) >= 0 ? 'text-green-500' : 'text-crimson'}`}>
                   {(result.finalScore - result.baseScore) > 0 ? '+' : ''}{(result.finalScore - result.baseScore).toFixed(1)}
                </div>
             </div>
          </div>
        </div>

        {/* Chart Module */}
        <div 
            className="lg:col-span-2 bg-panel border border-white/10 flex flex-col"
        >
            <div className="p-1 bg-surface border-b border-white/5 flex justify-between items-center px-4">
               <span className="text-[10px] font-mono text-gray-500">VISUALIZATION: TEMPORAL_DECAY_CURVE</span>
               <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-crimson rounded-full"></span>
                  <span className="text-[10px] font-mono text-gray-500">CURRENT_POS</span>
               </div>
            </div>
            <div className="flex-1 p-4 min-h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={curveData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={accentColor} stopOpacity={0.3}/>
                        <stop offset="95%" stopColor={accentColor} stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                    <XAxis 
                        dataKey="age" 
                        stroke="#666" 
                        tick={{fontSize: 10, fontFamily: 'JetBrains Mono'}} 
                        tickLine={false}
                    />
                    <YAxis 
                        domain={[0, 10]} 
                        stroke="#666" 
                        tick={{fontSize: 10, fontFamily: 'JetBrains Mono'}}
                        tickLine={false}
                        axisLine={false}
                    />
                    <Tooltip 
                        contentStyle={{ backgroundColor: '#0A0A0C', border: '1px solid #333', fontFamily: 'JetBrains Mono' }}
                        itemStyle={{ color: '#fff' }}
                    />
                    <Area 
                        type="monotone" 
                        dataKey="score" 
                        stroke={accentColor} 
                        fillOpacity={1} 
                        fill="url(#colorScore)" 
                        strokeWidth={2}
                        animationDuration={1500}
                    />
                    <ReferenceLine x={result.input.age} stroke="#FF2A2A" strokeDasharray="3 3" />
                    {!isMale && <ReferenceLine x={30} stroke="#FF2A2A" strokeOpacity={0.5} label={{ value: 'WALL', fill: '#FF2A2A', fontSize: 10, fontFamily: 'JetBrains Mono' }} />}
                    {isMale && <ReferenceLine x={38} stroke="#00F0FF" strokeOpacity={0.5} label={{ value: 'PEAK', fill: '#00F0FF', fontSize: 10, fontFamily: 'JetBrains Mono' }} />}
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>

        {/* Composition Breakdown */}
        <div 
            className="lg:col-span-3 bg-panel border border-white/10"
        >
             <div className="p-1 bg-surface border-b border-white/5 px-4">
               <span className="text-[10px] font-mono text-gray-500">DATA_BREAKDOWN</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10">
                {result.multipliers.map((m, idx) => (
                    <div key={idx} className="p-6 hover:bg-white/5 transition-colors">
                        <div className="flex justify-between items-start mb-4">
                            <span className="font-mono text-xs text-gray-400 uppercase">{m.name}</span>
                            <span className={`px-2 py-0.5 text-[10px] font-mono rounded border ${m.impact === 'positive' ? 'border-green-500/30 text-green-500 bg-green-500/10' : m.impact === 'negative' ? 'border-crimson/30 text-crimson bg-crimson/10' : 'border-gray-500 text-gray-500'}`}>
                                {m.impact.toUpperCase()}
                            </span>
                        </div>
                        <div className="flex items-baseline gap-2">
                             <span className="text-2xl font-mono text-white">{m.value.toFixed(2)}x</span>
                             <span className="text-xs text-gray-500 font-mono">MULTIPLIER</span>
                        </div>
                        <div className="mt-2 w-full h-1 bg-surface rounded overflow-hidden">
                            <div className={`h-full ${m.impact === 'positive' ? 'bg-green-500' : 'bg-crimson'}`} style={{ width: `${(m.rawScore / 10) * 100}%` }}></div>
                        </div>
                        <div className="mt-1 text-[10px] text-gray-600 font-mono text-right">INPUT: {m.rawScore}/10</div>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};

const ActivityIcon = ({ color }: { color: string }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22 12H18L15 21L9 3L6 12H2" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);
