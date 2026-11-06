import React from 'react';
import { GeneratedCareerDossier } from '../types/career';
import { ShieldCheck, CheckCircle2, GitCompare, Sparkles, RefreshCw } from 'lucide-react';

interface ConsistencyAuditTabProps {
  dossier: GeneratedCareerDossier;
}

export const ConsistencyAuditTab: React.FC<ConsistencyAuditTabProps> = ({ dossier }) => {
  const { brandAnchor, formatConsistency, professionalSummary, interviewPrep, learningRecommendations } = dossier;

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <h2 className="text-base font-bold text-slate-900">
                Format Consistency & Narrative Synchronizer
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Automated audit verifying that your candidate identity, core competencies, and tone remain identical across every generated format.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-3.5 py-1.5 bg-emerald-50 border border-emerald-200 rounded-lg text-right">
              <span className="text-[10px] uppercase font-semibold text-emerald-700 block">
                Consistency Index
              </span>
              <span className="text-xl font-bold font-mono text-emerald-800 tabular-nums">
                {formatConsistency.brandConsistencyScore}%
              </span>
            </div>
          </div>
        </div>

        <div className="mt-4 p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 leading-relaxed">
          <span className="font-semibold text-slate-900">Synthesis Engine Summary: </span>
          {formatConsistency.crossFormatAlignmentNotes}
        </div>
      </div>

      {/* 4 Automated Consistency Checks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {formatConsistency.consistencyChecks.map((check, idx) => (
          <div
            key={idx}
            className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm space-y-2 text-xs"
          >
            <div className="flex items-center justify-between">
              <div className="font-bold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{check.aspect}</span>
              </div>
              <span className="font-mono text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-semibold">
                {check.status}
              </span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              {check.explanation}
            </p>
          </div>
        ))}
      </div>

      {/* Side-by-Side Format Comparison Matrix */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
          <GitCompare className="w-4 h-4 text-indigo-600" />
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Cross-Format Thread Tracking Matrix
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 text-xs">
          {/* Format 1: Resume */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 flex flex-col justify-between">
            <div>
              <div className="font-bold text-slate-900 pb-2 border-b border-slate-200 flex items-center justify-between">
                <span>1. ATS Resume</span>
                <span className="text-[10px] text-slate-500 font-normal">Parser-Dense</span>
              </div>
              <p className="text-slate-700 pt-2 leading-relaxed">
                "{professionalSummary.atsResumeSummary.slice(0, 180)}..."
              </p>
            </div>
            <div className="pt-2 border-t border-slate-200 text-[11px] text-indigo-700 font-medium">
              Anchors keywords & credentials directly
            </div>
          </div>

          {/* Format 2: LinkedIn */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 flex flex-col justify-between">
            <div>
              <div className="font-bold text-slate-900 pb-2 border-b border-slate-200 flex items-center justify-between">
                <span>2. LinkedIn About</span>
                <span className="text-[10px] text-slate-500 font-normal">Storytelling Hook</span>
              </div>
              <p className="text-slate-700 pt-2 leading-relaxed">
                "{professionalSummary.linkedInAbout.hook}"
              </p>
            </div>
            <div className="pt-2 border-t border-slate-200 text-[11px] text-indigo-700 font-medium">
              Translates technical depth into vision
            </div>
          </div>

          {/* Format 3: Elevator Pitch */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 flex flex-col justify-between">
            <div>
              <div className="font-bold text-slate-900 pb-2 border-b border-slate-200 flex items-center justify-between">
                <span>3. Elevator Pitch</span>
                <span className="text-[10px] text-slate-500 font-normal">Spoken Cadence</span>
              </div>
              <p className="text-slate-700 pt-2 leading-relaxed">
                "{professionalSummary.elevatorPitch30s.slice(0, 180)}..."
              </p>
            </div>
            <div className="pt-2 border-t border-slate-200 text-[11px] text-indigo-700 font-medium">
              Natural spoken 30s conversational cadence
            </div>
          </div>

          {/* Format 4: Portfolio Capstone */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 flex flex-col justify-between">
            <div>
              <div className="font-bold text-slate-900 pb-2 border-b border-slate-200 flex items-center justify-between">
                <span>4. Capstone Project</span>
                <span className="text-[10px] text-slate-500 font-normal">Proof of Competency</span>
              </div>
              <p className="text-slate-700 pt-2 leading-relaxed">
                "{learningRecommendations.recommendedProjects[0]?.title}: {learningRecommendations.recommendedProjects[0]?.subtitle}"
              </p>
            </div>
            <div className="pt-2 border-t border-slate-200 text-[11px] text-indigo-700 font-medium">
              Directly resolves critical skill gap
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
