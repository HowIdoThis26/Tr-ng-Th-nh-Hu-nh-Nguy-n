import React, { useState } from 'react';
import { SessionData } from '../types/tutor';
import { 
  formatFullSessionMarkdown, 
  formatMentalModelMarkdown, 
  formatMistakeAutopsyMarkdown 
} from '../utils/obsidianExport';
import { 
  X, 
  Copy, 
  Check, 
  Download, 
  BookOpen, 
  BrainCircuit, 
  AlertTriangle, 
  FileText,
  Sparkles
} from 'lucide-react';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  session: SessionData;
  initialExportType?: 'all' | 'mental-model' | 'mistakes';
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  session,
  initialExportType = 'all',
}) => {
  const [exportType, setExportType] = useState<'all' | 'mental-model' | 'mistakes'>(initialExportType);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  let markdownOutput = '';
  if (exportType === 'all') {
    markdownOutput = formatFullSessionMarkdown(session);
  } else if (exportType === 'mental-model') {
    markdownOutput = formatMentalModelMarkdown(session);
  } else {
    markdownOutput = formatMistakeAutopsyMarkdown(session);
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(markdownOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownload = () => {
    const title = (session.officialConcept || session.title || 'Mental-Model').replace(/[^a-zA-Z0-9_-]/g, '_');
    const suffix = exportType === 'mental-model' ? '_Model' : exportType === 'mistakes' ? '_Mistakes' : '';
    const filename = `${title}${suffix}.md`;

    const element = document.createElement('a');
    const file = new Blob([markdownOutput], { type: 'text/markdown' });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-indigo-900/60 rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl shadow-indigo-950/50 text-slate-100">
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-md">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-white">
                Xuất Ghi Chú Obsidian (.md) Sẵn Sàng Copy
              </h3>
              <p className="text-xs text-slate-400">
                Định dạng chuẩn Zettelkasten với [[wikilinks]], YAML Frontmatter & Mistake Autopsy
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Export Scope Selector Tabs */}
        <div className="px-6 pt-4 pb-2 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center space-x-1.5 p-1 bg-slate-950 border border-slate-800 rounded-xl">
            <button
              onClick={() => setExportType('all')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                exportType === 'all'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Toàn Bộ (Model + Sai Lầm)</span>
            </button>

            <button
              onClick={() => setExportType('mental-model')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                exportType === 'mental-model'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <BrainCircuit className="w-3.5 h-3.5" />
              <span>Chỉ Mental Model</span>
            </button>

            <button
              onClick={() => setExportType('mistakes')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                exportType === 'mistakes'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Chỉ Mistake Autopsy ({session.mistakes.length})</span>
            </button>
          </div>

          {/* Quick Copy Button */}
          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopy}
              className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md ${
                copied
                  ? 'bg-emerald-600 text-white shadow-emerald-950/40'
                  : 'bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-indigo-950/40'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Đã Copy Vào Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Vào Clipboard</span>
                </>
              )}
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center space-x-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold transition-colors"
              title="Tải file .md về máy"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Tải .md</span>
            </button>
          </div>
        </div>

        {/* Markdown Preview Area */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-950">
          <div className="relative">
            <pre className="text-xs font-mono text-slate-200 leading-relaxed whitespace-pre-wrap select-all bg-slate-900 border border-slate-800/80 p-5 rounded-2xl shadow-inner">
              {markdownOutput}
            </pre>
          </div>
        </div>

        {/* Footer info */}
        <div className="p-4 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
          <span className="flex items-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Mẹo: Trong Obsidian, chỉ cần nhấn <kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-slate-300">Ctrl + V</kbd> (hoặc <kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-slate-300">Cmd + V</kbd>) vào bất kỳ ghi chú nào!</span>
          </span>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
