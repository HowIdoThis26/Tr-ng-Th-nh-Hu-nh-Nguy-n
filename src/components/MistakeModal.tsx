import React, { useState } from 'react';
import { MistakeRecord } from '../types/tutor';
import { 
  AlertOctagon, 
  Sparkles, 
  X, 
  ShieldCheck, 
  Brain, 
  Zap, 
  HelpCircle,
  CheckCircle2,
  Loader2
} from 'lucide-react';

interface MistakeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveMistake: (mistake: MistakeRecord) => void;
  currentContext: string;
  stepNumber: number;
}

export const MistakeModal: React.FC<MistakeModalProps> = ({
  isOpen,
  onClose,
  onSaveMistake,
  currentContext,
  stepNumber,
}) => {
  const [statement, setStatement] = useState('');
  const [expectedInsight, setExpectedInsight] = useState('');
  const [isDiagnosing, setIsDiagnosing] = useState(false);
  const [diagnosedData, setDiagnosedData] = useState<Partial<MistakeRecord> | null>(null);

  if (!isOpen) return null;

  const handleAutoDiagnose = async () => {
    if (!statement.trim()) return;
    setIsDiagnosing(true);
    try {
      const response = await fetch('/api/tutor/diagnose-mistake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userStatement: statement,
          context: currentContext,
          expectedInsight: expectedInsight || 'Tìm kiếm nguyên nhân gốc rễ và cơ chế phi tuyến tính',
        }),
      });

      const resJson = await response.json();
      if (resJson.success && resJson.data) {
        setDiagnosedData(resJson.data);
      }
    } catch (err) {
      console.error('Failed to diagnose mistake:', err);
    } finally {
      setIsDiagnosing(false);
    }
  };

  const handleSave = () => {
    const newRecord: MistakeRecord = {
      id: `mistake-${Date.now()}`,
      timestamp: new Date().toISOString(),
      conceptOrPhenomenon: currentContext.slice(0, 60),
      naiveBelief: diagnosedData?.naiveBelief || statement,
      psychologicalReason: diagnosedData?.psychologicalReason || 'Trực giác bề mặt và thói quen suy nghĩ theo đường thẳng.',
      counterexample: diagnosedData?.counterexample || 'Tình huống biên khi quy mô tăng gấp 10 lần.',
      cognitiveTrapName: diagnosedData?.cognitiveTrapName || 'Linear Thinking & Surface Intuition',
      correction: diagnosedData?.correction || 'Cần nhìn nhận hệ thống qua độ trễ và vòng lặp phản hồi.',
      heuristicRule: diagnosedData?.heuristicRule || 'Quy tắc: Luôn kiểm tra độ trễ phản hồi trước khi kết luận!',
      domain: 'Tư duy hệ thống & Nhận thức',
      stepContext: stepNumber,
    };

    onSaveMistake(newRecord);
    setStatement('');
    setDiagnosedData(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-rose-900/60 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl shadow-rose-950/40 text-slate-100 p-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-rose-950 border border-rose-700/60 flex items-center justify-center text-rose-400">
              <AlertOctagon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-rose-200">
                Trạm Khám Nghiệm Sai Lầm (Mistake Autopsy)
              </h3>
              <p className="text-xs text-slate-400">
                Ghi nhận suy nghĩ sai sót để biến thành "kháng thể tư duy", sau này nhìn là né!
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="mt-4 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center justify-between">
              <span>1. Bạn vừa nhận ra mình đã nghĩ sai hoặc ngộ nhận điều gì?</span>
              <span className="text-[10px] text-rose-400 font-normal">Trực giác ngây thơ ban đầu</span>
            </label>
            <textarea
              value={statement}
              onChange={(e) => setStatement(e.target.value)}
              placeholder="Ví dụ: Lúc đầu tôi cứ nghĩ tắc đường là do phía trước chắc chắn có tai nạn hoặc người lái ẩu, hoặc tôi nghĩ cứ phóng nhanh bám sát xe trước là sẽ đỡ kẹt xe..."
              rows={3}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-rose-500 placeholder-slate-600"
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              onClick={handleAutoDiagnose}
              disabled={isDiagnosing || !statement.trim()}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 disabled:opacity-50 text-white rounded-xl text-xs font-medium transition-all shadow-md shadow-rose-950/50"
            >
              {isDiagnosing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>AI đang giải phẫu tâm lý sai sót...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>AI Mổ Xẻ Bẫy Nhận Thức & Sinh Heuristic Né Bẫy</span>
                </>
              )}
            </button>
          </div>

          {/* Diagnosis Result Card */}
          {diagnosedData && (
            <div className="mt-4 p-4 bg-slate-950/80 border border-rose-900/40 rounded-xl space-y-3 animate-in fade-in duration-300">
              <div className="flex items-center space-x-2 text-rose-300 font-semibold text-xs border-b border-rose-950 pb-2">
                <Brain className="w-4 h-4 text-rose-400" />
                <span>KẾT QUẢ KHÁM NGHIỆM TƯ DUY:</span>
              </div>

              <div>
                <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">
                  ⚠️ Tên bẫy nhận thức (Cognitive Trap):
                </span>
                <p className="text-sm font-semibold text-slate-200 mt-0.5">
                  {diagnosedData.cognitiveTrapName}
                </p>
              </div>

              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  🧠 Tại sao bộ não tự nhiên lại dễ mắc bẫy này:
                </span>
                <p className="text-xs text-slate-300 mt-0.5">
                  {diagnosedData.psychologicalReason}
                </p>
              </div>

              <div>
                <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider block">
                  💥 Phản ví dụ (Counterexample) đã bẻ gãy suy nghĩ cũ:
                </span>
                <p className="text-xs text-slate-300 mt-0.5">
                  {diagnosedData.counterexample}
                </p>
              </div>

              <div>
                <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block">
                  ✅ Hiệu chỉnh Mental Model chuẩn:
                </span>
                <p className="text-xs text-slate-300 mt-0.5">
                  {diagnosedData.correction}
                </p>
              </div>

              <div className="p-3 bg-gradient-to-r from-emerald-950/40 via-slate-900 to-indigo-950/40 border border-emerald-700/40 rounded-lg">
                <span className="text-[11px] font-bold text-emerald-300 uppercase tracking-wider flex items-center space-x-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Thần chú Heuristic để sau này nhìn là né:</span>
                </span>
                <p className="text-xs font-semibold text-white mt-1">
                  {diagnosedData.heuristicRule}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium rounded-xl"
          >
            Hủy
          </button>
          <button
            onClick={handleSave}
            disabled={!statement.trim() && !diagnosedData}
            className="flex items-center space-x-2 px-5 py-2 bg-rose-600 hover:bg-rose-500 disabled:opacity-50 text-white text-xs font-semibold rounded-xl transition-all shadow-lg shadow-rose-900/40"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Lưu Vào Sổ Tay Sai Lầm Vĩnh Cửu</span>
          </button>
        </div>
      </div>
    </div>
  );
};
