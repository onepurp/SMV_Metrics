import React from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db, deleteCalculation } from '../services/db';
import { Trash2, Calendar, User, Database, Terminal } from 'lucide-react';
import { format } from 'date-fns';

export const History: React.FC = () => {
  const history = useLiveQuery(() => db.calculations.orderBy('date').reverse().toArray());

  if (!history || history.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-gray-600 space-y-4">
        <Terminal size={48} />
        <p className="font-mono text-sm">DATABASE_EMPTY // NO_RECORDS_FOUND</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto pb-24">
      <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-4">
        <Database className="text-cyan" size={20} />
        <h2 className="text-xl font-mono font-bold text-white">SYSTEM_LOGS</h2>
        <span className="text-xs font-mono text-gray-500 ml-auto">{history.length} RECORDS</span>
      </div>

      <div className="space-y-2">
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 px-4 py-2 text-[10px] font-mono text-gray-500 uppercase tracking-wider">
            <div className="col-span-2">Timestamp</div>
            <div className="col-span-3">Profile_ID</div>
            <div className="col-span-5">Metrics_Hash</div>
            <div className="col-span-2 text-right">Value</div>
        </div>

        {history.map((item) => (
          <div key={item.id} className="group grid grid-cols-12 gap-4 px-4 py-4 bg-panel border border-white/5 hover:border-cyan/30 transition-all items-center">
             
             {/* Date */}
             <div className="col-span-2 flex flex-col justify-center">
                <span className="font-mono text-xs text-white">{format(new Date(item.date), 'MM.dd.yy')}</span>
                <span className="font-mono text-[10px] text-gray-500">{format(new Date(item.date), 'HH:mm:ss')}</span>
             </div>

             {/* Profile */}
             <div className="col-span-3 flex items-center gap-3">
                 <div className={`w-8 h-8 flex items-center justify-center border ${item.input.gender === 'MALE' ? 'border-cyan text-cyan bg-cyan/5' : 'border-magenta text-magenta bg-magenta/5'}`}>
                    <span className="font-mono text-xs font-bold">{item.input.gender === 'MALE' ? 'XY' : 'XX'}</span>
                 </div>
                 <div className="flex flex-col">
                    <span className="text-xs font-bold text-gray-300">AGE_{item.input.age}</span>
                    <span className="text-[10px] text-gray-600 font-mono">ID: {item.id}</span>
                 </div>
             </div>

             {/* Mini Metrics Visualization */}
             <div className="col-span-5 flex items-center gap-1 h-8">
                 {item.multipliers.map((m, i) => (
                    <div key={i} className="h-full flex-1 bg-surface relative group/bar">
                        <div 
                            className={`absolute bottom-0 w-full ${m.impact === 'positive' ? 'bg-green-500/50' : 'bg-crimson/50'}`} 
                            style={{ height: `${(m.rawScore/10)*100}%` }}
                        ></div>
                    </div>
                 ))}
             </div>

             {/* Score & Action */}
             <div className="col-span-2 flex items-center justify-end gap-4">
                <span className={`font-mono text-xl font-bold ${item.input.gender === 'MALE' ? 'text-cyan' : 'text-magenta'}`}>
                    {item.finalScore.toFixed(1)}
                </span>
                <button 
                    onClick={() => item.id && deleteCalculation(item.id)}
                    className="text-gray-600 hover:text-crimson transition-colors"
                >
                    <Trash2 size={16} />
                </button>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};