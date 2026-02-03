import React from 'react';

interface RangeInputProps {
  label: string;
  value: number;
  onChange: (val: number) => void;
  min?: number;
  max?: number;
  step?: number;
  description?: string;
  leftLabel?: string;
  rightLabel?: string;
  accentColor?: 'cyan' | 'magenta';
}

export const RangeInput: React.FC<RangeInputProps> = ({
  label,
  value,
  onChange,
  min = 1,
  max = 10,
  step = 1,
  description,
  leftLabel,
  rightLabel,
  accentColor = 'cyan'
}) => {
  const percent = ((value - min) / (max - min)) * 100;
  const colorClass = accentColor === 'magenta' ? 'bg-magenta shadow-[0_0_10px_#FF00FF]' : 'bg-cyan shadow-[0_0_10px_#00F0FF]';
  const textClass = accentColor === 'magenta' ? 'text-magenta' : 'text-cyan';

  return (
    <div className="mb-8 group">
      <div className="flex justify-between items-end mb-3">
        <label className="text-gray-300 font-mono text-sm tracking-wide uppercase">{label}</label>
        <div className="flex items-center gap-2">
            <span className={`font-mono text-xl font-bold ${textClass}`}>
            {value.toFixed(step === 1 ? 0 : 1)}
            </span>
            <span className="text-[10px] text-gray-600 font-mono">/ {max}</span>
        </div>
      </div>
      
      <div className="relative h-6 flex items-center">
        {/* Track */}
        <div className="absolute w-full h-1 bg-surface border border-white/10 rounded-none overflow-hidden">
            <div 
                className={`h-full transition-all duration-100 ease-out ${accentColor === 'magenta' ? 'bg-magenta/30' : 'bg-cyan/30'}`} 
                style={{ width: `${percent}%` }}
            ></div>
        </div>
        
        {/* Native Input invisible but functional */}
        <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(e) => onChange(parseFloat(e.target.value))}
            className="absolute w-full h-full opacity-0 cursor-crosshair z-10"
        />

        {/* Thumb Indicator (Visual only) */}
        <div 
            className={`absolute h-4 w-1 ${colorClass} pointer-events-none transition-all duration-100 ease-out`}
            style={{ left: `calc(${percent}% - 2px)` }}
        ></div>
      </div>

      <div className="flex justify-between mt-2">
        <span className="text-[10px] uppercase font-mono text-gray-600">{leftLabel || min}</span>
        {description && <p className="text-gray-500 text-xs font-mono text-center max-w-[70%]">{description}</p>}
        <span className="text-[10px] uppercase font-mono text-gray-600">{rightLabel || max}</span>
      </div>
    </div>
  );
};