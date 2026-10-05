import React, { useState } from 'react';
import { 
  BookOpen, 
  FolderTree, 
  FileCode, 
  Copy, 
  Check, 
  Sparkles, 
  Network, 
  Headphones, 
  AlertTriangle,
  Layers,
  ArrowRight
} from 'lucide-react';

export const ObsidianGuide: React.FC = () => {
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSnippet(id);
    setTimeout(() => setCopiedSnippet(null), 2000);
  };

  const dataviewMistakeSnippet = `\`\`\`dataview
TABLE
  file.link as "Bài học",
  cognitiveTrapName as "Bẫy nhận thức",
  heuristicRule as "Thần chú né bẫy",
  domain as "Lĩnh vực"
FROM #mistake-autopsy
SORT created desc
\`\`\``;

  const templaterSnippet = `---
title: "<% tp.file.title %>"
aliases: []
tags: ["second-brain", "mental-models", "mistake-autopsy"]
created: "<% tp.file.creation_date('YYYY-MM-DD') %>"
type: permanent-note
status: verified-mental-model
---

# [[<% tp.file.title %>]]

## 1. 🔍 Hiện tượng thực tế (Phenomenon)
- Trực giác ban đầu: 

## 2. 🧩 Quy luật & Cơ chế (Pattern & Mechanism)
- Cơ chế vận hành: 

## 3. 🎓 Khái niệm chính thức (Formal Concept)
- Định nghĩa: 

## 4. 👶 Ẩn dụ Feynman
> 

## 5. 🚨 KHÁM NGHIỆM SAI LẦM (MISTAKE AUTOPSY)
- ❌ Trực giác ngây thơ lúc đầu: 
- 🧠 Vì sao não dễ mắc bẫy: 
- 💥 Phản ví dụ bẻ gãy: 
- 🛡️ Thần chú né bẫy: 

## 6. 🌐 Liên kết đa ngành (Cross-domain)
- [[Tên Khái Niệm Khác]]: 
`;

  return (
    <div className="flex-1 bg-slate-950 text-slate-100 overflow-y-auto p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="pb-6 border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-xl bg-purple-950/80 border border-purple-700/60 text-purple-400">
              <BookOpen className="w-5 h-5" />
            </span>
            <h1 className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-200 via-indigo-200 to-white">
              Cẩm Nang Tích Hợp Obsidian Second Brain & Sổ Tay Khám Nghiệm Sai Lầm
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-4xl">
            Hướng dẫn chi tiết cách xây dựng bộ não thứ hai (Second Brain) trên Obsidian để liên kết các mô hình tư duy, tự động truy vấn các bẫy nhận thức bạn từng mắc, và kết nối với Google NotebookLM để tạo Podcast ôn tập.
          </p>
        </div>

        {/* Section 1: Recommended Vault Architecture */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
          <div className="flex items-center space-x-3">
            <FolderTree className="w-5 h-5 text-indigo-400" />
            <h2 className="text-lg font-bold text-white">
              1. Cấu Trúc Thư Mục Obsidian Vault Khuyến Nghị
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 font-mono text-xs text-slate-300 space-y-1">
              <p className="text-indigo-400 font-bold">📁 My-Second-Brain/</p>
              <p className="pl-4">├── 📁 00-Inbox/ <span className="text-slate-500">(Ghi chú thô mới xuất từ CogniTutor)</span></p>
              <p className="pl-4">├── 📁 10-Mental-Models/ <span className="text-emerald-400 font-semibold">(Các file .md đã tôi luyện)</span></p>
              <p className="pl-4">├── 📁 20-Mistake-Vault/ <span className="text-rose-400 font-semibold">(Sổ tay các sai lầm cần né)</span></p>
              <p className="pl-4">├── 📁 30-Cross-Domain-MOC/ <span className="text-amber-400">(Bản đồ liên kết tri thức MOC)</span></p>
              <p className="pl-4">└── 📁 99-Canvas-Graphs/ <span className="text-purple-400">(Sơ đồ visual liên kết đa ngành)</span></p>
            </div>

            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3 text-xs text-slate-300">
              <h4 className="font-bold text-white text-xs uppercase tracking-wider">
                💡 Vì sao cấu trúc này cực kỳ lợi hại?
              </h4>
              <p className="leading-relaxed">
                Tách bạch thư mục <strong className="text-rose-400">20-Mistake-Vault</strong> giúp bạn dễ dàng dùng plugin Dataview quét toàn bộ các tag <code>#mistake-autopsy</code> để làm bài tập phản xạ né bẫy hàng tuần mà không bị lẫn lộn vào tài liệu lý thuyết.
              </p>
              <p className="leading-relaxed">
                Khi cần đưa vào <strong className="text-amber-300">NotebookLM</strong>, bạn chỉ cần nạp thư mục này vào là có ngay 1 chuyên gia AI mổ xẻ những điểm mù tư duy của bạn!
              </p>
            </div>
          </div>
        </div>

        {/* Section 2: Dataview Setup */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FileCode className="w-5 h-5 text-emerald-400" />
              <div>
                <h2 className="text-lg font-bold text-white">
                  2. Cú Pháp Dataview: Tự Động Tạo Bảng Tra Cứu "Sai Ở Đâu Mà Né"
                </h2>
                <p className="text-xs text-slate-400">
                  Tạo một file <code>Dashboard-Sai-Lam.md</code> trong Obsidian và dán đoạn code sau:
                </p>
              </div>
            </div>

            <button
              onClick={() => copyToClipboard(dataviewMistakeSnippet, 'dataview')}
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold"
            >
              {copiedSnippet === 'dataview' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Đã Copy!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Snippet</span>
                </>
              )}
            </button>
          </div>

          <div className="relative">
            <pre className="p-4 bg-slate-950 border border-slate-800 rounded-2xl text-xs font-mono text-emerald-300 overflow-x-auto">
              {dataviewMistakeSnippet}
            </pre>
          </div>
        </div>

        {/* Section 3: Templater Template */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Layers className="w-5 h-5 text-purple-400" />
              <div>
                <h2 className="text-lg font-bold text-white">
                  3. Mẫu Templater: Khung Ghi Chú 11 Bước Chuẩn Zettelkasten
                </h2>
                <p className="text-xs text-slate-400">
                  Áp dụng mẫu này mỗi khi tạo một ghi chú tư duy mới trong Obsidian
                </p>
              </div>
            </div>

            <button
              onClick={() => copyToClipboard(templaterSnippet, 'templater')}
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold"
            >
              {copiedSnippet === 'templater' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Đã Copy!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Template</span>
                </>
              )}
            </button>
          </div>

          <pre className="p-4 bg-slate-950 border border-slate-800 rounded-2xl text-xs font-mono text-purple-200 overflow-x-auto max-h-60 overflow-y-auto">
            {templaterSnippet}
          </pre>
        </div>

        {/* Section 4: NotebookLM Audio Integration */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/60 border border-indigo-800/60 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl">
          <div className="flex items-center space-x-3">
            <Headphones className="w-6 h-6 text-amber-400" />
            <h2 className="text-lg font-bold text-white">
              4. Biến Sổ Tay Sai Lầm Thành Podcast Audio Trong Google NotebookLM
            </h2>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
            Một trong những cách học ngấm sâu nhất là <strong>nghe lại thụ động khi đang đi dạo hoặc lái xe</strong>. Sau khi lưu các ghi chú <code>.md</code> từ CogniTutor vào máy:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1">
              <span className="font-bold text-amber-400 block">Bước 1: Nạp Source</span>
              <p className="text-slate-400 text-[11px]">
                Mở Google NotebookLM, upload các file <code>.md</code> chứa các mô hình tư duy và bẫy nhận thức bạn đã lưu.
              </p>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1">
              <span className="font-bold text-indigo-400 block">Bước 2: Bấm Audio Overview</span>
              <p className="text-slate-400 text-[11px]">
                Tại thanh Audio Overview, bấm "Generate" để 2 AI host phân tích các bẫy tư duy và các phản ví dụ của bạn.
              </p>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1">
              <span className="font-bold text-emerald-400 block">Bước 3: Nghe & Khắc Sâu</span>
              <p className="text-slate-400 text-[11px]">
                Nghe các cuộc tranh luận sống động giữa 2 MC về lý do con người hay mắc bẫy và cách tư duy phản biện sắc sảo!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
