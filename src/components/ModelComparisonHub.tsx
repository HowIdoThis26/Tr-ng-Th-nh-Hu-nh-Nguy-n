import React, { useState } from 'react';
import { COMPARISON_CRITERIA, AI_MODELS_DATA, HYBRID_WORKFLOW_BLUEPRINT, OBSIDIAN_SETUP_GUIDE } from '../data/modelComparisonData';
import { 
  Scale, 
  Sparkles, 
  Check, 
  AlertTriangle, 
  Layers, 
  ArrowRight, 
  BookOpen, 
  Cpu, 
  Headphones, 
  ShieldCheck, 
  Brain,
  Zap,
  TrendingUp,
  FileCode,
  Compass
} from 'lucide-react';

export const ModelComparisonHub: React.FC = () => {
  const [selectedModel, setSelectedModel] = useState<string>('gemini');
  const [activeTab, setActiveTab] = useState<'matrix' | 'profiles' | 'simulation' | 'hybrid'>('matrix');

  const modelIcons: Record<string, string> = {
    gemini: '🔷',
    notebooklm: '🎧',
    chatgpt: '🟢',
    claude: '🟠',
  };

  return (
    <div className="flex-1 bg-slate-950 text-slate-100 overflow-y-auto p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="pb-6 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="p-2 rounded-xl bg-amber-950/80 border border-amber-700/60 text-amber-400">
                <Scale className="w-5 h-5" />
              </span>
              <h1 className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-200 via-indigo-200 to-white">
                Đại Ma Trận So Sánh Mô Hình AI Cho Phương Pháp Phenomenon ↔ Concept
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-4xl">
              Đánh giá thực chiến 4 hệ sinh thái: <strong>Google Gemini</strong>, <strong>Google NotebookLM</strong>, <strong>OpenAI ChatGPT</strong>, và <strong>Anthropic Claude</strong> trên các tiêu chí: Kỷ luật Socrates (chống spoil), Bóc tách sai sót (Mistake Autopsy), Tư duy liên ngành và Kết hợp Obsidian Second Brain.
            </p>
          </div>

          {/* Sub-tab selection */}
          <div className="flex items-center p-1 bg-slate-900 border border-slate-800 rounded-xl">
            <button
              onClick={() => setActiveTab('matrix')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'matrix'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Bảng Điểm So Sánh
            </button>
            <button
              onClick={() => setActiveTab('profiles')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'profiles'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Hồ Sơ Từng AI
            </button>
            <button
              onClick={() => setActiveTab('simulation')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'simulation'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Mô Phỏng Thực Chiến
            </button>
            <button
              onClick={() => setActiveTab('hybrid')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'hybrid'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Chiến Lược Hybrid Stack
            </button>
          </div>
        </div>

        {/* TAB 1: MATRIX COMPARISON TABLE */}
        {activeTab === 'matrix' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Summary Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {AI_MODELS_DATA.map((m) => {
                const totalScore = (
                  Object.values(m.scores).reduce((a, b) => a + b, 0) /
                  Object.values(m.scores).length
                ).toFixed(1);

                return (
                  <div
                    key={m.id}
                    onClick={() => {
                      setSelectedModel(m.id);
                      setActiveTab('profiles');
                    }}
                    className="cursor-pointer bg-slate-900 border border-slate-800 hover:border-amber-600/60 rounded-2xl p-4 transition-all group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xl">{modelIcons[m.id]}</span>
                      <span className="text-xs font-bold text-amber-300 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-800/60">
                        {totalScore} / 10
                      </span>
                    </div>
                    <h3 className="font-bold text-white text-sm mt-2 group-hover:text-amber-300 transition-colors">
                      {m.name}
                    </h3>
                    <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                      {m.verdictForThisMethod}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Comparison Table */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="bg-slate-950 border-b border-slate-800 text-slate-400 uppercase tracking-wider text-[10px]">
                      <th className="py-4 px-6 font-bold w-1/4">Tiêu chí đánh giá</th>
                      {AI_MODELS_DATA.map((m) => (
                        <th key={m.id} className="py-4 px-4 font-bold text-center">
                          <span className="text-base mr-1">{modelIcons[m.id]}</span>
                          <span className="text-slate-200">{m.name.split(' ')[0]}</span>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {COMPARISON_CRITERIA.map((criterion) => (
                      <tr key={criterion.id} className="hover:bg-slate-800/30 transition-colors">
                        <td className="py-4 px-6">
                          <p className="font-semibold text-white text-xs">{criterion.name}</p>
                          <p className="text-[11px] text-slate-400 mt-0.5">{criterion.description}</p>
                        </td>

                        {AI_MODELS_DATA.map((m) => {
                          const score = m.scores[criterion.id] || 0;
                          return (
                            <td key={m.id} className="py-4 px-4 text-center">
                              <span
                                className={`inline-block px-2.5 py-1 rounded-lg font-bold text-xs ${
                                  score >= 9.2
                                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-700/60'
                                    : score >= 8.5
                                    ? 'bg-indigo-950 text-indigo-300 border border-indigo-700/60'
                                    : 'bg-slate-800 text-slate-300'
                                }`}
                              >
                                {score.toFixed(1)}
                              </span>
                            </td>
                          );
                        })}
                      </tr>
                    ))}

                    {/* Verdict Row */}
                    <tr className="bg-slate-950/80 font-semibold">
                      <td className="py-4 px-6 text-amber-300">
                        Vai trò lý tưởng trong Pipeline học tập:
                      </td>
                      {AI_MODELS_DATA.map((m) => (
                        <td key={m.id} className="py-4 px-4 text-[11px] text-slate-300 text-center leading-relaxed">
                          {m.idealRoleInPipeline}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: DETAILED PROFILES */}
        {activeTab === 'profiles' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Model Selector Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {AI_MODELS_DATA.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setSelectedModel(m.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                    selectedModel === m.id
                      ? 'bg-gradient-to-r from-amber-600 to-indigo-600 text-white shadow-lg'
                      : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <span>{modelIcons[m.id]}</span>
                  <span>{m.name}</span>
                </button>
              ))}
            </div>

            {/* Selected Model Detailed Profile Card */}
            {(() => {
              const current = AI_MODELS_DATA.find((m) => m.id === selectedModel) || AI_MODELS_DATA[0];
              return (
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
                  {/* Profile Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-800 gap-4">
                    <div>
                      <div className="flex items-center space-x-3">
                        <span className="text-3xl">{modelIcons[current.id]}</span>
                        <div>
                          <h2 className="text-xl font-bold text-white">{current.name}</h2>
                          <p className="text-xs text-slate-400">{current.company}</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 text-xs">
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">
                        Đánh giá chung cho phương pháp này:
                      </span>
                      <p className="font-semibold text-amber-300 mt-0.5">{current.verdictForThisMethod}</p>
                    </div>
                  </div>

                  {/* Strengths & Weaknesses */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-950 rounded-2xl border border-emerald-950/60 space-y-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center space-x-1.5">
                        <Check className="w-4 h-4" />
                        <span>Thế mạnh đặc biệt khi học tư duy:</span>
                      </h4>
                      <ul className="space-y-1.5 text-xs text-slate-300">
                        {current.coreStrengths.map((s, idx) => (
                          <li key={idx} className="flex items-start space-x-2">
                            <span className="text-emerald-400">•</span>
                            <span>{s}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-4 bg-slate-950 rounded-2xl border border-rose-950/60 space-y-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center space-x-1.5">
                        <AlertTriangle className="w-4 h-4" />
                        <span>Hạn chế hoặc cạm bẫy cần lưu ý:</span>
                      </h4>
                      <ul className="space-y-1.5 text-xs text-slate-300">
                        {current.weaknesses.map((w, idx) => (
                          <li key={idx} className="flex items-start space-x-2">
                            <span className="text-rose-400">•</span>
                            <span>{w}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Deep Criteria Breakdown */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                    <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-1">
                      <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider flex items-center space-x-1">
                        <Compass className="w-3.5 h-3.5" />
                        <span>Kỷ luật Socrates & Chống Spoil:</span>
                      </span>
                      <p className="text-xs text-slate-300 leading-relaxed pt-1">
                        {current.socraticFidelityVerdict}
                      </p>
                    </div>

                    <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-1">
                      <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider flex items-center space-x-1">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>Quản lý Sổ Tay Sai Lầm (Mistake Autopsy):</span>
                      </span>
                      <p className="text-xs text-slate-300 leading-relaxed pt-1">
                        {current.mistakeTrackingCapability}
                      </p>
                    </div>

                    <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-1">
                      <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider flex items-center space-x-1">
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Tích hợp Obsidian & Second Brain:</span>
                      </span>
                      <p className="text-xs text-slate-300 leading-relaxed pt-1">
                        {current.obsidianIntegrationScore}
                      </p>
                    </div>
                  </div>

                  {/* Recommended Workflow for this model */}
                  <div className="p-4 bg-gradient-to-r from-indigo-950/60 via-slate-900 to-amber-950/60 border border-indigo-700/40 rounded-2xl flex items-start space-x-3">
                    <Sparkles className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-white">
                        Cách áp dụng hiệu quả nhất mô hình này:
                      </span>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                        {current.recommendedWorkflow}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* TAB 3: SIMULATION / HEAD-TO-HEAD */}
        {activeTab === 'simulation' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-400">
                Thử nghiệm thực chiến (Real-World Pedagogical Stress Test):
              </span>
              <p className="text-xs text-slate-300">
                Người học đưa ra một hiện tượng đời thường ở Bước 1: <em>"Tại sao trên cao tốc chỉ 1 xe đạp nhẹ phanh mà nửa tiếng sau cách đó 3km lại tắc cứng ngắc dù không có tai nạn?"</em>
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Gemini Response */}
              <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <div className="flex items-center space-x-2">
                    <span>🔷</span>
                    <span className="font-bold text-white text-xs">Google Gemini 3.8 Flash</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-950 px-2 py-0.5 rounded">
                    Tuân thủ Socrates 100%
                  </span>
                </div>
                <div className="text-xs text-slate-300 space-y-2 leading-relaxed bg-slate-950 p-3 rounded-xl border border-slate-800/80">
                  <p className="text-indigo-300 font-semibold">
                    "Một hiện tượng cực kỳ thú vị! Hãy khoan nói về lý thuyết sách vở.
                  </p>
                  <p>
                    Bạn hãy tưởng tượng: Giữa lúc mắt người lái xe phía sau nhìn thấy đèn phanh bật sáng, và lúc chân họ thực sự ấn bàn đạp phanh, có một khoảng thời gian trễ sinh học nào không?
                  </p>
                  <p>
                    Nếu xe thứ nhất giảm 5km/h, để không đâm đuôi xe trước, xe thứ hai buộc phải phanh mạnh hơn hay nhẹ hơn? Điều gì sẽ tích tụ qua 20 chiếc xe liên tiếp?"
                  </p>
                </div>
                <p className="text-[11px] text-slate-400 italic">
                  👉 <strong>Nhận xét:</strong> Tuyệt đối không spoil tên "Jamiton" hay "Sóng xung kích", kích thích người học tự nhận diện biến số độ trễ phản xạ!
                </p>
              </div>

              {/* NotebookLM Response */}
              <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <div className="flex items-center space-x-2">
                    <span>🎧</span>
                    <span className="font-bold text-white text-xs">Google NotebookLM</span>
                  </div>
                  <span className="text-[10px] text-amber-400 font-semibold bg-amber-950 px-2 py-0.5 rounded">
                    Source Grounded & Podcast
                  </span>
                </div>
                <div className="text-xs text-slate-300 space-y-2 leading-relaxed bg-slate-950 p-3 rounded-xl border border-slate-800/80">
                  <p>
                    "Dựa trên các tài liệu đã nạp vào Notebook: Hiện tượng này được nhắc đến trong bài nghiên cứu của Đại học Nagoya (2008) về Shockwave Propagation trong dòng giao thông phi tuyến tính.
                  </p>
                  <p>
                    [Citation 1]: Các xe chạy vòng tròn tự tạo ra sóng phanh ngược chiều do vượt ngưỡng mật độ tới hạn."
                  </p>
                </div>
                <p className="text-[11px] text-slate-400 italic">
                  👉 <strong>Nhận xét:</strong> Trích dẫn nguồn cực chuẩn xác, nhưng vì bản chất là tra cứu nên sẽ spoil ngay thuật ngữ nếu trong tài liệu có sẵn. Tuy nhiên tính năng tạo Audio Deep Dive là vô song để ôn tập!
                </p>
              </div>

              {/* ChatGPT Response */}
              <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <div className="flex items-center space-x-2">
                    <span>🟢</span>
                    <span className="font-bold text-white text-xs">OpenAI ChatGPT (GPT-4o)</span>
                  </div>
                  <span className="text-[10px] text-indigo-400 font-semibold bg-indigo-950 px-2 py-0.5 rounded">
                    Giải thích toàn diện
                  </span>
                </div>
                <div className="text-xs text-slate-300 space-y-2 leading-relaxed bg-slate-950 p-3 rounded-xl border border-slate-800/80">
                  <p>
                    "Đây là hiện tượng được gọi là **Phantom Traffic Jam** (Kẹt xe ma) do sóng xung kích (Shockwave) gây ra..."
                  </p>
                  <p>
                    (Mặc định GPT-4o sẽ giải thích tuôn trào cả tên gọi và nguyên lý, trừ khi bạn dùng Custom GPT cài đặt chỉ được hỏi Socrates).
                  </p>
                </div>
                <p className="text-[11px] text-slate-400 italic">
                  👉 <strong>Nhận xét:</strong> Thích hợp cho Bước 8 (dùng model o1 để tạo bài toán Stress Test cực hóc) hơn là giai đoạn giấu tên ban đầu.
                </p>
              </div>

              {/* Claude Response */}
              <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <div className="flex items-center space-x-2">
                    <span>🟠</span>
                    <span className="font-bold text-white text-xs">Anthropic Claude (3.5/3.7 Sonnet)</span>
                  </div>
                  <span className="text-[10px] text-purple-400 font-semibold bg-purple-950 px-2 py-0.5 rounded">
                    Sư phạm tinh tế
                  </span>
                </div>
                <div className="text-xs text-slate-300 space-y-2 leading-relaxed bg-slate-950 p-3 rounded-xl border border-slate-800/80">
                  <p>
                    "Một câu hỏi rất sắc bén. Hãy quan sát hành vi của một mắt xích riêng lẻ trước khi nhìn toàn bộ chuỗi xe.
                  </p>
                  <p>
                    Nếu bạn đang lái xe với khoảng cách 5 mét ở tốc độ 80km/h, khi xe trước phanh đỏ đèn, phản xạ tự nhiên của cơ thể bạn sẽ chọn phương án an toàn nhất: đạp phanh mạnh hơn mức cần thiết một chút để đảm bảo không đâm.
                  </p>
                  <p>
                    Bạn có nhận thấy điều gì đặc biệt về hướng di chuyển của 'cú phanh' này so với hướng di chuyển của các chiếc xe không?"
                  </p>
                </div>
                <p className="text-[11px] text-slate-400 italic">
                  👉 <strong>Nhận xét:</strong> Cực kỳ sư phạm, dẫn dắt bằng tư duy phản xạ tự nhiên và bóc tách từng lớp nhận thức rất êm dịu.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: HYBRID WORKFLOW BLUEPRINT */}
        {activeTab === 'hybrid' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                  <span>{HYBRID_WORKFLOW_BLUEPRINT.title}</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  {HYBRID_WORKFLOW_BLUEPRINT.summary}
                </p>
              </div>

              {/* Steps of Hybrid */}
              <div className="space-y-4">
                {HYBRID_WORKFLOW_BLUEPRINT.steps.map((st, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-slate-950 rounded-2xl border border-slate-800/90 flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                        {st.step}
                      </span>
                      <p className="text-xs text-slate-200 leading-relaxed">
                        {st.action}
                      </p>
                    </div>

                    <div className="px-3 py-1.5 bg-indigo-950/80 border border-indigo-700/60 rounded-xl text-xs font-semibold text-indigo-300 flex-shrink-0">
                      Công cụ: {st.tool}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Obsidian Setup Blueprint */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
              <div className="flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-purple-400" />
                <h3 className="text-lg font-bold text-white">
                  Cấu Hình Obsidian Vault Cho Sổ Khám Nghiệm Sai Lầm
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {OBSIDIAN_SETUP_GUIDE.recommendedPlugins.map((p, idx) => (
                  <div key={idx} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                    <h4 className="text-xs font-bold text-purple-300 uppercase">
                      Plugin: {p.name}
                    </h4>
                    <p className="text-xs text-slate-400">{p.purpose}</p>
                    {p.snippet && (
                      <pre className="p-2.5 bg-slate-900 rounded-xl text-[11px] font-mono text-emerald-300 overflow-x-auto border border-slate-800">
                        {p.snippet}
                      </pre>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
