import React, { useState } from 'react';
import { UserInput, Gender, CalculationResult } from '../types';
import { calculateSMV } from '../services/smvLogic';
import { RangeInput } from './inputs/RangeInput';
import { ArrowRight, ArrowLeft, Terminal, Cpu } from 'lucide-react';
import { Results } from './Results';
import { saveCalculation } from '../services/db';

const INITIAL_INPUT: UserInput = {
  gender: Gender.Male,
  age: 25,
  socioeconomicStatus: 5,
  gameBehavior: 5,
  physicalFitness: 5,
  preSelection: 5,
  physicalBeauty: 5,
  promiscuityCount: 5,
  attitude: 5
};

export const Calculator: React.FC = () => {
  const [step, setStep] = useState(0);
  const [input, setInput] = useState<UserInput>(INITIAL_INPUT);
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [saved, setSaved] = useState(false);

  const handleCalculate = () => {
    // Artificial delay for "processing" effect
    setTimeout(() => {
        const res = calculateSMV(input);
        setResult(res);
    }, 600);
  };

  const handleSave = async () => {
    if (result && !saved) {
      await saveCalculation(result);
      setSaved(true);
    }
  };

  const handleReset = () => {
    setResult(null);
    setStep(0);
    setInput(INITIAL_INPUT);
    setSaved(false);
  };

  const updateInput = (key: keyof UserInput, val: any) => {
    setInput(prev => ({ ...prev, [key]: val }));
  };

  if (result) {
    return <Results result={result} onReset={handleReset} onSave={handleSave} saved={saved} />;
  }

  const accentColor = input.gender === Gender.Male ? 'cyan' : 'magenta';

  return (
    <div className="max-w-4xl mx-auto pb-24">
      {/* Terminal Header */}
      <div className="border border-white/10 bg-panel p-1 flex justify-between items-center mb-8">
         <div className="flex gap-2 px-2">
            <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
            <div className="w-2 h-2 rounded-full bg-yellow-500/50"></div>
            <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
         </div>
         <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Input_Parameters</div>
         <div className="w-8"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Side Panel (Context) */}
        <div className="md:col-span-4 space-y-4">
            <div className="bg-surface border border-white/10 p-6 relative overflow-hidden">
                <div className={`absolute top-0 left-0 w-1 h-full ${accentColor === 'cyan' ? 'bg-cyan' : 'bg-magenta'}`}></div>
                <h3 className="font-mono text-sm text-gray-400 mb-2">SEQUENCE</h3>
                <div className="space-y-4">
                    <div className={`flex items-center gap-3 ${step === 0 ? 'opacity-100' : 'opacity-40'}`}>
                        <div className={`w-6 h-6 border ${step === 0 ? 'border-white text-white' : 'border-gray-600 text-gray-600'} flex items-center justify-center font-mono text-xs`}>1</div>
                        <span className="text-xs font-mono uppercase">Bio_Metrics</span>
                    </div>
                    <div className={`flex items-center gap-3 ${step === 1 ? 'opacity-100' : 'opacity-40'}`}>
                        <div className={`w-6 h-6 border ${step === 1 ? 'border-white text-white' : 'border-gray-600 text-gray-600'} flex items-center justify-center font-mono text-xs`}>2</div>
                        <span className="text-xs font-mono uppercase">Value_Multipliers</span>
                    </div>
                    <div className={`flex items-center gap-3 ${step === 2 ? 'opacity-100' : 'opacity-40'}`}>
                        <div className={`w-6 h-6 border ${step === 2 ? 'border-white text-white' : 'border-gray-600 text-gray-600'} flex items-center justify-center font-mono text-xs`}>3</div>
                        <span className="text-xs font-mono uppercase">Analysis</span>
                    </div>
                </div>
                
                <div className="mt-8 pt-8 border-t border-white/5">
                    <div className="text-[10px] font-mono text-gray-600 mb-2">SYSTEM MSG:</div>
                    <p className="text-xs text-gray-400 font-mono leading-relaxed">
                        {step === 0 && "Initialize baseline biological data. Gender selection determines valuation algorithm branching."}
                        {step === 1 && input.gender === Gender.Male && "Calibrate male dominance metrics. Socioeconomic and behavioral factors weighted heavily."}
                        {step === 1 && input.gender === Gender.Female && "Calibrate female fertility and stability metrics. Age and physical indicators weighted heavily."}
                    </p>
                </div>
            </div>
        </div>

        {/* Main Input Area */}
        <div className="md:col-span-8">
            <div 
                key={step}
                className="bg-panel border border-white/10 p-8 relative"
            >
                {/* Decoration corners */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/30"></div>
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/30"></div>
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/30"></div>
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/30"></div>

                {step === 0 && (
                <div className="space-y-8">
                    <div>
                        <label className="block font-mono text-sm text-gray-400 mb-4 uppercase">Biological Sex</label>
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                onClick={() => updateInput('gender', Gender.Male)}
                                className={`h-24 border flex flex-col items-center justify-center gap-2 transition-all duration-300 ${input.gender === Gender.Male ? 'border-cyan bg-cyan/5 text-cyan shadow-[0_0_15px_rgba(0,240,255,0.1)]' : 'border-white/10 text-gray-500 hover:border-white/30'}`}
                            >
                                <span className="font-mono text-xl">XY</span>
                                <span className="text-xs tracking-widest">MALE</span>
                            </button>
                            <button
                                onClick={() => updateInput('gender', Gender.Female)}
                                className={`h-24 border flex flex-col items-center justify-center gap-2 transition-all duration-300 ${input.gender === Gender.Female ? 'border-magenta bg-magenta/5 text-magenta shadow-[0_0_15px_rgba(255,0,255,0.1)]' : 'border-white/10 text-gray-500 hover:border-white/30'}`}
                            >
                                <span className="font-mono text-xl">XX</span>
                                <span className="text-xs tracking-widest">FEMALE</span>
                            </button>
                        </div>
                    </div>

                    <RangeInput
                        label="Biological Age"
                        value={input.age}
                        onChange={(val) => updateInput('age', val)}
                        min={18}
                        max={60}
                        accentColor={accentColor}
                        description="Age is the primary decay factor in the SMV algorithm."
                    />
                </div>
                )}

                {step === 1 && input.gender === Gender.Male && (
                <div className="space-y-6">
                    <RangeInput
                        label="Socioeconomic Status"
                        value={input.socioeconomicStatus || 5}
                        onChange={(val) => updateInput('socioeconomicStatus', val)}
                        accentColor="cyan"
                        leftLabel="Poverty"
                        rightLabel="Wealth"
                    />
                    <RangeInput
                        label="Game & Frame"
                        value={input.gameBehavior || 5}
                        onChange={(val) => updateInput('gameBehavior', val)}
                        accentColor="cyan"
                        leftLabel="Passive"
                        rightLabel="Dominant"
                    />
                    <RangeInput
                        label="Physical Fitness"
                        value={input.physicalFitness || 5}
                        onChange={(val) => updateInput('physicalFitness', val)}
                        accentColor="cyan"
                        leftLabel="Weak"
                        rightLabel="Peak"
                    />
                </div>
                )}

                {step === 1 && input.gender === Gender.Female && (
                <div className="space-y-6">
                    <RangeInput
                        label="Physical Beauty"
                        value={input.physicalBeauty || 5}
                        onChange={(val) => updateInput('physicalBeauty', val)}
                        accentColor="magenta"
                        leftLabel="Average"
                        rightLabel="Model"
                    />
                    <RangeInput
                        label="N-Count Index"
                        value={input.promiscuityCount || 5}
                        onChange={(val) => updateInput('promiscuityCount', val)}
                        accentColor="magenta"
                        description="Inverse correlation to pair-bonding ability."
                        leftLabel="Low (Virgin)"
                        rightLabel="High (Promiscuous)"
                    />
                    <RangeInput
                        label="Cooperation Index"
                        value={input.attitude || 5}
                        onChange={(val) => updateInput('attitude', val)}
                        accentColor="magenta"
                        leftLabel="Combative"
                        rightLabel="Feminine"
                    />
                </div>
                )}

                <div className="flex justify-between pt-8 mt-4 border-t border-white/5">
                    {step > 0 ? (
                        <button 
                            onClick={() => setStep(step - 1)}
                            className="flex items-center gap-2 text-gray-500 hover:text-white font-mono text-xs uppercase tracking-wider"
                        >
                            <ArrowLeft size={16} /> Back
                        </button>
                    ) : <div></div>}
                    
                    {step < 1 ? (
                        <button 
                            onClick={() => setStep(step + 1)}
                            className={`flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 hover:border-${accentColor} hover:text-${accentColor} transition-all duration-300 font-mono text-xs font-bold uppercase tracking-widest`}
                        >
                            Next_Step <ArrowRight size={16} />
                        </button>
                    ) : (
                        <button 
                            onClick={handleCalculate}
                            className={`flex items-center gap-3 px-8 py-3 ${input.gender === Gender.Male ? 'bg-cyan text-black hover:bg-cyan/80' : 'bg-magenta text-black hover:bg-magenta/80'} font-mono text-xs font-bold uppercase tracking-widest shadow-lg shadow-${input.gender === Gender.Male ? 'cyan' : 'magenta'}/20 transition-all`}
                        >
                            <Terminal size={16} /> Run_Calc
                        </button>
                    )}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};
