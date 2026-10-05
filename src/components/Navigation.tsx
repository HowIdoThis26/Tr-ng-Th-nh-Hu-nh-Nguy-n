import React from 'react';
import { TutorMode } from '../types/tutor';
import { 
  Compass, 
  BrainCircuit, 
  AlertTriangle, 
  Network, 
  Scale, 
  BookOpen, 
  Sparkles,
  ArrowRightLeft
} from 'lucide-react';

interface NavigationProps {
  activeTab: 'workspace' | 'mistakes' | 'graph' | 'comparison' | 'obsidian-guide';
  setActiveTab: (tab: 'workspace' | 'mistakes' | 'graph' | 'comparison' | 'obsidian-guide') => void;
  currentMode: TutorMode;
  onSwitchMode: (mode: TutorMode) => void;
  mistakeCount: number;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeTab,
  setActiveTab,
  currentMode,
  onSwitchMode,
  mistakeCount,
}) => {
  return (
    <header className="bg-slate-900 border-b border-slate-800 text-slate-100 sticky top-0 z-40 backdrop-blur-md bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('workspace')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-violet-600 to-amber-500 p-0.5 shadow-lg shadow-indigo-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <BrainCircuit className="w-5 h-5 text-indigo-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-200 via-white to-amber-200">
                  CogniTutor
                </span>
                <span className="text-[10px] uppercase font-semibold px-2 py-0.5 bg-indigo-950/80 text-indigo-300 border border-indigo-700/50 rounded-full">
                  Socratic Lab
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Phenomenon ↔ Concept • Second Brain • Mistake Autopsy
              </p>
            </div>
          </div>

          {/* Mode Switcher */}
          <div className="hidden md:flex items-center p-1 bg-slate-950 border border-slate-800 rounded-xl">
            <button
              onClick={() => onSwitchMode('phenomenon-to-concept')}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                currentMode === 'phenomenon-to-concept'
                  ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Hiện tượng → Khái niệm</span>
            </button>

            <button
              onClick={() => onSwitchMode('concept-to-phenomenon')}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                currentMode === 'concept-to-phenomenon'
                  ? 'bg-gradient-to-r from-amber-600 to-rose-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
              }`}
            >
              <ArrowRightLeft className="w-3.5 h-3.5" />
              <span>Khái niệm → Hiện tượng</span>
            </button>
          </div>

          {/* Primary Navigation Tabs */}
          <nav className="flex items-center space-x-1 sm:space-x-2">
            <button
              onClick={() => setActiveTab('workspace')}
              className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'workspace'
                  ? 'bg-slate-800 text-white border border-slate-700'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span className="hidden sm:inline">Phòng Học</span>
            </button>

            <button
              onClick={() => setActiveTab('mistakes')}
              className={`relative flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'mistakes'
                  ? 'bg-rose-950/60 text-rose-200 border border-rose-800/60'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
              title="Nhật ký sai lầm & Bẫy tư duy để sau này né"
            >
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              <span className="hidden sm:inline">Sổ Sai Lầm</span>
              {mistakeCount > 0 && (
                <span className="ml-1 px-1.5 py-0.2 text-[10px] font-bold rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40">
                  {mistakeCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('graph')}
              className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'graph'
                  ? 'bg-slate-800 text-white border border-slate-700'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <Network className="w-4 h-4 text-emerald-400" />
              <span className="hidden sm:inline">Đồ Thị Tri Thức</span>
            </button>

            <button
              onClick={() => setActiveTab('comparison')}
              className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'comparison'
                  ? 'bg-amber-950/60 text-amber-200 border border-amber-800/60'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <Scale className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">So Sánh AI</span>
            </button>

            <button
              onClick={() => setActiveTab('obsidian-guide')}
              className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'obsidian-guide'
                  ? 'bg-purple-950/60 text-purple-200 border border-purple-800/60'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
              title="Hướng dẫn cấu hình Obsidian Vault & Dataview"
            >
              <BookOpen className="w-4 h-4 text-purple-400" />
              <span className="hidden sm:inline">Obsidian</span>
            </button>
          </nav>
        </div>

        {/* Mobile Mode Switcher Bar */}
        <div className="md:hidden flex items-center justify-around py-2 border-t border-slate-800/80">
          <button
            onClick={() => onSwitchMode('phenomenon-to-concept')}
            className={`text-xs px-2.5 py-1 rounded-md font-medium transition-all ${
              currentMode === 'phenomenon-to-concept'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Hiện tượng → Khái niệm
          </button>
          <button
            onClick={() => onSwitchMode('concept-to-phenomenon')}
            className={`text-xs px-2.5 py-1 rounded-md font-medium transition-all ${
              currentMode === 'concept-to-phenomenon'
                ? 'bg-amber-600 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Khái niệm → Hiện tượng
          </button>
        </div>
      </div>
    </header>
  );
};
