/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { TutorMode, SessionData, MistakeRecord } from './types/tutor';
import { PHENOMENON_TO_CONCEPT_STEPS, CONCEPT_TO_PHENOMENON_STEPS } from './data/stepsData';
import { INITIAL_DEMO_SESSION, PRESET_SCENARIOS } from './data/presetScenarios';
import { Navigation } from './components/Navigation';
import { StepProgress } from './components/StepProgress';
import { TutorWorkspace } from './components/TutorWorkspace';
import { MistakeVault } from './components/MistakeVault';
import { SecondBrainGraph } from './components/SecondBrainGraph';
import { ModelComparisonHub } from './components/ModelComparisonHub';
import { ObsidianGuide } from './components/ObsidianGuide';

export default function App() {
  const [currentMode, setCurrentMode] = useState<TutorMode>('phenomenon-to-concept');
  const [activeTab, setActiveTab] = useState<'workspace' | 'mistakes' | 'graph' | 'comparison' | 'obsidian-guide'>('workspace');
  
  // Active session
  const [session, setSession] = useState<SessionData>(() => {
    const saved = localStorage.getItem('cognitutor_session');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_DEMO_SESSION;
      }
    }
    return INITIAL_DEMO_SESSION;
  });

  // Global mistake autopsy vault (persisted)
  const [allMistakes, setAllMistakes] = useState<MistakeRecord[]>(() => {
    const saved = localStorage.getItem('cognitutor_all_mistakes');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_DEMO_SESSION.mistakes;
      }
    }
    return INITIAL_DEMO_SESSION.mistakes;
  });

  // Persist session to localStorage
  useEffect(() => {
    localStorage.setItem('cognitutor_session', JSON.stringify(session));
  }, [session]);

  // Persist mistakes to localStorage
  useEffect(() => {
    localStorage.setItem('cognitutor_all_mistakes', JSON.stringify(allMistakes));
  }, [allMistakes]);

  // Steps based on current mode
  const steps = currentMode === 'phenomenon-to-concept'
    ? PHENOMENON_TO_CONCEPT_STEPS
    : CONCEPT_TO_PHENOMENON_STEPS;

  // Handle mode switch
  const handleSwitchMode = (newMode: TutorMode) => {
    if (newMode === currentMode) return;
    setCurrentMode(newMode);
    
    // Find a preset for this mode
    const preset = PRESET_SCENARIOS.find(p => p.mode === newMode) || PRESET_SCENARIOS[0];
    const newSession: SessionData = {
      id: `session-${newMode}-${Date.now()}`,
      mode: newMode,
      title: preset.title,
      domain: preset.domain,
      currentStep: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      phenomenon: newMode === 'phenomenon-to-concept' ? preset.inputPrompt : undefined,
      concept: newMode === 'concept-to-phenomenon' ? preset.inputPrompt : undefined,
      mistakes: [],
      crossDomainConnections: [],
      messages: [
        {
          id: 'welcome-switch',
          role: 'assistant',
          content: `Chào mừng bạn đến với chế độ: **${newMode === 'phenomenon-to-concept' ? 'Hiện tượng → Khái niệm (Quy nạp từ thế giới thực)' : 'Khái niệm → Hiện tượng (Diễn dịch & Kiểm chứng cơ chế)'}**.\n\nChủ đề khởi đầu: **${preset.title}** (${preset.domain}).\n\n${newMode === 'phenomenon-to-concept' ? `📌 **Hiện tượng đặt ra:**\n${preset.inputPrompt}\n\n👉 Bạn hãy quan sát hiện tượng này và dùng **ngôn ngữ mộc mạc nhất hàng ngày** để giải thích: Theo trực giác của bạn, điều gì đang diễn ra ở đây?` : `📌 **Khái niệm ban đầu:**\n**${preset.inputPrompt}**\n\n👉 Hãy cùng quan sát các ví dụ thực tế và giải phẫu mô hình tư duy bên dưới!`}`,
          timestamp: new Date().toISOString(),
          stepContext: 1,
        }
      ],
    };

    setSession(newSession);
    setActiveTab('workspace');
  };

  // Add mistake to both current session and global vault
  const handleAddMistake = (mistake: MistakeRecord) => {
    setAllMistakes(prev => [mistake, ...prev]);
    setSession(prev => ({
      ...prev,
      mistakes: [mistake, ...prev.mistakes],
      updatedAt: new Date().toISOString(),
    }));
  };

  // Delete mistake from global vault
  const handleDeleteMistake = (id: string) => {
    setAllMistakes(prev => prev.filter(m => m.id !== id));
  };

  // Change step
  const handleSelectStep = (stepNumber: number) => {
    setSession(prev => ({
      ...prev,
      currentStep: stepNumber,
      updatedAt: new Date().toISOString(),
    }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Main Navigation */}
      <Navigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentMode={currentMode}
        onSwitchMode={handleSwitchMode}
        mistakeCount={allMistakes.length}
      />

      {/* Stepper Bar (shown when in Workspace tab) */}
      {activeTab === 'workspace' && (
        <StepProgress
          steps={steps}
          currentStep={session.currentStep}
          onSelectStep={handleSelectStep}
          mode={currentMode}
        />
      )}

      {/* Main Body Content based on activeTab */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {activeTab === 'workspace' && (
          <TutorWorkspace
            session={session}
            setSession={setSession}
            steps={steps}
            currentMode={currentMode}
            onSelectStep={handleSelectStep}
            onOpenObsidianView={() => setActiveTab('graph')}
          />
        )}

        {activeTab === 'mistakes' && (
          <MistakeVault
            mistakes={allMistakes}
            onAddMistake={handleAddMistake}
            onDeleteMistake={handleDeleteMistake}
          />
        )}

        {activeTab === 'graph' && (
          <SecondBrainGraph
            session={session}
            allMistakes={allMistakes}
          />
        )}

        {activeTab === 'comparison' && (
          <ModelComparisonHub />
        )}

        {activeTab === 'obsidian-guide' && (
          <ObsidianGuide />
        )}
      </main>
    </div>
  );
}
