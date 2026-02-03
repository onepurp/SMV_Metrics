import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Calculator, BarChart2, BookOpen, RotateCcw, Menu, X, Activity, Cpu, Github } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { to: '/', icon: <Calculator size={18} />, label: 'CALCULATOR' },
    { to: '/compare', icon: <RotateCcw size={18} />, label: 'HYPERGAMY_CHECK' },
    { to: '/history', icon: <BarChart2 size={18} />, label: 'LOGS' },
    { to: '/info', icon: <BookOpen size={18} />, label: 'THEORY_DB' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-void text-platinum relative overflow-hidden">
      {/* Background Grid */}
      <div className="fixed inset-0 bg-grid pointer-events-none z-0 opacity-50"></div>

      {/* Top Status Bar */}
      <header className="bg-panel/80 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 bg-surface border border-white/10 flex items-center justify-center text-cyan shadow-[0_0_10px_rgba(0,240,255,0.2)]">
                <Activity size={20} />
             </div>
             <div className="flex flex-col">
                <span className="font-mono font-bold text-sm tracking-widest text-white">SMV<span className="text-crimson">_METRICS</span></span>
                <span className="text-[10px] text-gray-500 font-mono tracking-widest">SYS.VER.2.0.4 // ONLINE</span>
             </div>
          </div>

          <div className="flex items-center gap-6">
            {/* Desktop Nav */}
            <nav className="hidden md:flex gap-6">
              {navItems.map(item => (
                <NavLink 
                  key={item.to} 
                  to={item.to}
                  className={({ isActive }) => `
                    relative py-2 text-xs font-mono font-bold tracking-wider transition-all duration-300 group
                    ${isActive ? 'text-cyan' : 'text-gray-500 hover:text-white'}
                  `}
                >
                  {({ isActive }) => (
                    <>
                      <span className="flex items-center gap-2">
                        {item.icon}
                        {item.label}
                      </span>
                      <span className={`absolute bottom-0 left-0 h-[2px] bg-cyan shadow-[0_0_8px_#00F0FF] transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* GitHub Link */}
            <a 
              href="https://github.com/onepurp/SMV_METRICS" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 text-gray-500 hover:text-white transition-colors group"
              title="Contribute on GitHub"
            >
                <Github size={18} />
            </a>

            {/* Mobile Menu Toggle */}
            <button className="md:hidden p-2 text-gray-400 hover:text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
               {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-void/95 backdrop-blur-xl pt-20 px-4 border-l border-white/10">
           <div className="flex flex-col gap-1">
            {navItems.map(item => (
              <NavLink 
                key={item.to} 
                to={item.to}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) => `
                  p-4 border-l-2 flex items-center gap-4 text-sm font-mono tracking-widest
                  ${isActive ? 'border-cyan bg-cyan/10 text-cyan' : 'border-transparent text-gray-500 hover:text-white hover:bg-white/5'}
                `}
              >
                {item.icon}
                {item.label}
              </NavLink>
            ))}

            {/* Mobile GitHub Link */}
            <a 
                href="https://github.com/onepurp/SMV_METRICS"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 border-l-2 border-transparent flex items-center gap-4 text-sm font-mono tracking-widest text-gray-500 hover:text-white hover:bg-white/5"
            >
                <Github size={18} />
                CONTRIBUTE
            </a>
           </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-x-hidden relative z-10 max-w-7xl mx-auto w-full">
        {children}
      </main>

      {/* Decor elements */}
      <div className="fixed bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan/20 to-transparent pointer-events-none"></div>
    </div>
  );
};