import React from 'react';
import { GeneratedCareerDossier } from '../types/career';
import { Target, ShieldCheck, Sparkles, Building, GraduationCap, Clock } from 'lucide-react';

interface BrandAnchorCardProps {
  dossier: GeneratedCareerDossier;
  onEditProfile: () => void;
  onRegenerate: () => void;
  isGenerating: boolean;
}

export const BrandAnchorCard: React.FC<BrandAnchorCardProps> = ({
  dossier,
  onEditProfile,
  onRegenerate,
  isGenerating,
}) => {
  const { studentInput, brandAnchor, skillGapReport, formatConsistency } = dossier;

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 pb-6 border-b border-slate-100">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 font-bold text-lg shrink-0 overflow-hidden">
            {studentInput.fullName
              .split(' ')
              .map((n) => n[0])
              .join('')
              .toUpperCase()}
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">
                {studentInput.fullName}
              </h1>
              <span className="text-xs font-medium text-slate-500">·</span>
              <span className="text-xs font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                Targeting: {studentInput.targetRole}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 mt-1">
              <span className="flex items-center gap-1">
                <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
                {studentInput.academicLevel} in {studentInput.major}
              </span>
              <span>·</span>
              <span>{studentInput.institution}</span>
              {studentInput.gpa && (
                <>
                  <span>·</span>
                  <span className="font-mono tabular-nums">GPA {studentInput.gpa}</span>
                </>
              )}
              <span>·</span>
              <span className="flex items-center gap-1">
                <Building className="w-3.5 h-3.5 text-slate-400" />
                {studentInput.targetIndustry}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                {studentInput.targetTimeline}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-right">
            <div className="text-[10px] uppercase tracking-wider font-semibold text-slate-500">
              Role Match Index
            </div>
            <div className="text-lg font-bold font-mono text-slate-900 tabular-nums">
              {skillGapReport.overallReadinessScore}%
            </div>
          </div>

          <div className="px-3 py-2 bg-emerald-50 border border-emerald-200 rounded-lg text-right">
            <div className="text-[10px] uppercase tracking-wider font-semibold text-emerald-700">
              Format Consistency
            </div>
            <div className="text-lg font-bold font-mono text-emerald-800 tabular-nums">
              {formatConsistency.brandConsistencyScore}%
            </div>
          </div>

          <button
            onClick={onRegenerate}
            disabled={isGenerating}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 transition-colors whitespace-nowrap shadow-sm"
            title="Refresh career dossier with latest AI synthesis"
          >
            <Sparkles className={`w-3.5 h-3.5 text-indigo-600 ${isGenerating ? 'animate-spin' : ''}`} />
            <span>{isGenerating ? 'Synthesizing...' : 'Regenerate'}</span>
          </button>
        </div>
      </div>

      {/* Signature Value Proposition & Positioning Pillars */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-6">
        <div className="lg:col-span-1">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
            Signature Value Proposition
          </div>
          <p className="text-sm text-slate-700 leading-relaxed">
            {brandAnchor.signatureValueProposition}
          </p>
          <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-500">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Harmonized across Resume, LinkedIn & Interview scripts</span>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
            Core Positioning Pillars (Narrative Thread)
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {brandAnchor.positioningPillars.map((pillar, idx) => (
              <div
                key={idx}
                className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs"
              >
                <div className="font-semibold text-slate-900 mb-1 flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-[10px] font-bold">
                    {idx + 1}
                  </span>
                  <span>Pillar {idx + 1}</span>
                </div>
                <div className="text-slate-600 leading-normal">{pillar}</div>
              </div>
            ))}
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-1.5 text-xs">
            <span className="text-slate-500 font-medium">Core Competencies:</span>
            {brandAnchor.coreCompetencyKeywords.map((kw, i) => (
              <span
                key={i}
                className="text-slate-700 font-mono text-[11px] bg-slate-100 px-2 py-0.5 rounded border border-slate-200"
              >
                {kw}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
