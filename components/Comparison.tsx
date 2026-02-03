import React, { useState } from 'react';
import { Gender, UserInput } from '../types';
import { calculateSMV } from '../services/smvLogic';
import { Crosshair, AlertTriangle, CheckCircle } from 'lucide-react';

const defaultMale: UserInput = { gender: Gender.Male, age: 30, socioeconomicStatus: 7, gameBehavior: 6, physicalFitness: 6 };
const defaultFemale: UserInput = { gender: Gender.Female, age: 24, physicalBeauty: 7, promiscuityCount: 3, attitude: 7 };

export const Comparison: React.FC = () => {
  const [maleInput, setMaleInput] = useState<UserInput>(defaultMale);
  const [femaleInput, setFemaleInput] = useState<UserInput>(defaultFemale);

  const maleRes = calculateSMV(maleInput);
  const femaleRes = calculateSMV(femaleInput);

  const gap = maleRes.finalScore - femaleRes.finalScore;
  const isHypergamous = maleRes.finalScore >= femaleRes.finalScore;

  const updateMale = (k: keyof UserInput, v: number) => setMaleInput(p => ({...p, [k]: v}));
  const updateFemale = (k: keyof UserInput, v: number) => setFemaleInput(p => ({...p, [k]: v}));

  return (
    <div className="max-w-7xl mx-auto pb-24">
       {/* Header */}
       <div className="mb-8 border-b border-white/10 pb-4 flex justify-between items-end">
           <div>
               <h2 className="text-2xl font-mono font-bold text-white tracking-tighter">HYPERGAMY<span className="text-crimson">_ANALYSIS</span></h2>
               <p className="text-xs font-mono text-gray-500">COMPARATIVE MARKET VALUE ASSESSMENT</p>
           </div>
           <div className="px-3 py-1 bg-white/5 border border-white/10 text-[10px] font-mono text-gray-400">
               MODE: VERSUS
           </div>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Male Column (Cyan) */}
          <div className="lg:col-span-4 bg-panel border-t-2 border-t-cyan border-b border-x border-b-white/10 border-x-white/10 p-6 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10">
                 <Crosshair size={100} className="text-cyan" />
             </div>
             
             <div className="relative z-10">
                 <h3 className="text-cyan font-mono font-bold text-lg mb-6 flex items-center gap-2">
                    <span className="w-2 h-2 bg-cyan"></span> MALE_PROFILE
                 </h3>
                 
                 <div className="space-y-6">
                     <CompactSlider label="AGE" value={maleInput.age} min={18} max={60} onChange={v => updateMale('age', v)} color="cyan" />
                     <CompactSlider label="STATUS" value={maleInput.socioeconomicStatus!} onChange={v => updateMale('socioeconomicStatus', v)} color="cyan" />
                     <CompactSlider label="GAME" value={maleInput.gameBehavior!} onChange={v => updateMale('gameBehavior', v)} color="cyan" />
                     <CompactSlider label="FITNESS" value={maleInput.physicalFitness!} onChange={v => updateMale('physicalFitness', v)} color="cyan" />
                 </div>

                 <div className="mt-10 border border-cyan/20 bg-cyan/5 p-4 text-center">
                    <div className="text-xs font-mono text-cyan/70 mb-1">AGGREGATE SMV</div>
                    <div className="text-5xl font-mono font-bold text-cyan drop-shadow-[0_0_10px_rgba(0,240,255,0.3)]">
                        {maleRes.finalScore.toFixed(1)}
                    </div>
                 </div>
             </div>
          </div>

          {/* Center Analysis */}
          <div className="lg:col-span-4 flex flex-col gap-4">
             {/* Result Box */}
             <div className={`flex-1 border border-white/10 p-6 flex flex-col items-center justify-center text-center relative ${isHypergamous ? 'bg-green-500/5' : 'bg-crimson/5'}`}>
                 <div className={`absolute top-0 left-0 w-full h-1 ${isHypergamous ? 'bg-green-500' : 'bg-crimson'}`}></div>
                 
                 {isHypergamous ? (
                     <CheckCircle size={48} className="text-green-500 mb-4" />
                 ) : (
                     <AlertTriangle size={48} className="text-crimson mb-4" />
                 )}

                 <h4 className="text-white font-mono font-bold text-xl mb-2">
                    {isHypergamous ? 'STABLE DYNAMIC' : 'HYPERGAMOUS TENSION'}
                 </h4>
                 <p className="text-xs font-mono text-gray-400 leading-relaxed max-w-xs">
                    {isHypergamous 
                     ? "Male SMV dominance detected. Female hypergamy is satisfied, predicting higher relationship stability."
                     : "Female SMV dominance detected. High probability of branch-swinging or respect degradation."}
                 </p>
             </div>

             {/* Gap Visualizer */}
             <div className="bg-surface border border-white/10 p-6">
                <div className="flex justify-between text-[10px] font-mono text-gray-500 mb-2">
                   <span>MALE_DOMINANCE</span>
                   <span>FEMALE_DOMINANCE</span>
                </div>
                
                <div className="relative h-4 bg-black border border-white/20 rounded-full overflow-hidden">
                    <div className="absolute left-1/2 top-0 h-full w-px bg-white/50 z-10"></div>
                    <div 
                        style={{ width: `${Math.min(Math.abs(gap) * 10, 50)}%` }}
                        className={`absolute top-0 h-full transition-all duration-500 ease-out ${gap > 0 ? 'left-1/2 bg-cyan shadow-[0_0_10px_#00F0FF]' : 'right-1/2 bg-magenta shadow-[0_0_10px_#FF00FF]'}`}
                    />
                </div>
                <div className="text-center mt-2 font-mono text-xs text-white">
                    DELTA: <span className={gap > 0 ? 'text-cyan' : 'text-magenta'}>{Math.abs(gap).toFixed(2)}</span>
                </div>
             </div>
          </div>

          {/* Female Column (Magenta) */}
          <div className="lg:col-span-4 bg-panel border-t-2 border-t-magenta border-b border-x border-b-white/10 border-x-white/10 p-6 relative overflow-hidden">
             <div className="absolute top-0 left-0 p-4 opacity-10">
                 <Crosshair size={100} className="text-magenta" />
             </div>
             
             <div className="relative z-10">
                 <h3 className="text-magenta font-mono font-bold text-lg mb-6 flex items-center justify-end gap-2">
                    FEMALE_PROFILE <span className="w-2 h-2 bg-magenta"></span> 
                 </h3>
                 
                 <div className="space-y-6 text-right">
                     <CompactSlider label="AGE" value={femaleInput.age} min={18} max={50} onChange={v => updateFemale('age', v)} color="magenta" align="right" />
                     <CompactSlider label="BEAUTY" value={femaleInput.physicalBeauty!} onChange={v => updateFemale('physicalBeauty', v)} color="magenta" align="right" />
                     <CompactSlider label="N-COUNT" value={femaleInput.promiscuityCount!} onChange={v => updateFemale('promiscuityCount', v)} color="magenta" align="right" />
                     <CompactSlider label="ATTITUDE" value={femaleInput.attitude!} onChange={v => updateFemale('attitude', v)} color="magenta" align="right" />
                 </div>

                 <div className="mt-10 border border-magenta/20 bg-magenta/5 p-4 text-center">
                    <div className="text-xs font-mono text-magenta/70 mb-1">AGGREGATE SMV</div>
                    <div className="text-5xl font-mono font-bold text-magenta drop-shadow-[0_0_10px_rgba(255,0,255,0.3)]">
                        {femaleRes.finalScore.toFixed(1)}
                    </div>
                 </div>
             </div>
          </div>

       </div>
    </div>
  );
};

// Helper Component for Comparison
interface CompactSliderProps {
  label: string;
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
  color: 'cyan' | 'magenta';
  align?: 'left' | 'right';
}

const CompactSlider: React.FC<CompactSliderProps> = ({ 
  label, 
  value, 
  min = 1, 
  max = 10, 
  onChange, 
  color, 
  align = 'left' 
}) => (
    <div className={`flex flex-col ${align === 'right' ? 'items-end' : 'items-start'}`}>
        <div className="flex justify-between w-full mb-1">
            <label className={`text-[10px] font-mono font-bold ${color === 'cyan' ? 'text-cyan' : 'text-magenta'}`}>{label}</label>
            <span className="text-xs font-mono text-white">{value}</span>
        </div>
        <input 
            type="range" 
            min={min} 
            max={max} 
            value={value} 
            onChange={(e) => onChange(parseFloat(e.target.value))}
            className={`w-full h-1 bg-surface appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white ${color === 'cyan' ? '[&::-webkit-slider-thumb]:shadow-[0_0_8px_#00F0FF]' : '[&::-webkit-slider-thumb]:shadow-[0_0_8px_#FF00FF]'} rounded-none`}
        />
    </div>
);
