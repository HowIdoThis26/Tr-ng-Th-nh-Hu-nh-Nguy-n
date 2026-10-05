import React, { useState } from 'react';
import { MistakeRecord } from '../types/tutor';
import { 
  AlertTriangle, 
  Search, 
  Filter, 
  ShieldCheck, 
  Brain, 
  Sparkles, 
  Layers, 
  RotateCw, 
  Copy, 
  Check, 
  Plus, 
  Trash2, 
  ArrowRight,
  HelpCircle,
  TrendingUp,
  Tag
} from 'lucide-react';
import { MistakeModal } from './MistakeModal';

interface MistakeVaultProps {
  mistakes: MistakeRecord[];
  onAddMistake: (mistake: MistakeRecord) => void;
  onDeleteMistake?: (id: string) => void;
}

export const MistakeVault: React.FC<MistakeVaultProps> = ({
  mistakes,
  onAddMistake,
  onDeleteMistake,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTrap, setSelectedTrap] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'flashcard'>('grid');
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Extract unique cognitive trap names for filtering
  const allTraps = Array.from(new Set(mistakes.map(m => m.cognitiveTrapName)));

  // Filtered mistakes
  const filteredMistakes = mistakes.filter(m => {
    const matchesSearch = 
      m.naiveBelief.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.cognitiveTrapName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.heuristicRule.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.conceptOrPhenomenon.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTrap = selectedTrap === 'all' || m.cognitiveTrapName === selectedTrap;
    return matchesSearch && matchesTrap;
  });

  const handleCopyHeuristic = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const currentFlashcard = filteredMistakes[flashcardIndex] || filteredMistakes[0];

  return (
    <div className="flex-1 bg-slate-950 text-slate-100 overflow-y-auto p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center space-x-2">
              <span className="p-2 rounded-xl bg-rose-950/80 border border-rose-700/60 text-rose-400">
                <AlertTriangle className="w-5 h-5" />
              </span>
              <h1 className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-rose-200 via-amber-200 to-white">
                Sổ Khám Nghiệm Sai Lầm & Bẫy Tư Duy (Mistake Autopsy Vault)
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl">
              "Lưu lại những lúc tôi sai để sau này nhìn lại sai ở đâu mà né". Mỗi sai lầm được bóc tách ở đây là một kháng thể giúp bạn miễn nhiễm vĩnh viễn với các ngụy biện tư duy!
            </p>
          </div>

          <div className="flex items-center space-x-3">
            {/* View Mode Toggle */}
            <div className="flex items-center p-1 bg-slate-900 border border-slate-800 rounded-xl">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  viewMode === 'grid'
                    ? 'bg-rose-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Danh Sách ({filteredMistakes.length})
              </button>
              <button
                onClick={() => {
                  setViewMode('flashcard');
                  setIsFlipped(false);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  viewMode === 'flashcard'
                    ? 'bg-rose-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Ôn Tập Flashcard
              </button>
            </div>

            {/* Copy All Mistakes for Obsidian */}
            <button
              onClick={() => {
                const md = `---
title: "Mistake Autopsy & Anti-Pattern Vault"
tags: ["second-brain", "mistake-autopsy", "heuristics"]
created: ${new Date().toISOString().split('T')[0]}
type: mistake-registry
---

# 🚨 Sổ Khám Nghiệm Sai Lầm & Bẫy Tư Duy (Mistake Autopsy Vault)

${filteredMistakes.map((m, idx) => `
## Bẫy ${idx + 1}: [[${m.cognitiveTrapName}]] #mistake-autopsy
- **Hiện tượng / Bài toán:** [[${m.conceptOrPhenomenon}]]
- **Lĩnh vực:** #${m.domain.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')}

> [!caution] ❌ Trực giác ngây thơ lúc đầu
> "${m.naiveBelief}"

- **🧠 Vì sao não bộ dễ mắc bẫy:** ${m.psychologicalReason}
- **💥 Phản ví dụ bẻ gãy:** ${m.counterexample}
- **✅ Cách hiệu chỉnh Mental Model:** ${m.correction}
- **🛡️ Thần chú Heuristic né bẫy:** **${m.heuristicRule}**
`).join('\n---\n')}

### 🔗 Dataview Query:
\`\`\`dataview
TABLE cognitiveTrapName as "Bẫy nhận thức", heuristicRule as "Thần chú né"
FROM #mistake-autopsy
SORT created desc
\`\`\`
`;
                navigator.clipboard.writeText(md);
                setCopiedId('all-vault');
                setTimeout(() => setCopiedId(null), 2500);
              }}
              className="flex items-center space-x-1.5 px-3 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 rounded-xl text-xs font-semibold transition-all shadow-sm"
              title="Copy toàn bộ danh sách sai lầm dưới dạng Markdown cho Obsidian"
            >
              {copiedId === 'all-vault' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-300">Đã Copy Markdown!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-purple-400" />
                  <span>Copy Markdown Obsidian</span>
                </>
              )}
            </button>

            {/* Add New Mistake Button */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center space-x-1.5 px-4 py-2 bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-rose-950/40 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Ghi Nhận Sai Lầm Mới</span>
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-2xl flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-rose-950 border border-rose-800/60 flex items-center justify-center text-rose-400">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Tổng số bẫy đã giải phẫu
              </span>
              <p className="text-2xl font-bold text-white mt-0.5">{mistakes.length}</p>
            </div>
          </div>

          <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-2xl flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-amber-950 border border-amber-800/60 flex items-center justify-center text-amber-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Kháng thể Heuristic đã đúc kết
              </span>
              <p className="text-2xl font-bold text-amber-300 mt-0.5">
                {mistakes.filter(m => m.heuristicRule).length}
              </p>
            </div>
          </div>

          <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-2xl flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-950 border border-indigo-800/60 flex items-center justify-center text-indigo-400">
              <Brain className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Độ đa dạng bẫy nhận thức
              </span>
              <p className="text-2xl font-bold text-indigo-300 mt-0.5">{allTraps.length} loại</p>
            </div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 bg-slate-900/60 border border-slate-800 rounded-2xl">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm kiếm sai lầm, bẫy nhận thức hoặc bài toán..."
              className="w-full pl-9 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-rose-500"
            />
          </div>

          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={selectedTrap}
              onChange={(e) => setSelectedTrap(e.target.value)}
              className="px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 focus:outline-none focus:border-rose-500"
            >
              <option value="all">Tất cả bẫy tư duy ({mistakes.length})</option>
              {allTraps.map(trap => (
                <option key={trap} value={trap}>
                  {trap}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* View Mode: Flashcard */}
        {viewMode === 'flashcard' && filteredMistakes.length > 0 && currentFlashcard && (
          <div className="flex flex-col items-center justify-center py-6">
            <div className="w-full max-w-xl">
              {/* Flashcard container */}
              <div
                onClick={() => setIsFlipped(!isFlipped)}
                className="cursor-pointer min-h-[340px] bg-gradient-to-br from-slate-900 to-slate-950 border border-rose-900/50 hover:border-rose-600/60 rounded-3xl p-6 sm:p-8 shadow-2xl relative transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs pb-3 border-b border-slate-800">
                    <span className="font-bold text-rose-400 uppercase tracking-wider">
                      {currentFlashcard.cognitiveTrapName}
                    </span>
                    <span className="text-slate-500">
                      Thẻ {flashcardIndex + 1} / {filteredMistakes.length} • Nhấn để lật
                    </span>
                  </div>

                  {!isFlipped ? (
                    /* Front side: The naive belief / trap */
                    <div className="my-6 space-y-4">
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                          Bài toán / Hiện tượng:
                        </span>
                        <p className="text-sm font-semibold text-slate-200 mt-1">
                          {currentFlashcard.conceptOrPhenomenon}
                        </p>
                      </div>

                      <div className="p-4 bg-rose-950/30 border border-rose-900/50 rounded-2xl">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-rose-400 flex items-center space-x-1.5">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          <span>Trực giác ngây thơ lúc ban đầu:</span>
                        </span>
                        <p className="text-base font-medium text-rose-200 mt-2 leading-relaxed">
                          "{currentFlashcard.naiveBelief}"
                        </p>
                      </div>

                      <p className="text-xs text-center text-slate-400 pt-2 italic">
                        👉 Hãy tự hỏi: Phản ví dụ nào bẻ gãy suy nghĩ này? Thần chú né bẫy là gì? (Bấm để xem đáp án)
                      </p>
                    </div>
                  ) : (
                    /* Back side: The autopsy & heuristic */
                    <div className="my-4 space-y-3 animate-in fade-in duration-200">
                      <div>
                        <span className="text-[10px] font-bold uppercase text-cyan-400">
                          💥 Phản ví dụ (Counterexample) bẻ gãy suy nghĩ cũ:
                        </span>
                        <p className="text-xs text-slate-200 mt-0.5">
                          {currentFlashcard.counterexample}
                        </p>
                      </div>

                      <div>
                        <span className="text-[10px] font-bold uppercase text-slate-400">
                          🧠 Tâm lý học nhận thức: Vì sao ta dễ nghĩ sai:
                        </span>
                        <p className="text-xs text-slate-300 mt-0.5">
                          {currentFlashcard.psychologicalReason}
                        </p>
                      </div>

                      <div className="p-3 bg-gradient-to-r from-emerald-950/60 to-slate-900 border border-emerald-600/50 rounded-xl">
                        <span className="text-[10px] font-bold uppercase text-emerald-300 flex items-center space-x-1">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Thần chú Heuristic để lần sau nhìn là né:</span>
                        </span>
                        <p className="text-xs font-bold text-white mt-1">
                          {currentFlashcard.heuristicRule}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-800 text-xs text-slate-500">
                  <span>Lĩnh vực: {currentFlashcard.domain}</span>
                  <span className="text-indigo-400 font-medium">Bấm vào thẻ để lật lại</span>
                </div>
              </div>

              {/* Navigation controls */}
              <div className="flex items-center justify-center space-x-4 mt-4">
                <button
                  onClick={() => {
                    setFlashcardIndex((prev) => (prev > 0 ? prev - 1 : filteredMistakes.length - 1));
                    setIsFlipped(false);
                  }}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold"
                >
                  ← Thẻ Trước
                </button>
                <button
                  onClick={() => setIsFlipped(!isFlipped)}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold flex items-center space-x-1.5"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                  <span>Lật Thẻ</span>
                </button>
                <button
                  onClick={() => {
                    setFlashcardIndex((prev) => (prev < filteredMistakes.length - 1 ? prev + 1 : 0));
                    setIsFlipped(false);
                  }}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold"
                >
                  Thẻ Tiếp →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* View Mode: Grid of Mistakes */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredMistakes.length === 0 ? (
              <div className="col-span-2 text-center py-12 text-slate-500">
                <Brain className="w-12 h-12 mx-auto text-slate-700 mb-2" />
                <p className="text-sm font-medium">Chưa tìm thấy sai lầm nào phù hợp bộ lọc.</p>
                <p className="text-xs text-slate-400 mt-1">
                  Hãy thêm sai lầm mới hoặc bấm vào nút "Khám nghiệm sai lầm" trong phòng học!
                </p>
              </div>
            ) : (
              filteredMistakes.map((m) => (
                <div
                  key={m.id}
                  className="bg-slate-900 border border-slate-800 hover:border-rose-900/60 rounded-2xl p-5 shadow-sm space-y-4 transition-all"
                >
                  {/* Card Header */}
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400 bg-rose-950/80 px-2 py-0.5 rounded border border-rose-800/60">
                        {m.cognitiveTrapName}
                      </span>
                      <h3 className="text-sm font-bold text-white mt-1">
                        {m.conceptOrPhenomenon}
                      </h3>
                    </div>
                    <span className="text-[10px] text-slate-500">
                      B{m.stepContext} • {m.domain}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="space-y-2 text-xs">
                    {/* Naive belief */}
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80">
                      <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider block">
                        ❌ Trực giác ngây thơ lúc đầu:
                      </span>
                      <p className="text-slate-200 mt-1 italic leading-relaxed">
                        "{m.naiveBelief}"
                      </p>
                    </div>

                    {/* Psychological bias */}
                    <div className="text-slate-400 text-[11px]">
                      <span className="font-semibold text-slate-400">🧠 Vì sao não nghĩ thế:</span>{' '}
                      {m.psychologicalReason}
                    </div>

                    {/* Counterexample */}
                    <div className="text-cyan-300 text-[11px]">
                      <span className="font-semibold text-cyan-400">💥 Phản ví dụ bẻ gãy:</span>{' '}
                      {m.counterexample}
                    </div>

                    {/* Correction */}
                    <div className="text-slate-300 text-[11px]">
                      <span className="font-semibold text-emerald-400">✅ Mô hình đúng:</span>{' '}
                      {m.correction}
                    </div>

                    {/* Heuristic Rule */}
                    <div className="p-3 bg-gradient-to-r from-emerald-950/40 via-slate-900 to-indigo-950/40 border border-emerald-600/40 rounded-xl flex items-start justify-between">
                      <div>
                        <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider flex items-center space-x-1">
                          <ShieldCheck className="w-3.5 h-3.5" />
                          <span>Thần chú Heuristic để sau này né:</span>
                        </span>
                        <p className="text-xs font-bold text-white mt-1">
                          {m.heuristicRule}
                        </p>
                      </div>

                      <button
                        onClick={() => handleCopyHeuristic(m.id, m.heuristicRule)}
                        className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors ml-2"
                        title="Copy câu thần chú"
                      >
                        {copiedId === m.id ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Modal to add custom mistake */}
      <MistakeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSaveMistake={onAddMistake}
        currentContext="Khám nghiệm sai sót tự ghi nhận"
        stepNumber={1}
      />
    </div>
  );
};
