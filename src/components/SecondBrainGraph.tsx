import React, { useState } from 'react';
import { SessionData, MistakeRecord } from '../types/tutor';
import { 
  Network, 
  Download, 
  Copy, 
  Check, 
  FileText, 
  Sparkles, 
  Share2, 
  Layers, 
  ExternalLink,
  BookOpen,
  Filter,
  Eye,
  Loader2,
  RefreshCw
} from 'lucide-react';

interface SecondBrainGraphProps {
  session: SessionData;
  allMistakes: MistakeRecord[];
}

export const SecondBrainGraph: React.FC<SecondBrainGraphProps> = ({
  session,
  allMistakes,
}) => {
  const [selectedNode, setSelectedNode] = useState<string | null>(session.officialConcept || session.title || 'Phantom Traffic Jam');
  const [copied, setCopied] = useState(false);
  const [isGeneratingMarkdown, setIsGeneratingMarkdown] = useState(false);
  const [markdownContent, setMarkdownContent] = useState<string>('');
  const [activeSubTab, setActiveSubTab] = useState<'graph' | 'markdown'>('graph');

  // Fallback markdown generator if not already fetched from API
  const generateLocalMarkdown = () => {
    const title = session.officialConcept || session.title || 'Ghi Chú Tri Thức';
    const dateStr = new Date().toISOString().split('T')[0];

    return `---
title: "${title}"
aliases: ["${session.officialConcept || session.title}"]
tags: ["second-brain", "mental-models", "${session.domain?.toLowerCase().replace(/\s+/g, '-') || 'general'}", "mistake-autopsy"]
created: ${dateStr}
type: permanent-note
status: verified-mental-model
---

# [[${title}]]

## 1. 🔍 Hiện tượng thực tế & Trực giác đời thường (Phenomenon & Layman Intuition)
- **Vấn đề / Hiện tượng ban đầu:** ${session.phenomenon || session.concept || 'N/A'}
- **Trực giác diễn giải ban đầu:** ${session.userExplanation || 'N/A'}

## 2. 🧩 Quy luật lặp lại & Cơ chế cốt lõi (Pattern & Mechanism)
- **Quy luật (Pattern):** ${session.patterns || 'N/A'}
- **Cơ chế vận hành (Mental Model):** ${session.mechanism || 'N/A'}

\`\`\`mermaid
flowchart TD
    A["Nguyên nhân ban đầu / Độ trễ"] --> B["Khuếch đại phi tuyến tính"]
    B --> C["Tích tụ tại điểm nghẽn"]
    C --> D["Sóng xung kích ngược chiều / Sụp đổ hệ thống"]
\`\`\`

## 3. 🎓 Khái niệm & Thuật ngữ học thuật chính thức (Formal Scientific Concept)
- **Tên thuật ngữ:** **[[${session.officialConcept || session.concept || 'Khái niệm khoa học'}]]**
- **Định nghĩa chuẩn:** Hiện tượng động lực học phi tuyến nơi các tương tác cục bộ với độ trễ truyền tin tạo ra sóng phản hồi ngược chiều.

## 4. 👶 Phép ẩn dụ Feynman (Explain Like I'm 10)
> "${session.feynmanExplanation || 'Giải thích mộc mạc bằng hình tượng dễ hiểu không dùng thuật ngữ kỹ thuật.'}"

## 5. ⚡ Điều kiện biên & Stress Test (Boundary Limits)
- **Kịch bản kiểm tra:** ${session.stressTestAnswer || 'N/A'}

## 6. 🚨 KHÁM NGHIỆM SAI LẦM & BẪY TƯ DUY (MISTAKE AUTOPSY & ANTI-PATTERNS)
${session.mistakes.length === 0 ? '*(Chưa ghi nhận sai sót nào trong phiên này)*' : session.mistakes.map((m, idx) => `
### Bẫy ${idx + 1}: [[${m.cognitiveTrapName}]]
- ❌ **Trực giác ngây thơ lúc đầu:** "${m.naiveBelief}"
- 🧠 **Vì sao não dễ mắc bẫy:** ${m.psychologicalReason}
- 💥 **Phản ví dụ bẻ gãy:** ${m.counterexample}
- ✅ **Cách hiệu chỉnh:** ${m.correction}
- 🛡️ **Thần chú Heuristic né bẫy:** **${m.heuristicRule}**
`).join('\n')}

## 7. 🌐 Mạng lưới liên kết đa ngành (Cross-Domain Bi-directional Links)
${session.crossDomainConnections.map(c => `- **[[${c.wikilink.replace(/[[\]]/g, '')}]]** (${c.domain}): ${c.underlyingMechanism}`).join('\n')}
- [[SystemsThinking/FeedbackLoops]]
- [[ComplexityTheory/Emergence]]

## 8. 🔗 Dataview Query cho Obsidian
\`\`\`dataview
TABLE cognitiveTrapName as "Bẫy tư duy", heuristicRule as "Thần chú né"
FROM #mistake-autopsy
SORT created desc
\`\`\`
`;
  };

  const currentMarkdown = markdownContent || generateLocalMarkdown();

  // Call backend to generate AI enhanced Obsidian Markdown
  const handleFetchAIMarkdown = async () => {
    setIsGeneratingMarkdown(true);
    try {
      const response = await fetch('/api/tutor/generate-obsidian', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionData: session,
          mode: session.mode,
        }),
      });
      const resJson = await response.json();
      if (resJson.success && resJson.markdown) {
        setMarkdownContent(resJson.markdown);
        setActiveSubTab('markdown');
      }
    } catch (err) {
      console.error('Error generating markdown:', err);
    } finally {
      setIsGeneratingMarkdown(false);
    }
  };

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(currentMarkdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadMarkdown = () => {
    const filename = `${(session.officialConcept || session.title || 'Mental-Model').replace(/[^a-zA-Z0-9_-]/g, '_')}.md`;
    const element = document.createElement('a');
    const file = new Blob([currentMarkdown], { type: 'text/markdown' });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Graph nodes setup for interactive SVG
  const centerNode = {
    id: 'center',
    label: session.officialConcept || session.title || 'Phantom Traffic Jam',
    type: 'concept',
    x: 400,
    y: 250,
  };

  const crossDomainNodes = [
    { id: 'cd-1', label: 'Bufferbloat (Mạng máy tính)', domain: 'Phần mềm', x: 200, y: 120, type: 'cross-domain' },
    { id: 'cd-2', label: 'Bullwhip Effect (Chuỗi cung ứng)', domain: 'Kinh tế', x: 600, y: 120, type: 'cross-domain' },
    { id: 'cd-3', label: 'Action Potential (Sợi trục thần kinh)', domain: 'Sinh học', x: 620, y: 380, type: 'cross-domain' },
    { id: 'cd-4', label: 'Cascading Metastability (Server 504)', domain: 'Cloud Systems', x: 180, y: 380, type: 'cross-domain' },
  ];

  const mistakeNodes = [
    { id: 'm-1', label: 'Single Cause Fallacy (Bẫy đơn nhân)', x: 400, y: 80, type: 'mistake' },
    { id: 'm-2', label: 'Local Optimization Trap (Tối ưu cục bộ)', x: 400, y: 420, type: 'mistake' },
  ];

  return (
    <div className="flex-1 bg-slate-950 text-slate-100 overflow-y-auto p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center space-x-2">
              <span className="p-2 rounded-xl bg-purple-950/80 border border-purple-700/60 text-purple-400">
                <Network className="w-5 h-5" />
              </span>
              <h1 className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-200 via-indigo-200 to-white">
                Đồ Thị Tri Thức & Đồng Bộ Obsidian (Second Brain)
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl">
              Liên kết hai chiều giữa Khái niệm chính ↔ Các ngành tương đồng (Cross-domain) ↔ Các bẫy sai lầm cần né (#mistake-autopsy).
            </p>
          </div>

          <div className="flex items-center space-x-3">
            {/* Sub-tab toggle */}
            <div className="flex items-center p-1 bg-slate-900 border border-slate-800 rounded-xl">
              <button
                onClick={() => setActiveSubTab('graph')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeSubTab === 'graph'
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Đồ Thị Mạng Lưới
              </button>
              <button
                onClick={() => setActiveSubTab('markdown')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeSubTab === 'markdown'
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                File Markdown Obsidian (.md)
              </button>
            </div>

            {/* AI Generate Obsidian Note */}
            <button
              onClick={handleFetchAIMarkdown}
              disabled={isGeneratingMarkdown}
              className="flex items-center space-x-1.5 px-3 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-50 text-white rounded-xl text-xs font-semibold shadow-lg shadow-purple-950/40 transition-all"
            >
              {isGeneratingMarkdown ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>AI Đang Định Dạng...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>AI Hoàn Thiện File .md</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* View Mode: Interactive Graph */}
        {activeSubTab === 'graph' && (
          <div className="space-y-4">
            {/* Graph Legend */}
            <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-slate-900/60 border border-slate-800 rounded-2xl text-xs">
              <div className="flex items-center space-x-4">
                <span className="flex items-center space-x-1.5">
                  <span className="w-3 h-3 rounded-full bg-indigo-500 ring-2 ring-indigo-500/30" />
                  <span className="text-indigo-200">Khái Niệm Cốt Lõi</span>
                </span>
                <span className="flex items-center space-x-1.5">
                  <span className="w-3 h-3 rounded-full bg-cyan-500 ring-2 ring-cyan-500/30" />
                  <span className="text-cyan-200">Tương Đồng Đa Ngành (Cross-domain)</span>
                </span>
                <span className="flex items-center space-x-1.5">
                  <span className="w-3 h-3 rounded-full bg-rose-500 ring-2 ring-rose-500/30" />
                  <span className="text-rose-200">Bẫy Sai Lầm Đã Bóc Tách (#mistake-autopsy)</span>
                </span>
              </div>
              <span className="text-slate-500 text-[11px]">
                Di chuột hoặc bấm vào nốt để xem mô hình liên kết
              </span>
            </div>

            {/* Interactive SVG Graph Canvas */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-4 overflow-hidden relative shadow-2xl flex items-center justify-center min-h-[480px]">
              <svg viewBox="0 0 800 500" className="w-full h-full max-w-4xl select-none">
                {/* Connecting Edges */}
                {crossDomainNodes.map(node => (
                  <g key={`edge-${node.id}`}>
                    <line
                      x1={centerNode.x}
                      y1={centerNode.y}
                      x2={node.x}
                      y2={node.y}
                      stroke="#4338ca"
                      strokeWidth="2"
                      strokeDasharray="4 4"
                      className="opacity-60"
                    />
                  </g>
                ))}

                {mistakeNodes.map(node => (
                  <g key={`edge-${node.id}`}>
                    <line
                      x1={centerNode.x}
                      y1={centerNode.y}
                      x2={node.x}
                      y2={node.y}
                      stroke="#e11d48"
                      strokeWidth="2"
                      className="opacity-70"
                    />
                  </g>
                ))}

                {/* Center Concept Node */}
                <g
                  onClick={() => setSelectedNode(centerNode.label)}
                  className="cursor-pointer group"
                >
                  <circle
                    cx={centerNode.x}
                    cy={centerNode.y}
                    r="48"
                    fill="#312e81"
                    stroke="#818cf8"
                    strokeWidth="3"
                    className="filter drop-shadow-[0_0_15px_rgba(99,102,241,0.5)] group-hover:scale-105 transition-all"
                  />
                  <text
                    x={centerNode.x}
                    y={centerNode.y - 6}
                    textAnchor="middle"
                    fill="#ffffff"
                    fontSize="11"
                    fontWeight="bold"
                  >
                    [[Khái Niệm]]
                  </text>
                  <text
                    x={centerNode.x}
                    y={centerNode.y + 12}
                    textAnchor="middle"
                    fill="#c7d2fe"
                    fontSize="10"
                    fontWeight="medium"
                  >
                    {centerNode.label.slice(0, 18)}...
                  </text>
                </g>

                {/* Cross-Domain Nodes */}
                {crossDomainNodes.map(node => (
                  <g
                    key={node.id}
                    onClick={() => setSelectedNode(node.label)}
                    className="cursor-pointer group"
                  >
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r="36"
                      fill="#0e7490"
                      stroke="#38bdf8"
                      strokeWidth="2"
                      className="filter drop-shadow-[0_0_10px_rgba(56,189,248,0.4)] group-hover:scale-110 transition-all"
                    />
                    <text
                      x={node.x}
                      y={node.y - 4}
                      textAnchor="middle"
                      fill="#ffffff"
                      fontSize="9"
                      fontWeight="bold"
                    >
                      {node.domain}
                    </text>
                    <text
                      x={node.x}
                      y={node.y + 10}
                      textAnchor="middle"
                      fill="#bae6fd"
                      fontSize="8"
                    >
                      {node.label.slice(0, 15)}...
                    </text>
                  </g>
                ))}

                {/* Mistake Autopsy Nodes */}
                {mistakeNodes.map(node => (
                  <g
                    key={node.id}
                    onClick={() => setSelectedNode(node.label)}
                    className="cursor-pointer group"
                  >
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r="34"
                      fill="#881337"
                      stroke="#fb7185"
                      strokeWidth="2"
                      className="filter drop-shadow-[0_0_12px_rgba(244,63,94,0.4)] group-hover:scale-110 transition-all"
                    />
                    <text
                      x={node.x}
                      y={node.y - 4}
                      textAnchor="middle"
                      fill="#fecdd3"
                      fontSize="8"
                      fontWeight="bold"
                    >
                      ⚠️ #mistake
                    </text>
                    <text
                      x={node.x}
                      y={node.y + 10}
                      textAnchor="middle"
                      fill="#ffffff"
                      fontSize="8"
                    >
                      {node.label.slice(0, 14)}...
                    </text>
                  </g>
                ))}
              </svg>

              {/* Node Inspector Floating Drawer */}
              {selectedNode && (
                <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-80 bg-slate-950/90 border border-slate-700/80 rounded-2xl p-4 backdrop-blur-md shadow-2xl text-xs space-y-2">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
                    <span className="font-bold text-indigo-300">Chi Tiết Nốt Đồ Thị</span>
                    <button
                      onClick={() => setSelectedNode(null)}
                      className="text-slate-500 hover:text-white"
                    >
                      ✕
                    </button>
                  </div>
                  <p className="font-bold text-white text-sm">[[{selectedNode}]]</p>
                  <p className="text-slate-300 leading-relaxed text-[11px]">
                    Cơ chế tương đồng: Hệ thống phản xạ trễ trong môi trường mật độ cao, tích tụ chấn động tạo thành sóng xung kích ngược chiều.
                  </p>
                  <div className="pt-1 flex items-center justify-between text-[10px] text-slate-500">
                    <span>Liên kết 2 chiều trong Obsidian</span>
                    <span className="text-emerald-400 font-semibold">Đã đồng bộ</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* View Mode: Obsidian Markdown (.md) Viewer */}
        {activeSubTab === 'markdown' && (
          <div className="space-y-4">
            {/* Action Bar */}
            <div className="flex items-center justify-between p-3 bg-slate-900/60 border border-slate-800 rounded-2xl">
              <div className="flex items-center space-x-2">
                <FileText className="w-4 h-4 text-purple-400" />
                <span className="text-xs font-semibold text-slate-200">
                  {(session.officialConcept || session.title || 'Mental-Model').replace(/[^a-zA-Z0-9_-]/g, '_')}.md
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800/60">
                  Chuẩn Zettelkasten & Wikilinks
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={handleCopyMarkdown}
                  className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-medium transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Đã Copy!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Markdown</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleDownloadMarkdown}
                  className="flex items-center space-x-1.5 px-4 py-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl text-xs font-semibold shadow-md shadow-emerald-950/40 transition-all"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Tải File .md Về Máy</span>
                </button>
              </div>
            </div>

            {/* Markdown Code Block Display */}
            <div className="relative bg-slate-900/90 border border-slate-800 rounded-2xl p-5 overflow-x-auto shadow-2xl">
              <pre className="text-xs text-slate-300 font-mono leading-relaxed whitespace-pre-wrap select-all">
                {currentMarkdown}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
