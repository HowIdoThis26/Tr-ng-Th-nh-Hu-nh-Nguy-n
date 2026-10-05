import React, { useState, useEffect, useRef } from 'react';
import { SessionData, TutorMode, StepDefinition, MistakeRecord } from '../types/tutor';
import { PRESET_SCENARIOS, PresetScenario } from '../data/presetScenarios';
import { MistakeModal } from './MistakeModal';
import { ExportModal } from './ExportModal';
import { 
  formatFullSessionMarkdown, 
  formatMentalModelMarkdown, 
  formatMistakeAutopsyMarkdown 
} from '../utils/obsidianExport';
import { 
  Send, 
  Sparkles, 
  HelpCircle, 
  AlertTriangle, 
  ArrowRight, 
  ArrowLeft, 
  Download, 
  Lock, 
  Key, 
  RotateCcw, 
  Check, 
  Copy, 
  ExternalLink, 
  BookOpen, 
  Lightbulb, 
  Loader2,
  FileText,
  Share2,
  Eye,
  ShieldCheck,
  BrainCircuit,
  ClipboardCopy
} from 'lucide-react';

interface TutorWorkspaceProps {
  session: SessionData;
  setSession: React.Dispatch<React.SetStateAction<SessionData>>;
  steps: StepDefinition[];
  currentMode: TutorMode;
  onSelectStep: (step: number) => void;
  onOpenObsidianView: () => void;
}

export const TutorWorkspace: React.FC<TutorWorkspaceProps> = ({
  session,
  setSession,
  steps,
  currentMode,
  onSelectStep,
  onOpenObsidianView,
}) => {
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMistakeModalOpen, setIsMistakeModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [exportModalType, setExportModalType] = useState<'all' | 'mental-model' | 'mistakes'>('all');
  const [showPresetsMenu, setShowPresetsMenu] = useState(false);
  const [copiedToast, setCopiedToast] = useState<string | null>(null);
  const [copiedModelQuick, setCopiedModelQuick] = useState(false);
  const [copiedMistakesQuick, setCopiedMistakesQuick] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentStepDef = steps[session.currentStep - 1] || steps[0];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [session.messages, isLoading]);

  // Quick copy handler
  const handleQuickCopy = (type: 'all' | 'mental-model' | 'mistakes') => {
    let md = '';
    let label = '';
    if (type === 'all') {
      md = formatFullSessionMarkdown(session);
      label = 'Toàn bộ Mental Model & Mistake Autopsy';
    } else if (type === 'mental-model') {
      md = formatMentalModelMarkdown(session);
      label = 'Tóm tắt Mental Model';
      setCopiedModelQuick(true);
      setTimeout(() => setCopiedModelQuick(false), 2000);
    } else {
      md = formatMistakeAutopsyMarkdown(session);
      label = 'Sổ tay Mistake Autopsy';
      setCopiedMistakesQuick(true);
      setTimeout(() => setCopiedMistakesQuick(false), 2000);
    }

    navigator.clipboard.writeText(md);
    setCopiedToast(`Đã copy ${label} vào clipboard! Sẵn sàng dán vào Obsidian.`);
    setTimeout(() => setCopiedToast(null), 3500);
  };

  // Handle user sending answer to AI
  const handleSendMessage = async (textToSend?: string) => {
    const messageContent = textToSend || userInput;
    if (!messageContent.trim() && session.messages.length > 0) return;

    const userMsg = {
      id: `user-${Date.now()}`,
      role: 'user' as const,
      content: messageContent,
      timestamp: new Date().toISOString(),
      stepContext: session.currentStep,
    };

    // Update session state based on step
    const updatedSession = { ...session };
    if (session.currentStep === 1) {
      if (session.mode === 'phenomenon-to-concept') {
        updatedSession.phenomenon = messageContent;
      } else {
        updatedSession.concept = messageContent;
      }
    } else if (session.currentStep === 2) {
      updatedSession.userExplanation = messageContent;
    } else if (session.currentStep === 4) {
      updatedSession.patterns = messageContent;
    } else if (session.currentStep === 5) {
      updatedSession.mechanism = messageContent;
    } else if (session.currentStep === 7) {
      updatedSession.feynmanExplanation = messageContent;
    } else if (session.currentStep === 8) {
      updatedSession.stressTestAnswer = messageContent;
    } else if (session.currentStep === 9) {
      updatedSession.repairedModel = messageContent;
    }

    const newMessages = messageContent ? [...session.messages, userMsg] : [...session.messages];
    updatedSession.messages = newMessages;
    setSession(updatedSession);
    setUserInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/tutor/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: session.mode,
          step: session.currentStep,
          stepName: currentStepDef.title,
          history: newMessages.map(m => ({ role: m.role === 'user' ? 'user' : 'model', content: m.content })),
          userMessage: messageContent,
          sessionState: updatedSession,
        }),
      });

      const resJson = await response.json();
      if (resJson.success && resJson.reply) {
        const assistantMsg = {
          id: `ai-${Date.now()}`,
          role: 'assistant' as const,
          content: resJson.reply,
          timestamp: new Date().toISOString(),
          stepContext: session.currentStep,
        };

        // If step 6 of mode 1, update officialConcept if detected
        if (session.mode === 'phenomenon-to-concept' && session.currentStep === 6 && !updatedSession.officialConcept) {
          const firstLine = resJson.reply.split('\n')[0].replace(/[*#]/g, '').trim();
          updatedSession.officialConcept = firstLine.slice(0, 80);
        }

        setSession(prev => ({
          ...prev,
          messages: [...prev.messages, assistantMsg],
          updatedAt: new Date().toISOString(),
        }));
      }
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Load a preset scenario
  const handleLoadPreset = (scenario: PresetScenario) => {
    const newSession: SessionData = {
      id: `session-${scenario.id}-${Date.now()}`,
      mode: scenario.mode,
      title: scenario.title,
      domain: scenario.domain,
      currentStep: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      phenomenon: scenario.mode === 'phenomenon-to-concept' ? scenario.inputPrompt : undefined,
      concept: scenario.mode === 'concept-to-phenomenon' ? scenario.inputPrompt : undefined,
      mistakes: [],
      crossDomainConnections: [],
      messages: [
        {
          id: 'welcome-1',
          role: 'assistant',
          content: `Chào mừng bạn đến với chủ đề: **${scenario.title}** (${scenario.domain}).\n\n📌 **Hiện tượng đặt ra:**\n${scenario.inputPrompt}\n\n👉 Bạn hãy quan sát hiện tượng này và dùng **ngôn ngữ mộc mạc nhất hàng ngày** để diễn giải: Theo trực giác ban đầu của bạn, điều gì đang thực sự xảy ra ở đây?`,
          timestamp: new Date().toISOString(),
          stepContext: 1,
        }
      ],
    };
    setSession(newSession);
    setShowPresetsMenu(false);
  };

  // Move to next step
  const handleNextStep = () => {
    if (session.currentStep < steps.length) {
      const nextStepNum = session.currentStep + 1;
      onSelectStep(nextStepNum);
      // Trigger AI for the new step
      setTimeout(() => {
        handleSendMessage(`Tôi đã sẵn sàng bước sang Bước ${nextStepNum}: ${steps[nextStepNum - 1]?.title}. Xin mời AI hướng dẫn tiếp!`);
      }, 100);
    }
  };

  // Move to previous step
  const handlePrevStep = () => {
    if (session.currentStep > 1) {
      onSelectStep(session.currentStep - 1);
    }
  };

  // Add a mistake from modal
  const handleSaveMistake = (mistake: MistakeRecord) => {
    setSession(prev => ({
      ...prev,
      mistakes: [mistake, ...prev.mistakes],
      updatedAt: new Date().toISOString(),
    }));
  };

  return (
    <div className="flex-1 flex flex-col lg:flex-row h-[calc(100vh-140px)] overflow-hidden bg-slate-950 text-slate-100">
      {/* Main Dialogue & Interaction Area */}
      <div className="flex-1 flex flex-col h-full border-r border-slate-800 overflow-hidden">
        {/* Session Top Bar */}
        <div className="px-6 py-3 bg-slate-900/60 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="px-2 py-0.5 text-xs font-semibold rounded-md bg-indigo-950 border border-indigo-700/60 text-indigo-300">
              {session.domain || 'Đa ngành'}
            </span>
            <h2 className="text-sm font-bold text-white truncate max-w-md">
              {session.title || 'Chủ đề học tập hiện tại'}
            </h2>
          </div>

          <div className="flex items-center space-x-2">
            {/* Preset Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowPresetsMenu(!showPresetsMenu)}
                className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg transition-colors border border-slate-700"
              >
                <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                <span>Chọn Bài Mẫu</span>
              </button>

              {showPresetsMenu && (
                <div className="absolute right-0 mt-2 w-80 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-2 z-50 animate-in fade-in duration-150">
                  <div className="text-[11px] font-semibold text-slate-400 px-2 py-1 uppercase tracking-wider">
                    Các hiện tượng & Khái niệm kinh điển:
                  </div>
                  <div className="space-y-1 mt-1 max-h-72 overflow-y-auto">
                    {PRESET_SCENARIOS.map(p => (
                      <button
                        key={p.id}
                        onClick={() => handleLoadPreset(p)}
                        className="w-full text-left px-2.5 py-2 rounded-lg text-xs hover:bg-slate-800 transition-colors flex flex-col space-y-0.5"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-slate-200">{p.title}</span>
                          <span className="text-[10px] text-indigo-400">{p.tag}</span>
                        </div>
                        <p className="text-[11px] text-slate-400 line-clamp-1">{p.overview}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Quick Export Obsidian Button */}
            <button
              onClick={() => {
                setExportModalType('all');
                setIsExportModalOpen(true);
              }}
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-600 hover:to-indigo-600 text-white text-xs font-semibold rounded-lg transition-all shadow-md shadow-purple-950/40 border border-purple-600/40"
              title="Xuất Markdown Mental Model & Mistake Autopsy cho Obsidian"
            >
              <ClipboardCopy className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Xuất Markdown Obsidian</span>
            </button>

            {/* Mistake Trigger Button */}
            <button
              onClick={() => setIsMistakeModalOpen(true)}
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-rose-950/80 hover:bg-rose-900 border border-rose-700/60 text-rose-200 text-xs font-medium rounded-lg transition-colors shadow-sm"
              title="Ghi nhận sai lầm để sau này né"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
              <span className="hidden sm:inline">Khám Nghiệm Sai Lầm</span>
            </button>
          </div>
        </div>

        {/* Current Step Instruction Banner */}
        <div className="px-6 py-3 bg-gradient-to-r from-slate-900 via-indigo-950/30 to-slate-900 border-b border-slate-800">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold text-indigo-400 bg-indigo-950/80 px-2 py-0.5 rounded border border-indigo-800/60">
                  {currentStepDef.badgeText}
                </span>
                <h3 className="text-sm font-bold text-white">
                  {currentStepDef.title}
                </h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
                {currentStepDef.instructionPrompt}
              </p>
              <p className="text-[11px] text-indigo-300/80 italic">
                💡 Định hướng tư duy: {currentStepDef.roleHint}
              </p>
            </div>

            {/* Step navigation next/prev quick buttons */}
            <div className="flex items-center space-x-2 flex-shrink-0 ml-4">
              <button
                onClick={handlePrevStep}
                disabled={session.currentStep === 1}
                className="p-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-slate-300 rounded-lg text-xs"
                title="Quay lại bước trước"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNextStep}
                disabled={session.currentStep === steps.length}
                className="flex items-center space-x-1 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-30 text-white rounded-lg text-xs font-medium transition-all"
                title="Sang bước tiếp theo"
              >
                <span>Bước {session.currentStep + 1}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Message Stream */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {session.messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 text-slate-500">
              <BrainCircuit className="w-12 h-12 text-slate-700 mb-3" />
              <h4 className="text-base font-semibold text-slate-300">
                Bắt đầu hành trình tư duy Socratic
              </h4>
              <p className="text-xs text-slate-400 max-w-md mt-1">
                Hãy chọn một bài mẫu bên trên hoặc nhập hiện tượng/bài toán thực tế của bạn bên dưới để bắt đầu!
              </p>
            </div>
          ) : (
            session.messages.map((m) => {
              const isAssistant = m.role === 'assistant';
              const isRevealStep = session.mode === 'phenomenon-to-concept' && m.stepContext === 6;

              return (
                <div
                  key={m.id}
                  className={`flex ${isAssistant ? 'justify-start' : 'justify-end'} animate-in fade-in duration-200`}
                >
                  <div
                    className={`max-w-2xl rounded-2xl px-5 py-4 text-sm leading-relaxed ${
                      isAssistant
                        ? isRevealStep
                          ? 'bg-gradient-to-br from-amber-950/70 via-slate-900 to-indigo-950/70 border border-amber-500/50 text-slate-100 shadow-xl shadow-amber-950/30'
                          : 'bg-slate-900 border border-slate-800 text-slate-200 shadow-md'
                        : 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md'
                    }`}
                  >
                    {/* Header of message */}
                    <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-white/10 text-[11px]">
                      <span className="font-semibold flex items-center space-x-1.5">
                        {isAssistant ? (
                          <>
                            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                            <span>AI Socrates Tutor</span>
                          </>
                        ) : (
                          <span>Bạn (Người học)</span>
                        )}
                      </span>
                      <span className="text-white/50 text-[10px]">
                        Bước {m.stepContext}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="whitespace-pre-wrap space-y-2">
                      {m.content}
                    </div>
                  </div>
                </div>
              );
            })
          )}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl px-5 py-3 text-xs text-indigo-300 flex items-center space-x-2">
                <Loader2 className="w-4 h-4 animate-spin text-indigo-400" />
                <span>AI Socrates đang đào sâu suy nghĩ & phản biện...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-slate-900/90 border-t border-slate-800">
          <div className="flex items-center space-x-2">
            <textarea
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder={`Nhập suy nghĩ của bạn cho ${currentStepDef.title} (Nhấn Enter để gửi)...`}
              rows={2}
              className="flex-1 px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 resize-none"
            />

            <button
              onClick={() => handleSendMessage()}
              disabled={isLoading || !userInput.trim()}
              className="px-5 py-3 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 disabled:opacity-40 text-white rounded-xl text-sm font-semibold transition-all flex items-center space-x-2 shadow-lg shadow-indigo-950/50"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">Gửi</span>
            </button>
          </div>

          <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400">
            <div className="flex items-center space-x-3">
              <span className="text-slate-500">Mẹo tương tác:</span>
              <button
                onClick={() => handleSendMessage('Xin AI hãy đặt một câu hỏi Socrates sắc bén để đào sâu hơn nữa.')}
                className="hover:text-indigo-300 underline"
              >
                Hỏi sâu thêm
              </button>
              <button
                onClick={() => handleSendMessage('Hãy đưa ra một phản ví dụ (counterexample) để thử thách mô hình tư duy của tôi.')}
                className="hover:text-amber-300 underline"
              >
                Đưa phản ví dụ
              </button>
              <button
                onClick={() => setIsMistakeModalOpen(true)}
                className="hover:text-rose-300 text-rose-400 font-medium"
              >
                + Báo cáo vừa phát hiện sai lầm
              </button>
            </div>

            <span>Bước {session.currentStep} / 11</span>
          </div>
        </div>
      </div>

      {/* Right Sidebar: Active Mental Model & Second Brain Overview */}
      <div className="w-full lg:w-96 bg-slate-900/60 flex flex-col h-full overflow-y-auto p-5 space-y-5">
        {/* Card: Current Mental Model Snapshot */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-sm space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center space-x-1.5">
              <BrainCircuit className="w-4 h-4" />
              <span>Mô Hình Tư Duy Đang Xây Dựng</span>
            </h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleQuickCopy('mental-model')}
                className="flex items-center space-x-1 px-2 py-0.5 rounded bg-indigo-950/80 hover:bg-indigo-900 border border-indigo-700/60 text-indigo-300 text-[10px] font-semibold transition-colors"
                title="Copy tóm tắt Mental Model (.md cho Obsidian)"
              >
                {copiedModelQuick ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span className="text-emerald-300">Đã copy!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy Model</span>
                  </>
                )}
              </button>
              <span className="text-[10px] text-slate-400">
                {session.mode === 'phenomenon-to-concept' ? 'Quy nạp' : 'Diễn dịch'}
              </span>
            </div>
          </div>

          {/* Phenomenon / Initial Concept */}
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">
              1. Hiện tượng ban đầu:
            </span>
            <p className="text-xs text-slate-200 mt-0.5 line-clamp-3 bg-slate-950 p-2 rounded-lg border border-slate-800/80">
              {session.phenomenon || session.concept || 'Chưa khởi tạo'}
            </p>
          </div>

          {/* Pattern */}
          <div>
            <span className="text-[10px] uppercase font-bold text-indigo-400 block">
              2. Pattern đã tìm ra:
            </span>
            <p className="text-xs text-slate-200 mt-0.5 bg-slate-950 p-2 rounded-lg border border-slate-800/80">
              {session.patterns || '(Đang chờ khám phá ở bước 4...)'}
            </p>
          </div>

          {/* Mechanism */}
          <div>
            <span className="text-[10px] uppercase font-bold text-purple-400 block">
              3. Cơ chế (Mechanism):
            </span>
            <p className="text-xs text-slate-200 mt-0.5 bg-slate-950 p-2 rounded-lg border border-slate-800/80">
              {session.mechanism || '(Đang chờ xây dựng ở bước 5...)'}
            </p>
          </div>

          {/* Official Concept */}
          <div>
            <span className="text-[10px] uppercase font-bold text-amber-400 block flex items-center justify-between">
              <span>4. Thuật ngữ chính thức:</span>
              {session.mode === 'phenomenon-to-concept' && session.currentStep < 6 ? (
                <span className="text-[9px] text-amber-500 flex items-center space-x-1">
                  <Lock className="w-2.5 h-2.5" />
                  <span>Khóa đến B6</span>
                </span>
              ) : (
                <span className="text-[9px] text-emerald-400 flex items-center space-x-1">
                  <Key className="w-2.5 h-2.5" />
                  <span>Đã mở khóa</span>
                </span>
              )}
            </span>
            <div className="mt-0.5 bg-slate-950 p-2 rounded-lg border border-slate-800/80">
              {session.mode === 'phenomenon-to-concept' && session.currentStep < 6 ? (
                <p className="text-xs text-slate-500 filter blur-[3px] select-none">
                  Sóng xung kích ngược chiều Jamiton & Động lực học phi tuyến
                </p>
              ) : (
                <p className="text-xs font-bold text-amber-300">
                  {session.officialConcept || session.concept || 'Chưa cập nhật'}
                </p>
              )}
            </div>
          </div>

          {/* Feynman Metaphor */}
          <div>
            <span className="text-[10px] uppercase font-bold text-emerald-400 block">
              5. Phép ẩn dụ Feynman:
            </span>
            <p className="text-xs text-slate-200 mt-0.5 bg-slate-950 p-2 rounded-lg border border-slate-800/80">
              {session.feynmanExplanation || '(Đang chờ diễn giải ở bước 7...)'}
            </p>
          </div>
        </div>

        {/* Card: Mistakes Log for this session */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-sm space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center space-x-1.5">
              <AlertTriangle className="w-4 h-4" />
              <span>Sổ Tay Sai Lầm Đã Bóc Tách ({session.mistakes.length})</span>
            </h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleQuickCopy('mistakes')}
                className="flex items-center space-x-1 px-2 py-0.5 rounded bg-rose-950/80 hover:bg-rose-900 border border-rose-700/60 text-rose-300 text-[10px] font-semibold transition-colors"
                title="Copy toàn bộ Mistake Autopsy (.md cho Obsidian)"
              >
                {copiedMistakesQuick ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span className="text-emerald-300">Đã copy!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy Sai Lầm</span>
                  </>
                )}
              </button>
              <button
                onClick={() => setIsMistakeModalOpen(true)}
                className="text-[11px] text-rose-400 hover:text-rose-300 font-medium"
              >
                + Ghi mới
              </button>
            </div>
          </div>

          {session.mistakes.length === 0 ? (
            <p className="text-xs text-slate-400 italic text-center py-3">
              Chưa có sai lầm nào được ghi nhận. Bấm "Khám nghiệm sai lầm" mỗi khi phát hiện trực giác của mình bị hổng!
            </p>
          ) : (
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {session.mistakes.map((m) => (
                <div
                  key={m.id}
                  className="p-2.5 bg-slate-950 border border-rose-950/80 rounded-xl space-y-1 text-xs"
                >
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="font-bold text-rose-400">{m.cognitiveTrapName}</span>
                    <span className="text-slate-500">B{m.stepContext}</span>
                  </div>
                  <p className="text-slate-300 line-clamp-2">
                    <span className="text-slate-400">Sai sót:</span> {m.naiveBelief}
                  </p>
                  <p className="text-emerald-400 font-medium text-[11px] line-clamp-2">
                    🛡️ {m.heuristicRule}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Second Brain & Obsidian Export Buttons */}
        <div className="mt-auto pt-2 space-y-2">
          <button
            onClick={() => {
              setExportModalType('all');
              setIsExportModalOpen(true);
            }}
            className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-gradient-to-r from-purple-700 via-indigo-700 to-violet-700 hover:from-purple-600 hover:to-violet-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-purple-950/50 transition-all border border-purple-500/40"
          >
            <ClipboardCopy className="w-4 h-4" />
            <span>Xuất Markdown Obsidian (Model + Sai Lầm)</span>
          </button>

          <button
            onClick={onOpenObsidianView}
            className="w-full flex items-center justify-center space-x-2 py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white rounded-xl text-xs font-semibold border border-slate-800 transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5 text-purple-400" />
            <span>Mở Đồ Thị Tri Thức & Zettelkasten</span>
          </button>
        </div>
      </div>

      {/* Floating Copy Feedback Toast */}
      {copiedToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center space-x-2.5 px-4 py-3 bg-slate-900/95 border border-emerald-500/80 rounded-2xl shadow-2xl shadow-emerald-950/40 text-emerald-200 text-xs font-medium backdrop-blur-md animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="w-6 h-6 rounded-full bg-emerald-950 border border-emerald-500/50 flex items-center justify-center text-emerald-400 flex-shrink-0">
            <Check className="w-3.5 h-3.5" />
          </div>
          <span>{copiedToast}</span>
        </div>
      )}

      {/* Quick Export Modal */}
      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        session={session}
        initialExportType={exportModalType}
      />

      {/* Mistake Diagnostic Modal */}
      <MistakeModal
        isOpen={isMistakeModalOpen}
        onClose={() => setIsMistakeModalOpen(false)}
        onSaveMistake={handleSaveMistake}
        currentContext={session.phenomenon || session.concept || session.title}
        stepNumber={session.currentStep}
      />
    </div>
  );
};
