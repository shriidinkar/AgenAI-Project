import React, { useState } from 'react';
import { X, Sparkles, Send } from 'lucide-react';
import { StudentProfileInput } from '../types/career';

interface RefineModalProps {
  sectionKey: string;
  currentData: any;
  studentInput: StudentProfileInput;
  onClose: () => void;
  onApplyRefinement: (sectionKey: string, updatedData: any) => void;
}

export const RefineModal: React.FC<RefineModalProps> = ({
  sectionKey,
  currentData,
  studentInput,
  onClose,
  onApplyRefinement,
}) => {
  const [instruction, setInstruction] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const quickPillInstructions = [
    'Make more concise and keyword-dense for ATS',
    'Adopt a more research-grounded, academic tone',
    'Emphasize high-growth startup speed and autonomy',
    'Inject more quantifiable metrics and measurable outcomes',
  ];

  const handleRefine = async () => {
    if (!instruction.trim()) return;
    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      const response = await fetch('/api/refine-section', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sectionKey,
          studentInput,
          currentData,
          userInstruction: instruction,
        }),
      });

      if (!response.ok) throw new Error('Refinement failed');
      const data = await response.json();
      if (data.updatedContent) {
        onApplyRefinement(sectionKey, data.updatedContent);
        onClose();
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg('Could not refine section via server. Please try a different prompt.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-xl w-full p-6 text-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Refine Section Content with Gemini
            </h3>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Target Section: <span className="font-mono text-indigo-600">{sectionKey}</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div>
          <label className="block text-slate-700 font-semibold mb-1.5">
            Quick Prompts:
          </label>
          <div className="flex flex-wrap gap-1.5 mb-3">
            {quickPillInstructions.map((p, idx) => (
              <button
                type="button"
                key={idx}
                onClick={() => setInstruction(p)}
                className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors text-[11px]"
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-slate-700 font-semibold mb-1">
            Custom Refinement Directive:
          </label>
          <textarea
            rows={3}
            value={instruction}
            onChange={(e) => setInstruction(e.target.value)}
            placeholder="e.g. Highlight my Berkeley AI Lab research more prominently and emphasize latency constraints..."
            className="w-full p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {errorMsg && (
          <div className="p-2.5 bg-rose-50 border border-rose-200 text-rose-700 rounded-lg">
            {errorMsg}
          </div>
        )}

        <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-1.5 text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-lg hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleRefine}
            disabled={isSubmitting || !instruction.trim()}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-colors shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isSubmitting ? 'Refining...' : 'Apply Refinement'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
