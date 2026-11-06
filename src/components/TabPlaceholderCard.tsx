import React from 'react';
import { Sparkles, ArrowRight, UserPlus, Play } from 'lucide-react';

interface TabPlaceholderCardProps {
  title: string;
  description: string;
  features: string[];
  onOpenSetup: () => void;
  onLoadSample: () => void;
}

export const TabPlaceholderCard: React.FC<TabPlaceholderCardProps> = ({
  title,
  description,
  features,
  onOpenSetup,
  onLoadSample,
}) => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm text-center max-w-2xl mx-auto space-y-6 my-4">
      <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto border border-indigo-100">
        <Sparkles className="w-6 h-6 text-indigo-600" />
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-bold text-slate-900">{title}</h3>
        <p className="text-xs text-slate-600 leading-relaxed max-w-md mx-auto">
          {description}
        </p>
      </div>

      <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 text-xs text-left space-y-2">
        <div className="font-semibold text-slate-800 text-[11px] uppercase tracking-wider">
          What will be personalized for you:
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-700">
          {features.map((feat, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span className="text-indigo-600 font-bold">✓</span>
              <span>{feat}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <button
          onClick={onOpenSetup}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-sm transition-all"
        >
          <UserPlus className="w-3.5 h-3.5" />
          <span>Set Up Your Profile</span>
        </button>

        <button
          onClick={onLoadSample}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all"
        >
          <Play className="w-3.5 h-3.5 text-indigo-600" />
          <span>Explore with Demo Candidate</span>
        </button>
      </div>
    </div>
  );
};
