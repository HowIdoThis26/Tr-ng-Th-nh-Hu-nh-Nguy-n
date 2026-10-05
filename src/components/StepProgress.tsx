import React from 'react';
import { StepDefinition, TutorMode } from '../types/tutor';
import { Check, ShieldAlert, Sparkles, Lock, Key } from 'lucide-react';

interface StepProgressProps {
  steps: StepDefinition[];
  currentStep: number;
  onSelectStep: (stepNumber: number) => void;
  mode: TutorMode;
}

export const StepProgress: React.FC<StepProgressProps> = ({
  steps,
  currentStep,
  onSelectStep,
  mode,
}) => {
  return (
    <div className="bg-slate-900/90 border-b border-slate-800 py-3 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Tiến trình tư duy 11 bước:
            </span>
            <span className="text-xs font-medium text-indigo-400">
              Bước {currentStep} / {steps.length} — {steps[currentStep - 1]?.title}
            </span>
          </div>

          {/* Mode Specific Pedagogical Shield */}
          {mode === 'phenomenon-to-concept' && currentStep < 6 && (
            <div className="flex items-center space-x-1.5 px-2.5 py-1 bg-amber-950/60 border border-amber-600/40 rounded-full text-[11px] text-amber-300">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>Kỷ luật Socrates: Tên thuật ngữ được khóa bí mật đến Bước 6</span>
            </div>
          )}

          {mode === 'phenomenon-to-concept' && currentStep >= 6 && (
            <div className="flex items-center space-x-1.5 px-2.5 py-1 bg-emerald-950/60 border border-emerald-600/40 rounded-full text-[11px] text-emerald-300">
              <Key className="w-3.5 h-3.5 text-emerald-400" />
              <span>Thuật ngữ đã được mở khóa & đối chiếu</span>
            </div>
          )}
        </div>

        {/* Stepper track */}
        <div className="relative">
          {/* Progress bar background line */}
          <div className="absolute top-4 left-3 right-3 h-0.5 bg-slate-800 -z-0 hidden md:block" />
          <div
            className="absolute top-4 left-3 h-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-amber-500 -z-0 transition-all duration-500 hidden md:block"
            style={{
              width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
            }}
          />

          {/* Steps container */}
          <div className="flex items-center justify-between overflow-x-auto pb-2 md:pb-0 scrollbar-none gap-2">
            {steps.map((s) => {
              const isCurrent = s.stepNumber === currentStep;
              const isPast = s.stepNumber < currentStep;
              const isLocked = s.stepNumber > currentStep + 1;
              const isRevealStep = mode === 'phenomenon-to-concept' && s.stepNumber === 6;

              return (
                <button
                  key={s.id}
                  onClick={() => {
                    if (!isLocked) onSelectStep(s.stepNumber);
                  }}
                  disabled={isLocked}
                  className={`flex flex-col items-center flex-shrink-0 group relative z-10 transition-all text-left focus:outline-none ${
                    isLocked ? 'cursor-not-allowed opacity-40' : 'cursor-pointer'
                  }`}
                  style={{ minWidth: '70px', maxWidth: '100px' }}
                >
                  {/* Step circle */}
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-md ${
                      isCurrent
                        ? isRevealStep
                          ? 'bg-amber-500 text-slate-950 ring-4 ring-amber-500/30 ring-offset-2 ring-offset-slate-900 scale-110'
                          : 'bg-indigo-600 text-white ring-4 ring-indigo-500/30 ring-offset-2 ring-offset-slate-900 scale-110'
                        : isPast
                        ? 'bg-emerald-600 text-white hover:bg-emerald-500'
                        : isRevealStep
                        ? 'bg-amber-950 text-amber-300 border border-amber-500/50'
                        : 'bg-slate-800 text-slate-400 border border-slate-700 group-hover:border-slate-500'
                    }`}
                  >
                    {isPast ? (
                      <Check className="w-4 h-4 stroke-[2.5]" />
                    ) : isRevealStep ? (
                      <Sparkles className="w-4 h-4" />
                    ) : isLocked ? (
                      <Lock className="w-3.5 h-3.5 opacity-60" />
                    ) : (
                      s.stepNumber
                    )}
                  </div>

                  {/* Step label */}
                  <span
                    className={`mt-1.5 text-[10px] text-center leading-tight line-clamp-2 transition-colors ${
                      isCurrent
                        ? 'font-bold text-indigo-300'
                        : isPast
                        ? 'text-slate-300 font-medium'
                        : 'text-slate-500'
                    }`}
                  >
                    {s.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
